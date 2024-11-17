export { idlFactory as userIdlFactory } from "../../declarations/user/user.did.js";
export { idlFactory as bountyIdlFactory } from "../../declarations/bounty/bounty.did.js";
export { idlFactory as settingsIdlFactory } from "../../declarations/settings/settings.did.js";
export { idlFactory as commodityIdlFactory } from "../../declarations/commodity/commodity.did.js";

//ic production
// export const bountyCanisterId = "vmdll-5qaaa-aaaag-alfga-cai"
// export const userCanisterId = "xy5o7-yqaaa-aaaag-alfia-cai"
// export const settingsCanisterId = "vfaax-lyaaa-aaaag-alfhq-cai"

// // ic staging
// export const bountyCanisterId = "ygpmr-tqaaa-aaaag-aldrq-cai"
// export const userCanisterId = "yti54-syaaa-aaaag-aldsa-cai"
// export const settingsCanisterId = "ybokf-6iaaa-aaaag-aldra-cai"



//local

export const bountyCanisterId = "br5f7-7uaaa-aaaaa-qaaca-cai"
export const userCanisterId = "by6od-j4aaa-aaaaa-qaadq-cai"
export const settingsCanisterId = "b77ix-eeaaa-aaaaa-qaada-cai"
export const commodityCanisterId = "bw4dl-smaaa-aaaaa-qaacq-cai"



type Env = "ic" | "local"
export const network: Env = "local"
