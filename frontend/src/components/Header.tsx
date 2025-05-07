
import React, { useState, useEffect } from 'react';
import { Leaf, Moon, Sun } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [mounted, setMounted] = useState(false);

  // Check if user is logged in from localStorage
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsedUser = JSON.parse(userInfo);
      setIsLoggedIn(true);
      setUserName(parsedUser.name || 'User');
    }
    setMounted(true);
  }, []);

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full px-6 py-4 glass-card border-b border-emerald-100 dark:border-emerald-900/20 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-emerald-500" />
          <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
            Ecometrics<span className="text-ocean-500">AI</span>
          </h1>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/dashboard" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
            Dashboard
          </Link>
          <button 
            onClick={() => scrollToSection('features')} 
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
          >
            About
          </button>
          <Link to="/contact" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          {mounted && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          )}
          
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Welcome, {userName}!
              </span>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="text-sm font-medium"
              >
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                Login
              </Link>
              <Button 
                onClick={handleGetStarted} 
                className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
