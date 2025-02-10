import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface CanisterInfo {
  'id' : string,
  'created' : bigint,
  'name' : string,
  'parent_name' : string,
  'health' : [] | [Health],
}
export interface FileScalingManager {
  'add_controller' : ActorMethod<[Principal], undefined>,
  'cycleBalance' : ActorMethod<[], bigint>,
  'getSelfStatus' : ActorMethod<[], Result_1>,
  'getStorageCanisterStatus' : ActorMethod<[Principal], Result>,
  'get_canister_records' : ActorMethod<[], Array<CanisterInfo>>,
  'get_current_canister' : ActorMethod<[], [] | [CanisterInfo]>,
  'get_file_storage_canister_id' : ActorMethod<[], string>,
  'init' : ActorMethod<[], string>,
  'remove_controller' : ActorMethod<[Principal], undefined>,
  'version' : ActorMethod<[], bigint>,
}
export interface Health {
  'assets_size' : bigint,
  'heap_mb' : bigint,
  'memory_mb' : bigint,
  'cycles' : bigint,
}
export type Result = { 'ok' : Status } |
  { 'err' : null };
export type Result_1 = { 'ok' : Status } |
  { 'err' : string };
export interface Status {
  'status' : { 'stopped' : null } |
    { 'stopping' : null } |
    { 'running' : null },
  'memory_size' : bigint,
  'cycles' : bigint,
  'settings' : definite_canister_settings,
  'module_hash' : [] | [Uint8Array | number[]],
}
export interface definite_canister_settings {
  'freezing_threshold' : bigint,
  'controllers' : Array<Principal>,
  'memory_allocation' : bigint,
  'compute_allocation' : bigint,
}
export interface _SERVICE extends FileScalingManager {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
