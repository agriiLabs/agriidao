export { idlFactory as userIdlFactory } from "../../../declarations/user/user.did.js";
export { idlFactory as bountyIdlFactory } from "../../../declarations/bounty/bounty.did.js";
export { idlFactory as settingsIdlFactory } from "../../../declarations/settings/settings.did.js";
export { idlFactory as commodityIdlFactory } from "../../../declarations/commodity/commodity.did.js";
export { idlFactory as coopIndexerIdlFactory } from "../../../declarations/coop_indexer/coop_indexer.did.js";
export { idlFactory as coopLedgerIdlFactory } from "../../../declarations/coop_ledger/coop_ledger.did.js";

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
// export const coopIndexerCanisterId = "ovdka-7yaaa-aaaag-atzta-cai"
// export const coopLedgerCanisterId = "oscmu-saaaa-aaaag-atztq-cai"

//local

export const bountyCanisterId = "avqkn-guaaa-aaaaa-qaaea-cai"
export const commodityCanisterId = "cgpjn-omaaa-aaaaa-qaakq-cai"
export const userCanisterId = "a3shf-5eaaa-aaaaa-qaafa-cai"
export const settingsCanisterId = "a3shf-5eaaa-aaaaa-qaafa-cai"
export const coopIndexerCanisterId = "ajuq4-ruaaa-aaaaa-qaaga-cai"
export const coopLedgerCanisterId = "aovwi-4maaa-aaaaa-qaagq-cai"

// Tokens 
export const USDCCanisterId = "c5kvi-uuaaa-aaaaa-qaaia-cai"
export const ckUSDCe6s = 1000000



type Env = "ic" | "local"
export const network: Env = "local"

export const host = network === "local" ? "http://localhost:4943" : "https://icp0.io" 