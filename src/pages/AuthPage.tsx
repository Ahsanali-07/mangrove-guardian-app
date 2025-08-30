import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Leaf, Phone, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import mangroveHero from '@/assets/mangrove-hero.jpg';

export default function AuthPage() {
  const { signUp, signIn, verifyOtp, resendOtp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  // Form states
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: ''
  });

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [otpCode, setOtpCode] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signUp(
      registerForm.email,
      registerForm.password,
      registerForm.fullName,
      registerForm.mobileNumber
    );

    if (!error) {
      setPendingEmail(registerForm.email);
      setShowOtpModal(true);
    }

    setIsLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await signIn(loginForm.email, loginForm.password);
    setIsLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (otpCode.length !== 6) return;
    
    setIsLoading(true);
    const { error } = await verifyOtp(pendingEmail, otpCode);
    
    if (!error) {
      setShowOtpModal(false);
      setOtpCode('');
    }
    
    setIsLoading(false);
  };

  const handleResendOtp = async () => {
    await resendOtp(pendingEmail);
  };

  // OTP Modal
  if (showOtpModal) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-mangrove-green via-ocean-blue to-earth-brown">
        <Card className="w-full max-w-md shadow-strong">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <CardTitle>Verify Your Mobile Number</CardTitle>
            <CardDescription>
              We've sent a 6-digit code to {pendingEmail}. Please enter it below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otpCode}
                onChange={setOtpCode}
                onComplete={handleVerifyOtp}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={handleVerifyOtp} 
                className="w-full" 
                variant="nature"
                disabled={isLoading || otpCode.length !== 6}
              >
                {isLoading ? 'Verifying...' : 'Verify & Continue'}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-sm text-primary hover:underline"
                >
                  Resend Code
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url(${mangroveHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Card className="w-full max-w-md shadow-strong bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-soft">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Join the Watch</CardTitle>
          <CardDescription>
            Protect our mangroves together
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="register" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="register">Register</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>

            {/* Register Form */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={registerForm.fullName}
                      onChange={(e) => setRegisterForm({...registerForm, fullName: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={registerForm.mobileNumber}
                      onChange={(e) => setRegisterForm({...registerForm, mobileNumber: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  variant="nature"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>

            {/* Login Form */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loginEmail">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="loginEmail"
                      type="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loginPassword">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="loginPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <button type="button" className="text-sm text-primary hover:underline">
                    Forgot Password?
                  </button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  variant="ocean"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Log In'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}