import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import imagePath2 from "../../../../assets/images/projects-default.png";
import CountryName from "../../../../components/agriidao/CountryName";
import { useAuth } from "../../../../hooks/Context";

interface DPManagementCardProps {
  project: any;
}

const DPManagementCardProps: React.FC<DPManagementCardProps> = ({ project }) => {
    const { coopIndexerActor } = useAuth();
    const [coop, setCoop] = useState<string | null>(null);
    
  console.log("project", project);
  useEffect(() => {
      if (project) {
        getCoop();
      }
    }, [project]);
  
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
    <div className="col-xl-12 mt-4">
      <div className="card rounded shadow border-0 p-4">
        <div className="d-flex">
          <img
            src={imagePath2}
            width="35"
            className="avatar avatar-ex-small rounded"
            alt="Default Co-op Image"
            style={{ marginRight: "15px" }}
          />
          <h5 className="mb-0 mt-1">{project?.name}</h5>
        </div>
        <div className="mt-4">
          <dl className="row">
            <dt className="col-sm-4">Co-op</dt>
            <dd className="col-sm-8 text-end">
              {coop || "Unknown Co-op"}
            </dd>
            <dt className="col-sm-6">Funding Goal</dt>
            <dd className="col-sm-6 text-end">
              {Number(project?.fundingGoal) || 0} USDC
            </dd>
            <dt className="col-sm-6">Location</dt>
            <dd className="col-sm-6 text-end">
              <CountryName id={project?.location || ""} />
            </dd>
            <dt className="col-sm-4">Duration</dt>
            <dd className="col-sm-8 text-end">
              {Number(project?.duration) || "-"} Days
            </dd>
          </dl>
          <div
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: project?.summary || "" }}
          ></div>

          <div className="mt-3">
            <NavLink
              to={`/d/projects/overview/${project?.id}`}
              className="btn btn-outline-dark col-sm-12"
            >
              Overview
            </NavLink>
          </div>
          <div className="mt-2">
            <NavLink
              to={`/d/projects/forecast/${project?.id}`}
              className="btn btn-outline-dark col-sm-12"
            >
              Financial Forecast
            </NavLink>
          </div>
          <div className="mt-2">
            <NavLink
              to={`/d/projects/milestones/${project?.id}`}
              className="btn btn-outline-dark col-sm-12"
            >
              Milestones
            </NavLink>
          </div>
          <div className="mt-2">
            <NavLink
              to={`/d/projects/treasury/${project?.id}`}
              className="btn btn-outline-dark col-sm-12"
            >
              Treasury
            </NavLink>
          </div>
          <div className="mt-2">
            <NavLink
              to={`/d/projects/proposals/${project?.id}`}
              className="btn btn-outline-dark col-sm-12"
            >
              Proposals
            </NavLink>
          </div>
          <div className="mt-2">
            <NavLink
              to={`/d/projects/backers/${project?.id}`}
              className="btn btn-outline-dark col-sm-12"
            >
              Backers
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DPManagementCardProps;
