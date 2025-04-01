import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, Send, QrCode, CreditCard, Receipt, Gift, ChevronRight, Banknote, Plus, Calendar, Wallet, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PaymentCard from '@/components/PaymentCard';
import TransactionItem from '@/components/TransactionItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(12500);
  
  const quickActions = [
    { name: 'Send Money', icon: <Send size={22} />, color: 'bg-app-light-blue text-app-blue', path: '/payments/send' },
    { name: 'Scan & Pay', icon: <QrCode size={22} />, color: 'bg-app-light-blue text-app-blue', path: '/payments/scan' },
    { name: 'Pay Bills', icon: <Receipt size={22} />, color: 'bg-app-light-blue text-app-blue', path: '/bills' },
    { name: 'Invest', icon: <TrendingUp size={22} />, color: 'bg-app-light-green text-app-teal', path: '/invest' },
  ];
  
  const transactions = [
    { id: 'txn1', title: 'Aditya Sharma', description: 'Payment received', amount: 500, date: 'Today, 2:30 PM', type: 'credit' },
    { id: 'txn2', title: 'Cafe Coffee Day', description: 'Food & Beverages', amount: 285, date: 'Yesterday, 9:15 AM', type: 'debit', category: 'Food' },
    { id: 'txn3', title: 'Amazon', description: 'Shopping', amount: 1299, date: '22 Jul, 6:45 PM', type: 'debit', category: 'Shopping' },
    { id: 'txn4', title: 'Reliance Mutual Fund', description: 'Investment', amount: 5000, date: '20 Jul, 11:30 AM', type: 'debit', category: 'Investment' },
  ];

  return (
    <div className="app-container pb-20">
      {/* Header */}
      <div className="header-gradient px-6 pt-6 pb-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-xl font-semibold">Hello, Rahul</h1>
            <p className="text-white/80 text-sm">Welcome back</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => navigate('/search')}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
            >
              <Search size={20} className="text-white" />
            </button>
            <button 
              onClick={() => navigate('/notifications')}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center relative"
            >
              <Bell size={20} className="text-white" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-app-red rounded-full"></span>
            </button>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-white/80 text-sm">Total Balance</p>
            <button className="text-xs bg-white/20 rounded-full px-2 py-1 text-white">
              View History
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-1">
            ₹{balance.toLocaleString('en-IN')}
          </h2>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <button 
                onClick={() => navigate('/payments/add-money')}
                className="flex items-center bg-white/20 rounded-full px-3 py-1.5 text-white text-xs font-medium"
              >
                <Plus size={16} className="mr-1" />
                Add Money
              </button>
              <button
                onClick={() => navigate('/payments/withdraw')}
                className="flex items-center bg-white/20 rounded-full px-3 py-1.5 text-white text-xs font-medium"
              >
                <Banknote size={16} className="mr-1" />
                Withdraw
              </button>
            </div>
            <button
              onClick={() => navigate('/payment-history')}
              className="text-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center space-y-2"
              onClick={() => navigate(action.path)}
            >
              <div className={`w-14 h-14 rounded-full ${action.color} flex items-center justify-center`}>
                {action.icon}
              </div>
              <span className="text-xs text-center">{action.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Cards Section */}
      <div className="px-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Your Cards</h2>
          <button 
            onClick={() => navigate('/cards')}
            className="text-app-blue text-sm font-medium flex items-center"
          >
            View All <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <PaymentCard 
            cardNumber="4111111111111111"
            cardHolder="Rahul Sharma"
            expiryDate="09/26"
            balance={42150}
            cardType="visa"
          />
        </div>
      </div>
      
      {/* Features Section */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Explore Features</h2>
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => navigate('/rewards')}
            className="card-action"
          >
            <div className="feature-icon bg-app-orange">
              <Gift size={20} />
            </div>
            <span className="text-xs text-center">Rewards</span>
          </button>
          
          <button 
            onClick={() => navigate('/bills/upcoming')}
            className="card-action"
          >
            <div className="feature-icon bg-app-purple">
              <Calendar size={20} />
            </div>
            <span className="text-xs text-center">Upcoming Bills</span>
          </button>
          
          <button 
            onClick={() => navigate('/wallet')}
            className="card-action"
          >
            <div className="feature-icon bg-app-blue">
              <Wallet size={20} />
            </div>
            <span className="text-xs text-center">Wallet</span>
          </button>
          
          <button 
            onClick={() => navigate('/shopping')}
            className="card-action"
          >
            <div className="feature-icon bg-app-red">
              <ShoppingBag size={20} />
            </div>
            <span className="text-xs text-center">Shopping</span>
          </button>
          
          <button 
            onClick={() => navigate('/payments/request')}
            className="card-action"
          >
            <div className="feature-icon bg-app-green">
              <Users size={20} />
            </div>
            <span className="text-xs text-center">Request Money</span>
          </button>
          
          <button 
            onClick={() => navigate('/cards')}
            className="card-action"
          >
            <div className="feature-icon bg-app-dark-blue">
              <CreditCard size={20} />
            </div>
            <span className="text-xs text-center">Cards</span>
          </button>
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="px-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <button 
            onClick={() => navigate('/transactions')}
            className="text-app-blue text-sm font-medium flex items-center"
          >
            View All <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {transactions.map((transaction, index) => (
            <TransactionItem
              key={index}
              id={transaction.id}
              title={transaction.title}
              description={transaction.description}
              amount={transaction.amount}
              date={transaction.date}
              type={transaction.type as 'credit' | 'debit'}
              category={transaction.category}
            />
          ))}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={() => navigate('/transactions')}
        >
          See All Transactions
        </Button>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default HomePage;
