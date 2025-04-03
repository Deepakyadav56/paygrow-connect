
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
import Header from '@/components/Header';

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

// Mock data for insights - Fixed the type property to use specific string literals
const mockInsights = [
  {
    id: '1',
    type: 'recommendation' as const, // Using a specific string literal type
    title: 'Increase your SIP for better returns',
    description: 'Based on your investment pattern, increasing your SIP amount by 10% can significantly improve your long-term returns.',
    actionLink: '/invest/sip-calculator',
    actionText: 'Calculate impact'
  },
  {
    id: '2',
    type: 'alert' as const, // Using a specific string literal type
    title: 'SIP payment due in 3 days',
    description: 'Your monthly SIP payment for HDFC Mid-Cap Opportunities Fund is due on 15th May.',
    actionLink: '/invest/sip-management',
    actionText: 'Manage SIP'
  },
  {
    id: '3',
    type: 'opportunity' as const, // Using a specific string literal type
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
      {/* Use the Header component instead of a custom header */}
      <Header 
        title="Investments" 
        showNotification 
        showNotificationBadge 
        showProfile
      />
      
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
      
      {/* Use the BottomNav component */}
      <BottomNav activeTab="invest" />
    </div>
  );
};

export default MutualFundProviderPage;
