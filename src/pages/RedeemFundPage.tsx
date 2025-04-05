
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, ChevronRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

interface Fund {
  id: string;
  name: string;
  logo: string;
  nav: number;
  currentValue: number;
  units: number;
  purchaseNav: number;
  gains: number;
  gainsPercentage: number;
}

// Mock fund data - in a real app, this would come from an API
const getFundDetails = (fundId: string): Fund => {
  return {
    id: fundId,
    name: fundId === 'fund1' ? 'HDFC Mid-Cap Opportunities Fund' : 'Axis Bluechip Fund',
    logo: fundId === 'fund1' 
      ? 'https://www.hdfcfund.com/content/dam/abc-of-money/logo/hdfc-mutual-fund-logo.png'
      : 'https://www.axismf.com/assets/images/axis-logo.svg',
    nav: fundId === 'fund1' ? 36.67 : 25.85,
    currentValue: fundId === 'fund1' ? 36670 : 25850,
    units: fundId === 'fund1' ? 1000 : 1000,
    purchaseNav: fundId === 'fund1' ? 30.50 : 22.48,
    gains: fundId === 'fund1' ? 6170 : 3370,
    gainsPercentage: fundId === 'fund1' ? 20.23 : 15.00
  };
};

const RedeemFundPage: React.FC = () => {
  const { fundId } = useParams<{ fundId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const fund = getFundDetails(fundId || 'fund1');
  
  const [redeemMode, setRedeemMode] = useState<'amount' | 'units'>('amount');
  const [redeemAmount, setRedeemAmount] = useState<number>(Math.round(fund.currentValue / 2));
  const [redeemUnits, setRedeemUnits] = useState<number>(Math.round(fund.units / 2));
  const [redeemPercentage, setRedeemPercentage] = useState<number>(50);
  const [allUnits, setAllUnits] = useState<boolean>(false);
  
  // Calculate equivalent units or amount when the other changes
  const calculateUnits = (amount: number) => {
    return amount / fund.nav;
  };
  
  const calculateAmount = (units: number) => {
    return units * fund.nav;
  };
  
  const handleAmountChange = (value: string) => {
    const amount = parseFloat(value) || 0;
    const maxAmount = fund.currentValue;
    
    const validAmount = Math.min(amount, maxAmount);
    setRedeemAmount(validAmount);
    setRedeemUnits(calculateUnits(validAmount));
    setRedeemPercentage((validAmount / maxAmount) * 100);
    setAllUnits(validAmount >= maxAmount);
  };
  
  const handleUnitsChange = (value: string) => {
    const units = parseFloat(value) || 0;
    const maxUnits = fund.units;
    
    const validUnits = Math.min(units, maxUnits);
    setRedeemUnits(validUnits);
    setRedeemAmount(calculateAmount(validUnits));
    setRedeemPercentage((validUnits / maxUnits) * 100);
    setAllUnits(validUnits >= maxUnits);
  };
  
  const handleSliderChange = (value: number[]) => {
    const percentage = value[0];
    setRedeemPercentage(percentage);
    
    if (redeemMode === 'amount') {
      const amount = (fund.currentValue * percentage) / 100;
      setRedeemAmount(amount);
      setRedeemUnits(calculateUnits(amount));
    } else {
      const units = (fund.units * percentage) / 100;
      setRedeemUnits(units);
      setRedeemAmount(calculateAmount(units));
    }
    
    setAllUnits(percentage >= 99.9);
  };
  
  const handleAllUnitsToggle = (checked: boolean) => {
    setAllUnits(checked);
    
    if (checked) {
      setRedeemAmount(fund.currentValue);
      setRedeemUnits(fund.units);
      setRedeemPercentage(100);
    } else {
      setRedeemPercentage(50);
      setRedeemAmount(fund.currentValue / 2);
      setRedeemUnits(fund.units / 2);
    }
  };
  
  const handleConfirmRedeem = () => {
    toast({
      title: "Redemption Initiated",
      description: `Your redemption request for ₹${redeemAmount.toFixed(2)} (${redeemUnits.toFixed(2)} units) has been submitted.`,
      variant: "default",
    });
    
    // Navigate back to portfolio or details page
    navigate(-1);
  };
  
  const estimatedTax = redeemAmount * 0.10; // Approximate for display purposes
  const estimatedPayout = redeemAmount - estimatedTax;
  
  return (
    <div className="bg-app-teal-50 min-h-screen pb-20">
      <Header title="Redeem Fund" showBack />
      
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
                <span className="text-sm text-app-teal-700">NAV: ₹{fund.nav.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-app-teal-100">
            <div>
              <div className="text-sm text-app-teal-600">Current Value</div>
              <div className="font-semibold text-app-teal-900">₹{fund.currentValue.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-app-teal-600">Total Units</div>
              <div className="font-semibold text-app-teal-900">{fund.units.toFixed(3)}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-3 mt-2 border-t border-app-teal-100">
            <div>
              <div className="text-sm text-app-teal-600">Returns</div>
              <div className="font-semibold text-app-green">
                +₹{fund.gains.toLocaleString()} (+{fund.gainsPercentage.toFixed(2)}%)
              </div>
            </div>
            <div>
              <div className="text-sm text-app-teal-600">Purchase NAV</div>
              <div className="font-semibold text-app-teal-900">₹{fund.purchaseNav.toFixed(2)}</div>
            </div>
          </div>
        </div>
        
        {/* Redemption Options */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <h3 className="font-medium text-app-teal-900 mb-4">Redeem Options</h3>
          
          <RadioGroup 
            value={redeemMode} 
            onValueChange={(value) => setRedeemMode(value as 'amount' | 'units')}
            className="mb-4 flex space-x-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="amount" id="option-amount" />
              <Label htmlFor="option-amount">By Amount</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="units" id="option-units" />
              <Label htmlFor="option-units">By Units</Label>
            </div>
          </RadioGroup>
          
          {redeemMode === 'amount' ? (
            <div className="mb-4">
              <Label htmlFor="amount" className="text-app-teal-700">Amount to Redeem</Label>
              <div className="mt-1 relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-app-teal-700">₹</span>
                <Input
                  id="amount"
                  type="number"
                  value={redeemAmount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="pl-7 bg-white border-app-teal-200 focus-visible:ring-app-teal-500"
                  placeholder="Enter amount"
                />
              </div>
              <p className="text-xs text-app-teal-600 mt-1">
                Equivalent to {redeemUnits.toFixed(3)} units
              </p>
            </div>
          ) : (
            <div className="mb-4">
              <Label htmlFor="units" className="text-app-teal-700">Units to Redeem</Label>
              <Input
                id="units"
                type="number"
                value={redeemUnits}
                onChange={(e) => handleUnitsChange(e.target.value)}
                className="bg-white border-app-teal-200 focus-visible:ring-app-teal-500"
                placeholder="Enter units"
                step="0.001"
              />
              <p className="text-xs text-app-teal-600 mt-1">
                Equivalent to ₹{redeemAmount.toFixed(2)}
              </p>
            </div>
          )}
          
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-app-teal-700">{redeemPercentage.toFixed(0)}%</span>
              <span className="text-sm text-app-teal-700">100%</span>
            </div>
            <Slider
              value={[redeemPercentage]}
              onValueChange={handleSliderChange}
              max={100}
              step={1}
              className="[&>span]:bg-app-teal-600"
            />
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="all-units" className="text-app-teal-700">Redeem all units</Label>
            <Switch
              id="all-units"
              checked={allUnits}
              onCheckedChange={handleAllUnitsToggle}
              className="data-[state=checked]:bg-app-teal-600"
            />
          </div>
        </div>
        
        {/* Tax & Payout Information */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <h3 className="font-medium text-app-teal-900 mb-3">Redemption Details</h3>
          
          <div className="space-y-2 mb-3">
            <div className="flex justify-between">
              <span className="text-app-teal-700">Redemption Amount</span>
              <span className="text-app-teal-900">₹{redeemAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-app-teal-700">Estimated Tax (if applicable)</span>
              <span className="text-app-teal-900">₹{estimatedTax.toFixed(2)}</span>
            </div>
            <div className="border-t border-app-teal-100 pt-2 mt-2 flex justify-between">
              <span className="font-medium text-app-teal-800">Estimated Payout</span>
              <span className="font-medium text-app-teal-900">₹{estimatedPayout.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="bg-app-teal-50 p-3 rounded-lg flex items-start">
            <AlertTriangle size={18} className="text-app-orange mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-app-teal-800">
              Redemption will be processed at the NAV applicable for the next business day. Funds will typically be credited to your bank account within 2-3 business days.
            </p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <Button 
          onClick={handleConfirmRedeem} 
          className="w-full bg-app-teal-700 hover:bg-app-teal-800 text-white font-medium"
        >
          Confirm Redemption
        </Button>
      </div>
      
      <BottomNav activeTab="invest" />
    </div>
  );
};

export default RedeemFundPage;
