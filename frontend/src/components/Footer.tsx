
import React from 'react';
import { Leaf, Github, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full px-6 py-8 mt-auto border-t border-emerald-100 dark:border-emerald-900/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <Leaf className="h-6 w-6 text-emerald-500" />
            <h2 className="text-xl font-display font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
              Ecometrics<span className="text-ocean-500">AI</span>
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm">
            Helping individuals and organizations track, understand, and reduce their carbon footprint through AI-powered insights and analytics.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-500 hover:text-emerald-500 transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-emerald-500 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-emerald-500 transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase text-gray-700 dark:text-gray-300">Product</h3>
          <nav className="flex flex-col space-y-2">
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-500 transition-colors">Features</a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-500 transition-colors">Pricing</a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-500 transition-colors">API</a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-500 transition-colors">Integrations</a>
          </nav>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase text-gray-700 dark:text-gray-300">Resources</h3>
          <nav className="flex flex-col space-y-2">
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-500 transition-colors">Documentation</a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-500 transition-colors">Blog</a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-500 transition-colors">Sustainability Guide</a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-500 transition-colors">Carbon Calculator</a>
          </nav>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} EcometricsAI. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-emerald-500 transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-emerald-500 transition-colors">Terms of Service</a>
          <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-emerald-500 transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
