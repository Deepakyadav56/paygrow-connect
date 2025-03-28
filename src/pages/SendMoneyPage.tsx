
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, CopyCheck, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const SendMoneyPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'upi' | 'bank' | 'self'>('upi');
  const [amount, setAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };
  
  const validateUpiId = (id: string) => {
    // Basic UPI ID validation
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(id);
  };
  
  const validatePhoneNumber = (phone: string) => {
    return phone.length === 10 && /^\d+$/.test(phone);
  };
  
  const handleSubmit = () => {
    if (!amount || parseInt(amount) === 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (selectedTab === 'upi' && !validateUpiId(upiId)) {
      toast.error('Please enter a valid UPI ID');
      return;
    }
    
    if (selectedTab === 'bank' && !validatePhoneNumber(phoneNumber)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    
    setLoading(true);
    
    // In a real app, this would call an API to send money
    setTimeout(() => {
      setLoading(false);
      navigate('/payments/confirmation', { 
        state: { 
          success: true, 
          amount: parseInt(amount),
          recipient: selectedTab === 'upi' ? upiId : (selectedTab === 'bank' ? phoneNumber : 'Self Account'),
          transactionId: 'TXN' + Math.floor(Math.random() * 10000000),
          note
        } 
      });
    }, 1500);
  };
  
  const quickAmounts = [500, 1000, 2000, 5000];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold ml-2">Send Money</h1>
        </div>
        
        <div className="flex mb-8 border border-gray-200 rounded-xl overflow-hidden">
          <button
            className={`flex-1 py-3 text-center ${selectedTab === 'upi' ? 'bg-app-blue text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setSelectedTab('upi')}
          >
            UPI
          </button>
          <button
            className={`flex-1 py-3 text-center ${selectedTab === 'bank' ? 'bg-app-blue text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setSelectedTab('bank')}
          >
            Mobile
          </button>
          <button
            className={`flex-1 py-3 text-center ${selectedTab === 'self' ? 'bg-app-blue text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setSelectedTab('self')}
          >
            Self
          </button>
        </div>
        
        {selectedTab === 'upi' && (
          <div className="space-y-6 mb-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">UPI ID</label>
              <Input
                type="text"
                placeholder="name@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="input-standard"
              />
              <p className="text-xs text-gray-500">Enter any UPI ID or select from contacts</p>
            </div>
            
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={() => navigate('/contacts')}
            >
              <User size={18} className="mr-2" />
              Select from Contacts
            </Button>
          </div>
        )}
        
        {selectedTab === 'bank' && (
          <div className="space-y-6 mb-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Mobile Number</label>
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
                  maxLength={10}
                />
              </div>
              <p className="text-xs text-gray-500">
                We'll search PayGrow users with this mobile number
              </p>
            </div>
            
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={() => navigate('/contacts')}
            >
              <User size={18} className="mr-2" />
              Select from Contacts
            </Button>
          </div>
        )}
        
        {selectedTab === 'self' && (
          <div className="p-4 border border-gray-200 rounded-xl mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-app-light-blue flex items-center justify-center mr-3">
                  <User size={18} className="text-app-blue" />
                </div>
                <div>
                  <p className="font-medium">Your Account</p>
                  <p className="text-xs text-gray-500">HDFC Bank ••••5678</p>
                </div>
              </div>
              <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                Default
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Amount will be transferred to your linked bank account
            </p>
          </div>
        )}
        
        <div className="space-y-6 mb-8">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Amount</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">₹</span>
              </div>
              <Input
                type="text"
                placeholder="Enter amount"
                value={amount}
                onChange={handleAmountChange}
                className="input-standard pl-8 text-lg font-semibold"
              />
            </div>
          </div>
          
          <div className="flex justify-between">
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={() => setAmount(amt.toString())}
              >
                ₹{amt}
              </button>
            ))}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Add a Note (Optional)</label>
            <Input
              type="text"
              placeholder="What's this for?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="input-standard"
            />
          </div>
          
          {parseInt(amount) > 0 && (
            <div className="p-4 bg-green-50 rounded-xl flex items-start">
              <CopyCheck size={20} className="text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-green-700 font-medium">No Transaction Fee</p>
                <p className="text-xs text-green-600">
                  {selectedTab === 'self' ? 'Self-transfers' : 'UPI transactions'} are free of charge
                </p>
              </div>
            </div>
          )}
          
          {parseInt(amount) > 10000 && (
            <div className="p-4 bg-yellow-50 rounded-xl flex items-start">
              <AlertCircle size={20} className="text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-yellow-700 font-medium">Large Transaction</p>
                <p className="text-xs text-yellow-600">
                  Transactions above ₹10,000 may require additional verification
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-auto p-6 border-t border-gray-100">
        <Button 
          onClick={handleSubmit} 
          className="w-full py-6 bg-app-blue hover:bg-app-dark-blue"
          disabled={loading || !amount || parseInt(amount) === 0}
        >
          {loading ? 'Processing...' : `Pay ₹${amount || '0'}`}
        </Button>
      </div>
    </div>
  );
};

export default SendMoneyPage;
