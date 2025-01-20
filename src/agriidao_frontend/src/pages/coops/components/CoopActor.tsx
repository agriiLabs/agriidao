import { Actor, ActorSubclass, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { host, network } from "../../../constants/canisters_config";
import { idlFactory } from "../../../../../declarations/coop_manager/coop_manager.did.js";
import { _SERVICE } from "../../../../../declarations/coop_manager/coop_manager.did";


const getCoopActor = async (canisterId: string) => {
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    const agent = await HttpAgent.create({
      host,
      identity,
    });
    if (network === "local") {
      agent.fetchRootKey();
    }
    const _actor: ActorSubclass<_SERVICE> = Actor.createActor(idlFactory, {
      agent,
      canisterId: canisterId,
    });
    return _actor;
  };

  export default getCoopActor;