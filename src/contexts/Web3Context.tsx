import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

// Define the context types
interface Web3ContextType {
  account: string | null;
  chainId: number | null;
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.providers.JsonRpcSigner | null;
  connecting: boolean;
  connected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  switchNetwork: (chainId: number) => Promise<void>;
}

// Create the context with default values
const Web3Context = createContext<Web3ContextType>({
  account: null,
  chainId: null,
  provider: null,
  signer: null,
  connecting: false,
  connected: false,
  connect: async () => {},
  disconnect: async () => {},
  switchNetwork: async () => {},
});

// Provider props interface
interface Web3ProviderProps {
  children: ReactNode;
}

// Web3Modal configuration
const providerOptions = {
  // Add wallet connectors here when they're available
};

let web3Modal: Web3Modal;
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
    theme: {
      background: '#111111',
      main: '#ffffff',
      secondary: '#858585',
      border: '#272727',
      hover: '#0ea5e9',
    },
  });
}

// Provider component
export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const connect = async (): Promise<void> => {
    if (typeof window === 'undefined') return;
    
    try {
      setConnecting(true);
      
      // Connect to the wallet
      const modalProvider = await web3Modal.connect();
      
      // Create ethers provider
      const web3Provider = new ethers.providers.Web3Provider(modalProvider);
      
      // Get the connected account
      const accounts = await web3Provider.listAccounts();
      const network = await web3Provider.getNetwork();
      
      // Get the signer
      const web3Signer = web3Provider.getSigner();
      
      setAccount(accounts[0]);
      setChainId(network.chainId);
      setProvider(web3Provider);
      setSigner(web3Signer);
      setConnected(true);
      
      // Setup listeners
      modalProvider.on('accountsChanged', (newAccounts: string[]) => {
        setAccount(newAccounts[0]);
      });
      
      modalProvider.on('chainChanged', (newChainId: string) => {
        setChainId(parseInt(newChainId, 16));
      });
      
      modalProvider.on('disconnect', () => {
        disconnect();
      });
      
    } catch (error) {
      console.error('Could not connect to wallet:', error);
    } finally {
      setConnecting(false);
    }
  };
  
  const disconnect = async (): Promise<void> => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      setAccount(null);
      setChainId(null);
      setProvider(null);
      setSigner(null);
      setConnected(false);
    }
  };
  
  const switchNetwork = async (newChainId: number): Promise<void> => {
    if (!provider) return;
    
    try {
      await provider.send(
        'wallet_switchEthereumChain',
        [{ chainId: `0x${newChainId.toString(16)}` }]
      );
    } catch (error: any) {
      console.error('Error switching network:', error);
      
      // If the chain is not added to MetaMask
      if (error.code === 4902) {
        // Add network logic here
      }
    }
  };
  
  // Auto connect if cached provider exists
  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connect();
    }
  }, []);
  
  const value: Web3ContextType = {
    account,
    chainId,
    provider,
    signer,
    connecting,
    connected,
    connect,
    disconnect,
    switchNetwork,
  };
  
  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};

// Custom hook to use the Web3 context
export const useWeb3 = () => useContext(Web3Context); 