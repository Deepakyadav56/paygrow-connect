
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Zap, Smartphone, Wifi, Tv, Droplet, Home, CreditCard, FileClock, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

interface BillCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface BillProvider {
  id: string;
  name: string;
  logo: string;
  category: string;
  recent?: boolean;
}

const BillsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const billCategories: BillCategory[] = [
    { id: 'electricity', name: 'Electricity', icon: <Zap size={20} />, color: 'bg-yellow-100 text-yellow-600' },
    { id: 'mobile', name: 'Mobile', icon: <Smartphone size={20} />, color: 'bg-blue-100 text-blue-600' },
    { id: 'broadband', name: 'Broadband', icon: <Wifi size={20} />, color: 'bg-purple-100 text-purple-600' },
    { id: 'dth', name: 'DTH/Cable TV', icon: <Tv size={20} />, color: 'bg-red-100 text-red-600' },
    { id: 'water', name: 'Water', icon: <Droplet size={20} />, color: 'bg-teal-100 text-teal-600' },
    { id: 'gas', name: 'Gas', icon: <Home size={20} />, color: 'bg-green-100 text-green-600' },
    { id: 'creditcard', name: 'Credit Card', icon: <CreditCard size={20} />, color: 'bg-rose-100 text-rose-600' },
    { id: 'loan', name: 'Loan', icon: <FileClock size={20} />, color: 'bg-orange-100 text-orange-600' },
  ];
  
  const recentBills: BillProvider[] = [
    { id: 'bill1', name: 'Tata Power', logo: '⚡', category: 'Electricity', recent: true },
    { id: 'bill2', name: 'Airtel Postpaid', logo: '📱', category: 'Mobile', recent: true },
    { id: 'bill3', name: 'Jio Fiber', logo: '🌐', category: 'Broadband', recent: true },
  ];
  
  const popularProviders: BillProvider[] = [
    { id: 'prov1', name: 'Reliance Jio', logo: '📱', category: 'Mobile' },
    { id: 'prov2', name: 'Airtel', logo: '📱', category: 'Mobile' },
    { id: 'prov3', name: 'BSES Rajdhani', logo: '⚡', category: 'Electricity' },
    { id: 'prov4', name: 'Tata Power', logo: '⚡', category: 'Electricity' },
    { id: 'prov5', name: 'Airtel Digital TV', logo: '📺', category: 'DTH/Cable TV' },
    { id: 'prov6', name: 'Tata Sky', logo: '📺', category: 'DTH/Cable TV' },
    { id: 'prov7', name: 'Mahanagar Gas', logo: '🔥', category: 'Gas' },
    { id: 'prov8', name: 'HDFC Credit Card', logo: '💳', category: 'Credit Card' },
  ];
  
  const filteredProviders = searchQuery
    ? popularProviders.filter(
        provider => provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : popularProviders;
    
  const handleCategoryClick = (categoryId: string) => {
    navigate(`/bills/category/${categoryId}`);
  };
  
  const handleRecentBillClick = (billId: string) => {
    navigate(`/bills/pay/${billId}`);
  };
  
  const handleProviderClick = (providerId: string) => {
    navigate(`/bills/provider/${providerId}`);
  };

  return (
    <div className="app-container pb-20">
      <Header title="Bill Payments" showNotification showProfile />
      
      <div className="px-6 py-4">
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Search for bill providers"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
        </div>
        
        {recentBills.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Bills</h2>
              <button 
                className="text-app-blue text-sm font-medium flex items-center"
                onClick={() => navigate('/bills/recent')}
              >
                All <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="space-y-3">
              {recentBills.map((bill) => (
                <div 
                  key={bill.id}
                  className="p-4 bg-white rounded-xl shadow-sm flex items-center cursor-pointer hover:shadow-md transition-all duration-200"
                  onClick={() => handleRecentBillClick(bill.id)}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-lg">
                    {bill.logo}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{bill.name}</div>
                    <div className="text-xs text-gray-500">{bill.category}</div>
                  </div>
                  <Button size="sm" className="bg-app-blue hover:bg-app-dark-blue">
                    Pay Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Bill Categories</h2>
          <div className="grid grid-cols-4 gap-3">
            {billCategories.map((category) => (
              <button
                key={category.id}
                className="p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center mb-2`}>
                  {category.icon}
                </div>
                <span className="text-xs text-center">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-4">All Providers</h2>
          
          <div className="space-y-3">
            {filteredProviders.map((provider) => (
              <div 
                key={provider.id}
                className="p-4 bg-white rounded-xl shadow-sm flex items-center cursor-pointer hover:shadow-md transition-all duration-200"
                onClick={() => handleProviderClick(provider.id)}
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-lg">
                  {provider.logo}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{provider.name}</div>
                  <div className="text-xs text-gray-500">{provider.category}</div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default BillsPage;
