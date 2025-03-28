
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

interface Provider {
  id: string;
  name: string;
  logo: string;
  category: string;
}

const BillCategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Map category IDs to display names
  const categoryNames: Record<string, string> = {
    'electricity': 'Electricity',
    'mobile': 'Mobile',
    'broadband': 'Broadband',
    'dth': 'DTH/Cable TV',
    'water': 'Water',
    'gas': 'Gas',
    'creditcard': 'Credit Card',
    'loan': 'Loan',
  };
  
  // Sample providers for each category
  const providers: Record<string, Provider[]> = {
    'electricity': [
      { id: 'elec1', name: 'Tata Power', logo: '⚡', category: 'Electricity' },
      { id: 'elec2', name: 'BSES Rajdhani', logo: '⚡', category: 'Electricity' },
      { id: 'elec3', name: 'Adani Electricity', logo: '⚡', category: 'Electricity' },
      { id: 'elec4', name: 'MSEDCL', logo: '⚡', category: 'Electricity' },
    ],
    'mobile': [
      { id: 'mob1', name: 'Airtel Prepaid', logo: '📱', category: 'Mobile' },
      { id: 'mob2', name: 'Jio Prepaid', logo: '📱', category: 'Mobile' },
      { id: 'mob3', name: 'Vi Prepaid', logo: '📱', category: 'Mobile' },
      { id: 'mob4', name: 'BSNL Prepaid', logo: '📱', category: 'Mobile' },
      { id: 'mob5', name: 'Airtel Postpaid', logo: '📱', category: 'Mobile' },
      { id: 'mob6', name: 'Jio Postpaid', logo: '📱', category: 'Mobile' },
    ],
    // Add more providers for other categories
  };
  
  // Get providers for the current category
  const categoryProviders = providers[categoryId || ''] || [];
  
  // Filter providers based on search query
  const filteredProviders = categoryProviders.filter(provider => 
    provider.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleProviderSelect = (providerId: string) => {
    navigate(`/bills/provider/${providerId}`);
  };

  return (
    <div className="app-container pb-20">
      <Header title={categoryNames[categoryId || ''] || 'Bills'} showBack={true} />
      
      <div className="px-6 py-4">
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder={`Search ${categoryNames[categoryId || '']} providers`}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
        </div>
        
        <div className="space-y-3">
          {filteredProviders.map((provider) => (
            <div 
              key={provider.id}
              className="p-4 bg-white rounded-xl shadow-sm flex items-center cursor-pointer hover:shadow-md transition-all duration-200"
              onClick={() => handleProviderSelect(provider.id)}
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
        
        {filteredProviders.length === 0 && (
          <div className="text-center py-6">
            <p className="text-gray-500">No providers found for this category</p>
          </div>
        )}
      </div>
      
      <BottomNav />
    </div>
  );
};

export default BillCategoryPage;
