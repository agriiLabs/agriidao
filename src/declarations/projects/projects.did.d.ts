import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type EntityType = { 'NGO' : null } |
  { 'University' : null } |
  { 'Business' : null } |
  { 'Government' : null } |
  { 'Individual' : null };
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
  'isStart' : boolean,
  'approvedBy' : [] | [Principal],
  'dueDate' : [] | [Time],
  'description' : [] | [string],
  'projectId' : string,
  'timestamp' : Time,
  'budget' : number,
  'isComplete' : boolean,
}
export type MilestoneId = string;
export interface Project {
  'id' : string,
  'duration' : bigint,
  'endDate' : [] | [Time],
  'owner' : Principal,
  'coop' : Principal,
  'name' : string,
  'createdBy' : Principal,
  'description' : string,
  'fundingStatus' : FundingStatus,
  'fundingEnd' : [] | [Time],
  'isActive' : boolean,
  'summary' : string,
  'currency' : string,
  'timestamp' : Time,
  'proposalStatus' : ProposalStatus,
  'fundingStart' : [] | [Time],
  'fundingGoal' : bigint,
  'image' : [] | [string],
  'isDelete' : boolean,
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
  'total' : bigint,
  'item' : string,
  'createdBy' : Principal,
  'projectFinancialsId' : [] | [string],
  'projectProjectionsId' : [] | [string],
  'timestamp' : Time,
  'quantity' : bigint,
  'amount' : bigint,
}
export interface ProjectFinancials {
  'isStart' : boolean,
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
  'amount' : number,
}
export type ProjectFunderId = string;
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
  'total' : bigint,
  'item' : string,
  'createdBy' : Principal,
  'projectFinancialsId' : [] | [string],
  'projectProjectionsId' : [] | [string],
  'timestamp' : Time,
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
  'isStart' : boolean,
  'expenses' : bigint,
  'royaltySplit' : bigint,
  'income' : bigint,
  'projectId' : string,
  'timestamp' : Time,
  'profit' : bigint,
  'royaltyPercentage' : bigint,
}
export interface ProjectProposal {
  'id' : string,
  'coop' : Principal,
  'userId' : Principal,
  'voteStart' : [] | [Time],
  'isAccept' : boolean,
  'voteDuration' : bigint,
  'projectId' : string,
  'timestamp' : Time,
}
export type ProjectProposalId = string;
export interface ProjectProposalRequest {
  'coop' : Principal,
  'userId' : Principal,
  'voteStart' : [] | [Time],
  'isAccept' : boolean,
  'voteDuration' : bigint,
  'projectId' : string,
  'timestamp' : Time,
}
export interface ProjectRequest {
  'duration' : bigint,
  'owner' : Principal,
  'coop' : Principal,
  'name' : string,
  'description' : string,
  'summary' : string,
  'currency' : string,
  'fundingGoal' : bigint,
  'image' : [] | [string],
  'location' : string,
}
export interface ProjectTerm {
  'duration' : bigint,
  'isStart' : boolean,
  'projectType' : ProjectType,
  'createdBy' : Principal,
  'projectId' : string,
  'timestamp' : Time,
  'rounds' : bigint,
  'payoutFrequency' : bigint,
}
export type ProjectTermId = string;
export type ProjectType = { 'NotSpecified' : null } |
  { 'SolarMiniGrid' : null } |
  { 'Farm' : null } |
  { 'Warehouse' : null } |
  { 'Proccessing' : null } |
  { 'AgTech' : null } |
  { 'ProcessingPlant' : null } |
  { 'Offtaking' : null } |
  { 'GreenHouse' : null } |
  { 'ResearchAndDevelopment' : null };
export type ProposalStatus = { 'Approved' : null } |
  { 'Rejected' : null } |
  { 'Pending' : null };
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Time = bigint;
export interface Treasury {
  'balance' : number,
  'totalIn' : number,
  'totalOut' : number,
  'projectId' : string,
  'totalFunders' : bigint,
  'timestamp' : Time,
}
export type UserId = Principal;
export interface Vote {
  'userId' : Principal,
  'isAccept' : boolean,
  'projectProposalId' : string,
  'timestamp' : Time,
}
export interface _SERVICE {
  'addFinancialsExpense' : ActorMethod<[ProjectExpenseRequest], undefined>,
  'addFinancialsIncome' : ActorMethod<[ProjectIncomeRequest], undefined>,
  'addMilestone' : ActorMethod<[Milestone], undefined>,
  'addProject' : ActorMethod<[ProjectRequest], Result>,
  'addProjectFunder' : ActorMethod<[ProjectFunder], undefined>,
  'addProjectOwner' : ActorMethod<[ProjectOwner], undefined>,
  'addProjectProposal' : ActorMethod<[ProjectProposalRequest], undefined>,
  'addProjectTerm' : ActorMethod<[ProjectTerm], undefined>,
  'addProjectionExpense' : ActorMethod<[ProjectExpenseRequest], undefined>,
  'addProjectionIncome' : ActorMethod<[ProjectIncomeRequest], undefined>,
  'addVote' : ActorMethod<[Vote], undefined>,
  'getAllProjectOwners' : ActorMethod<[], Array<ProjectOwner>>,
  'getAllProjects' : ActorMethod<[], Array<Project>>,
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
  'getProjectProposalById' : ActorMethod<[ProjectProposalId], ProjectProposal>,
  'getProjectProposalsByProjectId' : ActorMethod<
    [ProjectId],
    Array<ProjectProposal>
  >,
  'getProjectTermById' : ActorMethod<[ProjectTermId], ProjectTerm>,
  'getProjectTermsByProjectId' : ActorMethod<[ProjectId], Array<ProjectTerm>>,
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
  'getProjectsByUserId' : ActorMethod<[UserId], Array<Project>>,
  'getStartProject' : ActorMethod<[ProjectId], Project>,
  'getTreasuryByProjectId' : ActorMethod<[ProjectId], Treasury>,
  'getVoteById' : ActorMethod<[string], Vote>,
  'getVotesByUserId' : ActorMethod<[Principal], Array<Vote>>,
  'projectOwnerCheck' : ActorMethod<[], boolean>,
  'updateFinancialsExpense' : ActorMethod<[ProjectExpense], undefined>,
  'updateFinancialsIncome' : ActorMethod<[ProjectIncome], undefined>,
  'updateMilestone' : ActorMethod<[Milestone], undefined>,
  'updateProject' : ActorMethod<[Project], undefined>,
  'updateProjectFinancials' : ActorMethod<[ProjectFinancials], undefined>,
  'updateProjectFunder' : ActorMethod<[ProjectFunder], undefined>,
  'updateProjectProjections' : ActorMethod<[ProjectProjections], undefined>,
  'updateProjectProposal' : ActorMethod<[ProjectProposal], undefined>,
  'updateProjectTerm' : ActorMethod<[ProjectTerm], undefined>,
  'updateProjectionExpense' : ActorMethod<[ProjectExpense], undefined>,
  'updateProjectionIncome' : ActorMethod<[ProjectIncome], undefined>,
  'updateTreasury' : ActorMethod<[Treasury], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
