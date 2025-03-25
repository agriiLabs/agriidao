import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CoopRequest } from "../../../../../declarations/coop_indexer/coop_indexer.did";
import { useDispatch } from "react-redux";
import { setCoopRequest } from "../../../redux/slices/app";

type FormData = {
  name: string;
  totalUnit: number;
  unitPrice: number;
  payoutFrequency: number;
  lockPeriod: number;
  summary: string;
  description: string;
  isCommunity: boolean;
  ticker: string;
  managementFee: number;
};

const DCoopCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { identity } = useAuth();

  const payoutOptions = [
    { label: "Weekly", value: 7 },
    { label: "Fortnightly", value: 14 },
    { label: "Monthly", value: 30 },
    { label: "Quarterly", value: 90 },
    { label: "Every 6 Months", value: 180 },
    { label: "Yearly", value: 365 },
  ];

  const schema = z.object({
    name: z
      .string()
      .min(3, { message: "Name must be 3 or more characters long" }),
    totalUnit: z.number().min(1, { message: "Total unit required" }),
    unitPrice: z.number().min(1, { message: "Unit price required" }),
    payoutFrequency: z
      .number()
      .min(1, { message: "Payout frequency required" }),
    lockPeriod: z.number().min(1, { message: "Lock period required" }),
    summary: z.string().min(1, { message: "Summary required" }),
    description: z.string().min(1, { message: "Description required" }),
    isCommunity: z.boolean(),
    ticker: z.string().min(1, { message: "Ticker required" }),
    managementFee: z.number().min(0.1, { message: "Management fee required" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    console.log("Form Errors:", errors);
  }, [errors]);

  let userId = identity?.getPrincipal();

  const handleSave = async (data: FormData) => {
    if (!userId) {
      throw new Error(
        "User ID is undefined. Please make sure the user is logged in."
      );
    }

    try {
      let body: CoopRequest = {
        name: data.name,
        totalUnit: BigInt(data.totalUnit),
        availableUnit: BigInt(data.totalUnit),
        unitPrice: BigInt(Math.round(data.unitPrice * 1_000_000)),
        maxValue: BigInt(data.totalUnit) * BigInt(data.unitPrice),
        payoutFrequency: BigInt(data.payoutFrequency),
        lockPeriod: BigInt(data.lockPeriod),
        summary: data.summary,
        description: data.description,
        isCommunity: data.isCommunity,
        ticker: data.ticker,
        managementFee: BigInt(Math.round(data.managementFee * 100)),
        unitImage: [],
      };

      dispatch(setCoopRequest(body));
      navigate("/d/start-coop/preview");
    } catch (error) {
      console.error("Error saving Coop details:", error);
    }
    console.log(data);
    console.log("Fee raw:", data.managementFee);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Start A Co-op</h5>
        </div>
      </div>

      <div className="col-xl-12 mt-4">
        <div className="card border-0 p-4">
          <div className="d-flex justify-content-between mb-4">
            <h5 className="mb-0">Overview</h5>
          </div>
          <div className="row">
            <form onSubmit={handleSubmit(handleSave)}>
              <div className="input-style no-borders input-required">
                <input
                  placeholder="What's the name of your co-op?"
                  type="text"
                  id="coopName"
                  {...register("name")}
                  className="textinput textInput form-control"
                />
                {errors.name && (
                  <span style={{ color: "red" }}>{errors.name.message}</span>
                )}
              </div>
              <div className="input-style no-borders input-required">
                <input
                  placeholder="What's the maximum number of units this co-op will issue?"
                  type="number"
                  id="totalUnit"
                  {...register("totalUnit", { valueAsNumber: true })}
                  className="textinput textInput form-control"
                />
                {errors.totalUnit && (
                  <span style={{ color: "red" }}>
                    {errors.totalUnit.message}
                  </span>
                )}
              </div>
              <div className="input-style no-borders input-required">
                <input
                  placeholder="What's the price per unit?"
                  type="number"
                  id="unitPrice"
                  {...register("unitPrice", { valueAsNumber: true })}
                  className="textinput textInput form-control"
                />
                {errors.unitPrice && (
                  <span style={{ color: "red" }}>
                    {errors.unitPrice.message}
                  </span>
                )}
              </div>
              <div className="input-style no-borders input-required">
                <select
                  id="payoutFrequency"
                  {...register("payoutFrequency", { valueAsNumber: true })}
                  className="textinput textInput form-control"
                >
                  <option value="">Select Payout Frequency</option>
                  {payoutOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.payoutFrequency && (
                  <span style={{ color: "red" }}>
                    {errors.payoutFrequency.message}
                  </span>
                )}
              </div>
              <div className="input-style no-borders input-required">
                <input
                  placeholder="What is the minimum lockup period for units?"
                  type="number"
                  id="lockPeriod"
                  {...register("lockPeriod", { valueAsNumber: true })}
                  className="textinput textInput form-control"
                />
                {errors.lockPeriod && (
                  <span style={{ color: "red" }}>
                    {errors.lockPeriod.message}
                  </span>
                )}
              </div>
              <div className="input-style no-borders input-required">
                <input
                  placeholder="What is the symbol/ticker for the co-op units?"
                  type="text"
                  id="ticker"
                  {...register("ticker")}
                  className="textinput textInput form-control"
                />
                {errors.ticker && (
                  <span style={{ color: "red" }}>{errors.ticker.message}</span>
                )}
              </div>
              <div className="input-style no-borders input-required">
                <input
                  placeholder="What is management fee for this co-op?"
                  type="number"
                  id="managementFee"
                  step="0.1"
                  {...register("managementFee", { valueAsNumber: true })}
                  className="textinput textInput form-control"
                />
                {errors.managementFee && (
                  <span style={{ color: "red" }}>
                    {errors.managementFee.message}
                  </span>
                )}
              </div>

              <div className="d-flex justify-content-between pb-4 ">
                <h6 className="mb-0">Is this a community co-op?</h6>
                <div className="form-check">
                  <input
                  // placeholder="Is this a community co-op?"
                    className="form-check-input"
                    type="checkbox"
                    id="isCommunity"
                    {...register("isCommunity")}
                  />
                  <label className="form-check-label"></label>
                </div>
              </div>

              <div className="input-style no-borders input-required">
                <textarea
                  placeholder="What is the purpose of this co-op?"
                  id="description"
                  {...register("description")}
                  className="textarea textInput form-control"
                />
                {errors.description && (
                  <span style={{ color: "red" }}>
                    {errors.description.message}
                  </span>
                )}
              </div>
              <div className="input-style no-borders input-required">
                <textarea
                  placeholder="Give a one sentence summary for your co-op"
                  id="summary"
                  {...register("summary")}
                  className="textarea textInput form-control"
                />
                {errors.summary && (
                  <span style={{ color: "red" }}>
                    {errors.summary.message}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className=" btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-2 "
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DCoopCreate;
