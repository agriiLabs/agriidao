import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import {
  Project,
  ProjectFunder,
} from "../../../../../declarations/projects/projects.did";
import DPManagementCardProps from "./components/DProjectManagementCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

function DProjectBackers() {
    const { projectsActor, coopIndexerActor } = useAuth();
  const { id } = useParams();
  const { projectOwner } = useSelector((state: RootState) => state.app);
  const [project, setProject] = useState<Project | null>(null);
    const [projectFunders, setProjectFunders] = useState<ProjectFunder[] | null>(null);
    const [coop, setCoop] = useState<string | null>(null);
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
          if (res && 'ok' in res) {
            setCoop(res.ok.name);
          }
        } catch (error) {
          console.error("Error fetching coop:", error);
        }
      };

    useEffect(() => {
        if (project) {
            getProjectBackers();
        }
    }, [project]);

    const getProjectBackers = async () => {
        if (!project) {
            console.error("Project is null");
            return;
        }
        try {
            const res = await projectsActor?.getProjectFundersByProjectId(
                project.id
            );
            if (res) {
                setProjectFunders(res);
            }
        } catch (error) {
            console.error("Error fetching project backers:", error);
        }
    };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Backers</h5>
        </div>
        <div className="mb-0 position-relative">
        <NavLink
              to={`/d/coop-units/${id}`}
              className="btn btn-outline-dark col-sm-12"
            >
              Fund
            </NavLink>
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
                <h5 className="mb-0">Backers</h5>
              </div>
              <table className="table table-center bg-white mb-0">
                <thead>
                  <tr>
                    <th className="border-bottom p-3">Backer</th>
                    <th className="border-bottom p-3">Amount</th>
                    <th className="border-bottom p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {projectFunders && projectFunders.length > 0 ? (
                    projectFunders.map((projectFunder, index) => (
                      <tr key={index}>
                        <td className="p-3">
                          <Link
                            to={`/d/projects/backer/${projectFunder.userId}`}
                            className="d-flex align-items-center"
                          >
                            {projectFunder.userId.toString()}
                          </Link>
                        </td>
                        <td className="p-3">{Number(projectFunder?.amount)}</td>
                        <td className="p-3">{Number(projectFunder.timestamp)}</td>
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
    </>
  )
}

export default DProjectBackers