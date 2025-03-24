import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, IconButton, Avatar, Menu, MenuItem, Tooltip, Box } from '@mui/material';
import { HiOutlineMenu, HiX } from 'react-icons/hi';
import { useWeb3 } from '@/contexts/Web3Context';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { account, connect, disconnect, connected } = useWeb3();
  
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  
  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  // Handle connect/disconnect
  const handleConnectWallet = async () => {
    if (connected) {
      await disconnect();
    } else {
      await connect();
    }
  };
  
  return (
    <nav className="bg-dark-800 border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 relative">
                {/* Logo placeholder */}
                <div className="w-full h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg"></div>
              </div>
              <span className="ml-2 text-xl font-bold text-white">VisionX</span>
            </Link>
            
            {/* Desktop navigation */}
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="/" className="text-white hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </Link>
              <Link href="/analyze" className="text-white hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors">
                Analyze
              </Link>
              <Link href="/nft" className="text-white hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors">
                NFT Gallery
              </Link>
              <Link href="/metaverse" className="text-white hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors">
                Metaverse
              </Link>
            </div>
          </div>
          
          {/* User and wallet section */}
          <div className="flex items-center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleConnectWallet}
              sx={{ 
                borderRadius: '12px',
                textTransform: 'none',
                mr: 2,
                display: { xs: 'none', sm: 'flex' }
              }}
            >
              {connected ? formatAddress(account || '') : 'Connect Wallet'}
            </Button>
            
            {connected && (
              <Tooltip title="Account settings">
                <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
                    {account?.slice(2, 4)}
                  </Avatar>
                </IconButton>
              </Tooltip>
            )}
            
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleCloseMenu}>
                <Link href="/profile" className="text-dark-900">My Profile</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>
                <Link href="/dashboard" className="text-dark-900">Dashboard</Link>
              </MenuItem>
              <MenuItem onClick={() => {
                handleCloseMenu();
                disconnect();
              }}>
                Disconnect
              </MenuItem>
            </Menu>
            
            {/* Mobile menu button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              edge="start"
              className="md:hidden ml-2"
            >
              {mobileMenuOpen ? <HiX size={24} /> : <HiOutlineMenu size={24} />}
            </IconButton>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-700 border-b border-dark-600">
            <Link href="/" className="text-white hover:bg-dark-600 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link href="/analyze" className="text-white hover:bg-dark-600 block px-3 py-2 rounded-md text-base font-medium">
              Analyze
            </Link>
            <Link href="/nft" className="text-white hover:bg-dark-600 block px-3 py-2 rounded-md text-base font-medium">
              NFT Gallery
            </Link>
            <Link href="/metaverse" className="text-white hover:bg-dark-600 block px-3 py-2 rounded-md text-base font-medium">
              Metaverse
            </Link>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleConnectWallet}
              sx={{ borderRadius: '12px', textTransform: 'none', mt: 2 }}
            >
              {connected ? formatAddress(account || '') : 'Connect Wallet'}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 