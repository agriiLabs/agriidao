import React, { Fragment, useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { BountyRequest } from "../../../../../declarations/bounty/bounty.did";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

type FormData = {
  name: string;
  bountyPool: number,
  acCategory: string,
};

const AddBounty = ({ setOpenForm, setBountySaved }) => {
  const { bountyActor, settingsActor } = useAuth(); // call userBackend
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]|null>(null); //setting a variable for categories to an empty array of any/null
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
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

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
    setSaving(true);

    try {
      const selectedCategory = categories.find((cat) => cat.name === data.acCategory) 

      if (!selectedCategory) {
        toast.error("No category found", {
          autoClose: 5000,
          position: "top-center",
          hideProgressBar: true,
        });
        setSaving(false)
        return;
      }

      let body: BountyRequest = {
        acCategoryId: selectedCategory.id,
        name: data.name,
        bountyPool: parseFloat(String(data.bountyPool)),
        availableBal: parseFloat(String(data.bountyPool)),
        startDate: startDate,
        endDate: endDate,
        //isLive: false,
      };

      await bountyActor.addBounty(body);
      console.log("Bounty succesfully saved.", {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: true,
      });
      setBountySaved(true);
      setOpenForm(false);
      setSaving(false);
    } catch (error) {
      console.log("there was an error creating bounty", error);
      toast.error("There was an error saving bounty.", {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: true,
      });
      setSaving(false);
    }
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
                      htmlFor="acCategoryId"
                      className="col-form-label requiredField"
                    >
                      Type
                      <span className="asteriskField">*</span>
                    </label>

                    <select
                      id="acCategory"
                      {...register("acCategory")}
                      className="select form-control"
                    >
                      {categories?.map((category) => <option>{category.name}</option>)}
                      
                    </select>
                  </div>
                  {errors.acCategory && (
                    <span className="text-red-600">
                      {errors.acCategory.message}
                    </span>
                  )}
                </div>

                <div className="form-group mb-3">
                  <div className="form-group">
                    <label
                      htmlFor="bountyPool"
                      className="col-form-label requiredField"
                    >
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
                </div>

                <div className="form-group mb-3">
                  <div className="form-group">
                    <label
                      htmlFor="startDate"
                      className="col-form-label requiredField"
                    >
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
                  </div>
                </div>

                <div className="form-group mb-3">
                  <div className="form-group">
                    <label
                      htmlFor="endDate"
                      className="col-form-label requiredField"
                    >
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
                  </div>
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
                      {saving ? "Saving Bounty..." : "Save"}
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

export default AddBounty;
