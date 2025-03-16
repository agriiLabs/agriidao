import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import { Project } from "../../../../../declarations/projects/projects.did";
import DPManagementCardProps from "./components/DProjectManagementCard";
import { Proposal } from "../../../../../declarations/proposals/proposals.did";
import DAddProjectProposal from "./components/DAddProjectProposal";
import CountdownTimer from "./components/DCountdownTimer";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const DProjectProposals = () => {
  const { projectsActor, proposalsActor } = useAuth();
  const { id } = useParams();
  const { projectOwner } = useSelector((state: RootState) => state.app);
  const [project, setProject] = useState<Project | null>(null);
  const [proposals, setProposals] = useState<Proposal[] | null>(null);
  const [showAddProposalModal, setShowAddProposalModal] = useState(false);
  const [proposalVotes, setProposalVotes] = useState<{ [key: string]: any[] }>({});
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (projectOwner) {
      setIsOwner(true);
    }
  }, [projectOwner]);

  useEffect(() => {
    if (id) {
      getProject();
    }
  }, [id]);

  const getProject = async () => {
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
      getProposals();
    }
  }, [project]);

  const getProposals = async () => {
    if (!project) {
      console.error("Project is null");
      return;
    }
    try {
      const res = await proposalsActor?.getProposalsByProjectId(
        project.id
      );
      if (res) {
        setProposals(res);
      }
    } catch (error) {
      console.error("Error fetching proposals:", error);
    }
  };

  useEffect(() => {
    if (proposals) {
      getVotes()
    }
  }, [proposals]);

    const getVotes = async () => {
        if (!proposals) {
        console.error("Proposals is null");
        return;
        }
        try {
        const votes = await Promise.all(
          proposals.map(async (proposal) => {
            const res = await proposalsActor?.getVotesByProposalId(proposal.id);
            return { proposalId: proposal.id, votes: res };
          })
        );
        const votesMap = votes.reduce((acc, { proposalId, votes }) => {
          acc[proposalId] = votes || [];
          return acc;
        }, {} as { [key: string]: any[] });
    
        setProposalVotes(votesMap);
        console.log("Votes per proposal:", votesMap);
      } catch (error) {
        console.error("Error fetching votes:", error);
      }


    };

  const formattedProposer = (proposer: string) => {
    if (!proposals) {
        return [];
    }
    const fisrtPart = proposer.slice(0, 5);
    const lastPart = proposer.slice(-5);
    return `${fisrtPart}...${lastPart}`;
    };
    
    
  const handleAddProposal = () => {
    setShowAddProposalModal(true);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Proposals</h5>
        </div>
        <div className="mb-0 position-relative">
          {isOwner ? (
        <button
          onClick={handleAddProposal}
          id="nav-bottom"
          className="btn btn-outline-dark"
        >
            Submit Proposal
          </button> ) : (
            <NavLink
            to={`/d/coop-units/${id}`}
            className="btn btn-outline-dark col-sm-6 me-4"
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
                <h5 className="mb-0">Proposals</h5>                
              </div>

              <table className="table table-center bg-white mb-0">
                <thead>
                  <tr>
                    <th className="border-bottom p-3">ID</th>
                    <th className="border-bottom p-3">Proposer</th>
                    <th className="border-bottom p-3">Votes</th>
                    <th className="border-bottom p-3">Voting Ends</th>
                  </tr>
                </thead>
                <tbody>
                  {proposals && proposals.length > 0 ? (
                    proposals.map((proposal: Proposal, index: number) => (
                      <tr key={index}>
                        <td align="left" width="40%">
                          <Link
                            to={`/d/projects/proposal-detail/${proposal.id}`}
                            className="d-flex align-items-center "
                            style={{ paddingTop: "9px" }}
                          >
                            <span>{proposal?.id}</span>
                          </Link>
                        </td>
                        <td className="p-3">{formattedProposer(proposal.proposer.toText())}</td>
                        <td className="p-3">{proposalVotes[proposal.id]?.length || 0}</td>
                        <td className="p-3">
                        <CountdownTimer proposalId={proposal.id} voteEnd={proposal.voteEnd} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showAddProposalModal && (
        <DAddProjectProposal
          {...{
            showProposalModal: showAddProposalModal,
            setShowProposalModal: setShowAddProposalModal,
          }}
        />
      )}
    </>
  );
};

export default DProjectProposals;
