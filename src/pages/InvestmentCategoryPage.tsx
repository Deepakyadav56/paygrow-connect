
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search, Filter, TrendingUp, ChevronRight, BarChart, HelpCircle, InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Category data
const categories = {
  'all': {
    id: 'all',
    name: 'All Categories',
    description: 'Browse all mutual fund categories available for investment',
    icon: '📊',
    risk: 'Varies',
    returns: 'Varies',
    recommended: 'All investors'
  },
  'eq-lc': {
    id: 'eq-lc',
    name: 'Large Cap Funds',
    description: 'These funds invest primarily in large, well-established companies with strong market presence and stable growth.',
    icon: '📊',
    risk: 'Moderate',
    returns: 'Moderate',
    recommended: 'Conservative to moderate risk investors looking for stable returns'
  },
  'eq-mc': {
    id: 'eq-mc',
    name: 'Mid Cap Funds',
    description: 'These funds invest in medium-sized companies that have potential for higher growth compared to large caps.',
    icon: '📈',
    risk: 'Moderately High',
    returns: 'High',
    recommended: 'Investors with higher risk appetite seeking wealth creation'
  },
  'eq-sc': {
    id: 'eq-sc',
    name: 'Small Cap Funds',
    description: 'These funds invest in smaller companies with high growth potential but also higher volatility.',
    icon: '🚀',
    risk: 'High',
    returns: 'Very High',
    recommended: 'Aggressive investors with long-term horizon'
  }
};

// Mock data for funds
const fundsByCategoryId = {
  'all': [
    {
      id: 'inv1',
      name: 'Axis Bluechip Fund',
      category: 'Equity - Large Cap',
      categoryId: 'eq-lc',
      amc: 'Axis Mutual Fund',
      logo: '🔵',
      rating: 4.5,
      returns: {
        oneYear: 12.5,
        threeYear: 8.7,
        fiveYear: 11.2
      },
      minInvestment: 500,
      riskLevel: 'Moderate'
    },
    {
      id: 'inv2',
      name: 'HDFC Mid-Cap Opportunities',
      category: 'Equity - Mid Cap',
      categoryId: 'eq-mc',
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
      categoryId: 'eq-sc',
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
      categoryId: 'flexi',
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
      categoryId: 'sectoral',
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
    }
  ],
  'eq-lc': [
    {
      id: 'inv1',
      name: 'Axis Bluechip Fund',
      category: 'Equity - Large Cap',
      categoryId: 'eq-lc',
      amc: 'Axis Mutual Fund',
      logo: '🔵',
      rating: 4.5,
      returns: {
        oneYear: 12.5,
        threeYear: 8.7,
        fiveYear: 11.2
      },
      minInvestment: 500,
      riskLevel: 'Moderate'
    },
    {
      id: 'lc1',
      name: 'Mirae Asset Large Cap Fund',
      category: 'Equity - Large Cap',
      categoryId: 'eq-lc',
      amc: 'Mirae Asset',
      logo: '🔹',
      rating: 4.7,
      returns: {
        oneYear: 13.2,
        threeYear: 9.1,
        fiveYear: 12.5
      },
      minInvestment: 1000,
      riskLevel: 'Moderate'
    },
    {
      id: 'lc2',
      name: 'HDFC Top 100 Fund',
      category: 'Equity - Large Cap',
      categoryId: 'eq-lc',
      amc: 'HDFC Mutual Fund',
      logo: '🏢',
      rating: 4.2,
      returns: {
        oneYear: 11.8,
        threeYear: 8.2,
        fiveYear: 10.7
      },
      minInvestment: 500,
      riskLevel: 'Moderate'
    },
    {
      id: 'lc3',
      name: 'Nippon India Large Cap Fund',
      category: 'Equity - Large Cap',
      categoryId: 'eq-lc',
      amc: 'Nippon India',
      logo: '🔹',
      rating: 4.1,
      returns: {
        oneYear: 11.2,
        threeYear: 7.9,
        fiveYear: 10.3
      },
      minInvestment: 1000,
      riskLevel: 'Moderate'
    }
  ],
  'eq-mc': [
    {
      id: 'inv2',
      name: 'HDFC Mid-Cap Opportunities',
      category: 'Equity - Mid Cap',
      categoryId: 'eq-mc',
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
      id: 'mc1',
      name: 'Kotak Emerging Equity Fund',
      category: 'Equity - Mid Cap',
      categoryId: 'eq-mc',
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
    },
    {
      id: 'mc2',
      name: 'Axis Midcap Fund',
      category: 'Equity - Mid Cap',
      categoryId: 'eq-mc',
      amc: 'Axis Mutual Fund',
      logo: '🔵',
      rating: 4.6,
      returns: {
        oneYear: 16.9,
        threeYear: 11.1,
        fiveYear: 13.5
      },
      minInvestment: 500,
      riskLevel: 'Moderately High'
    },
    {
      id: 'mc3',
      name: 'DSP Midcap Fund',
      category: 'Equity - Mid Cap',
      categoryId: 'eq-mc',
      amc: 'DSP Mutual Fund',
      logo: '🔶',
      rating: 4.4,
      returns: {
        oneYear: 16.1,
        threeYear: 10.5,
        fiveYear: 12.9
      },
      minInvestment: 500,
      riskLevel: 'Moderately High'
    }
  ],
  'eq-sc': [
    {
      id: 'inv3',
      name: 'SBI Small Cap Fund',
      category: 'Equity - Small Cap',
      categoryId: 'eq-sc',
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
      id: 'sc1',
      name: 'Nippon India Small Cap Fund',
      category: 'Equity - Small Cap',
      categoryId: 'eq-sc',
      amc: 'Nippon India',
      logo: '🔹',
      rating: 4.7,
      returns: {
        oneYear: 24.8,
        threeYear: 15.1,
        fiveYear: 17.3
      },
      minInvestment: 1000,
      riskLevel: 'High'
    },
    {
      id: 'sc2',
      name: 'Axis Small Cap Fund',
      category: 'Equity - Small Cap',
      categoryId: 'eq-sc',
      amc: 'Axis Mutual Fund',
      logo: '🔵',
      rating: 4.5,
      returns: {
        oneYear: 21.8,
        threeYear: 13.9,
        fiveYear: 16.2
      },
      minInvestment: 500,
      riskLevel: 'High'
    },
    {
      id: 'sc3',
      name: 'Kotak Small Cap Fund',
      category: 'Equity - Small Cap',
      categoryId: 'eq-sc',
      amc: 'Kotak Mahindra',
      logo: '🔴',
      rating: 4.2,
      returns: {
        oneYear: 20.5,
        threeYear: 13.2,
        fiveYear: 15.8
      },
      minInvestment: 1000,
      riskLevel: 'High'
    }
  ]
};

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-500">★</span>
      ))}
      {hasHalfStar && <span className="text-yellow-500">★</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300">★</span>
      ))}
    </div>
  );
};

const InvestmentCategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId = 'all' } = useParams<{ categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const categoryInfo = categories[categoryId as keyof typeof categories] || categories.all;
  const funds = fundsByCategoryId[categoryId as keyof typeof fundsByCategoryId] || fundsByCategoryId.all;
  
  const filteredFunds = funds.filter(fund => 
    fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fund.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fund.amc.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="app-container">
      <Header 
        showBack
        title={categoryInfo.name}
      />
      
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex items-start mb-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-app-light-blue text-app-blue mr-3 text-2xl">
              {categoryInfo.icon}
            </div>
            <div className="flex-1">
              <h1 className="font-medium text-lg">{categoryInfo.name}</h1>
              <p className="text-sm text-gray-600 mt-1">
                {categoryInfo.description}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Risk Level</div>
              <div className="font-medium">{categoryInfo.risk}</div>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Returns</div>
              <div className="font-medium">{categoryInfo.returns}</div>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Suitable For</div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="font-medium flex items-center">
                      Investors <HelpCircle size={12} className="ml-1" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-48">{categoryInfo.recommended}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search funds by name or AMC..." 
            className="pl-10 border-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-medium">{categoryId === 'all' ? 'All Funds' : `${categoryInfo.name} (${filteredFunds.length})`}</h2>
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
              <DropdownMenuItem>Name: A to Z</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {filteredFunds.length > 0 ? (
          <div className="space-y-3 mb-4">
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
                
                <div className="flex items-center text-xs mb-3">
                  <StarRating rating={fund.rating} />
                  <span className="ml-1 text-gray-500">{fund.rating}</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-gray-500">{fund.riskLevel} Risk</span>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">1Y Returns</div>
                    <div className="text-app-green font-medium">+{fund.returns.oneYear}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">3Y Returns</div>
                    <div className="text-app-green font-medium">+{fund.returns.threeYear}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Min. Invest</div>
                    <div className="font-medium">₹{fund.minInvestment}</div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/invest/fund/${fund.id}`);
                    }}
                  >
                    View Details
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/invest/options/${fund.id}`);
                    }}
                  >
                    Invest Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-sm border border-gray-200">
            <Search size={32} className="text-gray-400 mb-3" />
            <h3 className="font-medium mb-1">No Funds Found</h3>
            <p className="text-sm text-gray-600">
              Try adjusting your search or browse other categories
            </p>
          </div>
        )}
        
        {categoryId !== 'all' && (
          <Button 
            onClick={() => navigate('/invest/categories')} 
            className="w-full"
            variant="outline"
          >
            View All Categories
          </Button>
        )}
      </div>
      
      <BottomNav />
    </div>
  );
};

export default InvestmentCategoryPage;
