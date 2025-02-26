import { FC, useState } from "react";
import { useAuth } from "../../../../hooks/Context";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProjectIncome,
  ProjectIncomeRequest,
} from "../../../../../../declarations/projects/projects.did";
import { setProjectIncomeRequest } from "../../../../redux/slices/app";
import DAddIncomePreview from "./DAddIncomePreview";
import { Modal } from "react-bootstrap";

type Props = {
  showAddIncomeModal: boolean;
  setShowAddIncomeModal: (showAddIncomeModal: boolean) => void;
};

type FormData = {
  item: string;
  amount: number;
  quantity: number;
};

const DAddIncome: FC<Props> = ({
  showAddIncomeModal,
  setShowAddIncomeModal,
}) => {
  const { projectsActor, identity } = useAuth();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);

  const schema = z.object({
    item: z.string().min(1, { message: "Item required" }),
    amount: z.number().min(1, { message: "Amount required" }),
    quantity: z.number().min(1, { message: "Quantity required" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleSave = async (data: FormData) => {
    if (!identity || !projectsActor) {
      console.error("Identity or projectsActor is null");
      return;
    }

    const projectIncome: ProjectIncomeRequest = {
      projectProjectionsId: id ? [id] : [],
      projectFinancialsId: [],
      item: data.item,
      amount: BigInt(data.amount),
      quantity: BigInt(data.quantity),
    };
    dispatch(setProjectIncomeRequest(projectIncome));
    setCurrentStep(2);
  };

  return (
    <Modal
      show={showAddIncomeModal}
      onHide={() => setShowAddIncomeModal(false)}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Income</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentStep === 1 ? (
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="input-style no-borders input-required">
              <input
                placeholder="What is the item?"
                type="text"
                {...register("item")}
                className="textinput textInput form-control"
              />
              {errors.item && (
                <span style={{ color: "red" }}>{errors.item.message}</span>
              )}
            </div>
            <div className="input-style input-style-2 input-required">
              <input
                placeholder="What is the cost per item?"
                type="number"
                {...register("amount", { valueAsNumber: true })}
                className="textinput textInput form-control"
              />
              {errors.amount && (
                <span style={{ color: "red" }}>{errors.amount.message}</span>
              )}
            </div>
            <div className="input-style input-style-2 input-required">
              <input
                placeholder="What is the quantity?"
                type="number"
                {...register("quantity", { valueAsNumber: true })}
                className="textinput textInput form-control"
              />
              {errors.quantity && (
                <span style={{ color: "red" }}>{errors.quantity.message}</span>
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
          <DAddIncomePreview setCurrentStep={setCurrentStep} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DAddIncome;
