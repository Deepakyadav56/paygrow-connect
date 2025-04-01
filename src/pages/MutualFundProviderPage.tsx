
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, TrendingUp, ChevronRight, BadgePercent, List, Calendar, BriefcaseBusiness, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Badge } from '@/components/ui/badge';

// Mock data for mutual fund providers
const providers = [
  { id: 'sbi', name: 'SBI Mutual Fund', logo: '🏛️', fundCount: 48, aum: '₹7,52,956 Cr' },
  { id: 'hdfc', name: 'HDFC Mutual Fund', logo: '🏢', fundCount: 42, aum: '₹5,48,725 Cr' },
  { id: 'icici', name: 'ICICI Prudential', logo: '🟡', fundCount: 56, aum: '₹5,24,123 Cr' },
  { id: 'aditya', name: 'Aditya Birla Sun Life', logo: '🌞', fundCount: 52, aum: '₹3,15,481 Cr' },
  { id: 'axis', name: 'Axis Mutual Fund', logo: '🔵', fundCount: 37, aum: '₹2,98,672 Cr' },
  { id: 'kotak', name: 'Kotak Mahindra', logo: '🔴', fundCount: 40, aum: '₹2,87,349 Cr' },
  { id: 'nippon', name: 'Nippon India', logo: '🔹', fundCount: 45, aum: '₹2,78,123 Cr' },
  { id: 'dsp', name: 'DSP Mutual Fund', logo: '🔶', fundCount: 38, aum: '₹1,45,689 Cr' },
  { id: 'tata', name: 'Tata Mutual Fund', logo: '⭐', fundCount: 36, aum: '₹1,36,478 Cr' },
  { id: 'uti', name: 'UTI Mutual Fund', logo: '🔰', fundCount: 42, aum: '₹2,34,567 Cr' },
  { id: 'invesco', name: 'Invesco Mutual Fund', logo: '🟦', fundCount: 28, aum: '₹75,123 Cr' },
  { id: 'idfc', name: 'IDFC Mutual Fund', logo: '🟧', fundCount: 32, aum: '₹1,12,345 Cr' }
];

// Mock data for categories
const categories = [
  { id: 'eq-lc', name: 'Large Cap', icon: '📊', fundCount: 56 },
  { id: 'eq-mc', name: 'Mid Cap', icon: '📈', fundCount: 42 },
  { id: 'eq-sc', name: 'Small Cap', icon: '🚀', fundCount: 38 },
  { id: 'eq-fc', name: 'Flexi Cap', icon: '🔄', fundCount: 62 },
  { id: 'eq-multi', name: 'Multi Cap', icon: '📱', fundCount: 45 },
  { id: 'debt-st', name: 'Short Term Debt', icon: '📝', fundCount: 68 },
  { id: 'debt-lt', name: 'Long Term Debt', icon: '📃', fundCount: 52 },
  { id: 'liquid', name: 'Liquid Funds', icon: '💧', fundCount: 48 },
  { id: 'hybrid', name: 'Hybrid Funds', icon: '⚖️', fundCount: 58 },
  { id: 'index', name: 'Index Funds', icon: '📉', fundCount: 32 },
  { id: 'sectoral', name: 'Sectoral Funds', icon: '🏭', fundCount: 46 },
  { id: 'intl', name: 'International', icon: '🌎', fundCount: 28 }
];

// Top performing funds data
const topFunds = [
  {
    id: 'inv2',
    name: 'HDFC Mid-Cap Opportunities',
    category: 'Equity - Mid Cap',
    amc: 'HDFC Mutual Fund',
    logo: '🟠',
    rating: 4.8,
    returns: {
      oneYear: 15.8,
      threeYear: 9.5,
      fiveYear: 12.8
    },
    minInvestment: 1000,
    riskLevel: 'Moderately High'
  },
  {
    id: 'inv3',
    name: 'SBI Small Cap Fund',
    category: 'Equity - Small Cap',
    amc: 'SBI Mutual Fund',
    logo: '🟢',
    rating: 4.3,
    returns: {
      oneYear: 22.4,
      threeYear: 14.2,
      fiveYear: 16.5
    },
    minInvestment: 500,
    riskLevel: 'High'
  },
  {
    id: 'inv4',
    name: 'Parag Parikh Flexi Cap Fund',
    category: 'Equity - Flexi Cap',
    amc: 'PPFAS Mutual Fund',
    logo: '🟣',
    rating: 4.9,
    returns: {
      oneYear: 18.2,
      threeYear: 12.5,
      fiveYear: 15.1
    },
    minInvestment: 1000,
    riskLevel: 'Moderate'
  },
  {
    id: 'inv5',
    name: 'ICICI Prudential Technology Fund',
    category: 'Equity - Sectoral',
    amc: 'ICICI Prudential',
    logo: '🟡',
    rating: 4.6,
    returns: {
      oneYear: 24.1,
      threeYear: 15.8,
      fiveYear: 18.4
    },
    minInvestment: 1000,
    riskLevel: 'High'
  },
  {
    id: 'inv6',
    name: 'Kotak Emerging Equity Fund',
    category: 'Equity - Mid Cap',
    amc: 'Kotak Mahindra',
    logo: '🔴',
    rating: 4.5,
    returns: {
      oneYear: 17.3,
      threeYear: 10.2,
      fiveYear: 13.7
    },
    minInvestment: 1000,
    riskLevel: 'Moderately High'
  }
];

const MutualFundProviderPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const filteredProviders = providers.filter(provider => 
    provider.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredFunds = topFunds.filter(fund => 
    fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fund.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fund.amc.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="app-container">
      <Header 
        title="Mutual Funds" 
        showBack 
      />
      
      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search funds, AMCs or categories..." 
            className="pl-10 border-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="providers" className="w-full">
          <div className="border-b mb-4">
            <TabsList className="w-full justify-start px-0 bg-transparent">
              <TabsTrigger 
                value="providers" 
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-app-blue rounded-none bg-transparent"
              >
                Fund Houses
              </TabsTrigger>
              <TabsTrigger 
                value="categories" 
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-app-blue rounded-none bg-transparent"
              >
                Categories
              </TabsTrigger>
              <TabsTrigger 
                value="top" 
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-app-blue rounded-none bg-transparent"
              >
                Top Performers
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="providers" className="space-y-4 mt-0">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">All Fund Houses</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Filter size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Name: A to Z</DropdownMenuItem>
                  <DropdownMenuItem>AUM: High to Low</DropdownMenuItem>
                  <DropdownMenuItem>Fund Count: High to Low</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {filteredProviders.length > 0 ? (
              <div className="space-y-3">
                {filteredProviders.map((provider) => (
                  <div 
                    key={provider.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 flex items-center"
                    onClick={() => navigate(`/invest/provider/${provider.id}`)}
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 mr-4 text-2xl">
                      {provider.logo}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{provider.name}</h3>
                      <div className="flex text-xs text-gray-500 mt-1">
                        <span className="mr-3">{provider.fundCount} Funds</span>
                        <span>AUM: {provider.aum}</span>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-sm border border-gray-200">
                <Search size={32} className="text-gray-400 mb-3" />
                <h3 className="font-medium mb-1">No Fund Houses Found</h3>
                <p className="text-sm text-gray-600">
                  Try adjusting your search
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-4 mt-0">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Fund Categories</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Filter size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Name: A to Z</DropdownMenuItem>
                  <DropdownMenuItem>Fund Count: High to Low</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {filteredCategories.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {filteredCategories.map((category) => (
                  <div 
                    key={category.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 flex items-center"
                    onClick={() => navigate(`/invest/category/${category.id}`)}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 mr-3 text-xl">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{category.fundCount} Funds</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-sm border border-gray-200">
                <Search size={32} className="text-gray-400 mb-3" />
                <h3 className="font-medium mb-1">No Categories Found</h3>
                <p className="text-sm text-gray-600">
                  Try adjusting your search
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="top" className="space-y-4 mt-0">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Top Performing Funds</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Filter size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>1Y Returns: High to Low</DropdownMenuItem>
                  <DropdownMenuItem>3Y Returns: High to Low</DropdownMenuItem>
                  <DropdownMenuItem>Rating: High to Low</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar mb-2">
              <Badge className="bg-app-light-blue text-app-blue hover:bg-app-light-blue border border-app-blue/20">
                <TrendingUp size={14} className="mr-1" /> 1Y Top Performers
              </Badge>
              <Badge className="bg-white text-gray-600 hover:bg-gray-100 border border-gray-300">
                <BadgePercent size={14} className="mr-1" /> High Returns
              </Badge>
              <Badge className="bg-white text-gray-600 hover:bg-gray-100 border border-gray-300">
                <List size={14} className="mr-1" /> Consistent Returns
              </Badge>
              <Badge className="bg-white text-gray-600 hover:bg-gray-100 border border-gray-300">
                <Calendar size={14} className="mr-1" /> New Launches
              </Badge>
            </div>
            
            {filteredFunds.length > 0 ? (
              <div className="space-y-3">
                {filteredFunds.map((fund) => (
                  <div 
                    key={fund.id}
                    className="bg-white border border-gray-200 rounded-xl p-4"
                    onClick={() => navigate(`/invest/fund/${fund.id}`)}
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 mr-3 text-xl">
                        {fund.logo}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{fund.name}</h3>
                        <p className="text-xs text-gray-500">{fund.category} • {fund.amc}</p>
                      </div>
                      <ChevronRight size={20} className="text-gray-400" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">1Y Returns</div>
                        <div className="text-app-green font-medium">+{fund.returns.oneYear}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Risk Level</div>
                        <div className="font-medium">{fund.riskLevel}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Min. Invest</div>
                        <div className="font-medium">₹{fund.minInvestment}</div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/invest/options/${fund.id}`);
                      }}
                    >
                      Invest Now
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-sm border border-gray-200">
                <Search size={32} className="text-gray-400 mb-3" />
                <h3 className="font-medium mb-1">No Funds Found</h3>
                <p className="text-sm text-gray-600">
                  Try adjusting your search
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default MutualFundProviderPage;
