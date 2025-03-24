import { useState, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import { useAppState } from '@/contexts/AppStateContext';

interface AnalysisResult {
  classifications: {
    label: string;
    confidence: number;
  }[];
  features: {
    key: string;
    value: string | number;
  }[];
  metadata: {
    processingTime: number;
    imageSize: {
      width: number;
      height: number;
    };
    timestamp: number;
  };
}

export const useImageAnalysis = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setIsLoading } = useAppState();

  // Load model
  const loadModel = useCallback(async () => {
    try {
      // For demo purposes, we'll use a pre-trained MobileNet model
      return await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
    } catch (err) {
      setError('Failed to load AI model. Please try again later.');
      console.error('Model loading error:', err);
      return null;
    }
  }, []);

  // Process image
  const analyzeImage = useCallback(async (imageElement: HTMLImageElement) => {
    setIsProcessing(true);
    setIsLoading(true);
    setError(null);
    
    const startTime = performance.now();
    
    try {
      // Load the model
      const model = await loadModel();
      if (!model) {
        throw new Error('Model could not be loaded');
      }
      
      // Preprocess the image
      const tensor = tf.browser.fromPixels(imageElement)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .expandDims();
      
      // Get model prediction
      const predictions = await model.predict(tensor) as tf.Tensor;
      const data = await predictions.data();
      
      // Process prediction results
      const top5 = Array.from(data)
        .map((confidence, index) => ({ confidence, index }))
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 5);
      
      // Map indices to class names (normally you'd have a proper mapping)
      const classNames = [
        'landscape', 'portrait', 'abstract', 'animal', 'building',
        'vehicle', 'food', 'person', 'plant', 'technology'
      ];
      
      // Generate additional features
      const features = [
        { key: 'dominantColors', value: 'Generated from image' },
        { key: 'complexity', value: Math.round(Math.random() * 100) },
        { key: 'uniquenessScore', value: Math.round(Math.random() * 100) },
        { key: 'nftPotential', value: Math.round(Math.random() * 100) }
      ];
      
      // Clean up tensors
      tensor.dispose();
      predictions.dispose();
      
      // Create result object
      const analysisResult: AnalysisResult = {
        classifications: top5.map(({ confidence, index }) => ({
          label: classNames[index % classNames.length],
          confidence: Number(confidence.toFixed(4))
        })),
        features,
        metadata: {
          processingTime: performance.now() - startTime,
          imageSize: {
            width: imageElement.width,
            height: imageElement.height
          },
          timestamp: Date.now()
        }
      };
      
      setResult(analysisResult);
      return analysisResult;
    } catch (err) {
      console.error('Image analysis error:', err);
      setError('Error processing image. Please try again with a different image.');
      return null;
    } finally {
      setIsProcessing(false);
      setIsLoading(false);
    }
  }, [loadModel, setIsLoading]);

  // Clear analysis results
  const clearAnalysis = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    analyzeImage,
    clearAnalysis,
    result,
    isProcessing,
    error
  };
}; 