
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ScanLine, CreditCard, Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const ScanPayPage: React.FC = () => {
  const navigate = useNavigate();
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [manualUpiId, setManualUpiId] = useState('');
  
  // Simulate scanner effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isCameraActive) {
        toast.info("For demo purposes, scan is simulated. In a real app, this would access your camera.");
      }
    }, 2000);
    
    return () => clearTimeout(timeout);
  }, [isCameraActive]);
  
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualUpiId.includes('@')) {
      navigate('/payments/send', { state: { upiId: manualUpiId } });
    } else {
      toast.error("Please enter a valid UPI ID");
    }
  };
  
  return (
    <div className="app-container bg-gray-100 h-screen flex flex-col">
      <div className="p-4 bg-white shadow-sm">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-3">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold">Scan & Pay</h1>
        </div>
      </div>
      
      {isCameraActive ? (
        <div className="flex-1 flex flex-col p-4">
          <div className="bg-black rounded-xl flex-1 flex flex-col items-center justify-center relative mb-4">
            {/* Simulated scanner view */}
            <div className="w-64 h-64 border-2 border-white/50 rounded-lg relative">
              <div className="absolute inset-0 border-t-2 border-app-blue animate-scan"></div>
            </div>
            <p className="text-white mt-4 text-center">
              Align QR code within the frame to scan
            </p>
            
            <button 
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
              onClick={() => setIsCameraActive(false)}
            >
              <X size={18} className="text-white" />
            </button>
          </div>
          
          <div className="flex space-x-3 mb-4">
            <Button
              variant="outline"
              className="flex-1 py-6 justify-center"
              onClick={() => setIsCameraActive(false)}
            >
              <CreditCard size={18} className="mr-2" />
              Enter UPI ID
            </Button>
            
            <Button
              variant="outline"
              className="flex-1 py-6 justify-center"
              onClick={() => {
                toast.info("Upload from gallery feature would open your device's gallery.");
              }}
            >
              <Image size={18} className="mr-2" />
              From Gallery
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-1 p-4">
          <Card className="p-4">
            <h2 className="font-medium mb-4">Enter UPI ID or Number</h2>
            
            <form onSubmit={handleManualSubmit}>
              <Input
                value={manualUpiId}
                onChange={(e) => setManualUpiId(e.target.value)}
                placeholder="E.g., 9876543210@upi or username@bank"
                className="mb-4"
              />
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={!manualUpiId}
              >
                Proceed
              </Button>
            </form>
            
            <button 
              className="mt-4 text-app-blue flex items-center justify-center w-full"
              onClick={() => setIsCameraActive(true)}
            >
              <ScanLine size={18} className="mr-2" />
              Scan QR Code Instead
            </button>
          </Card>
        </div>
      )}
      
      <style>
        {`
        @keyframes scan {
          0% { top: 0; }
          50% { top: calc(100% - 2px); }
          100% { top: 0; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        `}
      </style>
    </div>
  );
};

export default ScanPayPage;
