
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, TrendingUp, InfoIcon, Calendar, Star, FileText, ExternalLink, Download, Plus, BarChart3, ArrowRight, Percent, Wallet, Target, Award, ChevronRight, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FundData {
  id: string;
  name: string;
  category: string;
  amc: string;
  nav: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  rating: number;
  minInvestment: number;
  exitLoad: string;
  inception: string;
  expenseRatio: number;
  fundSize: number;
  returns: {
    oneMonth: number;
    threeMonth: number;
    sixMonth: number;
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
  description: string;
  fundManager: {
    name: string;
    since: string;
    bio: string;
  };
  investmentStrategy: string[];
  assetAllocation: {
    equity: number;
    debt: number;
    cash: number;
  };
  topHoldings: Array<{ name: string; percentage: number }>;
  sectorAllocation: Array<{ name: string; percentage: number }>;
  benchmarkComparison: {
    fundReturn: number;
    benchmarkReturn: number;
    benchmarkName: string;
  };
}

const fundsData: Record<string, FundData> = {
  'inv1': {
    id: 'inv1',
    name: 'Axis Bluechip Fund',
    category: 'Equity - Large Cap',
    amc: 'Axis Mutual Fund',
    nav: 52.32,
    riskLevel: 'Moderate',
    rating: 4,
    minInvestment: 500,
    exitLoad: '1% if redeemed within 1 year',
    inception: '05 Jan 2010',
    expenseRatio: 1.72,
    fundSize: 35428,
    returns: {
      oneMonth: 2.3,
      threeMonth: 5.8,
      sixMonth: 7.1,
      oneYear: 12.5,
      threeYear: 8.7,
      fiveYear: 11.2
    },
    description: 'Axis Bluechip Fund is a large cap fund that aims to generate long-term capital appreciation by investing in a diversified portfolio predominantly consisting of equity and equity-related instruments of large-cap companies.',
    fundManager: {
      name: 'Jinesh Desai',
      since: 'April 2018',
      bio: 'With over 15 years of experience in equity research and fund management, Jinesh has consistently delivered strong risk-adjusted returns across market cycles.'
    },
    investmentStrategy: [
      'Focus on high-quality large-cap stocks with strong fundamentals',
      'Diversified portfolio across various sectors',
      'Long-term investment horizon with low portfolio turnover',
      'Research-driven stock selection process',
      'Managed by experienced fund managers with proven track record'
    ],
    assetAllocation: {
      equity: 85,
      debt: 10,
      cash: 5
    },
    topHoldings: [
      { name: 'HDFC Bank', percentage: 8.2 },
      { name: 'Infosys', percentage: 7.5 },
      { name: 'Reliance Industries', percentage: 6.9 },
      { name: 'TCS', percentage: 5.8 },
      { name: 'ICICI Bank', percentage: 5.2 }
    ],
    sectorAllocation: [
      { name: 'Financial Services', percentage: 32.5 },
      { name: 'IT', percentage: 18.2 },
      { name: 'Oil & Gas', percentage: 12.4 },
      { name: 'Consumer Goods', percentage: 9.8 },
      { name: 'Automobile', percentage: 6.7 }
    ],
    benchmarkComparison: {
      fundReturn: 12.5,
      benchmarkReturn: 11.2,
      benchmarkName: 'Nifty 50 TRI'
    }
  },
  'rec1': {
    id: 'rec1',
    name: 'Mirae Asset Large Cap Fund',
    category: 'Equity - Large Cap',
    amc: 'Mirae Asset Mutual Fund',
    nav: 86.75,
    riskLevel: 'Moderate',
    rating: 5,
    minInvestment: 1000,
    exitLoad: '1% if redeemed within 1 year',
    inception: '04 Apr 2008',
    expenseRatio: 1.54,
    fundSize: 29876,
    returns: {
      oneMonth: 3.1,
      threeMonth: 6.5,
      sixMonth: 9.8,
      oneYear: 14.2,
      threeYear: 11.5,
      fiveYear: 13.8
    },
    description: 'Mirae Asset Large Cap Fund is an open-ended equity scheme predominantly investing in large cap stocks with an objective to generate long term capital appreciation.',
    fundManager: {
      name: 'Neelesh Surana',
      since: 'March 2015',
      bio: 'Neelesh has over 18 years of experience in equity research and portfolio management. He follows a growth-oriented investment approach focused on quality businesses.'
    },
    investmentStrategy: [
      'Bottom-up stock selection approach',
      'Focus on quality growth companies with sustainable competitive advantages',
      'Emphasis on businesses with high return on capital',
      'Disciplined valuation framework',
      'Long-term investment horizon'
    ],
    assetAllocation: {
      equity: 88,
      debt: 7,
      cash: 5
    },
    topHoldings: [
      { name: 'ICICI Bank', percentage: 9.1 },
      { name: 'HDFC Bank', percentage: 8.7 },
      { name: 'Reliance Industries', percentage: 7.8 },
      { name: 'Infosys', percentage: 5.9 },
      { name: 'Axis Bank', percentage: 4.6 }
    ],
    sectorAllocation: [
      { name: 'Financial Services', percentage: 35.8 },
      { name: 'IT', percentage: 15.7 },
      { name: 'Oil & Gas', percentage: 11.9 },
      { name: 'Consumer Goods', percentage: 10.2 },
      { name: 'Healthcare', percentage: 8.5 }
    ],
    benchmarkComparison: {
      fundReturn: 14.2,
      benchmarkReturn: 12.8,
      benchmarkName: 'Nifty 100 TRI'
    }
  }
};

const FundDetailsPage: React.FC = () => {
  const { fundId } = useParams<{ fundId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'details'>('overview');
  const [investmentAmount, setInvestmentAmount] = useState('');
  
  // If fundId does not exist in our data, use a default
  const fund = fundsData[fundId || 'inv1'] || fundsData['inv1'];
  
  const quickAmounts = [1000, 5000, 10000, 25000];
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setInvestmentAmount(value);
    }
  };
  
  const handleQuickAmount = (amount: number) => {
    setInvestmentAmount(amount.toString());
  };
  
  const handleInvest = () => {
    if (!investmentAmount || parseInt(investmentAmount) < fund.minInvestment) {
      toast.error(`Minimum investment amount is ₹${fund.minInvestment}`);
      return;
    }
    
    // Navigate to investment options page for more detailed configuration
    navigate(`/invest/options/${fund.id}`, {
      state: {
        fundId: fund.id,
        fundName: fund.name,
        amount: parseInt(investmentAmount),
        nav: fund.nav
      }
    });
  };
  
  const renderRiskLabel = (risk: 'Low' | 'Moderate' | 'High') => {
    switch(risk) {
      case 'Low':
        return <span className="badge badge-success">Low Risk</span>;
      case 'Moderate':
        return <span className="badge badge-warning">Moderate Risk</span>;
      case 'High':
        return <span className="badge badge-danger">High Risk</span>;
    }
  };
  
  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < rating ? '#F7931A' : 'none'}
            stroke={i < rating ? '#F7931A' : '#D1D5DB'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-32">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="p-4 flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold ml-2">Fund Details</h1>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={(value) => setActiveTab(value as 'overview' | 'performance' | 'details')}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex-1 p-6">
        <TabsContent value="overview" className="mt-0 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">{fund.name}</h2>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-sm text-gray-500">{fund.category}</span>
              {renderRiskLabel(fund.riskLevel)}
            </div>
            
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <div className="text-sm text-gray-500 mb-1">NAV</div>
                <div className="font-semibold">₹{fund.nav}</div>
              </div>
              <div className="mr-4">
                <div className="text-sm text-gray-500 mb-1">1Y Returns</div>
                <div className="text-app-green font-semibold">+{fund.returns.oneYear}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Rating</div>
                <div>{renderRatingStars(fund.rating)}</div>
              </div>
            </div>
            
            <p className="text-gray-700">
              {fund.description}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Returns</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden p-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-500">1M</div>
                  <div className={`font-medium ${fund.returns.oneMonth >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                    {fund.returns.oneMonth >= 0 ? '+' : ''}{fund.returns.oneMonth}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">3M</div>
                  <div className={`font-medium ${fund.returns.threeMonth >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                    {fund.returns.threeMonth >= 0 ? '+' : ''}{fund.returns.threeMonth}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">6M</div>
                  <div className={`font-medium ${fund.returns.sixMonth >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                    {fund.returns.sixMonth >= 0 ? '+' : ''}{fund.returns.sixMonth}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">1Y</div>
                  <div className={`font-medium ${fund.returns.oneYear >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                    {fund.returns.oneYear >= 0 ? '+' : ''}{fund.returns.oneYear}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">3Y</div>
                  <div className={`font-medium ${fund.returns.threeYear >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                    {fund.returns.threeYear >= 0 ? '+' : ''}{fund.returns.threeYear}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">5Y</div>
                  <div className={`font-medium ${fund.returns.fiveYear >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                    {fund.returns.fiveYear >= 0 ? '+' : ''}{fund.returns.fiveYear}%
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Fund Information</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden p-4 space-y-3">
              <div className="flex justify-between">
                <div className="text-gray-600">Fund House</div>
                <div className="font-medium">{fund.amc}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-gray-600">Fund Size</div>
                <div className="font-medium">₹{fund.fundSize.toLocaleString()} Cr</div>
              </div>
              <div className="flex justify-between">
                <div className="text-gray-600">Expense Ratio</div>
                <div className="font-medium">{fund.expenseRatio}%</div>
              </div>
              <div className="flex justify-between">
                <div className="text-gray-600">Min. Investment</div>
                <div className="font-medium">₹{fund.minInvestment}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-gray-600">Exit Load</div>
                <div className="font-medium">{fund.exitLoad}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-gray-600">Inception Date</div>
                <div className="font-medium">{fund.inception}</div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => window.open('#', '_blank')}
              className="flex-1 flex items-center justify-center py-3 border border-gray-300 rounded-xl"
            >
              <FileText size={18} className="mr-2" />
              Fact Sheet
            </button>
            <button
              onClick={() => window.open('#', '_blank')}
              className="flex-1 flex items-center justify-center py-3 border border-gray-300 rounded-xl"
            >
              <Download size={18} className="mr-2" />
              SID
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="mt-0 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <h3 className="font-semibold mb-3">Fund vs. Benchmark</h3>
            <div className="p-6 bg-gray-50 rounded-xl flex items-center justify-center">
              {/* Placeholder for chart */}
              <div className="text-center">
                <BarChart3 size={48} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Performance Chart</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-app-blue rounded-full mr-2"></div>
                <span className="text-sm">{fund.name} ({fund.benchmarkComparison.fundReturn}%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                <span className="text-sm">{fund.benchmarkComparison.benchmarkName} ({fund.benchmarkComparison.benchmarkReturn}%)</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <h3 className="font-semibold mb-3">Historical NAV Trend</h3>
            <div className="p-6 bg-gray-50 rounded-xl flex items-center justify-center">
              {/* Placeholder for chart */}
              <div className="text-center">
                <TrendingUp size={48} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">NAV Trend Chart</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Historical Returns</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex justify-between items-center border-b border-gray-100 p-4">
                <div className="font-medium">Period</div>
                <div className="font-medium">Fund Returns</div>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray-100 p-4">
                <div>1 Month</div>
                <div className={`font-medium ${fund.returns.oneMonth >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                  {fund.returns.oneMonth >= 0 ? '+' : ''}{fund.returns.oneMonth}%
                </div>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray-100 p-4">
                <div>3 Months</div>
                <div className={`font-medium ${fund.returns.threeMonth >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                  {fund.returns.threeMonth >= 0 ? '+' : ''}{fund.returns.threeMonth}%
                </div>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray-100 p-4">
                <div>6 Months</div>
                <div className={`font-medium ${fund.returns.sixMonth >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                  {fund.returns.sixMonth >= 0 ? '+' : ''}{fund.returns.sixMonth}%
                </div>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray-100 p-4">
                <div>1 Year</div>
                <div className={`font-medium ${fund.returns.oneYear >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                  {fund.returns.oneYear >= 0 ? '+' : ''}{fund.returns.oneYear}%
                </div>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray-100 p-4">
                <div>3 Years</div>
                <div className={`font-medium ${fund.returns.threeYear >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                  {fund.returns.threeYear >= 0 ? '+' : ''}{fund.returns.threeYear}%
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4">
                <div>5 Years</div>
                <div className={`font-medium ${fund.returns.fiveYear >= 0 ? 'text-app-green' : 'text-app-red'}`}>
                  {fund.returns.fiveYear >= 0 ? '+' : ''}{fund.returns.fiveYear}%
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <h3 className="font-semibold mb-3">SIP Performance</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="text-gray-600">₹10,000 monthly for 1 year</div>
                <div className="font-medium text-app-green">₹1,29,500</div>
              </div>
              <div className="flex justify-between">
                <div className="text-gray-600">₹10,000 monthly for 3 years</div>
                <div className="font-medium text-app-green">₹4,32,800</div>
              </div>
              <div className="flex justify-between">
                <div className="text-gray-600">₹10,000 monthly for 5 years</div>
                <div className="font-medium text-app-green">₹8,27,500</div>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                *SIP returns based on historical performance. Past performance is not indicative of future returns.
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Growth of ₹10,000 since inception</h3>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="text-2xl font-bold text-app-blue mb-1">₹42,800</div>
              <div className="text-sm text-gray-500 mb-4">If invested on {fund.inception}</div>
              <div className="p-6 bg-gray-50 rounded-xl flex items-center justify-center">
                {/* Placeholder for comparison chart */}
                <div className="text-center">
                  <TrendingUp size={48} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Growth Chart</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="details" className="mt-0 space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Fund Overview</h3>
            <p className="text-gray-700 mb-4">
              {fund.description}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Investment Strategy</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {fund.investmentStrategy.map((strategy, index) => (
                <li key={index}>{strategy}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Asset Allocation</h3>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="h-32 w-32 rounded-full border-8 border-app-blue relative mx-auto mb-3">
                <div className="absolute inset-0 border-t-8 border-r-8 border-app-teal rounded-full" style={{transform: `rotate(${fund.assetAllocation.equity * 3.6}deg)`}}></div>
                <div className="absolute inset-0 border-b-8 border-l-8 border-app-orange rounded-full" style={{transform: `rotate(${(fund.assetAllocation.equity + fund.assetAllocation.debt) * 3.6}deg)`}}></div>
              </div>
              
              <div className="flex justify-center space-x-4 text-sm mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-app-blue rounded-full mr-1"></div>
                  <span>Equity ({fund.assetAllocation.equity}%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-app-teal rounded-full mr-1"></div>
                  <span>Debt ({fund.assetAllocation.debt}%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-app-orange rounded-full mr-1"></div>
                  <span>Cash ({fund.assetAllocation.cash}%)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Top Holdings</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex justify-between items-center border-b border-gray-100 p-4">
                <div className="font-medium">Stock</div>
                <div className="font-medium">% of Portfolio</div>
              </div>
              
              {fund.topHoldings.map((holding, index) => (
                <div key={index} className={`flex justify-between items-center ${index < fund.topHoldings.length - 1 ? 'border-b border-gray-100' : ''} p-4`}>
                  <div>{holding.name}</div>
                  <div>{holding.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Sector Allocation</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex justify-between items-center border-b border-gray-100 p-4">
                <div className="font-medium">Sector</div>
                <div className="font-medium">% of Portfolio</div>
              </div>
              
              {fund.sectorAllocation.map((sector, index) => (
                <div key={index} className={`flex justify-between items-center ${index < fund.sectorAllocation.length - 1 ? 'border-b border-gray-100' : ''} p-4`}>
                  <div>{sector.name}</div>
                  <div>{sector.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Fund Manager</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden p-4">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <span className="text-gray-700 font-medium">{fund.fundManager.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <h4 className="font-medium">{fund.fundManager.name}</h4>
                  <p className="text-sm text-gray-500">Managing since {fund.fundManager.since}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                {fund.fundManager.bio}
              </p>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="mb-6">
            <AccordionItem value="tax">
              <AccordionTrigger className="text-app-blue">
                <div className="flex items-center">
                  <Percent size={16} className="mr-2" />
                  Tax Implications
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 py-2">
                  <p className="text-sm text-gray-700">
                    <strong>Equity Funds:</strong> Long-term capital gains (held for more than 1 year) are taxed at 10% above ₹1 lakh. Short-term capital gains (held for less than 1 year) are taxed at 15%.
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Debt Funds:</strong> Capital gains are taxed as per your income tax slab.
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>ELSS Funds:</strong> Offer tax deduction up to ₹1.5 lakh under Section 80C with a lock-in period of 3 years.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="risk">
              <AccordionTrigger className="text-app-blue">
                <div className="flex items-center">
                  <Shield size={16} className="mr-2" />
                  Risk Factors
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 py-2">
                  <p className="text-sm text-gray-700">
                    <strong>Market Risk:</strong> The fund is subject to market fluctuations and may lose value.
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Concentration Risk:</strong> The fund may have concentrated exposure to certain sectors or companies.
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Liquidity Risk:</strong> Some investments may be difficult to sell at a favorable price.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="flex space-x-3">
            <button
              onClick={() => window.open('#', '_blank')}
              className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl text-sm"
            >
              <Calendar size={16} className="mr-2" />
              Historical NAVs
            </button>
            <button
              onClick={() => window.open('#', '_blank')}
              className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl text-sm"
            >
              <ExternalLink size={16} className="mr-2" />
              Visit AMC Website
            </button>
          </div>
        </TabsContent>
      </div>
      
      <div className="p-6 border-t border-gray-200 bg-white fixed bottom-0 w-full">
        <h3 className="font-semibold mb-4">Invest in {fund.name}</h3>
        
        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">₹</span>
            </div>
            <input
              type="text"
              placeholder="Enter amount"
              value={investmentAmount}
              onChange={handleAmountChange}
              className="input-standard pl-8 text-lg font-semibold w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Minimum investment: ₹{fund.minInvestment}
          </p>
        </div>
        
        <div className="flex justify-between mb-6">
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                investmentAmount === amt.toString() 
                  ? 'bg-app-blue text-white' 
                  : 'border border-gray-300 text-gray-700'
              }`}
              onClick={() => handleQuickAmount(amt)}
            >
              ₹{amt.toLocaleString()}
            </button>
          ))}
        </div>
        
        <Button 
          onClick={handleInvest} 
          className="w-full py-6 bg-app-blue hover:bg-app-dark-blue"
          disabled={!investmentAmount || parseInt(investmentAmount) < fund.minInvestment}
        >
          Invest Now
        </Button>
        
        <button
          onClick={() => navigate('/invest/portfolio')}
          className="w-full mt-3 flex items-center justify-center text-app-blue font-medium py-2"
        >
          View Your Portfolio <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default FundDetailsPage;
