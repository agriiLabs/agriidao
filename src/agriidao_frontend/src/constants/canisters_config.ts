export { idlFactory as userIdlFactory } from "../../../declarations/user/user.did.js";
export { idlFactory as bountyIdlFactory } from "../../../declarations/bounty/bounty.did.js";
export { idlFactory as settingsIdlFactory } from "../../../declarations/settings/settings.did.js";
export { idlFactory as commodityIdlFactory } from "../../../declarations/commodity/commodity.did.js";
export { idlFactory as coopIndexerIdlFactory } from "../../../declarations/coop_indexer/coop_indexer.did.js";
export { idlFactory as coopLedgerIdlFactory } from "../../../declarations/coop_ledger/coop_ledger.did.js";
export { idlFactory as projectsIdlFactory } from "../../../declarations/projects/projects.did.js";

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
export const coopIndexerCanisterId = "ovdka-7yaaa-aaaag-atzta-cai"
export const coopLedgerCanisterId = "oscmu-saaaa-aaaag-atztq-cai"
export const projectsCanisterId = "xncbs-uqaaa-aaaag-at3mq-cai"

//local

// export const bountyCanisterId = "br5f7-7uaaa-aaaaa-qaaca-cai"
// export const commodityCanisterId = "b77ix-eeaaa-aaaaa-qaada-cai"
// export const coopIndexerCanisterId = "by6od-j4aaa-aaaaa-qaadq-cai"
// export const coopLedgerCanisterId = "avqkn-guaaa-aaaaa-qaaea-cai"
// export const projectsCanisterId = "a4tbr-q4aaa-aaaaa-qaafq-cai"
// export const settingsCanisterId = "ajuq4-ruaaa-aaaaa-qaaga-cai"
// export const userCanisterId = "aovwi-4maaa-aaaaa-qaagq-cai"


// Tokens 
export const USDCCanisterId = "pynoo-qqaaa-aaaag-atzuq-cai"
export const ckUSDCe6s = 1000000



type Env = "ic" | "local"
export const network: Env = "ic"

export const host = network === "ic" ? "https://icp0.io" : "http://localhost:4943"
// export const host = network === "local" ? "http://localhost:4943" : "https://icp0.io"  