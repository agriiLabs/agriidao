import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import {
  Milestone,
  Project,
} from "../../../../../declarations/projects/projects.did";

const DProjectMilestoneDetail = () => {
  const { projectsActor } = useAuth();
  const { id } = useParams();
  const [milestone, setMilestone] = useState<Milestone | null>(null);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (id) {
      getMilestoneDetails();
    }
  }, [id]);

  const getMilestoneDetails = async () => {
    try {
      if (!id) {
        console.error("Milestone ID is undefined");
        return;
      }
      const res = await projectsActor?.getMilestoneById(id);
      if (res) {
        setMilestone(res);
      }
    } catch (error) {
      console.error("Error fetching milestone details:", error);
    }
  };

  useEffect(() => {
    if (milestone) {
      getProjectDetails();
    }
  }
  , [milestone]);

  const getProjectDetails = async () => {
    try {
      if (!milestone) {
        console.error("Project ID is undefined");
        return;
      }
      const res = await projectsActor?.getProjectById(milestone.projectId);
      if (res) {
        setProject(res);
      }
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };
  console.log("milestone", milestone);
    console.log("project", project);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Milestone Detail</h5>
        </div>
        <div className="mb-0 position-relative">
          <select
            className="form-select form-control"
            id="campaignFilter"
            value=""
          >
            <option value="all">All</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-0 row">
                <h5 className="mb-0 col-sm-6">
                  {milestone?.name ? milestone?.name : "Unknown"}
                </h5>
                <h5 className="mb-0 col-sm-6 text-end"></h5>
              </div>
              <div className="mt-4">
                <dl className="row">
                  <dt className="col-sm-6">Project</dt>
                  <dd className="col-sm-6 text-end">
                    {project?.name ? project?.name : "Unknown"}
                  </dd>
                  <dt className="col-sm-6">Budget</dt>
                  <dd className="col-sm-6 text-end">
                    {" "}
                    {Number(milestone?.budget)
                      ? Number(milestone?.budget)
                      : "Unknown"}{" "}
                  </dd>
                  <dt className="col-sm-6">Status</dt>
                  <dd className="col-sm-6 text-end">
                    {milestone?.milestoneStatus
                      ? milestone.milestoneStatus.toString()
                      : "Unknown"}
                  </dd>
                </dl>
              </div>
              <div className="mt-3">
                <NavLink
                  to={`/d/projects/manager/milestones/${project?.id}`}
                  className="btn btn-outline-dark col-sm-12"
                >
                  Milestones
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
            <dl className="row">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">My Projects</h5>
              </div>
              <dt className="col-sm-6">Description</dt>
              <dd className="col-sm-6 text-end">
                {milestone?.description ? milestone?.description : "Unknown"}
              </dd>
              <dt className="col-sm-6">Task 1</dt>
              <dd className="col-sm-6 text-end">
                {milestone?.task1 ? milestone?.task1 : "Unknown"}
              </dd>
              <dt className="col-sm-6">Task 2</dt>
              <dd className="col-sm-6 text-end">
                {milestone?.task2 ? milestone?.task2 : "N/A"}
              </dd>
              <dt className="col-sm-6">Task 3</dt>
              <dd className="col-sm-6 text-end">
                {milestone?.task3 ? milestone?.task3 : "N/A"}
              </dd>

              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-8 mt-4">
        <div className="card border-0"></div>
      </div>
    </>
  );
};

export default DProjectMilestoneDetail;
