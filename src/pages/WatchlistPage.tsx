
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Filter, ArrowDown, ArrowUp, Plus, Search, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import FundListItem from '@/components/FundListItem';

// Mock watchlist data
const watchlistData = [
  {
    id: 'fund1',
    name: 'HDFC Mid-Cap Opportunities Fund',
    logo: '🔵',
    category: 'Equity',
    subCategory: 'Mid Cap',
    rating: 4.8,
    returns: {
      value: '15.8%',
      period: '3Y Returns'
    },
    navChange: 0.75,
    nav: 149.26
  },
  {
    id: 'fund2',
    name: 'Axis Bluechip Fund',
    logo: '⚪',
    category: 'Equity',
    subCategory: 'Large Cap',
    rating: 4.5,
    returns: {
      value: '12.5%',
      period: '3Y Returns'
    },
    navChange: 0.42,
    nav: 53.18
  },
  {
    id: 'fund3',
    name: 'Parag Parikh Flexi Cap Fund',
    logo: '🟣',
    category: 'Equity',
    subCategory: 'Flexi Cap',
    rating: 4.9,
    returns: {
      value: '16.9%',
      period: '3Y Returns'
    },
    navChange: 0.88,
    nav: 67.35
  },
  {
    id: 'fund4',
    name: 'SBI Small Cap Fund',
    logo: '🟢',
    category: 'Equity',
    subCategory: 'Small Cap',
    rating: 4.7,
    returns: {
      value: '19.2%',
      period: '3Y Returns'
    },
    navChange: -0.32,
    nav: 112.84
  }
];

type SortOption = 'name' | 'returns' | 'nav';

const WatchlistPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('returns');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      // Toggle sort order if clicking the same option
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort option with default desc order
      setSortBy(option);
      setSortOrder('desc');
    }
  };
  
  const filteredAndSortedFunds = [...watchlistData]
    .filter(fund => 
      fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fund.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fund.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'returns') {
        const aValue = parseFloat(a.returns.value);
        const bValue = parseFloat(b.returns.value);
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      } else if (sortBy === 'nav') {
        return sortOrder === 'asc' ? a.nav - b.nav : b.nav - a.nav;
      }
      return 0;
    });

  const getArrowIcon = (option: SortOption) => {
    if (sortBy !== option) return null;
    return sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  return (
    <div className="app-container pb-20">
      <Header 
        title="Watchlist" 
        showBack
        showProfile
      />
      
      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-app-teal-400" size={18} />
          <Input 
            placeholder="Search your watchlist..." 
            className="pl-10 border-app-teal-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-app-teal-800">My Watchlist ({watchlistData.length})</h3>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/invest/mutual-funds')}
              className="h-8 text-app-teal-600"
            >
              <Plus size={16} className="mr-1" /> Add Funds
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 text-app-teal-600">
                  <Filter size={16} className="mr-1" /> Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleSort('name')} className="flex justify-between">
                  Fund Name {getArrowIcon('name')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('returns')} className="flex justify-between">
                  Returns {getArrowIcon('returns')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('nav')} className="flex justify-between">
                  NAV {getArrowIcon('nav')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {filteredAndSortedFunds.length > 0 ? (
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-app-teal-100">
            {filteredAndSortedFunds.map((fund, index) => (
              <div key={fund.id}>
                <FundListItem
                  id={fund.id}
                  name={fund.name}
                  logo={fund.logo}
                  category={`${fund.category} • ${fund.subCategory}`}
                  subCategory=""
                  rating={fund.rating}
                  returns={fund.returns}
                />
                {index < filteredAndSortedFunds.length - 1 && (
                  <div className="border-b border-app-teal-100"></div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-app-teal-100">
            <AlertCircle size={32} className="mx-auto text-app-teal-400 mb-3" />
            <h3 className="font-medium mb-1 text-app-teal-800">No funds found</h3>
            <p className="text-sm text-app-teal-600 mb-4">
              {searchQuery ? "Try adjusting your search" : "Your watchlist is empty"}
            </p>
            <Button 
              onClick={() => navigate('/invest/mutual-funds')} 
              className="bg-app-teal-600 hover:bg-app-teal-700"
            >
              <Plus size={16} className="mr-1" /> Add Funds to Watchlist
            </Button>
          </div>
        )}
      </div>
      
      <BottomNav activeTab="invest" />
    </div>
  );
};

export default WatchlistPage;
