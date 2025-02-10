export const idlFactory = ({ IDL }) => {
  const definite_canister_settings = IDL.Record({
    'freezing_threshold' : IDL.Nat,
    'controllers' : IDL.Vec(IDL.Principal),
    'memory_allocation' : IDL.Nat,
    'compute_allocation' : IDL.Nat,
  });
  const Status = IDL.Record({
    'status' : IDL.Variant({
      'stopped' : IDL.Null,
      'stopping' : IDL.Null,
      'running' : IDL.Null,
    }),
    'memory_size' : IDL.Nat,
    'cycles' : IDL.Nat,
    'settings' : definite_canister_settings,
    'module_hash' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const Result_1 = IDL.Variant({ 'ok' : Status, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : Status, 'err' : IDL.Null });
  const Health = IDL.Record({
    'assets_size' : IDL.Int,
    'heap_mb' : IDL.Int,
    'memory_mb' : IDL.Int,
    'cycles' : IDL.Int,
  });
  const CanisterInfo = IDL.Record({
    'id' : IDL.Text,
    'created' : IDL.Int,
    'name' : IDL.Text,
    'parent_name' : IDL.Text,
    'health' : IDL.Opt(Health),
  });
  const FileScalingManager = IDL.Service({
    'add_controller' : IDL.Func([IDL.Principal], [], []),
    'cycleBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'getSelfStatus' : IDL.Func([], [Result_1], []),
    'getStorageCanisterStatus' : IDL.Func([IDL.Principal], [Result], []),
    'get_canister_records' : IDL.Func([], [IDL.Vec(CanisterInfo)], ['query']),
    'get_current_canister' : IDL.Func([], [IDL.Opt(CanisterInfo)], ['query']),
    'get_file_storage_canister_id' : IDL.Func([], [IDL.Text], ['query']),
    'init' : IDL.Func([], [IDL.Text], []),
    'remove_controller' : IDL.Func([IDL.Principal], [], []),
    'version' : IDL.Func([], [IDL.Nat], ['query']),
  });
  return FileScalingManager;
};
export const init = ({ IDL }) => { return [IDL.Bool]; };
