import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { Link, NavLink, useParams } from "react-router-dom";
import { Coop } from "../../../../../declarations/coop_manager/coop_manager.did";
import DCoopCardProps from "./components/DCoopCard";
import getCoopActor from "../../coops/components/CoopActor";
import { Proposal } from "../../../../../declarations/proposals/proposals.did";
import { formatDate } from "../../../utils/Utils"; 

function DCoopProposals() {
  const { proposalsActor, projectsActor } = useAuth();
  const { id } = useParams();
  const [coop, setCoop] = useState<Coop | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);

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
    if (coop) {
      getAllProposals();
    }
  }, [coop]);

  const getAllProposals = async () => {
    if (!coop) {
      console.error("Coop is null");
      return;
    }

    try {
      const coopProposals =
        (await proposalsActor?.getProposalsByCoopId(coop.id)) || [];
      const projectRes = await projectsActor?.getProjectsByCoop(
        coop.id.toString()
      );

      let projectProposals: Proposal[] = [];
      if (projectRes) {
        const proposalsArray = await Promise.all(
          projectRes.map(async (project) => {
            return (
              (await proposalsActor?.getProposalsByProjectId(project.id)) || []
            );
          })
        );
        projectProposals = proposalsArray.flat();
      }

      setProposals([...coopProposals, ...projectProposals]);
    } catch (error) {
      console.error("Error fetching proposals:", error);
    }
  };

  return (
    <>
    <div className="d-flex align-items-center justify-content-between">
      <div>
        <h5 className="mb-0">Co-op Proposals</h5>
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
              <h5 className="mb-0">Proposals</h5>
            </div>
            <table className="table table-center bg-white mb-0">
              <thead>
                <tr>
                  <th className="border-bottom p-3">ID</th>
                  <th className="border-bottom p-3">Project</th>
                  <th className="border-bottom p-3">Status</th>
                  <th className="border-bottom p-3">Ends</th>
                </tr>
              </thead>
              <tbody>
                {proposals && proposals.length > 0 ? (
                  proposals.map((proposal, index) => (
                    <tr key={index}>
                      <td className="p-3">
                        <Link
                          to={`/d/coop/proposal-detail/${proposal.id}`}
                          className="d-flex align-items-center"
                        >
                          {proposal.id}
                        </Link>
                      </td>
                      <td className="p-3">{proposal.projectId ? <span><i className="mdi mdi-check me-2"></i></span> : ""}</td>
                      <td className="p-3">{Object.keys(proposal?.status)[0] || ""} </td>
                      <td className="p-3">{proposal?.voteEnd ? formatDate(Number(proposal?.voteEnd)) : ""}</td>
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

export default DCoopProposals;
