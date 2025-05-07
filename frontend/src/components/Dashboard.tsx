
import React, { useState } from 'react';
import { Globe2, Leaf, Battery, Car, Info } from 'lucide-react';
import InfoCard from './InfoCard';
import EmissionsChart from './EmissionsChart';
import EmissionsBySource from './EmissionsBySource';
import InsightCard from './InsightCard';

const Dashboard: React.FC = () => {
  const [bookmarkedInsights, setBookmarkedInsights] = useState<Set<number>>(new Set());

  const toggleBookmark = (index: number) => {
    const newBookmarks = new Set(bookmarkedInsights);
    if (newBookmarks.has(index)) {
      newBookmarks.delete(index);
    } else {
      newBookmarks.add(index);
    }
    setBookmarkedInsights(newBookmarks);
  };

  const insights = [
    {
      title: "Reduce Home Energy",
      description: "Switching to LED bulbs could reduce your lighting energy consumption by up to 80%.",
      impact: "Reduce emissions by 315kg CO₂ annually",
    },
    {
      title: "Optimize Transportation",
      description: "Carpooling to work just twice a week could significantly reduce your transportation footprint.",
      impact: "Reduce emissions by 520kg CO₂ annually",
    },
    {
      title: "Sustainable Diet",
      description: "Reducing red meat consumption by 50% can have a major impact on your carbon footprint.",
      impact: "Reduce emissions by 680kg CO₂ annually",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8 dashboard-section" style={{ '--delay': 0 } as React.CSSProperties}>
        <h2 className="section-title">Carbon Footprint Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoCard 
            title="Monthly Emissions" 
            value="145kg CO₂" 
            icon={Globe2} 
            trend={{ value: 8, isPositive: false }}
            color="emerald"
          />
          <InfoCard 
            title="YTD Reduction" 
            value="1.2 tons CO₂" 
            icon={Leaf}
            trend={{ value: 12, isPositive: false }}
            color="emerald"
          />
          <InfoCard 
            title="Energy Efficiency" 
            value="87%" 
            icon={Battery}
            trend={{ value: 5, isPositive: false }}
            color="ocean"
          />
          <InfoCard 
            title="Transport Impact" 
            value="52kg CO₂" 
            icon={Car}
            trend={{ value: 3, isPositive: true }}
            color="amber"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="dashboard-section" style={{ '--delay': 1 } as React.CSSProperties}>
          <EmissionsChart />
        </div>
        <div className="dashboard-section" style={{ '--delay': 2 } as React.CSSProperties}>
          <EmissionsBySource />
        </div>
      </div>
      
      <div className="mb-8 dashboard-section" style={{ '--delay': 3 } as React.CSSProperties}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title mb-0">Personalized Insights</h2>
          <button className="flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
            <Info className="h-4 w-4 mr-1" />
            <span>How are insights generated?</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((insight, index) => (
            <InsightCard
              key={index}
              title={insight.title}
              description={insight.description}
              impact={insight.impact}
              isBookmarked={bookmarkedInsights.has(index)}
              onBookmark={() => toggleBookmark(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
