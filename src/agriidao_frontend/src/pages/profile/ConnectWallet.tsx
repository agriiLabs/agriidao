import { IcrcWallet } from '@dfinity/oisy-wallet-signer/icrc-wallet';
import { WALLET_URL } from '../../constants/wallets';
import { IcrcAccount } from '@dfinity/oisy-wallet-signer';
import { useState } from 'react';
import { useAuth } from '../../hooks/Context';
import Approve from './Approve';

const ConnectWallet = () => {
    const [account, setAccount] = useState<IcrcAccount | null>(null);
    const {identity} = useAuth();
    const connectWallet = async () => {
        let wallet: IcrcWallet | undefined;

        try {
            wallet = await IcrcWallet.connect({
                url: WALLET_URL,
            });

            const { allPermissionsGranted } = await wallet.requestPermissionsNotGranted();

            if (!allPermissionsGranted) {
                return;
            }

            const accounts = await wallet.accounts();
            setAccount(accounts[0]);
        } catch (error) {
            console.log("Error connecting wallet", error);
        } finally {
            if (wallet) {
                wallet.disconnect();
            }
        }
    };

    return (
        <div>
            <button
                className="btn btn-primary"
                onClick={connectWallet}
            >
            {account ? "Connected" : "Connect Wallet"}
            </button>
            {account && (
                <div>
                    <h3>Account</h3>
                    <p>Principal: {account.owner}</p>
                    <Approve/>
                </div>
            )}
        </div>
    )
}

export default ConnectWallet