import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toastError, toastSuccess } from "../../utils/Utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProjectOwner,
  EntityType,
} from "../../../../declarations/projects/projects.did";
import { Principal } from "@dfinity/principal";
import ProfileClick from "../profile/component/ProfileClick";

type FormData = {
  name: string;
  entityType: string;
};

const AddProjectOwner = () => {
  const { projectsActor, identity } = useAuth();
  const { user } = useSelector((state: RootState) => state.app);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [entityTypes, setEntityTypes] = useState<string[]>([]);
  const [owner, setOwner] = useState<ProjectOwner | null>(null);
  const [ownerExists, setOwnerExists] = useState(false);

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

  const handleSave = async (
    data: FormData,
    event?: React.BaseSyntheticEvent
  ) => {
    setSaving(true);
    try {
      if (!projectsActor) {
        console.error("projectsActor is null");
        setSaving(false);
        return;
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
      await projectsActor.addProjectOwner(projectOwner);
      setSaving(false);
      toastSuccess("Project Owner added successfully");
      navigate("/projects");
    } catch (error) {
      setSaving(false);
      console.error("Error adding project owner", error);
      toastError("Error adding project owner");
    }
    event?.preventDefault();
  };

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a className="header-title">Project Owner</a>
        <button
          onClick={() => window.history.back()}
          data-back-button
          className="header-icon header-icon-1"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <ProfileClick />
      </div>

      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="content mb-0">
            <form
              onSubmit={handleSubmit((data, event) => handleSave(data, event))}
            >
              <div className="input-style input-style-2 input-required">
                <input
                  placeholder="What is your username or organisation name?"
                  type="text"
                  id="name"
                  {...register("name")}
                  className="textinput textInput form-control"
                />
                {errors.name && (
                  <p className="text-red-600">{errors.name.message}</p>
                )}
                <div>
                  <label>Entity Type:</label>
                  <select
                    {...register("entityType", {
                      required: "Entity type is required",
                    })}
                  >
                    <option value="" disabled>
                      Select an entity type
                    </option>
                    {entityTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.entityType && (
                    <p className="text-red-600">{errors.entityType.message}</p>
                  )}
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-3"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProjectOwner;
