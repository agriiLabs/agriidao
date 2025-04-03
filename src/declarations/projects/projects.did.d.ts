import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface CanisterInitArgs { 'env' : EnvType }
export interface CommitmentVault {
  'balance' : bigint,
  'totalIn' : bigint,
  'totalOut' : bigint,
  'projectId' : string,
  'totalFunders' : bigint,
  'timestamp' : Time,
}
export type EntityType = { 'NGO' : null } |
  { 'University' : null } |
  { 'Business' : null } |
  { 'Government' : null } |
  { 'Individual' : null };
export type EnvType = { 'staging' : null } |
  { 'production' : null } |
  { 'local' : null };
export type FundingStatus = { 'Unfunded' : null } |
  { 'Funded' : null } |
  { 'Raising' : null } |
  { 'Pending' : null };
export interface Milestone {
  'id' : string,
  'completedDate' : [] | [Time],
  'task1' : string,
  'task2' : [] | [string],
  'task3' : [] | [string],
  'timeframe' : bigint,
  'approvedBy' : [] | [Principal],
  'name' : string,
  'createdBy' : Principal,
  'milestoneStatus' : MilestoneStatus,
  'description' : string,
  'projectId' : string,
  'timestamp' : Time,
  'budget' : bigint,
  'isComplete' : boolean,
}
export type MilestoneId = string;
export interface MilestoneRequest {
  'task1' : string,
  'task2' : [] | [string],
  'task3' : [] | [string],
  'timeframe' : bigint,
  'name' : string,
  'description' : string,
  'projectId' : string,
  'budget' : bigint,
}
export type MilestoneStatus = { 'Completed' : null } |
  { 'NotStarted' : null } |
  { 'Inprogress' : null };
export interface Project {
  'id' : string,
  'duration' : bigint,
  'endDate' : [] | [Time],
  'projectType' : ProjectType,
  'owner' : Principal,
  'coop' : Principal,
  'name' : string,
  'createdBy' : Principal,
  'description' : string,
  'fundingStatus' : FundingStatus,
  'fundingEnd' : [] | [Time],
  'isActive' : boolean,
  'summary' : string,
  'unitsRaised' : bigint,
  'currency' : string,
  'timestamp' : Time,
  'proposalStatus' : ProposalStatus,
  'fundingStart' : [] | [Time],
  'image' : [] | [string],
  'isDelete' : boolean,
  'unitsGoal' : bigint,
  'location' : string,
  'startDate' : [] | [Time],
}
export interface ProjectExpense {
  'id' : string,
  'total' : bigint,
  'item' : string,
  'createdBy' : Principal,
  'projectFinancialsId' : [] | [string],
  'projectProjectionsId' : [] | [string],
  'timestamp' : Time,
  'quantity' : bigint,
  'amount' : bigint,
}
export type ProjectExpenseId = string;
export interface ProjectExpenseRequest {
  'item' : string,
  'projectFinancialsId' : [] | [string],
  'projectProjectionsId' : [] | [string],
  'quantity' : bigint,
  'amount' : bigint,
}
export interface ProjectFinancials {
  'expenses' : bigint,
  'royaltySplit' : bigint,
  'income' : bigint,
  'projectId' : string,
  'timestamp' : Time,
  'profit' : bigint,
  'royaltyPercentage' : bigint,
}
export interface ProjectFunder {
  'id' : string,
  'userId' : Principal,
  'projectId' : string,
  'timestamp' : Time,
  'amount' : bigint,
}
export type ProjectFunderId = string;
export interface ProjectFunderRequest {
  'userId' : Principal,
  'projectId' : string,
  'amount' : bigint,
}
export type ProjectId = string;
export interface ProjectIncome {
  'id' : string,
  'total' : bigint,
  'item' : string,
  'createdBy' : Principal,
  'projectFinancialsId' : [] | [string],
  'projectProjectionsId' : [] | [string],
  'timestamp' : Time,
  'quantity' : bigint,
  'amount' : bigint,
}
export type ProjectIncomeId = string;
export interface ProjectIncomeRequest {
  'item' : string,
  'projectFinancialsId' : [] | [string],
  'projectProjectionsId' : [] | [string],
  'quantity' : bigint,
  'amount' : bigint,
}
export interface ProjectOwner {
  'userId' : Principal,
  'name' : string,
  'timestamp' : Time,
  'entityType' : EntityType,
}
export interface ProjectProjections {
  'expenses' : bigint,
  'royaltySplit' : bigint,
  'income' : bigint,
  'projectId' : string,
  'timestamp' : Time,
  'profit' : bigint,
  'royaltyPercentage' : bigint,
}
export interface ProjectRequest {
  'duration' : bigint,
  'projectType' : ProjectType,
  'owner' : Principal,
  'coop' : Principal,
  'name' : string,
  'description' : string,
  'summary' : string,
  'currency' : string,
  'image' : [] | [string],
  'unitsGoal' : bigint,
  'location' : string,
}
export interface ProjectTerm {
  'duration' : bigint,
  'projectType' : ProjectType,
  'createdBy' : Principal,
  'projectId' : string,
  'timestamp' : Time,
  'rounds' : bigint,
  'payoutFrequency' : bigint,
}
export type ProjectTermId = string;
export type ProjectType = { 'SolarMiniGrid' : null } |
  { 'Farm' : null } |
  { 'Warehouse' : null } |
  { 'Proccessing' : null } |
  { 'AgTech' : null } |
  { 'Offtaking' : null } |
  { 'GreenHouse' : null } |
  { 'ResearchAndDevelopment' : null };
export interface Projects {
  'addCommitmentVault' : ActorMethod<[ProjectId], undefined>,
  'addFinancialsExpense' : ActorMethod<[ProjectExpenseRequest], undefined>,
  'addFinancialsIncome' : ActorMethod<[ProjectIncomeRequest], undefined>,
  'addMilestone' : ActorMethod<[MilestoneRequest], undefined>,
  'addProject' : ActorMethod<[ProjectRequest], undefined>,
  'addProjectFunder' : ActorMethod<[ProjectFunderRequest], undefined>,
  'addProjectOwner' : ActorMethod<[ProjectOwner], undefined>,
  'addProjectTerm' : ActorMethod<[ProjectTerm], undefined>,
  'addProjectionExpense' : ActorMethod<[ProjectExpenseRequest], Result_2>,
  'addProjectionIncome' : ActorMethod<[ProjectIncomeRequest], Result_1>,
  'getAllProjects' : ActorMethod<[], Array<Project>>,
  'getCommitmentVaultByProjectId' : ActorMethod<[ProjectId], CommitmentVault>,
  'getEntityTypes' : ActorMethod<[], Array<string>>,
  'getFinancialsExpenseById' : ActorMethod<[ProjectExpenseId], ProjectExpense>,
  'getFinancialsExpensesByProjectId' : ActorMethod<
    [ProjectId],
    Array<ProjectExpense>
  >,
  'getFinancialsIncomeById' : ActorMethod<[ProjectIncomeId], ProjectIncome>,
  'getFinancialsIncomesByProjectId' : ActorMethod<
    [ProjectId],
    Array<ProjectIncome>
  >,
  'getMilestoneById' : ActorMethod<[MilestoneId], Milestone>,
  'getMilestonesByProjectId' : ActorMethod<[ProjectId], Array<Milestone>>,
  'getProjectById' : ActorMethod<[ProjectId], Project>,
  'getProjectFinancialsByProjectId' : ActorMethod<
    [ProjectId],
    ProjectFinancials
  >,
  'getProjectFunderById' : ActorMethod<[ProjectFunderId], ProjectFunder>,
  'getProjectFundersByProjectId' : ActorMethod<
    [ProjectId],
    Array<ProjectFunder>
  >,
  'getProjectFundersByUserId' : ActorMethod<[Principal], Array<ProjectFunder>>,
  'getProjectOwner' : ActorMethod<[], ProjectOwner>,
  'getProjectProjectionsByProjectId' : ActorMethod<
    [ProjectId],
    ProjectProjections
  >,
  'getProjectTermById' : ActorMethod<[ProjectTermId], ProjectTerm>,
  'getProjectTermsByProjectId' : ActorMethod<[ProjectId], Array<ProjectTerm>>,
  'getProjectTypes' : ActorMethod<[], Array<string>>,
  'getProjectionExpenseById' : ActorMethod<[ProjectExpenseId], ProjectExpense>,
  'getProjectionExpensesByProjectId' : ActorMethod<
    [ProjectId],
    Array<ProjectExpense>
  >,
  'getProjectionIncomeById' : ActorMethod<[ProjectIncomeId], ProjectIncome>,
  'getProjectionIncomesByProjectId' : ActorMethod<
    [ProjectId],
    Array<ProjectIncome>
  >,
  'getProjectsByCoop' : ActorMethod<[string], Array<Project>>,
  'getProjectsByOwner' : ActorMethod<[UserId], Array<Project>>,
  'getTreasuryByProjectId' : ActorMethod<[ProjectId], Treasury>,
  'updateFinancialsExpense' : ActorMethod<[ProjectExpense], undefined>,
  'updateFinancialsIncome' : ActorMethod<[ProjectIncome], undefined>,
  'updateMilestone' : ActorMethod<[Milestone], undefined>,
  'updateProject' : ActorMethod<[Project], undefined>,
  'updateProjectFinancials' : ActorMethod<[ProjectFinancials], undefined>,
  'updateProjectFunder' : ActorMethod<[ProjectFunder], undefined>,
  'updateProjectOwner' : ActorMethod<[ProjectOwner], undefined>,
  'updateProjectProjections' : ActorMethod<[ProjectProjections], undefined>,
  'updateProjectTerm' : ActorMethod<[ProjectTerm], undefined>,
  'updateProjectionExpense' : ActorMethod<[ProjectExpense], undefined>,
  'updateProjectionIncome' : ActorMethod<[ProjectIncome], Result>,
  'updateTreasury' : ActorMethod<[Treasury], undefined>,
}
export type ProposalStatus = { 'Approved' : null } |
  { 'Draft' : null } |
  { 'Rejected' : null } |
  { 'Pending' : null };
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : ProjectIncome } |
  { 'err' : string };
export type Result_2 = { 'ok' : ProjectExpense } |
  { 'err' : string };
export type Time = bigint;
export interface Treasury {
  'balance' : bigint,
  'totalIn' : bigint,
  'totalOut' : bigint,
  'projectId' : string,
  'timestamp' : Time,
}
export type UserId = Principal;
export interface _SERVICE extends Projects {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
