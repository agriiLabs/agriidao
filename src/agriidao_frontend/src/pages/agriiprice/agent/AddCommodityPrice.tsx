import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Response } from "../../../utils/Types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  MarketLocationCommodity,
  MarketPriceRequest,
  MarketLocation,
} from "../../../../../declarations/commodity/commodity.did";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Country } from "../../../../../declarations/settings/settings.did";
import { toastSuccess } from "../../../utils/Utils";

type FormData = {
  price: number;
  unitKg: number;
};

const AddCommodityPrice = () => {
  const { agriidaoActor, settingsActor } = useAuth();
  const { user } = useSelector((state: RootState) => state.app);
  const navigate = useNavigate();
  const { id } = useParams();
  const [mLCommodity, setMLCommodity] =
    useState<MarketLocationCommodity | null>(null);
  const [marketLocation, setMarketLocation] = useState<MarketLocation | null>(
    null
  );
  const [saving, setSaving] = useState(false);
  const [country, setCountry] = useState<Country | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);


  const schema = z.object({
    price: z.number().min(1, { message: "Price required" }),
    unitKg: z.number().min(1, { message: "Unit(s) required" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    getMarketLocationCommodity();
  }, [id]);

  const getMarketLocationCommodity = async () => {
    if (!id || !agriidaoActor) {
      console.error("ID or agriidaoActor is null");
      return;
    }

    const res: Response = await agriidaoActor.getMarketLocationCommodityById(
      id
    );
    console.log("market location commodity", res);
    if (res.ok) {
      setMLCommodity(res.ok);
    } else {
      console.error(res.err);
    }
  };

  useEffect(() => {
    getMarketLocation();
  }, [mLCommodity]);

  const getMarketLocation = async () => {
    if ( !agriidaoActor) {
      console.error("ID or agriidaoActor is null");
      return;
    }

    if (!mLCommodity) {
      console.error("mLCommodity is null");
      return;
    }
    const res: Response = await agriidaoActor.getMarketLocationLatest(
      mLCommodity.marketLocationId
    );
    console.log("market location", res);
    if (res.ok) {
      setMarketLocation(res.ok);
    } else {
      console.error(res.err);
    }
  };

  useEffect(() => {
    getCountry();
  }, [marketLocation]);

  const getCountry = async () => {
    if (!settingsActor) {
      console.error("Country ID or settingsActor is null");
      return;
    }
    if (!marketLocation) {
      console.error("marketLocation is null");
      return;
    }
    const res: Response = await settingsActor.getCountryByCode(
      marketLocation.countryId
    );
    console.log("country", res);
    if (res.ok) {
      setCountry(res.ok);
    } else {
      console.error(res.err);
    }
  };

  useEffect(() => {
    // Check if the user has already submitted today
    const lastSubmission = localStorage.getItem(`lastSubmission-${mLCommodity?.id}`);
    const today = new Date().toISOString().split("T")[0]; // Get today's date

    if (lastSubmission === today) {
      setHasSubmitted(true); 
    } else {
      setHasSubmitted(false);
    }
  }, [mLCommodity?.id]);

  useEffect(() => {
    const checkMidnight = () => {
      const now = new Date();
      const millisTillMidnight =
        new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0).getTime() -
        now.getTime();
  
      setTimeout(() => {
        setHasSubmitted(false);
        localStorage.removeItem("lastSubmission"); // Clear submission
      }, millisTillMidnight);
    };
  
    checkMidnight();
  }, []);

  const handleSave = async (data: FormData, event?: React.BaseSyntheticEvent) => {
    setSaving(true);
    try {
      if (!agriidaoActor) {
        console.error("agriidaoActor is null");
        setSaving(false);
        return;
      }
      let body: MarketPriceRequest = {
        ...mLCommodity,
        userId: user?.id?.toString() || "",
        marketLocationCommodityId: mLCommodity?.id?.toString() || "",
        marketLocationId: mLCommodity?.marketLocationId || "",
        price: data.price,
        unitKg: BigInt(data.unitKg),
        currency: country?.currency || "",
        pricePerKg: data.price / data.unitKg,
        status: {
          pending: false,
          accepted: true,
          rejected: false,
        },
      };
      await agriidaoActor.addMarketPrice(body);
      setSaving(false);
      toastSuccess("Commodity price created successfully");
      navigate(`/commodity-list/${mLCommodity?.marketLocationId}`);
    } catch (error) {
      setSaving(false);
      toast.error("Error creating commodity price");
      console.error("Error creating commodity price", error);
    }

    event?.preventDefault();

    // Mark submission in local storage
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(`lastSubmission-${mLCommodity?.id}`, today);

  };

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">
          Add Commodity Price
        </a>
        <Link
          to={`/commodity-list/${mLCommodity?.marketLocationId}`}
          className="header-icon header-icon-1"
        >
          <i className="fas fa-arrow-left"></i>
        </Link>
      </div>
      <div className="page-content header-clear-medium">
        <div className="content-block">
          <div className="card card-style">
            <div className="content mb-0">
              <form onSubmit={handleSubmit((data, event) => handleSave(data, event))}>
                <div className="input-style no-borders input-required">
                  <i className="fa fa-check disabled valid color-green-dark"></i>
                  <i className="fa fa-check disabled invalid color-red-dark"></i>
                  {/* <em>(required)</em> */}
                  <input
                    placeholder="What is today's price?"
                    type="number"
                    id="price"
                    {...register("price", { valueAsNumber: true })}
                    className="textinput textInput form-control"
                  />
                  {errors.price && (
                    <p className="text-red-600">{errors.price.message}</p>
                  )}
                </div>

                <div className="input-style no-borders input-required">
                  <i className="fa fa-check disabled valid color-green-dark"></i>
                  <i className="fa fa-check disabled invalid color-red-dark"></i>
                  {/* <em>(required)</em> */}
                  <input
                    placeholder="For how many kg's"
                    type="number"
                    id="unitKg"
                    {...register("unitKg", { valueAsNumber: true })}
                    className="textinput textInput form-control"
                  />
                  {errors.unitKg && (
                    <p className="text-red-600">{errors.unitKg.message}</p>
                  )}
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-3 mb-3"
                  >
                    {saving ? "Saving Price..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCommodityPrice;
