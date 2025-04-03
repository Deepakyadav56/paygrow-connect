import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Filter, Check, ArrowUpDown, ChevronDown, Search } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

interface FilterOption {
  id: string;
  name: string;
  checked: boolean;
}

interface FundHouse {
  id: string;
  name: string;
  checked: boolean;
}

const MutualFundFiltersPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [expenseRatio, setExpenseRatio] = useState<[number, number]>([0, 2.5]);
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [indexFundsOnly, setIndexFundsOnly] = useState<boolean>(false);
  const [fundHouseSearch, setFundHouseSearch] = useState<string>('');
  
  // Risk level options
  const [riskLevels, setRiskLevels] = useState<FilterOption[]>([
    { id: 'low', name: 'Low Risk', checked: false },
    { id: 'moderate-low', name: 'Moderately Low', checked: false },
    { id: 'moderate', name: 'Moderate Risk', checked: false },
    { id: 'moderate-high', name: 'Moderately High', checked: false },
    { id: 'high', name: 'High Risk', checked: false },
    { id: 'very-high', name: 'Very High', checked: false },
  ]);
  
  // Fund categories
  const [categories, setCategories] = useState<FilterOption[]>([
    { id: 'equity', name: 'Equity', checked: false },
    { id: 'debt', name: 'Debt', checked: false },
    { id: 'hybrid', name: 'Hybrid', checked: false },
    { id: 'commodities', name: 'Commodities', checked: false },
    { id: 'equity-large-cap', name: 'Large Cap', checked: false },
    { id: 'equity-mid-cap', name: 'Mid Cap', checked: false },
    { id: 'equity-small-cap', name: 'Small Cap', checked: false },
    { id: 'equity-multi-cap', name: 'Multi Cap', checked: false },
    { id: 'equity-flexi-cap', name: 'Flexi Cap', checked: false },
    { id: 'equity-elss', name: 'ELSS (Tax Saving)', checked: false },
    { id: 'equity-sectoral', name: 'Sectoral/Thematic', checked: false },
    { id: 'debt-short', name: 'Short Term Debt', checked: false },
    { id: 'debt-medium', name: 'Medium Term Debt', checked: false },
    { id: 'debt-long', name: 'Long Term Debt', checked: false },
    { id: 'debt-liquid', name: 'Liquid Funds', checked: false },
    { id: 'hybrid-aggressive', name: 'Aggressive Hybrid', checked: false },
    { id: 'hybrid-conservative', name: 'Conservative Hybrid', checked: false },
    { id: 'hybrid-balanced', name: 'Balanced Advantage', checked: false },
  ]);
  
  // Fund Houses (added as in Groww)
  const [fundHouses, setFundHouses] = useState<FundHouse[]>([
    { id: '360one', name: '360 ONE Mutual Fund', checked: false },
    { id: 'aditya-birla', name: 'Aditya Birla Sun Life Mutual Fund', checked: false },
    { id: 'axis', name: 'Axis Mutual Fund', checked: false },
    { id: 'baroda-bnp', name: 'Baroda BNP Paribas Mutual Fund', checked: false },
    { id: 'canara-robeco', name: 'Canara Robeco Mutual Fund', checked: false },
    { id: 'dsp', name: 'DSP Mutual Fund', checked: false },
    { id: 'franklin', name: 'Franklin Templeton Mutual Fund', checked: false },
    { id: 'hdfc', name: 'HDFC Mutual Fund', checked: false },
    { id: 'icici', name: 'ICICI Prudential Mutual Fund', checked: false },
    { id: 'invesco', name: 'Invesco Mutual Fund', checked: false },
    { id: 'kotak', name: 'Kotak Mahindra Mutual Fund', checked: false },
    { id: 'mirae', name: 'Mirae Asset Mutual Fund', checked: false },
    { id: 'motilal', name: 'Motilal Oswal Mutual Fund', checked: false },
    { id: 'nippon', name: 'Nippon India Mutual Fund', checked: false },
    { id: 'sbi', name: 'SBI Mutual Fund', checked: false },
    { id: 'tata', name: 'Tata Mutual Fund', checked: false },
    { id: 'uti', name: 'UTI Mutual Fund', checked: false },
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
    { id: '5star', name: '5 ★', checked: false },
    { id: '4star', name: '4 ★', checked: false },
    { id: '3star', name: '3 ★', checked: false },
    { id: '2star', name: '2 ★', checked: false },
    { id: '1star', name: '1 ★', checked: false },
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

  const toggleFundHouse = (fundHouseId: string) => {
    const newFundHouses = fundHouses.map(house => 
      house.id === fundHouseId ? { ...house, checked: !house.checked } : house
    );
    setFundHouses(newFundHouses);
    
    // Update active filters list
    const selectedHouse = fundHouses.find(house => house.id === fundHouseId);
    if (selectedHouse) {
      if (selectedHouse.checked) {
        // Remove from active filters
        setActiveFilters(prev => prev.filter(id => id !== fundHouseId));
      } else {
        // Add to active filters
        setActiveFilters(prev => [...prev, fundHouseId]);
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
    setFundHouses(fundHouses.map(item => ({ ...item, checked: false })));
    setSortBy('popularity');
    setIndexFundsOnly(false);
    setActiveFilters([]);
  };
  
  const getActiveFilterCount = () => {
    let count = activeFilters.length;
    if (returnsTimeframe !== '1y') count++;
    if (expenseRatio[0] > 0 || expenseRatio[1] < 2.5) count++;
    if (indexFundsOnly) count++;
    if (sortBy !== 'popularity') count++;
    return count;
  };

  const getFilteredFundCount = () => {
    // In a real app, this would calculate the actual count based on filters
    // For now, return a mock count that increases with more filters
    return 1482 - (getActiveFilterCount() * 100);
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
          fundHouses: fundHouses.filter(f => f.checked).map(f => f.id),
          sortBy,
          indexFundsOnly,
        }
      }
    });
  };

  // Filter fund houses based on search
  const filteredFundHouses = fundHouses.filter(house => 
    house.name.toLowerCase().includes(fundHouseSearch.toLowerCase())
  );
  
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

        {/* Main Tabs - Groww style */}
        <Tabs defaultValue="filters" className="mb-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="filters">Filters</TabsTrigger>
            <TabsTrigger value="sort">Sort</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sort" className="py-2">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center px-2 py-3 rounded-lg hover:bg-gray-50" onClick={() => setSortBy('popularity')}>
                <div className="flex-1">Popularity</div>
                {sortBy === 'popularity' && <Check size={18} className="text-green-600" />}
              </div>
              <div className="flex items-center px-2 py-3 rounded-lg hover:bg-gray-50" onClick={() => setSortBy('1y')}>
                <div className="flex-1">1Y Returns</div>
                {sortBy === '1y' && <Check size={18} className="text-green-600" />}
              </div>
              <div className="flex items-center px-2 py-3 rounded-lg hover:bg-gray-50" onClick={() => setSortBy('3y')}>
                <div className="flex-1">3Y Returns</div>
                {sortBy === '3y' && <Check size={18} className="text-green-600" />}
              </div>
              <div className="flex items-center px-2 py-3 rounded-lg hover:bg-gray-50" onClick={() => setSortBy('5y')}>
                <div className="flex-1">5Y Returns</div>
                {sortBy === '5y' && <Check size={18} className="text-green-600" />}
              </div>
              <div className="flex items-center px-2 py-3 rounded-lg hover:bg-gray-50" onClick={() => setSortBy('rating')}>
                <div className="flex-1">Rating</div>
                {sortBy === 'rating' && <Check size={18} className="text-green-600" />}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="filters" className="mt-0">
            {/* Index Funds Only Toggle */}
            <div className="flex items-center justify-between py-4 border-b">
              <span className="text-sm font-medium">Index Funds Only</span>
              <Switch
                checked={indexFundsOnly}
                onCheckedChange={setIndexFundsOnly}
              />
            </div>
        
            {activeFilters.length > 0 && (
              <div className="my-4 flex flex-wrap gap-2">
                {activeFilters.map(filterId => {
                  const allOptions = [...riskLevels, ...categories, ...investmentTypes, 
                                   ...aumSizes, ...fundTypes, ...ratings, ...exitLoads, ...dividendTypes];
                  const fundHouseOption = fundHouses.find(h => h.id === filterId);
                  const option = allOptions.find(opt => opt.id === filterId) || fundHouseOption;
                  
                  if (!option) return null;
                  
                  return (
                    <Badge key={filterId} variant="outline" className="flex items-center gap-1">
                      {option.name}
                      <button 
                        onClick={() => {
                          if (fundHouseOption) {
                            toggleFundHouse(filterId);
                          } else {
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
                          }
                        }}
                        className="ml-1 rounded-full"
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  );
                })}
                {(indexFundsOnly || sortBy !== 'popularity') && (
                  <>
                    {indexFundsOnly && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        Index Funds Only
                        <button onClick={() => setIndexFundsOnly(false)} className="ml-1 rounded-full">
                          <X size={14} />
                        </button>
                      </Badge>
                    )}
                    {sortBy !== 'popularity' && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        Sort: {sortBy === '1y' ? '1Y Returns' : sortBy === '3y' ? '3Y Returns' : 
                               sortBy === '5y' ? '5Y Returns' : 'Rating'}
                        <button onClick={() => setSortBy('popularity')} className="ml-1 rounded-full">
                          <X size={14} />
                        </button>
                      </Badge>
                    )}
                  </>
                )}
              </div>
            )}
            
            <ScrollArea className="h-[calc(100vh-250px)]">
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
                    <div className="space-y-3">
                      <div className="font-medium text-sm mb-1">Main Categories</div>
                      <div className="space-y-2">
                        {categories.slice(0, 4).map((option) => (
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
                      
                      <Separator className="my-2" />
                      <div className="font-medium text-sm mb-1">Subcategories</div>
                      <div className="space-y-2">
                        {categories.slice(4).map((option) => (
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
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="fund-house">
                  <AccordionTrigger>Fund House</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search fund house"
                          className="pl-8"
                          value={fundHouseSearch}
                          onChange={(e) => setFundHouseSearch(e.target.value)}
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto space-y-2 mt-2">
                        {filteredFundHouses.map((house) => (
                          <div key={house.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={house.id} 
                              checked={house.checked}
                              onCheckedChange={() => toggleFundHouse(house.id)}
                            />
                            <label 
                              htmlFor={house.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {house.name}
                            </label>
                          </div>
                        ))}
                        {filteredFundHouses.length === 0 && (
                          <div className="text-sm text-muted-foreground py-2 text-center">
                            No fund houses found
                          </div>
                        )}
                      </div>
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
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <Button 
          className="w-full bg-green-600 hover:bg-green-700 text-white" 
          onClick={applyFilters}
        >
          View {getFilteredFundCount()} funds
        </Button>
      </div>
    </div>
  );
};

export default MutualFundFiltersPage;
