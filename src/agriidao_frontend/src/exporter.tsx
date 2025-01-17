export { idlFactory as userIdlFactory } from "../../declarations/user/user.did.js";
export { idlFactory as bountyIdlFactory } from "../../declarations/bounty/bounty.did.js";
export { idlFactory as settingsIdlFactory } from "../../declarations/settings/settings.did.js";
export { idlFactory as commodityIdlFactory } from "../../declarations/commodity/commodity.did.js";
export { idlFactory as coopIndexerIdlFactory } from "../../declarations/coop_indexer/coop_indexer.did.js";
export { idlFactory as coopLedgerIdlFactory } from "../../declarations/coop_ledger/coop_ledger.did.js";

//ic production
// export const bountyCanisterId = "vmdll-5qaaa-aaaag-alfga-cai"
// export const commodityCanisterId = "ltkqy-7aaaa-aaaag-ats7a-cai"
// export const userCanisterId = "xy5o7-yqaaa-aaaag-alfia-cai"
// export const settingsCanisterId = "vfaax-lyaaa-aaaag-alfhq-cai"

// // ic staging
// export const bountyCanisterId = "ygpmr-tqaaa-aaaag-aldrq-cai"
// export const commodityCanisterId = "zpxxj-jyaaa-aaaag-alelq-cai"
// export const userCanisterId = "yti54-syaaa-aaaag-aldsa-cai"
// export const settingsCanisterId = "ybokf-6iaaa-aaaag-aldra-cai"




//local

export const bountyCanisterId = "br5f7-7uaaa-aaaaa-qaaca-cai"
export const commodityCanisterId = "bw4dl-smaaa-aaaaa-qaacq-cai"
export const userCanisterId = "a4tbr-q4aaa-aaaaa-qaafq-cai"
export const settingsCanisterId = "a3shf-5eaaa-aaaaa-qaafa-cai"
export const coopIndexerCanisterId = "b77ix-eeaaa-aaaaa-qaada-cai"
export const coopLedgerCanisterId = "by6od-j4aaa-aaaaa-qaadq-cai"




type Env = "ic" | "local"
export const network: Env = "local"
