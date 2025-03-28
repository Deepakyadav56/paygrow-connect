
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const VerificationPage: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const inputRefs = Array(4).fill(0).map(() => React.createRef<HTMLInputElement>());
  
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);
  
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    
    if (value && !/^\d+$/.test(value)) {
      return;
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };
  
  const resendOtp = () => {
    setTimeLeft(30);
    toast.success('New OTP sent to your phone');
  };
  
  const verifyOtp = () => {
    const enteredOtp = otp.join('');
    
    if (enteredOtp.length !== 4) {
      toast.error('Please enter a complete 4-digit OTP');
      return;
    }
    
    setLoading(true);
    
    // In a real app, this would call a verification API
    setTimeout(() => {
      setLoading(false);
      
      // Simulate successful verification
      if (enteredOtp === '1234') {
        toast.success('Phone number verified successfully');
        navigate('/setup');
      } else {
        toast.error('Invalid OTP. For testing, use 1234');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate('/auth')} 
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold ml-2">Verify Phone Number</h1>
      </div>
      
      <div className="mb-8">
        <p className="text-gray-600">
          We've sent a verification code to your phone. Please enter it below to continue.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="flex justify-center space-x-4">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="input-standard w-14 h-14 text-center text-2xl"
              maxLength={1}
            />
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-gray-600 mb-2">Didn't receive the code?</p>
          {timeLeft > 0 ? (
            <p className="text-gray-500">Resend code in {timeLeft} seconds</p>
          ) : (
            <button 
              onClick={resendOtp} 
              className="text-app-blue font-medium"
            >
              Resend OTP
            </button>
          )}
        </div>
        
        <Button 
          onClick={verifyOtp} 
          className="w-full py-6 bg-app-blue hover:bg-app-dark-blue"
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </Button>
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-xl flex items-start">
        <Info size={20} className="text-app-blue mr-3 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-gray-600">
          For demo purposes, use the code "1234" to proceed.
        </p>
      </div>
    </div>
  );
};

export default VerificationPage;
