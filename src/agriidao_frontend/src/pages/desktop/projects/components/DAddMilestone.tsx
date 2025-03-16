import { FC, useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/Context";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MilestoneRequest,
  Project,
} from "../../../../../../declarations/projects/projects.did";
import { Modal } from "react-bootstrap";
import { setMilestoneRequest } from "../../../../redux/slices/app";
import DAddMilestonePreview from "./DAddMilestonePreview";

type Props = {
  showMilestoneModal: boolean;
  setShowMilestoneModal: (showMilestoneModal: boolean) => void;
};

type FormData = {
  name: string;
  description: string;
  budget: number;
  task1: string;
  task2: string;
  task3: string;
  timeframe: number;
};

const DAddMilestone: FC<Props> = ({
  showMilestoneModal,
  setShowMilestoneModal,
}) => {
  const { projectsActor } = useAuth();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [project, setProject] = useState<Project | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const schema = z.object({
    name: z.string().min(1, { message: "Name required" }),
    description: z.string().min(1, { message: "Description required" }),
    budget: z.number().min(0, { message: "Budget required" }),
    task1: z.string().min(1, { message: "Task 1 required" }),
    task2: z.string(),
    task3: z.string(),
    timeframe: z.number().min(1, { message: "Timeframe required" }),
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
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleSave = async (data: FormData) => {
    if (!projectsActor) {
      console.error("projectsActor is null");
      return;
    }
    try {
      let milestone: MilestoneRequest = {
        projectId: project?.id || "",
        name: data.name,
        description: data.description,
        budget: BigInt(data.budget),
        task1: data.task1,
        task2: [],
        task3: [],
        timeframe: BigInt(data.timeframe),
      };
      dispatch(setMilestoneRequest(milestone));
      setCurrentStep(2);
    } catch (error) {
      console.error("Error adding milestone:", error);
    }
  };

  return (
    <Modal
      show={showMilestoneModal}
      onHide={() => setShowMilestoneModal(false)}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add New Milestone</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentStep === 1 ? (
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="input-style no-borders input-required">
              <input
                placeholder="What is milestone name?"
                type="text"
                {...register("name")}
                className="textinput textInput form-control"
              />
              {errors.name && (
                <span style={{ color: "red" }}>{errors.name.message}</span>
              )}
            </div>
            <div className="input-style no-borders input-required">
              <input
                placeholder="What is the budget?"
                type="number"
                {...register("budget", { valueAsNumber: true })}
                className="textinput textInput form-control"
              />
              {errors.budget && (
                <span style={{ color: "red" }}>{errors.budget.message}</span>
              )}
            </div>
            <div className="input-style no-borders input-required">
              <input
                placeholder="What is the first task?"
                type="text"
                {...register("task1")}
                className="textinput textInput form-control"
              />
              {errors.task1 && (
                <span style={{ color: "red" }}>{errors.task1.message}</span>
              )}
            </div>
            <div className="input-style no-borders">
              <input
                placeholder="What is the second task?"
                type="text"
                {...register("task2")}
                className="textinput textInput form-control"
              />
              {errors.task2 && (
                <span style={{ color: "red" }}>{errors.task2.message}</span>
              )}
            </div>
            <div className="input-style no-borders">
              <input
                placeholder="What is the third task?"
                type="text"
                {...register("task3")}
                className="textinput textInput form-control"
              />
              {errors.task3 && (
                <span style={{ color: "red" }}>{errors.task3.message}</span>
              )}
            </div>
            <div className="input-style no-borders input-required">
              <input
                placeholder="What is the timeframe?"
                type="number"
                {...register("timeframe", { valueAsNumber: true })}
                className="textinput textInput form-control"
              />
              {errors.timeframe && (
                <span style={{ color: "red" }}>{errors.timeframe.message}</span>
              )}
            </div>
            <div className="input-style no-borders">
              <input
                placeholder="Give a short description of the milestone"
                type="text"
                {...register("description")}
                className="textinput textInput form-control"
              />
              {errors.description && (
                <span style={{ color: "red" }}>{errors.description.message}</span>
              )}
            </div>
            <button
              type="submit"
              className=" btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-2"
            >
              Next
            </button>
          </form>
        ) : (
          <DAddMilestonePreview setCurrentStep={setCurrentStep} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DAddMilestone;
