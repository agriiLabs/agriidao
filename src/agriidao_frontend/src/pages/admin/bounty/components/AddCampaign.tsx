import { useEffect, useRef, useState } from "react";
import { CampaignRequest } from "../../../../../declarations/bounty/bounty.did";
import { useAuth } from "../../../hooks/Context";
import { toast } from "react-toastify";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadFile } from "../../../hooks/storage/functions";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AcCategory } from "../../../../../declarations/settings/settings.did";

type FormData = {
  name: string;
  url: string;
  campaignType: string;
  totalValue: number;
  rules: string;
  notes: string;
};

const AddCampaign = ({ setOpenForm, bounty, setCampaignSaved }) => {
  //get bounty and setForm as properties from the parent component ie BountyCampaign
  const { bountyActor, settingsActor } = useAuth(); // call userBackend
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<AcCategory[]|null>(null); //setting a variable for categories to an empty array of any/null
  const [campaignPic, setCampaignPic] = useState<File|null>(null);
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

  const {
    register,
    handleSubmit,
    setValue,
    // setValueNote,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    setValue('rules', rules);
  }, [rules, setValue]);

  useEffect(() => {
    setValue('notes', notes);
  }, [notes, setValue]);

  useEffect(() => {
    getAcTypeCategories()
  }, []); 

  const getAcTypeCategories = async () => {
    try {
      const res = await settingsActor.getAllLatestAcTypeCategoriesByName(acTypeName);
      setCategories(res)
    } catch (error) {
      console.log("Error when fetching categories", error) 
    }
  }

  const handleSave = async (data: FormData) => {
    
    if (!campaignPic) {
      toast.warning("Please select a campign image", {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: true,
      });
      return;
    }
    const category = categories.find((cat) => cat.name === data.campaignType)
    if (!category) {
      toast.warning("Please select a valid category", {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: true,
      });
      return;
    }
    setSaving(true);
    try {
      const picUrl = await uploadAsset()
      let body: CampaignRequest = {
        bountyId: bounty.id,
        name: data.name,
        url: data.url,
        campaignType: category.id,
        campaignPic: picUrl,
        totalValue: Number(data.totalValue),
        availBal: Number(data.totalValue),
        rules: data.rules,
        notes: data.notes,
      };

      await bountyActor.addCampaign(body);
      toast.success("Campaign successfully saved.", {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: true,
      });
      setCampaignSaved(true);
      setOpenForm(false);
      setSaving(false);
    } catch (error) {
      console.log("there was an error creating campaign", error);
      toast.error("There was an error saving campaign.", {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: true,
      });
      setSaving(false);
    }
  };
  const uploadAsset = async () => { 
 
    const file_path = location.pathname; 
    try { 
      const assetUrl = await uploadFile(campaignPic, file_path); 
      console.log("This file was successfully uploaded:", campaignPic.name, assetUrl); 
      return assetUrl; 
    } catch (error) { 
      console.error("Error uploading file:", campaignPic.name, error); 
    } 

  };
  
  const handleQuillChange = (value) => {
    setRules(value);
  };

  const handleQuillChange2 = (value) => {
    setNotes(value);
  };

  return (
    <div className="form-modal">
      <div className="container-fluid modal-child">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="javascript: void(0);">InventoryClub</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="{% url 'bounty:bounty_list' %}">Bounties</a>
                  </li>
                  <li className="breadcrumb-item active">Add Bounty</li>
                </ol>
              </div>
              <h4 className="page-title">Add Bounty</h4>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <h5 className="text-uppercase bg-light p-2 mt-0 mb-3">General</h5>
              <form onSubmit={handleSubmit(handleSave)}>
                <div className="form-group mb-3">
                  <div className="form-group">
                    <label
                      htmlFor="name"
                      className="col-form-label requiredField"
                    >
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
                </div>

                <div className="form-group mb-3">
                  <div className="form-group">
                    <label
                      htmlFor="url"
                      className="col-form-label requiredField"
                    >
                      URL
                      <span className="asteriskField">*</span>
                    </label>
                    <input
                      type="text"
                      id="url"
                      {...register("url")}
                      className="textinput textInput form-control"
                    />
                  </div>
                  {errors.url && (
                    <span className="text-red-600">{errors.url.message}</span>
                  )}
                </div>

                <div className="form-group mb-3">
                  <div className="form-group">
                    <label
                      htmlFor="campaignType"
                      className="col-form-label requiredField"
                    >
                      Type
                      <span className="asteriskField">*</span>
                    </label>

                    <select
                      id="campaignType"
                      {...register("campaignType")}
                      className="select form-control"
                    >
                      {categories?.map((category, index) => <option key={index}>{category.name}</option>)}
                    </select>
                  </div>
                  {errors.campaignType && (
                    <span className="text-red-600">
                      {errors.campaignType.message}
                    </span>
                  )}
                </div>

                <div className="form-group mb-3">
                  <div className="form-group">
                    <label
                      htmlFor="campaignPic"
                      className="col-form-label requiredField"
                    >
                      Campaign Pic
                      <span className="asteriskField">*</span>
                    </label>
                    <input
                      type="file"
                      id="campaignPic"
                      onChange={(e) => setCampaignPic(e.target.files[0])}
                      accept="image/*"
                      className="textinput textInput form-control"
                    />
                  </div>
                  
                </div>

                <div className="form-group mb-3">
                  <div className="form-group">
                    <label
                      htmlFor="totalValue"
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
                  </div>
                  {errors.totalValue && (
                    <span className="text-red-600">
                      {errors.totalValue.message}
                    </span>
                  )}
                </div>

                <div className="form-group mb-3">
                  <div className="form-group">
                    <label
                      htmlFor="rules"
                      className="col-form-label requiredField"
                    >
                      Rules
                    </label>
                    <ReactQuill
                      value={rules}
                      onChange={handleQuillChange}
                      className="react-quill"
                    />
                    {errors.rules && <p>{errors.rules.message}</p>}
                  </div>
                  {errors.rules && (
                    <span className="text-red-600">
                      {errors.rules.message}
                    </span>
                  )}
                </div>

                <div className="form-group mb-3">
                  <div className="form-group">
                    <label
                      htmlFor="notes"
                      className="col-form-label requiredField"
                    >
                      Notes
                    </label>
                    <ReactQuill
                      value={notes}
                      onChange={handleQuillChange2}
                      className="react-quill"
                    />
                  </div>
                  {errors.notes && (
                    <span className="text-red-600">
                      {errors.notes.message}
                    </span>
                  )}
                </div>

                <div className="col-12">
                  <div className="text-center mb-3">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenForm(false);
                      }}
                      className="btn w-sm btn-light waves-effect"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn w-sm btn-success waves-effect waves-light"
                    >
                      {saving ? "Saving Campaign..." : "Save"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCampaign;
