import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Leaf, Shield, Users } from 'lucide-react';

export default function AuthPage() {
  const { signUp, signIn } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await signUp(email, password);
    
    if (error) {
      toast({
        title: 'Registration Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Registration Successful!',
        description: 'Please check your email to confirm your account.',
      });
    }
    
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await signIn(email, password);
    
    if (error) {
      toast({
        title: 'Login Error',
        description: error.message,
        variant: 'destructive',
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-card mb-4 shadow-medium">
            <Leaf className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">Mangrove Monitor</h1>
          <p className="text-primary-foreground/80">Protecting our coastal ecosystems together</p>
        </div>

        <Card className="shadow-strong border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome</CardTitle>
            <CardDescription className="text-center">
              Join the community protecting mangrove forests
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="register" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="register">Register</TabsTrigger>
                <TabsTrigger value="login">Login</TabsTrigger>
              </TabsList>
              
              <TabsContent value="register">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="transition-all duration-300 focus:shadow-soft"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      placeholder="Create a secure password"
                      required
                      minLength={6}
                      className="transition-all duration-300 focus:shadow-soft"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="login">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="transition-all duration-300 focus:shadow-soft"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      className="transition-all duration-300 focus:shadow-soft"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Features */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center mb-4">Join thousands protecting mangroves</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center space-y-1">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">Secure</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">Community</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <Leaf className="h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">Impact</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}