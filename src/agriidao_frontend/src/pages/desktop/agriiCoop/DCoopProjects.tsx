import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { Link, NavLink, useParams } from "react-router-dom";
import { Coop } from "../../../../../declarations/coop_manager/coop_manager.did";
import DCoopCardProps from "./components/DCoopCard";
import getCoopActor from "../../coops/components/CoopActor";
import { Project } from "../../../../../declarations/projects/projects.did";
import CountryName from "../../../components/agriidao/CountryName";


const DCoopProjects = () => {
const { projectsActor } = useAuth();
const { id } = useParams();
const [coop, setCoop] = useState<Coop | null>(null);
const [projects, setProjects] = useState<Project[] | null>(null);

useEffect(() => {
  if (id) {
    getCoopDetails();
  }
}, [id]);

const getCoopDetails = async () => {
  try {
    if (!id) {
      console.error("Coop ID is undefined");
      return;
    }

    const coopActor = await getCoopActor(id);
    const coopDetails = await coopActor.getDetails();
    if (!coopDetails) {
      console.error("No details found for this Co-op ID:", id);
      return;
    }
    setCoop(coopDetails);
  } catch (error) {
    console.error("Error fetching co-op details:", error);
  }
};

useEffect(() => {
  if (!coop) return;
  getProjects();
}, [coop]);

const getProjects = async () => {
  if (!coop) {
    console.error("Coop is null");
    return;
  }
  try {
    const res = await projectsActor?.getProjectsByCoop(coop.id.toText());
    if (res) {
      setProjects(res);
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Co-op Projects</h5>
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
          <DCoopCardProps coop={coop} />
        </div>

        <div className="col-xl-8">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">Projects</h5>
              </div>
              <table className="table table-center bg-white mb-0">
                <thead>
                  <tr>
                    <th className="border-bottom p-3">Name</th>
                    <th className="border-bottom p-3">Funding</th>
                    <th className="border-bottom p-3">Location</th>
                    <th className="border-bottom p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projects && projects.length > 0 ? (
                    projects.map((project, index) => (
                      <tr key={index}>
                        <td className="p-3">
                          <Link
                            to={`/d/projects/overview/${project.id}`}
                            className="d-flex align-items-center"
                          >
                            {project.name}
                          </Link>
                        </td>
                        <td className="p-3">{Number(project?.unitsGoal) || ""}</td>
                        <td className="p-3"><CountryName id={project?.location || ""} /></td>
                        <td className="p-3">{Object.keys(project?.fundingStatus)[0] || ""}</td>
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
);
}

export default DCoopProjects;
