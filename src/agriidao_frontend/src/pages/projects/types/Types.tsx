// src/types.ts (or wherever you store types)
export type EntityType = "Business" | "Government" | "Individual" | "NGO" | "University";
export enum FundingStatus {
    Pending = "Pending",
    Approved = "Approved",
    Rejected = "Rejected",
  }