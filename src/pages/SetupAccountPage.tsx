
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface PersonalDetails {
  fullName: string;
  email: string;
  dob: string;
  panNumber: string;
}

const SetupAccountPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    fullName: '',
    email: '',
    dob: '',
    panNumber: ''
  });
  
  const navigate = useNavigate();
  
  const handlePersonalDetailChange = (field: keyof PersonalDetails, value: string) => {
    setPersonalDetails(prev => ({ ...prev, [field]: value }));
  };
  
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const validatePAN = (pan: string) => {
    const re = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return re.test(pan);
  };
  
  const validatePersonalDetails = () => {
    if (!personalDetails.fullName.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    
    if (!validateEmail(personalDetails.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    if (!personalDetails.dob) {
      toast.error('Please enter your date of birth');
      return false;
    }
    
    if (!validatePAN(personalDetails.panNumber)) {
      toast.error('Please enter a valid PAN number (e.g., ABCDE1234F)');
      return false;
    }
    
    return true;
  };
  
  const handleNext = () => {
    if (step === 1 && validatePersonalDetails()) {
      setStep(2);
    } else if (step === 2) {
      // In a real app, this would save bank details
      setStep(3);
    } else if (step === 3) {
      setLoading(true);
      
      // In a real app, this would call an API to complete setup
      setTimeout(() => {
        setLoading(false);
        toast.success('Account setup completed!');
        navigate('/home');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => step > 1 ? setStep(step - 1) : navigate('/verification')} 
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold ml-2">Complete Your Profile</h1>
        </div>
        
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className="flex items-center"
              style={{ width: '30%' }}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  s < step ? 'bg-app-green text-white' : 
                  s === step ? 'bg-app-blue text-white' : 
                  'bg-gray-200 text-gray-500'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div 
                  className={`flex-1 h-1 mx-2 ${
                    s < step ? 'bg-app-green' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Personal Details</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={personalDetails.fullName}
                  onChange={(e) => handlePersonalDetailChange('fullName', e.target.value)}
                  className="input-standard"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={personalDetails.email}
                  onChange={(e) => handlePersonalDetailChange('email', e.target.value)}
                  className="input-standard"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                <Input
                  type="date"
                  value={personalDetails.dob}
                  onChange={(e) => handlePersonalDetailChange('dob', e.target.value)}
                  className="input-standard"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">PAN Number</label>
                <Input
                  type="text"
                  placeholder="E.g., ABCDE1234F"
                  value={personalDetails.panNumber}
                  onChange={(e) => handlePersonalDetailChange('panNumber', e.target.value.toUpperCase())}
                  className="input-standard"
                  maxLength={10}
                />
              </div>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Bank Account Details</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Account Number</label>
                <Input
                  type="text"
                  placeholder="Enter your account number"
                  className="input-standard"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">IFSC Code</label>
                <Input
                  type="text"
                  placeholder="Enter IFSC code"
                  className="input-standard"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Bank Name</label>
                <Input
                  type="text"
                  placeholder="Enter bank name"
                  className="input-standard"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Account Holder Name</label>
                <Input
                  type="text"
                  placeholder="Enter account holder name"
                  className="input-standard"
                  defaultValue={personalDetails.fullName}
                />
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl flex items-start">
              <Info size={20} className="text-app-blue mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                Your bank details are required for investment withdrawals and refunds. These are securely stored with bank-level encryption.
              </p>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Set Up Security</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Security PIN (4 digits)</label>
                <Input
                  type="password"
                  inputMode="numeric"
                  placeholder="Enter 4-digit PIN"
                  className="input-standard"
                  maxLength={4}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Confirm Security PIN</label>
                <Input
                  type="password"
                  inputMode="numeric"
                  placeholder="Confirm 4-digit PIN"
                  className="input-standard"
                  maxLength={4}
                />
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <Input
                    type="checkbox"
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Enable biometric authentication</span>
                </label>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl flex items-start">
              <Info size={20} className="text-app-blue mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                Your security PIN will be used for authorizing transactions and accessing sensitive information. Never share your PIN with anyone.
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0">
        <Button 
          onClick={handleNext} 
          className="w-full py-6 bg-app-blue hover:bg-app-dark-blue"
          disabled={loading}
        >
          {loading ? 'Processing...' : step < 3 ? 'Continue' : 'Complete Setup'}
        </Button>
      </div>
    </div>
  );
};

export default SetupAccountPage;
