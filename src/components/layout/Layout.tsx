import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAppState } from '@/contexts/AppStateContext';
import { Box, CircularProgress } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoading } = useAppState();

  return (
    <div className="flex flex-col min-h-screen bg-dark-800">
      <Navbar />
      
      <main className="flex-grow">
        {isLoading && (
          <div className="fixed inset-0 bg-dark-900/70 flex items-center justify-center z-50 backdrop-blur-sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircularProgress size={60} sx={{ color: 'primary.main' }} />
              <p className="mt-4 text-white font-medium">Processing your request...</p>
            </Box>
          </div>
        )}
        
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout; 