import React from 'react';
import Link from 'next/link';
import { FaDiscord, FaTwitter, FaGithub, FaMedium } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 py-8 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg"></div>
              <span className="ml-2 text-lg font-bold text-white">VisionX</span>
            </div>
            <p className="mt-3 text-sm text-gray-400 max-w-md">
              VisionX is a decentralized platform combining AI visual analysis with Web3 technologies, 
              redefining how users connect with the blockchain world.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400">
                <FaTwitter size={20} />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400">
                <FaDiscord size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400">
                <FaGithub size={20} />
              </a>
              <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400">
                <FaMedium size={20} />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/analyze" className="text-gray-400 hover:text-primary-400 text-sm">
                  Visual Analysis
                </Link>
              </li>
              <li>
                <Link href="/nft" className="text-gray-400 hover:text-primary-400 text-sm">
                  NFT Gallery
                </Link>
              </li>
              <li>
                <Link href="/metaverse" className="text-gray-400 hover:text-primary-400 text-sm">
                  Metaverse
                </Link>
              </li>
              <li>
                <Link href="/staking" className="text-gray-400 hover:text-primary-400 text-sm">
                  Staking
                </Link>
              </li>
            </ul>
          </div>
          
          {/* More Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/docs" className="text-gray-400 hover:text-primary-400 text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/whitepaper" className="text-gray-400 hover:text-primary-400 text-sm">
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-primary-400 text-sm">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-primary-400 text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-dark-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} VisionX. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            "See the Future, Shape the Web3"
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 