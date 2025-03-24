import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the types for our visual analysis results
interface VisualAnalysisResult {
  id: string;
  timestamp: number;
  imageUrl: string;
  ipfsHash?: string;
  arweaveId?: string;
  tags: string[];
  objects: {
    label: string;
    confidence: number;
    bbox?: [number, number, number, number]; // [x, y, width, height]
  }[];
  dominantColors: string[];
  sentiment?: string;
  nftGenerated?: boolean;
  nftAddress?: string;
  nftTokenId?: string;
}

// Define the app state context type
interface AppStateContextType {
  // Loading states
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  
  // User preferences
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  // Visual analysis state
  analysisResults: VisualAnalysisResult[];
  currentAnalysis: VisualAnalysisResult | null;
  
  // Analysis functions
  analyzeImage: (imageFile: File) => Promise<VisualAnalysisResult>;
  saveAnalysisResult: (result: VisualAnalysisResult) => void;
  clearAnalysisResults: () => void;
  setCurrentAnalysis: (id: string | null) => void;
}

// Create the context with default values
const AppStateContext = createContext<AppStateContextType>({
  isLoading: false,
  setIsLoading: () => {},
  darkMode: true,
  toggleDarkMode: () => {},
  analysisResults: [],
  currentAnalysis: null,
  analyzeImage: async () => ({} as VisualAnalysisResult),
  saveAnalysisResult: () => {},
  clearAnalysisResults: () => {},
  setCurrentAnalysis: () => {},
});

// Provider props interface
interface AppStateProviderProps {
  children: ReactNode;
}

// Provider component
export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  
  // User preferences
  const [darkMode, setDarkMode] = useState(true);
  
  // Visual analysis state
  const [analysisResults, setAnalysisResults] = useState<VisualAnalysisResult[]>([]);
  const [currentAnalysis, setCurrentAnalysisState] = useState<VisualAnalysisResult | null>(null);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Save to localStorage in a real implementation
  };
  
  // Analyze an image (mock implementation for MVP)
  const analyzeImage = async (imageFile: File): Promise<VisualAnalysisResult> => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would:
      // 1. Upload the file to a temporary location or process it in-browser with TensorFlow.js
      // 2. Run the image through object detection, color analysis, etc.
      // 3. Return the structured results
      
      // For MVP, return mock data
      const mockResult: VisualAnalysisResult = {
        id: `analysis-${Date.now()}`,
        timestamp: Date.now(),
        imageUrl: URL.createObjectURL(imageFile),
        tags: ['demo', 'mock-data'],
        objects: [
          { label: 'Object 1', confidence: 0.92 },
          { label: 'Object 2', confidence: 0.85 },
        ],
        dominantColors: ['#3b82f6', '#8b5cf6', '#ec4899'],
        sentiment: 'positive',
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return mockResult;
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Save an analysis result
  const saveAnalysisResult = (result: VisualAnalysisResult) => {
    setAnalysisResults(prev => [result, ...prev]);
    setCurrentAnalysisState(result);
    
    // In a real implementation, also save to localStorage or IndexedDB
  };
  
  // Clear all analysis results
  const clearAnalysisResults = () => {
    setAnalysisResults([]);
    setCurrentAnalysisState(null);
    
    // Clear from localStorage/IndexedDB in a real implementation
  };
  
  // Set current analysis by ID
  const setCurrentAnalysis = (id: string | null) => {
    if (id === null) {
      setCurrentAnalysisState(null);
      return;
    }
    
    const found = analysisResults.find(result => result.id === id);
    if (found) {
      setCurrentAnalysisState(found);
    }
  };
  
  // Load saved results from localStorage on initial render
  useEffect(() => {
    // In a real implementation, load from localStorage/IndexedDB
    // const savedResults = localStorage.getItem('analysisResults');
    // if (savedResults) {
    //   setAnalysisResults(JSON.parse(savedResults));
    // }
    
    // Also load dark mode preference
    // const savedDarkMode = localStorage.getItem('darkMode');
    // if (savedDarkMode !== null) {
    //   setDarkMode(savedDarkMode === 'true');
    // }
  }, []);
  
  // Provide the context value
  const value: AppStateContextType = {
    isLoading,
    setIsLoading,
    darkMode,
    toggleDarkMode,
    analysisResults,
    currentAnalysis,
    analyzeImage,
    saveAnalysisResult,
    clearAnalysisResults,
    setCurrentAnalysis,
  };
  
  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

// Custom hook to use the app state context
export const useAppState = () => useContext(AppStateContext); 