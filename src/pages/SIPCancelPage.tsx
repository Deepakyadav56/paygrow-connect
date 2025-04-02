
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { AlertCircle, Calendar, CheckCircle2, Clock, PauseCircle, X, Calendar as CalendarIcon, ArrowUpRight, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const SIPCancelPage: React.FC = () => {
  const navigate = useNavigate();
  const { sipId } = useParams();
  const [action, setAction] = useState<'pause' | 'cancel'>('pause');
  const [pauseDuration, setPauseDuration] = useState<'1_month' | '3_months' | '6_months'>('1_month');
  const [reason, setReason] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Mock SIP data
  const sipData = {
    id: sipId || 'sip1',
    fundName: 'HDFC Mid-Cap Opportunities Fund',
    category: 'Equity - Mid Cap',
    amount: 2500,
    frequency: 'Monthly',
    startDate: '15 Jul 2022',
    nextDate: '15 May 2023',
    completedInstallments: 10,
    totalAmount: 25000,
    status: 'Active',
    bankAccount: 'HDFC Bank - XXXX6789'
  };

  const pausePeriodMap = {
    '1_month': '1 month (until 15 Jun 2023)',
    '3_months': '3 months (until 15 Aug 2023)',
    '6_months': '6 months (until 15 Nov 2023)'
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmed(true);
      
      if (action === 'pause') {
        toast.success(`SIP paused successfully for ${pausePeriodMap[pauseDuration]}`);
      } else {
        toast.success('SIP cancelled successfully');
      }
    }, 1500);
  };

  // Success view after confirmation
  if (isConfirmed) {
    return (
      <div className="app-container">
        <Header title={action === 'pause' ? 'SIP Paused' : 'SIP Cancelled'} showBack />
        
        <div className="p-4 flex flex-col items-center text-center">
          <div className={`w-16 h-16 rounded-full ${action === 'pause' ? 'bg-amber-100' : 'bg-green-100'} flex items-center justify-center mb-4`}>
            {action === 'pause' ? 
              <PauseCircle size={32} className="text-amber-600" /> : 
              <CheckCircle2 size={32} className="text-green-600" />
            }
          </div>
          
          <h2 className="text-xl font-semibold mb-2">
            {action === 'pause' ? 'SIP Paused Successfully' : 'SIP Cancelled Successfully'}
          </h2>
          <p className="text-gray-600 mb-6">
            {action === 'pause' ? 
              `Your SIP for ${sipData.fundName} has been paused for ${pausePeriodMap[pauseDuration]}.` : 
              `Your SIP for ${sipData.fundName} has been cancelled.`
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
                  <span className="font-medium text-right flex-1 ml-4">{sipData.fundName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SIP Amount</span>
                  <span className="font-medium">₹{sipData.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frequency</span>
                  <span className="font-medium">{sipData.frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Started On</span>
                  <span className="font-medium">{sipData.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <Badge variant="outline" className={`${action === 'pause' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                    {action === 'pause' ? 'Paused' : 'Cancelled'}
                  </Badge>
                </div>
                {action === 'pause' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Resume Date</span>
                    <span className="font-medium">
                      {pauseDuration === '1_month' ? '15 Jun 2023' : 
                       pauseDuration === '3_months' ? '15 Aug 2023' : '15 Nov 2023'}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="w-full space-y-3">
            <Button 
              className="w-full" 
              onClick={() => navigate('/invest')}
            >
              Go to Investments
            </Button>
            {action === 'pause' && (
              <Button 
                className="w-full"
                variant="outline"
                onClick={() => navigate('/sip/management')}
              >
                Manage SIPs
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header title="Manage SIP" showBack />
      
      <div className="p-4">
        <Card className="mb-4">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-lg">{sipData.fundName}</CardTitle>
            <CardDescription>{sipData.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-xs text-gray-500">SIP Amount</p>
                <p className="font-medium">₹{sipData.amount.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Frequency</p>
                <p className="font-medium">{sipData.frequency}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Start Date</p>
                <p className="font-medium">{sipData.startDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Next SIP Date</p>
                <p className="font-medium">{sipData.nextDate}</p>
              </div>
            </div>
            
            <div className="flex items-center mt-2 pt-2 border-t border-gray-100">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                {sipData.status}
              </Badge>
              <div className="text-xs text-gray-600 ml-2">
                {sipData.completedInstallments} installments completed (₹{sipData.totalAmount.toLocaleString('en-IN')})
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="pause" className="mb-4" onValueChange={(value) => setAction(value as 'pause' | 'cancel')}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="pause">Pause SIP</TabsTrigger>
            <TabsTrigger value="cancel">Cancel SIP</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pause">
            <Card className="border-amber-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Pause SIP</CardTitle>
                <CardDescription>
                  Temporarily pause your SIP for a specific period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">Select Pause Duration</h4>
                  <RadioGroup value={pauseDuration} onValueChange={(value) => setPauseDuration(value as '1_month' | '3_months' | '6_months')}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="1_month" id="r1" />
                      <Label htmlFor="r1" className="font-normal">1 month (until 15 Jun 2023)</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="3_months" id="r2" />
                      <Label htmlFor="r2" className="font-normal">3 months (until 15 Aug 2023)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="6_months" id="r3" />
                      <Label htmlFor="r3" className="font-normal">6 months (until 15 Nov 2023)</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="flex items-start p-3 bg-amber-50 rounded-lg">
                  <Info size={18} className="text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-gray-700">
                    <p>Your SIP will automatically resume after the selected pause period. You can resume it earlier from the SIP Management section.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button 
                  className="w-full" 
                  onClick={handleSubmit}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Confirm Pause'}
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => navigate(-1)}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="cancel">
            <Card className="border-red-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Cancel SIP</CardTitle>
                <CardDescription>
                  Permanently cancel your SIP
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-red-50 rounded-lg mb-4">
                  <div className="flex items-start">
                    <AlertCircle size={18} className="text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-gray-700">
                      <p className="font-medium mb-1">Important Information</p>
                      <p>Cancelling your SIP will stop all future payments. Your invested amount will remain invested until you redeem. This action cannot be undone.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">Reason for Cancellation (Optional)</h4>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  >
                    <option value="">Select a reason</option>
                    <option value="financial">Financial constraints</option>
                    <option value="performance">Poor fund performance</option>
                    <option value="alternative">Found better investment alternative</option>
                    <option value="emergency">Emergency need for money</option>
                    <option value="other">Other reason</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700" 
                  onClick={handleSubmit}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Confirm Cancellation'}
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => navigate(-1)}
                  disabled={isProcessing}
                >
                  Go Back
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4">
          <Button 
            variant="ghost" 
            className="w-full flex justify-between items-center"
            onClick={() => navigate('/sip/management')}
          >
            <span>View All SIPs</span>
            <ArrowUpRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SIPCancelPage;
