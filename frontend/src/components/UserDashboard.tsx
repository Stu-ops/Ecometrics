
import React, { useState, useEffect } from 'react';
import Earth3D from './Earth3D';
import CarbonCalculator from './CarbonCalculator';
import EmissionsChart from './EmissionsChart';
import EmissionsBySource from './EmissionsBySource';
import CarbonFacts from './CarbonFacts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe2, Calculator, BarChart3, Lightbulb, ChevronRight, Book } from 'lucide-react';
import InfoCard from './InfoCard';
import { useToast } from '@/hooks/use-toast';

interface UserDashboardProps {
  userName: string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ userName }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [carbonData, setCarbonData] = useState<any>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load carbon data from localStorage if available
    const storedData = localStorage.getItem('carbonData');
    if (storedData) {
      setCarbonData(JSON.parse(storedData));
    } else {
      // Set default carbon data if not available
      const defaultData = {
        monthlyEmissions: '145kg CO₂',
        ytdReduction: '1.2 tons CO₂',
        energyEfficiency: '87%',
        transportImpact: '52kg CO₂',
        trend: { value: 8, isPositive: false }
      };
      localStorage.setItem('carbonData', JSON.stringify(defaultData));
      setCarbonData(defaultData);
    }
  }, []);

  const handleQuickAction = (action: string) => {
    switch(action) {
      case 'calculate':
        setActiveTab('calculator');
        break;
      case 'explore':
        toast({
          title: "Global Data Explorer",
          description: "Exploring global emissions data will be available in the next update.",
        });
        break;
      case 'tips':
        setActiveTab('insights');
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-gray-100">
          Welcome back, {userName}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Track, analyze, and reduce your carbon footprint with EcometricsAI
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1 order-2 lg:order-1">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Global Emissions</CardTitle>
              <CardDescription>Interactive 3D visualization</CardDescription>
            </CardHeader>
            <CardContent className="aspect-square relative">
              <Earth3D />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2 order-1 lg:order-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">
                <Globe2 className="mr-2 h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="calculator">
                <Calculator className="mr-2 h-4 w-4" />
                Calculator
              </TabsTrigger>
              <TabsTrigger value="insights">
                <Lightbulb className="mr-2 h-4 w-4" />
                Insights
              </TabsTrigger>
              <TabsTrigger value="facts">
                <Book className="mr-2 h-4 w-4" />
                Facts
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard 
                  title="Monthly Emissions" 
                  value={carbonData?.monthlyEmissions || "145kg CO₂"} 
                  icon={Globe2} 
                  trend={{ value: carbonData?.trend?.value || 8, isPositive: carbonData?.trend?.isPositive || false }}
                  color="emerald"
                />
                <InfoCard 
                  title="Emission Target" 
                  value="120kg CO₂" 
                  icon={BarChart3}
                  trend={{ value: 25, isPositive: false }}
                  color="emerald"
                />
              </div>
              
              <EmissionsChart />
              <EmissionsBySource />
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div 
                      className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
                      onClick={() => handleQuickAction('calculate')}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-3">
                          <Calculator className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span>Calculate new emissions</span>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                    <div 
                      className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
                      onClick={() => handleQuickAction('explore')}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                          <Globe2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span>Explore global data</span>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                    <div 
                      className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
                      onClick={() => handleQuickAction('tips')}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mr-3">
                          <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        </div>
                        <span>Get personalized tips</span>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="calculator" className="mt-4">
              <CarbonCalculator />
            </TabsContent>
            
            <TabsContent value="insights" className="mt-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Personalized Insights</CardTitle>
                  <CardDescription>
                    Based on your carbon footprint data, here are some recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border border-emerald-200 dark:border-emerald-800 rounded-lg bg-emerald-50 dark:bg-emerald-950/20">
                    <h3 className="font-medium text-emerald-700 dark:text-emerald-400 mb-2">Reduce Home Energy</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      Switching to LED bulbs could reduce your lighting energy consumption by up to 80%.
                    </p>
                    <div className="text-xs font-medium text-emerald-600 dark:text-emerald-500">
                      Potential impact: Reduce emissions by 315kg CO₂ annually
                    </div>
                  </div>
                  
                  <div className="p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                    <h3 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Optimize Transportation</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      Carpooling to work just twice a week could significantly reduce your transportation footprint.
                    </p>
                    <div className="text-xs font-medium text-blue-600 dark:text-blue-500">
                      Potential impact: Reduce emissions by 520kg CO₂ annually
                    </div>
                  </div>
                  
                  <div className="p-4 border border-amber-200 dark:border-amber-800 rounded-lg bg-amber-50 dark:bg-amber-950/20">
                    <h3 className="font-medium text-amber-700 dark:text-amber-400 mb-2">Sustainable Diet</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      Reducing red meat consumption by 50% can have a major impact on your carbon footprint.
                    </p>
                    <div className="text-xs font-medium text-amber-600 dark:text-amber-500">
                      Potential impact: Reduce emissions by 680kg CO₂ annually
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Future Predictions</CardTitle>
                  <CardDescription>
                    Based on your current habits, here's how your carbon footprint will change
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <EmissionsChart />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="facts" className="mt-4 space-y-6">
              <CarbonFacts />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
