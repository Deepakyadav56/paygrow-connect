
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Filter, Check, ArrowUpDown, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';

interface FilterOption {
  id: string;
  name: string;
  checked: boolean;
}

const MutualFundFiltersPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [expenseRatio, setExpenseRatio] = useState<[number, number]>([0, 2.5]);
  
  // Risk level options
  const [riskLevels, setRiskLevels] = useState<FilterOption[]>([
    { id: 'low', name: 'Low Risk', checked: false },
    { id: 'moderate', name: 'Moderate Risk', checked: false },
    { id: 'high', name: 'High Risk', checked: false },
  ]);
  
  // Fund categories
  const [categories, setCategories] = useState<FilterOption[]>([
    { id: 'equity-large-cap', name: 'Large Cap', checked: false },
    { id: 'equity-mid-cap', name: 'Mid Cap', checked: false },
    { id: 'equity-small-cap', name: 'Small Cap', checked: false },
    { id: 'equity-multi-cap', name: 'Multi Cap', checked: false },
    { id: 'equity-elss', name: 'ELSS (Tax Saving)', checked: false },
    { id: 'debt-short', name: 'Short Term Debt', checked: false },
    { id: 'debt-medium', name: 'Medium Term Debt', checked: false },
    { id: 'debt-long', name: 'Long Term Debt', checked: false },
    { id: 'debt-liquid', name: 'Liquid Funds', checked: false },
    { id: 'hybrid-aggressive', name: 'Aggressive Hybrid', checked: false },
    { id: 'hybrid-conservative', name: 'Conservative Hybrid', checked: false },
    { id: 'hybrid-balanced', name: 'Balanced Advantage', checked: false },
    { id: 'index-nifty50', name: 'Nifty 50 Index', checked: false },
    { id: 'index-sensex', name: 'Sensex Index', checked: false },
    { id: 'index-next50', name: 'Nifty Next 50 Index', checked: false },
    { id: 'thematic-banking', name: 'Banking Sector', checked: false },
    { id: 'thematic-it', name: 'IT Sector', checked: false },
    { id: 'thematic-pharma', name: 'Pharma Sector', checked: false },
    { id: 'thematic-infra', name: 'Infrastructure', checked: false },
    { id: 'international-us', name: 'US Equity', checked: false },
    { id: 'international-global', name: 'Global Equity', checked: false },
  ]);
  
  // Investment types
  const [investmentTypes, setInvestmentTypes] = useState<FilterOption[]>([
    { id: 'lumpsum', name: 'Lumpsum (One-time)', checked: false },
    { id: 'sip', name: 'SIP (Monthly)', checked: false },
  ]);
  
  // Returns timeframe
  const [returnsTimeframe, setReturnsTimeframe] = useState<string>('1y');
  
  // AUM size
  const [aumSizes, setAumSizes] = useState<FilterOption[]>([
    { id: 'small', name: 'Less than ₹500 Cr', checked: false },
    { id: 'medium', name: '₹500 Cr to ₹5000 Cr', checked: false },
    { id: 'large', name: 'More than ₹5000 Cr', checked: false },
  ]);
  
  // Fund type
  const [fundTypes, setFundTypes] = useState<FilterOption[]>([
    { id: 'direct', name: 'Direct (Lower Expense)', checked: false },
    { id: 'regular', name: 'Regular', checked: false },
  ]);
  
  // Ratings
  const [ratings, setRatings] = useState<FilterOption[]>([
    { id: '5star', name: '5 Star', checked: false },
    { id: '4star', name: '4 Star', checked: false },
    { id: '3star', name: '3 Star', checked: false },
  ]);
  
  // Exit load
  const [exitLoads, setExitLoads] = useState<FilterOption[]>([
    { id: 'no-exit-load', name: 'No Exit Load', checked: false },
    { id: 'less-than-1', name: 'Less than 1%', checked: false },
    { id: 'more-than-1', name: 'More than 1%', checked: false },
  ]);
  
  // Dividend type
  const [dividendTypes, setDividendTypes] = useState<FilterOption[]>([
    { id: 'growth', name: 'Growth', checked: false },
    { id: 'dividend', name: 'Dividend Payout', checked: false },
  ]);
  
  const toggleFilterOption = (
    options: FilterOption[],
    setOptions: React.Dispatch<React.SetStateAction<FilterOption[]>>,
    optionId: string
  ) => {
    const newOptions = options.map(option => 
      option.id === optionId ? { ...option, checked: !option.checked } : option
    );
    setOptions(newOptions);
    
    // Update active filters list
    const selectedOption = options.find(option => option.id === optionId);
    if (selectedOption) {
      if (selectedOption.checked) {
        // Remove from active filters
        setActiveFilters(prev => prev.filter(id => id !== optionId));
      } else {
        // Add to active filters
        setActiveFilters(prev => [...prev, optionId]);
      }
    }
  };
  
  const resetAllFilters = () => {
    setRiskLevels(riskLevels.map(item => ({ ...item, checked: false })));
    setCategories(categories.map(item => ({ ...item, checked: false })));
    setInvestmentTypes(investmentTypes.map(item => ({ ...item, checked: false })));
    setReturnsTimeframe('1y');
    setExpenseRatio([0, 2.5]);
    setAumSizes(aumSizes.map(item => ({ ...item, checked: false })));
    setFundTypes(fundTypes.map(item => ({ ...item, checked: false })));
    setRatings(ratings.map(item => ({ ...item, checked: false })));
    setExitLoads(exitLoads.map(item => ({ ...item, checked: false })));
    setDividendTypes(dividendTypes.map(item => ({ ...item, checked: false })));
    setActiveFilters([]);
  };
  
  const getActiveFilterCount = () => {
    let count = activeFilters.length;
    if (returnsTimeframe !== '1y') count++;
    if (expenseRatio[0] > 0 || expenseRatio[1] < 2.5) count++;
    return count;
  };
  
  const applyFilters = () => {
    // In a real app, we'd pass these filters to the mutual funds list page
    navigate('/invest/mutual-funds', { 
      state: { 
        filters: {
          riskLevels: riskLevels.filter(r => r.checked).map(r => r.id),
          categories: categories.filter(c => c.checked).map(c => c.id),
          investmentTypes: investmentTypes.filter(i => i.checked).map(i => i.id),
          returnsTimeframe,
          expenseRatio,
          aumSizes: aumSizes.filter(a => a.checked).map(a => a.id),
          fundTypes: fundTypes.filter(f => f.checked).map(f => f.id),
          ratings: ratings.filter(r => r.checked).map(r => r.id),
          exitLoads: exitLoads.filter(e => e.checked).map(e => e.id),
          dividendTypes: dividendTypes.filter(d => d.checked).map(d => d.id),
        }
      }
    });
  };
  
  return (
    <div className="app-container">
      <Header title="Fund Filters" showBack />
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Filter size={18} className="mr-2 text-gray-600" />
            <h2 className="font-medium">Filter Mutual Funds</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={resetAllFilters}>
            Reset All
          </Button>
        </div>
        
        {activeFilters.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {activeFilters.map(filterId => {
              const allOptions = [...riskLevels, ...categories, ...investmentTypes, 
                                 ...aumSizes, ...fundTypes, ...ratings, ...exitLoads, ...dividendTypes];
              const option = allOptions.find(opt => opt.id === filterId);
              
              if (!option) return null;
              
              return (
                <Badge key={filterId} variant="outline" className="flex items-center gap-1">
                  {option.name}
                  <button 
                    onClick={() => {
                      const category = [
                        { list: riskLevels, setter: setRiskLevels },
                        { list: categories, setter: setCategories },
                        { list: investmentTypes, setter: setInvestmentTypes },
                        { list: aumSizes, setter: setAumSizes },
                        { list: fundTypes, setter: setFundTypes },
                        { list: ratings, setter: setRatings },
                        { list: exitLoads, setter: setExitLoads },
                        { list: dividendTypes, setter: setDividendTypes },
                      ].find(cat => cat.list.some(item => item.id === filterId));
                      
                      if (category) {
                        toggleFilterOption(category.list, category.setter, filterId);
                      }
                    }}
                    className="ml-1 rounded-full"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              );
            })}
          </div>
        )}
        
        <ScrollArea className="h-[calc(100vh-180px)]">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="risk-level">
              <AccordionTrigger>Risk Level</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {riskLevels.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={option.id} 
                        checked={option.checked}
                        onCheckedChange={() => toggleFilterOption(riskLevels, setRiskLevels, option.id)}
                      />
                      <label 
                        htmlFor={option.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.name}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="categories">
              <AccordionTrigger>Fund Categories</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {categories.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={option.id} 
                        checked={option.checked}
                        onCheckedChange={() => toggleFilterOption(categories, setCategories, option.id)}
                      />
                      <label 
                        htmlFor={option.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.name}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="investment-type">
              <AccordionTrigger>Investment Type</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {investmentTypes.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={option.id} 
                        checked={option.checked}
                        onCheckedChange={() => toggleFilterOption(investmentTypes, setInvestmentTypes, option.id)}
                      />
                      <label 
                        htmlFor={option.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.name}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="returns">
              <AccordionTrigger>Returns</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Time Period
                    </label>
                    <Select value={returnsTimeframe} onValueChange={setReturnsTimeframe}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1y">1 Year</SelectItem>
                        <SelectItem value="3y">3 Years</SelectItem>
                        <SelectItem value="5y">5 Years</SelectItem>
                        <SelectItem value="10y">10 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Sort By
                    </label>
                    <Select defaultValue="high">
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">Highest to Lowest</SelectItem>
                        <SelectItem value="low">Lowest to Highest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="expense-ratio">
              <AccordionTrigger>Expense Ratio</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6 px-1">
                  <Slider
                    value={expenseRatio}
                    min={0}
                    max={2.5}
                    step={0.1}
                    onValueChange={(values) => setExpenseRatio(values as [number, number])}
                    className="mt-6"
                  />
                  <div className="flex justify-between">
                    <div className="text-sm">{expenseRatio[0]}%</div>
                    <div className="text-sm">{expenseRatio[1]}%</div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <div>Lower</div>
                    <div>Higher</div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="aum-size">
              <AccordionTrigger>Fund Size (AUM)</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {aumSizes.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={option.id} 
                        checked={option.checked}
                        onCheckedChange={() => toggleFilterOption(aumSizes, setAumSizes, option.id)}
                      />
                      <label 
                        htmlFor={option.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.name}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="fund-type">
              <AccordionTrigger>Fund Type</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {fundTypes.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={option.id} 
                        checked={option.checked}
                        onCheckedChange={() => toggleFilterOption(fundTypes, setFundTypes, option.id)}
                      />
                      <label 
                        htmlFor={option.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.name}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="ratings">
              <AccordionTrigger>Fund Rating</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {ratings.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={option.id} 
                        checked={option.checked}
                        onCheckedChange={() => toggleFilterOption(ratings, setRatings, option.id)}
                      />
                      <label 
                        htmlFor={option.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                      >
                        {option.name}
                        {option.id === '5star' && <span className="ml-1 text-yellow-500">★★★★★</span>}
                        {option.id === '4star' && <span className="ml-1 text-yellow-500">★★★★<span className="text-gray-300">★</span></span>}
                        {option.id === '3star' && <span className="ml-1 text-yellow-500">★★★<span className="text-gray-300">★★</span></span>}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="exit-load">
              <AccordionTrigger>Exit Load</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {exitLoads.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={option.id} 
                        checked={option.checked}
                        onCheckedChange={() => toggleFilterOption(exitLoads, setExitLoads, option.id)}
                      />
                      <label 
                        htmlFor={option.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.name}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="dividend-type">
              <AccordionTrigger>Dividend Type</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {dividendTypes.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={option.id} 
                        checked={option.checked}
                        onCheckedChange={() => toggleFilterOption(dividendTypes, setDividendTypes, option.id)}
                      />
                      <label 
                        htmlFor={option.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.name}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <Button 
          className="w-full" 
          onClick={applyFilters}
        >
          Apply {getActiveFilterCount() > 0 ? `(${getActiveFilterCount()})` : ''} Filters
        </Button>
      </div>
    </div>
  );
};

export default MutualFundFiltersPage;
