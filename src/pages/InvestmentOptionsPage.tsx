
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar, TrendingUp, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

interface Fund {
  id: string;
  name: string;
  logo: string;
  category: string;
  nav: number;
  minSipAmount: number;
  minLumpSumAmount: number;
  returns: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
}

// Mock fund data - in a real app, this would come from an API
const getFundDetails = (fundId: string): Fund => {
  return {
    id: fundId,
    name: fundId === 'fund1' ? 'HDFC Mid-Cap Opportunities Fund' : 'Axis Bluechip Fund',
    logo: fundId === 'fund1' 
      ? 'https://www.hdfcfund.com/content/dam/abc-of-money/logo/hdfc-mutual-fund-logo.png'
      : 'https://www.axismf.com/assets/images/axis-logo.svg',
    category: fundId === 'fund1' ? 'Equity - Mid Cap' : 'Equity - Large Cap',
    nav: fundId === 'fund1' ? 36.67 : 25.85,
    minSipAmount: fundId === 'fund1' ? 500 : 1000,
    minLumpSumAmount: fundId === 'fund1' ? 5000 : 5000,
    returns: {
      oneYear: fundId === 'fund1' ? 25.0 : 12.5,
      threeYear: fundId === 'fund1' ? 22.1 : 15.3,
      fiveYear: fundId === 'fund1' ? 18.5 : 13.7
    }
  };
};

const InvestmentOptionsPage: React.FC = () => {
  const { fundId } = useParams<{ fundId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Only show sell tab if explicitly passed in location state
  const showSellTab = location.state?.showSell === true;
  const defaultTab = location.state?.defaultTab || 'oneTime';
  
  // Get fund details
  const fund = getFundDetails(fundId || 'fund1');
  
  // State for investment options
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [investmentAmount, setInvestmentAmount] = useState<string>(fund.minLumpSumAmount.toString());
  const [sipAmount, setSipAmount] = useState<string>(fund.minSipAmount.toString());
  const [sipFrequency, setSipFrequency] = useState<string>('monthly');
  const [sipDate, setSipDate] = useState<string>('1');
  
  const handleInvestmentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestmentAmount(e.target.value);
  };
  
  const handleSipAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSipAmount(e.target.value);
  };
  
  const handleConfirmInvestment = () => {
    if (activeTab === 'oneTime') {
      // Handle one-time investment
      toast({
        title: "Investment Initiated",
        description: `Your one-time investment of ₹${investmentAmount} in ${fund.name} has been initiated.`,
        variant: "default",
      });
      navigate('/invest/confirm', { 
        state: { 
          fundId, 
          amount: parseFloat(investmentAmount),
          type: 'lumpSum',
          fundName: fund.name,
          fundLogo: fund.logo
        } 
      });
    } else if (activeTab === 'sip') {
      // Handle SIP investment
      toast({
        title: "SIP Initiated",
        description: `Your SIP of ₹${sipAmount} in ${fund.name} has been set up successfully.`,
        variant: "default",
      });
      navigate('/invest/sip/start/' + fundId, { 
        state: { 
          amount: parseFloat(sipAmount),
          frequency: sipFrequency,
          date: sipDate,
          fundName: fund.name,
          fundLogo: fund.logo
        } 
      });
    } else if (activeTab === 'sell' && showSellTab) {
      // Handle redemption
      navigate('/invest/fund/redeem/' + fundId);
    }
  };
  
  const availableDates = Array.from({ length: 28 }, (_, i) => (i + 1).toString());
  
  // Validate inputs
  const isOneTimeValid = parseFloat(investmentAmount) >= fund.minLumpSumAmount;
  const isSipValid = parseFloat(sipAmount) >= fund.minSipAmount;
  
  return (
    <div className="bg-app-teal-50 min-h-screen pb-20">
      <Header title="Investment Options" showBack />
      
      <div className="p-4">
        {/* Fund Information */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 mr-3 rounded-lg bg-white p-1 border border-app-teal-100 flex-shrink-0">
              <img src={fund.logo} alt={fund.name} className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-medium text-app-teal-900">{fund.name}</h3>
              <div className="flex items-center mt-1">
                <span className="text-sm text-app-teal-700">{fund.category}</span>
                <span className="mx-2 text-app-teal-300">•</span>
                <span className="text-sm text-app-teal-700">NAV: ₹{fund.nav.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-3 border-t border-app-teal-100">
            <div>
              <div className="text-sm text-app-teal-600">1Y Returns</div>
              <div className="font-semibold text-app-green">{fund.returns.oneYear.toFixed(2)}%</div>
            </div>
            <div>
              <div className="text-sm text-app-teal-600">3Y Returns</div>
              <div className="font-semibold text-app-green">{fund.returns.threeYear.toFixed(2)}%</div>
            </div>
            <div>
              <div className="text-sm text-app-teal-600">5Y Returns</div>
              <div className="font-semibold text-app-green">{fund.returns.fiveYear.toFixed(2)}%</div>
            </div>
          </div>
        </div>
        
        {/* Investment Options */}
        <Tabs 
          defaultValue={defaultTab} 
          value={activeTab}
          onValueChange={setActiveTab} 
          className="bg-white rounded-lg shadow-sm p-4 mb-6"
        >
          <TabsList className="grid grid-cols-2 gap-2 bg-app-teal-50 p-1 rounded-lg">
            <TabsTrigger 
              value="oneTime"
              className="rounded-md data-[state=active]:bg-app-teal-700 data-[state=active]:text-white"
            >
              One-Time
            </TabsTrigger>
            <TabsTrigger 
              value="sip"
              className="rounded-md data-[state=active]:bg-app-teal-700 data-[state=active]:text-white"
            >
              SIP
            </TabsTrigger>
            {showSellTab && (
              <TabsTrigger 
                value="sell"
                className="rounded-md data-[state=active]:bg-app-teal-700 data-[state=active]:text-white"
              >
                Sell
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="oneTime" className="pt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="investment-amount" className="text-app-teal-700">
                  Investment Amount
                </Label>
                <div className="mt-1 relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-app-teal-700">₹</span>
                  <Input
                    id="investment-amount"
                    type="number"
                    value={investmentAmount}
                    onChange={handleInvestmentAmountChange}
                    className="pl-7 bg-white border-app-teal-200 focus-visible:ring-app-teal-500"
                    placeholder="Enter amount"
                  />
                </div>
                <p className="text-xs text-app-teal-600 mt-1">
                  Minimum amount: ₹{fund.minLumpSumAmount.toLocaleString()}
                </p>
              </div>
              
              <div className="pt-3 mt-2 flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-app-teal-100 mr-3">
                  <TrendingUp size={16} className="text-app-teal-700" />
                </div>
                <div>
                  <p className="text-sm text-app-teal-700">
                    Expected returns on ₹{parseFloat(investmentAmount).toLocaleString() || '0'} in 5 years
                  </p>
                  <p className="font-semibold text-app-teal-900">
                    ₹{(parseFloat(investmentAmount || '0') * (1 + fund.returns.fiveYear / 100) ** 5).toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </p>
                </div>
              </div>
              
              {!isOneTimeValid && (
                <div className="bg-app-teal-50 p-3 rounded-lg flex items-start mt-3">
                  <AlertCircle size={18} className="text-app-orange mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-app-teal-800">
                    Please enter an amount greater than or equal to the minimum investment amount of ₹{fund.minLumpSumAmount.toLocaleString()}.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="sip" className="pt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="sip-amount" className="text-app-teal-700">
                  SIP Amount
                </Label>
                <div className="mt-1 relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-app-teal-700">₹</span>
                  <Input
                    id="sip-amount"
                    type="number"
                    value={sipAmount}
                    onChange={handleSipAmountChange}
                    className="pl-7 bg-white border-app-teal-200 focus-visible:ring-app-teal-500"
                    placeholder="Enter SIP amount"
                  />
                </div>
                <p className="text-xs text-app-teal-600 mt-1">
                  Minimum SIP: ₹{fund.minSipAmount.toLocaleString()}
                </p>
              </div>
              
              <div>
                <Label htmlFor="sip-frequency" className="text-app-teal-700">
                  SIP Frequency
                </Label>
                <RadioGroup 
                  value={sipFrequency} 
                  onValueChange={setSipFrequency}
                  className="flex space-x-4 mt-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly">Monthly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quarterly" id="quarterly" />
                    <Label htmlFor="quarterly">Quarterly</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="sip-date" className="text-app-teal-700">
                  SIP Date
                </Label>
                <select
                  id="sip-date"
                  value={sipDate}
                  onChange={(e) => setSipDate(e.target.value)}
                  className="w-full mt-1 rounded-md border border-app-teal-200 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-app-teal-500"
                >
                  {availableDates.map((date) => (
                    <option key={date} value={date}>
                      {date}{date === '1' ? 'st' : date === '2' ? 'nd' : date === '3' ? 'rd' : 'th'} of every month
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="pt-3 mt-2 flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-app-teal-100 mr-3">
                  <TrendingUp size={16} className="text-app-teal-700" />
                </div>
                <div>
                  <p className="text-sm text-app-teal-700">
                    Expected value after 5 years of ₹{parseFloat(sipAmount).toLocaleString() || '0'}/month
                  </p>
                  <p className="font-semibold text-app-teal-900">
                    ₹{(parseFloat(sipAmount || '0') * 60 * 1.12).toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </p>
                </div>
              </div>
              
              {!isSipValid && (
                <div className="bg-app-teal-50 p-3 rounded-lg flex items-start mt-3">
                  <AlertCircle size={18} className="text-app-orange mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-app-teal-800">
                    Please enter an amount greater than or equal to the minimum SIP amount of ₹{fund.minSipAmount.toLocaleString()}.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {showSellTab && (
            <TabsContent value="sell" className="pt-4">
              <div className="text-center py-6">
                <div className="mb-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-app-teal-100 flex items-center justify-center">
                    <ArrowLeft size={24} className="text-app-teal-600" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-app-teal-900">Redeem Your Investment</h3>
                <p className="text-app-teal-700 mt-2">
                  You can redeem part or all of your investments in this fund.
                </p>
                <Button 
                  onClick={() => navigate(`/invest/fund/redeem/${fundId}`)}
                  className="mt-4 bg-app-teal-700 hover:bg-app-teal-800 text-white"
                >
                  Proceed to Redemption
                </Button>
              </div>
            </TabsContent>
          )}
        </Tabs>
        
        {/* Action Button */}
        {activeTab !== 'sell' && (
          <Button 
            onClick={handleConfirmInvestment} 
            disabled={(activeTab === 'oneTime' && !isOneTimeValid) || (activeTab === 'sip' && !isSipValid)}
            className="w-full bg-app-teal-700 hover:bg-app-teal-800 text-white font-medium"
          >
            {activeTab === 'oneTime' ? 'Invest Now' : 'Start SIP'}
          </Button>
        )}
      </div>
      
      <BottomNav activeTab="invest" />
    </div>
  );
};

export default InvestmentOptionsPage;
