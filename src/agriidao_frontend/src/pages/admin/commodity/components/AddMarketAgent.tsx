import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { MarketLocationAgentRequest } from "../../../../../declarations/agriidao_backend/agriidao_backend.did";
import { z } from "zod";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { User } from "../../../../../declarations/user/user.did";

type FormData = {
  marketLocationId: string;
  userId: string;
};

const AddMarketAgent = ({ setOpenForm, market, setAgentSaved }) => {
  const { agriidaoActor, userActor } = useAuth();
  const [saving, setSaving] = useState(false);
  const [users, setUsers] = useState<User[] | null>(null);

  const schema = z.object({
    userId: z.string().min(1, { message: "User required" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await userActor.getUsers();
      console.log("users: ", res);
      setUsers(res);
    } catch (error) {
      console.log("Error when fetching users", error);
    }
  };

  const handleSave = async (data: FormData) => {
    const user = users.find((user) => user.id.toString() === data.userId);
    console.log("user: ", user);
    if (!user) {
      toast.error("No user found", {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: true,
      });
      return;
    }
    setSaving(true);
    try {
      let body: MarketLocationAgentRequest = {
        marketLocationId: market.id,
        userId: data.userId,
      };
      console.log("adding agent: ", body);
      await agriidaoActor.addMarketLocationAgent(body);
      console.log("Agent added");
      
        console.log("Agent succesfully added.", {
          autoClose: 5000,
          position: "top-center",
          hideProgressBar: true,
        });
      setAgentSaved(true);
      setOpenForm(false);
      setSaving(false);
    } catch (error) {
      console.log("there was an error creating market agent", error);
      toast.error("There was an error saving market agent.", {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: true,
      });
      setSaving(false);
    }
  };

  return (
    <div className="form-modal">
      <div className="container-fluid modal-child">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="javascript: void(0);">agriiDAO</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">
                      Market Locations
                    </a>
                  </li>
                  <li className="breadcrumb-item active">Add Agent</li>
                </ol>
              </div>
              <h4 className="page-title">Add Agent</h4>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <h5 className="text-uppercase bg-light p-2 mt-0 mb-3">General</h5>
              <form onSubmit={handleSubmit(handleSave)}>
                <div className="form-group mb-3">
                  <div className="form-group">
                    <label
                      htmlFor="commodityId"
                      className="col-form-label requiredField"
                    >
                      Agent
                      <span className="asteriskField">*</span>
                    </label>

                    <select
                      id="userId"
                      {...register("userId")}
                      className="select form-control"
                    >
                      <option value="" disabled>
                        Select a User
                      </option>
                      {users?.map((user) => (
                        <option
                          key={user.id.toString()}
                          value={user.id.toString()}
                        >
                          {user.username}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.userId && (
                    <span className="text-red-600">
                      {errors.userId.message}
                    </span>
                  )}
                </div>

                <div className="col-12">
                  <div className="text-center mb-3">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenForm(false);
                      }}
                      className="btn w-sm btn-light waves-effect"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn w-sm btn-success waves-effect waves-light"
                    >
                      {saving ? "Saving Market Agent..." : "Save"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMarketAgent;
