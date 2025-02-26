import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import {
  Project,
  ProjectExpense,
  ProjectIncome,
  ProjectProjections,
} from "../../../../../declarations/projects/projects.did";
import imagePath2 from "../../../assets/images/projects-default.png";
import CountryName from "../../../components/agriidao/CountryName";
import DAddIncome from "./components/DAddIncome";
import DAddExpense from "./components/DAddExpense";
import DRoyalty from "./components/DRoyalty";

const DProjectForecast = () => {
  const { projectsActor, coopIndexerActor } = useAuth();
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [projectProjections, setProjectProjections] =
    useState<ProjectProjections | null>(null);
  const [coop, setCoop] = useState<string | null>(null);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showRoyaltySplitModal, setShowRoyaltySplitModal] = useState(false);
  const [incomeProjections, setIncomeProjections] = useState<
    ProjectIncome[] | null>(null);
  const [expenseProjections, setExpenseProjections] = useState<
    ProjectExpense[] | null>(null);

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
      if (res) {
        setCoop(res.name);
      }
    } catch (error) {
      console.error("Error fetching coop:", error);
    }
  };

  useEffect(() => {
    if (project) {
      getProjectProjections();
    }
  }, [project]);

  const getProjectProjections = async () => {
    if (!project) {
      console.error("Project is null");
      return;
    }
    try {
      const res = await projectsActor?.getProjectProjectionsByProjectId(
        project.id
      );
      if (res) {
        setProjectProjections(res);
      }
    } catch (error) {
      console.error("Error fetching project projections:", error);
    }
  };

  useEffect(() => {
    if (project) {
      getIncomeProjections();
      getExpenseProjections();
    }
  }, [project]);

  const getIncomeProjections = async () => {
    if (!project) {
      console.error("Project is null");
      return;
    }
    try {
      const res = await projectsActor?.getProjectionIncomesByProjectId(
        project.id
      );
      if (res) {
        setIncomeProjections(res);
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  const getExpenseProjections = async () => {
    if (!project) {
      console.error("Project is null");
      return;
    }
    try {
      const res = await projectsActor?.getProjectionExpensesByProjectId(
        project.id
      );
      if (res) {
        setExpenseProjections(res);
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  }


  const handleAddIncome = () => {
    setShowAddIncomeModal(true);
  };

  const handleAddExpense = () => {
    setShowAddExpenseModal(true);
  };

  const handleRoyaltySplit = () => {
    setShowRoyaltySplitModal(true);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Financial Forecast</h5>
        </div>
        <div className="d-flex ms-auto gap-2">
          <button
            onClick={handleAddIncome}
            id="nav-bottom"
            className="btn btn-outline-dark"
          >
            Add Income
          </button>

          <button
            onClick={handleAddExpense}
            id="nav-bottom"
            className="btn btn-outline-dark"
          >
            Add Expense
          </button>
          <button
            onClick={handleRoyaltySplit}
            id="nav-bottom"
            className="btn btn-outline-dark"
          >
            Royalty Split
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
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
                  <dd className="col-sm-8 text-end">{coop}</dd>
                  <dt className="col-sm-6">Funding Goal</dt>
                  <dd className="col-sm-6 text-end">
                    {Number(project?.fundingGoal) ?? 0} USDC
                  </dd>
                  <dt className="col-sm-6">Location</dt>
                  <dd className="col-sm-6 text-end">
                    <CountryName id={project?.location || ""} />
                  </dd>
                  <dt className="col-sm-4">Duration</dt>
                  <dd className="col-sm-8 text-end">
                    {Number(project?.duration)
                      ? Number(project?.duration)
                      : "-"}{" "}
                    Days
                  </dd>
                </dl>
                <div
                  className="mt-4"
                  dangerouslySetInnerHTML={{ __html: project?.summary || "" }}
                ></div>

                <div className="mt-3">
                  <NavLink
                    to={`/d/coop-projects/`}
                    className="btn btn-outline-dark col-sm-12"
                  >
                    Basic Info
                  </NavLink>
                </div>
                <div className="mt-2">
                  <NavLink
                    to={`/d/coop-projects/`}
                    className="btn btn-outline-dark col-sm-12"
                  >
                    Finacial Forecast
                  </NavLink>
                </div>
                <div className="mt-2">
                  <NavLink
                    to={`/d/coop-projects/`}
                    className="btn btn-outline-dark col-sm-12"
                  >
                    Milestones
                  </NavLink>
                </div>
                <div className="mt-2">
                  <NavLink
                    to={`/d/coop-projects/`}
                    className="btn btn-outline-dark col-sm-12"
                  >
                    Proposals
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">Financial Forecast</h5>
              </div>

              <dl className="row">
                <dt className="col-sm-4">Income</dt>
                <dd className="col-sm-8 text-end">
                  {Number(projectProjections?.income)} USDC
                </dd>
                <dt className="col-sm-6">Expenditure</dt>
                <dd className="col-sm-6 text-end">
                  {Number(projectProjections?.expenses)} USDC
                </dd>
                <dt className="col-sm-6">Surplus</dt>
                <dd className="col-sm-6 text-end">
                  {Number(projectProjections?.profit)} USDC
                </dd>
                <dt className="col-sm-6">Royalty Split</dt>
                <dd className="col-sm-6 text-end">
                  {Number(projectProjections?.royaltyPercentage)}%
                </dd>
                <dt className="col-sm-6">Member Benefits</dt>
                <dd className="col-sm-6 text-end">
                  {Number(projectProjections?.royaltySplit)} USDC
                </dd>
              </dl>
            </div>
          </div>
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">Income Forecast</h5>
              </div>
              <table className="table table-center bg-white mb-0">
                <thead>
                  <tr>
                    <th className="border-bottom p-3">Item</th>
                    <th className="border-bottom p-3">Cost</th>
                    <th className="border-bottom p-3">Qty</th>
                    <th className="border-bottom p-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {incomeProjections && incomeProjections.length > 0 ? (
                    incomeProjections.map((income, index) => (
                      <tr key={index}>
                        <td className="p-3">{income.item}</td>
                        <td className="p-3">{Number(income.amount)}</td>
                        <td className="p-3">{Number(income.quantity)}</td>
                        <td className="p-3">{Number(income.total)} USDC</td>
                      </tr>
                    ))
                  ) : (
                    <td colSpan={3}>No data available</td>
                  )}
                </tbody>
                
              </table>
            </div>
          </div>
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">Expenses</h5>
              </div>
              <table className="table table-center bg-white mb-0">
                <thead>
                  <tr>
                    <th className="border-bottom p-3">Item</th>
                    <th className="border-bottom p-3">Cost</th>
                    <th className="border-bottom p-3">Qty</th>
                    <th className="border-bottom p-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <td colSpan={3}>No data available</td>
                </tbody>
                  
              </table>
            </div>
          </div>
        </div>
      </div>

      {showAddIncomeModal && (
        <DAddIncome
          {...{
            showAddIncomeModal,
            setShowAddIncomeModal,
          }}
        />
      )}
      {showAddExpenseModal && (
        <DAddExpense
          {...{
            showAddExpenseModal,
            setShowAddExpenseModal,
          }}
        />
      )}
      {showRoyaltySplitModal && (
        <DRoyalty
          {...{
            showRoyaltyModal: showRoyaltySplitModal,
            setShowRoyaltyeModal: setShowRoyaltySplitModal,
          }}
        />
      )}
    </>
  );
};

export default DProjectForecast;
