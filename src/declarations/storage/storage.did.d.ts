import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface AssetQuery {
  'url' : string,
  'file_name' : string,
  'file_type' : string,
  'owned_by' : Principal,
  'asset_id' : bigint,
  'uploaded_at' : bigint,
}
export interface ChunkArgs {
  'content' : Uint8Array | number[],
  'order' : number,
}
export interface CommitBatchArgs {
  'file_name' : string,
  'file_type' : string,
  'chunk_ids' : Array<bigint>,
  'checksum' : number,
}
export interface HttpRequest {
  'url' : string,
  'method' : string,
  'body' : Uint8Array | number[],
  'headers' : Array<[string, string]>,
}
export interface HttpResponse {
  'body' : Uint8Array | number[],
  'headers' : Array<[string, string]>,
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
}
export interface StreamingCallbackHttpResponse {
  'token' : [] | [StreamingCallbackToken],
  'body' : Uint8Array | number[],
}
export interface StreamingCallbackToken {
  'chunk_index' : number,
  'asset_id' : bigint,
  'content_encoding' : string,
  'chunk_size' : number,
}
export type StreamingStrategy = {
    'Callback' : {
      'token' : StreamingCallbackToken,
      'callback' : [Principal, string],
    }
  };
export interface _SERVICE {
  'asset_list' : ActorMethod<[], Array<[bigint, AssetQuery]>>,
  'assets_list' : ActorMethod<[], Array<AssetQuery>>,
  'assets_of' : ActorMethod<[Principal], Array<[bigint, AssetQuery]>>,
  'check_is_prod' : ActorMethod<[], boolean>,
  'chunk_ids_check' : ActorMethod<[Array<bigint>], boolean>,
  'commit_batch' : ActorMethod<[CommitBatchArgs], string>,
  'delete_asset' : ActorMethod<[bigint], boolean>,
  'delete_expired_chunks' : ActorMethod<[], undefined>,
  'get_memory_size' : ActorMethod<[], [string, string]>,
  'http_request' : ActorMethod<[HttpRequest], HttpResponse>,
  'http_request_streaming_callback' : ActorMethod<
    [StreamingCallbackToken],
    StreamingCallbackHttpResponse
  >,
  'is_full' : ActorMethod<[], boolean>,
  'query_asset' : ActorMethod<[bigint], [] | [AssetQuery]>,
  'upload_chunk' : ActorMethod<[ChunkArgs], bigint>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
