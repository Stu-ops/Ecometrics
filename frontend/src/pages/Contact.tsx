import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, MessageSquare, MapPin, Phone } from 'lucide-react';
import Chatbot from '@/components/Chatbot';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - in a real app this would call an API
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you soon!",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold mb-3 text-gray-900 dark:text-white">Contact Us</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have questions about reducing your carbon footprint? Our team is here to help.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-full">
                        <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">Email Us</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Our friendly team is here to help.</p>
                        <a href="mailto:info@ecometricsai.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                          info@ecometricsai.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-full">
                        <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">Office</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Come say hello at our headquarters.</p>
                        <p className="text-gray-800 dark:text-gray-200">
                          123 Green Street<br />
                          Eco City, EC 12345<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-full">
                        <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">Phone</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Mon-Fri from 8am to 5pm.</p>
                        <a href="tel:+1234567890" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                          +1 (234) 567-890
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-display">Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          placeholder="John Doe" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="john@example.com" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input 
                        id="subject" 
                        value={subject} 
                        onChange={(e) => setSubject(e.target.value)} 
                        placeholder="How can we help you?" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        placeholder="Your message..." 
                        className="min-h-[150px]" 
                        required 
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Contact;
