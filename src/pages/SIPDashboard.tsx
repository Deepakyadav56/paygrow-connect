import React, { useState } from 'react';
import { PlusCircle, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import SIPManagementCard from '@/components/SIPManagementCard';

// Define the status type
type SIPStatus = 'active' | 'paused' | 'stopped';

// Mock data for SIPs
const mockSips = [
  {
    id: 'sip1',
    fundId: 'parag-parikh',
    fundName: 'Parag Parikh Flexi Cap Fund',
    logo: <div className="w-full h-full bg-green-500 rounded"></div>,
    amount: 5000,
    frequency: 'Monthly',
    nextDate: '15 Jun 2023',
    status: 'active' as SIPStatus,
    totalInvested: 60000,
    currentValue: 72500,
    returns: {
      value: 12500,
      percentage: 20.83,
    },
  },
  {
    id: 'sip2',
    fundId: 'hdfc-flexi',
    fundName: 'HDFC Flexi Cap Fund',
    logo: <div className="w-full h-full bg-red-500 rounded"></div>,
    amount: 2500,
    frequency: 'Monthly',
    nextDate: '20 Jun 2023',
    status: 'paused' as SIPStatus,
    totalInvested: 30000,
    currentValue: 34800,
    returns: {
      value: 4800,
      percentage: 16.0,
    },
  },
  {
    id: 'sip3',
    fundId: 'quant-small',
    fundName: 'Quant Small Cap Fund',
    logo: <div className="w-full h-full bg-gray-500 rounded"></div>,
    amount: 1000,
    frequency: 'Monthly',
    nextDate: '25 Jun 2023',
    status: 'active' as SIPStatus,
    totalInvested: 12000,
    currentValue: 15600,
    returns: {
      value: 3600,
      percentage: 30.0,
    },
  },
];

const SIPDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredSips = mockSips.filter((sip) => {
    // Use 'all' tab or match the specific status
    if (activeTab === 'all') return true;
    if (activeTab === 'active' && sip.status === 'active') return true;
    if (activeTab === 'paused' && sip.status === 'paused') return true;
    if (activeTab === 'stopped' && sip.status === 'stopped') return true;
    
    return false;
  }).filter((sip) => {
    // Apply search filter if query exists
    if (searchQuery) {
      return sip.fundName.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });
  
  const totalSipAmount = mockSips
    .filter(sip => sip.status === 'active')
    .reduce((sum, sip) => sum + sip.amount, 0);
  
  const totalInvested = mockSips.reduce((sum, sip) => sum + sip.totalInvested, 0);
  const totalCurrentValue = mockSips.reduce((sum, sip) => sum + sip.currentValue, 0);
  const totalReturns = totalCurrentValue - totalInvested;
  const totalReturnsPercentage = totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0;
  const isPositive = totalReturns >= 0;
  
  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <Header title="SIP Dashboard" showBack />
      
      <div className="p-4">
        {/* Summary Card */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-gray-500 text-sm">Monthly SIP Amount</div>
              <div className="text-xl font-semibold">₹{totalSipAmount.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm">Total SIPs</div>
              <div className="text-xl font-semibold">{mockSips.filter(sip => sip.status === 'active').length}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div>
              <div className="text-gray-500 text-sm">Total Investment</div>
              <div className="font-semibold">₹{totalInvested.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm">Current Value</div>
              <div className="font-semibold">₹{totalCurrentValue.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm">Returns</div>
              <div className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? '+' : ''}₹{Math.abs(totalReturns).toLocaleString()} ({isPositive ? '+' : ''}{totalReturnsPercentage.toFixed(2)}%)
              </div>
            </div>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="flex items-center mb-4 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input 
              placeholder="Search SIPs" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white"
            />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
            <Filter size={18} />
          </Button>
          <Button 
            className="bg-green-500 hover:bg-green-600"
            onClick={() => {}} 
          >
            <PlusCircle size={18} className="mr-2" />
            New SIP
          </Button>
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="bg-gray-100 p-1 rounded-full w-full">
            <TabsTrigger 
              value="all" 
              className="rounded-full flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="active" 
              className="rounded-full flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Active
            </TabsTrigger>
            <TabsTrigger 
              value="paused" 
              className="rounded-full flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Paused
            </TabsTrigger>
            <TabsTrigger 
              value="stopped" 
              className="rounded-full flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Stopped
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            {filteredSips.length > 0 ? (
              filteredSips.map((sip) => (
                <SIPManagementCard key={sip.id} sip={sip} />
              ))
            ) : (
              <div className="text-center p-8 bg-white rounded-lg">
                <p className="text-gray-500">No SIPs found</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="active" className="mt-4">
            {filteredSips.length > 0 ? (
              filteredSips.map((sip) => (
                <SIPManagementCard key={sip.id} sip={sip} />
              ))
            ) : (
              <div className="text-center p-8 bg-white rounded-lg">
                <p className="text-gray-500">No active SIPs found</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="paused" className="mt-4">
            {filteredSips.length > 0 ? (
              filteredSips.map((sip) => (
                <SIPManagementCard key={sip.id} sip={sip} />
              ))
            ) : (
              <div className="text-center p-8 bg-white rounded-lg">
                <p className="text-gray-500">No paused SIPs found</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="stopped" className="mt-4">
            {filteredSips.length > 0 ? (
              filteredSips.map((sip) => (
                <SIPManagementCard key={sip.id} sip={sip} />
              ))
            ) : (
              <div className="text-center p-8 bg-white rounded-lg">
                <p className="text-gray-500">No stopped SIPs found</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNav activeTab="invest" />
    </div>
  );
};

export default SIPDashboard;
