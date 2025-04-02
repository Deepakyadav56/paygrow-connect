
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Check, X, Info, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const RedeemFundPage: React.FC = () => {
  const navigate = useNavigate();
  const { fundId } = useParams();
  const [redeemType, setRedeemType] = useState('amount');
  const [amount, setAmount] = useState('');
  const [units, setUnits] = useState('');
  const [redeemOption, setRedeemOption] = useState('full');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [bankAccount, setBankAccount] = useState('hdfc');

  // Mock fund data
  const fundData = {
    id: fundId || 'fund1',
    name: 'HDFC Mid-Cap Opportunities Fund',
    category: 'Equity - Mid Cap',
    investedAmount: 25000,
    currentValue: 31250,
    returns: 6250,
    returnsPercentage: 25.0,
    units: 852.14,
    nav: 36.67,
    exitLoad: '1% if redeemed within 1 year',
    taxImplications: 'STCG: 15%, LTCG: 10% above ₹1 lakh',
    investmentDate: '10 Jul 2022',
    investmentPeriod: '1 year, 2 months',
  };

  const bankAccounts = [
    { id: 'hdfc', name: 'HDFC Bank - XXXX6789' },
    { id: 'icici', name: 'ICICI Bank - XXXX5432' },
    { id: 'sbi', name: 'SBI - XXXX9876' },
  ];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    
    // Calculate units based on amount
    if (value && !isNaN(Number(value))) {
      const calculatedUnits = (Number(value) / fundData.nav).toFixed(2);
      setUnits(calculatedUnits);
    } else {
      setUnits('');
    }
  };

  const handleUnitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUnits(value);
    
    // Calculate amount based on units
    if (value && !isNaN(Number(value))) {
      const calculatedAmount = (Number(value) * fundData.nav).toFixed(2);
      setAmount(calculatedAmount);
    } else {
      setAmount('');
    }
  };

  const handleRedeem = () => {
    // Validation
    if (redeemOption === 'partial' && redeemType === 'amount' && (!amount || Number(amount) <= 0 || Number(amount) > fundData.currentValue)) {
      toast.error(Number(amount) > fundData.currentValue ? 
        `Amount exceeds current investment value of ₹${fundData.currentValue}` : 
        'Please enter a valid amount');
      return;
    }

    if (redeemOption === 'partial' && redeemType === 'units' && (!units || Number(units) <= 0 || Number(units) > fundData.units)) {
      toast.error(Number(units) > fundData.units ? 
        `Units exceed available units of ${fundData.units.toFixed(2)}` : 
        'Please enter valid units');
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsRedeemed(true);
      toast.success('Redemption request submitted successfully');
    }, 1500);
  };

  const getRedeemAmount = () => {
    if (redeemOption === 'full') {
      return fundData.currentValue;
    } else {
      return Number(amount) || 0;
    }
  };

  const getRedeemUnits = () => {
    if (redeemOption === 'full') {
      return fundData.units;
    } else {
      return Number(units) || 0;
    }
  };

  // Redemption successful view
  if (isRedeemed) {
    return (
      <div className="app-container">
        <Header title="Redemption" showBack />
        
        <div className="p-4 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          
          <h2 className="text-xl font-semibold mb-2">Redemption Successful</h2>
          <p className="text-gray-600 mb-6">
            Your redemption request for {fundData.name} has been processed successfully.
          </p>
          
          <Card className="w-full mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Redemption Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fund Name</span>
                  <span className="font-medium text-right flex-1 ml-4">{fundData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Redeemed Amount</span>
                  <span className="font-medium">₹{getRedeemAmount().toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Redeemed Units</span>
                  <span className="font-medium">{getRedeemUnits().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">NAV</span>
                  <span className="font-medium">₹{fundData.nav}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Credit Account</span>
                  <span className="font-medium">
                    {bankAccounts.find(a => a.id === bankAccount)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Credit Date</span>
                  <span className="font-medium">
                    {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </span>
                </div>
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
              onClick={() => navigate('/portfolio')}
            >
              View Portfolio
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header title="Redeem Fund" showBack />
      
      <div className="p-4">
        <Card className="mb-4">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-lg">{fundData.name}</CardTitle>
            <CardDescription>{fundData.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-xs text-gray-500">Investment Value</p>
                <p className="font-medium">₹{fundData.currentValue.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Units</p>
                <p className="font-medium">{fundData.units.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">NAV</p>
                <p className="font-medium">₹{fundData.nav}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Returns</p>
                <p className="font-medium text-app-green">
                  {fundData.returnsPercentage.toFixed(2)}% <span className="text-xs">(₹{fundData.returns.toLocaleString('en-IN')})</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-4">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-lg">Redemption Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Redemption Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    type="button" 
                    variant={redeemOption === 'full' ? 'default' : 'outline'} 
                    className="w-full"
                    onClick={() => setRedeemOption('full')}
                  >
                    Full Redemption
                  </Button>
                  <Button 
                    type="button" 
                    variant={redeemOption === 'partial' ? 'default' : 'outline'} 
                    className="w-full"
                    onClick={() => setRedeemOption('partial')}
                  >
                    Partial Redemption
                  </Button>
                </div>
              </div>
              
              {redeemOption === 'partial' && (
                <div>
                  <Tabs defaultValue="amount" className="w-full" onValueChange={setRedeemType}>
                    <TabsList className="grid grid-cols-2 mb-2">
                      <TabsTrigger value="amount">By Amount</TabsTrigger>
                      <TabsTrigger value="units">By Units</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="amount" className="mt-0">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">
                          Amount to Redeem
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle size={14} className="ml-1 inline text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-60 text-xs">
                                  Enter the amount you wish to redeem. The equivalent units will be calculated automatically.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                          <Input
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                            className="pl-7"
                            placeholder="Enter amount"
                          />
                        </div>
                        <div className="text-sm text-gray-600">
                          Approx. Units: {units ? `${units} units` : '-'}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="units" className="mt-0">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">
                          Units to Redeem
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle size={14} className="ml-1 inline text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-60 text-xs">
                                  Enter the units you wish to redeem. The equivalent amount will be calculated automatically.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </label>
                        <Input
                          type="number"
                          value={units}
                          onChange={handleUnitsChange}
                          placeholder="Enter units"
                        />
                        <div className="text-sm text-gray-600">
                          Approx. Amount: {amount ? `₹${parseFloat(amount).toLocaleString('en-IN')}` : '-'}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Credit Account
                </label>
                <Select value={bankAccount} onValueChange={setBankAccount}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bank account" />
                  </SelectTrigger>
                  <SelectContent>
                    {bankAccounts.map(account => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-4 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-start">
              <Info size={20} className="text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">Important Information</h4>
                <div className="mt-2 space-y-3 text-xs text-gray-600">
                  <p>
                    <span className="font-medium">Exit Load:</span> {fundData.exitLoad}
                  </p>
                  <p>
                    <span className="font-medium">Tax Implications:</span> {fundData.taxImplications}
                  </p>
                  <p>
                    <span className="font-medium">Processing Time:</span> T+3 business days for redemption amount credit
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6 border-yellow-200">
          <CardContent className="p-3">
            <div className="flex items-start">
              <AlertTriangle size={18} className="text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600">
                Redemption requests placed before 3:00 PM will be processed at the same day's NAV, while requests after 3:00 PM will be processed at the next business day's NAV.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-3">
          <Button 
            className="w-full" 
            onClick={handleRedeem}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Confirm Redemption'}
          </Button>
          <Button 
            className="w-full" 
            variant="outline"
            onClick={() => navigate(-1)}
            disabled={isProcessing}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RedeemFundPage;
