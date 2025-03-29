export const idlFactory = ({ IDL }) => {
  const EnvType = IDL.Variant({
    'staging' : IDL.Null,
    'production' : IDL.Null,
    'local' : IDL.Null,
  });
  const CanisterInitArgs = IDL.Record({ 'env' : EnvType });
  const ProposalRequest = IDL.Record({
    'coop' : IDL.Opt(IDL.Principal),
    'description' : IDL.Text,
    'projectId' : IDL.Opt(IDL.Text),
    'submissionDeposit' : IDL.Nat,
  });
  const Time = IDL.Int;
  const Vote = IDL.Record({
    'userId' : IDL.Principal,
    'isAccept' : IDL.Bool,
    'timestamp' : Time,
    'proposalId' : IDL.Text,
  });
  const ProposalId = IDL.Text;
  const ProposalStatus = IDL.Variant({
    'Open' : IDL.Null,
    'Rejected' : IDL.Null,
    'Accepted' : IDL.Null,
  });
  const Proposal = IDL.Record({
    'id' : IDL.Text,
    'status' : ProposalStatus,
    'coop' : IDL.Opt(IDL.Principal),
    'voteStart' : Time,
    'description' : IDL.Text,
    'voteDuration' : IDL.Nat,
    'projectId' : IDL.Opt(IDL.Text),
    'voteEnd' : Time,
    'timestamp' : Time,
    'proposer' : IDL.Principal,
    'submissionDeposit' : IDL.Nat,
  });
  const CoopId = IDL.Principal;
  const ProjectId = IDL.Text;
  const Proposals = IDL.Service({
    'addProposal' : IDL.Func([ProposalRequest], [], []),
    'addVote' : IDL.Func([Vote], [], []),
    'getProposalById' : IDL.Func([ProposalId], [Proposal], ['query']),
    'getProposalsByCoopId' : IDL.Func([CoopId], [IDL.Vec(Proposal)], ['query']),
    'getProposalsByProjectId' : IDL.Func(
        [ProjectId],
        [IDL.Vec(Proposal)],
        ['query'],
      ),
    'getRemainingTime' : IDL.Func([ProposalId], [IDL.Nat], ['query']),
    'getVoteById' : IDL.Func([IDL.Text], [Vote], ['query']),
    'getVotesByProposalId' : IDL.Func([ProposalId], [IDL.Vec(Vote)], ['query']),
    'getVotesByUserId' : IDL.Func([IDL.Principal], [IDL.Vec(Vote)], ['query']),
    'updateProposalStatus' : IDL.Func([Proposal], [], []),
  });
  return Proposals;
};
export const init = ({ IDL }) => {
  const EnvType = IDL.Variant({
    'staging' : IDL.Null,
    'production' : IDL.Null,
    'local' : IDL.Null,
  });
  const CanisterInitArgs = IDL.Record({ 'env' : EnvType });
  return [CanisterInitArgs];
};
