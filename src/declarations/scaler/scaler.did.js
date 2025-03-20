export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'query_storage_canister' : IDL.Func([], [IDL.Principal], []),
    'storage_list' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
