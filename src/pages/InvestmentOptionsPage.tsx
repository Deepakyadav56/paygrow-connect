
import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Calendar, Repeat, CreditCard, Clock, ChevronsUpDown, Info, ChevronRight, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Mock data for funds
const fundsData: Record<string, any> = {
  'inv1': {
    id: 'inv1',
    name: 'Axis Bluechip Fund',
    category: 'Equity - Large Cap',
    amc: 'Axis Mutual Fund',
    nav: 52.32,
    riskLevel: 'Moderate',
    rating: 4,
    minInvestment: 500,
    sipMinAmount: 500,
    oneTimeMinAmount: 1000,
    exitLoad: '1% if redeemed within 1 year',
    returns: {
      oneYear: 12.5,
      threeYear: 8.7,
      fiveYear: 11.2
    }
  },
  'fund1': {
    id: 'fund1',
    name: 'Axis Bluechip Fund',
    category: 'Equity - Large Cap',
    amc: 'Axis Mutual Fund',
    nav: 52.32,
    riskLevel: 'Moderate',
    rating: 4,
    minInvestment: 500,
    sipMinAmount: 500,
    oneTimeMinAmount: 1000,
    exitLoad: '1% if redeemed within 1 year',
    returns: {
      oneYear: 12.5,
      threeYear: 8.7,
      fiveYear: 11.2
    }
  }
};

const InvestmentOptionsPage: React.FC = () => {
  const { fundId } = useParams<{ fundId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const fund = fundsData[fundId || 'inv1'] || fundsData['inv1'];
  
  const [investmentType, setInvestmentType] = useState<'buy' | 'sell'>('buy');
  const [investmentMode, setInvestmentMode] = useState<'sip' | 'oneTime'>('sip');
  const [amount, setAmount] = useState<string>('');
  const [sipDate, setSipDate] = useState<Date | undefined>(new Date());
  const [sipFrequency, setSipFrequency] = useState<'monthly' | 'quarterly'>('monthly');
  const [sipDuration, setSipDuration] = useState<'ongoing' | '3months' | '6months' | '1year' | '2years' | '3years' | '5years' | '10years'>('ongoing');
  const [unitsToSell, setUnitsToSell] = useState<string>('');
  const [sellType, setSellType] = useState<'amount' | 'units' | 'all'>('amount');
  const [calendar, setCalendar] = useState<boolean>(false);
  
  const quickAmounts = [1000, 5000, 10000, 25000];
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };
  
  const handleUnitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow decimal numbers
    if (/^\d*\.?\d*$/.test(value)) {
      setUnitsToSell(value);
    }
  };
  
  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString());
  };
  
  const handleInvest = () => {
    // Validation based on investment type and mode
    if (investmentType === 'buy') {
      const minAmount = investmentMode === 'sip' ? fund.sipMinAmount : fund.oneTimeMinAmount;
      
      if (!amount || parseInt(amount) < minAmount) {
        toast.error(`Minimum ${investmentMode === 'sip' ? 'SIP' : 'one-time'} amount is ${formatCurrency(minAmount)}`);
        return;
      }
      
      if (investmentMode === 'sip' && !sipDate) {
        toast.error('Please select a SIP date');
        return;
      }
      
      // Navigate to confirmation page with all investment details
      navigate('/invest/confirm', {
        state: {
          fundId: fund.id,
          fundName: fund.name,
          investmentType,
          investmentMode,
          amount: parseInt(amount),
          sipDate: sipDate ? format(sipDate, 'dd') : null,
          sipFrequency,
          sipDuration,
          nav: fund.nav
        }
      });
    } else if (investmentType === 'sell') {
      if (sellType === 'amount' && (!amount || parseInt(amount) < 100)) {
        toast.error('Please enter a valid amount to redeem');
        return;
      } else if (sellType === 'units' && (!unitsToSell || parseFloat(unitsToSell) <= 0)) {
        toast.error('Please enter valid units to redeem');
        return;
      }
      
      // Navigate to confirmation page with redemption details
      navigate('/invest/confirm', {
        state: {
          fundId: fund.id,
          fundName: fund.name,
          investmentType: 'sell',
          sellType,
          amount: sellType === 'amount' ? parseInt(amount) : null,
          units: sellType === 'units' ? parseFloat(unitsToSell) : null,
          sellAll: sellType === 'all',
          nav: fund.nav
        }
      });
    }
  };

  return (
    <div className="app-container pb-20">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="p-4 flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold ml-2">{fund.name}</h1>
        </div>
        
        <Tabs 
          defaultValue="buy" 
          className="w-full"
          onValueChange={(value) => setInvestmentType(value as 'buy' | 'sell')}
        >
          <TabsList className="grid grid-cols-2 mb-2">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="p-6 space-y-4">
        <TabsContent value="buy" className="mt-0 space-y-6">
          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="mb-4">
              <div className="font-medium mb-1">{fund.name}</div>
              <div className="text-xs text-gray-500">{fund.category}</div>
            </div>
            
            <div className="flex justify-between">
              <div>
                <div className="text-sm text-gray-500 mb-1">NAV</div>
                <div className="font-semibold">₹{fund.nav}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">1Y Returns</div>
                <div className="text-app-green font-semibold">+{fund.returns.oneYear}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Min. Amount</div>
                <div className="font-semibold">₹{fund.minInvestment}</div>
              </div>
            </div>
          </div>
          
          <div>
            <RadioGroup 
              defaultValue="sip" 
              className="flex border border-gray-200 rounded-xl overflow-hidden mb-4"
              onValueChange={(value) => setInvestmentMode(value as 'sip' | 'oneTime')}
            >
              <div className="flex-1 relative">
                <RadioGroupItem 
                  value="sip" 
                  id="sip" 
                  className="sr-only" 
                />
                <Label
                  htmlFor="sip"
                  className={`flex-1 flex items-center justify-center py-3 px-4 cursor-pointer ${
                    investmentMode === 'sip' ? 'bg-app-blue text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  <Repeat size={16} className="mr-2" /> SIP
                </Label>
              </div>
              
              <div className="flex-1 relative">
                <RadioGroupItem 
                  value="oneTime" 
                  id="oneTime" 
                  className="sr-only" 
                />
                <Label
                  htmlFor="oneTime"
                  className={`flex-1 flex items-center justify-center py-3 px-4 cursor-pointer ${
                    investmentMode === 'oneTime' ? 'bg-app-blue text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  <CreditCard size={16} className="mr-2" /> One-Time
                </Label>
              </div>
            </RadioGroup>
            
            {investmentMode === 'sip' && (
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SIP Date
                  </label>
                  
                  <Popover open={calendar} onOpenChange={setCalendar}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between text-left font-normal"
                      >
                        {sipDate ? (
                          <span>SIP on {format(sipDate, "do")} of every month</span>
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <Calendar size={16} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={sipDate}
                        onSelect={(date) => {
                          setSipDate(date);
                          setCalendar(false);
                        }}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SIP Frequency
                  </label>
                  <RadioGroup 
                    defaultValue="monthly" 
                    className="flex border border-gray-200 rounded-xl overflow-hidden"
                    onValueChange={(value) => setSipFrequency(value as 'monthly' | 'quarterly')}
                  >
                    <div className="flex-1 relative">
                      <RadioGroupItem 
                        value="monthly" 
                        id="monthly" 
                        className="sr-only" 
                      />
                      <Label
                        htmlFor="monthly"
                        className={`flex-1 flex items-center justify-center py-3 cursor-pointer ${
                          sipFrequency === 'monthly' ? 'bg-app-blue text-white' : 'bg-white text-gray-700'
                        }`}
                      >
                        Monthly
                      </Label>
                    </div>
                    
                    <div className="flex-1 relative">
                      <RadioGroupItem 
                        value="quarterly" 
                        id="quarterly" 
                        className="sr-only" 
                      />
                      <Label
                        htmlFor="quarterly"
                        className={`flex-1 flex items-center justify-center py-3 cursor-pointer ${
                          sipFrequency === 'quarterly' ? 'bg-app-blue text-white' : 'bg-white text-gray-700'
                        }`}
                      >
                        Quarterly
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SIP Duration
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg appearance-none pr-10"
                      value={sipDuration}
                      onChange={(e) => setSipDuration(e.target.value as any)}
                    >
                      <option value="ongoing">Ongoing (Until Cancelled)</option>
                      <option value="3months">3 Months</option>
                      <option value="6months">6 Months</option>
                      <option value="1year">1 Year</option>
                      <option value="2years">2 Years</option>
                      <option value="3years">3 Years</option>
                      <option value="5years">5 Years</option>
                      <option value="10years">10 Years</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronsUpDown size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {investmentMode === 'sip' ? 'Monthly SIP Amount' : 'Investment Amount'}
              </label>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">₹</span>
                </div>
                <Input
                  type="text"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={handleAmountChange}
                  className="pl-8 text-lg font-semibold"
                />
              </div>
              
              <p className="text-xs text-gray-500 mt-1">
                Minimum {investmentMode === 'sip' ? 'SIP' : 'one-time'} amount: ₹{investmentMode === 'sip' ? fund.sipMinAmount : fund.oneTimeMinAmount}
              </p>
            </div>
            
            <div className="flex justify-between mb-6">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    amount === amt.toString() 
                      ? 'bg-app-blue text-white' 
                      : 'border border-gray-300 text-gray-700'
                  }`}
                  onClick={() => handleQuickAmount(amt)}
                >
                  ₹{amt.toLocaleString()}
                </button>
              ))}
            </div>
            
            <Accordion type="single" collapsible className="mb-6">
              <AccordionItem value="details">
                <AccordionTrigger className="text-app-blue">
                  <div className="flex items-center">
                    <Info size={16} className="mr-2" />
                    View Fund Details
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 py-2">
                    <div className="flex justify-between">
                      <div className="text-gray-600">Fund House</div>
                      <div className="font-medium">{fund.amc}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-gray-600">Risk Level</div>
                      <div className="font-medium">{fund.riskLevel}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-gray-600">Min. SIP Amount</div>
                      <div className="font-medium">₹{fund.sipMinAmount}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-gray-600">Min. One-Time</div>
                      <div className="font-medium">₹{fund.oneTimeMinAmount}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-gray-600">Exit Load</div>
                      <div className="font-medium">{fund.exitLoad}</div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
        
        <TabsContent value="sell" className="mt-0 space-y-6">
          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="mb-4">
              <div className="font-medium mb-1">{fund.name}</div>
              <div className="text-xs text-gray-500">{fund.category}</div>
            </div>
            
            <div className="flex justify-between">
              <div>
                <div className="text-sm text-gray-500 mb-1">Current Value</div>
                <div className="font-semibold">₹25,000</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Units Held</div>
                <div className="font-semibold">457.93</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Avg. NAV</div>
                <div className="font-semibold">₹54.59</div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Redemption Type
              </label>
              <RadioGroup 
                defaultValue="amount" 
                className="space-y-3"
                onValueChange={(value) => setSellType(value as 'amount' | 'units' | 'all')}
              >
                <div className="flex items-center">
                  <RadioGroupItem value="amount" id="amount" />
                  <Label htmlFor="amount" className="ml-2">By Amount</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="units" id="units" />
                  <Label htmlFor="units" className="ml-2">By Units</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="ml-2">Redeem All Units</Label>
                </div>
              </RadioGroup>
            </div>
            
            {sellType === 'amount' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Redemption Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                  <Input
                    type="text"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={handleAmountChange}
                    className="pl-8 text-lg font-semibold"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Maximum redemption amount: ₹25,000
                </p>
              </div>
            )}
            
            {sellType === 'units' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Units
                </label>
                <Input
                  type="text"
                  placeholder="Enter units"
                  value={unitsToSell}
                  onChange={handleUnitsChange}
                  className="text-lg font-semibold"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Maximum units available: 457.93
                </p>
              </div>
            )}
            
            {sellType === 'all' && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="font-medium mb-2">You are about to redeem all units</div>
                <div className="text-sm text-gray-600">
                  Total redemption value: ₹25,000 (457.93 units)
                </div>
              </div>
            )}
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
              <div className="flex">
                <HelpCircle size={18} className="text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Exit Load:</span> {fund.exitLoad}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Redemption amount will be credited to your bank account within 3-5 working days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <Button 
          onClick={handleInvest} 
          className="w-full py-6 bg-app-blue hover:bg-app-dark-blue"
        >
          {investmentType === 'buy' 
            ? (investmentMode === 'sip' ? 'Start SIP' : 'Invest Now') 
            : 'Redeem Now'}
        </Button>
      </div>
    </div>
  );
};

export default InvestmentOptionsPage;
