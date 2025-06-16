import { FC, useEffect, useState } from "react";
import { CampaignRequest } from "../../../../../../declarations/bounty/bounty.did";
import { useAuth } from "../../../../hooks/Context";
import { toast } from "react-toastify";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
// import { uploadFile } from "../../../hooks/storage/functions";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AcCategory, SettingsData } from "../../../../../../declarations/settings/settings.did";
import { setCampaignRequest } from "../../../../redux/slices/app";
import AddCampaignPreview from "./AddCampaignPreview";

type Props = {
  showAddCampaignModal: boolean;
  setShowAddCampaignModal: (showAddCampaignModal: boolean) => void;
};

type FormData = {
  name: string;
  url: string;
  campaignType: string;
  totalValue: number;
  rules: string;
  notes: string;
};

const AddCampaign: FC<Props> = ({
  showAddCampaignModal,
  setShowAddCampaignModal,
}) => {
  const { bountyActor, settingsActor } = useAuth();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [bounty, setBounty] = useState<any | null>(null);
  const [categories, setCategories] = useState<SettingsData[] | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignPic, setCampaignPic] = useState<File | null>(null);
  const [rules, setRules] = useState('');
  const [notes, setNotes] = useState('');

  let acTypeName = "Campaign";

  const schema = z.object({
    name: z
      .string()
      .min(3, { message: "Name must be 3 or more characters long" })
      .max(40, { message: "Name must be less than 40 characters long" }),
    url: z.string().url({ message: "Invalid url" }),
    campaignType: z.string().min(1, { message: "Campaign type required" }),
    totalValue: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
    rules: z
      .string()
      .min(3, { message: "The rules must be 3 or more characters long" })
      .max(1000, {
        message: "The rules must be less than 1000 characters long",
      }),
    notes: z
      .string()
      .min(3, { message: "The notes must be 3 or more characters long" })
      .max(1000, {
        message: "The notes must be less than 1000 characters long",
      }),
  });

  useEffect(() => {
    if (id) {
      getBounty(id);
    }
  }, [id]);

  const getBounty = async (bountyId: string) => {
    if (!bountyActor) {
      console.error("bountyActor is null");
      return;
    }
    try {
      const res = await bountyActor.getBountyLatest(bountyId);
      setBounty(res);
    } catch (error) {
      console.error("Error fetching bounty:", error);
    }
  };

  useEffect(() => {
    getAcTypeCategories();
  }, []);

  const getAcTypeCategories = async () => {
    try {
      if (!settingsActor) {
        console.error("settingsActor is not available");
        return;
      }
      const res = await settingsActor.getCategoryByCName(acTypeName);
      if ('ok' in res) {
        setCategories([res.ok]);
      } else {
        console.error("Unexpected response format", res);
        setCategories(null);
      }
    } catch (error) {
      console.log("Error when fetching categories", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleQuillChange = (value: string) => {
    setRules(value);
  };
  const handleQuillChange2 = (value: string) => {
    setNotes(value);
  };
  const handleSave = async (data: FormData) => {
    if (!bountyActor) {
      console.error("bountyActor is not available");
      return;
    }
    try {
      if (!bounty) {
        console.error("Bounty is null, cannot proceed.");
        return;
      }
      let campaign: CampaignRequest = {
        name: data.name,
        url: data.url,
        campaignType: data.campaignType,
        totalValue: Number(data.totalValue),
        availBal: Number(data.totalValue),
        campaignPic: "campaignPicUrl", 
        rules: rules,
        notes: notes,
        bountyId: bounty.id,
      };
      // if (campaignPic) {
        // const picUrl = await uploadFile(campaignPic);
        // campaign.campaignPic = picUrl;
        // campaign.campaignPic = campaignPic.name; // Placeholder for actual upload logic
      // } else {
      //   console.error("Campaign picture is required");
      //   toast.error("Campaign picture is required");
      //   return;
      // }
      dispatch(setCampaignRequest(campaign));
      setCurrentStep(2);
    } catch (error) {
      console.error("Error saving campaign:", error);
      toast.error("Error saving campaign");
    }
  };

  return (
    <Modal
      show={showAddCampaignModal}
      onHide={() => setShowAddCampaignModal(false)}
      size="lg"
      centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Campaign</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentStep === 1 ? (
            <form onSubmit={handleSubmit(handleSave)}>
              <div className="input-style no-borders input-required">
                <div className="form-group mb-3">
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
                  {errors.name && (
                    <span className="text-red-600">{errors.name.message}</span>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="url" className="col-form-label requiredField">
                    URL
                    <span className="asteriskField">*</span>
                  </label>
                  <input
                    type="text"
                    id="url"
                    {...register("url")}
                    className="textinput textInput form-control"
                  />
                  {errors.url && (
                    <span className="text-red-600">{errors.url.message}</span>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="campaignType" className="col-form-label requiredField">
                    Type
                    <span className="asteriskField">*</span>
                  </label>
                  <select
                    id="campaignType"
                    {...register("campaignType")}
                    className="select form-control"
                  >
                    {categories?.map((category, index) => (
                      <option key={index}>{category.category}</option>
                    ))}
                  </select>
                  {errors.campaignType && (
                    <span className="text-red-600">
                      {errors.campaignType.message}
                    </span>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="campaignPic" className="col-form-label requiredField">
                    Campaign Pic
                    <span className="asteriskField">*</span>
                  </label>
                  <input
                    type="file"
                    id="campaignPic"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setCampaignPic(e.target.files[0]);
                      }
                    }}
                    accept="image/*"
                    className="textinput textInput form-control"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="totalValue" 
                    className="col-form-label requiredField"
                  >
                    Total Value
                    <span className="asteriskField">*</span>
                  </label>
                  <input
                    type="number"
                    id="totalValue"
                    {...register("totalValue")}
                    className="textinput textInput form-control"
                  />
                  {errors.totalValue && (
                    <span className="text-red-600">
                      {errors.totalValue.message}
                    </span>
                  )}
                </div>  
                <div className="form-group mb-3">
                  <label htmlFor="rules" className="col-form-label requiredField">
                    Rules
                  </label>
                  <ReactQuill
                    value={rules}
                    onChange={handleQuillChange}
                    className="react-quill"
                  />
                  {errors.rules && <p>{errors.rules.message}</p>}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="notes" className="col-form-label requiredField">
                    Notes
                  </label>
                  <ReactQuill
                    value={notes}
                    onChange={handleQuillChange2}
                    className="react-quill"
                  />
                  {errors.notes && (
                    <span className="text-red-600">
                      {errors.notes.message}
                    </span>
                  )}
                </div>
                <div className="col-12">
                    <button
                      type="submit"
                      className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-2"
                    >
                      Next
                    </button>
                  </div>
                </div>
            </form>
          ) : (
            <AddCampaignPreview setCurrentStep={setCurrentStep} />
          )}
        </Modal.Body>
      </Modal>
  );
};

export default AddCampaign;
