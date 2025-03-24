import { useState, useEffect, useCallback } from 'react';
import Web3 from 'web3';
import { useAppState } from '@/contexts/AppStateContext';

interface WalletState {
  connected: boolean;
  account: string | null;
  chainId: number | null;
  balance: string | null;
  network: string | null;
}

export const useWallet = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [walletState, setWalletState] = useState<WalletState>({
    connected: false,
    account: null,
    chainId: null,
    balance: null,
    network: null
  });
  const { setIsLoading } = useAppState();
  
  // Initialize web3
  const initWeb3 = useCallback(async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        return web3Instance;
      } catch (error) {
        console.error('Error initializing web3', error);
        return null;
      }
    } else {
      console.log('Please install MetaMask or another Web3 wallet');
      return null;
    }
  }, []);
  
  // Connect wallet
  const connect = useCallback(async () => {
    setIsLoading(true);
    try {
      const web3Instance = web3 || await initWeb3();
      if (!web3Instance) {
        throw new Error('Failed to initialize Web3');
      }
      
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Get connected account
      const accounts = await web3Instance.eth.getAccounts();
      const account = accounts[0];
      
      // Get network ID
      const chainId = await web3Instance.eth.getChainId();
      
      // Get account balance
      const balanceWei = await web3Instance.eth.getBalance(account);
      const balance = web3Instance.utils.fromWei(balanceWei, 'ether');
      
      // Determine network name
      let network = 'Unknown';
      switch (chainId) {
        case 1:
          network = 'Ethereum Mainnet';
          break;
        case 56:
          network = 'Binance Smart Chain';
          break;
        case 137:
          network = 'Polygon';
          break;
        case 5:
          network = 'Goerli Testnet';
          break;
        case 97:
          network = 'BSC Testnet';
          break;
        default:
          network = `Chain ID: ${chainId}`;
      }
      
      // Update state
      setWalletState({
        connected: true,
        account,
        chainId,
        balance,
        network
      });
      
      return { account, chainId, balance, network };
    } catch (error) {
      console.error('Error connecting wallet', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [web3, initWeb3, setIsLoading]);
  
  // Disconnect wallet
  const disconnect = useCallback(() => {
    setWalletState({
      connected: false,
      account: null,
      chainId: null,
      balance: null,
      network: null
    });
  }, []);
  
  // Switch network
  const switchNetwork = useCallback(async (chainId: number) => {
    if (!web3 || !window.ethereum) return false;
    
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }]
      });
      return true;
    } catch (error) {
      console.error('Error switching network', error);
      return false;
    }
  }, [web3]);
  
  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnect();
        } else if (walletState.connected) {
          // User switched accounts
          const web3Instance = web3 || await initWeb3();
          if (web3Instance) {
            const balanceWei = await web3Instance.eth.getBalance(accounts[0]);
            const balance = web3Instance.utils.fromWei(balanceWei, 'ether');
            
            setWalletState(prev => ({
              ...prev,
              account: accounts[0],
              balance
            }));
          }
        }
      };
      
      const handleChainChanged = (chainId: string) => {
        // Chain ID comes as hex string (0x1, 0x38, etc.)
        // Parse to decimal
        const chainIdDecimal = parseInt(chainId, 16);
        
        // Handle chain change
        setWalletState(prev => ({
          ...prev,
          chainId: chainIdDecimal
        }));
        
        // Refresh page as recommended by MetaMask
        window.location.reload();
      };
      
      // Subscribe to events
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      
      // Cleanup
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [web3, walletState.connected, disconnect, initWeb3]);
  
  return {
    ...walletState,
    connect,
    disconnect,
    switchNetwork
  };
}; 