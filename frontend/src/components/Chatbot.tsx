import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Maximize2, Minimize2, Bot } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
  content: string;
  timestamp?: string;
  isUser?: boolean;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      content: 'Hello! I\'m your EcometricsAI assistant. How can I help you reduce your carbon footprint today?',
      timestamp: new Date().toISOString(),
      isUser: false
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  // const [carbonData, setCarbonData] = useState<any>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // const chatContainerRef = useRef<HTMLDivElement>(null);
  // const { toast } = useToast();

  // Load user carbon data if available
  // useEffect(() => {
  //   const storedData = localStorage.getItem('carbonData');
  //   if (storedData) {
  //     setCarbonData(JSON.parse(storedData));
  //   }
  // }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  // const toggleMinimize = () => {
  //   setIsMinimized(!isMinimized);
  // };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // const generateSystemMessage = () => {
  //   if (!carbonData) return "";
    
  //   return `
  //     You are an AI assistant for EcometricsAI, a carbon footprint tracking platform.
  //     The user's current carbon emissions data is as follows:
  //     - Monthly Emissions: ${carbonData.monthlyEmissions || "Not available"}
  //     - YTD Reduction: ${carbonData.ytdReduction || "Not available"}
  //     - Energy Efficiency: ${carbonData.energyEfficiency || "Not available"}
  //     - Transport Impact: ${carbonData.transportImpact || "Not available"}
      
  //     Based on this data, provide personalized recommendations to help the user reduce their carbon footprint.
  //     When answering questions about carbon emissions, sustainability, or the platform, be informative but concise.
  //     Always be supportive and encouraging of sustainable choices.
  //   `;
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { 
      content: input, 
      timestamp: new Date().toISOString(),
      isUser: true
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Use Groq API to generate response
      // const systemMessage = generateSystemMessage();
      
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }) // Send only "message"
      });

      // const messagesForAPI = [
      //   ...(systemMessage ? [{ role: "system", content: systemMessage }] : []),
      //   ...messages.filter(m => m.role !== 'system'),
      //   userMessage
      // ].map(({ role, content }) => ({ role, content }));

      const data = await response.json();
      const botResponse = { 
        content: data.response, // Extract "response" from API
        timestamp: new Date().toISOString(),
        isUser: false
      };

      setMessages(prev => [...prev, botResponse]);
      // Since we don't have a backend with Groq API integration yet, we'll simulate a response
      // In a production app, this would be a fetch call to your backend which interacts with Groq
      // simulateGroqResponse(messagesForAPI, userMessage.content);
    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to simulate Groq API response
  // In a real implementation, this would be replaced with an actual API call
  // const simulateGroqResponse = (messagesForAPI: any[], userQuery: string) => {
  //   setTimeout(() => {
  //     // Simulate different responses based on the query and available carbon data
  //     let response = '';
  //     const query = userQuery.toLowerCase();
      
  //     if (carbonData) {
  //       if (query.includes('carbon') && query.includes('footprint')) {
  //         response = `Based on your data, your monthly carbon footprint is ${carbonData.monthlyEmissions}. This is ${carbonData.trend?.isPositive ? 'higher' : 'lower'} than last month by ${carbonData.trend?.value}%.`;
  //       } else if (query.includes('reduce') && (query.includes('emissions') || query.includes('carbon'))) {
  //         response = `Looking at your data, I see that your transport impact is ${carbonData.transportImpact}. To reduce your carbon emissions, I recommend: 1) Using public transportation more frequently, 2) Consider carpooling for your commute, 3) If possible, switch to electric or hybrid vehicles in the future.`;
  //       } else if (query.includes('energy') || query.includes('electricity')) {
  //         response = `Your energy efficiency is currently at ${carbonData.energyEfficiency}. To improve this, consider: 1) Switching to LED bulbs, 2) Using smart power strips for electronics, 3) Upgrading to energy-efficient appliances when possible.`;
  //       } else {
  //         response = `Based on your carbon profile, I'd recommend focusing on reducing your transportation emissions first, as they make up a significant portion of your footprint. Would you like specific suggestions for transportation, home energy, or consumption habits?`;
  //       }
  //     } else {
  //       if (query.includes('carbon') && query.includes('footprint')) {
  //         response = 'Your carbon footprint is calculated based on your energy usage, transportation habits, diet, and consumption patterns. You can upload your data or connect via API to get personalized insights.';
  //       } else if (query.includes('reduce') && (query.includes('emissions') || query.includes('carbon'))) {
  //         response = 'To reduce your carbon emissions, consider: 1) Using public transportation, 2) Switching to renewable energy, 3) Reducing meat consumption, 4) Buying local products, and 5) Recycling and composting waste.';
  //       } else if (query.includes('upload') && query.includes('csv')) {
  //         response = 'You can upload a CSV file with your energy usage, transportation data, or other consumption data in the Dashboard. Our system will analyze it and calculate your carbon footprint.';
  //       } else if (query.includes('api')) {
  //         response = 'Our API allows you to connect your systems to EcometricsAI for real-time carbon footprint tracking. You can find this option in the Dashboard under "API Connection".';
  //       } else {
  //         response = 'Thanks for your question! As an AI assistant specialized in sustainability, I can help you understand and reduce your carbon footprint. For personalized advice, please upload your data or connect via API in the Dashboard.';
  //       }
  //     }
      
  //     setMessages(prev => [...prev, { 
  //       role: 'assistant', 
  //       content: response,
  //       timestamp: new Date().toISOString()
  //     }]);
  //     setIsLoading(false);
  //   }, 1500);
  // };

  return (
    <>
      {/* Chat Button */}
      <button 
        onClick={toggleChat} 
        className="fixed bottom-6 right-6 p-4 rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 transition-all z-50 flex items-center justify-center"
      >
        <Bot className="w-6 h-6" />
      </button>
  
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 md:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 transition-all duration-300 overflow-hidden border border-gray-300 dark:border-gray-700">
          
          {/* Chat Header */}
          <div className="bg-emerald-500 text-white flex items-center justify-between px-4 py-3">
            <span className="font-semibold">EcometricsAI Chat</span>
            <button onClick={toggleChat} className="text-white hover:text-gray-200 text-lg">
              ✖
            </button>
          </div>
  
          {/* Messages Container */}
          <div className="p-4 overflow-y-auto max-h-80 flex flex-col space-y-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`p-3 rounded-lg text-sm shadow-md max-w-xs ${
                    msg.isUser 
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white" 
                      : "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                  }`}
                >
                  {msg.content}
                  <div className="text-xs mt-1 text-right">{formatTimestamp(msg.timestamp!)}</div>
                </div>
              </div>
            ))}
            {isLoading && <div className="text-gray-400 text-center">Typing...</div>}
            <div ref={messagesEndRef}></div>
          </div>
  
          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="flex items-center p-3 border-t border-gray-300 dark:border-gray-700">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:text-white"
              placeholder="Type a message..."
            />
            <button 
              type="submit" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-r-lg transition-all"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
  

export default Chatbot;
