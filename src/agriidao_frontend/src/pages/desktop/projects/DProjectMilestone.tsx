import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import {
  Project,
  Milestone,
} from "../../../../../declarations/projects/projects.did";
import DPManagementCardProps from "./components/DProjectManagementCard";
import DAddMilestone from "./components/DAddMilestone";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const DProjectMilestone = () => {
  const { projectsActor } = useAuth();
  const { id } = useParams();
  const { projectOwner } = useSelector((state: RootState) => state.app);
  const [project, setProject] = useState<Project | null>(null);
  const [milestones, setMilestones] = useState<Milestone[] | null>(null);
  const [showAddMilestoneModal, setShowAddMilestoneModal] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (projectOwner) {
      setIsOwner(true);
    }
  }, [projectOwner]);

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
      getMilestones();
    }
  }, [project]);

  const getMilestones = async () => {
    if (!project) {
      console.error("Project is null");
      return;
    }
    try {
      const res = await projectsActor?.getMilestonesByProjectId(project.id);
      if (res) {
        setMilestones(res);
      }
    } catch (error) {
      console.error("Error fetching milestones:", error);
    }
  };

  const handleAddMilestone = () => {
    setShowAddMilestoneModal(true);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Milestones</h5>
        </div>
        <div className="mb-0 position-relative">
          {isOwner ? (
            <button
              onClick={handleAddMilestone}
              id="nav-bottom"
              className="btn btn-outline-dark"
            >
              Add Milestone
            </button>
          ) : (
            <NavLink
              to={`/d/coop-units/${id}`}
              className="btn btn-outline-dark col-sm-12"
            >
              Fund
            </NavLink>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
          <DPManagementCardProps project={project} />
        </div>

        <div className="col-xl-8">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">Milestones</h5>
              </div>
              <table className="table table-center bg-white mb-0">
                <thead>
                  <tr>
                    <th className="border-bottom p-3">Task</th>
                    <th className="border-bottom p-3">Budget</th>
                    <th className="border-bottom p-3">Timeframe</th>
                  </tr>
                </thead>
                <tbody>
                  {milestones && milestones.length > 0 ? (
                    milestones.map((milestone, index) => (
                      <tr key={index}>
                        <td className="p-3">
                          <Link
                            to={`/d/projects/milestone-detail/${milestone.id}`}
                            className="d-flex align-items-center"
                          >
                            {milestone.task1}
                          </Link>
                        </td>
                        <td className="p-3">{Number(milestone.budget)}</td>
                        <td className="p-3">{Number(milestone.timestamp)}</td>
                      </tr>
                    ))
                  ) : (
                    <td colSpan={3}>No data available</td>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showAddMilestoneModal && (
        <DAddMilestone
          {...{
            showMilestoneModal: showAddMilestoneModal,
            setShowMilestoneModal: setShowAddMilestoneModal,
          }}
        />
      )}
    </>
  );
};

export default DProjectMilestone;
