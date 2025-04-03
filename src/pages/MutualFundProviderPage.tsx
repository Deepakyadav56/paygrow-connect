
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Download, 
  Megaphone, 
  Percent, 
  Scale,
  SlidersHorizontal,
  ArrowDownUp,
  Star,
  X,
  Building2,
  BarChart3,
  TrendingUp,
  Rocket,
  RefreshCw
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toggle } from '@/components/ui/toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import InvestmentInsights from '@/components/InvestmentInsights';
import BottomNav from '@/components/BottomNav';
import Header from '@/components/Header';
import PopularFunds from '@/components/PopularFunds';
import FundCollections from '@/components/FundCollections';
import ProductsTools from '@/components/ProductsTools';
import CartSection from '@/components/CartSection';
import FundListItem from '@/components/FundListItem';
import MutualFundFilters from '@/components/MutualFundFilters';
import FilterChips from '@/components/FilterChips';
import GrowwFunds from '@/components/GrowwFunds';

// Define mock data for popular funds
const popularFunds = [
  { 
    id: 'motilal-midcap', 
    name: 'Motilal Oswal Midcap Fund', 
    logo: <div className="w-full h-full bg-yellow-500 rounded"></div>, 
    category: 'Equity', 
    subCategory: 'Mid Cap', 
    rating: 5,
    returns: { value: '28.82%', period: '3Y' } 
  },
  { 
    id: 'parag-parikh', 
    name: 'Parag Parikh Flexi Cap Fund', 
    logo: <div className="w-full h-full bg-green-500 rounded"><span className="text-white text-xs">PP</span></div>, 
    category: 'Equity', 
    subCategory: 'Flexi Cap', 
    rating: 5,
    returns: { value: '17.12%', period: '3Y' } 
  }
];

// Define mock data for collections
const collections = [
  { id: 'high-return', name: 'High return', icon: <div className="w-full h-full bg-green-100 p-2"><img src="/lovable-uploads/d60d3780-4d3b-4864-8a1b-d40f4a35e170.png" alt="High return" className="w-full h-full object-contain" /></div> },
  { id: 'sip-500', name: 'SIP with ₹500', icon: <div className="w-full h-full bg-green-100 p-2"><img src="/lovable-uploads/68a7d2cd-12c8-437a-b325-775b60a21ed5.png" alt="SIP with ₹500" className="w-full h-full object-contain" /></div> },
  { id: 'tax-saving', name: 'Tax Saving', icon: <div className="w-full h-full bg-green-100 p-2"><img src="/lovable-uploads/3efe8440-a13a-4e5e-b8f7-9423edf3cb1c.png" alt="Tax Saving" className="w-full h-full object-contain" /></div> },
  { id: 'large-cap', name: 'Large Cap', icon: <div className="w-full h-full bg-green-100 p-2"><img src="/lovable-uploads/8f1794b6-d829-448c-be43-51e80cb59972.png" alt="Large Cap" className="w-full h-full object-contain" /></div> },
  { id: 'mid-cap', name: 'Mid Cap', icon: <div className="w-full h-full bg-green-100 p-2"><img src="/lovable-uploads/c201a798-86e4-49f2-8b2f-d001302a8bdb.png" alt="Mid Cap" className="w-full h-full object-contain" /></div> },
  { id: 'small-cap', name: 'Small Cap', icon: <div className="w-full h-full bg-green-100 p-2"><img src="/lovable-uploads/251b699d-b0e0-4db7-b9a9-fe93aaf8ddca.png" alt="Small Cap" className="w-full h-full object-contain" /></div> }
];

// Define mock data for products & tools
const productTools = [
  { id: 'import', name: 'Import funds', icon: <Download className="text-green-500" />, link: '/invest/import' },
  { id: 'nfos', name: 'NFOs', icon: <Megaphone className="text-green-500" />, badge: 2, link: '/invest/nfos' },
  { id: 'sip-calc', name: 'SIP calculator', icon: <Percent className="text-green-500" />, link: '/invest/sip-calculator' },
  { id: 'compare', name: 'Compare funds', icon: <Scale className="text-green-500" />, link: '/invest/compare' }
];

// Define mock data for funds by Groww
const growwFunds = [
  { 
    id: 'groww-value', 
    name: 'Groww Value Fund', 
    logo: <div className="rounded-full overflow-hidden bg-gradient-to-b from-blue-500 to-cyan-400"><div className="h-full w-full bg-white rounded-t-full" style={{height: '50%'}}></div></div>, 
    returns: { value: '14.58%', period: '3Y' } 
  },
  { 
    id: 'groww-large-cap', 
    name: 'Groww Large Cap Fund', 
    logo: <div className="rounded-full overflow-hidden bg-gradient-to-b from-blue-500 to-cyan-400"><div className="h-full w-full bg-white rounded-t-full" style={{height: '50%'}}></div></div>, 
    returns: { value: '12.35%', period: '3Y' } 
  }
];

// Define mock data for all mutual funds list
const allMutualFunds = [
  { 
    id: 'motilal-midcap', 
    name: 'Motilal Oswal Midcap Fund', 
    logo: <div className="w-full h-full bg-yellow-500 rounded"></div>, 
    category: 'Equity', 
    subCategory: 'Mid Cap', 
    rating: 5,
    returns: { value: '28.82%', period: '3Y' } 
  },
  { 
    id: 'sbi-psu', 
    name: 'SBI PSU Fund', 
    logo: <div className="w-full h-full bg-blue-500 rounded"></div>, 
    category: 'Equity', 
    subCategory: 'Thematic', 
    returns: { value: '31.31%', period: '3Y' } 
  },
  { 
    id: 'parag-parikh', 
    name: 'Parag Parikh Flexi Cap Fund', 
    logo: <div className="w-full h-full bg-green-500 rounded"></div>, 
    category: 'Equity', 
    subCategory: 'Flexi Cap', 
    rating: 5,
    returns: { value: '17.12%', period: '3Y' } 
  },
  { 
    id: 'hdfc-flexi', 
    name: 'HDFC Flexi Cap Fund', 
    logo: <div className="w-full h-full bg-red-500 rounded"></div>, 
    category: 'Equity', 
    subCategory: 'Flexi Cap', 
    rating: 5,
    returns: { value: '22.07%', period: '3Y' } 
  },
  { 
    id: 'quant-small', 
    name: 'Quant Small Cap Fund', 
    logo: <div className="w-full h-full bg-gray-500 rounded"></div>, 
    category: 'Equity', 
    subCategory: 'Small Cap', 
    rating: 5,
    returns: { value: '20.82%', period: '3Y' } 
  }
];

// Define mock data for filters
const sortOptions = [
  { id: 'popularity', label: 'Popularity' },
  { id: '1y', label: '1Y Returns' },
  { id: '3y', label: '3Y Returns' },
  { id: '5y', label: '5Y Returns' },
  { id: 'rating', label: 'Rating' }
];

const categoryFilters = {
  id: 'categories',
  title: 'Categories',
  options: [
    { id: 'equity', label: 'Equity' },
    { id: 'debt', label: 'Debt' },
    { id: 'hybrid', label: 'Hybrid' },
    { id: 'commodities', label: 'Commodities' }
  ]
};

const riskFilters = {
  id: 'risk',
  title: 'Risk',
  options: [
    { id: 'low', label: 'Low' },
    { id: 'moderately-low', label: 'Moderately Low' },
    { id: 'moderate', label: 'Moderate' },
    { id: 'moderately-high', label: 'Moderately High' },
    { id: 'high', label: 'High' },
    { id: 'very-high', label: 'Very High' }
  ]
};

const ratingFilters = {
  id: 'ratings',
  title: 'Ratings',
  options: [
    { id: '5', label: '5 ★' },
    { id: '4', label: '4+ ★' },
    { id: '3', label: '3+ ★' },
    { id: '2', label: '2+ ★' },
    { id: '1', label: '1+ ★' }
  ]
};

const fundHouseFilters = [
  { id: '360one', label: '360 ONE Mutual Fund' },
  { id: 'aditya', label: 'Aditya Birla Sun Life Mutual Fund' },
  { id: 'axis', label: 'Axis Mutual Fund' },
  { id: 'bajaj', label: 'Bajaj Finserv Mutual Fund' },
  { id: 'bandhan', label: 'Bandhan Mutual Fund' },
  { id: 'boi', label: 'Bank of India Mutual Fund' },
  { id: 'bnp', label: 'Baroda BNP Paribas Mutual Fund' },
  { id: 'baroda', label: 'Baroda Mutual Fund' },
  { id: 'canara', label: 'Canara Robeco Mutual Fund' },
  { id: 'dsp', label: 'DSP Mutual Fund' },
  { id: 'edelweiss', label: 'Edelweiss Mutual Fund' },
  { id: 'franklin', label: 'Franklin Templeton Mutual Fund' },
  { id: 'groww', label: 'Groww Mutual Fund' },
  { id: 'hdfc', label: 'HDFC Mutual Fund' }
];

// Mock data for insights - Using the specific string literal types
const mockInsights = [
  {
    id: '1',
    type: 'recommendation' as const,
    title: 'Increase your SIP for better returns',
    description: 'Based on your investment pattern, increasing your SIP amount by 10% can significantly improve your long-term returns.',
    actionLink: '/invest/sip-calculator',
    actionText: 'Calculate impact'
  },
  {
    id: '2',
    type: 'alert' as const,
    title: 'SIP payment due in 3 days',
    description: 'Your monthly SIP payment for HDFC Mid-Cap Opportunities Fund is due on 15th May.',
    actionLink: '/invest/sip-management',
    actionText: 'Manage SIP'
  }
];

const MutualFundProviderPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('popularity');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [cartCount, setCartCount] = useState(1);
  const [showAllFunds, setShowAllFunds] = useState(false);
  
  // Convert selected filters to chips for display
  const getFilterChips = () => {
    const chips: { id: string; label: string; category: string }[] = [];
    
    Object.entries(selectedFilters).forEach(([category, values]) => {
      values.forEach(value => {
        let label = '';
        
        if (category === 'categories') {
          label = categoryFilters.options.find(opt => opt.id === value)?.label || '';
        } else if (category === 'risk') {
          label = riskFilters.options.find(opt => opt.id === value)?.label || '';
        } else if (category === 'ratings') {
          label = ratingFilters.options.find(opt => opt.id === value)?.label || '';
        } else if (category === 'fundHouse') {
          label = fundHouseFilters.find(opt => opt.id === value)?.label || '';
        }
        
        if (label) {
          chips.push({ id: value, label, category });
        }
      });
    });
    
    return chips;
  };
  
  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      
      if (!newFilters[category]) {
        newFilters[category] = [];
      }
      
      if (checked) {
        newFilters[category] = [...newFilters[category], value];
      } else {
        newFilters[category] = newFilters[category].filter(v => v !== value);
        
        if (newFilters[category].length === 0) {
          delete newFilters[category];
        }
      }
      
      return newFilters;
    });
  };
  
  const handleRemoveFilter = (id: string, category: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      
      if (newFilters[category]) {
        newFilters[category] = newFilters[category].filter(v => v !== id);
        
        if (newFilters[category].length === 0) {
          delete newFilters[category];
        }
      }
      
      return newFilters;
    });
  };
  
  const handleClearAllFilters = () => {
    setSelectedFilters({});
  };
  
  return (
    <div className="app-container pb-16 bg-gray-50">
      {/* Header - Custom for the mutual funds page */}
      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-4">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 mr-3">
              <div className="rounded-full overflow-hidden border-2 border-gray-200 p-1">
                <div className="rounded-full overflow-hidden bg-gradient-to-b from-blue-500 to-cyan-400">
                  <div className="h-full w-full bg-white rounded-t-full" style={{height: '50%'}}></div>
                </div>
              </div>
            </div>
            <h1 className="text-lg font-semibold">Mutual Funds</h1>
          </div>
          
          <div className="ml-auto flex items-center space-x-4">
            <Search size={20} />
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <img src="https://via.placeholder.com/40" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="px-4 py-3">
        <div className="bg-gray-100 rounded-full p-1 flex">
          {['Explore', 'Dashboard', 'SIPs', 'Watchlist'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium ${
                tab === (activeTab === 'explore' ? 'Explore' : 
                         activeTab === 'portfolio' ? 'Dashboard' : 
                         activeTab === 'sips' ? 'SIPs' : 'Watchlist')
                  ? 'bg-white shadow-sm' : ''
              }`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <div className="px-4 space-y-8">
        {!showAllFunds ? (
          <>
            {/* Popular Funds */}
            <PopularFunds 
              funds={popularFunds} 
              viewAllLink="/invest/mutual-funds/all" 
            />
            
            {/* Collections */}
            <FundCollections 
              collections={collections} 
            />
            
            {/* Funds by Groww */}
            <GrowwFunds 
              funds={growwFunds} 
              viewAllLink="/invest/groww-funds" 
            />
            
            {/* All Mutual Funds Button */}
            <Button 
              variant="outline" 
              className="w-full py-6 text-base font-medium flex justify-between items-center"
              onClick={() => setShowAllFunds(true)}
            >
              <span>All Mutual Funds</span>
              <ArrowDownUp size={20} />
            </Button>
          </>
        ) : (
          <>
            {/* Products & tools */}
            <ProductsTools tools={productTools} />
            
            {/* Cart section */}
            <CartSection itemCount={cartCount} />
            
            {/* All Mutual Funds section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">All Mutual Funds</h2>
              
              {/* Filter tools */}
              <div className="flex items-center space-x-3 mb-4 overflow-x-auto hide-scrollbar">
                <MutualFundFilters
                  sortOptions={sortOptions}
                  selectedSort={selectedSort}
                  onSortChange={setSelectedSort}
                  categories={categoryFilters}
                  riskLevels={riskFilters}
                  ratings={ratingFilters}
                  fundHouses={fundHouseFilters}
                  selectedFilters={selectedFilters}
                  onFilterChange={handleFilterChange}
                  totalFunds={1482}
                  onClearAll={handleClearAllFilters}
                  onApplyFilters={() => {}}
                  isOpen={isFilterOpen}
                  onOpenChange={setIsFilterOpen}
                />
                
                <Button variant="outline" className="flex items-center gap-2 rounded-full">
                  <ArrowDownUp size={16} />
                  <span>Sort by</span>
                </Button>
                
                <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 min-w-max">
                  <span className="mr-2 text-sm">Index only</span>
                  <Switch />
                </div>
                
                <Button variant="outline" className="rounded-full whitespace-nowrap">
                  Flexi Cap
                </Button>
                
                <Button variant="outline" className="rounded-full whitespace-nowrap">
                  Sectoral
                </Button>
              </div>
              
              {/* Filter chips */}
              <FilterChips 
                filters={getFilterChips()}
                onRemove={handleRemoveFilter}
                onClearAll={handleClearAllFilters}
              />
              
              {/* Fund list info */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">1,482 funds</span>
                <div className="flex items-center text-sm font-medium">
                  <span>3Y Returns</span>
                </div>
              </div>
              
              {/* Fund list */}
              <div className="bg-white rounded-lg overflow-hidden">
                {allMutualFunds.map((fund) => (
                  <FundListItem
                    key={fund.id}
                    id={fund.id}
                    name={fund.name}
                    logo={fund.logo}
                    category={fund.category}
                    subCategory={fund.subCategory}
                    rating={fund.rating}
                    returns={fund.returns}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Use the BottomNav component */}
      <BottomNav activeTab="invest" />
    </div>
  );
};

export default MutualFundProviderPage;
