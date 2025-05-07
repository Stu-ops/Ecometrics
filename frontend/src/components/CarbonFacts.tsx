
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { RefreshCcw, ThumbsUp, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Fact {
  id: number;
  text: string;
  source: string;
  category: 'emissions' | 'renewable' | 'conservation' | 'impact';
}

const CarbonFacts: React.FC = () => {
  const { toast } = useToast();
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  
  const carbonFacts: Fact[] = [
    {
      id: 1,
      text: "The average carbon footprint for a person in the United States is 16 tons, one of the highest rates in the world.",
      source: "The Nature Conservancy",
      category: "emissions"
    },
    {
      id: 2,
      text: "Globally, the average carbon footprint is closer to 4 tons. To have the best chance of avoiding a 2℃ rise in global temperatures, the average global carbon footprint per person needs to drop to under 2 tons by 2050.",
      source: "Carbon Trust",
      category: "impact"
    },
    {
      id: 3,
      text: "Electricity production generates the second-largest share of greenhouse gas emissions (25% in the US). Approximately 63% of our electricity comes from burning fossil fuels, mostly coal and natural gas.",
      source: "EPA",
      category: "emissions"
    },
    {
      id: 4,
      text: "Food production accounts for one-quarter of the world's greenhouse gas emissions. Meat and dairy specifically accounts for around 14.5% of global greenhouse gas emissions.",
      source: "Our World in Data",
      category: "emissions"
    },
    {
      id: 5,
      text: "Reducing food waste by 50% could reduce carbon emissions by 1.5 gigatons per year — equivalent to taking more than 300 million cars off the road.",
      source: "Project Drawdown",
      category: "conservation"
    },
    {
      id: 6,
      text: "100 companies are responsible for 71% of global industrial greenhouse gas emissions since 1988.",
      source: "The Carbon Majors Report",
      category: "impact"
    },
    {
      id: 7,
      text: "Switching to renewable energy could eliminate approximately 5 billion tons of CO2 emissions annually by 2030.",
      source: "IRENA",
      category: "renewable"
    },
    {
      id: 8,
      text: "A tree can absorb around 48 pounds of CO2 per year, and about 1 ton of CO2 over a lifetime of 40 years.",
      source: "Arbor Environmental Alliance",
      category: "conservation"
    },
    {
      id: 9,
      text: "Transportation produces nearly 30% of all U.S. global warming emissions, with personal vehicles generating nearly one-fifth of those emissions.",
      source: "Union of Concerned Scientists",
      category: "emissions"
    },
    {
      id: 10,
      text: "Switching to a plant-rich diet can reduce your carbon footprint by up to 1.5 tons of CO2 equivalent per year.",
      source: "Environmental Research Letters",
      category: "conservation"
    }
  ];
  
  const getNextFact = () => {
    setCurrentFactIndex(prev => (prev + 1) % carbonFacts.length);
  };
  
  const handleLike = () => {
    toast({
      title: "Liked!",
      description: "Thanks for your feedback on this fact.",
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(carbonFacts[currentFactIndex].text)
      .then(() => {
        toast({
          title: "Copied to clipboard!",
          description: "Now you can share this fact with others.",
        });
      })
      .catch(() => {
        toast({
          title: "Unable to copy",
          description: "Please try again or copy manually.",
          variant: "destructive"
        });
      });
  };
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'emissions': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'renewable': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'conservation': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'impact': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const currentFact = carbonFacts[currentFactIndex];
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-display text-2xl">Carbon Footprint Facts</CardTitle>
        <CardDescription>Learn more about carbon emissions and their impact</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="min-h-[160px] p-5 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800">
          <p className="text-lg mb-3">{currentFact.text}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Source: {currentFact.source}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(currentFact.category)}`}>
              {currentFact.category.charAt(0).toUpperCase() + currentFact.category.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleLike}>
              <ThumbsUp className="h-4 w-4 mr-2" />
              Like
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          <Button onClick={getNextFact} className="bg-emerald-500 hover:bg-emerald-600">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Next Fact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarbonFacts;
