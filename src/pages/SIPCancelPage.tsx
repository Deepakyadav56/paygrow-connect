
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Check, X, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SIPCancelPage: React.FC = () => {
  const navigate = useNavigate();
  const { sipId } = useParams();
  const [cancelType, setCancelType] = useState('permanent');
  const [reason, setReason] = useState('');
  const [pauseMonths, setPauseMonths] = useState('3');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  // Mock SIP data
  const sipData = {
    id: sipId || 'sip-1',
    fundName: 'HDFC Flexi Cap Fund',
    installmentAmount: 2500,
    frequency: 'Monthly',
    startDate: '05 Jan, 2023',
    nextInstallmentDate: '05 Aug, 2023',
    totalInvested: 20000,
    currentValue: 21200,
    returns: 6.0,
    folioNumber: 'HD123456789',
  };

  const cancelReasons = [
    'Need funds for personal expense',
    'Not satisfied with fund performance',
    'Switching to another fund',
    'Financial emergency',
    'Taking a break from investments',
    'Other'
  ];

  const handleCancel = () => {
    if (!reason) {
      toast.error('Please select a reason for cancellation');
      return;
    }

    if (cancelType === 'pause' && !pauseMonths) {
      toast.error('Please select pause duration');
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsCancelled(true);
      toast.success(cancelType === 'permanent' ? 'SIP cancelled successfully' : 'SIP paused successfully');
    }, 1500);
  };

  if (isCancelled) {
    return (
      <div className="app-container">
        <Header title={cancelType === 'permanent' ? "Cancel SIP" : "Pause SIP"} showBack />
        
        <div className="p-4 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          
          <h2 className="text-xl font-semibold mb-2">
            {cancelType === 'permanent' ? 'SIP Cancelled Successfully' : 'SIP Paused Successfully'}
          </h2>
          <p className="text-gray-600 mb-6">
            {cancelType === 'permanent' 
              ? `Your SIP for ${sipData.fundName} has been cancelled successfully.`
              : `Your SIP for ${sipData.fundName} has been paused for ${pauseMonths} months.`
            }
          </p>
          
          <Card className="w-full mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">SIP Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fund Name</span>
                  <span className="font-medium">{sipData.fundName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Folio Number</span>
                  <span className="font-medium">{sipData.folioNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Installment Amount</span>
                  <span className="font-medium">₹{sipData.installmentAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date</span>
                  <span className="font-medium">{sipData.startDate}</span>
                </div>
                {cancelType === 'permanent' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cancelled On</span>
                    <span className="font-medium">{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  </div>
                )}
                {cancelType === 'pause' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Paused On</span>
                      <span className="font-medium">{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Resume Date</span>
                      <span className="font-medium">
                        {new Date(new Date().setMonth(new Date().getMonth() + parseInt(pauseMonths, 10))).toLocaleDateString('en-IN', { 
                          day: '2-digit', month: 'short', year: 'numeric' 
                        })}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="w-full space-y-3">
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => navigate('/invest')}
            >
              Go to Investments
            </Button>
            <Button 
              className="w-full"
              onClick={() => navigate('/invest/mutual-funds')}
            >
              Explore More Funds
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header title="Manage SIP" showBack />
      
      <div className="p-4">
        <Card className="mb-4 border-yellow-200">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-start">
              <AlertTriangle size={20} className="text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <CardTitle className="text-lg">Important Information</CardTitle>
                <CardDescription className="mt-1">
                  {cancelType === 'permanent' 
                    ? 'Cancelling your SIP will stop all future installments. Your existing investments will remain as is.'
                    : 'Pausing your SIP will temporarily stop your installments for the selected duration and will automatically resume after that period.'
                  }
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
        
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">SIP Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Fund Name</span>
                <span className="font-medium">{sipData.fundName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Installment Amount</span>
                <span className="font-medium">₹{sipData.installmentAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Frequency</span>
                <span className="font-medium">{sipData.frequency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Next Installment</span>
                <span className="font-medium">{sipData.nextInstallmentDate}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-gray-600">Total Invested</span>
                <span className="font-medium">₹{sipData.totalInvested}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Value</span>
                <span className="font-medium">₹{sipData.currentValue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Returns</span>
                <span className="text-green-600 font-medium">+{sipData.returns}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">
            What would you like to do?
          </label>
          <RadioGroup value={cancelType} onValueChange={setCancelType} className="space-y-3">
            <div className="flex items-center space-x-2 border p-3 rounded-md">
              <RadioGroupItem value="permanent" id="option-permanent" />
              <Label htmlFor="option-permanent" className="cursor-pointer flex-1">
                <div className="font-medium">Cancel SIP Permanently</div>
                <p className="text-xs text-gray-500 mt-1">Stop all future installments</p>
              </Label>
            </div>
            <div className="flex items-center space-x-2 border p-3 rounded-md">
              <RadioGroupItem value="pause" id="option-pause" />
              <Label htmlFor="option-pause" className="cursor-pointer flex-1">
                <div className="font-medium">Pause SIP Temporarily</div>
                <p className="text-xs text-gray-500 mt-1">Stop installments for a specific period</p>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        {cancelType === 'pause' && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Pause Duration
            </label>
            <Select value={pauseMonths} onValueChange={setPauseMonths}>
              <SelectTrigger>
                <SelectValue placeholder="Select pause duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Month</SelectItem>
                <SelectItem value="3">3 Months</SelectItem>
                <SelectItem value="6">6 Months</SelectItem>
                <SelectItem value="12">12 Months</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center mt-2 text-xs text-gray-600">
              <Calendar size={14} className="mr-1 text-app-blue" />
              Will resume on: {pauseMonths && new Date(new Date().setMonth(new Date().getMonth() + parseInt(pauseMonths, 10))).toLocaleDateString('en-IN', { 
                day: '2-digit', month: 'short', year: 'numeric' 
              })}
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Reason for {cancelType === 'permanent' ? 'Cancellation' : 'Pausing'}
          </label>
          <Select onValueChange={setReason} value={reason}>
            <SelectTrigger>
              <SelectValue placeholder="Select a reason" />
            </SelectTrigger>
            <SelectContent>
              {cancelReasons.map((cancelReason) => (
                <SelectItem key={cancelReason} value={cancelReason}>
                  {cancelReason}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {reason === 'Other' && (
            <div className="mt-3">
              <Textarea 
                placeholder="Please specify your reason..."
                className="resize-none"
                rows={3}
              />
            </div>
          )}
          
          <p className="text-xs text-gray-500 mt-2">
            Your feedback helps us improve our services.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button 
            className={`w-full ${cancelType === 'permanent' ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'}`}
            onClick={handleCancel}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : cancelType === 'permanent' ? 'Cancel SIP' : 'Pause SIP'}
          </Button>
          <Button 
            className="w-full" 
            variant="outline"
            onClick={() => navigate(-1)}
            disabled={isProcessing}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SIPCancelPage;
