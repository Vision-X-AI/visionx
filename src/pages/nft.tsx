import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button, Tabs, Tab, Chip } from '@mui/material';
import { HiOutlineFilter, HiOutlineChip, HiOutlineLightningBolt } from 'react-icons/hi';
import Layout from '@/components/layout/Layout';
import { useAppState } from '@/contexts/AppStateContext';
import { useWeb3 } from '@/contexts/Web3Context';
import Image from 'next/image';
import Link from 'next/link';

// Mock NFT data
const mockNfts = [
  {
    id: '1',
    title: 'Urban Landscape',
    description: 'AI-analyzed cityscape with prominent architectural features and vibrant urban elements.',
    imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390',
    price: 0.05,
    creator: '0x1234...5678',
    tokenId: '1',
    contractAddress: '0xabc...def',
    tags: ['cityscape', 'architecture', 'night'],
    dominantColors: ['#1e293b', '#3b82f6', '#f97316'],
    features: ['Building Recognition', 'Light Pattern Analysis'],
    chain: 'Ethereum',
  },
  {
    id: '2',
    title: 'Abstract Patterns',
    description: 'Visual analysis of abstract patterns with unique geometric shapes and color harmony.',
    imageUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b',
    price: 0.03,
    creator: '0x1234...5678',
    tokenId: '2',
    contractAddress: '0xabc...def',
    tags: ['abstract', 'geometric', 'colorful'],
    dominantColors: ['#4338ca', '#8b5cf6', '#ec4899'],
    features: ['Shape Recognition', 'Color Analysis'],
    chain: 'BSC',
  },
  {
    id: '3',
    title: 'Natural Beauty',
    description: 'Complex natural scene with diverse flora identification and terrain analysis.',
    imageUrl: 'https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d',
    price: 0.08,
    creator: '0x5678...9012',
    tokenId: '3',
    contractAddress: '0xabc...def',
    tags: ['nature', 'landscape', 'mountains'],
    dominantColors: ['#166534', '#15803d', '#0ea5e9'],
    features: ['Vegetation Analysis', 'Terrain Recognition'],
    chain: 'Solana',
  },
];

const NFTGalleryPage = () => {
  const { connected, connect } = useWeb3();
  const { analysisResults } = useAppState();
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedNft, setSelectedNft] = useState<any>(null);
  
  // Combine mock NFTs with any NFTs generated from analyzed images
  const nfts = [...mockNfts, ...analysisResults.filter(result => result.nftGenerated).map(result => ({
    id: result.id,
    title: 'My Generated NFT',
    description: 'NFT generated from my analyzed image.',
    imageUrl: result.imageUrl,
    price: 0.01,
    creator: '0x1234...5678',
    tokenId: result.nftTokenId || '1',
    contractAddress: result.nftAddress || '0xabc...def',
    tags: result.tags,
    dominantColors: result.dominantColors,
    features: result.objects.map((obj: any) => obj.label),
    chain: 'BSC',
  }))];
  
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };
  
  const handleNftClick = (nft: any) => {
    setSelectedNft(nft);
  };
  
  const handleCloseDetails = () => {
    setSelectedNft(null);
  };
  
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">NFT Gallery</span>
          </Typography>
          <Typography variant="body1" className="text-gray-400 max-w-2xl">
            Explore and collect unique NFTs generated from AI-analyzed visual content.
            Each NFT contains embedded visual metadata and analysis results.
          </Typography>
        </Box>
        
        {/* Filters and Tabs */}
        <Box sx={{ mb: 4 }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <Tabs 
              value={currentTab} 
              onChange={handleTabChange}
              className="bg-dark-700 rounded-lg"
              textColor="inherit"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: 'primary.main',
                }
              }}
            >
              <Tab label="All NFTs" />
              <Tab label="My Collection" />
              <Tab label="Generated" />
            </Tabs>
            
            <div className="flex gap-2">
              <Button 
                variant="outlined" 
                startIcon={<HiOutlineFilter />} 
                className="bg-dark-700/50"
                size="small"
              >
                Filter
              </Button>
              
              <Button 
                variant="outlined" 
                startIcon={<HiOutlineChip />} 
                className="bg-dark-700/50"
                size="small"
              >
                Sort By
              </Button>
              
              {!connected && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={connect}
                  size="small"
                >
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </Box>
        
        {/* NFT Grid */}
        {!selectedNft ? (
          <Grid container spacing={4}>
            {nfts.map((nft) => (
              <Grid item xs={12} sm={6} md={4} key={nft.id}>
                <Card 
                  className="glass-card h-full transition-all hover:scale-[1.02] cursor-pointer"
                  onClick={() => handleNftClick(nft)}
                >
                  <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-xl">
                    <Image 
                      src={nft.imageUrl} 
                      alt={nft.title}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Chip
                        label={nft.chain}
                        size="small"
                        className="bg-dark-800/70 text-white backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  
                  <CardContent>
                    <div className="flex justify-between items-start mb-2">
                      <Typography variant="h6" className="text-white">
                        {nft.title}
                      </Typography>
                      <Typography variant="body2" className="text-primary-400 font-medium">
                        {nft.price} ETH
                      </Typography>
                    </div>
                    
                    <Typography variant="body2" className="text-gray-400 mb-3 line-clamp-2">
                      {nft.description}
                    </Typography>
                    
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {nft.tags.slice(0, 3).map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          className="bg-dark-600 text-white text-xs"
                        />
                      ))}
                      {nft.tags.length > 3 && (
                        <Chip
                          label={`+${nft.tags.length - 3}`}
                          size="small"
                          className="bg-dark-600 text-white text-xs"
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          /* NFT Details */
          <div className="glass-card p-6">
            <Button
              variant="outlined"
              color="primary"
              onClick={handleCloseDetails}
              className="mb-6"
              size="small"
            >
              Back to Gallery
            </Button>
            
            <Grid container spacing={6}>
              <Grid item xs={12} md={5}>
                <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl neon-border">
                  <Image 
                    src={selectedNft.imageUrl} 
                    alt={selectedNft.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                
                <div className="flex gap-2 mt-4">
                  {selectedNft.dominantColors.map((color: string, index: number) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="w-8 h-8 rounded-md border border-dark-500"
                        style={{ backgroundColor: color }}
                      ></div>
                    </div>
                  ))}
                </div>
              </Grid>
              
              <Grid item xs={12} md={7}>
                <div className="flex justify-between items-start mb-1">
                  <Typography variant="h4" className="text-white font-bold">
                    {selectedNft.title}
                  </Typography>
                  <Chip
                    label={selectedNft.chain}
                    className="bg-primary-900 text-primary-300"
                  />
                </div>
                
                <Typography variant="body2" className="text-gray-400 mb-6">
                  Created by {selectedNft.creator}
                </Typography>
                
                <Typography variant="body1" className="text-gray-300 mb-6">
                  {selectedNft.description}
                </Typography>
                
                <div className="mb-6">
                  <Typography variant="subtitle1" className="text-white mb-2">
                    AI-Detected Features
                  </Typography>
                  <div className="flex gap-2 flex-wrap">
                    {selectedNft.features.map((feature: string, index: number) => (
                      <Chip
                        key={index}
                        label={feature}
                        className="bg-dark-600 text-white"
                        icon={<HiOutlineLightningBolt className="text-primary-400" />}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <Typography variant="subtitle1" className="text-white mb-2">
                    Tags
                  </Typography>
                  <div className="flex gap-2 flex-wrap">
                    {selectedNft.tags.map((tag: string, index: number) => (
                      <Chip
                        key={index}
                        label={tag}
                        className="bg-dark-600 text-white"
                      />
                    ))}
                  </div>
                </div>
                
                <div className="card p-4 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <Typography variant="body2" className="text-gray-400">
                        Current Price
                      </Typography>
                      <Typography variant="h5" className="text-white font-bold">
                        {selectedNft.price} ETH
                      </Typography>
                      <Typography variant="body2" className="text-gray-400">
                        ≈ ${(selectedNft.price * 3000).toFixed(2)}
                      </Typography>
                    </div>
                    
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={!connected}
                    >
                      {connected ? 'Buy Now' : 'Connect Wallet to Buy'}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Typography variant="body2" className="text-gray-400">
                        Contract Address
                      </Typography>
                      <Typography variant="body2" className="text-primary-400 truncate">
                        {selectedNft.contractAddress}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" className="text-gray-400">
                        Token ID
                      </Typography>
                      <Typography variant="body2" className="text-primary-400">
                        {selectedNft.tokenId}
                      </Typography>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button
                    variant="outlined"
                    className="bg-dark-700/50"
                    fullWidth
                  >
                    Place Bid
                  </Button>
                  
                  <Link href="/analyze">
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth
                    >
                      Create Similar NFT
                    </Button>
                  </Link>
                </div>
              </Grid>
            </Grid>
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default NFTGalleryPage; 