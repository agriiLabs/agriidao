import { useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setCoopRequest } from "../../../redux/slices/app";
import { IcrcTransferError } from "@dfinity/ledger-icrc";
import { WALLET_URL } from "../../../constants/wallets";
import { IcrcWallet } from "@dfinity/oisy-wallet-signer/icrc-wallet";
import { toast } from "react-toastify";
import { ckUSDCe6s, ckUSDCFees, coopIndexerCanisterId, startCOOPFees, USDCCanisterId } from "../../../constants/canisters_config";
import { Principal } from "@dfinity/principal";


const DCoopCreatePreview = () => {
  const { coopIndexerActor } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const { coopRequest } = useSelector((state: RootState) => state.app);

  const handleSave = async () => {
    if (!coopIndexerActor || !coopRequest) {
      console.error("coopIndexerActor or coopRequest not found");
      return;
    }
    setSaving(true);
    try {
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

      const amount_to_approve = BigInt(startCOOPFees * ckUSDCe6s + ckUSDCFees);
      let res1 = await wallet?.approve({
        owner: account.owner,
        params: {
          expected_allowance: undefined,
          expires_at: undefined,
          spender: {
            owner: Principal.fromText(coopIndexerCanisterId),
            subaccount: [],
          },
          amount: amount_to_approve,
        },
        ledgerCanisterId: USDCCanisterId,
      });

      if (res1) {
        const res = await coopIndexerActor.createCoOpCanister(coopRequest);
        if ("ok" in res) {
          setSaving(false);
          dispatch(setCoopRequest(null));
          toastSuccess("Coop successfully created");
          navigate("/d/coop-list");
        } else {
          setSaving(false);
          console.error("Error saving coop request: ", res.err);
          toastError("Error saving coop request");
        }
      } else {
        setSaving(false);
        toastError("Error approving transaction");
      }
    } catch (error) {
      setSaving(false);
      console.error("Error saving coop request: ", error);
      toastError("Error saving coop request");
    }
  };
  return (
    <>
      <div>DCoopCreatePreview</div>
      <div className="d-flex justify-content-between">
        {/* <button onClick={() => setCurrentStep(1)} className="btn btn-outline-dark">
            Back
          </button> */}
        <button
          disabled={saving}
          onClick={handleSave}
          className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-3"
        >
          {saving ? "Submitting..." : "Confirm"}
        </button>
      </div>
    </>


  )
}

export default DCoopCreatePreview