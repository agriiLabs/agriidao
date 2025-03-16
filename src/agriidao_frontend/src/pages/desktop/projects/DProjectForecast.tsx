import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import {
  Project,
  ProjectExpense,
  ProjectIncome,
  ProjectProjections,
} from "../../../../../declarations/projects/projects.did";
import DAddIncome from "./components/DAddIncome";
import DAddExpense from "./components/DAddExpense";
import DRoyalty from "./components/DRoyalty";
import DPManagementCardProps from "./components/DProjectManagementCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const DProjectForecast = () => {
  const { projectsActor, coopIndexerActor } = useAuth();
  const { id } = useParams();
  const { projectOwner } = useSelector((state: RootState) => state.app);
  const [isOwner, setIsOwner] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [projectProjections, setProjectProjections] =
    useState<ProjectProjections | null>(null);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showRoyaltySplitModal, setShowRoyaltySplitModal] = useState(false);
  const [incomeProjections, setIncomeProjections] = useState<
    ProjectIncome[] | null
  >(null);
  const [expenseProjections, setExpenseProjections] = useState<
    ProjectExpense[] | null
  >(null);

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
  console.log("incomeProjections", incomeProjections);

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
  };
  console.log("expenseProjections", expenseProjections);

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
        <div className="mb-0 position-relative">
          {isOwner ? (
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
                  {expenseProjections && expenseProjections.length > 0 ? (
                    expenseProjections.map((expense, index) => (
                      <tr key={index}>
                        <td className="p-3">{expense.item}</td>
                        <td className="p-3">{Number(expense.amount)}</td>
                        <td className="p-3">{Number(expense.quantity)}</td>
                        <td className="p-3">{Number(expense.total)} USDC</td>
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
