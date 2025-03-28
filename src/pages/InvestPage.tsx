
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, TrendingUp, TrendingDown, Filter, BarChart3, ArrowUpRight, Book, LineChart, HelpCircle } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import InvestmentCard from '@/components/InvestmentCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Investment {
  id: string;
  name: string;
  category: string;
  value: number;
  change: number;
  changePercentage: number;
  oneYearReturn?: number;
  threeYearReturn?: number;
  fiveYearReturn?: number;
  riskLevel?: 'Low' | 'Moderate' | 'High';
  recommended?: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const InvestPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'portfolio' | 'explore'>('portfolio');
  const [filterOpen, setFilterOpen] = useState(false);
  
  const portfolio: Investment[] = [
    { 
      id: 'inv1', 
      name: 'Axis Bluechip Fund', 
      category: 'Equity', 
      value: 25000, 
      change: 1200, 
      changePercentage: 4.8,
      oneYearReturn: 12.5,
      threeYearReturn: 8.7,
      fiveYearReturn: 11.2,
      riskLevel: 'Moderate'
    },
    { 
      id: 'inv2', 
      name: 'HDFC Corporate Bond Fund', 
      category: 'Debt', 
      value: 30000, 
      change: -200, 
      changePercentage: -0.67,
      oneYearReturn: 5.8,
      threeYearReturn: 7.2,
      fiveYearReturn: 6.9,
      riskLevel: 'Low'
    },
    { 
      id: 'inv3', 
      name: 'SBI Small Cap Fund', 
      category: 'Equity', 
      value: 15000, 
      change: 850, 
      changePercentage: 5.67,
      oneYearReturn: 18.4,
      threeYearReturn: 15.2,
      fiveYearReturn: 14.6,
      riskLevel: 'High'
    }
  ];
  
  const recommended: Investment[] = [
    { 
      id: 'rec1', 
      name: 'Mirae Asset Large Cap Fund', 
      category: 'Equity', 
      value: 0, 
      change: 0, 
      changePercentage: 14.2,
      oneYearReturn: 14.2,
      threeYearReturn: 11.5,
      fiveYearReturn: 13.8,
      riskLevel: 'Moderate',
      recommended: true
    },
    { 
      id: 'rec2', 
      name: 'Parag Parikh Flexi Cap Fund', 
      category: 'Equity', 
      value: 0, 
      change: 0, 
      changePercentage: 16.7,
      oneYearReturn: 16.7,
      threeYearReturn: 18.3,
      fiveYearReturn: 15.9,
      riskLevel: 'Moderate',
      recommended: true
    }
  ];
  
  const investmentCategories: Category[] = [
    { id: 'cat1', name: 'Equity', icon: <TrendingUp size={20} />, color: 'bg-app-light-blue text-app-blue' },
    { id: 'cat2', name: 'Debt', icon: <BarChart3 size={20} />, color: 'bg-app-light-green text-app-teal' },
    { id: 'cat3', name: 'Hybrid', icon: <LineChart size={20} />, color: 'bg-app-light-orange text-app-orange' },
    { id: 'cat4', name: 'Tax Saving', icon: <ArrowUpRight size={20} />, color: 'bg-purple-100 text-purple-600' },
    { id: 'cat5', name: 'Guides', icon: <Book size={20} />, color: 'bg-blue-100 text-blue-600' }
  ];
  
  const totalPortfolioValue = portfolio.reduce((total, inv) => total + inv.value, 0);
  const totalPortfolioChange = portfolio.reduce((total, inv) => total + inv.change, 0);
  const totalPortfolioChangePercentage = (totalPortfolioChange / (totalPortfolioValue - totalPortfolioChange)) * 100;
  
  const handleInvestmentClick = (id: string) => {
    navigate(`/invest/fund/${id}`);
  };
  
  const handleCategoryClick = (id: string) => {
    navigate(`/invest/category/${id}`);
  };

  return (
    <div className="app-container pb-20">
      <Header title="Investments" showNotification showProfile />
      
      <div className="px-6 py-4">
        <div className="flex space-x-3 mb-6">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Search mutual funds"
              className="input-standard pl-10"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
          </div>
          
          <button 
            onClick={() => setFilterOpen(!filterOpen)}
            className="button-icon"
          >
            <Filter size={20} />
          </button>
        </div>
        
        <div className="flex justify-between border border-gray-200 rounded-xl overflow-hidden mb-6">
          <button
            className={`flex-1 py-3 text-center ${activeTab === 'portfolio' ? 'bg-app-blue text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setActiveTab('portfolio')}
          >
            My Portfolio
          </button>
          <button
            className={`flex-1 py-3 text-center ${activeTab === 'explore' ? 'bg-app-blue text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setActiveTab('explore')}
          >
            Explore
          </button>
        </div>
        
        {activeTab === 'portfolio' && (
          <>
            <div className="p-5 rounded-xl bg-gradient-to-r from-app-blue to-app-dark-blue text-white mb-6">
              <div className="mb-4">
                <h3 className="text-white/80 text-sm">Portfolio Value</h3>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold">
                    ₹{totalPortfolioValue.toLocaleString('en-IN')}
                  </div>
                  <div className={`text-sm px-2 py-0.5 rounded-full flex items-center ${totalPortfolioChange >= 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                    {totalPortfolioChange >= 0 ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                    {totalPortfolioChange >= 0 ? '+' : ''}
                    {totalPortfolioChangePercentage.toFixed(2)}%
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between space-x-2">
                <button
                  onClick={() => navigate('/invest/new')}
                  className="flex-1 bg-white text-app-blue font-medium py-2.5 rounded-lg"
                >
                  Invest More
                </button>
                <button
                  onClick={() => navigate('/invest/withdraw')}
                  className="flex-1 bg-white/20 text-white font-medium py-2.5 rounded-lg"
                >
                  Withdraw
                </button>
              </div>
            </div>
            
            {portfolio.length > 0 ? (
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Your Investments</h2>
                  <button 
                    onClick={() => navigate('/invest/portfolio')}
                    className="text-app-blue text-sm font-medium flex items-center"
                  >
                    All <ChevronRight size={16} />
                  </button>
                </div>
                
                {portfolio.map((investment) => (
                  <InvestmentCard
                    key={investment.id}
                    name={investment.name}
                    category={investment.category}
                    value={investment.value}
                    change={investment.change}
                    changePercentage={investment.changePercentage}
                    oneYearReturn={investment.oneYearReturn}
                    threeYearReturn={investment.threeYearReturn}
                    fiveYearReturn={investment.fiveYearReturn}
                    onClick={() => handleInvestmentClick(investment.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-6 bg-gray-50 rounded-xl text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-app-light-blue flex items-center justify-center mx-auto mb-4">
                  <LineChart size={24} className="text-app-blue" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Start Investing</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Begin your investment journey with curated mutual funds
                </p>
                <Button
                  onClick={() => navigate('/invest/new')}
                  className="bg-app-blue hover:bg-app-dark-blue"
                >
                  Invest Now
                </Button>
              </div>
            )}
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Recommended for You</h2>
                <button 
                  onClick={() => navigate('/invest/recommended')}
                  className="text-app-blue text-sm font-medium flex items-center"
                >
                  View All <ChevronRight size={16} />
                </button>
              </div>
              
              {recommended.map((investment) => (
                <InvestmentCard
                  key={investment.id}
                  name={investment.name}
                  category={investment.category}
                  value={investment.value}
                  change={investment.change}
                  changePercentage={investment.changePercentage}
                  oneYearReturn={investment.oneYearReturn}
                  threeYearReturn={investment.threeYearReturn}
                  fiveYearReturn={investment.fiveYearReturn}
                  highlighted={investment.recommended}
                  onClick={() => handleInvestmentClick(investment.id)}
                />
              ))}
            </div>
          </>
        )}
        
        {activeTab === 'explore' && (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Categories</h2>
              <div className="grid grid-cols-3 gap-3">
                {investmentCategories.map((category) => (
                  <button
                    key={category.id}
                    className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mb-2`}>
                      {category.icon}
                    </div>
                    <span className="text-sm">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Top Performing Funds</h2>
                <button 
                  onClick={() => navigate('/invest/top-funds')}
                  className="text-app-blue text-sm font-medium flex items-center"
                >
                  View All <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm overflow-hidden p-4">
                <div className="flex justify-between items-center border-b border-gray-100 py-3">
                  <div className="font-medium">Fund Name</div>
                  <div className="font-medium">1Y Returns</div>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-100 py-3">
                  <div>
                    <div>Quant Small Cap Fund</div>
                    <div className="text-xs text-gray-500">Small Cap</div>
                  </div>
                  <div className="text-app-green font-medium">+32.8%</div>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-100 py-3">
                  <div>
                    <div>Parag Parikh Flexi Cap</div>
                    <div className="text-xs text-gray-500">Flexi Cap</div>
                  </div>
                  <div className="text-app-green font-medium">+28.5%</div>
                </div>
                
                <div className="flex justify-between items-center py-3">
                  <div>
                    <div>Mirae Asset Tax Saver</div>
                    <div className="text-xs text-gray-500">ELSS</div>
                  </div>
                  <div className="text-app-green font-medium">+25.2%</div>
                </div>
              </div>
            </div>
            
            <div className="p-5 rounded-xl bg-app-light-blue border border-app-blue/20 mb-8">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-4">
                  <HelpCircle size={24} className="text-app-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">New to Investing?</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Learn the basics of mutual funds and start your investment journey
                  </p>
                  <Button
                    variant="outline"
                    className="border-app-blue text-app-blue hover:bg-app-blue hover:text-white"
                    onClick={() => navigate('/invest/learn')}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      <BottomNav />
    </div>
  );
};

export default InvestPage;
