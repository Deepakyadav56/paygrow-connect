
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Check, Clock, FileText, AlertCircle, CreditCard, Wallet, ChevronRight, Calendar, Info, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface InvestState {
  fundId: string;
  fundName: string;
  investmentType: 'buy' | 'sell';
  investmentMode?: 'sip' | 'oneTime';
  amount?: number;
  nav: number;
  sipDate?: string;
  sipFrequency?: 'monthly' | 'quarterly';
  sipDuration?: string;
  sipStepUpPercentage?: number;
  sellType?: 'amount' | 'units' | 'all';
  units?: number;
  sellAll?: boolean;
  currentValue?: number;
  currentUnits?: number;
  exitLoad?: string;
}

const InvestConfirmPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('upi');
  
  // Get investment details from location state
  const state = location.state as InvestState;
  
  // If no state is provided, redirect to invest page
  if (!state) {
    navigate('/invest');
    return null;
  }
  
  const { 
    fundId, 
    fundName, 
    investmentType, 
    investmentMode, 
    amount, 
    nav, 
    sipDate, 
    sipFrequency, 
    sipDuration,
    sipStepUpPercentage,
    sellType,
    units,
    sellAll,
    currentValue,
    currentUnits,
    exitLoad
  } = state;
  
  // Calculate estimated units or amount
  const estimatedUnits = amount ? amount / nav : 0;
  const estimatedAmount = units ? units * nav : 0;
  
  // Calculate SIP related info
  const getSipDescription = () => {
    if (!investmentMode || investmentMode !== 'sip') return '';
    
    let desc = `₹${amount?.toLocaleString('en-IN')} ${sipFrequency === 'monthly' ? 'Monthly' : 'Quarterly'} SIP on ${sipDate}${getOrdinalSuffix(parseInt(sipDate || '1'))} of each month`;
    
    if (sipDuration && sipDuration !== 'ongoing') {
      desc += ` for ${formatDuration(sipDuration)}`;
    } else {
      desc += ' (until cancelled)';
    }
    
    return desc;
  };

  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  
  const formatDuration = (duration: string) => {
    switch(duration) {
      case '3months': return '3 months';
      case '6months': return '6 months';
      case '1year': return '1 year';
      case '2years': return '2 years';
      case '3years': return '3 years';
      case '5years': return '5 years';
      case '10years': return '10 years';
      default: return duration;
    }
  };
  
  // Payment options
  const paymentOptions = [
    { id: 'upi', name: 'UPI', icon: <Wallet size={20} />, subtitle: 'Pay using UPI ID or QR Code' },
    { id: 'netbanking', name: 'Net Banking', icon: <CreditCard size={20} />, subtitle: 'Pay using your bank account' },
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard size={20} />, subtitle: 'Pay using your card' },
  ];
  
  const handleConfirmInvestment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Simulate success
      setTimeout(() => {
        if (investmentType === 'buy') {
          toast.success(`${investmentMode === 'sip' ? 'SIP' : 'Investment'} successful!`);
        } else {
          toast.success("Redemption initiated successfully!");
        }
        navigate('/invest');
      }, 2000);
    }, 2000);
  };
  
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <Check size={32} className="text-green-500" />
          </div>
          <h1 className="text-xl font-semibold mb-2">
            {investmentType === 'buy' 
              ? (investmentMode === 'sip' ? 'SIP Started Successfully!' : 'Investment Successful!') 
              : 'Redemption Initiated!'}
          </h1>
          <p className="text-gray-600 text-center mb-6">
            {investmentType === 'buy' 
              ? `You have successfully invested ${investmentMode === 'sip' ? 'in a SIP of ' : ''}₹${amount?.toLocaleString('en-IN')} in ${fundName}`
              : `Your redemption request for ${sellAll ? 'all units' : (sellType === 'amount' ? `₹${amount?.toLocaleString('en-IN')}` : `${units} units`)} of ${fundName} has been initiated`}
          </p>
          <div className="w-full p-5 rounded-xl bg-gray-50 mb-6">
            {investmentType === 'buy' && (
              <>
                <div className="flex justify-between items-center mb-3">
                  <div className="text-gray-600">
                    {investmentMode === 'sip' ? 'SIP Amount' : 'Amount Invested'}
                  </div>
                  <div className="font-semibold">₹{amount?.toLocaleString('en-IN')}</div>
                </div>
                {investmentMode === 'sip' && (
                  <>
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-gray-600">SIP Date</div>
                      <div className="font-semibold">{sipDate}{getOrdinalSuffix(parseInt(sipDate || '1'))}</div>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-gray-600">Frequency</div>
                      <div className="font-semibold">{sipFrequency === 'monthly' ? 'Monthly' : 'Quarterly'}</div>
                    </div>
                    {sipStepUpPercentage && sipStepUpPercentage > 0 && (
                      <div className="flex justify-between items-center mb-3">
                        <div className="text-gray-600">Annual Step-up</div>
                        <div className="font-semibold">{sipStepUpPercentage}%</div>
                      </div>
                    )}
                  </>
                )}
                <div className="flex justify-between items-center mb-3">
                  <div className="text-gray-600">Estimated Units</div>
                  <div className="font-semibold">{estimatedUnits.toFixed(3)}</div>
                </div>
              </>
            )}
            
            {investmentType === 'sell' && (
              <>
                {sellType === 'amount' && (
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-gray-600">Redemption Amount</div>
                    <div className="font-semibold">₹{amount?.toLocaleString('en-IN')}</div>
                  </div>
                )}
                {sellType === 'units' && (
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-gray-600">Units Redeemed</div>
                    <div className="font-semibold">{units}</div>
                  </div>
                )}
                {sellAll && (
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-gray-600">All Units Redeemed</div>
                    <div className="font-semibold">{currentUnits}</div>
                  </div>
                )}
                <div className="flex justify-between items-center mb-3">
                  <div className="text-gray-600">Estimated Redemption Value</div>
                  <div className="font-semibold">₹{sellAll 
                    ? currentValue?.toLocaleString('en-IN') 
                    : (sellType === 'amount' 
                        ? amount?.toLocaleString('en-IN')
                        : estimatedAmount.toLocaleString('en-IN', {maximumFractionDigits: 2})
                      )
                  }</div>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <div className="text-gray-600">Expected Credit</div>
                  <div className="font-semibold">In 3-5 working days</div>
                </div>
              </>
            )}
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
          <h1 className="text-xl font-semibold mb-2">
            {investmentType === 'buy' ? 'Processing Payment' : 'Processing Redemption'}
          </h1>
          <p className="text-gray-600 text-center mb-6">
            {investmentType === 'buy' 
              ? 'Please wait while we process your investment'
              : 'Please wait while we process your redemption request'}
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
          <h1 className="text-lg font-semibold ml-2">
            {investmentType === 'buy' ? 'Confirm Investment' : 'Confirm Redemption'}
          </h1>
        </div>
      </div>
      
      <div className="flex-1 p-6 pb-24">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1">{fundName}</h2>
          <p className="text-gray-500">
            {investmentType === 'buy' 
              ? 'Review your investment details'
              : 'Review your redemption details'}
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-4 mb-6">
          <h3 className="font-medium mb-4">
            {investmentType === 'buy' ? 'Investment Details' : 'Redemption Details'}
          </h3>
          <div className="space-y-3">
            {investmentType === 'buy' && (
              <>
                <div className="flex justify-between">
                  <div className="text-gray-600">Investment Type</div>
                  <div className="font-semibold">{investmentMode === 'sip' ? 'SIP' : 'One-time Investment'}</div>
                </div>
                
                {investmentMode === 'sip' && (
                  <>
                    <div className="flex justify-between">
                      <div className="text-gray-600">SIP Details</div>
                      <div className="font-medium text-right">{getSipDescription()}</div>
                    </div>
                    
                    {sipStepUpPercentage && sipStepUpPercentage > 0 && (
                      <div className="flex justify-between">
                        <div className="text-gray-600">Annual Step-up</div>
                        <div className="font-medium">{sipStepUpPercentage}% yearly increase</div>
                      </div>
                    )}
                  </>
                )}
                
                <div className="flex justify-between">
                  <div className="text-gray-600">Amount</div>
                  <div className="font-semibold">₹{amount?.toLocaleString('en-IN')}</div>
                </div>
                
                <div className="flex justify-between">
                  <div className="text-gray-600">NAV</div>
                  <div className="font-medium">₹{nav}</div>
                </div>
                
                <div className="flex justify-between">
                  <div className="text-gray-600">Estimated Units</div>
                  <div className="font-medium">{estimatedUnits.toFixed(3)}</div>
                </div>
              </>
            )}
            
            {investmentType === 'sell' && (
              <>
                <div className="flex justify-between">
                  <div className="text-gray-600">Redemption Type</div>
                  <div className="font-semibold">
                    {sellAll ? 'All Units' : (sellType === 'amount' ? 'By Amount' : 'By Units')}
                  </div>
                </div>
                
                {sellType === 'amount' && !sellAll && (
                  <div className="flex justify-between">
                    <div className="text-gray-600">Amount</div>
                    <div className="font-semibold">₹{amount?.toLocaleString('en-IN')}</div>
                  </div>
                )}
                
                {sellType === 'units' && !sellAll && (
                  <div className="flex justify-between">
                    <div className="text-gray-600">Units</div>
                    <div className="font-semibold">{units}</div>
                  </div>
                )}
                
                {sellAll && (
                  <div className="flex justify-between">
                    <div className="text-gray-600">Total Units</div>
                    <div className="font-semibold">{currentUnits}</div>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <div className="text-gray-600">Current NAV</div>
                  <div className="font-medium">₹{nav}</div>
                </div>
                
                <div className="flex justify-between">
                  <div className="text-gray-600">Estimated Value</div>
                  <div className="font-medium">
                    ₹{sellAll 
                      ? currentValue?.toLocaleString('en-IN') 
                      : (sellType === 'amount' 
                          ? amount?.toLocaleString('en-IN')
                          : estimatedAmount.toLocaleString('en-IN', {maximumFractionDigits: 2})
                        )
                    }
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <div className="text-gray-600">Exit Load</div>
                  <div className="font-medium">{exitLoad}</div>
                </div>
                
                <div className="flex justify-between">
                  <div className="text-gray-600">Payout Account</div>
                  <div className="font-medium">ICICI Bank ****1234</div>
                </div>
                
                <div className="flex justify-between">
                  <div className="text-gray-600">Expected Payout</div>
                  <div className="font-medium">3-5 working days</div>
                </div>
              </>
            )}
          </div>
        </div>
        
        {investmentType === 'buy' && (
          <div className="mb-6">
            <h3 className="font-medium mb-4">Payment Method</h3>
            <div className="space-y-3">
              {paymentOptions.map((option) => (
                <div 
                  key={option.id}
                  className={`p-4 border rounded-xl flex items-center ${option.id === selectedPayment ? 'border-app-blue bg-app-light-blue' : 'border-gray-200'}`}
                  onClick={() => setSelectedPayment(option.id)}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${option.id === selectedPayment ? 'bg-app-blue text-white' : 'bg-gray-100'}`}>
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{option.name}</div>
                    <div className="text-xs text-gray-500">{option.subtitle}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${option.id === selectedPayment ? 'border-app-blue' : 'border-gray-300'}`}>
                    {option.id === selectedPayment && <div className="w-3 h-3 rounded-full bg-app-blue"></div>}
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
        )}
        
        <Accordion type="single" collapsible className="mb-6">
          <AccordionItem value="important-info">
            <AccordionTrigger className="text-app-blue">
              <div className="flex items-center">
                <Info size={16} className="mr-2" />
                Important Information
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 py-2">
                <p className="text-sm text-gray-700">
                  {investmentType === 'buy' ? (
                    <>
                      Mutual funds are subject to market risks. Read all scheme related documents carefully before investing.
                      <br/><br/>
                      SIPs do not assure a profit or guarantee against loss in declining markets. All investments in mutual funds are subject to market risks. Past performance is not indicative of future returns.
                    </>
                  ) : (
                    <>
                      Your redemption request will be processed at the NAV applicable as per scheme cut-off timings. The final amount may vary based on the applicable NAV and exit load.
                      <br/><br/>
                      The redemption amount will be credited to your registered bank account within 3-5 working days from the date of processing.
                    </>
                  )}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="tax-info">
            <AccordionTrigger className="text-app-blue">
              <div className="flex items-center">
                <Percent size={16} className="mr-2" />
                Tax Information
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 py-2">
                <p className="text-sm text-gray-700">
                  Long-term capital gains (held for more than 1 year) on equity mutual funds are taxed at 10% above ₹1 lakh. Short-term capital gains (held for less than 1 year) are taxed at 15%.
                  <br/><br/>
                  For debt mutual funds, capital gains are taxed as per your income tax slab. Please consult a tax advisor for your specific situation.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="flex items-center mb-6">
          <FileText size={16} className="text-gray-500 mr-2" />
          <span className="text-sm text-gray-600 underline">View Scheme Information Document</span>
        </div>
      </div>
      
      <div className="p-6 border-t border-gray-200 bg-white fixed bottom-0 w-full">
        <Button 
          onClick={handleConfirmInvestment} 
          className="w-full py-6 bg-app-blue hover:bg-app-dark-blue"
        >
          {investmentType === 'buy' 
            ? `Confirm & Pay ₹${amount?.toLocaleString('en-IN')}`
            : `Confirm Redemption${sellType === 'amount' ? ` of ₹${amount?.toLocaleString('en-IN')}` : ''}`}
        </Button>
      </div>
    </div>
  );
};

export default InvestConfirmPage;
