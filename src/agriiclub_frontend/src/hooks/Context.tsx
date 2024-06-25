import { Actor, ActorSubclass, HttpAgent, Identity, SignIdentity } from "@dfinity/agent";
import React, { FC, createContext, useContext, useEffect, useState } from "react";
import { AuthClient, AuthClientCreateOptions, AuthClientLoginOptions } from "@dfinity/auth-client";
import { _SERVICE as _userService } from "../../../declarations/user/user.did";
import { createActor as bountyCreateActor, } from "../../../declarations/bounty";
import type { _SERVICE as _bountyService } from "../../../declarations/bounty/bounty.did";
import { userIDL } from "../exporter";

const bountyCanisterId = "avqkn-guaaa-aaaaa-qaaea-cai"
const userCanisterId = "ajuq4-ruaaa-aaaaa-qaaga-cai"
const iiCanId = "be2us-64aaa-aaaaa-qaabq-cai";
const network = process.env.DFX_NETWORK || "local";
const localhost = "http://localhost:4943";
const host = "https://icp0.io";

type ContextType = {
  identity: Identity | null;
  bountyActor: ActorSubclass<_bountyService> | null; 
  userActor: ActorSubclass<_userService> | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;

  temporaryVal: string | null;
  setTempVal(args:string|null): void;
};
  
const initialContext: ContextType = {
  identity: null,
  bountyActor: null,
  userActor: null,
  isAuthenticated: false,
  login: async () => {
    throw new Error("login function must be overridden");
  },
  logout: async () => {
    throw new Error("logout function must be overridden");
  },
  temporaryVal: null,
  setTempVal: (): void => {}
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
    identityProvider: network === "local"
      ? `http://${iiCanId}.localhost:4943` 
      : "https://identity.ic0.app/#authorize",
  },
};

  
  
export const Context = (options = defaultOptions) => {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bountyActor, setBountyActor] = useState<ActorSubclass<_bountyService> | null>(null);
  const [userActor, setUserActor] = useState<ActorSubclass<_userService> | null>(null);
  const [user, setUser] = useState(null);
  const [temporaryVal, setTempVal] = useState<string | null>(null);



  useEffect(() => {
    AuthClient.create(options.createOptions).then(async (client) => {
      setAuthClient(client);
      if (await client.isAuthenticated()) {
        handleAuthenticated(client);
      }
    });
  }, []);

  const login = async () => {
    if (!authClient) {
      console.error('Authentication client is not initialized');
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
  };
    
  
  const handleAuthenticated = async (client: AuthClient) => {
    setIsAuthenticated(true);
    const _identity = client.getIdentity();
    setIdentity(_identity);

    const agent = new HttpAgent({
      host: network === "ic" ? host : localhost,
      identity: _identity
    });

    if (network !== "ic") {
      agent.fetchRootKey();
    }

    const _bountyBackend = bountyCreateActor(bountyCanisterId, { agentOptions: { identity: _identity } });
    setBountyActor(_bountyBackend);

    const _userActor: ActorSubclass<_userService> = Actor.createActor(userIDL, {
      agent,
      canisterId: userCanisterId,
    });
   setUserActor(_userActor);

  
  };

  return {
    identity,
    bountyActor,
    userActor,
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
  return <ContextWrapper.Provider value={auth}>{children}</ContextWrapper.Provider>;
};

export const useAuth = () => useContext(ContextWrapper);