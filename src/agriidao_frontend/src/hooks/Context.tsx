import {
  Actor,
  ActorSubclass,
  HttpAgent,
  Identity,
  SignIdentity,
} from "@dfinity/agent";
import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AuthClient,
  AuthClientCreateOptions,
  AuthClientLoginOptions,
} from "@dfinity/auth-client";
import { _SERVICE as _userService } from "../../../declarations/user/user.did";
import type { _SERVICE as _bountyService } from "../../../declarations/bounty/bounty.did";
import type { _SERVICE as _settingsService } from "../../../declarations/settings/settings.did";
import type {_SERVICE as _commodityService} from "../../../declarations/commodity/commodity.did";
import type { _SERVICE as _coopIndexerService } from "../../../declarations/coop_indexer/coop_indexer.did";
import type { _SERVICE as _coopLedgerService } from "../../../declarations/coop_ledger/coop_ledger.did";
// import {canisterId as iiCanId} from "../../../declarations/internet_identity";

import {
  network,
  userIdlFactory,
  bountyIdlFactory,
  settingsIdlFactory,
  commodityIdlFactory,
  coopIndexerIdlFactory,
  coopLedgerIdlFactory,
  bountyCanisterId,
  userCanisterId,
  settingsCanisterId,
  commodityCanisterId,
  coopIndexerCanisterId,
  coopLedgerCanisterId,
} from "../constants/canisters_config";

const localhost = "http://localhost:4943";
const host = "https://icp0.io";
const iiCanId = "c2lt4-zmaaa-aaaaa-qaaiq-cai";

type ContextType = {
  identity: Identity | null;
  bountyActor: ActorSubclass<_bountyService> | null;
  userActor: ActorSubclass<_userService> | null;
  settingsActor: ActorSubclass<_settingsService> | null;
  commodityActor: ActorSubclass<_commodityService> | null;
  coopIndexerActor: ActorSubclass<_coopIndexerService> | null;
  coopLedgerActor: ActorSubclass<_coopLedgerService> | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;

  temporaryVal: string | null;
  setTempVal(args: string | null): void;
};

const initialContext: ContextType = {
  identity: null,
  bountyActor: null,
  userActor: null,
  settingsActor: null, 
  commodityActor: null,
  coopIndexerActor: null,
  coopLedgerActor: null,
  isAuthenticated: false,
  login: async () => {
    throw new Error("login function must be overridden");
  },
  logout: async () => {
    throw new Error("logout function must be overridden");
  },
  temporaryVal: null,
  setTempVal: (): void => {},
};

const ContextWrapper = createContext<ContextType>(initialContext);

interface DefaultOptions {
  createOptions: AuthClientCreateOptions;
  loginOptions: AuthClientLoginOptions;
}

const defaultOptions: DefaultOptions = {
  createOptions: {
    idleOptions: {
      disableIdle: true,
    },
  },
  loginOptions: {
    identityProvider:
      network === "local"
        ? `http://${iiCanId}.localhost:4943`
        : "https://identity.ic0.app/#authorize",
  },
};
console.log("iiCanId", iiCanId);
export const Context = (options = defaultOptions) => {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bountyActor, setBountyActor] =
    useState<ActorSubclass<_bountyService> | null>(null);
  const [userActor, setUserActor] =
    useState<ActorSubclass<_userService> | null>(null);
  const [settingsActor, setSettingsActor] =
    useState<ActorSubclass<_settingsService> | null>(null);
  const [commodityActor, setCommodityActor] =
    useState<ActorSubclass<_commodityService> | null>(null);
  const [user, setUser] = useState(null);
  const [coopIndexerActor, setCoopIndexerActor] = 
    useState<ActorSubclass<_coopIndexerService> | null>(null);
  const [coopLedgerActor, setCoopLedgerActor] = 
    useState<ActorSubclass<_coopLedgerService> | null >(null);
  const [temporaryVal, setTempVal] = useState<string | null>(null);

  useEffect(() => {
    AuthClient.create(options.createOptions).then(async (client) => {
      // if (await client.isAuthenticated()) {
        handleAuthenticated(client);
      // }
    });
  }, []);

  const login = async () => {
    if (!authClient) {
      console.error("Authentication client is not initialized");
      return;
    }
    authClient.login({
      ...options.loginOptions,
      onSuccess: async () => {
        await handleAuthenticated(authClient);
      },
    });
  };

  const logout = async () => {
    await authClient?.logout();
    setIsAuthenticated(false);
    setIdentity(null);
    setUserActor(null);
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
  };

  const handleAuthenticated = async (client: AuthClient) => {
    setAuthClient(client)
    setIsAuthenticated(await client.isAuthenticated());
    const _identity = client.getIdentity();
    setIdentity(_identity);

    const agent = new HttpAgent({
      host: network === "ic" ? host : localhost,
      identity: _identity,
    });

    if (network !== "ic") {
      agent.fetchRootKey();
    }

    // set user actor
    const _userBackend: ActorSubclass<_userService> = Actor.createActor(
      userIdlFactory,
      {
        agent,
        canisterId: userCanisterId,
      }
    );
    setUserActor(_userBackend);
    

    // set bounty actor
    const _bountyBackend: ActorSubclass<_bountyService> = Actor.createActor(
      bountyIdlFactory,
      {
        agent,
        canisterId: bountyCanisterId,
      }
    );  
    setBountyActor(_bountyBackend);

    // set settings actor
    const _settingsBackend: ActorSubclass<_settingsService> = Actor.createActor(
      settingsIdlFactory,
      {
        agent,
        canisterId: settingsCanisterId,
      }
    );
    setSettingsActor(_settingsBackend);

    // set commodity actor
    const _commodityBackend: ActorSubclass<_commodityService> = Actor.createActor(
      commodityIdlFactory,
      {
        agent,
        canisterId: commodityCanisterId,
      }
    );
    setCommodityActor(_commodityBackend);

    // set coop indexer actor
    const _coOpIndexerBackend: ActorSubclass<_coopIndexerService> =
    Actor.createActor(
      coopIndexerIdlFactory,
      {
        agent,
        canisterId: coopIndexerCanisterId,
      }
    );
    setCoopIndexerActor(_coOpIndexerBackend);

    // set coop ledger actor
    const _coopLedgerBackend: ActorSubclass<_coopLedgerService> =
    Actor.createActor(
      coopLedgerIdlFactory,
      {
        agent,
        canisterId: coopLedgerCanisterId,
      }
    );
    setCoopLedgerActor(_coopLedgerBackend);
  };

  return {
    identity,
    bountyActor,
    userActor,
    settingsActor,
    commodityActor,
    coopIndexerActor,
    coopLedgerActor,
    isAuthenticated,
    login,
    logout,
    temporaryVal,
    setTempVal,
  };
};

interface LayoutProps {
  children: React.ReactNode;
}
export const AuthProvider: FC<LayoutProps> = ({ children }) => {
  const auth = Context();
  return (
    <ContextWrapper.Provider value={auth}>{children}</ContextWrapper.Provider>
  );
};

export const useAuth = () => useContext(ContextWrapper);
