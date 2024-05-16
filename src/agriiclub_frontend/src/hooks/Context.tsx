import { ActorSubclass, Identity, SignIdentity } from "@dfinity/agent";
import React, { FC, createContext, useContext, useEffect, useState } from "react";
import { AuthClient, AuthClientCreateOptions, AuthClientLoginOptions } from "@dfinity/auth-client";
import { createActor as settingsCreateActor, } from "../../../declarations/settings";
import { createActor as bounty_commodityCreateActor, } from "../../../declarations/bounty_commodity";
import { createActor as userCreateActor, } from "../../../declarations/user";
import type { _SERVICE as _adminAppService } from "../../../declarations/user/user.did"; 
import type { _SERVICE as _settingsService } from "../../../declarations/settings/settings.did";
import type { _SERVICE as _bounty_commodityService } from "../../../declarations/bounty_commodity/bounty_commodity.did";
import type { _SERVICE as _userService } from "../../../declarations/user/user.did";
import { canisterId as iiCanId } from "../../../declarations/internet_identity";

const bounty_commodityCanisterId = "bd3sg-teaaa-aaaaa-qaaba-cai"
const settingsCanisterId = "be2us-64aaa-aaaaa-qaabq-cai"
const userCanisterId = "br5f7-7uaaa-aaaaa-qaaca-cai"
const network = process.env.DFX_NETWORK || "local";

type ContextType = {
  identity: Identity | null;
  settingsActor: ActorSubclass<_settingsService> | null; 
  bounty_commodityActor: ActorSubclass<_bounty_commodityService> | null; 
  userActor: ActorSubclass<_userService> | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};
  
const initialContext: ContextType = {
  identity: null,
  settingsActor: null,
  bounty_commodityActor: null,
  userActor: null,
  isAuthenticated: false,
  login: async () => {
    throw new Error("login function must be overridden");
  },
  logout: async () => {
    throw new Error("logout function must be overridden");
  },
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
    identityProvider: typeof window !== "undefined" && window.location.hostname === "localhost"
      ? `http://${iiCanId}.localhost:4943` // Assuming iiCanId is defined
      : "https://identity.ic0.app/#authorize",
  },
};
  
  
export const Context = (options = defaultOptions) => {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [settingsActor, setSettingsActor] = useState<ActorSubclass<_settingsService> | null>(null);
  const [bounty_commodityActor, setBounty_commodityActor] = useState<ActorSubclass<_bounty_commodityService> | null>(null);
  const [userActor, setUserActor] = useState<ActorSubclass<_userService> | null>(null);
  const [user, setUser] = useState(null);


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
    setSettingsActor(null);
    setBounty_commodityActor(null);
    setUserActor(null);
  };
    
  
  const handleAuthenticated = async (client: AuthClient) => {
    setIsAuthenticated(true);
    const _identity = client.getIdentity();
    setIdentity(_identity);

    // Assume these createActor functions are available and implemented correctly
    setSettingsActor(settingsCreateActor(settingsCanisterId, { agentOptions: { identity: _identity } }));
    setBounty_commodityActor(bounty_commodityCreateActor(bounty_commodityCanisterId, { agentOptions: { identity: _identity } }));
    setUserActor(userCreateActor(userCanisterId, { agentOptions: { identity: _identity } }));
  };

  return {
    identity,
    settingsActor,
    bounty_commodityActor,
    userActor,
    isAuthenticated,
    login,
    logout,
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

