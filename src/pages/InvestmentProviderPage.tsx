
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search, Filter, BriefcaseBusiness, ChevronRight, ExternalLink, Globe, Calendar, BarChart4, ShieldCheck, Award } from 'lucide-react';
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
import { Separator } from '@/components/ui/separator';

// Provider data
const providers = {
  'axis': {
    id: 'axis',
    name: 'Axis Mutual Fund',
    logo: '🔵',
    description: 'Axis Mutual Fund is one of India\'s fastest growing asset management companies offering a variety of schemes across equity, hybrid, and debt categories.',
    established: '2009',
    aum: '₹2,98,672 Cr',
    fundCount: 37,
    sponsoredBy: 'Axis Bank',
    website: 'www.axismf.com',
    topFunds: [
      { id: 'inv1', name: 'Axis Bluechip Fund', category: 'Equity - Large Cap' },
      { id: 'sc2', name: 'Axis Small Cap Fund', category: 'Equity - Small Cap' },
      { id: 'mc2', name: 'Axis Midcap Fund', category: 'Equity - Mid Cap' }
    ]
  },
  'hdfc': {
    id: 'hdfc',
    name: 'HDFC Mutual Fund',
    logo: '🏢',
    description: 'HDFC Mutual Fund is one of the largest and most respected asset management companies in India, offering a wide range of investment solutions.',
    established: '1999',
    aum: '₹5,48,725 Cr',
    fundCount: 42,
    sponsoredBy: 'HDFC Bank & Standard Life Investments',
    website: 'www.hdfcfund.com',
    topFunds: [
      { id: 'inv2', name: 'HDFC Mid-Cap Opportunities', category: 'Equity - Mid Cap' },
      { id: 'lc2', name: 'HDFC Top 100 Fund', category: 'Equity - Large Cap' },
      { id: 'hf1', name: 'HDFC Balanced Advantage Fund', category: 'Hybrid - Dynamic Asset Allocation' }
    ]
  },
  'sbi': {
    id: 'sbi',
    name: 'SBI Mutual Fund',
    logo: '🏛️',
    description: 'SBI Mutual Fund is India\'s largest asset management company, offering a diverse range of mutual fund schemes across various asset classes.',
    established: '1987',
    aum: '₹7,52,956 Cr',
    fundCount: 48,
    sponsoredBy: 'State Bank of India & Amundi Asset Management',
    website: 'www.sbimf.com',
    topFunds: [
      { id: 'inv3', name: 'SBI Small Cap Fund', category: 'Equity - Small Cap' },
      { id: 'sb1', name: 'SBI Bluechip Fund', category: 'Equity - Large Cap' },
      { id: 'se1', name: 'SBI Equity Hybrid Fund', category: 'Hybrid - Equity Oriented' }
    ]
  }
};

// Mock data for all funds
const allFunds = [
  {
    id: 'inv1',
    name: 'Axis Bluechip Fund',
    category: 'Equity - Large Cap',
    amc: 'Axis Mutual Fund',
    amcId: 'axis',
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
    id: 'sc2',
    name: 'Axis Small Cap Fund',
    category: 'Equity - Small Cap',
    amc: 'Axis Mutual Fund',
    amcId: 'axis',
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
    id: 'mc2',
    name: 'Axis Midcap Fund',
    category: 'Equity - Mid Cap',
    amc: 'Axis Mutual Fund',
    amcId: 'axis',
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
    id: 'inv2',
    name: 'HDFC Mid-Cap Opportunities',
    category: 'Equity - Mid Cap',
    amc: 'HDFC Mutual Fund',
    amcId: 'hdfc',
    logo: '🏢',
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
    id: 'lc2',
    name: 'HDFC Top 100 Fund',
    category: 'Equity - Large Cap',
    amc: 'HDFC Mutual Fund',
    amcId: 'hdfc',
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
    id: 'hf1',
    name: 'HDFC Balanced Advantage Fund',
    category: 'Hybrid - Dynamic Asset Allocation',
    amc: 'HDFC Mutual Fund',
    amcId: 'hdfc',
    logo: '🏢',
    rating: 4.3,
    returns: {
      oneYear: 10.5,
      threeYear: 7.8,
      fiveYear: 9.6
    },
    minInvestment: 5000,
    riskLevel: 'Moderate'
  },
  {
    id: 'inv3',
    name: 'SBI Small Cap Fund',
    category: 'Equity - Small Cap',
    amc: 'SBI Mutual Fund',
    amcId: 'sbi',
    logo: '🏛️',
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
    id: 'sb1',
    name: 'SBI Bluechip Fund',
    category: 'Equity - Large Cap',
    amc: 'SBI Mutual Fund',
    amcId: 'sbi',
    logo: '🏛️',
    rating: 4.1,
    returns: {
      oneYear: 11.2,
      threeYear: 7.8,
      fiveYear: 10.1
    },
    minInvestment: 500,
    riskLevel: 'Moderate'
  },
  {
    id: 'se1',
    name: 'SBI Equity Hybrid Fund',
    category: 'Hybrid - Equity Oriented',
    amc: 'SBI Mutual Fund',
    amcId: 'sbi',
    logo: '🏛️',
    rating: 4.4,
    returns: {
      oneYear: 12.8,
      threeYear: 9.2,
      fiveYear: 11.4
    },
    minInvestment: 1000,
    riskLevel: 'Moderate'
  }
];

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

const InvestmentProviderPage: React.FC = () => {
  const navigate = useNavigate();
  const { providerId = 'axis' } = useParams<{ providerId: string }>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const providerInfo = providers[providerId as keyof typeof providers] || providers.axis;
  const providerFunds = allFunds.filter(fund => fund.amcId === providerId);
  
  const filteredFunds = providerFunds.filter(fund => 
    fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fund.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const categoryTypes = ['all', 'equity', 'hybrid', 'debt', 'liquid'];
  
  const getCategoryFunds = (category: string) => {
    if (category === 'all') return filteredFunds;
    return filteredFunds.filter(fund => {
      const lowerCategory = fund.category.toLowerCase();
      switch(category) {
        case 'equity': return lowerCategory.includes('equity');
        case 'hybrid': return lowerCategory.includes('hybrid');
        case 'debt': return lowerCategory.includes('debt');
        case 'liquid': return lowerCategory.includes('liquid');
        default: return true;
      }
    });
  };
  
  const displayFunds = getCategoryFunds(activeTab);
  
  return (
    <div className="app-container">
      <Header 
        showBack
        title={providerInfo.name}
      />
      
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
          <div className="p-4">
            <div className="flex items-center mb-3">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-100 mr-4 text-2xl">
                {providerInfo.logo}
              </div>
              <div>
                <h1 className="font-medium text-lg">{providerInfo.name}</h1>
                <div className="flex items-center mt-1">
                  <Globe size={14} className="text-gray-500 mr-1" />
                  <a href={`https://${providerInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-xs text-app-blue flex items-center">
                    {providerInfo.website}
                    <ExternalLink size={12} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              {providerInfo.description}
            </p>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Assets Under Management</div>
                <div className="font-medium">{providerInfo.aum}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Established</div>
                <div className="font-medium">{providerInfo.established}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Fund Count</div>
                <div className="font-medium">{providerInfo.fundCount}</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 p-4">
            <div className="flex items-center text-sm text-gray-600">
              <ShieldCheck size={16} className="mr-2 text-app-blue" />
              <span>Sponsored by {providerInfo.sponsoredBy}</span>
            </div>
          </div>
        </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search funds by name or category..." 
            className="pl-10 border-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex overflow-x-auto gap-2 mb-4 py-1 hide-scrollbar">
          {categoryTypes.map((category) => (
            <Button
              key={category}
              variant={activeTab === category ? "default" : "outline"}
              className={`rounded-full ${activeTab === category ? 'bg-app-blue' : 'bg-white'}`}
              onClick={() => setActiveTab(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
              {category !== 'all' && (
                <span className="ml-1 text-xs">
                  ({getCategoryFunds(category).length})
                </span>
              )}
            </Button>
          ))}
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-medium">
            {activeTab === 'all' ? 'All Funds' : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Funds`} 
            <span className="text-sm text-gray-500 ml-1">({displayFunds.length})</span>
          </h2>
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
        
        {displayFunds.length > 0 ? (
          <div className="space-y-3 mb-4">
            {displayFunds.map((fund) => (
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
                    <p className="text-xs text-gray-500">{fund.category}</p>
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
              Try adjusting your search or selecting a different category
            </p>
          </div>
        )}
        
        <Button 
          onClick={() => navigate('/invest/mutual-funds')} 
          className="w-full"
          variant="outline"
        >
          View All Fund Houses
        </Button>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default InvestmentProviderPage;
