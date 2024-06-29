export { idlFactory as userIdlFactory } from "../../declarations/user/user.did.js";
export { idlFactory as bountyIdlFactory } from "../../declarations/bounty/bounty.did.js";

//ic
// export const bountyCanisterId = "ygpmr-tqaaa-aaaag-aldrq-cai"
// export const userCanisterId = "yti54-syaaa-aaaag-aldsa-cai"



//local

export const bountyCanisterId = "br5f7-7uaaa-aaaaa-qaaca-cai"
export const userCanisterId = "by6od-j4aaa-aaaaa-qaadq-cai"



type Env = "ic" | "local"
export const network: Env = "local"
