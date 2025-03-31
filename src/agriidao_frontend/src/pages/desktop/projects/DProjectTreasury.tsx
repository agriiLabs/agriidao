import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import {
  Project,
  Treasury,
} from "../../../../../declarations/projects/projects.did";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import DPManagementCardProps from "./components/DProjectManagementCard";

function DProjectTreasury() {
  const { projectsActor, coopIndexerActor } = useAuth();
  const { id } = useParams();
  const { projectOwner } = useSelector((state: RootState) => state.app);
  const [project, setProject] = useState<Project | null>(null);
  const [treasury, setTreasury] = useState<Treasury | null>(null);
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
      getTreasury();
    }
  }, [project]);

  const getTreasury = async () => {
    if (!project) {
      console.error("Project is null");
      return;
    }
    try {
      const res = await projectsActor?.getTreasuryByProjectId(project.id);
      if (res) {
        setTreasury(res);
      }
    } catch (error) {
      console.error("Error fetching treasury:", error);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Treasury</h5>
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
                <h5 className="mb-0">At A Glance</h5>
              </div>

              <dl className="row">
                <dt className="col-sm-4">Balance</dt>
                <dd className="col-sm-8 text-end">
                  {Number(treasury?.balance)} USDC
                </dd>
                <dt className="col-sm-6">Total In</dt>
                <dd className="col-sm-6 text-end">
                  {Number(treasury?.totalIn)} USDC
                </dd>
                <dt className="col-sm-6">Total Out</dt>
                <dd className="col-sm-6 text-end">
                  {Number(treasury?.totalOut)} USDC
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DProjectTreasury;
