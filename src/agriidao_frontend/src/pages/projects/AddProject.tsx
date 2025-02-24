import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Principal } from "@dfinity/principal";
import { ProjectRequest } from "../../../../declarations/projects/projects.did";
import { setCoopRecord, setProjectRequest, setCountry } from "../../redux/slices/app";
import ProfileClick from "../profile/component/ProfileClick";
import { CoopRecord } from "../../../../declarations/coop_indexer/coop_indexer.did";
 
type FormData = {
  coop: string;
  name: string;
  summary: string;
  description: string;
  duration: string;
  fundingGoal: string;
  location: string;
//   image: string;
}; 

const AddProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectsActor, coopIndexerActor, settingsActor } = useAuth();
  const { user } = useSelector((state: RootState) => state.app);
  const [coops, setCoops] = useState<CoopRecord[] | null>([]);
  const [countries, setCountries] = useState<any[] | null>(null);

  const schema = z.object({
    coop: z.string().min(1, { message: "Invalid Principal" }),
    name: z.string().min(1, { message: "Name required" }),
    summary: z.string().min(1, { message: "Summary required" }),
    description: z.string().min(1, { message: "Description required" }),
    duration: z.string().min(1, { message: "Duration required" }),
    fundingGoal: z.string().min(1, { message: "Funding Goal required" }),
    location: z.string().min(1, { message: "Location required" }),
    // image: z.string().min(1, { message: "Image required" }),
  });

  useEffect(() => {
    if (coopIndexerActor) {
      getCoops();
    }
  }, [coopIndexerActor]);

  const getCoops = async () => {
    if (!coopIndexerActor) {
      console.error("coopIndexerActor is null");
      return;
    }
    try {
      const res = await coopIndexerActor.getDaoCoops();
      setCoops(res);
    } catch (error) {
      console.error("Error getting coops: ", error);
    }
  };

  useEffect(() => {
    if (settingsActor) {
      getCountries();
    }
  }, [settingsActor]);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleSave = async (data: FormData, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();
    
    if (!projectsActor) {
      console.error("projectsActor is null");
      return;
    }
    if (!user?.id) {
      throw new Error("User ID is required but is undefined.");
    }

    const getCoopDetails = coops?.find(
        (coop) => coop.canisterId.toText() === data.coop
        );
        if (!getCoopDetails) {
        console.error("No coop details found");
        return;
    }
    const coopDetails = getCoopDetails;
     
    const coopPrincipal = Principal.fromText(data.coop); 

    const country = countries?.find(
      (country) => country.code === data.location
    );
    if (!country) {
      console.error("No country found");
      return;
    }
 
    let project: ProjectRequest = {
      owner: user?.id,
      coop: coopPrincipal,
      name: data.name,
      summary: data.summary,
      description: data.description,
      duration: BigInt(Number(data.duration) || 0),
      fundingGoal: BigInt(Number(data.fundingGoal) || 0),
      currency: country.currency,
      location: data.location,
      image: [],
    };
    dispatch(setProjectRequest(project));
    dispatch(setCoopRecord([coopDetails]));
    dispatch(setCountry(country));
    navigate("/add-project/preview");
  };

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">
          Start Project
        </a>
        <button
          onClick={() => window.history.back()}
          data-back-button
          className="header-icon header-icon-1"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <ProfileClick />
      </div>

      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="content mb-0">
            <div>
              <p className="font-14">Complete the form below to get a new project </p>
            </div>
            <div
              className="accordion"
              onClick={(e) => {
                e.preventDefault();
                //   handleDescriptionModal();
              }}
            >
              <p
                className="btn accordion-btn opacity-80"
                style={{
                  marginBottom: "0",
                  paddingLeft: "0",
                }}
              >
                <span
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    marginBottom: "0",
                    
                  }}
                >
                  Read More
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="card card-style">
          <div className="content mb-0">
            <form onSubmit={handleSubmit(handleSave)}>
              <div className="input-style input-style-2 input-required">
                <select
                  {...register("coop", {
                    required: "Co-op is required",
                  })}
                  className="form-control"
                >
                  <option value="" disabled>
                    Choose a co-op to govern your project
                  </option>
                  {coops?.map((type, index) => (
                    <option key={index} value={type.canisterId.toText()}>
                      {type.name}
                    </option>
                  ))}
                </select>
                {errors.coop && (
                  <p className="text-red-600">{errors.coop.message}</p>
                )}
                <input
                  placeholder="What's your project name?"
                  type="text"
                  id="name"
                  {...register("name")}
                  className="textinput textInput form-control"
                />
                {errors.name && (
                  <p className="text-red-600">{errors.name.message}</p>
                )}
                <input
                  placeholder="Summarise your project"
                  type="text"
                  id="summary"
                  {...register("summary")}
                  className="form-control"
                />
                {errors.summary && (
                  <p className="text-red-600">{errors.summary.message}</p>
                )}

                <textarea
                  placeholder="Describe your project here..."
                  id="description"
                  {...register("description")}
                  className="form-control"
                  rows={6}
                />
                {errors.description && (
                  <p className="text-red-600">{errors.description.message}</p>
                )}
                <input
                  placeholder="How long your project run?"
                  type="number"
                  id="duration"
                  {...register("duration")}
                  className="textinput textInput form-control"
                />
                {errors.duration && (
                  <p className="text-red-600">{errors.duration.message}</p>
                )}
                <input
                  placeholder="How much funding does your project need?"
                  type="number"
                  id="fundingGoal"
                  {...register("fundingGoal")}
                  className="textinput textInput form-control"
                />
                {errors.fundingGoal && (
                  <p className="text-red-600">{errors.fundingGoal.message}</p>
                )}
                <select
                  id="location"
                  {...register("location")}
                  className="form-control"
                >
                  <option value="" disabled>
                    Where will your project be located?
                  </option>
                  {countries?.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.location && (
                  <p className="text-red-600">{errors.location.message}</p>
                )}
                <div className="col-12">
                  <button
                    type="submit"
                    className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-3"
                  >
                    Next
                  </button>
                </div>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProject;
