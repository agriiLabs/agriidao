import { useEffect, useRef, useState } from "react";
import { Campaign } from "../../../../declarations/bounty/bounty.did";
import { useAuth } from "../../hooks/Context";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { uploadFile } from "../../hooks/storage/functions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AcCategory } from "../../../../declarations/settings/settings.did";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function CampaignUpdate() {
  const { bountyActor, settingsActor } = useAuth();
  const { campaign } = useSelector((state: RootState) => state.app);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<AcCategory[] | null>(null); //setting a variable for categories to an empty array of any/null
  const [campaignPic, setCampaignPic] = useState<File | null>(null);

  const [name, setName] = useState<string>(
    campaign && campaign.name.length != 0 ? campaign.name[0] : ""
  );
  const [url, SetUrl] = useState<string>(
    campaign && campaign.url.length != 0 ? campaign.url[0] : ""
  );
  const [campaignType, setCampaignType] = useState<string>(
    campaign && campaign.campaignType.length != 0
      ? campaign.campaignType[0]
      : ""
  );
  const [totalValue, setTotalValue] = useState<number>(
    campaign && campaign.totalValue != null ? campaign.totalValue : 0
  );
  const [rules, setRules] = useState<string>(
    campaign && campaign.rules.length != 0 ? campaign.rules[0] : ""
  );
  const [notes, setNotes] = useState<string>(
    campaign && campaign.notes.length != 0 ? campaign.notes[0] : ""
  );

  let acTypeName = "Campaign";

  useEffect(() => {
    getAcTypeCategories();
  }, []);

  const getAcTypeCategories = async () => {
    try {
      const res = await settingsActor.getAllLatestAcTypeCategoriesByName(
        acTypeName
      );
      setCategories(res);
    } catch (error) {
      console.log("Error when fetching categories", error);
    }
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    if (!bountyActor) {
      console.error("bountyActor is null");
      return;
    }
    if (!campaign) {
      console.error("campaign is null");
      return;
    }
    if (name == "" || url == "" || campaignType == "" || totalValue == 0) {
      toast.error("Please fill in all the fields");
      return;
    }
    setSaving(true);

    const body: Campaign = {
      ...campaign,
      name: name,
      url: url,
      campaignType: campaignType,
      totalValue: totalValue,
      rules: rules,
      notes: notes,
      timeStamp: BigInt(campaign.timeStamp)
    };
    try {
      await bountyActor.updateCampaign(body);
      toast.success("Campaign updated successfully");
    } catch (error) {
      setSaving(false);
      toast.error("Error updating campaign");
      console.error("Error updating campaign", error);
    }
  };

  const handleQuillChange = (value) => {
    setRules(value);
  };

  const handleQuillChange2 = (value) => {
    setNotes(value);
  };

  return (
    <>
      <div className="container-fluid">
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
                  <li className="breadcrumb-item">
                    <a href="#">Campaigns</a>
                  </li>
                  <li className="breadcrumb-item active">Add Campaign</li>
                </ol>
              </div>
              <h4 className="page-title">Add Campaign</h4>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <h5 className="text-uppercase bg-light p-2 mt-0 mb-3">
                  General
                </h5>

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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="textinput textInput form-control"
                    />
                  </div>

                  {/* {errors.name && (
                    <span className="text-red-600">{errors.name.message}</span>
                  )} */}
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
                      value={url}
                      onChange={(e) => SetUrl(e.target.value)}
                      className="textinput textInput form-control"
                    />
                  </div>
                  {/* {errors.url && (
                    <span className="text-red-600">{errors.url.message}</span>
                  )} */}
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
                      value={campaignType}
                      onChange={(e) => setCampaignType(e.target.value)}
                      //   {...register("campaignType")}
                      className="select form-control"
                    >
                      {categories?.map((category, index) => (
                        <option key={index}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  {/* {errors.campaignType && (
                    <span className="text-red-600">
                      {errors.campaignType.message}
                    </span>
                  )} */}
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
                      value={totalValue}
                      onChange={(e) => setTotalValue(parseInt(e.target.value))}
                      //   {...register("totalValue")}
                      className="textinput textInput form-control"
                    />
                  </div>
                  {/* {errors.totalValue && (
                    <span className="text-red-600">
                      {errors.totalValue.message}
                    </span>
                  )} */}
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
                  </div>
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
                </div>
              </div>

              <div className="col-12">
                <div className="text-center mb-3">
                  <button
                    type="button"
                    className="btn w-sm btn-light waves-effect"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn w-sm btn-success waves-effect waves-light"
                  >
                    {saving ? "Updating..." : "Update"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CampaignUpdate;
