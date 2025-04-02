
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Filter, ChevronRight, ArrowUpDown, Plus, Pause, Edit2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

// Mock SIP data
const sipData = [
  {
    id: 'sip1',
    fundName: 'HDFC Mid-Cap Opportunities Fund',
    category: 'Equity - Mid Cap',
    amount: 5000,
    frequency: 'Monthly',
    nextDate: '10 Aug 2023',
    status: 'active',
    startDate: '10 Jan 2022',
    completedInstallments: 18,
    totalInvestment: 90000,
    currentValue: 102500,
    returns: 12500,
    returnsPercentage: 13.89
  },
  {
    id: 'sip2',
    fundName: 'Axis Bluechip Fund',
    category: 'Equity - Large Cap',
    amount: 3000,
    frequency: 'Monthly',
    nextDate: '15 Aug 2023',
    status: 'active',
    startDate: '15 Mar 2022',
    completedInstallments: 16,
    totalInvestment: 48000,
    currentValue: 51200,
    returns: 3200,
    returnsPercentage: 6.67
  },
  {
    id: 'sip3',
    fundName: 'SBI Corporate Bond Fund',
    category: 'Debt - Corporate Bond',
    amount: 2000,
    frequency: 'Monthly',
    nextDate: '20 Aug 2023',
    status: 'active',
    startDate: '20 Apr 2022',
    completedInstallments: 15,
    totalInvestment: 30000,
    currentValue: 32100,
    returns: 2100,
    returnsPercentage: 7.0
  },
  {
    id: 'sip4',
    fundName: 'Parag Parikh Flexi Cap Fund',
    category: 'Equity - Flexi Cap',
    amount: 4000,
    frequency: 'Monthly',
    nextDate: 'Paused',
    status: 'paused',
    startDate: '05 Dec 2021',
    completedInstallments: 14,
    totalInvestment: 56000,
    currentValue: 63500,
    returns: 7500,
    returnsPercentage: 13.39
  }
];

// Calculate upcoming SIP payments
const upcomingSIPs = sipData
  .filter(sip => sip.status === 'active')
  .sort((a, b) => {
    const dateA = new Date(a.nextDate.split(' ')[1] + ' ' + a.nextDate.split(' ')[0] + ' ' + a.nextDate.split(' ')[2]);
    const dateB = new Date(b.nextDate.split(' ')[1] + ' ' + b.nextDate.split(' ')[0] + ' ' + b.nextDate.split(' ')[2]);
    return dateA.getTime() - dateB.getTime();
  });

const SIPManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  
  const totalMonthlyAmount = sipData
    .filter(sip => sip.status === 'active')
    .reduce((total, sip) => total + sip.amount, 0);
  
  const getFilteredSIPs = () => {
    switch (activeTab) {
      case 'active':
        return sipData.filter(sip => sip.status === 'active');
      case 'paused':
        return sipData.filter(sip => sip.status === 'paused');
      default:
        return sipData;
    }
  };
  
  const filteredSIPs = getFilteredSIPs();
  
  return (
    <div className="app-container pb-20">
      <Header 
        title="SIP Management" 
        showBack
        showProfile
      />
      
      <div className="p-4 space-y-4">
        <Card className="border-none shadow-sm overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">Total Monthly SIP</p>
                <h2 className="text-2xl font-bold text-app-blue">₹{totalMonthlyAmount.toLocaleString('en-IN')}</h2>
                <p className="text-xs text-gray-500 mt-1">Across {sipData.filter(sip => sip.status === 'active').length} active SIPs</p>
              </div>
              <Button 
                variant="outline" 
                className="bg-white"
                onClick={() => navigate('/invest/mutual-funds')}
              >
                <Plus size={16} className="mr-1" />
                Start New SIP
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <h3 className="font-medium mb-3">Upcoming SIP Payments</h3>
          <div className="space-y-3">
            {upcomingSIPs.slice(0, 3).map((sip) => (
              <div key={sip.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="text-app-blue mr-3" size={20} />
                  <div>
                    <p className="font-medium text-sm">{sip.fundName}</p>
                    <p className="text-xs text-gray-500">{sip.nextDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{sip.amount.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All SIPs</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="paused">Paused</TabsTrigger>
            </TabsList>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8">
                  <Filter size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <ArrowUpDown size={14} className="mr-2" />
                  Sort by Amount
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar size={14} className="mr-2" />
                  Sort by Next Date
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="space-y-3">
              {filteredSIPs.map((sip) => (
                <Card 
                  key={sip.id} 
                  className={`border-none shadow-sm overflow-hidden ${sip.status === 'paused' ? 'bg-gray-50' : 'bg-white'}`}
                  onClick={() => navigate(`/invest/sip/details/${sip.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h4 className="font-medium">{sip.fundName}</h4>
                        <p className="text-xs text-gray-500">{sip.category}</p>
                      </div>
                      {sip.status === 'paused' && (
                        <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium">
                          Paused
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Monthly Amount</p>
                        <p className="text-sm font-medium">₹{sip.amount.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Next Payment</p>
                        <p className="text-sm font-medium">{sip.nextDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Total Investment</p>
                        <p className="text-sm font-medium">₹{sip.totalInvestment.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Current Value</p>
                        <p className="text-sm font-medium">₹{sip.currentValue.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                      <div className={`text-sm ${sip.returns >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                        {sip.returns >= 0 ? '+' : ''}
                        {sip.returnsPercentage.toFixed(2)}% ({sip.returns >= 0 ? '+₹' : '-₹'}{Math.abs(sip.returns).toLocaleString('en-IN')})
                      </div>
                      <div className="flex space-x-2">
                        {sip.status === 'active' ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/invest/sip/pause/${sip.id}`);
                            }}
                          >
                            <Pause size={14} className="mr-1" />
                            Pause
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/invest/sip/resume/${sip.id}`);
                            }}
                          >
                            <Play size={14} className="mr-1" />
                            Resume
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/invest/sip/modify/${sip.id}`);
                          }}
                        >
                          <Edit2 size={14} className="mr-1" />
                          Modify
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="active" className="mt-0">
            {/* Active SIPs content */}
            <div className="space-y-3">
              {filteredSIPs.map((sip) => (
                // ... Same card as above
                <Card 
                  key={sip.id} 
                  className="border-none shadow-sm overflow-hidden bg-white"
                  onClick={() => navigate(`/invest/sip/details/${sip.id}`)}
                >
                  {/* ... Same card content as above */}
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h4 className="font-medium">{sip.fundName}</h4>
                        <p className="text-xs text-gray-500">{sip.category}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Monthly Amount</p>
                        <p className="text-sm font-medium">₹{sip.amount.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Next Payment</p>
                        <p className="text-sm font-medium">{sip.nextDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Total Investment</p>
                        <p className="text-sm font-medium">₹{sip.totalInvestment.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Current Value</p>
                        <p className="text-sm font-medium">₹{sip.currentValue.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                      <div className={`text-sm ${sip.returns >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                        {sip.returns >= 0 ? '+' : ''}
                        {sip.returnsPercentage.toFixed(2)}% ({sip.returns >= 0 ? '+₹' : '-₹'}{Math.abs(sip.returns).toLocaleString('en-IN')})
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/invest/sip/pause/${sip.id}`);
                          }}
                        >
                          <Pause size={14} className="mr-1" />
                          Pause
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/invest/sip/modify/${sip.id}`);
                          }}
                        >
                          <Edit2 size={14} className="mr-1" />
                          Modify
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="paused" className="mt-0">
            {/* Paused SIPs content */}
            {/* ... Similar to the other tabs */}
            {filteredSIPs.length > 0 ? (
              <div className="space-y-3">
                {filteredSIPs.map((sip) => (
                  <Card 
                    key={sip.id} 
                    className="border-none shadow-sm overflow-hidden bg-gray-50"
                    onClick={() => navigate(`/invest/sip/details/${sip.id}`)}
                  >
                    <CardContent className="p-4">
                      {/* ... Same content structure but with Resume button instead of Pause */}
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h4 className="font-medium">{sip.fundName}</h4>
                          <p className="text-xs text-gray-500">{sip.category}</p>
                        </div>
                        <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium">
                          Paused
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Monthly Amount</p>
                          <p className="text-sm font-medium">₹{sip.amount.toLocaleString('en-IN')}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Next Payment</p>
                          <p className="text-sm font-medium">{sip.nextDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Total Investment</p>
                          <p className="text-sm font-medium">₹{sip.totalInvestment.toLocaleString('en-IN')}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Current Value</p>
                          <p className="text-sm font-medium">₹{sip.currentValue.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                        <div className={`text-sm ${sip.returns >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                          {sip.returns >= 0 ? '+' : ''}
                          {sip.returnsPercentage.toFixed(2)}% ({sip.returns >= 0 ? '+₹' : '-₹'}{Math.abs(sip.returns).toLocaleString('en-IN')})
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/invest/sip/resume/${sip.id}`);
                            }}
                          >
                            <Play size={14} className="mr-1" />
                            Resume
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/invest/sip/modify/${sip.id}`);
                            }}
                          >
                            <Edit2 size={14} className="mr-1" />
                            Modify
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                <Pause size={32} className="mx-auto text-gray-400 mb-3" />
                <h3 className="font-medium mb-1">No Paused SIPs</h3>
                <p className="text-sm text-gray-500 mb-3">
                  You don't have any paused SIP investments at the moment
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default SIPManagementPage;
