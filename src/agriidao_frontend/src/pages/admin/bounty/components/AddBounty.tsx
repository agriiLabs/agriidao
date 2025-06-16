import { FC, useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/Context";
import { BountyRequest } from "../../../../../../declarations/bounty/bounty.did";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { setBountyRequest } from "../../../../redux/slices/app";
import AddBountyPreview from "./AddBountyPreview";

type Props = {
  showAddBountyModal: boolean;
  setShowAddBountyModal: (showAddBountyModal: boolean) => void;
};

type FormData = {
  name: string;
  bountyPool: number,
  acCategory: string,
  startDate: string;
  endDate: string;
};

const AddBounty: FC<Props> = ({
  showAddBountyModal,
  setShowAddBountyModal,
}) => {
  const { bountyActor, settingsActor } = useAuth();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<any[] | null>(null); 
  const [currentStep, setCurrentStep] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  let acTypeName = "Reward";

  const schema = z.object({
    name: z
      .string()
      .min(3, { message: "Name must be 3 or more characters long" })
      .max(40, { message: "Name must be less than 40 characters long" }),
    acCategory: z.string().min(1, { message: "Category type required" }),
    bountyPool: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
    startDate: z.string().min(1, { message: "Start date required" }),
    endDate: z.string().min(1, { message: "End date required" }),
  });

  const getAcTypeCategories = async () => {
    try {
      if (!settingsActor) {
        console.error("settingsActor is not available");
        return;
      }
      const res = await settingsActor.getAllLatestAcTypeCategoriesByName(acTypeName);
      setCategories(res);
    } catch (error) {
      console.error("Error when fetching categories", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    getAcTypeCategories();
  }, []);

  const handleSave = async (data: FormData) => {
    if (!bountyActor) {
      console.error("bountyActor is not available");
      return;
    }

    try {
      let bounty: BountyRequest = {
      name: data.name,
      acCategoryId: data.acCategory,
      bountyPool: data.bountyPool,
      availableBal: data.bountyPool,
      startDate: startDate,
      endDate: endDate,
    };
    dispatch(setBountyRequest(bounty));
    setCurrentStep(2);
  } catch (error) {
      console.error("Error saving bounty:", error);
      toast.error("Error saving bounty");
    }
  };

  return (
    <Modal
      show={showAddBountyModal}
      onHide={() => setShowAddBountyModal(false)}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Bounty</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentStep === 1 ? (
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="input-style no-borders input-required">
              <label htmlFor="name" className="col-form-label requiredField">
                Name
                <span className="asteriskField">*</span>
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className="textinput textInput form-control"
              />
            </div>
            {errors.name && (
              <span className="text-red-600">{errors.name.message}</span>
            )}
            <div className="input-style no-borders input-required">
              <label htmlFor="acCategory" className="col-form-label requiredField">
                Type
                <span className="asteriskField">*</span>
              </label>
              <select
                id="acCategory"
                {...register("acCategory")}
                className="select form-control"
              >
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.acCategory && (
              <span className="text-red-600">
                {errors.acCategory.message}
              </span>
            )}
            <div className="input-style no-borders input-required">
              <label htmlFor="bountyPool" className="col-form-label requiredField">
                Bounty Pool
                <span className="asteriskField">*</span>
              </label>
              <input
                type="text"
                id="bountyPool"
                {...register("bountyPool")}
                className="textinput textInput form-control"
              />
            </div>
            {errors.bountyPool && (
              <span className="text-red-600">
                {errors.bountyPool.message}
              </span>
            )}
            <div className="input-style no-borders input-required">
              <label htmlFor="startDate" className="col-form-label requiredField">
                Start Date
                <span className="asteriskField">*</span>
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                required
                onChange={(e) => setStartDate(e.target.value)}
                className="textinput textInput form-control"
              />
              {errors.startDate && (
                <span className="text-red-600">{errors.startDate.message}</span>
              )}
            </div>    
            <div className="input-style no-borders input-required">
              <label htmlFor="endDate" className="col-form-label requiredField">
                End Date
                <span className="asteriskField">*</span>
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                required
                onChange={(e) => setEndDate(e.target.value)}
                className="textinput textInput form-control"
              />
              {errors.endDate && (
                <span className="text-red-600">{errors.endDate.message}</span>
              )}
            </div>
            <button type="submit" className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-2">
              Next
            </button>
          </form>
        ) : (
          <AddBountyPreview setCurrentStep={setCurrentStep} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AddBounty;
