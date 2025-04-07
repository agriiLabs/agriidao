export const idlFactory = ({ IDL }) => {
  const EnvType = IDL.Variant({
    'staging' : IDL.Null,
    'production' : IDL.Null,
    'local' : IDL.Null,
  });
  const CanisterInitArgs = IDL.Record({ 'env' : EnvType });
  const ProjectId = IDL.Text;
  const ProjectExpenseRequest = IDL.Record({
    'item' : IDL.Text,
    'projectFinancialsId' : IDL.Opt(IDL.Text),
    'projectProjectionsId' : IDL.Opt(IDL.Text),
    'quantity' : IDL.Nat,
    'amount' : IDL.Nat,
  });
  const ProjectIncomeRequest = IDL.Record({
    'item' : IDL.Text,
    'projectFinancialsId' : IDL.Opt(IDL.Text),
    'projectProjectionsId' : IDL.Opt(IDL.Text),
    'quantity' : IDL.Nat,
    'amount' : IDL.Nat,
  });
  const MilestoneRequest = IDL.Record({
    'task1' : IDL.Text,
    'task2' : IDL.Opt(IDL.Text),
    'task3' : IDL.Opt(IDL.Text),
    'timeframe' : IDL.Nat,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'projectId' : IDL.Text,
    'budget' : IDL.Nat,
  });
  const ProjectType = IDL.Variant({
    'SolarMiniGrid' : IDL.Null,
    'Farm' : IDL.Null,
    'Warehouse' : IDL.Null,
    'Proccessing' : IDL.Null,
    'AgTech' : IDL.Null,
    'Offtaking' : IDL.Null,
    'GreenHouse' : IDL.Null,
    'ResearchAndDevelopment' : IDL.Null,
  });
  const ProjectRequest = IDL.Record({
    'duration' : IDL.Int,
    'projectType' : ProjectType,
    'owner' : IDL.Principal,
    'coop' : IDL.Principal,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'summary' : IDL.Text,
    'currency' : IDL.Text,
    'image' : IDL.Opt(IDL.Text),
    'unitsGoal' : IDL.Nat,
    'location' : IDL.Text,
  });
  const ProjectFunderRequest = IDL.Record({
    'userId' : IDL.Principal,
    'projectId' : IDL.Text,
    'amount' : IDL.Nat,
  });
  const Time = IDL.Int;
  const ProjectFunder = IDL.Record({
    'id' : IDL.Text,
    'userId' : IDL.Principal,
    'projectId' : IDL.Text,
    'timestamp' : Time,
    'amount' : IDL.Nat,
  });
  const Result_4 = IDL.Variant({ 'ok' : ProjectFunder, 'err' : IDL.Text });
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
  const ProjectTerm = IDL.Record({
    'duration' : IDL.Int,
    'projectType' : ProjectType,
    'createdBy' : IDL.Principal,
    'projectId' : IDL.Text,
    'timestamp' : Time,
    'rounds' : IDL.Int,
    'payoutFrequency' : IDL.Int,
  });
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
  const Result_3 = IDL.Variant({ 'ok' : ProjectExpense, 'err' : IDL.Text });
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
  const Result_2 = IDL.Variant({ 'ok' : ProjectIncome, 'err' : IDL.Text });
  const FundingStatus = IDL.Variant({
    'Unfunded' : IDL.Null,
    'Funded' : IDL.Null,
    'Raising' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const ProposalStatus = IDL.Variant({
    'Approved' : IDL.Null,
    'Draft' : IDL.Null,
    'Rejected' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const Project = IDL.Record({
    'id' : IDL.Text,
    'duration' : IDL.Int,
    'endDate' : IDL.Opt(Time),
    'projectType' : ProjectType,
    'owner' : IDL.Principal,
    'coop' : IDL.Principal,
    'name' : IDL.Text,
    'createdBy' : IDL.Principal,
    'description' : IDL.Text,
    'fundingStatus' : FundingStatus,
    'fundingEnd' : IDL.Opt(Time),
    'isActive' : IDL.Bool,
    'summary' : IDL.Text,
    'unitsRaised' : IDL.Nat,
    'currency' : IDL.Text,
    'timestamp' : Time,
    'proposalStatus' : ProposalStatus,
    'fundingStart' : IDL.Opt(Time),
    'image' : IDL.Opt(IDL.Text),
    'isDelete' : IDL.Bool,
    'unitsGoal' : IDL.Nat,
    'location' : IDL.Text,
    'startDate' : IDL.Opt(Time),
  });
  const CommitmentVault = IDL.Record({
    'balance' : IDL.Nat,
    'totalIn' : IDL.Nat,
    'totalOut' : IDL.Nat,
    'projectId' : IDL.Text,
    'totalFunders' : IDL.Int,
    'timestamp' : Time,
  });
  const ProjectExpenseId = IDL.Text;
  const ProjectIncomeId = IDL.Text;
  const MilestoneId = IDL.Text;
  const MilestoneStatus = IDL.Variant({
    'Completed' : IDL.Null,
    'NotStarted' : IDL.Null,
    'Inprogress' : IDL.Null,
  });
  const Milestone = IDL.Record({
    'id' : IDL.Text,
    'completedDate' : IDL.Opt(Time),
    'task1' : IDL.Text,
    'task2' : IDL.Opt(IDL.Text),
    'task3' : IDL.Opt(IDL.Text),
    'timeframe' : IDL.Nat,
    'approvedBy' : IDL.Opt(IDL.Principal),
    'name' : IDL.Text,
    'createdBy' : IDL.Principal,
    'milestoneStatus' : MilestoneStatus,
    'description' : IDL.Text,
    'projectId' : IDL.Text,
    'timestamp' : Time,
    'budget' : IDL.Nat,
    'isComplete' : IDL.Bool,
  });
  const ProjectFinancials = IDL.Record({
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
    'expenses' : IDL.Nat,
    'royaltySplit' : IDL.Nat,
    'income' : IDL.Nat,
    'projectId' : IDL.Text,
    'timestamp' : Time,
    'profit' : IDL.Nat,
    'royaltyPercentage' : IDL.Nat,
  });
  const ProjectTermId = IDL.Text;
  const UserId = IDL.Principal;
  const Treasury = IDL.Record({
    'balance' : IDL.Nat,
    'totalIn' : IDL.Nat,
    'totalOut' : IDL.Nat,
    'projectId' : IDL.Text,
    'timestamp' : Time,
  });
  const Result_1 = IDL.Variant({ 'ok' : Project, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Projects = IDL.Service({
    'addCommitmentVault' : IDL.Func([ProjectId], [], []),
    'addFinancialsExpense' : IDL.Func([ProjectExpenseRequest], [], []),
    'addFinancialsIncome' : IDL.Func([ProjectIncomeRequest], [], []),
    'addMilestone' : IDL.Func([MilestoneRequest], [], []),
    'addProject' : IDL.Func([ProjectRequest], [], []),
    'addProjectFunder' : IDL.Func([ProjectFunderRequest], [Result_4], []),
    'addProjectOwner' : IDL.Func([ProjectOwner], [], []),
    'addProjectTerm' : IDL.Func([ProjectTerm], [], []),
    'addProjectionExpense' : IDL.Func([ProjectExpenseRequest], [Result_3], []),
    'addProjectionIncome' : IDL.Func([ProjectIncomeRequest], [Result_2], []),
    'getAllProjects' : IDL.Func([], [IDL.Vec(Project)], []),
    'getCommitmentVaultByProjectId' : IDL.Func(
        [ProjectId],
        [CommitmentVault],
        ['query'],
      ),
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
    'getProjectTermById' : IDL.Func([ProjectTermId], [ProjectTerm], []),
    'getProjectTermsByProjectId' : IDL.Func(
        [ProjectId],
        [IDL.Vec(ProjectTerm)],
        [],
      ),
    'getProjectTypes' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
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
    'getProjectsByCoop' : IDL.Func([IDL.Text], [IDL.Vec(Project)], ['query']),
    'getProjectsByOwner' : IDL.Func([UserId], [IDL.Vec(Project)], []),
    'getTreasuryByProjectId' : IDL.Func([ProjectId], [Treasury], []),
    'updateFinancialsExpense' : IDL.Func([ProjectExpense], [], []),
    'updateFinancialsIncome' : IDL.Func([ProjectIncome], [], []),
    'updateMilestone' : IDL.Func([Milestone], [], []),
    'updateProject' : IDL.Func([Project], [], []),
    'updateProjectFinancials' : IDL.Func([ProjectFinancials], [], []),
    'updateProjectFunder' : IDL.Func([ProjectFunder], [], []),
    'updateProjectOwner' : IDL.Func([ProjectOwner], [], []),
    'updateProjectProjections' : IDL.Func([ProjectProjections], [], []),
    'updateProjectProposalStatus' : IDL.Func([ProjectId], [Result_1], []),
    'updateProjectTerm' : IDL.Func([ProjectTerm], [], []),
    'updateProjectionExpense' : IDL.Func([ProjectExpense], [], []),
    'updateProjectionIncome' : IDL.Func([ProjectIncome], [Result], []),
    'updateTreasury' : IDL.Func([Treasury], [], []),
  });
  return Projects;
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
