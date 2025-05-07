
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Earth3D from '../components/Earth3D';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import AuthModal from '../components/AuthModal';
import UserDashboard from '../components/UserDashboard';
import CarbonFacts from '../components/CarbonFacts';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Leaf, Upload, MessageCircle, LineChart, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    // Simulate loading for smooth animations
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    // Check if user is already logged in
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsedUser = JSON.parse(userInfo);
      setIsAuthenticated(true);
      setUserName(parsedUser.name || 'User');
    }
    
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setAuthModalOpen(false);
    setIsAuthenticated(true);
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUserName(JSON.parse(userInfo).name || 'User');
    }
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 relative animate-pulse-subtle">
            <div className="absolute inset-0 rounded-full eco-gradient animate-spin-slow"></div>
            <div className="absolute inset-2 bg-white dark:bg-gray-950 rounded-full"></div>
            <div className="absolute inset-3 rounded-full bg-emerald-500 opacity-70 animate-pulse"></div>
          </div>
          <p className="mt-4 text-emerald-600 dark:text-emerald-400 font-medium animate-pulse">
            Loading EcometricsAI...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="flex-1">
        {isAuthenticated ? (
          <UserDashboard userName={userName} />
        ) : (
          <>
            <section className="relative h-[500px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-ocean-500/20 z-0"></div>
              <div className="absolute inset-0 z-10">
                <Earth3D />
              </div>
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full">
                  <div className="max-w-lg backdrop-blur-sm bg-white/30 dark:bg-black/30 rounded-2xl p-8 border border-white/20 shadow-xl animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
                      Track Your Carbon Footprint
                    </h1>
                    <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
                      AI-powered insights to help you understand and reduce your environmental impact.
                    </p>
                    <div className="flex space-x-4">
                      <Button 
                        onClick={handleGetStarted}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
                      >
                        Get Started
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl border border-gray-200"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section id="features" className="py-20 bg-white dark:bg-gray-900">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900 dark:text-white">
                    Platform Features
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Discover how EcometricsAI helps you track, understand, and reduce your carbon footprint
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-3">
                        <Upload className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <CardTitle className="text-xl font-display">Data Import</CardTitle>
                      <CardDescription>
                        Upload your energy, transportation, and consumption data
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">
                        Easily upload CSV files containing your electricity usage, transportation data, or connect via our API for real-time tracking.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" onClick={handleGetStarted} className="text-emerald-600 dark:text-emerald-400 p-0">
                        Try it now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                        <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle className="text-xl font-display">Analytics Dashboard</CardTitle>
                      <CardDescription>
                        Visualize your carbon footprint with detailed analytics
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">
                        See your carbon emissions breakdown by source, track your progress over time, and identify areas for improvement.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" onClick={handleGetStarted} className="text-emerald-600 dark:text-emerald-400 p-0">
                        Try it now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-3">
                        <MessageCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <CardTitle className="text-xl font-display">AI Assistant</CardTitle>
                      <CardDescription>
                        Get personalized insights and recommendations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">
                        Our AI-powered chatbot provides customized tips to help you reduce your carbon footprint based on your specific data.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" onClick={handleGetStarted} className="text-emerald-600 dark:text-emerald-400 p-0">
                        Try it now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3">
                        <LineChart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <CardTitle className="text-xl font-display">Predictive Analysis</CardTitle>
                      <CardDescription>
                        Forecast your future carbon emissions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">
                        Our machine learning algorithms predict your future emissions based on historical data and help you set realistic reduction goals.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" onClick={handleGetStarted} className="text-emerald-600 dark:text-emerald-400 p-0">
                        Try it now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
                        <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <CardTitle className="text-xl font-display">Reduction Strategies</CardTitle>
                      <CardDescription>
                        Actionable steps to lower your impact
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">
                        Receive targeted recommendations for reducing your carbon footprint, prioritized by potential impact and ease of implementation.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" onClick={handleGetStarted} className="text-emerald-600 dark:text-emerald-400 p-0">
                        Try it now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                        <Globe className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      </div>
                      <CardTitle className="text-xl font-display">Global Impact</CardTitle>
                      <CardDescription>
                        See your place in the global emissions picture
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">
                        Compare your carbon footprint to regional and global averages, and visualize the collective impact of emission reductions.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" onClick={handleGetStarted} className="text-emerald-600 dark:text-emerald-400 p-0">
                        Try it now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </section>
            
            <section id="about" className="py-20 bg-gray-50 dark:bg-gray-950">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900 dark:text-white">
                    About EcometricsAI
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Our mission is to empower individuals and organizations to understand and reduce their environmental impact
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <p>
                        EcometricsAI was founded with a simple but powerful vision: to make carbon footprint tracking accessible, 
                        understandable, and actionable for everyone. We believe that by providing people with clear insights about 
                        their environmental impact, we can collectively work towards a more sustainable future.
                      </p>
                      <p>
                        Our platform combines cutting-edge AI technology with environmental science to deliver personalized 
                        carbon footprint analytics. Whether you're an individual looking to reduce your personal impact or 
                        an organization aiming to meet sustainability goals, EcometricsAI provides the tools you need.
                      </p>
                      <p>
                        What sets us apart is our focus on actionable insights. We don't just tell you about your carbon 
                        footprint – we help you understand what it means and what you can do about it. Our AI assistant 
                        provides tailored recommendations based on your specific data and circumstances.
                      </p>
                      <p>
                        Join us in our mission to create a more sustainable world, one carbon footprint at a time.
                      </p>
                    </div>
                    
                    <div className="mt-8">
                      <Button 
                        onClick={handleGetStarted} 
                        className="bg-emerald-500 hover:bg-emerald-600 text-white"
                      >
                        Join Our Community
                      </Button>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-1">
                    <CarbonFacts />
                  </div>
                </div>
              </div>
            </section>
            
            <Dashboard />
          </>
        )}
      </main>
      
      <Footer />
      
      {/* Chatbot component */}
      <Chatbot />
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        onSuccess={handleAuthSuccess} 
      />
    </div>
  );
};

export default Index;
