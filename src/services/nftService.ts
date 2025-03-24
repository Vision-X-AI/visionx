import Web3 from 'web3';
import { ipfsService } from './ipfsService';

// Default NFT contract ABI (partial, just what we need)
const NFT_CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'uri',
        type: 'string',
      },
    ],
    name: 'mint',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  }
];

// NFT Metadata interface
interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
  // VisionX specific properties
  visionData?: {
    analysisId: string;
    classifications: {
      label: string;
      confidence: number;
    }[];
    features: {
      key: string;
      value: string | number;
    }[];
  };
}

/**
 * NFT Service for minting and retrieving NFTs
 */
export class NFTService {
  private web3: Web3 | null = null;
  private contractAddress: string | null = null;
  private contract: any = null;
  
  /**
   * Initialize the NFT service with Web3 and contract address
   * @param web3Instance Web3 instance
   * @param contractAddress NFT contract address
   */
  initialize(web3Instance: Web3, contractAddress: string): void {
    this.web3 = web3Instance;
    this.contractAddress = contractAddress;
    
    // Initialize contract
    this.contract = new this.web3.eth.Contract(
      NFT_CONTRACT_ABI as any,
      this.contractAddress
    );
  }
  
  /**
   * Check if service is initialized
   * @returns True if initialized
   */
  isInitialized(): boolean {
    return !!this.web3 && !!this.contractAddress && !!this.contract;
  }
  
  /**
   * Create NFT metadata
   * @param name NFT name
   * @param description NFT description
   * @param imageFile Image file
   * @param analysisData Analysis data from the AI engine
   * @returns Metadata CID
   */
  async createNFTMetadata(
    name: string,
    description: string,
    imageFile: File,
    analysisData: any
  ): Promise<string> {
    if (!this.isInitialized()) {
      throw new Error('NFT service not initialized');
    }
    
    try {
      // Upload image to IPFS
      const imageCid = await ipfsService.uploadFile(imageFile);
      const imageUrl = ipfsService.getGatewayUrl(imageCid);
      
      // Create metadata
      const metadata: NFTMetadata = {
        name,
        description,
        image: imageUrl,
        attributes: [],
        visionData: {
          analysisId: `analysis-${Date.now()}`,
          classifications: analysisData.classifications || [],
          features: analysisData.features || []
        }
      };
      
      // Add attributes from analysis data
      if (analysisData.classifications) {
        analysisData.classifications.forEach((classification: any) => {
          metadata.attributes.push({
            trait_type: 'Class',
            value: classification.label
          });
        });
      }
      
      if (analysisData.features) {
        analysisData.features.forEach((feature: any) => {
          metadata.attributes.push({
            trait_type: feature.key,
            value: feature.value
          });
        });
      }
      
      // Upload metadata to IPFS
      const metadataCid = await ipfsService.uploadMetadata(metadata);
      
      return metadataCid;
    } catch (error) {
      console.error('Error creating NFT metadata:', error);
      throw new Error('Failed to create NFT metadata');
    }
  }
  
  /**
   * Mint a new NFT
   * @param account User account address
   * @param metadataCid Metadata CID
   * @returns Transaction receipt
   */
  async mintNFT(account: string, metadataCid: string): Promise<any> {
    if (!this.isInitialized()) {
      throw new Error('NFT service not initialized');
    }
    
    try {
      const metadataUrl = ipfsService.getGatewayUrl(metadataCid);
      
      // Mint NFT
      const tx = await this.contract.methods.mint(account, metadataUrl).send({
        from: account,
        value: this.web3?.utils.toWei('0.01', 'ether') // Example minting fee
      });
      
      return tx;
    } catch (error) {
      console.error('Error minting NFT:', error);
      throw new Error('Failed to mint NFT');
    }
  }
  
  /**
   * Get NFT metadata
   * @param tokenId Token ID
   * @returns NFT metadata
   */
  async getNFTMetadata(tokenId: number): Promise<NFTMetadata> {
    if (!this.isInitialized()) {
      throw new Error('NFT service not initialized');
    }
    
    try {
      // Get token URI
      const tokenURI = await this.contract.methods.tokenURI(tokenId).call();
      
      // Fetch metadata
      const response = await fetch(tokenURI);
      const metadata = await response.json();
      
      return metadata;
    } catch (error) {
      console.error('Error getting NFT metadata:', error);
      throw new Error('Failed to get NFT metadata');
    }
  }
}

// Export a singleton instance
export const nftService = new NFTService(); 