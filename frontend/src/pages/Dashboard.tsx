
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserDashboard from '../components/UserDashboard';
import Chatbot from '../components/Chatbot';

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="flex-1">
        <UserDashboard userName="Demo User" />
      </main>
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default DashboardPage;
