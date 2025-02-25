import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import {
  Project,
  ProjectOwner,
} from "../../../../../declarations/projects/projects.did";
import { Link, NavLink, useNavigate } from "react-router-dom";
import imagePath2 from "../../../assets/images/default-user-profile.png";
import { formatDate } from "../../../utils/Utils";

const DProjectManager = () => {
  const { projectsActor } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [owner, setOwner] = useState<ProjectOwner | null>(null);

  useEffect(() => {
    if (projectsActor) {
      // getProjects();
      getProjectOwner();
    }
  }, [projectsActor]);

  const getProjectOwner = async () => {
    if (!projectsActor) {
      console.error("projectsActor is null");
      return;
    }
    try {
      const res = await projectsActor.getProjectOwner();
      if (res) {
        setOwner(res);
      }
    } catch (error) {
      console.error("Error fetching project owner:", error);
    }
  };
  console.log("owner", owner);

  const getProjects = async () => {
    //   let res = await projectsActor?getProjectsByOwner();
    if (owner?.userId) {
      let res = await projectsActor?.getProjectsByOwner(owner.userId);
      if (res) {
        setProjects(res);
      }
    }
  };

    useEffect(() => {
        if (owner) {
        getProjects();
        }
    }, [owner]);

    console.log("projects", projects);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">My Projects</h5>
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
                <h5 className="mb-0 col-sm-6">Project Manager</h5>
                <h5 className="mb-0 col-sm-6 text-end"></h5>
              </div>
              <div className="mt-4">
                <dl className="row">
                  <dt className="col-sm-5">Name</dt>
                  <dd className="col-sm-7 text-end">{owner?.name}</dd>
                  <dt className="col-sm-6">Type</dt>
                  <dd className="col-sm-6 text-end">
                  {owner?.entityType ? Object.keys(owner.entityType)[0] : "Unknown"}
                  </dd>
                  <dt className="col-sm-6">Manager Since</dt>
                  <dd className="col-sm-6 text-end">
                    {" "}
                    {formatDate(Number(owner?.timestamp))
                      ? formatDate(Number(owner?.timestamp))
                      : ""}{" "}
                  </dd>
                  <dt className="col-sm-6">Projects</dt>
                  <dd className="col-sm-6 text-end">0</dd>
                </dl>
              </div>
              <div className="mt-3">
                <NavLink
                  to={`/d/coop-projects/`}
                  className="btn btn-outline-dark col-sm-12"
                >
                  Update Manager Info
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">My Projects</h5>
              </div>

              <table className="table table-center bg-white mb-0">
                <thead>
                  <tr>
                    <th className="border-bottom p-3">Name</th>
                    <th className="border-bottom p-3">Co-op</th>
                    <th className="border-bottom p-3">Funding Goal</th>
                    <th className="border-bottom p-3">Status</th>
                  </tr>
                </thead>
                {/* <tbody>
                      {memberCoops && memberCoops.length > 0 ? (
                        memberCoops.map((coop) => {
                          const coopDetail = coopDetails?.[coop.coopId.toText()];
                          const balance = BigInt(
                            coopBalances?.[coop.coopId.toText()] ?? 0
                          );
                          const unitPrice = BigInt(coopDetail?.unitPrice ?? 0);
                          const total = balance * unitPrice;
    
                          return (
                            <tr key={coop.coopId.toText()}>
                              <td className="p-3">
                                {coopDetail?.name ?? "Unknown Co-op"}
                              </td>
                              <td className="p-3">{balance.toString()}</td>
                              <td className="p-3">{total.toString()} USDC</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={3} className="text-center p-3">
                            No holdings found.
                          </td>
                        </tr>
                      )}
                    </tbody> */}
              </table>
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

export default DProjectManager;
