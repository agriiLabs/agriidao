import React, { useEffect } from "react";
import ProfileClick from "../profile/component/ProfileClick";
import { useAuth } from "../../hooks/Context";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import imagePath1 from "../../assets/images/bg0.png";
import imagePath2 from "../../assets/images/default-user-profile.png";
import Tabs from "./components/Tabs";
import { Link, useParams } from "react-router-dom";
import {
  _SERVICE,
  Coop,
} from "../../../../declarations/coop_manager/coop_manager.did";
import getCoopActor from "./components/CoopActor";
import TransactionIcon from "./components/TransactionIcon";

interface CoopMember {
  id: string;
  balance: number;
}

const MemberCoop = () => {
  const { coopLedgerActor } = useAuth();
  const { user } = useSelector((state: RootState) => state.app);
  const { id } = useParams();
  const [coop, setCoop] = React.useState<Coop | null>(null);
  const [membership, setMembership] = React.useState<CoopMember | null>(null);
  const [balance, setBalance] = React.useState<number>(0);
  const [transactions, setTransactions] = React.useState<any[] | null>(null);
  const [usdValue, setUsdValue] = React.useState<number>(0);

  useEffect(() => {
    getCoopDetails();
  }, [id]);

  const getCoopDetails = async () => {
    if (id) {
      const coopActor = await getCoopActor(id);
      const coopDetails = await coopActor.getDetails();
      setCoop(coopDetails);
    }
  };

  useEffect(() => {
    if (coop) {
      getMembership();
    }
  }, [coop]);

  const getMembership = async () => {
    if (id) {
      const coopActor = await getCoopActor(id);
      if (user?.id) {
        const membership = await coopActor.getMemberbyUserId(user.id);
        setMembership(membership);
      }
    }
  };

  useEffect(() => {
    if (coop && membership) {
      totalBalance();
    }
  }, [coop, membership]);

  const totalBalance = () => {
    if (!coop || !membership) return 0;

    let totalUsdValue = 0;

    const unitPrice = coop?.unitPrice ?? 0;
    totalUsdValue += membership?.balance * unitPrice;
    setBalance(totalUsdValue);
  };

  useEffect(() => {
    if (user && coop) {
      getTransactions();
    }
  }, [user, coop]);

  const getTransactions = async () => {
    if (coop && user) {
      try {
        const transactions =
          await coopLedgerActor?.getTransactionsByUserIdAndCoopId(
            user.id,
            coop.id
          );

        const unitPrice = coop?.unitPrice ?? 0;
        // const tokenPrice = coop?.tokenPrice ?? 0; :TODO: //dynamically retreieve token price from the market
        const tokenPrice = 1;
        const transactionsWithUsdValue = transactions?.map((tx) => {
          const usdValue =
            tx.txType.toLowerCase() === "mint" ||
            tx.txType.toLowerCase() === "burn"
              ? tx.amount * unitPrice
              : tx.amount * (tokenPrice ?? 0);

          return {
            ...tx,
            usdValue, 
          };
        });

        if (transactionsWithUsdValue) {
          setTransactions(transactionsWithUsdValue);
          const totalUsdValue = transactionsWithUsdValue.reduce(
            (acc, tx) => acc + tx.usdValue,
            0
          );
          setUsdValue(totalUsdValue);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
  };

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">
          {coop?.name}
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
          <div className="content text-center">
            <div className="d-flex justify-content-center align-items-center mb-2 text-center">
              <img
                className="rounded-xl me-2"
                src={imagePath2}
                data-src={"#"}
                width="50"
                height="50"
                alt={"Default Co-op Image"}
              />
            </div>
            <p className="mb-n1 font-30">
              {membership?.balance} {coop?.ticker}
            </p>
            <p className="font-16 mt-1 opacity-60">${balance}</p>
          </div>
        </div>

        <div className="card card-style mb-4">
          <div className="content mb-4">
            <h4 className="font-700 text-uppercase font-12 opacity-50">
              My Projects
            </h4>
            <div className="divider mb-3" />
            {/* {transactions && transactions.length > 0 ? (
              <>
                {transactions.slice(0, 2).map((tx, index) => (
                  <Link
                    to={`/transaction-detail/${tx.txId}`} 
                    className="d-flex mb-3 text-decoration-none"
                    key={index}
                  >
                    <div className="align-self-center">
                      <img
                        className="rounded-xl me-3"
                        src={imagePath2}
                        data-src={"#"}
                        width="35"
                        height="35"
                        alt={"Default Co-op Image"}
                      />
                    </div>
                    <div className="align-self-center">
                      <p className="mb-n2 font-14">{tx.txType}</p>
                      <p className="font-11 opacity-60">
                        {new Date(
                          Number(tx.timestamp / 1000000n)
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="align-self-center ms-auto text-end">
                      <p className="mb-n1 font-14 ">
                        {tx.amount} {coop?.ticker}
                      </p>
                      <p className="font-11 opacity-60">
                        ${tx.usdValue.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}

                <div className="text-center mt-3">
                  <Link
                    to="/all-transactions" 
                    className="font-14 text-decoration-none text-grey"
                    style={{
                      color: "inherit",
                    }}
                  >
                    View All
                  </Link>
                </div>
              </>
            ) : (
              <p>No transactions found.</p>
            )} */}
          </div>
        </div>

        <div className="card card-style mb-4">
          <div className="content mb-4">
            <h4 className="font-700 text-uppercase font-12 opacity-50">
              My Activity
            </h4>
            <div className="divider mb-3" />
            {transactions && transactions.length > 0 ? (
              <>
                {transactions.slice(0, 3).map((tx, index) => {
                  const displayTicker =
                    tx.txType === "mint" || tx.txType === "redeem"
                      ? tx.ticker
                      : tx.tokenSymbol;

                  return (
                    <Link
                      to={`/transaction-detail/${tx.txId}`}
                      className="d-flex mb-3 text-decoration-none"
                      key={index}
                    >
                      <div className="align-self-center">
                        <TransactionIcon txType={tx.txType} />
                      </div>
                      <div className="align-self-center">
                        <p className="mb-n2 font-14">{tx.txType}</p>
                        <p className="font-11 opacity-60">
                          {new Date(
                            Number(tx.timestamp / 1000000n)
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="align-self-center ms-auto text-end">
                        <p className="mb-n1 font-14">
                          {tx.amount.toFixed(3)} {displayTicker}
                        </p>
                        <p className="font-11 opacity-60">
                          ${tx.usdValue.toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  );
                })}

                <div className="text-center mt-3">
                  <Link
                    to={`/all-coop-activity/${coop?.id}`}
                    className="font-14 text-decoration-none text-grey"
                    style={{
                      color: "inherit",
                    }}
                  >
                    View All
                  </Link>
                </div>
              </>
            ) : (
              <p>No transactions found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberCoop;
