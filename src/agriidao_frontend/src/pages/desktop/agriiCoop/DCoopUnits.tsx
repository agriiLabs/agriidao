import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getCoopActor from "../../coops/components/CoopActor";
import {
  Coop,
  MintingFees,
  MintUnitsArgs,
  PlatformFees,
} from "../../../../../declarations/coop_manager/coop_manager.did";
import {
  ckUSDCe6s,
  ckUSDCFees,
  USDCCanisterId,
} from "../../../constants/canisters_config";
import { Principal } from "@dfinity/principal";
import { IcrcWallet } from "@dfinity/oisy-wallet-signer/icrc-wallet";
import { WALLET_URL } from "../../../constants/wallets";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { toastSuccess } from "../../../utils/Utils";
import { IcrcTransferError } from "@dfinity/ledger-icrc";
import imagePath2 from "../../../assets/images/co-ops-default.png";


type FormData = {
  units: string;
};

const DCoopUnits = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [coop, setCoop] = useState<Coop | null>(null);
  const { user } = useSelector((state: RootState) => state.app);
  const [units, setUnits] = useState(1);
  const [fees, setFees] = useState<PlatformFees[]>([]);
  const [saving, setSaving] = useState(false);
  const [unitPrice, setUnitPrice] = useState(0);
  const [managementFee, setManagementFee] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [coopFee, setCoopFee] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [coopFeesDetails, setCoopFeesDetails] = useState<MintingFees | null>(
    null
  );

  useEffect(() => {
    if (id) {
      getCoopDetails();
    }
  }, [id]);

  const getCoopDetails = async () => {
    try {
      if (!id) {
        console.error("Coop ID is undefined");
        return;
      }

      const coopActor = await getCoopActor(id);
      const coopDetails = await coopActor.getDetails();
      const coopFees = await coopActor.getFeesDetails(BigInt(units));
      const unitPriceValue = Number(coopDetails.unitPrice) || 0;
      const managementFeeValue = Number(coopDetails.managementFee) || 0;

      setCoop(coopDetails);
      setUnitPrice(unitPriceValue / ckUSDCe6s);
      setManagementFee(managementFeeValue);
      // setSubTotal(Number(coopFees.subTotal) / ckUSDCe6s);
      setCoopFeesDetails(coopFees);
      //   setCoopFee(Number(coopFees.coopFee) / ckUSDCe6s);
      //   setPlatformFee(Number(coopFees.platformFee) / ckUSDCe6s);
      //   setTotal(Number(coopFees.totalPrice) / ckUSDCe6s);
    } catch (error) {
      console.error("Error fetching co-op details:", error);
    }
  };

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

      const amount_to_mint = BigInt(total * ckUSDCe6s + ckUSDCFees);
      let res = await wallet?.approve({
        owner: account.owner,
        params: {
          expected_allowance: undefined,
          expires_at: undefined,
          spender: {
            owner: Principal.fromText(id),
            subaccount: [],
          },
          amount: amount_to_mint,
        },
        ledgerCanisterId: USDCCanisterId,
      });
      if (res) {
        let mintArgs: MintUnitsArgs = {
          unitAmount: BigInt(units),
          tokenAmount: BigInt(total * ckUSDCe6s),
          blockheight: res,
          userId: Principal.fromText(account.owner),
        };

        const coopActor = await getCoopActor(id);
        await coopActor.mintUnits(mintArgs);

        setSaving(false);
        toastSuccess("Units minted successfully");
        navigate("/d/portfolio");
      }
    } catch (error: unknown) {
      console.error("Error approving", error);
      setSaving(false);
      if (error instanceof IcrcTransferError) {
        console.error(error.errorType);
      }
    }
  };

  const formattedUnitPrice = parseFloat(
    (Number(unitPrice) / ckUSDCe6s).toFixed(2)
  );

  const handleQuantityChange = (newUnits: number) => {
    if (newUnits < 1) return;
    setUnits(newUnits);
  }; 

  useEffect(() => {
    if (!coopFeesDetails) return;
    setSubTotal(units * unitPrice);
    setCoopFee((units * Number(coopFeesDetails?.coopFee || 0)) / ckUSDCe6s);
    setPlatformFee(
      (units * Number(coopFeesDetails?.platformFee || 0)) / ckUSDCe6s
    );
    setTotal((units * Number(coopFeesDetails?.totalPrice || 0)) / ckUSDCe6s);
  }, [units, unitPrice, coopFeesDetails]);
  console.log("coopFeesDetails", coopFeesDetails);
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-6 mx-auto mt-4">
        <div className="card rounded shadow border-0 p-4">
          <div className="d-flex justify-content-center mb-4">
            <h4 className="mb-0">Get {coop?.name} Units</h4>
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
                  value={units}
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
            <dt className="col-sm-6">Subtotal</dt>
            <dd className="col-sm-6 text-end">
              {subTotal.toFixed(2)} USD
            </dd>
            <dt className="col-sm-6">Co-op Fee</dt>
            <dd className="col-sm-6 text-end">
              {coopFee.toFixed(2)} USD
            </dd>
            <dt className="col-sm-6">Platform Fee</dt>
            <dd className="col-sm-6 text-end">
              {platformFee.toFixed(2)} USD
            </dd>
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
  );
};

export default DCoopUnits;
