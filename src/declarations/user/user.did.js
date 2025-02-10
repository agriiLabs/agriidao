export const idlFactory = ({ IDL }) => {
  const ProfileRequest = IDL.Record({
    'dob' : IDL.Text,
    'email' : IDL.Opt(IDL.Text),
    'countryId' : IDL.Opt(IDL.Text),
    'mobile' : IDL.Opt(IDL.Text),
    'profilePic' : IDL.Opt(IDL.Text),
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const UserType = IDL.Record({
    'member' : IDL.Bool,
    'agent' : IDL.Bool,
    'trader' : IDL.Bool,
    'farmer' : IDL.Bool,
  });
  const Time = IDL.Int;
  const User = IDL.Record({
    'id' : IDL.Principal,
    'userType' : UserType,
    'referralCode' : IDL.Opt(IDL.Text),
    'referralLink' : IDL.Opt(IDL.Text),
    'username' : IDL.Opt(IDL.Text),
    'timeStamp' : Time,
    'dapp' : IDL.Record({
      'agriiprice' : IDL.Record({ 'timeStamp' : IDL.Opt(Time) }),
      'agriiclub' : IDL.Record({ 'timeStamp' : IDL.Opt(Time) }),
      'agriiMarket' : IDL.Record({ 'timeStamp' : IDL.Opt(Time) }),
    }),
    'referredBy' : IDL.Opt(IDL.Text),
    'isDelete' : IDL.Bool,
  });
  const AddressType = IDL.Variant({
    'BSC' : IDL.Null,
    'BTC' : IDL.Null,
    'ETH' : IDL.Null,
    'ICP' : IDL.Null,
    'POL' : IDL.Null,
    'SOL' : IDL.Null,
  });
  const WalletAddressRequest = IDL.Record({
    'chain' : AddressType,
    'address' : IDL.Text,
  });
  const Profile = IDL.Record({
    'id' : IDL.Principal,
    'dob' : IDL.Text,
    'timeStamp' : Time,
    'isDeactivated' : IDL.Bool,
    'email' : IDL.Opt(IDL.Text),
    'countryId' : IDL.Opt(IDL.Text),
    'mobile' : IDL.Opt(IDL.Text),
    'profilePic' : IDL.Opt(IDL.Text),
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const Result_2 = IDL.Variant({ 'ok' : Profile, 'err' : IDL.Text });
  const ProfileId = IDL.Principal;
  const Result = IDL.Variant({ 'ok' : User, 'err' : IDL.Text });
  const WalletAddress = IDL.Record({
    'id' : IDL.Principal,
    'timeStamp' : Time,
    'chain' : AddressType,
    'address' : IDL.Text,
  });
  const Result_1 = IDL.Variant({ 'ok' : WalletAddress, 'err' : IDL.Text });
  const WalletAddressId = IDL.Principal;
  const AgriiUser = IDL.Service({
    'addProfile' : IDL.Func([ProfileRequest], [], []),
    'addUser' : IDL.Func([User], [], []),
    'addWalletAddress' : IDL.Func([WalletAddressRequest], [], []),
    'checkUsernameExists' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'deactivateUser' : IDL.Func([Profile], [], []),
    'getAllLatestUsers' : IDL.Func([], [IDL.Vec(User)], []),
    'getProfileByCaller' : IDL.Func([], [Result_2], ['query']),
    'getProfileLatestByPrincipal' : IDL.Func([ProfileId], [Result_2], []),
    'getUserByCaller' : IDL.Func([], [Result], ['query']),
    'getUserLatestByPrincipal' : IDL.Func([IDL.Principal], [Result], []),
    'getUserVersions' : IDL.Func([IDL.Principal], [IDL.Vec(User)], ['query']),
    'getUsers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'getWalletAddressByCaller' : IDL.Func([], [Result_1], ['query']),
    'getWalletAddressLatestByPrincipal' : IDL.Func(
        [WalletAddressId],
        [Result_1],
        [],
      ),
    'updateProfile' : IDL.Func([Profile], [], []),
    'updateUser' : IDL.Func([User], [Result], []),
    'updateUserType' : IDL.Func([UserType, IDL.Principal], [], []),
    'updateWalletAddress' : IDL.Func([WalletAddress], [], []),
    'validateReferralCode' : IDL.Func([IDL.Text], [IDL.Opt(User)], ['query']),
  });
  return AgriiUser;
};
export const init = ({ IDL }) => { return []; };
