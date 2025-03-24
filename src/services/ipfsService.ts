import { create, IPFSHTTPClient } from 'ipfs-http-client';

// IPFS configuration
// Using Infura as the IPFS provider
const IPFS_PROJECT_ID = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID || '';
const IPFS_PROJECT_SECRET = process.env.NEXT_PUBLIC_IPFS_PROJECT_SECRET || '';
const IPFS_GATEWAY = 'https://ipfs.io/ipfs/';

// Base64 encode the authorization string
const auth = 'Basic ' + Buffer.from(IPFS_PROJECT_ID + ':' + IPFS_PROJECT_SECRET).toString('base64');

/**
 * IPFS Service for uploading and retrieving files from IPFS
 */
export class IPFSService {
  private client: IPFSHTTPClient | null = null;
  
  constructor() {
    try {
      this.client = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
          authorization: auth
        }
      });
    } catch (error) {
      console.error('Error initializing IPFS client:', error);
      this.client = null;
    }
  }
  
  /**
   * Upload a file to IPFS
   * @param file File to upload
   * @returns CID of the uploaded file
   */
  async uploadFile(file: File): Promise<string> {
    if (!this.client) {
      throw new Error('IPFS client not initialized');
    }
    
    try {
      const fileBuffer = await this.fileToBuffer(file);
      const added = await this.client.add(fileBuffer, {
        progress: (prog) => console.log(`IPFS upload progress: ${prog}`)
      });
      
      return added.path;
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
      throw new Error('Failed to upload file to IPFS');
    }
  }
  
  /**
   * Upload JSON metadata to IPFS
   * @param metadata Metadata object to upload
   * @returns CID of the uploaded metadata
   */
  async uploadMetadata(metadata: object): Promise<string> {
    if (!this.client) {
      throw new Error('IPFS client not initialized');
    }
    
    try {
      const data = JSON.stringify(metadata);
      const added = await this.client.add(data);
      
      return added.path;
    } catch (error) {
      console.error('Error uploading metadata to IPFS:', error);
      throw new Error('Failed to upload metadata to IPFS');
    }
  }
  
  /**
   * Get gateway URL for a CID
   * @param cid CID of the file
   * @returns IPFS gateway URL
   */
  getGatewayUrl(cid: string): string {
    return `${IPFS_GATEWAY}${cid}`;
  }
  
  /**
   * Convert a File object to Buffer
   * @param file File to convert
   * @returns Buffer of the file
   */
  private async fileToBuffer(file: File): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (!reader.result) {
          return reject(new Error('Failed to read file'));
        }
        
        const buffer = Buffer.from(reader.result as ArrayBuffer);
        resolve(buffer);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }
}

// Export a singleton instance
export const ipfsService = new IPFSService(); 