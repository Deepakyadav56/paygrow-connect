
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowUp, ChevronRight, Download, PieChart, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample portfolio data
const portfolioData = {
  totalInvestment: 75000,
  currentValue: 85750,
  returns: 10750,
  returnsPercentage: 14.33,
  xirr: 12.5, // Annualized returns
  funds: [
    {
      id: 'fund1',
      name: 'HDFC Mid-Cap Opportunities',
      category: 'Equity - Mid Cap',
      investedAmount: 25000,
      currentValue: 31250,
      returns: 6250,
      returnsPercentage: 25.0,
      units: 852.14,
      nav: 36.67,
      sipAmount: 5000,
      lastSipDate: '10 Jul 2023',
      nextSipDate: '10 Aug 2023',
    },
    {
      id: 'fund2',
      name: 'Axis Bluechip Fund',
      category: 'Equity - Large Cap',
      investedAmount: 30000,
      currentValue: 32400,
      returns: 2400,
      returnsPercentage: 8.0,
      units: 1253.48,
      nav: 25.85,
      sipAmount: 5000,
      lastSipDate: '15 Jul 2023',
      nextSipDate: '15 Aug 2023',
    },
    {
      id: 'fund3',
      name: 'SBI Corporate Bond Fund',
      category: 'Debt - Corporate Bond',
      investedAmount: 20000,
      currentValue: 22100,
      returns: 2100,
      returnsPercentage: 10.5,
      units: 632.98,
      nav: 34.91,
      sipAmount: 2000,
      lastSipDate: '20 Jul 2023',
      nextSipDate: '20 Aug 2023',
    },
  ],
  performanceData: [
    { month: 'Jan', value: 72000 },
    { month: 'Feb', value: 74500 },
    { month: 'Mar', value: 73200 },
    { month: 'Apr', value: 76800 },
    { month: 'May', value: 78500 },
    { month: 'Jun', value: 82000 },
    { month: 'Jul', value: 85750 },
  ],
  sipSchedule: [
    { fund: 'HDFC Mid-Cap Opportunities', amount: 5000, date: '10 Aug 2023' },
    { fund: 'Axis Bluechip Fund', amount: 5000, date: '15 Aug 2023' },
    { fund: 'SBI Corporate Bond Fund', amount: 2000, date: '20 Aug 2023' },
  ],
};

const PortfolioPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="app-container pb-20">
      <Header 
        title="Portfolio" 
        showBack
        showProfile
      />
      
      <div className="px-4 py-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="funds">My Funds</TabsTrigger>
            <TabsTrigger value="sip">SIPs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="mb-3">
                  <p className="text-sm text-gray-500">Total Portfolio Value</p>
                  <h2 className="text-2xl font-bold">₹{portfolioData.currentValue.toLocaleString('en-IN')}</h2>
                </div>
                
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Invested Amount</p>
                    <p className="font-medium">₹{portfolioData.totalInvestment.toLocaleString('en-IN')}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Returns</p>
                    <p className={`font-medium ${portfolioData.returns >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                      {portfolioData.returns >= 0 ? '+' : ''}{portfolioData.returns.toLocaleString('en-IN')} 
                      <span className="ml-1">
                        ({portfolioData.returns >= 0 ? '+' : ''}{portfolioData.returnsPercentage.toFixed(2)}%)
                      </span>
                    </p>
                  </div>
                </div>
                
                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={portfolioData.performanceData}
                      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} />
                      <YAxis hide={true} domain={['dataMin - 5000', 'dataMax + 5000']} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#0066FF"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex justify-between mt-2">
                  <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">XIRR</p>
                    <p className="font-medium">{portfolioData.xirr.toFixed(2)}%</p>
                  </div>
                  <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Monthly SIP</p>
                    <p className="font-medium">₹{portfolioData.funds.reduce((total, fund) => total + fund.sipAmount, 0).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Funds</p>
                    <p className="font-medium">{portfolioData.funds.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Asset Allocation</h3>
              <Button variant="ghost" className="text-app-blue text-sm h-auto p-0">
                View Details
              </Button>
            </div>
            
            <Card className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="w-20 h-20 mr-3">
                    <PieChart size={80} className="text-gray-300" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-app-blue rounded-full mr-2"></div>
                        <span className="text-sm">Equity</span>
                      </div>
                      <div className="text-sm font-medium">80%</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-app-green rounded-full mr-2"></div>
                        <span className="text-sm">Debt</span>
                      </div>
                      <div className="text-sm font-medium">20%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Top Performing Fund</h3>
              <Button 
                variant="ghost" 
                className="text-app-blue text-sm h-auto p-0"
                onClick={() => navigate('/invest/fund/fund1')}
              >
                View Fund <ChevronRight size={16} />
              </Button>
            </div>
            
            <Card 
              className="border-none shadow-sm"
              onClick={() => navigate('/invest/fund/fund1')}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-medium">HDFC Mid-Cap Opportunities</h4>
                    <p className="text-xs text-gray-500">Equity - Mid Cap</p>
                  </div>
                  <div className="text-app-green font-medium flex items-center">
                    <ArrowUp size={16} className="mr-1" />
                    25.0%
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Investment</p>
                    <p className="text-sm font-medium">₹25,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Current Value</p>
                    <p className="text-sm font-medium">₹31,250</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Upcoming SIPs</h3>
              <Button 
                variant="ghost" 
                className="text-app-blue text-sm h-auto p-0"
                onClick={() => navigate('/portfolio/sips')}
              >
                View All <ChevronRight size={16} />
              </Button>
            </div>
            
            <Card className="border-none shadow-sm">
              <CardContent className="p-0">
                {portfolioData.sipSchedule.map((sip, index) => (
                  <div 
                    key={index} 
                    className={`p-4 flex justify-between items-center ${index !== portfolioData.sipSchedule.length - 1 ? 'border-b' : ''}`}
                  >
                    <div>
                      <h4 className="font-medium">{sip.fund}</h4>
                      <p className="text-xs text-gray-500">
                        <Calendar size={12} className="inline mr-1" />
                        {sip.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{sip.amount.toLocaleString('en-IN')}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-app-blue h-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/portfolio/sip/modify');
                        }}
                      >
                        Modify
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="funds" className="space-y-4">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Your Investments</h3>
              <Button 
                variant="ghost" 
                className="text-app-blue text-sm h-auto p-0"
                onClick={() => navigate('/invest/mutual-funds')}
              >
                + Add New
              </Button>
            </div>
            
            {portfolioData.funds.map((fund) => (
              <Card 
                key={fund.id} 
                className="border-none shadow-sm mb-3"
                onClick={() => navigate(`/invest/fund/${fund.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="font-medium">{fund.name}</h4>
                      <p className="text-xs text-gray-500">{fund.category}</p>
                    </div>
                    <div className={`font-medium flex items-center ${fund.returns >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                      {fund.returns >= 0 ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
                      {fund.returnsPercentage.toFixed(2)}%
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Investment</p>
                      <p className="text-sm font-medium">₹{fund.investedAmount.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Current Value</p>
                      <p className="text-sm font-medium">₹{fund.currentValue.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Units</p>
                      <p className="text-sm font-medium">{fund.units.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">NAV</p>
                      <p className="text-sm font-medium">₹{fund.nav.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-3 border-t">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/invest/options/${fund.id}`);
                      }}
                    >
                      Invest More
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/invest/options/${fund.id}`, { state: { defaultTab: 'sell' } });
                      }}
                    >
                      Redeem
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="sip" className="space-y-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">Monthly SIP Amount</h3>
                <p className="text-app-blue font-semibold text-lg">
                  ₹{portfolioData.funds.reduce((total, fund) => total + fund.sipAmount, 0).toLocaleString('en-IN')}
                </p>
              </div>
              <Button 
                variant="ghost" 
                className="text-app-blue h-auto p-0 flex items-center"
                onClick={() => navigate('/portfolio/sip/calendar')}
              >
                <Calendar size={16} className="mr-1" />
                SIP Calendar
              </Button>
            </div>
            
            {portfolioData.funds.map((fund) => (
              <Card 
                key={fund.id} 
                className="border-none shadow-sm mb-3"
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h4 className="font-medium">{fund.name}</h4>
                      <p className="text-xs text-gray-500">{fund.category}</p>
                    </div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">SIP Amount</p>
                      <p className="text-sm font-medium">₹{fund.sipAmount.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Next SIP Date</p>
                      <p className="text-sm font-medium">{fund.nextSipDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-3 border-t">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/invest/sip/modify/${fund.id}`)}
                    >
                      Modify SIP
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/invest/sip/cancel/${fund.id}`)}
                    >
                      Pause/Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default PortfolioPage;
