import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Container, Typography, Box, Grid, Paper, Chip, LinearProgress } from '@mui/material';
import { HiOutlineCloudUpload, HiOutlinePhotograph, HiOutlineColorSwatch, HiOutlineTag } from 'react-icons/hi';
import Layout from '@/components/layout/Layout';
import { useAppState } from '@/contexts/AppStateContext';
import { useWeb3 } from '@/contexts/Web3Context';
import Image from 'next/image';

const AnalyzePage = () => {
  const { analyzeImage, saveAnalysisResult, isLoading } = useAppState();
  const { connected, connect } = useWeb3();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [step, setStep] = useState<'upload' | 'analyze' | 'result'>('upload');
  
  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      
      // Create a preview URL
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
      
      // Move to analyze step
      setStep('analyze');
    }
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': []
    },
    maxFiles: 1,
    maxSize: 10485760, // 10MB
  });
  
  // Handle analyze button click
  const handleAnalyze = async () => {
    if (!file) return;
    
    try {
      const result = await analyzeImage(file);
      setAnalysisResult(result);
      saveAnalysisResult(result);
      setStep('result');
    } catch (error) {
      console.error('Error analyzing image:', error);
      // Handle error
    }
  };
  
  // Reset the form
  const handleReset = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
    setAnalysisResult(null);
    setStep('upload');
  };
  
  // Generate NFT (mock functionality for MVP)
  const handleGenerateNFT = () => {
    // In MVP, just update the state to show it was "generated"
    if (analysisResult) {
      const updatedResult = {
        ...analysisResult,
        nftGenerated: true,
        nftAddress: '0x1234...5678',
        nftTokenId: '1',
      };
      setAnalysisResult(updatedResult);
      saveAnalysisResult(updatedResult);
    }
  };
  
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">Visual Analysis</span>
          </Typography>
          <Typography variant="body1" className="text-gray-400 max-w-2xl mx-auto">
            Upload your image and let our AI analyze it. Discover objects, colors, and patterns,
            then mint your analysis as a unique NFT.
          </Typography>
        </Box>
        
        {/* Step indicator */}
        <Box sx={{ mb: 6 }}>
          <div className="flex justify-center">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'upload' ? 'bg-primary-500' : 'bg-primary-500/20'}`}>
                <HiOutlineCloudUpload className="text-white" size={20} />
              </div>
              <div className={`w-16 h-1 ${step === 'upload' ? 'bg-primary-500/50' : step === 'analyze' ? 'bg-primary-500' : 'bg-primary-500/20'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'analyze' ? 'bg-primary-500' : step === 'result' ? 'bg-primary-500' : 'bg-primary-500/20'}`}>
                <HiOutlinePhotograph className="text-white" size={20} />
              </div>
              <div className={`w-16 h-1 ${step === 'result' ? 'bg-primary-500' : 'bg-primary-500/20'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'result' ? 'bg-primary-500' : 'bg-primary-500/20'}`}>
                <HiOutlineTag className="text-white" size={20} />
              </div>
            </div>
          </div>
        </Box>
        
        <Grid container spacing={4}>
          {/* Left panel - Upload and Preview */}
          <Grid item xs={12} md={6}>
            {step === 'upload' ? (
              <Paper
                {...getRootProps()}
                className={`glass-card p-6 flex flex-col items-center justify-center h-80 border-2 border-dashed ${isDragActive ? 'border-primary-500' : 'border-dark-500'} cursor-pointer hover:border-primary-400 transition-colors`}
              >
                <input {...getInputProps()} />
                <HiOutlineCloudUpload size={48} className="text-gray-400 mb-4" />
                <Typography variant="h6" className="text-white mb-2">
                  Drag & drop your image here
                </Typography>
                <Typography variant="body2" className="text-gray-400 text-center mb-4">
                  or click to browse (JPEG, PNG, GIF up to 10MB)
                </Typography>
                <Button variant="outlined" color="primary">
                  Browse Files
                </Button>
              </Paper>
            ) : (
              <Paper className="glass-card p-4 h-full">
                <div className="relative aspect-w-1 aspect-h-1 w-full mb-4 overflow-hidden rounded-lg">
                  {preview && (
                    <Image
                      src={preview}
                      alt="Uploaded image"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-lg"
                    />
                  )}
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleReset}
                    disabled={isLoading}
                  >
                    Upload Different Image
                  </Button>
                  
                  {step === 'analyze' && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAnalyze}
                      disabled={isLoading}
                    >
                      Analyze Image
                    </Button>
                  )}
                </div>
              </Paper>
            )}
          </Grid>
          
          {/* Right panel - Analysis Results */}
          <Grid item xs={12} md={6}>
            <Paper className="glass-card p-6 h-full">
              {step === 'upload' && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <HiOutlinePhotograph size={48} className="text-gray-500 mb-4" />
                  <Typography variant="h6" className="text-gray-300 mb-2">
                    Upload an image to start
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Your AI-powered analysis will appear here
                  </Typography>
                </div>
              )}
              
              {step === 'analyze' && !isLoading && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Typography variant="h6" className="text-white mb-4">
                    Ready to analyze your image
                  </Typography>
                  <Typography variant="body2" className="text-gray-400 mb-6">
                    Click the Analyze button to process your image with our AI
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    size="large"
                    fullWidth
                  >
                    Start Analysis
                  </Button>
                </div>
              )}
              
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Typography variant="h6" className="text-white mb-4">
                    Analyzing your image...
                  </Typography>
                  <Box sx={{ width: '100%', mb: 4 }}>
                    <LinearProgress color="primary" />
                  </Box>
                  <Typography variant="body2" className="text-gray-400">
                    Our AI is detecting objects, analyzing colors, and extracting patterns.
                  </Typography>
                </div>
              )}
              
              {step === 'result' && analysisResult && (
                <div>
                  <Typography variant="h5" className="text-white mb-4">
                    Analysis Results
                  </Typography>
                  
                  {/* Detected Objects */}
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <HiOutlinePhotograph className="text-primary-400 mr-2" size={20} />
                      <Typography variant="h6" className="text-white">
                        Detected Objects
                      </Typography>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {analysisResult.objects.map((obj: any, index: number) => (
                        <Chip
                          key={index}
                          label={`${obj.label} (${Math.round(obj.confidence * 100)}%)`}
                          className="bg-dark-600 text-white"
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Dominant Colors */}
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <HiOutlineColorSwatch className="text-secondary-400 mr-2" size={20} />
                      <Typography variant="h6" className="text-white">
                        Dominant Colors
                      </Typography>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {analysisResult.dominantColors.map((color: string, index: number) => (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className="w-10 h-10 rounded-md border border-dark-500"
                            style={{ backgroundColor: color }}
                          ></div>
                          <Typography variant="caption" className="mt-1 text-gray-400">
                            {color}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <HiOutlineTag className="text-accent-400 mr-2" size={20} />
                      <Typography variant="h6" className="text-white">
                        Tags
                      </Typography>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {analysisResult.tags.map((tag: string, index: number) => (
                        <Chip
                          key={index}
                          label={tag}
                          className="bg-dark-600 text-white"
                          size="small"
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* NFT Section */}
                  <div className="mt-8">
                    <Paper className="bg-dark-700/50 p-4 rounded-xl">
                      <Typography variant="h6" className="text-white mb-2">
                        {analysisResult.nftGenerated ? 'NFT Generated!' : 'Create NFT from this analysis'}
                      </Typography>
                      
                      {!analysisResult.nftGenerated ? (
                        <>
                          <Typography variant="body2" className="text-gray-400 mb-4">
                            Transform this analysis into a unique NFT on the blockchain with embedded visual metadata.
                          </Typography>
                          
                          {!connected ? (
                            <Button
                              variant="contained"
                              color="secondary"
                              fullWidth
                              onClick={connect}
                            >
                              Connect Wallet to Mint NFT
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="secondary"
                              fullWidth
                              onClick={handleGenerateNFT}
                            >
                              Generate NFT
                            </Button>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-between mb-2">
                            <Typography variant="body2" className="text-gray-400">
                              Contract Address:
                            </Typography>
                            <Typography variant="body2" className="text-primary-400">
                              {analysisResult.nftAddress}
                            </Typography>
                          </div>
                          <div className="flex items-center justify-between">
                            <Typography variant="body2" className="text-gray-400">
                              Token ID:
                            </Typography>
                            <Typography variant="body2" className="text-primary-400">
                              {analysisResult.nftTokenId}
                            </Typography>
                          </div>
                          <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            className="mt-4"
                            href="/nft"
                          >
                            View in NFT Gallery
                          </Button>
                        </>
                      )}
                    </Paper>
                  </div>
                </div>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default AnalyzePage; 