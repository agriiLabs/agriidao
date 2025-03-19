export const idlFactory = ({ IDL }) => {
  const AssetQuery = IDL.Record({
    'url' : IDL.Text,
    'file_name' : IDL.Text,
    'file_type' : IDL.Text,
    'owned_by' : IDL.Principal,
    'asset_id' : IDL.Nat,
    'uploaded_at' : IDL.Nat64,
  });
  const CommitBatchArgs = IDL.Record({
    'file_name' : IDL.Text,
    'file_type' : IDL.Text,
    'chunk_ids' : IDL.Vec(IDL.Nat),
    'checksum' : IDL.Nat32,
  });
  const HttpRequest = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Text,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
  });
  const StreamingCallbackToken = IDL.Record({
    'chunk_index' : IDL.Nat32,
    'asset_id' : IDL.Nat,
    'content_encoding' : IDL.Text,
    'chunk_size' : IDL.Nat32,
  });
  const StreamingStrategy = IDL.Variant({
    'Callback' : IDL.Record({
      'token' : StreamingCallbackToken,
      'callback' : IDL.Func([], [], ['query']),
    }),
  });
  const HttpResponse = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
    'streaming_strategy' : IDL.Opt(StreamingStrategy),
    'status_code' : IDL.Nat16,
  });
  const StreamingCallbackHttpResponse = IDL.Record({
    'token' : IDL.Opt(StreamingCallbackToken),
    'body' : IDL.Vec(IDL.Nat8),
  });
  const ChunkArgs = IDL.Record({
    'content' : IDL.Vec(IDL.Nat8),
    'order' : IDL.Nat32,
  });
  return IDL.Service({
    'asset_list' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Nat, AssetQuery))],
        ['query'],
      ),
    'assets_list' : IDL.Func([], [IDL.Vec(AssetQuery)], ['query']),
    'assets_of' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(IDL.Tuple(IDL.Nat, AssetQuery))],
        ['query'],
      ),
    'check_is_prod' : IDL.Func([], [IDL.Bool], ['query']),
    'chunk_ids_check' : IDL.Func([IDL.Vec(IDL.Nat)], [IDL.Bool], ['query']),
    'commit_batch' : IDL.Func([CommitBatchArgs], [IDL.Text], []),
    'delete_asset' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'delete_expired_chunks' : IDL.Func([], [], []),
    'get_memory_size' : IDL.Func([], [IDL.Text, IDL.Text], []),
    'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
    'http_request_streaming_callback' : IDL.Func(
        [StreamingCallbackToken],
        [StreamingCallbackHttpResponse],
        ['query'],
      ),
    'is_full' : IDL.Func([], [IDL.Bool], []),
    'query_asset' : IDL.Func([IDL.Nat], [IDL.Opt(AssetQuery)], ['query']),
    'upload_chunk' : IDL.Func([ChunkArgs], [IDL.Nat], []),
  });
};
export const init = ({ IDL }) => { return [IDL.Bool]; };
