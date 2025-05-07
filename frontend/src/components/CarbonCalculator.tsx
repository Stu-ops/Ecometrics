import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from './ui/progress';
import { AlertCircle, FileUp, Link, BarChart3 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const CarbonCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [file, setFile] = useState<File | null>(null);
  const [apiUrl, setApiUrl] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [prediction, setPrediction] = useState<{ month: string; value: number }[] | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleCalculate = async () => {
    if (!file) return;

    setIsCalculating(true);

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = async () => {
        try {
            const text = typeof reader.result === "string" ? reader.result : new TextDecoder().decode(reader.result);
            const rows = text.split(/\r?\n/).map(row => row.trim()).filter(row => row.length > 0);

            if (rows.length <= 1) {
                alert("CSV file is empty or not formatted correctly.");
                setIsCalculating(false);
                return;
            }

            // Extract first row and ensure all values are strings
            const processedData = rows[1].split(",").map(val => val.trim());

            // Ensure numerical values are strings (FastAPI expects strings)
            const formattedData = { features: processedData.map(val => String(val)) };

            console.log("Sending Data:", JSON.stringify(formattedData)); // Debugging

            const response = await fetch("http://127.0.0.1:8000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            const resultData = await response.json();
            setResult(resultData.prediction[0]); // Assuming prediction is an array
            setIsCalculating(false);
        } catch (error) {
            console.error("Prediction error:", error);
            setIsCalculating(false);
        }
    };
};

  
  
  
  
  const resetCalculator = () => {
    setFile(null);
    setApiUrl('');
    setResult(null);
    setPrediction(null);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-display">Carbon Footprint Calculator</CardTitle>
        <CardDescription>Upload your data or connect via API to calculate your carbon footprint</CardDescription>
      </CardHeader>
      
      <CardContent>
        {result === null ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">
                <FileUp className="mr-2 h-4 w-4" />
                Upload CSV
              </TabsTrigger>
              <TabsTrigger value="api">
                <Link className="mr-2 h-4 w-4" />
                API Connection
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4 mt-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="csv">Upload your consumption data</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="csv" 
                    type="file" 
                    accept=".csv" 
                    onChange={handleFileChange}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Upload a CSV file with your electricity usage, transportation data, or waste data
                </p>
              </div>
              
              {file && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>File Selected</AlertTitle>
                  <AlertDescription>
                    {file.name} ({Math.round(file.size / 1024)} KB)
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
            
            <TabsContent value="api" className="space-y-4 mt-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="api-url">API Endpoint URL</Label>
                <Input 
                  id="api-url" 
                  placeholder="https://your-api-endpoint.com/data" 
                  value={apiUrl} 
                  onChange={(e) => setApiUrl(e.target.value)}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Connect to your system's API to fetch real-time consumption data
                </p>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium">Your Carbon Footprint</h3>
              <div className="mt-2 text-4xl font-bold text-emerald-600 dark:text-emerald-500">
                {result.toFixed(1)} <span className="text-xl">kg CO₂e</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Based on your {activeTab === 'upload' ? 'uploaded data' : 'API data'}
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Emission Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Electricity</span>
                  <span className="font-medium">42%</span>
                </div>
                <Progress value={42} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Transportation</span>
                  <span className="font-medium">35%</span>
                </div>
                <Progress value={35} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Waste</span>
                  <span className="font-medium">15%</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Other</span>
                  <span className="font-medium">8%</span>
                </div>
                <Progress value={8} className="h-2" />
              </div>
            </div>
            
            {prediction && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Predicted Future Emissions</h4>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="grid grid-cols-6 gap-2 h-20">
                  {prediction.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="flex-grow flex items-end">
                        <div 
                          className="w-8 bg-emerald-500/80 rounded-t"
                          style={{ height: `${(item.value / 160) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs mt-1">{item.month}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Downward trend indicates projected emission reduction based on current patterns
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {result === null ? (
          <>
            <Button variant="outline" onClick={resetCalculator}>Reset</Button>
            <Button onClick={handleCalculate} disabled={!file}>Calculate</Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={resetCalculator}>Start Over</Button>
            <Button>Download Report</Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default CarbonCalculator;
