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
        navigate("/coop");
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
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Get {coop?.name} Units</h5>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mt-4">
          <div className="table-responsive bg-white shadow rounded">
            <table className="table mb-2 table-center">
              <thead>
                <tr>
                  <th
                    className="border-bottom text-start ps-4 py-3"
                    style={{ minWidth: "300px;" }}
                  >
                    Unit
                  </th>
                  <th
                    className="border-bottom text-center py-3"
                    style={{ minWidth: "160px;" }}
                  >
                    Price
                  </th>
                  <th
                    className="border-bottom text-center py-3"
                    style={{ minWidth: "160px;" }}
                  >
                    Qty
                  </th>
                  <th
                    className="border-bottom text-end py-3 pe-4"
                    style={{ minWidth: "160px;" }}
                  >
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="shop-list">
                  <td>
                    <div className="d-flex align-items-center ps-2">
                      <img
                        src={imagePath2}
                        className="avatar avatar-ex-small rounded"
                        style={{ height: "auto;" }}
                        alt=""
                      />
                      <h6 className="mb-0 ms-3">{coop?.ticker}</h6>
                    </div>
                  </td>
                  <td className="text-center">{unitPrice.toFixed(2)} USD</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(units - 1)}
                        className="btn btn-icon btn-soft-primary minus"
                        style={{
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        -
                      </button>

                      <input
                        min="1"
                        name="quantity"
                        value={units}
                        type="number"
                        onChange={(e) =>
                          handleQuantityChange(Number(e.target.value))
                        }
                        className="text-center"
                        style={{
                          width: "60px",
                          height: "40px",
                          textAlign: "center",
                          border: "1px solid #ced4da",
                          borderRadius: "5px",
                        }}
                      />

                      <button
                        onClick={() => handleQuantityChange(units + 1)}
                        className="btn btn-icon btn-soft-primary plus text-center"
                        style={{
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="text-end fw-bold pe-4">
                    {subTotal.toFixed(2)} USD
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6 ms-auto mt-4">
          <div className="table-responsive bg-white rounded shadow">
            <table className="table table-center table-padding mb-0">
              <tbody>
                <tr>
                  <td className="h6 ps-4 py-3">Subtotal</td>
                  <td className="text-end fw-bold pe-4">
                    {subTotal.toFixed(2)} USD
                  </td>
                </tr>
                <tr>
                  <td className="h6 ps-4 py-3">Co-op Fee</td>
                  <td className="text-end fw-bold pe-4">
                    {" "}
                    {coopFee.toFixed(2)} USD
                  </td>
                </tr>
                <tr>
                  <td className="h6 ps-4 py-3">Platform Fee</td>
                  <td className="text-end fw-bold pe-4">
                    {" "}
                    {platformFee.toFixed(2)} USD
                  </td>
                </tr>
                <tr className="bg-light">
                  <td className="h6 ps-4 py-3">Total</td>
                  <td className="text-end fw-bold pe-4">
                    {total.toFixed(2)} USD
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
    </>
  );
};

export default DCoopUnits;
