
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  Bell,
  User,
  BarChart3,
  ArrowRight,
  Home,
  Send,
  Banknote,
  LineChart,
  Menu
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InvestmentInsights from '@/components/InvestmentInsights';
import BottomNav from '@/components/BottomNav';

// Mock data for categories
const categories = [
  { id: 'eq-lc', name: 'Large Cap', icon: '📊', fundCount: 56 },
  { id: 'eq-mc', name: 'Mid Cap', icon: '📈', fundCount: 42 },
  { id: 'eq-sc', name: 'Small Cap', icon: '🚀', fundCount: 38 },
  { id: 'eq-fc', name: 'Flexi Cap', icon: '🔄', fundCount: 62 },
  { id: 'debt', name: 'Debt Funds', icon: '🏦', fundCount: 68 },
  { id: 'hybrid', name: 'Hybrid Funds', icon: '⚖️', fundCount: 58 },
];

// Mock data for mutual fund providers
const providers = [
  { id: 'sbi', name: 'SBI Mutual Fund', logo: '🏛️', fundCount: 48, aum: '₹7,52,956 Cr' },
  { id: 'hdfc', name: 'HDFC Mutual Fund', logo: '🏢', fundCount: 42, aum: '₹5,48,725 Cr' },
  { id: 'axis', name: 'Axis Mutual Fund', logo: '🔵', fundCount: 37, aum: '₹2,98,672 Cr' },
  { id: 'icici', name: 'ICICI Prudential', logo: '🟡', fundCount: 56, aum: '₹5,24,123 Cr' },
  { id: 'aditya', name: 'Aditya Birla Sun Life', logo: '🌞', fundCount: 52, aum: '₹3,15,481 Cr' },
  { id: 'kotak', name: 'Kotak Mahindra', logo: '🔴', fundCount: 40, aum: '₹2,87,349 Cr' },
];

// Mock data for insights
const mockInsights = [
  {
    id: '1',
    type: 'recommendation',
    title: 'Increase your SIP for better returns',
    description: 'Based on your investment pattern, increasing your SIP amount by 10% can significantly improve your long-term returns.',
    actionLink: '/invest/sip-calculator',
    actionText: 'Calculate impact'
  },
  {
    id: '2',
    type: 'alert',
    title: 'SIP payment due in 3 days',
    description: 'Your monthly SIP payment for HDFC Mid-Cap Opportunities Fund is due on 15th May.',
    actionLink: '/invest/sip-management',
    actionText: 'Manage SIP'
  },
  {
    id: '3',
    type: 'opportunity',
    title: 'New fund recommendation',
    description: 'Based on your portfolio, Mirae Asset Emerging Bluechip Fund could be a good addition for diversification.',
    actionLink: '/invest/fund/mirae1',
    actionText: 'View fund'
  }
];

const MutualFundProviderPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  return (
    <div className="app-container pb-16">
      {/* Header */}
      <div className="px-4 py-5 flex items-center justify-between bg-white sticky top-0 z-10">
        <h1 className="text-2xl font-bold">Investments</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Bell size={24} />
            <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
          </div>
          <User size={24} onClick={() => navigate('/profile')} />
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="explore" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-4 bg-gray-100 p-1 rounded-md mx-4">
          <TabsTrigger 
            value="portfolio" 
            className="rounded-md data-[state=active]:bg-white py-2"
          >
            Your Portfolio
          </TabsTrigger>
          <TabsTrigger 
            value="explore" 
            className="rounded-md data-[state=active]:bg-white py-2"
          >
            Explore
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="portfolio" className="px-4 space-y-6">
          <div className="bg-white rounded-xl p-8 flex flex-col items-center text-center shadow-sm border border-gray-200">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <LineChart size={32} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-medium mb-2">Start Your Investment Journey</h2>
            <p className="text-gray-600 mb-6">
              Invest in mutual funds and grow your wealth over time with disciplined investing
            </p>
            <Button 
              onClick={() => navigate('/invest/mutual-funds')} 
              className="bg-blue-600"
            >
              Explore Mutual Funds
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="explore" className="space-y-6">
          {/* Search Bar */}
          <div className="px-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input 
                placeholder="Search funds, categories or AMCs..." 
                className="pl-10 border-gray-300 rounded-full bg-gray-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Top Categories */}
          <div className="px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Top Categories</h2>
              <Button 
                variant="link" 
                className="text-blue-600 font-semibold p-0"
                onClick={() => navigate('/invest/categories')}
              >
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {categories.slice(0, 6).map((category) => (
                <div 
                  key={category.id}
                  className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200"
                  onClick={() => navigate(`/invest/category/${category.id}`)}
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <div className="text-sm font-medium text-center">{category.name}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Fund Houses */}
          <div className="px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Fund Houses</h2>
              <Button 
                variant="link" 
                className="text-blue-600 font-semibold p-0"
                onClick={() => navigate('/invest/mutual-funds')}
              >
                View All
              </Button>
            </div>
            
            <div className="flex overflow-x-auto space-x-3 pb-2 hide-scrollbar">
              {providers.slice(0, 4).map((provider) => (
                <div 
                  key={provider.id}
                  className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center min-w-[120px] shadow-sm hover:shadow-md transition-shadow duration-200"
                  onClick={() => navigate(`/invest/provider/${provider.id}`)}
                >
                  <div className="text-3xl mb-2">{provider.logo}</div>
                  <div className="text-xs font-medium text-center whitespace-nowrap">{provider.name}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Investment Insights */}
          <div className="px-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">Investment Insights</h2>
              <Button 
                variant="link" 
                className="text-blue-600 font-semibold p-0"
                onClick={() => navigate('/invest/insights')}
              >
                <span>View All</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <InvestmentInsights 
              insights={mockInsights.slice(0, 2)} 
              viewAllLink="/invest/insights" 
            />
          </div>
          
          {/* Popular SIP Collection */}
          <div className="px-4 mb-4">
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <h2 className="text-lg font-semibold mb-2">SIP for better results</h2>
              <p className="text-sm text-gray-600 mb-3">Start a Systematic Investment Plan with just ₹500/month</p>
              <Button 
                className="w-full bg-blue-600"
                onClick={() => navigate('/invest/sip-collection')}
              >
                Explore SIP Options
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Custom Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 flex items-center justify-around p-2">
        <div className="flex flex-col items-center py-2 px-3 text-gray-500">
          <Home size={22} className="mb-1" />
          <span className="text-xs">Home</span>
        </div>
        
        <div className="flex flex-col items-center py-2 px-3 text-gray-500">
          <Send size={22} className="mb-1" />
          <span className="text-xs">Payments</span>
        </div>
        
        <div className="flex flex-col items-center py-2 px-3 text-gray-500">
          <Banknote size={22} className="mb-1" />
          <span className="text-xs">Bills</span>
        </div>
        
        <div className="flex flex-col items-center py-2 px-3 text-blue-600">
          <LineChart size={22} className="mb-1" />
          <span className="text-xs">Invest</span>
        </div>
        
        <div className="flex flex-col items-center py-2 px-3 text-gray-500">
          <Menu size={22} className="mb-1" />
          <span className="text-xs">More</span>
        </div>
      </div>
    </div>
  );
};

export default MutualFundProviderPage;
