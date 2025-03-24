import React from 'react';
import { Button, Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import { HiOutlineCamera, HiOutlineCube, HiOutlineDatabase, HiOutlineChartBar } from 'react-icons/hi';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden flex items-center">
        {/* Background effects */}
        <div className="absolute inset-0 bg-dark-800 dot-pattern"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary-500/10 to-secondary-500/5"></div>
        
        <Container maxWidth="lg" sx={{ position: 'relative', py: 8 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h1" 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              >
                <span className="gradient-text">See the Future,</span>
                <br />
                <span className="text-white">Shape the Web3</span>
              </Typography>
              
              <Typography variant="body1" className="text-gray-300 mb-8 text-lg md:pr-12">
                VisionX combines AI visual analysis with Web3 technology to redefine how you interact with the blockchain world. 
                Turn your visual content into dynamic NFTs, personalized experiences, and more.
              </Typography>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/analyze">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    startIcon={<HiOutlineCamera />}
                  >
                    Start Analyzing
                  </Button>
                </Link>
                
                <Link href="/nft">
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    size="large"
                    className="bg-dark-700/50"
                  >
                    Explore NFT Gallery
                  </Button>
                </Link>
              </div>
              
              <Box sx={{ mt: 6 }}>
                <div className="flex items-center space-x-8">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-primary-500 mr-2"></div>
                    <Typography variant="body2" className="text-gray-400">
                      BSC Chain
                    </Typography>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-secondary-500 mr-2"></div>
                    <Typography variant="body2" className="text-gray-400">
                      Solana Chain
                    </Typography>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-accent-500 mr-2"></div>
                    <Typography variant="body2" className="text-gray-400">
                      Ethereum Chain
                    </Typography>
                  </div>
                </div>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary-500/10 rounded-full filter blur-3xl"></div>
                
                {/* Hero image or animation would go here */}
                <div className="relative bg-dark-700 p-2 rounded-2xl neon-border overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden bg-gradient-to-tr from-dark-700 to-dark-800">
                    <div className="w-full h-full grid-pattern flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full opacity-50 animate-pulse-slow"></div>
                          <div className="absolute inset-2 bg-dark-800 rounded-full flex items-center justify-center">
                            <div className="text-white font-bold text-xl">VisionX</div>
                          </div>
                        </div>
                        <Typography variant="h6" className="text-white">
                          AI-Powered Visual Analysis
                        </Typography>
                        <Typography variant="body2" className="text-gray-400">
                          Demo Coming Soon
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-dark-900">
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-3">
              <span className="gradient-text">Core Features</span>
            </Typography>
            <Typography variant="body1" className="text-gray-400 max-w-2xl mx-auto">
              VisionX brings together AI visual technology and blockchain innovation to create a 
              new paradigm for digital asset interaction.
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {/* Feature 1 */}
            <Grid item xs={12} sm={6} md={3}>
              <Card className="glass-card h-full">
                <CardContent>
                  <div className="mb-4 w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center">
                    <HiOutlineCamera className="text-primary-400 text-2xl" />
                  </div>
                  <Typography variant="h6" className="mb-2 text-white">
                    AI Visual Analysis
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Analyze images, videos, and 3D models with our advanced AI to extract meaningful features and insights.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Feature 2 */}
            <Grid item xs={12} sm={6} md={3}>
              <Card className="glass-card h-full">
                <CardContent>
                  <div className="mb-4 w-12 h-12 rounded-full bg-secondary-500/10 flex items-center justify-center">
                    <HiOutlineCube className="text-secondary-400 text-2xl" />
                  </div>
                  <Typography variant="h6" className="mb-2 text-white">
                    Dynamic NFT Creation
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Transform your visual content into unique, AI-enhanced NFTs with embedded metadata and visual fingerprints.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Feature 3 */}
            <Grid item xs={12} sm={6} md={3}>
              <Card className="glass-card h-full">
                <CardContent>
                  <div className="mb-4 w-12 h-12 rounded-full bg-accent-500/10 flex items-center justify-center">
                    <HiOutlineDatabase className="text-accent-400 text-2xl" />
                  </div>
                  <Typography variant="h6" className="mb-2 text-white">
                    Decentralized Storage
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Store your visual assets on IPFS and Arweave, ensuring permanence and immutability for your creations.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Feature 4 */}
            <Grid item xs={12} sm={6} md={3}>
              <Card className="glass-card h-full">
                <CardContent>
                  <div className="mb-4 w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center">
                    <HiOutlineChartBar className="text-primary-400 text-2xl" />
                  </div>
                  <Typography variant="h6" className="mb-2 text-white">
                    $VIX Token Utility
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Stake, earn, and participate in governance with our native token that powers the entire ecosystem.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 to-secondary-900/20"></div>
        <div className="absolute inset-0 dot-pattern opacity-10"></div>
        
        <Container maxWidth="md" sx={{ position: 'relative' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Ready to transform your visual content?
            </Typography>
            <Typography variant="body1" className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community of creators, developers, and blockchain enthusiasts who are 
              shaping the future of Web3 through visual innovation.
            </Typography>
            
            <Link href="/analyze">
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                sx={{ px: 4, py: 1.5, mr: 2, mb: 2 }}
              >
                Start Now
              </Button>
            </Link>
            
            <Link href="https://discord.com" target="_blank" rel="noopener noreferrer">
              <Button 
                variant="outlined" 
                className="bg-dark-800/50 mb-2"
                size="large"
                sx={{ px: 4, py: 1.5 }}
              >
                Join Discord
              </Button>
            </Link>
          </Box>
        </Container>
      </section>
    </Layout>
  );
};

export default HomePage; 