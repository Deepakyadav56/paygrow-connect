
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, ArrowUpDown, Plus, Star, X, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import FundListItem from '@/components/FundListItem';

// Mock watched funds data - in a real app, this would come from a database or API
const mockWatchedFunds = [
  {
    id: 'parag-parikh',
    name: 'Parag Parikh Flexi Cap Fund',
    logo: 'https://www.ppfas.com/images/new-logo.png',
    category: 'Equity',
    subCategory: 'Flexi Cap',
    rating: 5,
    returns: {
      value: '+25.7%',
      period: '1Y Returns'
    }
  },
  {
    id: 'axis-bluechip',
    name: 'Axis Bluechip Fund',
    logo: 'https://www.axismf.com/assets/images/axis-logo.svg',
    category: 'Equity',
    subCategory: 'Large Cap',
    rating: 4,
    returns: {
      value: '+14.2%',
      period: '1Y Returns'
    }
  },
  {
    id: 'hdfc-midcap',
    name: 'HDFC Mid-Cap Opportunities Fund',
    logo: 'https://www.hdfcfund.com/content/dam/abc-of-money/logo/hdfc-mutual-fund-logo.png',
    category: 'Equity',
    subCategory: 'Mid Cap',
    rating: 4.5,
    returns: {
      value: '+22.8%',
      period: '1Y Returns'
    }
  },
  {
    id: 'icici-technology',
    name: 'ICICI Prudential Technology Fund',
    logo: 'https://www.icicipruamc.com/assets/images/logo_icici_pru.png',
    category: 'Equity',
    subCategory: 'Sectoral',
    rating: 3.5,
    returns: {
      value: '+18.3%',
      period: '1Y Returns'
    }
  },
  {
    id: 'mirae-emerging',
    name: 'Mirae Asset Emerging Bluechip Fund',
    logo: 'https://www.miraeassetmf.co.in/images/default-source/default-album/mirae_logo.png',
    category: 'Equity',
    subCategory: 'Large & Mid Cap',
    rating: 5,
    returns: {
      value: '+20.1%',
      period: '1Y Returns'
    }
  },
  {
    id: 'quant-small',
    name: 'Quant Small Cap Fund',
    logo: 'https://www.quantmutual.com/wp-content/uploads/2022/12/Quant-Mutual-Fund.png',
    category: 'Equity',
    subCategory: 'Small Cap',
    rating: 4.5,
    returns: {
      value: '+32.5%',
      period: '1Y Returns'
    }
  },
  {
    id: 'sbi-equity-hybrid',
    name: 'SBI Equity Hybrid Fund',
    logo: 'https://www.sbimf.com/assets/images/logo.png',
    category: 'Hybrid',
    subCategory: 'Aggressive',
    rating: 4,
    returns: {
      value: '+15.7%',
      period: '1Y Returns'
    }
  }
];

const sortOptions = [
  { label: 'Name (A-Z)', value: 'name-asc' },
  { label: 'Name (Z-A)', value: 'name-desc' },
  { label: 'Returns (High to Low)', value: 'returns-desc' },
  { label: 'Returns (Low to High)', value: 'returns-asc' },
  { label: 'Rating (High to Low)', value: 'rating-desc' },
  { label: 'Rating (Low to High)', value: 'rating-asc' }
];

const WatchlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name-asc');
  const [showSortOptions, setShowSortOptions] = useState<boolean>(false);
  const [watchedFunds, setWatchedFunds] = useState(mockWatchedFunds);
  const [filteredFunds, setFilteredFunds] = useState(watchedFunds);
  
  // Filter and sort funds
  useEffect(() => {
    let results = [...watchedFunds];
    
    // Apply search filter
    if (searchQuery) {
      results = results.filter(fund => 
        fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fund.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fund.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    results.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'returns-desc':
          return parseFloat(b.returns.value.replace('+', '').replace('%', '')) - 
                 parseFloat(a.returns.value.replace('+', '').replace('%', ''));
        case 'returns-asc':
          return parseFloat(a.returns.value.replace('+', '').replace('%', '')) - 
                 parseFloat(b.returns.value.replace('+', '').replace('%', ''));
        case 'rating-desc':
          return (b.rating || 0) - (a.rating || 0);
        case 'rating-asc':
          return (a.rating || 0) - (b.rating || 0);
        default:
          return 0;
      }
    });
    
    setFilteredFunds(results);
  }, [watchedFunds, searchQuery, sortBy]);
  
  // Remove fund from watchlist
  const handleRemoveFromWatchlist = (fundId: string) => {
    setWatchedFunds(prev => prev.filter(fund => fund.id !== fundId));
    
    toast({
      title: "Removed from Watchlist",
      description: "Fund has been removed from your watchlist.",
      variant: "default",
    });
  };
  
  // Get current sort option label
  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === sortBy);
    return option ? option.label : 'Sort';
  };
  
  return (
    <div className="bg-app-teal-50 min-h-screen pb-20">
      <Header title="Watchlist" showBack />
      
      <div className="p-4">
        {/* Search and Filter */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-app-teal-500" size={18} />
              <Input 
                placeholder="Search funds" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-app-teal-200 focus-visible:ring-app-teal-500"
              />
            </div>
            
            <div className="relative">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setShowSortOptions(!showSortOptions)}
                className="h-10 w-10 rounded-full border-app-teal-500 text-app-teal-700 hover:bg-app-teal-50"
              >
                <ArrowUpDown size={18} />
              </Button>
              
              {showSortOptions && (
                <div className="absolute right-0 mt-2 w-64 rounded-lg bg-white shadow-lg border border-app-teal-200 z-10">
                  <div className="p-2">
                    <div className="flex justify-between items-center mb-2 pb-1 border-b border-app-teal-100">
                      <h3 className="text-sm font-medium text-app-teal-900">Sort By</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowSortOptions(false)}
                        className="h-7 w-7"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {sortOptions.map(option => (
                        <div 
                          key={option.value}
                          className={`px-3 py-2 text-sm rounded-md cursor-pointer ${
                            sortBy === option.value 
                              ? 'bg-app-teal-100 text-app-teal-800' 
                              : 'hover:bg-app-teal-50 text-app-teal-700'
                          }`}
                          onClick={() => {
                            setSortBy(option.value);
                            setShowSortOptions(false);
                          }}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Button 
              onClick={() => navigate('/invest')}
              className="bg-app-teal-700 hover:bg-app-teal-800 text-white"
            >
              <Plus size={18} className="mr-1" />
              Add
            </Button>
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <div className="text-sm text-app-teal-700">
              {filteredFunds.length} {filteredFunds.length === 1 ? 'fund' : 'funds'}
            </div>
            <div className="text-sm text-app-teal-700 flex items-center">
              <span className="mr-1">Sorted by:</span>
              <span className="font-medium">{getCurrentSortLabel()}</span>
            </div>
          </div>
        </div>
        
        {/* Funds List */}
        <div className="bg-white rounded-lg shadow-sm">
          {filteredFunds.length > 0 ? (
            <div>
              {filteredFunds.map((fund, index) => (
                <div key={fund.id} className="relative">
                  <FundListItem 
                    id={fund.id}
                    name={fund.name}
                    logo={fund.logo}
                    category={fund.category}
                    subCategory={fund.subCategory}
                    rating={fund.rating}
                    returns={fund.returns}
                  />
                  <button 
                    onClick={() => handleRemoveFromWatchlist(fund.id)}
                    className="absolute right-3 top-4 text-app-teal-500 hover:text-app-teal-700"
                  >
                    <Star size={20} fill="currentColor" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              {searchQuery ? (
                <>
                  <div className="flex justify-center mb-3">
                    <AlertCircle size={40} className="text-app-teal-400" />
                  </div>
                  <h3 className="text-lg font-medium text-app-teal-800 mb-1">No matching funds found</h3>
                  <p className="text-app-teal-600">
                    Try adjusting your search criteria
                  </p>
                </>
              ) : (
                <>
                  <div className="flex justify-center mb-3">
                    <Star size={40} className="text-app-teal-400" />
                  </div>
                  <h3 className="text-lg font-medium text-app-teal-800 mb-1">Your watchlist is empty</h3>
                  <p className="text-app-teal-600 mb-4">
                    Add funds to keep track of their performance
                  </p>
                  <Button 
                    onClick={() => navigate('/invest')}
                    className="bg-app-teal-700 hover:bg-app-teal-800 text-white"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Funds to Watchlist
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
      <BottomNav activeTab="invest" />
    </div>
  );
};

export default WatchlistPage;
