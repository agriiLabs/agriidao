import { Actor, ActorSubclass, HttpAgent, Identity, SignIdentity } from "@dfinity/agent";
import React, { FC, createContext, useContext, useEffect, useState } from "react";
import { AuthClient, AuthClientCreateOptions, AuthClientLoginOptions } from "@dfinity/auth-client";
import { _SERVICE } from "../../../declarations/user/user.did";
import { userIDL } from "../exporter";

const userCanisterId = "br5f7-7uaaa-aaaaa-qaaca-cai"
const network = process.env.DFX_NETWORK || "local";


const localhost = "http://localhost:4943";
const host = "https://icp0.io";
const iiCanId = "asrmz-lmaaa-aaaaa-qaaeq-cai";
type ContextType = {
  identity: Identity | null;
  userActor: ActorSubclass<_SERVICE> | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};
  
const initialContext: ContextType = {
  identity: null,
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
    identityProvider: network === "local"
      ? `http://${iiCanId}.localhost:4943` 
      : "https://identity.ic0.app/#authorize",
  },
};

  
  
export const Context = (options = defaultOptions) => {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userActor, setUserActor] = useState<ActorSubclass<_SERVICE> | null>(null);
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
    setUserActor(null);
  };
    
  
  const handleAuthenticated = async (client: AuthClient) => {
    setIsAuthenticated(true);
    const _identity = client.getIdentity();
    setIdentity(_identity);

    const agent = new HttpAgent({
      host: network === "ic" ? host : localhost,
    });

    if (network !== "ic") {
      agent.fetchRootKey();
    }

    const _userActor: ActorSubclass<_SERVICE> = Actor.createActor(userIDL, {
      agent,
      canisterId: userCanisterId,
    });
   setUserActor(_userActor);
  };

  return {
    identity,
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