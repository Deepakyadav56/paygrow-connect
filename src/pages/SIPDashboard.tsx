
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

// Mock data for SIPs with real logos
const mockSips = [
  {
    id: 'sip1',
    fundId: 'parag-parikh',
    fundName: 'Parag Parikh Flexi Cap Fund',
    logo: 'https://www.ppfas.com/images/new-logo.png',
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
    logo: 'https://www.hdfcfund.com/content/dam/abc-of-money/logo/hdfc-mutual-fund-logo.png',
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
    logo: 'https://www.quantmutual.com/wp-content/uploads/2022/12/Quant-Mutual-Fund.png',
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
    <div className="bg-app-teal-50 min-h-screen pb-16">
      <Header title="SIP Dashboard" showBack />
      
      <div className="p-4">
        {/* Summary Card */}
        <div className="bg-white rounded-lg p-4 shadow-md mb-6 border border-app-teal-100">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-app-teal-700 text-sm font-medium">Monthly SIP Amount</div>
              <div className="text-xl font-semibold text-app-teal-900">₹{totalSipAmount.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-app-teal-700 text-sm font-medium">Total SIPs</div>
              <div className="text-xl font-semibold text-app-teal-900">{mockSips.filter(sip => sip.status === 'active').length}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-app-teal-100">
            <div>
              <div className="text-app-teal-700 text-sm font-medium">Total Investment</div>
              <div className="font-semibold text-app-teal-800">₹{totalInvested.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-app-teal-700 text-sm font-medium">Current Value</div>
              <div className="font-semibold text-app-teal-800">₹{totalCurrentValue.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-app-teal-700 text-sm font-medium">Returns</div>
              <div className={`font-semibold ${isPositive ? 'text-app-green' : 'text-app-red'}`}>
                {isPositive ? '+' : ''}₹{Math.abs(totalReturns).toLocaleString()} ({isPositive ? '+' : ''}{totalReturnsPercentage.toFixed(2)}%)
              </div>
            </div>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="flex items-center mb-4 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-app-teal-500" size={16} />
            <Input 
              placeholder="Search SIPs" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white border-app-teal-200 focus-visible:ring-app-teal-500"
            />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-app-teal-500 text-app-teal-700 hover:bg-app-teal-50 hover:text-app-teal-800">
            <Filter size={18} />
          </Button>
          <Button 
            className="bg-app-teal-700 hover:bg-app-teal-800 text-white"
            onClick={() => {}} 
          >
            <PlusCircle size={18} className="mr-2" />
            New SIP
          </Button>
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="bg-app-teal-100 p-1 rounded-full w-full">
            <TabsTrigger 
              value="all" 
              className="rounded-full flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-app-teal-700"
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="active" 
              className="rounded-full flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-app-teal-700"
            >
              Active
            </TabsTrigger>
            <TabsTrigger 
              value="paused" 
              className="rounded-full flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-app-teal-700"
            >
              Paused
            </TabsTrigger>
            <TabsTrigger 
              value="stopped" 
              className="rounded-full flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-app-teal-700"
            >
              Stopped
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            {filteredSips.length > 0 ? (
              <div className="space-y-3">
                {filteredSips.map((sip) => (
                  <div key={sip.id} className="bg-white rounded-lg border border-app-teal-200 p-4 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-start mb-3">
                      <div className="w-12 h-12 mr-3 rounded-lg bg-white p-1 border border-app-teal-100">
                        {typeof sip.logo === 'string' ? (
                          <img src={sip.logo} alt={sip.fundName} className="w-full h-full object-contain" />
                        ) : (
                          sip.logo
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-app-teal-900">{sip.fundName}</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-app-teal-700">{sip.frequency}</span>
                          <span className="mx-2 text-app-teal-300">•</span>
                          <span className="text-sm text-app-teal-700">Next: {sip.nextDate}</span>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium 
                        ${sip.status === 'active' ? 'bg-app-teal-100 text-app-teal-800' : 
                          sip.status === 'paused' ? 'bg-app-light-orange text-app-orange' : 
                          'bg-red-100 text-app-red'}`}>
                        {sip.status.charAt(0).toUpperCase() + sip.status.slice(1)}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-t border-app-teal-100">
                      <div>
                        <div className="text-sm text-app-teal-600">SIP Amount</div>
                        <div className="font-semibold text-app-teal-900">₹{sip.amount.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-app-teal-600">Total Invested</div>
                        <div className="font-semibold text-app-teal-900">₹{sip.totalInvested.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-app-teal-600">Current Value</div>
                        <div className="font-semibold text-app-teal-900">₹{sip.currentValue.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-app-teal-100">
                      <div>
                        <div className="text-sm text-app-teal-600">Returns</div>
                        <div className={`font-semibold ${sip.returns.value >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                          {sip.returns.value >= 0 ? '+' : ''}₹{Math.abs(sip.returns.value).toLocaleString()} ({sip.returns.value >= 0 ? '+' : ''}{sip.returns.percentage.toFixed(2)}%)
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-app-teal-500 text-app-teal-700 hover:bg-app-teal-50 hover:text-app-teal-800">
                          Edit
                        </Button>
                        <Button size="sm" className="bg-app-teal-700 hover:bg-app-teal-800 text-white">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-white rounded-lg border border-app-teal-200 shadow-md">
                <p className="text-app-teal-700">No SIPs found</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="active" className="mt-4">
            {filteredSips.length > 0 ? (
              <div className="space-y-3">
                {filteredSips.map((sip) => (
                  <div key={sip.id} className="bg-white rounded-lg border border-app-teal-200 p-4 shadow-md hover:shadow-lg transition-shadow">
                    {/* Similar structure as above */}
                    <div className="flex items-start mb-3">
                      <div className="w-12 h-12 mr-3 rounded-lg bg-white p-1 border border-app-teal-100">
                        {typeof sip.logo === 'string' ? (
                          <img src={sip.logo} alt={sip.fundName} className="w-full h-full object-contain" />
                        ) : (
                          sip.logo
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-app-teal-900">{sip.fundName}</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-app-teal-700">{sip.frequency}</span>
                          <span className="mx-2 text-app-teal-300">•</span>
                          <span className="text-sm text-app-teal-700">Next: {sip.nextDate}</span>
                        </div>
                      </div>
                      <div className="px-2 py-1 rounded-full text-xs font-medium bg-app-teal-100 text-app-teal-800">
                        Active
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-t border-app-teal-100">
                      <div>
                        <div className="text-sm text-app-teal-600">SIP Amount</div>
                        <div className="font-semibold text-app-teal-900">₹{sip.amount.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-app-teal-600">Total Invested</div>
                        <div className="font-semibold text-app-teal-900">₹{sip.totalInvested.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-app-teal-600">Current Value</div>
                        <div className="font-semibold text-app-teal-900">₹{sip.currentValue.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-app-teal-100">
                      <div>
                        <div className="text-sm text-app-teal-600">Returns</div>
                        <div className={`font-semibold ${sip.returns.value >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                          {sip.returns.value >= 0 ? '+' : ''}₹{Math.abs(sip.returns.value).toLocaleString()} ({sip.returns.value >= 0 ? '+' : ''}{sip.returns.percentage.toFixed(2)}%)
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-app-teal-500 text-app-teal-700 hover:bg-app-teal-50 hover:text-app-teal-800">
                          Edit
                        </Button>
                        <Button size="sm" className="bg-app-teal-700 hover:bg-app-teal-800 text-white">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-white rounded-lg border border-app-teal-200 shadow-md">
                <p className="text-app-teal-700">No active SIPs found</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="paused" className="mt-4">
            {filteredSips.length > 0 ? (
              <div className="space-y-3">
                {filteredSips.map((sip) => (
                  <SIPManagementCard key={sip.id} sip={sip} />
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-white rounded-lg border border-app-teal-200 shadow-md">
                <p className="text-app-teal-700">No paused SIPs found</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="stopped" className="mt-4">
            {filteredSips.length > 0 ? (
              <div className="space-y-3">
                {filteredSips.map((sip) => (
                  <SIPManagementCard key={sip.id} sip={sip} />
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-white rounded-lg border border-app-teal-200 shadow-md">
                <p className="text-app-teal-700">No stopped SIPs found</p>
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
