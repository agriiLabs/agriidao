import { FC, useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/Context";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProposalRequest } from "../../../../../../declarations/proposals/proposals.did";
import { Modal } from "react-bootstrap";
import { setProposalRequest, _setProject } from "../../../../redux/slices/app";
import { Project } from "../../../../../../declarations/projects/projects.did";
import DAddProjectProposalPreview from "./DAddProjectProposalPreview";

type Props = {
  showProposalModal: boolean;
  setShowProposalModal: (showProposalModal: boolean) => void;
};

type FormData = {
    description: string;
};

const DAddProjectProposal: FC<Props> = ({
  showProposalModal,
  setShowProposalModal,
}) => {
  const { proposalsActor, projectsActor } = useAuth();
  const { id } = useParams();
  const dispatch = useDispatch();
const [project, setProject] = useState<Project | null>(null);
  
  const [currentStep, setCurrentStep] = useState(1);

  const schema = z.object({
    description: z.string().min(1, { message: "Description required" }),
  });

  useEffect(() => {
    if (id && projectsActor) {
      getProject();
    }
  }, [id, projectsActor]);

  const getProject = async () => {
    if (!projectsActor) {
      console.error("projectsActor is null");
      return;
    }
    try {
      if (id) {
        const res = await projectsActor.getProjectById(id);
        setProject(res);
      } else {
        console.error("Project ID is undefined");
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSave = async (data: FormData) => {
    if (!proposalsActor) {
      console.error("proposalsActor is null");
      return;
    }

    try {
      const proposalRequest: ProposalRequest = {
        description: data.description,
        projectId: id ? [id] : [],
        coop: [], 
        submissionDeposit: BigInt(1), 
      };
      dispatch(setProposalRequest(proposalRequest));
        dispatch(_setProject(project));
      setCurrentStep(2);
    } catch (error) {
      console.error("Error submitting proposal:", error);
    }
  };

  return (
    <Modal
      show={showProposalModal}
      onHide={() => setShowProposalModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Proposal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {currentStep === 1 ? (
        <form onSubmit={handleSubmit(handleSave)}>
        <div className="form-group">
          <textarea
            {...register("description")}
            className={`form-control ${
              errors.description ? "is-invalid" : ""
            }`}
            placeholder="What would you like to propose?"
          />
          {errors.description && (
            <div className="invalid-feedback">
              {errors.description.message}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-2"
        >
          Next
        </button>
      </form>
      ) : (
        <DAddProjectProposalPreview
          setCurrentStep={setCurrentStep}
        />
      )}
      </Modal.Body>
    </Modal>
  );
};

export default DAddProjectProposal;

