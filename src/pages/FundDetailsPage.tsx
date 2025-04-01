
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, TrendingUp, LineChart, PieChart, Clock, Calendar, BarChart4, Info, Download, Share2, Plus, ChevronRight, Award, Percent, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FundPerfChart from '@/components/FundPerfChart';

// Mock data for funds
const fundsData: Record<string, any> = {
  'inv1': {
    id: 'inv1',
    name: 'Axis Bluechip Fund',
    category: 'Equity - Large Cap',
    amc: 'Axis Mutual Fund',
    logo: '🔵',
    nav: 52.32,
    navDate: '29 Jun 2023',
    riskLevel: 'Moderate',
    rating: 4.5,
    minInvestment: 500,
    sipMinAmount: 500,
    oneTimeMinAmount: 1000,
    expenseRatio: 1.05,
    aum: '24,568 Cr',
    inceptionDate: '05 Jan 2010',
    exitLoad: '1% if redeemed within 1 year',
    fundManager: 'Shreyash Devalkar',
    fundManagerExperience: '15+ years',
    returns: {
      oneDay: 0.5,
      oneWeek: 1.2,
      oneMonth: 2.7,
      threeMonth: 5.5,
      sixMonth: 8.2,
      oneYear: 12.5,
      threeYear: 8.7,
      fiveYear: 11.2,
      tenYear: 14.5,
      sinceLaunch: 15.2
    },
    benchmarkComparison: {
      name: 'NIFTY 50 TRI',
      oneYear: 10.8,
      threeYear: 7.9,
      fiveYear: 9.8
    },
    sectorAllocation: [
      { sector: 'Financial Services', percentage: 32.6 },
      { sector: 'IT', percentage: 18.4 },
      { sector: 'Consumer Goods', percentage: 12.1 },
      { sector: 'Automobile', percentage: 10.8 },
      { sector: 'Pharma', percentage: 9.2 },
      { sector: 'Others', percentage: 16.9 }
    ],
    topHoldings: [
      { name: 'HDFC Bank Ltd.', percentage: 9.8 },
      { name: 'ICICI Bank Ltd.', percentage: 8.2 },
      { name: 'Infosys Ltd.', percentage: 7.1 },
      { name: 'Reliance Industries Ltd.', percentage: 6.8 },
      { name: 'TCS Ltd.', percentage: 5.4 }
    ],
    taxImplication: 'Long-term capital gains (>1 year): 10% above ₹1 lakh. Short-term (<1 year): 15%.',
    yourHolding: {
      units: 457.93,
      value: 25000,
      avgNav: 54.59,
      valuation: {
        invested: 25000,
        current: 23956.32,
        returns: -4.17
      }
    }
  },
  'fund1': {
    id: 'fund1',
    name: 'Axis Bluechip Fund',
    category: 'Equity - Large Cap',
    amc: 'Axis Mutual Fund',
    logo: '🔵',
    nav: 52.32,
    navDate: '29 Jun 2023',
    riskLevel: 'Moderate',
    rating: 4.5,
    minInvestment: 500,
    sipMinAmount: 500,
    oneTimeMinAmount: 1000,
    expenseRatio: 1.05,
    aum: '24,568 Cr',
    inceptionDate: '05 Jan 2010',
    exitLoad: '1% if redeemed within 1 year',
    fundManager: 'Shreyash Devalkar',
    fundManagerExperience: '15+ years',
    returns: {
      oneDay: 0.5,
      oneWeek: 1.2,
      oneMonth: 2.7,
      threeMonth: 5.5,
      sixMonth: 8.2,
      oneYear: 12.5,
      threeYear: 8.7,
      fiveYear: 11.2,
      tenYear: 14.5,
      sinceLaunch: 15.2
    },
    benchmarkComparison: {
      name: 'NIFTY 50 TRI',
      oneYear: 10.8,
      threeYear: 7.9,
      fiveYear: 9.8
    },
    sectorAllocation: [
      { sector: 'Financial Services', percentage: 32.6 },
      { sector: 'IT', percentage: 18.4 },
      { sector: 'Consumer Goods', percentage: 12.1 },
      { sector: 'Automobile', percentage: 10.8 },
      { sector: 'Pharma', percentage: 9.2 },
      { sector: 'Others', percentage: 16.9 }
    ],
    topHoldings: [
      { name: 'HDFC Bank Ltd.', percentage: 9.8 },
      { name: 'ICICI Bank Ltd.', percentage: 8.2 },
      { name: 'Infosys Ltd.', percentage: 7.1 },
      { name: 'Reliance Industries Ltd.', percentage: 6.8 },
      { name: 'TCS Ltd.', percentage: 5.4 }
    ],
    taxImplication: 'Long-term capital gains (>1 year): 10% above ₹1 lakh. Short-term (<1 year): 15%.',
    yourHolding: {
      units: 457.93,
      value: 25000,
      avgNav: 54.59,
      valuation: {
        invested: 25000,
        current: 23956.32,
        returns: -4.17
      }
    }
  }
};

const FundDetailsPage: React.FC = () => {
  const { fundId } = useParams<{ fundId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  const fund = fundsData[fundId || 'inv1'] || fundsData['inv1'];
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const handleInvest = () => {
    navigate(`/invest/options/${fundId}`);
  };

  return (
    <div className="app-container pb-20">
      <Header showBack title={fund.name} />
      
      <div className="bg-gradient-to-b from-app-blue to-app-blue/80 text-white rounded-b-2xl mb-4">
        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-app-blue mr-3 text-xl">
              {fund.logo}
            </div>
            <div>
              <h1 className="text-lg font-semibold">{fund.name}</h1>
              <p className="text-xs opacity-90">{fund.category} • {fund.amc}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 mt-4 gap-3 mb-2">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-xs opacity-80 mb-1">NAV</div>
              <div className="font-semibold">₹{fund.nav}</div>
              <div className="text-xs opacity-70">{fund.navDate}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-xs opacity-80 mb-1">1Y Return</div>
              <div className="font-semibold text-green-300">+{fund.returns.oneYear}%</div>
              <div className="text-xs opacity-70">vs {fund.benchmarkComparison.oneYear}%</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-xs opacity-80 mb-1">Risk</div>
              <div className="font-semibold">{fund.riskLevel}</div>
              <div className="text-xs opacity-70">★ {fund.rating}</div>
            </div>
          </div>
        </div>
        
        <div className="px-4 flex justify-between mb-4">
          <Button 
            variant="outline" 
            className="bg-white/10 text-white border-white/20 hover:bg-white/20 flex-1 mr-2"
            onClick={() => window.open('https://www.example.com/fund-documents.pdf')}
          >
            <Download size={16} className="mr-1.5" /> Documents
          </Button>
          <Button 
            variant="outline" 
            className="bg-white/10 text-white border-white/20 hover:bg-white/20 flex-1"
          >
            <Share2 size={16} className="mr-1.5" /> Share
          </Button>
        </div>
      </div>
      
      <div className="px-4 mb-4">
        <Button onClick={handleInvest} className="w-full bg-app-blue font-medium py-6">
          <Plus size={18} className="mr-1.5" /> Invest Now
        </Button>
      </div>
      
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <div className="px-4">
          <TabsList className="grid grid-cols-5 w-full mb-2">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="returns" className="text-xs">Returns</TabsTrigger>
            <TabsTrigger value="holdings" className="text-xs">Holdings</TabsTrigger>
            <TabsTrigger value="info" className="text-xs">Info</TabsTrigger>
            {fund.yourHolding && (
              <TabsTrigger value="portfolio" className="text-xs">Portfolio</TabsTrigger>
            )}
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="mt-2 px-4">
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <h3 className="font-medium mb-3">Fund Overview</h3>
            <p className="text-sm text-gray-600 mb-4">
              {fund.name} is a Large Cap fund that aims to generate long-term capital appreciation by investing in quality large-cap companies with strong growth potential.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-gray-500 mb-1">NAV</div>
                <div className="font-medium">₹{fund.nav}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">AUM</div>
                <div className="font-medium">₹{fund.aum}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Expense Ratio</div>
                <div className="font-medium">{fund.expenseRatio}%</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Launch Date</div>
                <div className="font-medium">{fund.inceptionDate}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Min SIP</div>
                <div className="font-medium">₹{fund.sipMinAmount}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Min Lumpsum</div>
                <div className="font-medium">₹{fund.oneTimeMinAmount}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Performance</h3>
              <Button 
                variant="ghost" 
                className="h-8 text-xs text-app-blue p-0"
                onClick={() => setActiveTab('returns')}
              >
                View More <ChevronRight size={14} />
              </Button>
            </div>
            
            <div className="h-48 w-full mb-4">
              <FundPerfChart />
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 p-2 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">1Y Returns</div>
                <div className="font-medium text-app-green">+{fund.returns.oneYear}%</div>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">3Y Returns</div>
                <div className="font-medium text-app-green">+{fund.returns.threeYear}%</div>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">5Y Returns</div>
                <div className="font-medium text-app-green">+{fund.returns.fiveYear}%</div>
              </div>
            </div>
            
            <div className="mt-3 text-xs text-gray-500">
              Past performance is not indicative of future returns
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Top Holdings</h3>
              <Button 
                variant="ghost" 
                className="h-8 text-xs text-app-blue p-0"
                onClick={() => setActiveTab('holdings')}
              >
                View More <ChevronRight size={14} />
              </Button>
            </div>
            
            <div className="space-y-3">
              {fund.topHoldings.slice(0, 3).map((holding: any) => (
                <div key={holding.name} className="flex justify-between items-center">
                  <div>{holding.name}</div>
                  <div className="font-medium">{holding.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <h3 className="font-medium mb-3">Fund Manager</h3>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 mr-3">
                <User size={24} />
              </div>
              <div>
                <div className="font-medium">{fund.fundManager}</div>
                <div className="text-xs text-gray-500">Experience: {fund.fundManagerExperience}</div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="returns" className="mt-2 px-4">
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <h3 className="font-medium mb-3">Returns</h3>
            <div className="h-48 w-full mb-4">
              <FundPerfChart />
            </div>
            
            <Tabs defaultValue="absolute">
              <TabsList className="w-full mb-3">
                <TabsTrigger value="absolute" className="flex-1">Absolute</TabsTrigger>
                <TabsTrigger value="annualized" className="flex-1">Annualized</TabsTrigger>
                <TabsTrigger value="calendar" className="flex-1">Calendar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="absolute" className="space-y-3 py-2">
                <div className="flex justify-between items-center pb-2 border-b">
                  <div className="text-sm text-gray-600">Duration</div>
                  <div className="flex">
                    <div className="text-sm text-gray-600 mr-12 w-20 text-right">Fund</div>
                    <div className="text-sm text-gray-600 w-20 text-right">Benchmark</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>1 Day</div>
                  <div className="flex">
                    <div className={`mr-12 w-20 text-right ${fund.returns.oneDay >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                      {fund.returns.oneDay > 0 ? '+' : ''}{fund.returns.oneDay}%
                    </div>
                    <div className="w-20 text-right text-gray-800">-</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>1 Week</div>
                  <div className="flex">
                    <div className={`mr-12 w-20 text-right ${fund.returns.oneWeek >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                      {fund.returns.oneWeek > 0 ? '+' : ''}{fund.returns.oneWeek}%
                    </div>
                    <div className="w-20 text-right text-gray-800">-</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>1 Month</div>
                  <div className="flex">
                    <div className={`mr-12 w-20 text-right ${fund.returns.oneMonth >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                      {fund.returns.oneMonth > 0 ? '+' : ''}{fund.returns.oneMonth}%
                    </div>
                    <div className="w-20 text-right text-gray-800">-</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>3 Months</div>
                  <div className="flex">
                    <div className={`mr-12 w-20 text-right ${fund.returns.threeMonth >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                      {fund.returns.threeMonth > 0 ? '+' : ''}{fund.returns.threeMonth}%
                    </div>
                    <div className="w-20 text-right text-gray-800">-</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>6 Months</div>
                  <div className="flex">
                    <div className={`mr-12 w-20 text-right ${fund.returns.sixMonth >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                      {fund.returns.sixMonth > 0 ? '+' : ''}{fund.returns.sixMonth}%
                    </div>
                    <div className="w-20 text-right text-gray-800">-</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>1 Year</div>
                  <div className="flex">
                    <div className={`mr-12 w-20 text-right ${fund.returns.oneYear >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                      {fund.returns.oneYear > 0 ? '+' : ''}{fund.returns.oneYear}%
                    </div>
                    <div className={`w-20 text-right ${fund.benchmarkComparison.oneYear >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                      {fund.benchmarkComparison.oneYear > 0 ? '+' : ''}{fund.benchmarkComparison.oneYear}%
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>3 Years</div>
                  <div className="flex">
                    <div className={`mr-12 w-20 text-right ${fund.returns.threeYear >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                      {fund.returns.threeYear > 0 ? '+' : ''}{fund.returns.threeYear}%
                    </div>
                    <div className={`w-20 text-right ${fund.benchmarkComparison.threeYear >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                      {fund.benchmarkComparison.threeYear > 0 ? '+' : ''}{fund.benchmarkComparison.threeYear}%
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>5 Years</div>
                  <div className="flex">
                    <div className={`mr-12 w-20 text-right ${fund.returns.fiveYear >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                      {fund.returns.fiveYear > 0 ? '+' : ''}{fund.returns.fiveYear}%
                    </div>
                    <div className={`w-20 text-right ${fund.benchmarkComparison.fiveYear >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                      {fund.benchmarkComparison.fiveYear > 0 ? '+' : ''}{fund.benchmarkComparison.fiveYear}%
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>Since Launch</div>
                  <div className="flex">
                    <div className={`mr-12 w-20 text-right ${fund.returns.sinceLaunch >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                      {fund.returns.sinceLaunch > 0 ? '+' : ''}{fund.returns.sinceLaunch}%
                    </div>
                    <div className="w-20 text-right text-gray-800">-</div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="annualized" className="py-2">
                <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                  <BarChart4 size={40} className="mb-2 opacity-50" />
                  <p>Annualized returns data will appear here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="calendar" className="py-2">
                <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                  <Calendar size={40} className="mb-2 opacity-50" />
                  <p>Calendar year returns will appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <h3 className="font-medium mb-3">Comparative Analysis</h3>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <div>Fund vs {fund.benchmarkComparison.name}</div>
              </div>
              <div className="h-48 w-full">
                <FundPerfChart />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-app-blue mr-2"></div>
                <div className="text-sm">{fund.name}</div>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                <div className="text-sm">{fund.benchmarkComparison.name}</div>
              </div>
            </div>
            
            <div className="mt-3 text-xs text-gray-500">
              Past performance is not indicative of future returns
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="holdings" className="mt-2 px-4">
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <h3 className="font-medium mb-3">Top 10 Holdings</h3>
            <div className="space-y-3">
              {fund.topHoldings.map((holding: any, index: number) => (
                <div key={holding.name} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="mr-2 text-gray-500">{index + 1}.</div>
                    <div>{holding.name}</div>
                  </div>
                  <div className="font-medium">{holding.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <h3 className="font-medium mb-3">Sector Allocation</h3>
            <div className="h-64 w-full mb-4">
              <PieChart size={240} className="mx-auto text-gray-400" />
            </div>
            
            <div className="space-y-3">
              {fund.sectorAllocation.map((sector: any) => (
                <div key={sector.sector} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-app-blue mr-2"></div>
                    <div>{sector.sector}</div>
                  </div>
                  <div className="font-medium">{sector.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="info" className="mt-2 px-4">
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <h3 className="font-medium mb-3">Fund Information</h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-1">Fund Overview</div>
                <p className="text-sm text-gray-600">
                  {fund.name} is a Large Cap fund that aims to generate long-term capital appreciation by investing in quality large-cap companies with strong growth potential.
                </p>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Fund Category</div>
                  <div className="font-medium">{fund.category}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Fund House</div>
                  <div className="font-medium">{fund.amc}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Launch Date</div>
                  <div className="font-medium">{fund.inceptionDate}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Fund Size</div>
                  <div className="font-medium">₹{fund.aum}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Expense Ratio</div>
                  <div className="font-medium">{fund.expenseRatio}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Benchmark</div>
                  <div className="font-medium">{fund.benchmarkComparison.name}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Fund Manager</div>
                  <div className="font-medium">{fund.fundManager}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Risk Level</div>
                  <div className="font-medium">{fund.riskLevel}</div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="text-sm font-medium mb-1">Fund Documents</div>
                <div className="space-y-2">
                  <button className="flex items-center text-app-blue">
                    <Download size={14} className="mr-1.5" /> 
                    <span className="text-sm">Scheme Information Document</span>
                  </button>
                  <button className="flex items-center text-app-blue">
                    <Download size={14} className="mr-1.5" /> 
                    <span className="text-sm">Key Information Memorandum</span>
                  </button>
                  <button className="flex items-center text-app-blue">
                    <Download size={14} className="mr-1.5" /> 
                    <span className="text-sm">Factsheet</span>
                  </button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="text-sm font-medium mb-1">Investment Details</div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Minimum SIP Amount</div>
                    <div className="font-medium">₹{fund.sipMinAmount}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Minimum Lumpsum</div>
                    <div className="font-medium">₹{fund.oneTimeMinAmount}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">SIP Dates</div>
                    <div className="font-medium">1st, 5th, 10th, 15th, 20th, 25th</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Exit Load</div>
                    <div className="font-medium">{fund.exitLoad}</div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="text-sm font-medium mb-1">Tax Implications</div>
                <p className="text-sm text-gray-600">
                  {fund.taxImplication}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="risk">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <AlertTriangle size={16} className="mr-2 text-yellow-500" />
                    Risk Factors
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Mutual Fund investments are subject to market risks. Please read all scheme related documents carefully before investing.</p>
                    <p>Past performance is not indicative of future returns.</p>
                    <p>The NAV of the scheme may be affected by trading volumes, settlement periods, and transfer procedures.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="disclaimer">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <Info size={16} className="mr-2 text-app-blue" />
                    Disclaimer
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-gray-600">
                    This information is for informational purposes only and does not constitute investment advice. Please consult your financial advisor before making any investment decisions.
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
        
        {fund.yourHolding && (
          <TabsContent value="portfolio" className="mt-2 px-4">
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
              <h3 className="font-medium mb-3">Your Investment</h3>
              
              <div className="bg-gray-50 p-4 rounded-xl mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Invested Amount</div>
                    <div className="font-medium">₹{fund.yourHolding.valuation.invested.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Current Value</div>
                    <div className="font-medium">₹{fund.yourHolding.valuation.current.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Units</div>
                    <div className="font-medium">{fund.yourHolding.units}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Returns</div>
                    <div className={fund.yourHolding.valuation.returns >= 0 ? 'text-app-green font-medium' : 'text-app-red font-medium'}>
                      {fund.yourHolding.valuation.returns >= 0 ? '+' : ''}{fund.yourHolding.valuation.returns}%
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mb-4">
                <Button 
                  onClick={() => navigate(`/invest/options/${fundId}`)} 
                  className="flex-1 mr-2"
                  variant="outline"
                >
                  <Plus size={14} className="mr-1" /> Invest More
                </Button>
                <Button 
                  onClick={() => navigate(`/invest/options/${fundId}`, { state: { defaultTab: 'sell' } })} 
                  className="flex-1 bg-gray-900"
                >
                  Redeem
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Transaction History</div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg">
                      <div>
                        <div className="font-medium">SIP Investment</div>
                        <div className="text-xs text-gray-500">22 Jun 2023</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹1,000</div>
                        <div className="text-xs text-gray-500">18.54 units</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg">
                      <div>
                        <div className="font-medium">SIP Investment</div>
                        <div className="text-xs text-gray-500">22 May 2023</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹1,000</div>
                        <div className="text-xs text-gray-500">19.12 units</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg">
                      <div>
                        <div className="font-medium">Lumpsum Investment</div>
                        <div className="text-xs text-gray-500">10 Apr 2023</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹20,000</div>
                        <div className="text-xs text-gray-500">420.27 units</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">SIP Details</div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm">Monthly SIP</div>
                      <div className="font-medium">₹1,000</div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm">SIP Date</div>
                      <div className="font-medium">22nd of every month</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">Status</div>
                      <div className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-medium">Active</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
      
      <BottomNav />
    </div>
  );
};

const User = ({ size = 24, className = "" }: { size?: number, className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
};

const AlertTriangle = ({ size = 24, className = "" }: { size?: number, className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
      <path d="M12 9v4"></path>
      <path d="M12 17h.01"></path>
    </svg>
  );
};

export default FundDetailsPage;
