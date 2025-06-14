export { idlFactory as userIdlFactory } from "../../../declarations/user/user.did.js";
export { idlFactory as bountyIdlFactory } from "../../../declarations/bounty/bounty.did.js";
export { idlFactory as settingsIdlFactory } from "../../../declarations/settings/settings.did.js";
export { idlFactory as commodityIdlFactory } from "../../../declarations/commodity/commodity.did.js";
export { idlFactory as coopIndexerIdlFactory } from "../../../declarations/coop_indexer/coop_indexer.did.js";
export { idlFactory as coopLedgerIdlFactory } from "../../../declarations/coop_ledger/coop_ledger.did.js";
export { idlFactory as projectsIdlFactory } from "../../../declarations/projects/projects.did.js";
export { idlFactory as proposalsIdlFactory } from "../../../declarations/proposals/proposals.did.js";

//ic production
// export const bountyCanisterId = "vmdll-5qaaa-aaaag-alfga-cai"
// export const commodityCanisterId = "ltkqy-7aaaa-aaaag-ats7a-cai"
// export const userCanisterId = "xy5o7-yqaaa-aaaag-alfia-cai"
// export const settingsCanisterId = "vfaax-lyaaa-aaaag-alfhq-cai"
// export const coopIndexerCanisterId = "ovdka-7yaaa-aaaag-atzta-cai" //TODO: change this 
// export const coopLedgerCanisterId = "oscmu-saaaa-aaaag-atztq-cai" //TODO: change this
// export const projectsCanisterId = "5plzz-uyaaa-aaaag-at5kq-cai" //TODO: change this
// export const proposalsCanisterId = "5ik7n-zaaaa-aaaag-at5ka-cai" //TODO: change this
// export const storageScalerCanId = "7i6vo-qaaaa-aaaal-qcaoa-cai" //TODO: change this


// // ic staging
// export const bountyCanisterId = "ygpmr-tqaaa-aaaag-aldrq-cai"
// export const userCanisterId = "yti54-syaaa-aaaag-aldsa-cai"
// export const settingsCanisterId = "ybokf-6iaaa-aaaag-aldra-cai"
// export const coopIndexerCanisterId = "ovdka-7yaaa-aaaag-atzta-cai"
// export const coopLedgerCanisterId = "oscmu-saaaa-aaaag-atztq-cai"
// export const projectsCanisterId = "5plzz-uyaaa-aaaag-at5kq-cai"
// export const proposalsCanisterId = "5ik7n-zaaaa-aaaag-at5ka-cai"
// export const storageScalerCanId = "7i6vo-qaaaa-aaaal-qcaoa-cai"

//local

export const bountyCanisterId = "bkyz2-fmaaa-aaaaa-qaaaq-cai"
export const commodityCanisterId = "bd3sg-teaaa-aaaaa-qaaba-cai"
export const coopIndexerCanisterId = "be2us-64aaa-aaaaa-qaabq-cai"
export const coopLedgerCanisterId = "br5f7-7uaaa-aaaaa-qaaca-cai"
export const projectsCanisterId = "bw4dl-smaaa-aaaaa-qaacq-cai"
export const proposalsCanisterId = "b77ix-eeaaa-aaaaa-qaada-cai"
export const settingsCanisterId = "by6od-j4aaa-aaaaa-qaadq-cai"
export const userCanisterId = "avqkn-guaaa-aaaaa-qaaea-cai"
export const storageScalerCanId = "7i6vo-qaaaa-aaaal-qcaoa-cai"

// Tokens 
export const USDCCanisterId = "pynoo-qqaaa-aaaag-atzuq-cai"
export const ckUSDCe6s = 1000000
export const ckUSDCFees = 10_000
export const startCOOPFees = 20 // 20 usd - 10 for the coop and 10 for the platform



type Env = "ic" | "local"
export const network: Env = "local" as Env //FIXME: ONLY CHANGE THIS LINE

export const host = network === "local" ? "http://localhost:4943" :  "https://icp0.io" 