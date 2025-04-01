
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, Search, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TransactionItem from '@/components/TransactionItem';
import BottomNav from '@/components/BottomNav';

const transactions = [
  { id: 'txn1', title: 'Aditya Sharma', description: 'Payment received', amount: 500, date: 'Today, 2:30 PM', type: 'credit' },
  { id: 'txn2', title: 'Cafe Coffee Day', description: 'Food & Beverages', amount: 285, date: 'Yesterday, 9:15 AM', type: 'debit', category: 'Food' },
  { id: 'txn3', title: 'Amazon', description: 'Shopping', amount: 1299, date: '22 Jul, 6:45 PM', type: 'debit', category: 'Shopping' },
  { id: 'txn4', title: 'Reliance Mutual Fund', description: 'Investment', amount: 5000, date: '20 Jul, 11:30 AM', type: 'debit', category: 'Investment' },
  { id: 'txn5', title: 'Swiggy', description: 'Food & Beverages', amount: 450, date: '18 Jul, 8:00 PM', type: 'debit', category: 'Food' },
  { id: 'txn6', title: 'Priya Mehra', description: 'Payment received', amount: 1200, date: '15 Jul, 3:45 PM', type: 'credit' },
  { id: 'txn7', title: 'Netflix', description: 'Entertainment', amount: 499, date: '10 Jul, 12:00 AM', type: 'debit', category: 'Entertainment' },
  { id: 'txn8', title: 'Axis Bank Credit Card', description: 'Bill payment', amount: 4500, date: '05 Jul, 11:30 AM', type: 'debit', category: 'Bills' },
];

const TransactionHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const filteredTransactions = transactions.filter(transaction => {
    // Filter by type
    if (filter === 'credit' && transaction.type !== 'credit') return false;
    if (filter === 'debit' && transaction.type !== 'debit') return false;
    
    // Filter by search query
    if (searchQuery && !transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !transaction.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="app-container pb-20">
      <div className="p-4 border-b">
        <div className="flex items-center mb-4">
          <button onClick={() => navigate(-1)} className="mr-3">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold">Transaction History</h1>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search transactions..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            className="ml-2 px-3"
            onClick={() => navigate('/transactions/filter')}
          >
            <Filter size={18} />
          </Button>
          <Button 
            variant="outline" 
            className="ml-2 px-3"
            onClick={() => {}}
          >
            <Calendar size={18} />
          </Button>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="all" onClick={() => setFilter('all')}>All</TabsTrigger>
            <TabsTrigger value="credit" onClick={() => setFilter('credit')}>Money In</TabsTrigger>
            <TabsTrigger value="debit" onClick={() => setFilter('debit')}>Money Out</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex justify-between items-center p-4 border-b">
        <span className="text-sm">{filteredTransactions.length} Transactions</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-app-blue flex items-center"
          onClick={() => {}}
        >
          <Download size={16} className="mr-1" /> Export
        </Button>
      </div>
      
      <div className="divide-y">
        {filteredTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
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
      
      <BottomNav />
    </div>
  );
};

export default TransactionHistoryPage;
