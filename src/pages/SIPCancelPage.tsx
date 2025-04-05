
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

interface SIP {
  id: string;
  fundId: string;
  fundName: string;
  logo: string;
  amount: number;
  frequency: string;
  startDate: string;
  nextDate: string;
  totalInvested: number;
  currentValue: number;
  returns: {
    value: number;
    percentage: number;
  }
}

// Mock SIP data - in a real app, this would come from an API
const getSIPDetails = (sipId: string): SIP => {
  return {
    id: sipId,
    fundId: sipId === 'sip1' ? 'parag-parikh' : 'hdfc-flexi',
    fundName: sipId === 'sip1' ? 'Parag Parikh Flexi Cap Fund' : 'HDFC Flexi Cap Fund',
    logo: sipId === 'sip1' 
      ? 'https://www.ppfas.com/images/new-logo.png' 
      : 'https://www.hdfcfund.com/content/dam/abc-of-money/logo/hdfc-mutual-fund-logo.png',
    amount: sipId === 'sip1' ? 5000 : 2500,
    frequency: 'Monthly',
    startDate: sipId === 'sip1' ? '15 Jan 2023' : '20 Feb 2023',
    nextDate: sipId === 'sip1' ? '15 Jun 2023' : '20 Jun 2023',
    totalInvested: sipId === 'sip1' ? 60000 : 30000,
    currentValue: sipId === 'sip1' ? 72500 : 34800,
    returns: {
      value: sipId === 'sip1' ? 12500 : 4800,
      percentage: sipId === 'sip1' ? 20.83 : 16.0,
    }
  };
};

const SIPCancelPage: React.FC = () => {
  const { sipId } = useParams<{ sipId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const sip = getSIPDetails(sipId || 'sip1');
  
  const [cancelReason, setCancelReason] = useState<string>('financial_needs');
  const [otherReason, setOtherReason] = useState<string>('');
  
  const handleCancel = () => {
    toast({
      title: "SIP Cancelled Successfully",
      description: `Your SIP for ${sip.fundName} has been cancelled. No further installments will be deducted.`,
      variant: "default",
    });
    
    // Navigate back to SIP management
    navigate('/invest/sip/management');
  };
  
  return (
    <div className="bg-app-teal-50 min-h-screen pb-20">
      <Header title="Cancel SIP" showBack />
      
      <div className="p-4">
        {/* SIP Information */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 mr-3 rounded-lg bg-white p-1 border border-app-teal-100 flex-shrink-0">
              <img src={sip.logo} alt={sip.fundName} className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-medium text-app-teal-900">{sip.fundName}</h3>
              <div className="flex items-center mt-1">
                <span className="text-sm text-app-teal-700">Monthly SIP</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-app-teal-100">
            <div>
              <div className="text-sm text-app-teal-600">SIP Amount</div>
              <div className="font-semibold text-app-teal-900">₹{sip.amount.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-app-teal-600">Next Installment</div>
              <div className="font-semibold text-app-teal-900">{sip.nextDate}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-3 mt-2 border-t border-app-teal-100">
            <div>
              <div className="text-sm text-app-teal-600">Total Invested</div>
              <div className="font-semibold text-app-teal-900">₹{sip.totalInvested.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-app-teal-600">Current Value</div>
              <div className="font-semibold text-app-teal-900">₹{sip.currentValue.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="pt-3 mt-2 border-t border-app-teal-100">
            <div className="text-sm text-app-teal-600">Returns</div>
            <div className="font-semibold text-app-green">
              +₹{sip.returns.value.toLocaleString()} (+{sip.returns.percentage.toFixed(2)}%)
            </div>
          </div>
        </div>
        
        {/* Warning Box */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6 border border-app-red-100">
          <div className="flex items-start mb-3">
            <AlertTriangle size={20} className="text-app-red mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-app-red">Cancel SIP Confirmation</h3>
              <p className="text-sm text-app-teal-700 mt-1">
                Please note that cancelling this SIP will stop all future installments. Your existing 
                investments will continue to remain invested unless redeemed separately.
              </p>
            </div>
          </div>
          
          <div className="bg-app-red-50 p-3 rounded-lg flex items-center">
            <Calendar size={18} className="text-app-red mr-2 flex-shrink-0" />
            <p className="text-sm text-app-teal-800">
              Last installment date will be: <span className="font-medium">{sip.nextDate}</span>
            </p>
          </div>
        </div>
        
        {/* Cancellation Reason */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <h3 className="font-medium text-app-teal-900 mb-3">Reason for Cancellation</h3>
          
          <RadioGroup 
            value={cancelReason} 
            onValueChange={setCancelReason}
            className="space-y-3"
          >
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="financial_needs" id="financial_needs" className="mt-1" />
              <div>
                <Label htmlFor="financial_needs" className="text-app-teal-800">Financial needs</Label>
                <p className="text-xs text-app-teal-600">Need funds for other expenses</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="fund_performance" id="fund_performance" className="mt-1" />
              <div>
                <Label htmlFor="fund_performance" className="text-app-teal-800">Unsatisfied with fund performance</Label>
                <p className="text-xs text-app-teal-600">Returns are not as expected</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="investing_elsewhere" id="investing_elsewhere" className="mt-1" />
              <div>
                <Label htmlFor="investing_elsewhere" className="text-app-teal-800">Investing elsewhere</Label>
                <p className="text-xs text-app-teal-600">Found better investment options</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="other" id="other" className="mt-1" />
              <div className="w-full">
                <Label htmlFor="other" className="text-app-teal-800">Other reason</Label>
                <Textarea 
                  value={otherReason} 
                  onChange={(e) => setOtherReason(e.target.value)}
                  placeholder="Please specify your reason"
                  className="mt-2 border-app-teal-200 focus-visible:ring-app-teal-500"
                  disabled={cancelReason !== 'other'}
                />
              </div>
            </div>
          </RadioGroup>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)} 
            className="flex-1 border-app-teal-500 text-app-teal-700 hover:bg-app-teal-50"
          >
            Keep SIP Active
          </Button>
          <Button 
            onClick={handleCancel} 
            className="flex-1 bg-app-red hover:bg-app-red-dark text-white font-medium"
          >
            Cancel SIP
          </Button>
        </div>
      </div>
      
      <BottomNav activeTab="invest" />
    </div>
  );
};

export default SIPCancelPage;
