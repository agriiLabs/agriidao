import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/Context";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { MarketLocationRequest } from '../../../../../../declarations/agriidao_backend/agriidao_backend.did';

type FormData = {
  name: string;
  countryId: string;
};

interface AddMarketLocationProps {
  setOpenForm: (open: boolean) => void;
  setMarketSaved: (saved: boolean) => void;
}

const AddMarketLocation = ({ setOpenForm, setMarketSaved }: AddMarketLocationProps) => {
  const { agriidaoActor, settingsActor } = useAuth();
  const [saving, setSaving] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState<any[] | null>(null);
  const [countries, setCountries] = useState<any[] | null>(null);
  const [marketName, setMarketName] = useState<File | null>(null);
  
  const schema = z.object({
    name: z
      .string()
      .min(3, { message: "Name must be 3 or more characters long" })
      .max(40, { message: "Name must be less than 40 characters long" }),
    countryId: z.string().min(1, { message: "country required" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    if (!settingsActor) {
      console.error("settingsActor is null");
      return;
    }
    try {
      const res = await settingsActor.getAllCountries();
      setCountries(res);
    } catch (error) {
      console.log("Error when fetching categories", error);
    }
  };

  const handleSave = async (data: FormData) => {
    if (!agriidaoActor || !settingsActor || !countries) {
      console.error("agriidaoActor is null");
      return;
    }
    const country = countries.find((country) => country.code === data.countryId);
    if (!country) {
      toast.error("No country found", {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: true,
      });
      return;
    }

    setSaving(true);
    try {
      let body: MarketLocationRequest = {
        name: data.name,
        countryId: data.countryId,
      };

      await agriidaoActor.addMarketLocation(body);
      console.log("Market succesfully saved.", {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: true,
      });
      setMarketSaved(true);
      setOpenForm(false);
      setSaving(false);
    } catch (error) {
      console.log("there was an error creating market location", error);
      toast.error("There was an error saving market location.", {
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
                    <a href="javascript: void(0);">agriiDAO</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="{% url 'commoditycommodity_list' %}">
                      Commodities
                    </a>
                  </li>
                  <li className="breadcrumb-item active">Add Commodity</li>
                </ol>
              </div>
              <h4 className="page-title">Add Commodity</h4>
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
                      htmlFor="acCategoryId"
                      className="col-form-label requiredField"
                    >
                      Country
                      <span className="asteriskField">*</span>
                    </label>
                    <select
                      id="countryId"
                      {...register("countryId")}
                      className="form-control"
                    >
                      <option value="" disabled>
                        Select a country
                      </option>
                      {countries?.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

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
                      {saving ? "Saving Market..." : "Save"}
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

export default AddMarketLocation;
