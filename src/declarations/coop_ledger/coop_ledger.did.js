export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const CoopTransaction = IDL.Record({
    'ticker' : IDL.Opt(IDL.Text),
    'userId' : IDL.Principal,
    'txId' : IDL.Text,
    'tokenSymbol' : IDL.Opt(IDL.Text),
    'timestamp' : Time,
    'txType' : IDL.Text,
    'coopId' : IDL.Principal,
    'amount' : IDL.Nat,
  });
  const CoopLedger = IDL.Service({
    'addTransaction' : IDL.Func([CoopTransaction], [], []),
    'getAllTransactions' : IDL.Func([], [IDL.Vec(CoopTransaction)], []),
    'getTransactionByTxId' : IDL.Func([IDL.Text], [CoopTransaction], []),
    'getTransactionsByCoopId' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(CoopTransaction)],
        ['query'],
      ),
    'getTransactionsByUserId' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(CoopTransaction)],
        ['query'],
      ),
    'getTransactionsByUserIdAndCoopId' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [IDL.Vec(CoopTransaction)],
        ['query'],
      ),
  });
  return CoopLedger;
};
export const init = ({ IDL }) => { return []; };
