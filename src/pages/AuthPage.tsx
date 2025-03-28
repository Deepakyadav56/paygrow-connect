
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const validatePhone = (phone: string) => {
    return phone.length === 10 && /^\d+$/.test(phone);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhone(phoneNumber)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    
    if (!isLogin && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);
    
    // In a real app, this would call an authentication API
    setTimeout(() => {
      setLoading(false);
      if (isLogin) {
        // Simulate successful login
        localStorage.setItem('user', JSON.stringify({ phone: phoneNumber }));
        toast.success('Login successful');
        navigate('/verification');
      } else {
        // Simulate successful registration
        localStorage.setItem('user', JSON.stringify({ phone: phoneNumber, name }));
        toast.success('Account created successfully');
        navigate('/verification');
      }
    }, 1500);
  };
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate('/')} 
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold ml-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isLogin}
              className="input-standard"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Phone Number</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">+91</span>
            </div>
            <Input
              type="tel"
              placeholder="10-digit mobile number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="input-standard pl-12"
              required
              maxLength={10}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-standard pr-10"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        {!isLogin && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-standard"
              required={!isLogin}
            />
          </div>
        )}
        
        {isLogin && (
          <div className="text-right">
            <button 
              type="button" 
              className="text-app-blue text-sm font-medium"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </button>
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full py-6 bg-app-blue hover:bg-app-dark-blue"
          disabled={loading}
        >
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
        </Button>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button 
            type="button"
            className="ml-2 text-app-blue font-medium"
            onClick={toggleAuthMode}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-xl flex items-start">
        <Info size={20} className="text-app-blue mr-3 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-gray-600">
          Your data is securely protected with end-to-end encryption. We never share your information with third parties without your consent.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
