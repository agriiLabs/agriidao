import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import getCoopActor from "./components/CoopActor";
import {
  Coop,
  MintUnitsArgs,
  PlatformFees,
} from "../../../../declarations/coop_manager/coop_manager.did";
import { toastSuccess } from "../../utils/Utils";
import ProfileClick from "../profile/component/ProfileClick";
import { IcrcWallet } from "@dfinity/oisy-wallet-signer/icrc-wallet";
import { WALLET_URL } from "../../constants/wallets";
import { toast } from "react-toastify";
import { Principal } from "@dfinity/principal";
import { ckUSDCe6s, USDCCanisterId } from "../../constants/canisters_config";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const CoopUnitsPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.app);
  const { id } = useParams();
  const [coop, setCoop] = useState<Coop | null>(null);
  const { units } = location.state || {};
  const [fees, setFees] = useState<PlatformFees[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      getCoopDetails();
    }
  }, [id]);
  console.log("id", id);

  // useEffect(() => {
  //   getFees();
  // });

  const getCoopDetails = async () => {
    try {
      if (!id) {
        console.error("Coop ID is undefined");
        return;
      }

      const coopActor = await getCoopActor(id);
      const coopDetails = await coopActor.getDetails();

      if (coopDetails) {
        setCoop(coopDetails);
      }
    } catch (error) {
      console.error("Error fetching co-op details:", error);
    }
  };

  // const getFees = async () => {
  //   const coopActor = await getCoopActor(id);
  //   const fees = await coopActor.getFeeHistory();
  //   setFees(fees);
  // };
  const unitPrice = coop?.unitPrice;
  const managementFee = coop?.managementFee;
  const subTotal = (units * (Number(unitPrice) ?? 0)) / 100_000_000;
  const coopFee = (subTotal * (Number(coop?.managementFee) ?? 0)) / 100_000_000;
  const formattedUnitePrice = parseFloat((Number(unitPrice) / 100_000_000).toFixed(2));

  // const platformFee =
  //   subTotal * fees.reduce((acc, fee) => acc + (fee.depositFee ?? 0), 0);
  const platformFee = (subTotal * 0.01);
  const total = (subTotal + coopFee + platformFee);

  console.log("units", units);
  console.log("unitPrice", unitPrice);
  console.log("managementFee", managementFee);
  console.log("subTotal", subTotal);
  console.log("coopFee", coopFee);
  console.log("platformFee", platformFee);
  console.log("total", total);

  const handleConfirm = async () => {
    setSaving(true);
    try {
      if (!id) {
        console.error("Coop ID is undefined");
        return;
      }
      let wallet: IcrcWallet | undefined;
      wallet = await IcrcWallet.connect({
        url: WALLET_URL,
      });

      const accounts = await wallet?.accounts();

      const account = accounts?.[0];

      if (!account) {
        toast.error("No account found");
        return;
      }
      if (!user) {
        return;
      }
      console.log("Approving, waiting for approval");
      let res = await wallet?.approve({
        owner: account.owner,
        params: {
          expected_allowance: undefined,
          expires_at: undefined,
          spender: {
            owner: Principal.fromText(id),
            subaccount: [],
          },
          amount: BigInt(total * ckUSDCe6s),
        },
        ledgerCanisterId: USDCCanisterId,
      });
      console.log("approval res", res);
      if (res) {
        let mintArgs: MintUnitsArgs = {
          unitAmount: units,
          tokenAmount: BigInt(total * ckUSDCe6s),
          blockheight: res,
          userId: user.id,
        };

        const coopActor = await getCoopActor(id);
        await coopActor.mintUnits(mintArgs);

        setSaving(false);
        toastSuccess("Units minted successfully");
        navigate("/coop");
      }
    } catch (error) {
      setSaving(false);
      console.error("Error minting units:", error);
    }
  };

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">
          Preview Purchase
        </a>
        <button
          onClick={() => window.history.back()}
          data-back-button
          className="header-icon header-icon-1"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <ProfileClick />
      </div>

      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="content mb-0">
            <div className="row mb-0">
              <div className="col-6 mb-2">
                <p className="font-14 mt-1">Co-op</p>
              </div>
              <div className="col-6">
                <p className="font-14 text-end mt-1">{coop?.name}</p>
              </div>
              <div className="col-6 mb-2">
                <p className="font-14 mt-1">Unit Price</p>
              </div>
              <div className="col-6">
                <p className="font-14 text-end mt-1">{formattedUnitePrice} USD</p>
              </div>
              <div className="divider divider-margins mt-2 mb-2"></div>
              {units ? (
                <>
                  <div className="col-6 mb-2">
                    <p className="font-14 mt-1">Units</p>
                  </div>
                  <div className="col-6">
                    <p className="font-14 text-end mt-1">
                      {units} {coop?.ticker}
                    </p>
                  </div>
                  <div className="col-6 mb-2">
                    <p className="font-14 mt-1">Subtotal</p>
                  </div>
                  <div className="col-6">
                    <p className="font-14 text-end mt-1">
                      ${subTotal.toFixed(2)}
                    </p>
                  </div>
                  <div className="col-6 mb-2">
                    <p className="font-14 mt-1">Co-op Fee</p>
                  </div>
                  <div className="col-6">
                    <p className="text-end mt-1">${coopFee.toFixed(2)}</p>
                  </div>
                  <div className="col-6 mb-2">
                    <p className="font-14 mt-1">Platform Fee</p>
                  </div>
                  <div className="col-6">
                    <p className="text-end mt-1">${platformFee.toFixed(2)}</p>
                  </div>
                  <div className="divider divider-margins w-100 mt-2 mb-2"></div>
                  <div className="col-6 mb-2">
                    <p className="font-14 mt-1">Total</p>
                  </div>
                  <div className="col-6">
                    <p className="font-14 text-end mt-1">${total.toFixed(2)}</p>
                  </div>
                  <div className="col-12 mb-4">
                    <button
                      onClick={handleConfirm}
                      type="button"
                      className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-3"
                    >
                      Get Units
                    </button>
                    <button
                      onClick={() => navigate(-1)}
                      type="button"
                      className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-3"
                    >
                      Go Back
                    </button>
                  </div>
                </>
              ) : (
                <p>
                  No data to preview. Please go back and enter units to
                  purchase.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoopUnitsPreview;
