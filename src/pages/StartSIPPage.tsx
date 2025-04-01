
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Info, ChevronRight, HelpCircle, Plus, Minus, AlertTriangle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
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
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface SIPFormData {
  amount: number;
  date: string;
  duration: string;
  bankAccount: string;
  stepUp: boolean;
  stepUpPercentage: number;
}

const StartSIPPage: React.FC = () => {
  const navigate = useNavigate();
  const { fundId } = useParams();
  const [formData, setFormData] = useState<SIPFormData>({
    amount: 2500,
    date: '5',
    duration: 'until-cancelled',
    bankAccount: 'hdfc',
    stepUp: false,
    stepUpPercentage: 10,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Mock fund data
  const fundData = {
    id: fundId || 'fund-1',
    name: 'Axis Bluechip Fund Direct Growth',
    category: 'Equity - Large Cap',
    amc: 'Axis Mutual Fund',
    logo: '🔵',
    minSIPAmount: 500,
    maxSIPAmount: 999999,
    nav: 49.75,
    expenseRatio: 0.45,
  };
  
  const bankAccounts = [
    { id: 'hdfc', name: 'HDFC Bank - XXXX6789' },
    { id: 'icici', name: 'ICICI Bank - XXXX5432' },
    { id: 'sbi', name: 'SBI - XXXX9876' },
  ];
  
  const sipDates = Array.from({ length: 28 }, (_, i) => (i + 1).toString());
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'amount') {
      const numValue = parseInt(value, 10) || 0;
      if (numValue < fundData.minSIPAmount) {
        toast.error(`Minimum SIP amount is ₹${fundData.minSIPAmount}`);
        return;
      }
      if (numValue > fundData.maxSIPAmount) {
        toast.error(`Maximum SIP amount is ₹${fundData.maxSIPAmount}`);
        return;
      }
    }
    
    if (name === 'stepUpPercentage') {
      const numValue = parseInt(value, 10) || 0;
      if (numValue < 1 || numValue > 25) {
        toast.error('Step-up percentage must be between 1% and 25%');
        return;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' || name === 'stepUpPercentage' ? parseInt(value, 10) || 0 : value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      stepUp: checked
    }));
  };
  
  const decreaseAmount = () => {
    const newAmount = Math.max(formData.amount - 500, fundData.minSIPAmount);
    setFormData(prev => ({ ...prev, amount: newAmount }));
  };
  
  const increaseAmount = () => {
    const newAmount = Math.min(formData.amount + 500, fundData.maxSIPAmount);
    setFormData(prev => ({ ...prev, amount: newAmount }));
  };
  
  const decreaseStepUp = () => {
    const newPercentage = Math.max(formData.stepUpPercentage - 1, 1);
    setFormData(prev => ({ ...prev, stepUpPercentage: newPercentage }));
  };
  
  const increaseStepUp = () => {
    const newPercentage = Math.min(formData.stepUpPercentage + 1, 25);
    setFormData(prev => ({ ...prev, stepUpPercentage: newPercentage }));
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Validate form
    if (formData.amount < fundData.minSIPAmount) {
      toast.error(`Minimum SIP amount is ₹${fundData.minSIPAmount}`);
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success('SIP started successfully');
    }, 1500);
  };
  
  if (isSuccess) {
    return (
      <div className="app-container">
        <Header title="SIP Started" showBack />
        
        <div className="p-4 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          
          <h2 className="text-xl font-semibold mb-2">SIP Started Successfully</h2>
          <p className="text-gray-600 mb-6">
            Your SIP for {fundData.name} has been set up successfully.
          </p>
          
          <Card className="w-full mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">SIP Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fund Name</span>
                  <span className="font-medium text-right flex-1 ml-4">{fundData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SIP Amount</span>
                  <span className="font-medium">₹{formData.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SIP Date</span>
                  <span className="font-medium">{formData.date}th of every month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">
                    {formData.duration === 'until-cancelled' ? 'Until Cancelled' : `${formData.duration} months`}
                  </span>
                </div>
                {formData.stepUp && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Step-up</span>
                    <span className="font-medium">{formData.stepUpPercentage}%</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Account</span>
                  <span className="font-medium">
                    {bankAccounts.find(a => a.id === formData.bankAccount)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">First Installment</span>
                  <span className="font-medium">
                    {new Date(new Date().setDate(parseInt(formData.date, 10))).toLocaleDateString('en-IN', {
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
      <Header title="Start SIP" showBack />
      
      <div className="p-4">
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 mr-3 text-xl">
                {fundData.logo}
              </div>
              <div>
                <CardTitle className="text-lg leading-tight">{fundData.name}</CardTitle>
                <CardDescription className="text-xs">
                  {fundData.category} • {fundData.amc}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">NAV</span>
                <div className="font-medium">₹{fundData.nav}</div>
              </div>
              <div>
                <span className="text-gray-600">Expense Ratio</span>
                <div className="font-medium">{fundData.expenseRatio}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6 mb-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">
                Monthly SIP Amount
              </label>
              <div className="text-xs text-gray-500">
                Min: ₹{fundData.minSIPAmount}
              </div>
            </div>
            <div className="flex items-center">
              <Button 
                type="button" 
                variant="outline" 
                size="icon" 
                className="rounded-r-none"
                onClick={decreaseAmount}
              >
                <Minus size={16} />
              </Button>
              <Input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="text-center rounded-none border-x-0"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="icon" 
                className="rounded-l-none"
                onClick={increaseAmount}
              >
                <Plus size={16} />
              </Button>
            </div>
            <div className="flex justify-between mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => setFormData(prev => ({ ...prev, amount: 1000 }))}
              >
                ₹1,000
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => setFormData(prev => ({ ...prev, amount: 2500 }))}
              >
                ₹2,500
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => setFormData(prev => ({ ...prev, amount: 5000 }))}
              >
                ₹5,000
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => setFormData(prev => ({ ...prev, amount: 10000 }))}
              >
                ₹10,000
              </Button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              SIP Date
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle size={14} className="ml-1 inline text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-60 text-xs">
                      This is the date when your monthly SIP amount will be debited from your bank account.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <Select value={formData.date} onValueChange={(value) => handleSelectChange('date', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select SIP date" />
              </SelectTrigger>
              <SelectContent>
                {sipDates.map(date => (
                  <SelectItem key={date} value={date}>
                    {date}{date === '1' ? 'st' : date === '2' ? 'nd' : date === '3' ? 'rd' : 'th'} of every month
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              SIP Duration
            </label>
            <Select value={formData.duration} onValueChange={(value) => handleSelectChange('duration', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select SIP duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="until-cancelled">Until Cancelled (Recommended)</SelectItem>
                <SelectItem value="12">12 months</SelectItem>
                <SelectItem value="24">24 months</SelectItem>
                <SelectItem value="36">36 months</SelectItem>
                <SelectItem value="60">60 months</SelectItem>
                <SelectItem value="120">120 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">
                Annual Step-up
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle size={14} className="ml-1 inline text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-60 text-xs">
                        Step-up increases your SIP amount annually by a fixed percentage, helping your investment grow faster with your increasing income.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </label>
              <Switch 
                checked={formData.stepUp} 
                onCheckedChange={handleSwitchChange}
              />
            </div>
            
            {formData.stepUp && (
              <div className="mt-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs text-gray-600">
                    Step-up Percentage (Annual)
                  </label>
                  <div className="text-xs text-gray-500">
                    1-25%
                  </div>
                </div>
                <div className="flex items-center">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    className="rounded-r-none"
                    onClick={decreaseStepUp}
                  >
                    <Minus size={16} />
                  </Button>
                  <Input
                    type="number"
                    name="stepUpPercentage"
                    value={formData.stepUpPercentage}
                    onChange={handleInputChange}
                    className="text-center rounded-none border-x-0"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    className="rounded-l-none"
                    onClick={increaseStepUp}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="mt-2 text-xs text-gray-600 bg-blue-50 p-2 rounded-md">
                  <Info size={14} className="inline mr-1 text-blue-500" />
                  With {formData.stepUpPercentage}% annual step-up, your SIP amount next year will be 
                  ₹{Math.round(formData.amount * (1 + formData.stepUpPercentage / 100)).toLocaleString('en-IN')}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Payment Account
            </label>
            <Select value={formData.bankAccount} onValueChange={(value) => handleSelectChange('bankAccount', value)}>
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
        
        <Card className="mb-6 border-yellow-200">
          <CardContent className="p-3">
            <div className="flex items-start">
              <AlertTriangle size={18} className="text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-gray-600">
                <p className="mb-1 font-medium">Authorization Note:</p>
                <p>
                  By proceeding, you authorize PayGrow to debit your registered bank account for the SIP amount every month on the selected date until the SIP is cancelled.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Button 
          className="w-full" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Start SIP'}
        </Button>
      </div>
    </div>
  );
};

export default StartSIPPage;
