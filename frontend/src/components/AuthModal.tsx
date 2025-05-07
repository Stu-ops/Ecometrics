
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  
  const handleLoginSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Login values:', values);
      
      // Store user info in localStorage
      const userInfo = {
        name: 'Demo User',
        email: values.email,
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
        title: "Success!",
        description: "You've been logged in.",
      });
      onSuccess();
      navigate('/dashboard');
    }, 1500);
  };
  
  const handleSignupSubmit = async (values: SignupFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Signup values:', values);
      
      // Store user info in localStorage
      const userInfo = {
        name: values.name,
        email: values.email,
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
        title: "Account created!",
        description: "Welcome to EcometricsAI.",
      });
      onSuccess();
      navigate('/dashboard');
    }, 1500);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Welcome to EcometricsAI</DialogTitle>
          <DialogDescription>
            Join us to track and reduce your carbon footprint
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-4 space-y-4">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="signup" className="mt-4 space-y-4">
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(handleSignupSubmit)} className="space-y-4">
                <FormField
                  control={signupForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Create a password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={signupForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirm your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
