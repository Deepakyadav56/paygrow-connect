
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, TrendingUp, BarChart3, Calendar, Search, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvestmentCard from '@/components/InvestmentCard';

const MutualFundProviderPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  
  const filters = [
    { id: 'all', name: 'All' },
    { id: 'highReturn', name: 'High Return' },
    { id: 'popular', name: 'Popular' },
    { id: 'lowRisk', name: 'Low Risk' },
    { id: 'taxSaver', name: 'Tax Saver' },
  ];
  
  const funds = [
    { 
      id: 'fund1',
      name: 'Axis Bluechip Fund',
      category: 'Equity - Large Cap',
      value: 0,
      change: 0,
      changePercentage: 12.5,
      oneYearReturn: 12.5,
      threeYearReturn: 8.7,
      fiveYearReturn: 11.2,
      risk: 'Moderate'
    },
    { 
      id: 'fund2',
      name: 'HDFC Mid-Cap Opportunities',
      category: 'Equity - Mid Cap',
      value: 0,
      change: 0,
      changePercentage: 18.3,
      oneYearReturn: 18.3,
      threeYearReturn: 15.1,
      fiveYearReturn: 14.8,
      risk: 'High'
    },
    { 
      id: 'fund3',
      name: 'SBI Small Cap Fund',
      category: 'Equity - Small Cap',
      value: 0,
      change: 0,
      changePercentage: 22.6,
      oneYearReturn: 22.6,
      threeYearReturn: 19.4,
      fiveYearReturn: 16.5,
      risk: 'High'
    },
    { 
      id: 'fund4',
      name: 'Kotak Corporate Bond Fund',
      category: 'Debt - Corporate Bond',
      value: 0,
      change: 0,
      changePercentage: 6.8,
      oneYearReturn: 6.8,
      threeYearReturn: 7.2,
      fiveYearReturn: 7.5,
      risk: 'Low'
    },
    { 
      id: 'fund5',
      name: 'Parag Parikh Flexi Cap Fund',
      category: 'Equity - Flexi Cap',
      value: 0,
      change: 0,
      changePercentage: 15.7,
      oneYearReturn: 15.7,
      threeYearReturn: 12.9,
      fiveYearReturn: 13.8,
      risk: 'Moderate'
    },
    { 
      id: 'fund6',
      name: 'Aditya Birla SL Tax Relief 96',
      category: 'Equity - ELSS',
      value: 0,
      change: 0,
      changePercentage: 14.2,
      oneYearReturn: 14.2,
      threeYearReturn: 10.8,
      fiveYearReturn: 12.4,
      risk: 'Moderate'
    },
  ];
  
  // Filter funds based on search query and selected filter
  const filteredFunds = funds.filter(fund => {
    const matchesSearch = fund.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        fund.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    switch (selectedFilter) {
      case 'highReturn':
        return fund.oneYearReturn > 15;
      case 'popular':
        return ['fund1', 'fund2', 'fund5'].includes(fund.id);
      case 'lowRisk':
        return fund.risk === 'Low';
      case 'taxSaver':
        return fund.category.includes('ELSS');
      default:
        return true;
    }
  });
  
  const handleFundSelect = (fundId: string) => {
    navigate(`/invest/fund/${fundId}`);
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
          <h1 className="text-lg font-semibold ml-2">Explore Mutual Funds</h1>
        </div>
        
        <div className="px-6 pb-4">
          <div className="flex space-x-3 mb-4">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search mutual funds"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
            </div>
            
            <button className="button-icon">
              <Filter size={20} />
            </button>
          </div>
          
          <div className="overflow-x-auto pb-2 -mx-1">
            <div className="flex space-x-2 px-1">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedFilter === filter.id 
                      ? 'bg-app-blue text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setSelectedFilter(filter.id)}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="allFunds" className="w-full">
          <TabsList className="grid grid-cols-3 mb-2">
            <TabsTrigger value="allFunds">All Funds</TabsTrigger>
            <TabsTrigger value="equity">Equity</TabsTrigger>
            <TabsTrigger value="debt">Debt</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="p-6 space-y-4">
        <TabsContent value="allFunds" className="mt-0 space-y-4">
          {filteredFunds.map(fund => (
            <InvestmentCard
              key={fund.id}
              name={fund.name}
              category={fund.category}
              value={fund.value}
              change={fund.change}
              changePercentage={fund.changePercentage}
              oneYearReturn={fund.oneYearReturn}
              threeYearReturn={fund.threeYearReturn}
              fiveYearReturn={fund.fiveYearReturn}
              onClick={() => handleFundSelect(fund.id)}
            />
          ))}
          
          {filteredFunds.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-500">No funds match your search criteria</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="equity" className="mt-0 space-y-4">
          {filteredFunds
            .filter(fund => fund.category.includes('Equity'))
            .map(fund => (
              <InvestmentCard
                key={fund.id}
                name={fund.name}
                category={fund.category}
                value={fund.value}
                change={fund.change}
                changePercentage={fund.changePercentage}
                oneYearReturn={fund.oneYearReturn}
                threeYearReturn={fund.threeYearReturn}
                fiveYearReturn={fund.fiveYearReturn}
                onClick={() => handleFundSelect(fund.id)}
              />
            ))}
        </TabsContent>
        
        <TabsContent value="debt" className="mt-0 space-y-4">
          {filteredFunds
            .filter(fund => fund.category.includes('Debt'))
            .map(fund => (
              <InvestmentCard
                key={fund.id}
                name={fund.name}
                category={fund.category}
                value={fund.value}
                change={fund.change}
                changePercentage={fund.changePercentage}
                oneYearReturn={fund.oneYearReturn}
                threeYearReturn={fund.threeYearReturn}
                fiveYearReturn={fund.fiveYearReturn}
                onClick={() => handleFundSelect(fund.id)}
              />
            ))}
        </TabsContent>
      </div>
    </div>
  );
};

export default MutualFundProviderPage;
