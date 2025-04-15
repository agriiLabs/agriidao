import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Project, ProjectFunderRequest } from "../../../../../declarations/projects/projects.did";
import getCoopActor from "../../coops/components/CoopActor";
import { Coop } from "../../../../../declarations/coop_manager/coop_manager.did";
import { Principal } from "@dfinity/principal";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { toastSuccess } from "../../../utils/Utils";
import imagePath2 from "../../../assets/images/co-ops-default.png";
import { useAuth } from "../../../hooks/Context";

type FormData = {
  amount: string;
};

const DProjectUnits = () => {
  const { projectsActor } = useAuth();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.app);
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [coop, setCoop] = useState<Coop | null>(null);
  const [amount, setAmount] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [saving, setSaving] = useState(false);

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
  console.log("project detail", project);
  console.log("coop detail", coop);

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
      const coopActor = await getCoopActor(project.coop.toString());
      const coopDetails = await coopActor.getDetails();
      setCoop(coopDetails);
      setUnitPrice(Number(coopDetails.unitPrice) / 100);
    } catch (error) {
      console.error("Error fetching co-op details:", error);
    }
  };

  const handleConfirm = async () => {
    console.log("HANDLE CONFIRM");
    setSaving(true);
    try {
      if (!id) {
        console.error("Project ID is undefined");
        return;
      }
      if (!user?.id) {
        console.error("User ID is undefined");
        toast.error("User ID is required to purchase units");
        setSaving(false);
        return;
      }
      let funder: ProjectFunderRequest = {
        projectId: id,
        userId: user.id,
        amount: BigInt(amount),
      };
      console.log("funder", funder);
      const res = await projectsActor?.addProjectFunder(funder);
      console.log("res", res);
      if (res && "ok" in res) {
        toastSuccess("Units purchased successfully");
        setSaving(false);
        navigate(`/d/projects/${id}`);
      }
    } catch (error) {
      console.error("Error purchasing project units:", error);
      toast.error("Error purchasing project units");
      setSaving(false);
    }
  };
  

  const handleQuantityChange = (newAmount: number) => {
    if (newAmount < 1) return;
    setAmount(newAmount);
  }; 
  const total = amount * unitPrice;

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-6 mx-auto mt-4">
        <div className="card rounded shadow border-0 p-4">
          <div className="d-flex justify-content-center mb-4">
            <h4 className="mb-0">Fund {project?.name}</h4>
          </div>
          <dl className="row align-items-center">
            <dt className="col-sm-12 mb-4">
              <div
                className="input-group"
                style={{ maxWidth: "220px", margin: "0 auto" }}
              >
                <input
                  min="1"
                  name="quantity"
                  value={amount}
                  type="number"
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  className="form-control text-center fw-bold fs-5 border-default"
                  style={{
                    height: "50px",
                    borderWidth: "2px",
                    borderRadius: "8px",
                  }}
                />
                <span
                  className="input-group-text bg-white border-default"
                  style={{
                    borderWidth: "2px",
                    borderLeft: "0",
                    borderTopRightRadius: "8px",
                    borderBottomRightRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <img
                    src={imagePath2}
                    alt="Co-op"
                    width="24"
                    height="24"
                    className="rounded-circle"
                  />
                  <span className="fw-semibold">{coop?.ticker}</span>
                </span>
              </div>
            </dt>
            
            <dt className="col-sm-6">Total</dt>
            <dd className="col-sm-6 text-end">
              {total.toFixed(2)} USD
            </dd>
          </dl>

          <div className="mt-4 text-end">
            <button
              onClick={handleConfirm}
              type="button"
              className="btn btn-outline-dark col-sm-12"
            >
              Get Units
            </button>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default DProjectUnits