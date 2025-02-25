import { FC, useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { toastError, toastSuccess } from "../../../utils/Utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProjectOwner,
  EntityType,
} from "../../../../../declarations/projects/projects.did";
import { Principal } from "@dfinity/principal";
import { Modal } from "react-bootstrap";
import { setProjectOwner } from "../../../redux/slices/app";
import DProjectOwnerPreview from "./DProjectOwnerPreview";

type Props = {
  showProjectOwnerModal: boolean;
  setShowProjectOwnerModal: (showProjectOwnerModal: boolean) => void;
};

type FormData = {
  name: string;
  entityType: string;
};

const DProjectOwner: FC<Props> = ({
  showProjectOwnerModal,
  setShowProjectOwnerModal,
}) => {
  const { projectsActor, identity } = useAuth();
  const { user } = useSelector((state: RootState) => state.app);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [entityTypes, setEntityTypes] = useState<string[]>([]);
  const [owner, setOwner] = useState<ProjectOwner | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const schema = z.object({
    name: z.string().min(1, { message: "Name required" }),
    entityType: z.string().min(1, { message: "Entity type required" }),
  });

  useEffect(() => {
    const fetchEntityTypes = async () => {
      if (!projectsActor) return;
      try {
        const types = await projectsActor.getEntityTypes();
        setEntityTypes(types);
      } catch (error) {
        console.error("Error fetching entity types:", error);
      }
    };

    fetchEntityTypes();
  }, [projectsActor]);

  const convertToEntityType = (type: string): EntityType | null => {
    switch (type) {
      case "Business":
        return { Business: null };
      case "Government":
        return { Government: null };
      case "Individual":
        return { Individual: null };
      case "NGO":
        return { NGO: null };
      case "University":
        return { University: null };
      default:
        return null;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  let userId = identity?.getPrincipal();

  const handleSave = async (data: FormData) => {
    if (!userId) {
      throw new Error(
        "User ID is undefined. Please make sure the user is logged in."
      );
    }

    const entityType = convertToEntityType(data.entityType);

    if (!entityType) {
      throw new Error("Invalid entity type");
    }

    const projectOwner: ProjectOwner = {
      userId: identity?.getPrincipal() as Principal,
      name: data.name,
      entityType,
      timestamp: BigInt(Date.now()),
    };
    dispatch(setProjectOwner(projectOwner));
    setCurrentStep(2);
  };

  return (
    <Modal
      show={showProjectOwnerModal}
      onHide={() => setShowProjectOwnerModal(false)}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Setup your project manger profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentStep === 1 ? (
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="input-style no-borders input-required">
              <input
                placeholder="What is your username or orgabisation name?"
                type="text"
                {...register("name")}
                className="textinput textInput form-control"
              />
              {errors.name && (
                <span style={{ color: "red" }}>{errors.name.message}</span>
              )}
            </div>
            <div className="input-style input-style-2 input-required">
              <select
                {...register("entityType")}
                className="select form-control"
              >
                <option value="">Select entity type</option>
                {entityTypes?.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.entityType && (
                <span style={{ color: "red" }}>
                  {errors.entityType.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-2"
            >
              Next
            </button>
          </form>
        ) : (
          <DProjectOwnerPreview setCurrentStep={setCurrentStep} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DProjectOwner;
