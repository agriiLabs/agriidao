import { FC, useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/Context";
import { MarketLocationAgentRequest } from "../../../../../../declarations/commodity/commodity.did";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { User } from "../../../../../../declarations/user/user.did";
import { setMarketLocationAgentRequest } from "../../../../redux/slices/app";

type Props = {
  showAddMarketAgentModal: boolean;
  setShowAddMarketAgentModal: (showAddMarketAgentModal: boolean) => void;
};

type FormData = {
  marketLocationId: string;
  userId: string;
};

const AddMarketAgent: FC<Props> = ({
  showAddMarketAgentModal,
  setShowAddMarketAgentModal,
}) => {
  const { agriidaoActor, userActor } = useAuth();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [market, setMarket] = useState<any | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [users, setUsers] = useState<User[] | null>(null);

  const schema = z.object({
    userId: z.string().min(1, { message: "User required" }),
  });

  useEffect(() => {
    if (id) {
      getMarketLocation(id);
    }
  }, [id]);

  const getMarketLocation = async (marketId: string) => {
    try {
      const res = await agriidaoActor.getMarketLocationLatest(marketId);
      setMarket(res);
    } catch (error) {
      console.error("Error fetching market location:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    if (!userActor) return;
    try {
      const res = await userActor?.getUsers();
      console.log("users: ", res);
      setUsers(res ?? null);
    } catch (error) {
      console.log("Error when fetching users", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleSave = async (data: FormData) => {
    if (!agriidaoActor || !userActor || !users) {
      console.error("agriidaoActor or userActor is null");
      return;
    }
    if (!agriidaoActor || !market) {
      console.error("agriidaoActor or market is null");
      return;
    }

    try {
      let marketAgent: MarketLocationAgentRequest = {
        marketLocationId: data.marketLocationId,
        userId: data.userId,
      };
      dispatch(setMarketLocationAgentRequest(marketAgent));
      setCurrentStep(2);
    } catch (error) {
      console.error("Error setting market location agent request:", error);
      toast.error("Error setting market location agent request");
    }
  };
      
  return (
    <Modal
      show={showAddMarketAgentModal}
      onHide={() => setShowAddMarketAgentModal(false)}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Market Agent</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentStep === 1 ? (
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="input-style no-borders input-required">
              <select
                className={`form-select ${
                  errors.userId ? "is-invalid" : ""
                }`}
                {...register("userId")}
              >
                <option value="" disabled>
                  Select a User
                </option>
                {users?.map((user) => (
                  <option key={user.id.toString()} value={user.id.toString()}>
                    {user.username}
                  </option>
                ))}
              </select>
              {errors.userId && (
                <div className="invalid-feedback">{errors.userId.message}</div>
              )}
            </div>
            <button type="submit" className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-2">
                Next
                </button>
            </form>
        ) : (
          <AddMarketAgentPreview setCurrentStep={setCurrentStep} />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default AddMarketAgent;
