
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Leaf } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login - in a real app this would call an API
    setTimeout(() => {
      // Store user info in localStorage
      const userInfo = {
        name: 'Demo User',
        email: email,
        id: '12345'
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      
      // Set default carbon data for demo purposes
      const carbonData = {
        monthlyEmissions: '145kg CO₂',
        ytdReduction: '1.2 tons CO₂',
        energyEfficiency: '87%',
        transportImpact: '52kg CO₂',
        trend: { value: 8, isPositive: false }
      };
      localStorage.setItem('carbonData', JSON.stringify(carbonData));
      
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: "Welcome back to EcometricsAI!",
      });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Leaf className="h-12 w-12 text-emerald-500" />
            </div>
            <CardTitle className="text-2xl font-display text-center">Login to EcometricsAI</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-400">
                      Forgot Password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-400 font-medium">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
