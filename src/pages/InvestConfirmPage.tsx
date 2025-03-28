
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Check, Clock, FileText, AlertCircle, CreditCard, Wallet, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface LocationState {
  fundId: string;
  fundName: string;
  amount: number;
  nav: number;
}

const InvestConfirmPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Get investment details from location state
  const state = location.state as LocationState;
  
  // If no state is provided, redirect to invest page
  if (!state) {
    navigate('/invest');
    return null;
  }
  
  const { fundName, amount, nav } = state;
  
  // Calculate estimated units
  const estimatedUnits = amount / nav;
  
  // Payment options
  const paymentOptions = [
    { id: 'netbanking', name: 'Net Banking', icon: <CreditCard size={20} /> },
    { id: 'upi', name: 'UPI', icon: <Wallet size={20} />, selected: true },
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard size={20} /> },
  ];
  
  const handleConfirmInvestment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Simulate success
      setTimeout(() => {
        toast.success("Investment successful!");
        navigate('/invest');
      }, 2000);
    }, 3000);
  };
  
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <Check size={32} className="text-green-500" />
          </div>
          <h1 className="text-xl font-semibold mb-2">Investment Successful!</h1>
          <p className="text-gray-600 text-center mb-6">
            You have successfully invested ₹{amount.toLocaleString('en-IN')} in {fundName}
          </p>
          <div className="w-full p-5 rounded-xl bg-gray-50 mb-6">
            <div className="flex justify-between items-center mb-3">
              <div className="text-gray-600">Amount Invested</div>
              <div className="font-semibold">₹{amount.toLocaleString('en-IN')}</div>
            </div>
            <div className="flex justify-between items-center mb-3">
              <div className="text-gray-600">Estimated Units</div>
              <div className="font-semibold">{estimatedUnits.toFixed(3)}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-600">Transaction ID</div>
              <div className="font-semibold">{Math.random().toString(36).substring(2, 12).toUpperCase()}</div>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/invest')}
            className="w-full bg-app-blue hover:bg-app-dark-blue"
          >
            Go to Portfolio
          </Button>
        </div>
      </div>
    );
  }
  
  if (isProcessing) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
            <Clock size={32} className="text-app-blue animate-pulse" />
          </div>
          <h1 className="text-xl font-semibold mb-2">Processing Payment</h1>
          <p className="text-gray-600 text-center mb-6">
            Please wait while we process your investment
          </p>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-app-blue animate-pulse-slow rounded-full w-1/2"></div>
          </div>
          <p className="text-sm text-gray-500">This may take a few moments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="p-4 flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold ml-2">Confirm Investment</h1>
        </div>
      </div>
      
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1">{fundName}</h2>
          <p className="text-gray-500">Review your investment details</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-4 mb-6">
          <h3 className="font-medium mb-4">Investment Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="text-gray-600">Amount</div>
              <div className="font-semibold">₹{amount.toLocaleString('en-IN')}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-600">NAV</div>
              <div className="font-medium">₹{nav}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-600">Estimated Units</div>
              <div className="font-medium">{estimatedUnits.toFixed(3)}</div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium mb-4">Payment Method</h3>
          <div className="space-y-3">
            {paymentOptions.map((option) => (
              <div 
                key={option.id}
                className={`p-4 border rounded-xl flex items-center ${option.selected ? 'border-app-blue bg-app-light-blue' : 'border-gray-200'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${option.selected ? 'bg-app-blue text-white' : 'bg-gray-100'}`}>
                  {option.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{option.name}</div>
                  {option.selected && <div className="text-xs text-app-blue">Default payment method</div>}
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${option.selected ? 'border-app-blue' : 'border-gray-300'}`}>
                  {option.selected && <div className="w-3 h-3 rounded-full bg-app-blue"></div>}
                </div>
              </div>
            ))}
            
            <button
              onClick={() => navigate('/payments')}
              className="p-4 border border-dashed border-gray-300 rounded-xl w-full flex items-center justify-center text-app-blue"
            >
              <ChevronRight size={16} className="mr-1" />
              Add Another Payment Method
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start">
            <AlertCircle size={20} className="text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-amber-800 mb-1">Important Information</div>
              <p className="text-sm text-amber-700">
                Mutual funds are subject to market risks. Read all scheme related documents carefully before investing.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center mb-6">
          <FileText size={16} className="text-gray-500 mr-2" />
          <span className="text-sm text-gray-600 underline">View Scheme Information Document</span>
        </div>
      </div>
      
      <div className="p-6 border-t border-gray-200 bg-white">
        <Button 
          onClick={handleConfirmInvestment} 
          className="w-full py-6 bg-app-blue hover:bg-app-dark-blue"
        >
          Confirm & Pay ₹{amount.toLocaleString('en-IN')}
        </Button>
      </div>
    </div>
  );
};

export default InvestConfirmPage;
