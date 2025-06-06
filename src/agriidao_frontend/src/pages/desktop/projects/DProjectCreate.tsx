import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Principal } from "@dfinity/principal";
import { ProjectRequest, ProjectType } from "../../../../../declarations/projects/projects.did";
import {
  setCoopRecord,
  setProjectRequest,
  setCountry,
} from "../../../redux/slices/app";
import { CoopRecord } from "../../../../../declarations/coop_indexer/coop_indexer.did";

type FormData = {
  coop: string;
  name: string;
  summary: string;
  description: string;
  projectType: string;
  duration: number;
  unitsGoal: number;
  location: string;
  //   image: string;
};

const DProjectCreate = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projectsActor, coopIndexerActor, settingsActor } = useAuth();
    const { user } = useSelector((state: RootState) => state.app);
    const [coops, setCoops] = useState<CoopRecord[] | null>([]);
    const [countries, setCountries] = useState<any[] | null>([]);
    const [projectTypes, setProjectTypes] = useState<string[] | null>(null);
  
    const schema = z.object({
      coop: z.string().min(1, { message: "Invalid Principal" }),
      name: z.string().min(1, { message: "Name required" }),
      summary: z.string().min(1, { message: "Summary required" }),
      description: z.string().min(1, { message: "Description required" }),
      projectType: z.string().min(1, { message: "Project type required" }),
      duration: z.number().min(1, { message: "Duration required" }),
      unitsGoal: z.number().min(1, { message: "Units Goal required" }),
      location: z.string().min(1, { message: "Location required" }),
    });

    useEffect(() => {
      if (projectsActor) {
        getProjectTypes();
      }
    }
    , [projectsActor]);

    const getProjectTypes = async () => {
      if (!projectsActor) {
        console.error("projectsActor is null");
        return;
      }
      try {
        const res = await projectsActor.getProjectTypes();
        setProjectTypes(res);
      } catch (error) {
        console.error("Error getting project types: ", error);
      }
    };

    const convertToProjectType = (type: string): ProjectType | null => {
      switch (type) {
        case "GreenHouse":
          return { GreenHouse: null };
        case "Warehouse":
          return { Warehouse: null };
        case "Farm":
          return { Farm: null };
        case "SolarMiniGrid":
          return { SolarMiniGrid: null };
        case "Processing":
          return { Proccessing: null };
        case "Offtaking":
          return { Offtaking: null };
        case "ResearchAndDevelopment":
          return { ResearchAndDevelopment: null };
        case "AgTech":
          return { AgTech: null };
        default:
          return null;
      }
    };  
  
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
        const res = await coopIndexerActor.getCreatedCanisters();
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

        const coopPrincipal = Principal.fromText(data.coop); 
        console.log("data", data);
        const projectType = convertToProjectType(data.projectType);
        if (!projectType) {
            console.error("Invalid project type");
            return;
        }

        const country = countries?.find((country) => country.code === data.location);
        if (!country) {
            console.error("No country found");
            return;
        }

        try {
        let project: ProjectRequest = {
            owner: user?.id,
            coop: coopPrincipal,
            name: data.name,
            summary: data.summary,
            description: data.description,
            projectType,
            duration: BigInt(Number(data.duration) || 0),
            unitsGoal: BigInt(Number(data.unitsGoal) || 0),
            currency: country.currency,
            location: data.location,
            image: [],
        };

        dispatch(setProjectRequest(project));
        dispatch(setCoopRecord([getCoopDetails]));
        dispatch(setCountry(country));

        navigate("/d/start-project/preview");  
    } catch (error) {
        console.error("Error saving project details:", error);
    }
  };

  return (
    <>
    <div className="d-flex align-items-center justify-content-between">
      <div>
        <h5 className="mb-0">Start A Project</h5>
      </div>
    </div>

    <div className="col-xl-12 mt-4">
      <div className="card border-0 p-4">
        <div className="d-flex justify-content-between mb-4">
          <h5 className="mb-0">Overview</h5>
        </div>
        <div className="row">
          
            <form onSubmit={handleSubmit(handleSave)}>
            <div className="input-style no-borders input-required">
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
                  <span style={{ color: "red" }}>
                    {errors.coop.message}
                  </span>
                )}
              </div>
              <div className="input-style no-borders input-required">
                <input
                  placeholder="What's the name of your project?"
                  type="text"
                  id="name"
                  {...register("name")}
                  className="textinput textInput form-control"
                />
                {errors.name && (
                  <span style={{ color: "red" }}>{errors.name.message}</span>
                )}
              </div>
              
              <div className="input-style no-borders input-required">
                <input
                  placeholder="Summarise your project"
                  type="text"
                  id="summary"
                  {...register("summary")}
                  className="textinput textInput form-control"
                />
                {errors.summary && (
                  <span style={{ color: "red" }}>
                    {errors.summary.message}
                  </span>
                )}
              </div>
              <div className="input-style no-borders input-required">
              <textarea
                  placeholder="Describe your project..."
                  id="description"
                  {...register("description")}
                  className="form-control"
                  rows={6}
                />
                {errors.description && (
                  <span style={{ color: "red" }}>
                    {errors.description.message}
                  </span>
                )}
              </div>
              <div className="input-style no-borders input-required">
              <select
                  id="projectType"
                  {...register("projectType")}
                  className="form-control"
                >
                  <option value="">What type of project are you starting?</option>
                    
                  {projectTypes?.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <span style={{ color: "red" }}>
                    {errors.projectType.message}
                  </span>
                )}
              </div>
              
              <div className="input-style no-borders input-required">
                <input
                  placeholder="How long will you run your project?"
                  type="number"
                  id="duration"
                  {...register("duration", { valueAsNumber: true })}
                  className="textinput textInput form-control"
                />
                {errors.duration && (
                  <span style={{ color: "red" }}>
                    {errors.duration.message}
                  </span>
                )}
              </div>
              <div className="input-style no-borders input-required">
                <input
                  placeholder="How much funding does your project need?"
                  type="number"
                  id="unitsGoal"
                  {...register("unitsGoal", { valueAsNumber: true })}
                  className="textinput textInput form-control"
                />
                {errors.unitsGoal && (
                  <span style={{ color: "red" }}>
                    {errors.unitsGoal.message}
                  </span>
                )}
              </div>
              <div className="input-style no-borders input-required">
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
                  <span style={{ color: "red" }}>
                    {errors.location.message}
                  </span>
                )}
              </div>
              
              <button
                type="submit"
                className=" btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-2 "
              >
                Next
              </button>
            </form>
            
        </div>
      </div>
    </div>
  </>
);
};

export default DProjectCreate;
