import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import { Coop } from "../../../../../declarations/coop_manager/coop_manager.did";
import DCoopCardProps from "./components/DCoopCard";
import getCoopActor from "../../coops/components/CoopActor";
import {
  Proposal,
  Vote,
} from "../../../../../declarations/proposals/proposals.did";
import { toast } from "react-toastify";
import { Project } from "../../../../../declarations/projects/projects.did";
import CountdownTimer from "../projects/components/DCountdownTimer";

type FormData = {};

function DCoopProposalDetail() {
  const { proposalsActor, projectsActor, identity } = useAuth();
  const { id } = useParams();
  const [coop, setCoop] = useState<Coop | null>(null);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [votes, setVotes] = useState<Vote[] | null>(null);
  const [yesVotes, setYesVotes] = useState(0);
  const [noVotes, setNoVotes] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const yesPercentage =
    totalVotes > 0 ? ((yesVotes / totalVotes) * 100).toFixed(2) : 0;
  const noPercentage =
    totalVotes > 0 ? ((noVotes / totalVotes) * 100).toFixed(2) : 0;

  useEffect(() => {
    if (id) {
      getProposal(); 
    }
  }, [id]);

  const getProposal = async () => {
    try {
      if (!id) {
        console.error("Proposal ID is undefined");
        return;
      }
      const res = await proposalsActor?.getProposalById(id);
      if (res) {
        setProposal(res);
      }
    } catch (error) {
      console.error("Error fetching proposal details:", error);
    }
  };

  useEffect(() => {
    if (proposal) {
      getProject();
    }
  }, [proposal]);
  
  useEffect(() => {
    if (project) {
      getCoop();
    }
  }, [project]); 
  
  const getProject = async () => {
    if (!proposal) {
      console.error("Proposal is null");
      return;
    }
    try {
      const projectId = Array.isArray(proposal?.projectId)
        ? proposal.projectId[0]
        : proposal?.projectId;
      if (typeof projectId === "string") {
        const res = await projectsActor?.getProjectById(projectId);
        if (res) {
          setProject(res);  
        } 
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };
  
  const getCoop = async () => {
    if (!project) {
      console.error("Project is null");
      return;
    }
    try {
      const coopActor = await getCoopActor(project.coop.toText());
      const coopDetails = await coopActor.getDetails();
      setCoop(coopDetails);
    } catch (error) {
      console.error("Error fetching Co-op:", error);
    }
  };
  
 
  useEffect(() => {
    if (proposal) {
      getVotes();
    }
  }, [proposal]);

  const getVotes = async () => {
    if (!proposal) {
      console.error("Proposal is null");
      return;
    }
    try {
      const res = await proposalsActor?.getVotesByProposalId(proposal.id);
      if (res) {
        setVotes(res);
      }
      console.log("votes", votes);
    } catch (error) {
      console.error("Error fetching votes:", error);
    }
  };

  useEffect(() => {
    if (votes && votes.length > 0) {
      const yesCount = votes.filter((vote) => vote.isAccept === true).length;
      const noCount = votes.filter((vote) => vote.isAccept === false).length;
      const totalCount = votes.length;

      setYesVotes(yesCount);
      setNoVotes(noCount);
      setTotalVotes(totalCount);
    }
  }, [votes]);

  const handleVote = async (isAccept: boolean) => {
    if (!proposal) {
      console.error("Proposal is null");
      return;
    }
    try {
      if (isAccept === true) {
        const vote: Vote = {
          isAccept: true,
          proposalId: proposal.id,
          userId:
            identity?.getPrincipal() ||
            (() => {
              throw new Error("User identity is undefined");
            })(),
          timestamp: BigInt(Date.now()),
        };
        await proposalsActor?.addVote(vote);
      } else if (isAccept === false) {
        const vote: Vote = {
          isAccept: false,
          proposalId: proposal.id,
          userId:
            identity?.getPrincipal() ||
            (() => {
              throw new Error("User identity is undefined");
            })(),
          timestamp: BigInt(Date.now()),
        };
        await proposalsActor?.addVote(vote);
      }
      toast.success("Vote submitted successfully");
      getVotes();
    } catch (error) {
      console.error("Error submitting vote:", error);
      toast.error("Error submitting vote");
    }
  };

  return (
    <>
    <div className="d-flex align-items-center justify-content-between">
      <div>
        <h5 className="mb-0">Proposal Detail</h5>
      </div>
      <div className="mb-0 position-relative">
        <button
          //   onClick={handleAddProposal}
          id="nav-bottom"
          className="btn btn-outline-dark"
        >
          Submit Proposal
        </button>
      </div>
    </div>

    <div className="row">
      <div className="col-xl-4">
        <div className="col-xl-12 mt-4">
          <div className="card rounded shadow border-0 p-4">
            <div className="d-flex justify-content-between mb-0 row">
              <h5 className="mb-0 col-sm-12">Proposal ID:</h5>
              <h5 className="mb-0 col-sm-12">{proposal?.id}</h5>
            </div>
            <div className="mt-4">
              <dl className="row">
                <dt className="col-sm-6">Co-op</dt>
                <dd className="col-sm-6 text-end">{coop?.name}</dd>
                <dt className="col-sm-6">Project</dt>
                <dd className="col-sm-6 text-end">{project?.name}</dd>
                <dt className="col-sm-6">Total Votes</dt>
                <dd className="col-sm-6 text-end">{totalVotes}</dd>
                <dt className="col-sm-6">Status</dt>
                <dd className="col-sm-6 text-end">{proposal?.status ? Object.keys(proposal.status)[0] : "N/A"}</dd>
              </dl>
            </div>
            <div className="mt-3">
              <NavLink
                to={`/d/coop/proposals/${coop?.id}`}
                className="btn btn-outline-dark col-sm-12"
              >
                Co-op Proposals
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-8">
        <div className="col-xl-12 mt-4">
          <div className="card rounded shadow border-0 p-4">
            <div className="d-flex justify-content-between mb-4">
              <h5 className="mb-0">Proposal</h5>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: proposal?.description || "",
              }}
            ></div>
            <dl className="row mt-4">
              <dt className="col-sm-3">Proposed by</dt>
              <dd className="col-sm-9 text-end">
                {proposal?.proposer?.toText()}
              </dd>
            </dl>
          </div>
        </div>
        <div className="col-xl-12 mt-4">
          <div className="card rounded shadow border-0 p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h5 className="mb-0">Votes</h5>
              <div className="d-flex ms-auto gap-2">
                <h5 className="mb-0">Voting Ends</h5>
                {proposal?.voteEnd && (
                  <CountdownTimer voteEnd={proposal.voteEnd} proposalId={proposal.id} />
                )}
              </div>
            </div>
            <div
              className="progress"
              style={{ height: "25px", position: "relative" }}
            >
              <div
                className="progress-bar bg-success"
                style={{ width: `${yesPercentage}%` }}
                aria-valuenow={Number(yesPercentage)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span className="progress-value text-white fw-bold">
                  {yesPercentage}%
                </span>
              </div>

              <div
                className="progress-bar bg-danger"
                style={{
                  width: `${noPercentage}%`,
                  position: "absolute",
                  right: 0,
                }}
                aria-valuenow={Number(noPercentage)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span className="progress-value text-white fw-bold">
                  {noPercentage}%
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-4 mb-2">
              <button
                onClick={() => handleVote(true)}
                className="btn btn-outline-dark"
              >
                Yes
              </button>

              <button
                onClick={() => handleVote(false)}
                className="btn btn-outline-dark"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
}

export default DCoopProposalDetail;
