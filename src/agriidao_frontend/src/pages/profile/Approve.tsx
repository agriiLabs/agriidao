import { IcrcWallet } from "@dfinity/oisy-wallet-signer/icrc-wallet";
import { WALLET_URL } from "../../constants/wallets";
import { toast } from "react-toastify";
import { Principal } from "@dfinity/principal";
import { coopLedgerCanisterId, USDCCanisterId } from "../../constants/canisters_config";

const Approve = () => {
    const approve = async () => {
        let wallet: IcrcWallet | undefined;

        try {
            wallet = await IcrcWallet.connect({
                url: WALLET_URL
            });

            const accounts = await wallet?.accounts();

            const account = accounts?.[0];

            if (!account) {
                toast.error("No account found");
                return;
            }
            console.log("Approving, waiting for approval");
            let res = await wallet?.approve({
                owner: account.owner,
                params: {
                    expected_allowance: BigInt(20000000),
                    expires_at: null,
                    spender: {
                        owner: Principal.fromText(coopLedgerCanisterId),
                        subaccount: [],
                    },
                    amount: BigInt(20000000),
                },
                ledgerCanisterId: USDCCanisterId,
            });


            console.log("res", res);

        } catch (error) {
            console.log("Error approving", error);
        }




    }
    return (
        <div>
            <button
                className="btn btn-primary"
                onClick={approve}
            >
                Approve Buying 5 Units
            </button>
        </div>
    )
}

export default Approve