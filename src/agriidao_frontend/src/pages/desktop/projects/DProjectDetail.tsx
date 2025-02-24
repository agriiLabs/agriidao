import { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from "../../../hooks/Context";
import { Project, ProjectProjections } from '../../../../../declarations/projects/projects.did';
import imagePath2 from '../../../assets/images/default-user-profile.png';
import CountryName from "../../../components/agriidao/CountryName";

const DProjectDetail = () => {
    const { projectsActor, coopIndexerActor } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);
    const [projectProjections, setProjectProjections] = useState<ProjectProjections | null>(null);
    const [coop, setCoop] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            getProjectDetails();
        }
    }, [id]);
    
    const getProjectDetails = async () => {
        try {
            if (!id) {
                console.error("Project ID is undefined");
                return;
            }
            const res = await projectsActor?.getProjectById(id);
            if (res) {
                setProject(res);
            }
        } catch (error) {
            console.error("Error fetching project details:", error);
        }
    };
    
    useEffect(() => {
        if (project) { 
            getProjectProjections();
            getCoop();
        }
    }, [project]); 
    
    const getProjectProjections = async () => {
        if (!project) {
            console.error("Project is null");
            return;
        }
        try {
            const res = await projectsActor?.getProjectProjectionsByProjectId(project.id);
            if (res) {
                setProjectProjections(res);
            }
        } catch (error) {
            console.error("Error fetching project projections:", error);
        }
    };

    const getCoop = async () => {
        if (!project) {
            console.error("Project is null");
            return;
        }
        try {
            const res = await coopIndexerActor?.getCoopById(project.coop);
            if (res) {
                setCoop(res.name);
            }
        } catch (error) {
            console.error("Error fetching coop:", error);
        }
    };
    
  return (
     <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Project Detail</h5>
        </div>
        <div className="mb-0 position-relative">
          <NavLink
            to={`/d/coop-units/${id}`}
            className="btn btn-outline-dark col-sm-12"
          >
            Fund Project
          </NavLink>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex">
                <img
                  src={imagePath2}
                  width="35"
                  className="rounded-circle mt- shadow-xl preload-img"
                  alt="Default Co-op Image"
                  style={{ marginRight: "15px" }}
                />
                <h5 className="mb-0 mt-1">{project?.name}</h5>
              </div>
              <div className="mt-4">
                <dl className="row">
                  <dt className="col-sm-4">Co-op</dt>
                  <dd className="col-sm-8 text-end">
                    {coop}
                  </dd>
                  <dt className="col-sm-6">Funding Goal</dt>
                  <dd className="col-sm-6 text-end">
                    {(Number(project?.fundingGoal) ?? 0)}{" "}
                    USDC
                  </dd>
                  <dt className="col-sm-6">Location</dt>
                  <dd className="col-sm-6 text-end">
                    <CountryName id={project?.location || ""} />
                  </dd>
                  <dt className="col-sm-4">Duration</dt>
                  <dd className="col-sm-8 text-end">
                    {Number(project?.duration) ? Number(project?.duration) : "-"} Days
                  </dd>
                </dl>
                <div
                  className="mt-4"
                  dangerouslySetInnerHTML={{ __html: project?.summary || "" }}
                ></div>

                <div className="mt-4">
                  <NavLink
                    to={`/d/coop-projects/${id}`}
                    className="btn btn-outline-dark col-sm-12"
                  >
                    Overview
                  </NavLink>
                </div>
                <div className="mt-2">
                  <NavLink
                    to={`/d/coop-projects/${id}`}
                    className="btn btn-outline-dark col-sm-12"
                  >
                    Milestones
                  </NavLink>
                </div>
                <div className="mt-2">
                  <NavLink
                    to={`/d/coop-projects/${id}`}
                    className="btn btn-outline-dark col-sm-12"
                  >
                    Treasury
                  </NavLink>
                </div>
                <div className="mt-2">
                  <NavLink
                    to={`/d/coop-projects/${id}`}
                    className="btn btn-outline-dark col-sm-12"
                  >
                    Proposals
                  </NavLink>
                </div>
                <div className="mt-2">
                  <NavLink
                    to={`/d/coop-projects/${id}`}
                    className="btn btn-outline-dark col-sm-12"
                  >
                    Backers
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">Financial Forecast</h5>
              </div>

              <dl className="row">
                <dt className="col-sm-4">Income</dt>
                <dd className="col-sm-8 text-end">
                  {Number(projectProjections?.income) } USDC
                </dd>
                <dt className="col-sm-6">Expenditure</dt>
                <dd className="col-sm-6 text-end">
                {Number(projectProjections?.expenses) } USDC
                </dd>
                <dt className="col-sm-6">Surplus</dt>
                <dd className="col-sm-6 text-end">
                {Number(projectProjections?.profit) } USDC
                </dd>
                <dt className="col-sm-6">Royalty Split</dt>
                <dd className="col-sm-6 text-end">
                {Number(projectProjections?.royaltyPercentage) }%
                </dd>
                <dt className="col-sm-6">Member Benefits</dt>
                <dd className="col-sm-6 text-end">
                {Number(projectProjections?.royaltySplit) } USDC
                </dd>

              </dl>
            </div>
          </div>
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">Description</h5>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: project?.description || "" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-8 mt-4">
        <div className="card border-0"></div>
      </div>
    </>
  )
}

export default DProjectDetail