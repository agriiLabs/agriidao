import { FC, useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/Context";
import { MarketLocationRequest } from "../../../../../../declarations/commodity/commodity.did";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { setMarketLocationRequest } from "../../../../redux/slices/app";

type Props = {
  showAddMarketLocationModal: boolean;
  setShowAddMarketLocationModal: (showAddMarketLocationModal: boolean) => void;
};

type FormData = {
  name: string;
  countryId: string;
};

const AddMarketLocation: FC<Props> = ({
  showAddMarketLocationModal,
  setShowAddMarketLocationModal,
}) => {
  const { agriidaoActor, settingsActor } = useAuth();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [countries, setCountries] = useState<any[] | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const schema = z.object({
    name: z
      .string()
      .min(3, { message: "Name must be 3 or more characters long" })
      .max(40, { message: "Name must be less than 40 characters long" }),
    countryId: z.string().min(1, { message: "Country required" }),
  });

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    if (!settingsActor) {
      console.error("settingsActor is null");
      return;
    }
    try {
      const res = await settingsActor?.getAllCountries();
      setCountries(res || null);
    } catch (error) {
      console.log("Error when fetching countries", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });


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

    try {
      let marketLocation: MarketLocationRequest = {
        name: data.name,
        countryId: data.countryId,
      };

      dispatch(setMarketLocationRequest(marketLocation));
      setCurrentStep(2);
    } catch (error) {
      console.log("There was an error creating market location", error);
      toast.error("There was an error saving market location.", {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: true,
      });
    }
  };

  return (
    <Modal
      show={showAddMarketLocationModal}
      onHide={() => setShowAddMarketLocationModal(false)}
      size="lg"
      centered
      >

      <Modal.Header closeButton>
        <Modal.Title>Add Market Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentStep === 1 ? (
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="input-style no-borders input-required">
              <select
                className={`form-select ${
                  errors.countryId ? "is-invalid" : ""
                }`}
                {...register("countryId")}
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
              {errors.countryId && (
                <div className="invalid-feedback">
                  {errors.countryId.message}
                </div>
              )}
            </div>
            <div className="input-style no-borders input-required">
              <input
                placeholder="What is the market location name?"
                type="text"
                className={`textinput textInput form-control ${
                  errors.name ? "is-invalid" : ""
                }`}
                {...register("name")}
              />
              {errors.name && (
                <span style={{ color: "red" }}>{errors.name.message}</span>
              )}
            </div>
            <button type="submit" className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-2">
              Next
            </button>
          </form>
        ) : (
          <AddMarketLocationPreview setCurrentStep={setCurrentStep} />
        )}
      </Modal.Body>
      </Modal>
  );
};

export default AddMarketLocation;
