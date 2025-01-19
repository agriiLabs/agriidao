export { idlFactory as userIdlFactory } from "../../../declarations/user/user.did.js";
export { idlFactory as bountyIdlFactory } from "../../../declarations/bounty/bounty.did.js";
export { idlFactory as settingsIdlFactory } from "../../../declarations/settings/settings.did.js";
export { idlFactory as commodityIdlFactory } from "../../../declarations/commodity/commodity.did.js";
export { idlFactory as coopIndexerIdlFactory } from "../../../declarations/coop_indexer/coop_indexer.did.js";
export { idlFactory as coopLedgerIdlFactory } from "../../../declarations/coop_manager/coop_manager.did.js";

//ic production
// export const bountyCanisterId = "vmdll-5qaaa-aaaag-alfga-cai"
// export const commodityCanisterId = "ltkqy-7aaaa-aaaag-ats7a-cai"
// export const userCanisterId = "xy5o7-yqaaa-aaaag-alfia-cai"
// export const settingsCanisterId = "vfaax-lyaaa-aaaag-alfhq-cai"

// // ic staging
export const bountyCanisterId = "ygpmr-tqaaa-aaaag-aldrq-cai"
export const commodityCanisterId = "zpxxj-jyaaa-aaaag-alelq-cai"
export const userCanisterId = "yti54-syaaa-aaaag-aldsa-cai"
export const settingsCanisterId = "ybokf-6iaaa-aaaag-aldra-cai"




//local

// export const bountyCanisterId = "by6od-j4aaa-aaaaa-qaadq-cai"
// export const commodityCanisterId = "avqkn-guaaa-aaaaa-qaaea-cai"
// export const userCanisterId = "ahw5u-keaaa-aaaaa-qaaha-cai"
// export const settingsCanisterId = "aovwi-4maaa-aaaaa-qaagq-cai"
export const coopIndexerCanisterId = "asrmz-lmaaa-aaaaa-qaaeq-cai"
export const coopLedgerCanisterId = "a3shf-5eaaa-aaaaa-qaafa-cai"

// Tokens 
export const USDCCanisterId = "xevnm-gaaaa-aaaar-qafnq-cai"




type Env = "ic" | "local"
export const network: Env = "ic"
