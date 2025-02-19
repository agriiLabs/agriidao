export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const ProjectExpenseRequest = IDL.Record({
    'total' : IDL.Nat,
    'item' : IDL.Text,
    'createdBy' : IDL.Principal,
    'projectFinancialsId' : IDL.Opt(IDL.Text),
    'projectProjectionsId' : IDL.Opt(IDL.Text),
    'timestamp' : Time,
    'quantity' : IDL.Nat,
    'amount' : IDL.Nat,
  });
  const ProjectIncomeRequest = IDL.Record({
    'total' : IDL.Nat,
    'item' : IDL.Text,
    'createdBy' : IDL.Principal,
    'projectFinancialsId' : IDL.Opt(IDL.Text),
    'projectProjectionsId' : IDL.Opt(IDL.Text),
    'timestamp' : Time,
    'quantity' : IDL.Nat,
    'amount' : IDL.Nat,
  });
  const Milestone = IDL.Record({
    'id' : IDL.Text,
    'completedDate' : IDL.Opt(Time),
    'task1' : IDL.Text,
    'task2' : IDL.Opt(IDL.Text),
    'task3' : IDL.Opt(IDL.Text),
    'isStart' : IDL.Bool,
    'approvedBy' : IDL.Opt(IDL.Principal),
    'dueDate' : Time,
    'description' : IDL.Text,
    'projectId' : IDL.Text,
    'timestamp' : Time,
    'budget' : IDL.Float64,
    'isComplete' : IDL.Bool,
  });
  const ProjectRequest = IDL.Record({
    'duration' : IDL.Int,
    'owner' : IDL.Principal,
    'coop' : IDL.Principal,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'summary' : IDL.Text,
    'currency' : IDL.Text,
    'fundingGoal' : IDL.Nat,
    'image' : IDL.Opt(IDL.Text),
    'location' : IDL.Text,
  });
  const ProjectFunder = IDL.Record({
    'id' : IDL.Text,
    'userId' : IDL.Principal,
    'projectId' : IDL.Text,
    'timestamp' : Time,
    'amount' : IDL.Float64,
  });
  const EntityType = IDL.Variant({
    'NGO' : IDL.Null,
    'University' : IDL.Null,
    'Business' : IDL.Null,
    'Government' : IDL.Null,
    'Individual' : IDL.Null,
  });
  const ProjectOwner = IDL.Record({
    'userId' : IDL.Principal,
    'name' : IDL.Text,
    'timestamp' : Time,
    'entityType' : EntityType,
  });
  const ProjectProposalRequest = IDL.Record({
    'coop' : IDL.Principal,
    'userId' : IDL.Principal,
    'voteStart' : IDL.Opt(Time),
    'isAccept' : IDL.Bool,
    'voteDuration' : IDL.Int,
    'projectId' : IDL.Text,
    'timestamp' : Time,
  });
  const ProjectType = IDL.Variant({
    'SolarMiniGrid' : IDL.Null,
    'Farm' : IDL.Null,
    'Warehouse' : IDL.Null,
    'Proccessing' : IDL.Null,
    'AgTech' : IDL.Null,
    'ProcessingPlant' : IDL.Null,
    'Offtaking' : IDL.Null,
    'GreenHouse' : IDL.Null,
    'ResearchAndDevelopment' : IDL.Null,
  });
  const ProjectTerm = IDL.Record({
    'duration' : IDL.Int,
    'isStart' : IDL.Bool,
    'projectType' : ProjectType,
    'createdBy' : IDL.Principal,
    'projectId' : IDL.Text,
    'timestamp' : Time,
    'rounds' : IDL.Int,
    'payoutFrequency' : IDL.Int,
  });
  const Vote = IDL.Record({
    'userId' : IDL.Principal,
    'isAccept' : IDL.Bool,
    'projectProposalId' : IDL.Text,
    'timestamp' : Time,
  });
  const FundingStatus = IDL.Variant({
    'Unfunded' : IDL.Null,
    'Funded' : IDL.Null,
    'Raising' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const ProposalStatus = IDL.Variant({
    'Approved' : IDL.Null,
    'Rejected' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const Project = IDL.Record({
    'id' : IDL.Text,
    'duration' : IDL.Int,
    'endDate' : IDL.Opt(Time),
    'owner' : IDL.Principal,
    'coop' : IDL.Principal,
    'name' : IDL.Text,
    'createdBy' : IDL.Principal,
    'description' : IDL.Text,
    'fundingStatus' : FundingStatus,
    'fundingEnd' : IDL.Opt(Time),
    'isActive' : IDL.Bool,
    'summary' : IDL.Text,
    'currency' : IDL.Text,
    'timestamp' : Time,
    'proposalStatus' : ProposalStatus,
    'fundingStart' : IDL.Opt(Time),
    'fundingGoal' : IDL.Nat,
    'image' : IDL.Opt(IDL.Text),
    'isDelete' : IDL.Bool,
    'location' : IDL.Text,
    'startDate' : IDL.Opt(Time),
  });
  const ProjectExpenseId = IDL.Text;
  const ProjectExpense = IDL.Record({
    'id' : IDL.Text,
    'total' : IDL.Nat,
    'item' : IDL.Text,
    'createdBy' : IDL.Principal,
    'projectFinancialsId' : IDL.Opt(IDL.Text),
    'projectProjectionsId' : IDL.Opt(IDL.Text),
    'timestamp' : Time,
    'quantity' : IDL.Nat,
    'amount' : IDL.Nat,
  });
  const ProjectId = IDL.Text;
  const ProjectIncomeId = IDL.Text;
  const ProjectIncome = IDL.Record({
    'id' : IDL.Text,
    'total' : IDL.Nat,
    'item' : IDL.Text,
    'createdBy' : IDL.Principal,
    'projectFinancialsId' : IDL.Opt(IDL.Text),
    'projectProjectionsId' : IDL.Opt(IDL.Text),
    'timestamp' : Time,
    'quantity' : IDL.Nat,
    'amount' : IDL.Nat,
  });
  const MilestoneId = IDL.Text;
  const ProjectFinancials = IDL.Record({
    'isStart' : IDL.Bool,
    'expenses' : IDL.Nat,
    'royaltySplit' : IDL.Nat,
    'income' : IDL.Nat,
    'projectId' : IDL.Text,
    'timestamp' : Time,
    'profit' : IDL.Nat,
    'royaltyPercentage' : IDL.Nat,
  });
  const ProjectFunderId = IDL.Text;
  const ProjectProjections = IDL.Record({
    'isStart' : IDL.Bool,
    'expenses' : IDL.Nat,
    'royaltySplit' : IDL.Nat,
    'income' : IDL.Nat,
    'projectId' : IDL.Text,
    'timestamp' : Time,
    'profit' : IDL.Nat,
    'royaltyPercentage' : IDL.Nat,
  });
  const ProjectProposalId = IDL.Text;
  const ProjectProposal = IDL.Record({
    'id' : IDL.Text,
    'coop' : IDL.Principal,
    'userId' : IDL.Principal,
    'voteStart' : IDL.Opt(Time),
    'isAccept' : IDL.Bool,
    'voteDuration' : IDL.Int,
    'projectId' : IDL.Text,
    'timestamp' : Time,
  });
  const ProjectTermId = IDL.Text;
  const UserId = IDL.Principal;
  const Treasury = IDL.Record({
    'balance' : IDL.Float64,
    'totalIn' : IDL.Float64,
    'totalOut' : IDL.Float64,
    'projectId' : IDL.Text,
    'totalFunders' : IDL.Int,
    'timestamp' : Time,
  });
  return IDL.Service({
    'addFinancialsExpense' : IDL.Func([ProjectExpenseRequest], [], []),
    'addFinancialsIncome' : IDL.Func([ProjectIncomeRequest], [], []),
    'addMilestone' : IDL.Func([Milestone], [], []),
    'addProject' : IDL.Func([ProjectRequest], [], []),
    'addProjectFunder' : IDL.Func([ProjectFunder], [], []),
    'addProjectOwner' : IDL.Func([ProjectOwner], [], []),
    'addProjectProposal' : IDL.Func([ProjectProposalRequest], [], []),
    'addProjectTerm' : IDL.Func([ProjectTerm], [], []),
    'addProjectionExpense' : IDL.Func([ProjectExpenseRequest], [], []),
    'addProjectionIncome' : IDL.Func([ProjectIncomeRequest], [], []),
    'addVote' : IDL.Func([Vote], [], []),
    'getAllProjectOwners' : IDL.Func([], [IDL.Vec(ProjectOwner)], []),
    'getAllProjects' : IDL.Func([], [IDL.Vec(Project)], []),
    'getEntityTypes' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getFinancialsExpenseById' : IDL.Func(
        [ProjectExpenseId],
        [ProjectExpense],
        [],
      ),
    'getFinancialsExpensesByProjectId' : IDL.Func(
        [ProjectId],
        [IDL.Vec(ProjectExpense)],
        [],
      ),
    'getFinancialsIncomeById' : IDL.Func(
        [ProjectIncomeId],
        [ProjectIncome],
        [],
      ),
    'getFinancialsIncomesByProjectId' : IDL.Func(
        [ProjectId],
        [IDL.Vec(ProjectIncome)],
        [],
      ),
    'getMilestoneById' : IDL.Func([MilestoneId], [Milestone], []),
    'getMilestonesByProjectId' : IDL.Func(
        [ProjectId],
        [IDL.Vec(Milestone)],
        [],
      ),
    'getProjectById' : IDL.Func([ProjectId], [Project], []),
    'getProjectFinancialsByProjectId' : IDL.Func(
        [ProjectId],
        [ProjectFinancials],
        [],
      ),
    'getProjectFunderById' : IDL.Func([ProjectFunderId], [ProjectFunder], []),
    'getProjectFundersByProjectId' : IDL.Func(
        [ProjectId],
        [IDL.Vec(ProjectFunder)],
        [],
      ),
    'getProjectFundersByUserId' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(ProjectFunder)],
        [],
      ),
    'getProjectOwner' : IDL.Func([], [ProjectOwner], []),
    'getProjectProjectionsByProjectId' : IDL.Func(
        [ProjectId],
        [ProjectProjections],
        [],
      ),
    'getProjectProposalById' : IDL.Func(
        [ProjectProposalId],
        [ProjectProposal],
        [],
      ),
    'getProjectProposalsByProjectId' : IDL.Func(
        [ProjectId],
        [IDL.Vec(ProjectProposal)],
        [],
      ),
    'getProjectTermById' : IDL.Func([ProjectTermId], [ProjectTerm], []),
    'getProjectTermsByProjectId' : IDL.Func(
        [ProjectId],
        [IDL.Vec(ProjectTerm)],
        [],
      ),
    'getProjectionExpenseById' : IDL.Func(
        [ProjectExpenseId],
        [ProjectExpense],
        [],
      ),
    'getProjectionExpensesByProjectId' : IDL.Func(
        [ProjectId],
        [IDL.Vec(ProjectExpense)],
        [],
      ),
    'getProjectionIncomeById' : IDL.Func(
        [ProjectIncomeId],
        [ProjectIncome],
        [],
      ),
    'getProjectionIncomesByProjectId' : IDL.Func(
        [ProjectId],
        [IDL.Vec(ProjectIncome)],
        [],
      ),
    'getProjectsByUserId' : IDL.Func([UserId], [IDL.Vec(Project)], []),
    'getStartProject' : IDL.Func([ProjectId], [Project], ['query']),
    'getTreasuryByProjectId' : IDL.Func([ProjectId], [Treasury], []),
    'getVoteById' : IDL.Func([IDL.Text], [Vote], []),
    'getVotesByUserId' : IDL.Func([IDL.Principal], [IDL.Vec(Vote)], []),
    'projectOwnerCheck' : IDL.Func([], [IDL.Bool], ['query']),
    'updateFinancialsExpense' : IDL.Func([ProjectExpense], [], []),
    'updateFinancialsIncome' : IDL.Func([ProjectIncome], [], []),
    'updateMilestone' : IDL.Func([Milestone], [], []),
    'updateProject' : IDL.Func([Project], [], []),
    'updateProjectFinancials' : IDL.Func([ProjectFinancials], [], []),
    'updateProjectFunder' : IDL.Func([ProjectFunder], [], []),
    'updateProjectProjections' : IDL.Func([ProjectProjections], [], []),
    'updateProjectProposal' : IDL.Func([ProjectProposal], [], []),
    'updateProjectTerm' : IDL.Func([ProjectTerm], [], []),
    'updateProjectionExpense' : IDL.Func([ProjectExpense], [], []),
    'updateProjectionIncome' : IDL.Func([ProjectIncome], [], []),
    'updateTreasury' : IDL.Func([Treasury], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
