export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const CoopInitArgs = IDL.Record({
    'initTicker' : IDL.Text,
    'initTimestamp' : Time,
    'initPayoutFrequency' : IDL.Int,
    'initUnitImage' : IDL.Opt(IDL.Text),
    'initSummary' : IDL.Text,
    'initUnitPrice' : IDL.Nat,
    'initName' : IDL.Text,
    'initDescription' : IDL.Text,
    'initAvailableUnit' : IDL.Nat,
    'initMaxValue' : IDL.Nat,
    'initIsManagedCanister' : IDL.Bool,
    'initLockPeriod' : IDL.Int,
    'initCreatedBy' : IDL.Principal,
    'initTotalUnit' : IDL.Nat,
    'initManagementFee' : IDL.Nat,
  });
  const CoopMember = IDL.Record({
    'id' : IDL.Text,
    'balance' : IDL.Nat,
    'coop' : IDL.Principal,
    'userId' : IDL.Principal,
    'isActive' : IDL.Bool,
    'timestamp' : Time,
  });
  const Coop = IDL.Record({
    'id' : IDL.Principal,
    'managementFee' : IDL.Nat,
    'ticker' : IDL.Text,
    'isManagedCanister' : IDL.Bool,
    'name' : IDL.Text,
    'createdBy' : IDL.Text,
    'description' : IDL.Text,
    'totalUnit' : IDL.Nat,
    'isActive' : IDL.Bool,
    'summary' : IDL.Text,
    'lockPeriod' : IDL.Int,
    'availableUnit' : IDL.Nat,
    'timestamp' : Time,
    'unitImage' : IDL.Opt(IDL.Text),
    'unitPrice' : IDL.Nat,
    'payoutFrequency' : IDL.Int,
    'maxValue' : IDL.Nat,
  });
  const PlatformFees = IDL.Record({
    'transactionFee' : IDL.Nat,
    'depositFee' : IDL.Nat,
    'royaltyFee' : IDL.Nat,
    'timestamp' : Time,
    'proposalId' : IDL.Opt(IDL.Text),
  });
  const MintingFees = IDL.Record({
    'managementFee' : IDL.Nat,
    'platformFee' : IDL.Nat,
    'subTotal' : IDL.Nat,
    'coopFee' : IDL.Nat,
    'totalPrice' : IDL.Nat,
  });
  const CoopMemberId = IDL.Text;
  const Result_2 = IDL.Variant({ 'ok' : CoopMember, 'err' : IDL.Text });
  const TransactionId = IDL.Text;
  const Transaction = IDL.Record({
    'managementFee' : IDL.Nat,
    'linkedTx' : IDL.Opt(IDL.Text),
    'ticker' : IDL.Opt(IDL.Text),
    'platformFee' : IDL.Nat,
    'tokenTxHash' : IDL.Opt(IDL.Text),
    'tokenStandard' : IDL.Opt(IDL.Text),
    'userId' : IDL.Principal,
    'txId' : IDL.Text,
    'tokenSymbol' : IDL.Opt(IDL.Text),
    'timestamp' : Time,
    'txType' : IDL.Text,
    'amount' : IDL.Nat,
  });
  const MintUnitsArgs = IDL.Record({
    'userId' : IDL.Principal,
    'tokenAmount' : IDL.Nat,
    'blockheight' : IDL.Nat,
    'unitAmount' : IDL.Nat,
  });
  const TransactionRequest = IDL.Record({
    'managementFee' : IDL.Nat,
    'linkedTx' : IDL.Opt(IDL.Text),
    'ticker' : IDL.Opt(IDL.Text),
    'platformFee' : IDL.Nat,
    'tokenTxHash' : IDL.Opt(IDL.Text),
    'tokenStandard' : IDL.Opt(IDL.Text),
    'userId' : IDL.Principal,
    'txId' : IDL.Text,
    'tokenSymbol' : IDL.Opt(IDL.Text),
    'timestamp' : Time,
    'txType' : IDL.Text,
    'amount' : IDL.Nat,
  });
  const Result_1 = IDL.Variant({ 'ok' : Transaction, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const CoopManager = IDL.Service({
    'getAllMembers' : IDL.Func([], [IDL.Vec(CoopMember)], []),
    'getDetails' : IDL.Func([], [Coop], ['query']),
    'getFeeHistory' : IDL.Func([], [IDL.Vec(PlatformFees)], []),
    'getFeesDetails' : IDL.Func([IDL.Nat], [MintingFees], ['query']),
    'getMemberById' : IDL.Func([CoopMemberId], [CoopMember], []),
    'getMemberbyUserId' : IDL.Func([IDL.Principal], [Result_2], []),
    'getTransactionById' : IDL.Func([TransactionId], [Transaction], []),
    'getTransactions' : IDL.Func([], [IDL.Vec(Transaction)], []),
    'mintUnits' : IDL.Func([MintUnitsArgs], [IDL.Bool], []),
    'newTransaction' : IDL.Func([TransactionRequest], [Result_1], []),
    'redeemUnits' : IDL.Func([IDL.Nat, IDL.Text], [IDL.Bool], []),
    'updateLinkedTx' : IDL.Func([IDL.Text, IDL.Text], [Result], []),
  });
  return CoopManager;
};
export const init = ({ IDL }) => {
  const Time = IDL.Int;
  const CoopInitArgs = IDL.Record({
    'initTicker' : IDL.Text,
    'initTimestamp' : Time,
    'initPayoutFrequency' : IDL.Int,
    'initUnitImage' : IDL.Opt(IDL.Text),
    'initSummary' : IDL.Text,
    'initUnitPrice' : IDL.Nat,
    'initName' : IDL.Text,
    'initDescription' : IDL.Text,
    'initAvailableUnit' : IDL.Nat,
    'initMaxValue' : IDL.Nat,
    'initIsManagedCanister' : IDL.Bool,
    'initLockPeriod' : IDL.Int,
    'initCreatedBy' : IDL.Principal,
    'initTotalUnit' : IDL.Nat,
    'initManagementFee' : IDL.Nat,
  });
  return [CoopInitArgs];
};
