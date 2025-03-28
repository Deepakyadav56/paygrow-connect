
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, ChevronRight, User, Building, Phone, Globe, Bolt, Wifi, Coffee, ShoppingBag, ChevronDown, History } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Contact {
  id: string;
  name: string;
  phone: string;
  recent?: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const PaymentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const recentContacts: Contact[] = [
    { id: 'c1', name: 'Aditya Sharma', phone: '9876543210', recent: true },
    { id: 'c2', name: 'Priya Singh', phone: '9876543211', recent: true },
    { id: 'c3', name: 'Rahul Gupta', phone: '9876543212', recent: true },
    { id: 'c4', name: 'Ananya Patel', phone: '9876543213', recent: true },
    { id: 'c5', name: 'Vikram Malhotra', phone: '9876543214', recent: true },
  ];
  
  const filteredContacts = searchQuery
    ? recentContacts.filter(
        contact => contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                contact.phone.includes(searchQuery)
      )
    : recentContacts;
  
  const paymentCategories: Category[] = [
    { id: 'cat1', name: 'Mobile Recharge', icon: <Phone size={20} />, color: 'bg-app-light-blue text-app-blue' },
    { id: 'cat2', name: 'DTH', icon: <Wifi size={20} />, color: 'bg-app-light-orange text-app-orange' },
    { id: 'cat3', name: 'Electricity', icon: <Bolt size={20} />, color: 'bg-app-light-green text-app-green' },
    { id: 'cat4', name: 'Broadband', icon: <Globe size={20} />, color: 'bg-app-purple text-white' },
    { id: 'cat5', name: 'Food & Drinks', icon: <Coffee size={20} />, color: 'bg-red-100 text-app-red' },
    { id: 'cat6', name: 'Shopping', icon: <ShoppingBag size={20} />, color: 'bg-purple-100 text-purple-600' }
  ];
  
  const handleContactClick = (contactId: string) => {
    navigate(`/payments/send-to/${contactId}`);
  };
  
  const handleCategoryClick = (categoryId: string) => {
    navigate(`/bills/category/${categoryId}`);
  };

  return (
    <div className="app-container pb-20">
      <Header title="Payments" showNotification showProfile />
      
      <div className="px-6 py-4">
        <div className="flex space-x-3 mb-6">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Search by name or phone number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-standard pl-10"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/payments/scan')}
            className="button-icon"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7V5C3 3.89543 3.89543 3 5 3H7M17 3H19C20.1046 3 21 3.89543 21 5V7M21 17V19C21 20.1046 20.1046 21 19 21H17M7 21H5C3.89543 21 3 20.1046 3 19V17M7 7H17M7 12H17M7 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate('/payments/send')}
            className="w-[48%] button-primary flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Send Money
          </button>
          
          <button
            onClick={() => navigate('/payments/request')}
            className="w-[48%] button-secondary flex items-center justify-center"
          >
            <Users size={20} className="mr-2" />
            Request Money
          </button>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Contacts</h2>
            <button onClick={() => navigate('/contacts')} className="text-app-blue text-sm">
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-5 gap-3">
            <button
              onClick={() => navigate('/contacts')}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-app-light-blue flex items-center justify-center mb-1">
                <Users size={20} className="text-app-blue" />
              </div>
              <span className="text-xs">All</span>
            </button>
            
            {filteredContacts.slice(0, 4).map((contact) => (
              <button
                key={contact.id}
                className="flex flex-col items-center"
                onClick={() => handleContactClick(contact.id)}
              >
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-1">
                  <span className="text-gray-700 font-medium">{contact.name.charAt(0)}</span>
                </div>
                <span className="text-xs truncate w-full text-center">{contact.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Bill Payments</h2>
            <button onClick={() => navigate('/bills')} className="text-app-blue text-sm">
              See All
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {paymentCategories.map((category) => (
              <button
                key={category.id}
                className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mb-2`}>
                  {category.icon}
                </div>
                <span className="text-xs text-center">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Business Payments</h2>
            <button className="text-xs bg-app-teal/20 text-app-teal px-2 py-1 rounded-full">
              New
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/bills/businesses')}
              className="p-4 bg-white rounded-xl shadow-sm flex items-center"
            >
              <div className="w-10 h-10 rounded-full bg-app-light-blue flex items-center justify-center mr-3">
                <Building size={20} className="text-app-blue" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">Pay to Business</h3>
                <p className="text-xs text-gray-500">Shops, vendors & more</p>
              </div>
            </button>
            
            <button
              onClick={() => navigate('/payments/history')}
              className="p-4 bg-white rounded-xl shadow-sm flex items-center"
            >
              <div className="w-10 h-10 rounded-full bg-app-light-green flex items-center justify-center mr-3">
                <History size={20} className="text-app-teal" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">Payment History</h3>
                <p className="text-xs text-gray-500">View all transactions</p>
              </div>
            </button>
          </div>
        </div>
        
        <div className="rounded-xl overflow-hidden bg-gradient-to-r from-app-blue to-app-dark-blue p-5 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">Refer & Earn</h3>
              <p className="text-sm text-white/80">Invite friends to PayGrow</p>
            </div>
            <Button
              variant="outline"
              className="bg-white text-app-blue border-0 hover:bg-white/90"
              onClick={() => navigate('/refer')}
            >
              Invite
            </Button>
          </div>
          <p className="text-sm text-white/80 mb-2">
            Get ₹100 for each friend who joins using your referral code
          </p>
          <div className="bg-white/20 rounded-lg p-3 flex justify-between items-center">
            <div className="font-medium">PAYGROW100</div>
            <Button size="sm" variant="ghost" className="bg-white/20 hover:bg-white/30 text-white h-8">
              Copy
            </Button>
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default PaymentsPage;
