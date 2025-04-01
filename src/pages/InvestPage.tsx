import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Filter, 
  Search, 
  Info, 
  ChevronRight, 
  ArrowRight, 
  Award, 
  Percent, 
  Plus 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

// Mock data for investments
const recommendedFunds = [
  {
    id: 'inv1',
    name: 'Axis Bluechip Fund',
    category: 'Equity - Large Cap',
    amc: 'Axis Mutual Fund',
    logo: '🔵',
    rating: 4.5,
    returns: {
      oneYear: 12.5,
      threeYear: 8.7,
      fiveYear: 11.2
    },
    minInvestment: 500
  },
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
    minInvestment: 1000
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
    minInvestment: 500
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
    minInvestment: 1000
  }
];

const yourInvestments = [
  {
    id: 'inv1',
    name: 'Axis Bluechip Fund',
    category: 'Equity - Large Cap',
    amc: 'Axis Mutual Fund',
    logo: '🔵',
    value: 25000,
    investedAmount: 24500,
    returns: 2.04,
    units: 457.93,
    nav: 54.59,
    status: 'active'
  },
  {
    id: 'inv5',
    name: 'ICICI Prudential Technology Fund',
    category: 'Equity - Sectoral',
    amc: 'ICICI Prudential',
    logo: '🟡',
    value: 15000,
    investedAmount: 16200,
    returns: -7.41,
    units: 253.76,
    nav: 59.11,
    status: 'active'
  }
];

const categories = [
  { id: 'eq-lc', name: 'Large Cap', icon: '📊', risk: 'Moderate', returns: 'Consistent' },
  { id: 'eq-mc', name: 'Mid Cap', icon: '📈', risk: 'Moderately High', returns: 'High' },
  { id: 'eq-sc', name: 'Small Cap', icon: '🚀', risk: 'High', returns: 'Very High' },
  { id: 'flexi', name: 'Flexi Cap', icon: '🔄', risk: 'Moderate to High', returns: 'Diverse' },
  { id: 'debt', name: 'Debt Funds', icon: '🏦', risk: 'Low', returns: 'Stable' },
  { id: 'hybrid', name: 'Hybrid Funds', icon: '⚖️', risk: 'Low to Moderate', returns: 'Balanced' }
];

const providers = [
  { id: 'sbi', name: 'SBI Mutual Fund', icon: '🏛️' },
  { id: 'hdfc', name: 'HDFC Mutual Fund', icon: '🏢' },
  { id: 'axis', name: 'Axis Mutual Fund', icon: '🔵' },
  { id: 'icici', name: 'ICICI Prudential', icon: '🟡' },
  { id: 'aditya', name: 'Aditya Birla Sun Life', icon: '🌞' },
  { id: 'kotak', name: 'Kotak Mahindra', icon: '🔴' }
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

const InvestPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const totalPortfolioValue = yourInvestments.reduce((sum, inv) => sum + inv.value, 0);
  const totalInvested = yourInvestments.reduce((sum, inv) => sum + inv.investedAmount, 0);
  const totalReturns = totalPortfolioValue - totalInvested;
  const returnPercentage = totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0;
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const filteredFunds = recommendedFunds.filter(fund => 
    fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fund.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fund.amc.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="app-container">
      <Header 
        title="Investments" 
        showProfile 
        showNotification
      />
      
      <div className="p-4">
        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="portfolio">Your Portfolio</TabsTrigger>
            <TabsTrigger value="explore">Explore</TabsTrigger>
          </TabsList>
          
          <TabsContent value="portfolio" className="space-y-4">
            {yourInvestments.length > 0 ? (
              <>
                <div className="rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-app-blue to-app-teal p-4 text-white">
                    <div className="mb-2">
                      <h2 className="text-sm font-medium opacity-90">Current Value</h2>
                      <h3 className="text-2xl font-semibold">₹{totalPortfolioValue.toLocaleString('en-IN')}</h3>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xs opacity-80">Invested Amount</h4>
                        <p className="font-medium">₹{totalInvested.toLocaleString('en-IN')}</p>
                      </div>
                      
                      <div className="text-right">
                        <h4 className="text-xs opacity-80">Returns</h4>
                        <p className={`font-medium ${returnPercentage >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                          {returnPercentage >= 0 ? '+' : ''}{returnPercentage.toFixed(2)}%
                          <span className="ml-1">
                            (₹{Math.abs(totalReturns).toLocaleString('en-IN')})
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 border-x border-b border-gray-200">
                    <div className="flex justify-between mb-4">
                      <h3 className="font-medium">Asset Allocation</h3>
                      <Button variant="ghost" className="h-8 p-0 text-app-blue">
                        View Details
                      </Button>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-20 h-20 mr-4">
                        <PieChart size={80} className="text-gray-400" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-app-blue mr-2"></div>
                            <div className="text-sm">Equity</div>
                          </div>
                          <div className="font-medium">100%</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
                            <div className="text-sm">Debt</div>
                          </div>
                          <div className="font-medium">0%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium">Your Investments</h3>
                  <Button variant="ghost" className="h-8 p-0 text-app-blue">
                    View All
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {yourInvestments.map((investment) => (
                    <div 
                      key={investment.id}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                      onClick={() => navigate(`/invest/fund/${investment.id}`)}
                    >
                      <div className="p-4">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 mr-3 text-xl">
                            {investment.logo}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{investment.name}</h3>
                            <p className="text-xs text-gray-500">{investment.category}</p>
                          </div>
                          <ChevronRight size={20} className="text-gray-400" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Current Value</div>
                            <div className="font-medium">₹{investment.value.toLocaleString('en-IN')}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Returns</div>
                            <div className={`font-medium ${investment.returns >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                              {investment.returns >= 0 ? '+' : ''}{investment.returns.toFixed(2)}%
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Units</div>
                            <div className="font-medium">{investment.units}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Avg. NAV</div>
                            <div className="font-medium">₹{investment.nav}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 flex justify-between border-t border-gray-200">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/invest/options/${investment.id}`);
                          }}
                        >
                          <Plus size={14} className="mr-1" /> Invest More
                        </Button>
                        
                        <Button 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/invest/options/${investment.id}`, { state: { defaultTab: 'sell' } });
                          }}
                        >
                          Redeem
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={() => navigate('/invest/mutual-funds')} 
                  className="w-full flex items-center justify-center mt-2 bg-app-blue"
                >
                  <Plus size={18} className="mr-1.5" /> Invest in New Fund
                </Button>
              </>
            ) : (
              <div className="bg-white rounded-xl p-8 flex flex-col items-center text-center shadow-sm border border-gray-200">
                <div className="w-16 h-16 bg-app-light-blue rounded-full flex items-center justify-center mb-4">
                  <LineChart size={32} className="text-app-blue" />
                </div>
                <h2 className="text-xl font-medium mb-2">Start Your Investment Journey</h2>
                <p className="text-gray-600 mb-6">
                  Invest in mutual funds and grow your wealth over time with disciplined investing
                </p>
                <Button 
                  onClick={() => navigate('/invest/mutual-funds')} 
                  className="bg-app-blue"
                >
                  Explore Mutual Funds
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="explore" className="space-y-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search funds, categories or AMCs..." 
                className="pl-10 border-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Top Categories</h3>
              <Button 
                variant="ghost" 
                className="h-8 p-0 text-app-blue"
                onClick={() => navigate('/invest/categories')}
              >
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              {categories.slice(0, 6).map((category) => (
                <div 
                  key={category.id}
                  className="bg-white border border-gray-200 rounded-xl p-3 text-center"
                  onClick={() => navigate(`/invest/category/${category.id}`)}
                >
                  <div className="text-2xl mb-1">{category.icon}</div>
                  <div className="text-sm font-medium">{category.name}</div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Fund Houses</h3>
              <Button 
                variant="ghost" 
                className="h-8 p-0 text-app-blue"
                onClick={() => navigate('/invest/mutual-funds')}
              >
                View All
              </Button>
            </div>
            
            <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar mb-4">
              {providers.map((provider) => (
                <div 
                  key={provider.id}
                  className="bg-white border border-gray-200 rounded-xl p-3 text-center min-w-[90px]"
                  onClick={() => navigate(`/invest/provider/${provider.id}`)}
                >
                  <div className="text-2xl mb-1">{provider.icon}</div>
                  <div className="text-xs font-medium whitespace-nowrap">{provider.name}</div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Recommended for You</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Filter size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Rating: High to Low</DropdownMenuItem>
                  <DropdownMenuItem>Returns: High to Low</DropdownMenuItem>
                  <DropdownMenuItem>Name: A to Z</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                    
                    <div className="flex items-center text-xs mb-3">
                      <StarRating rating={fund.rating} />
                      <span className="ml-1 text-gray-500">{fund.rating}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
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
                    
                    <Button 
                      className="w-full mt-3"
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
                  Try adjusting your search or browse by categories
                </p>
              </div>
            )}
            
            <Button 
              onClick={() => navigate('/invest/mutual-funds')} 
              className="w-full flex items-center justify-center mt-2"
              variant="outline"
            >
              View All Funds <ArrowRight size={16} className="ml-1" />
            </Button>
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default InvestPage;
