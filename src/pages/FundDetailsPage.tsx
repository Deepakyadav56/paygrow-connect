
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, TrendingUp, InfoIcon, Calendar, Star, FileText, ExternalLink, Download, Plus, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
    description: 'Axis Bluechip Fund is a large cap fund that aims to generate long-term capital appreciation by investing in a diversified portfolio predominantly consisting of equity and equity-related instruments of large-cap companies.'
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
    description: 'Mirae Asset Large Cap Fund is an open-ended equity scheme predominantly investing in large cap stocks with an objective to generate long term capital appreciation.'
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
    <div className="min-h-screen bg-white flex flex-col">
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
        
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-3 text-center ${activeTab === 'overview' ? 'text-app-blue border-b-2 border-app-blue' : 'text-gray-500'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`flex-1 py-3 text-center ${activeTab === 'performance' ? 'text-app-blue border-b-2 border-app-blue' : 'text-gray-500'}`}
            onClick={() => setActiveTab('performance')}
          >
            Performance
          </button>
          <button
            className={`flex-1 py-3 text-center ${activeTab === 'details' ? 'text-app-blue border-b-2 border-app-blue' : 'text-gray-500'}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
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
          </div>
        )}
        
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="p-6 bg-gray-50 rounded-xl flex items-center justify-center">
              {/* Placeholder for chart */}
              <div className="text-center">
                <BarChart3 size={48} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Performance Chart</p>
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
            
            <div>
              <h3 className="font-semibold mb-3">Performance Comparison</h3>
              <div className="p-6 bg-gray-50 rounded-xl flex items-center justify-center">
                {/* Placeholder for comparison chart */}
                <div className="text-center">
                  <TrendingUp size={48} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Comparison Chart</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'details' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Fund Overview</h3>
              <p className="text-gray-700 mb-4">
                {fund.description}
              </p>
              <p className="text-gray-700">
                The fund seeks to generate long-term capital appreciation by investing predominantly in equity and equity-related securities of large-cap companies. It follows a diversified investment approach focusing on high-quality companies with strong financials and growth potential.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Investment Strategy</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Focus on high-quality large-cap stocks with strong fundamentals</li>
                <li>Diversified portfolio across various sectors</li>
                <li>Long-term investment horizon with low portfolio turnover</li>
                <li>Research-driven stock selection process</li>
                <li>Managed by experienced fund managers with proven track record</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Asset Allocation</h3>
              <div className="p-6 bg-gray-50 rounded-xl flex items-center justify-center">
                {/* Placeholder for asset allocation chart */}
                <div className="text-center">
                  <div className="h-32 w-32 rounded-full border-8 border-app-blue relative mx-auto mb-3">
                    <div className="absolute inset-0 border-t-8 border-r-8 border-app-teal rounded-full rotate-45"></div>
                    <div className="absolute inset-0 border-b-8 border-l-8 border-app-orange rounded-full rotate-45"></div>
                  </div>
                  
                  <div className="flex justify-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-app-blue rounded-full mr-1"></div>
                      <span>Equity (85%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-app-teal rounded-full mr-1"></div>
                      <span>Debt (10%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-app-orange rounded-full mr-1"></div>
                      <span>Cash (5%)</span>
                    </div>
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
                
                <div className="flex justify-between items-center border-b border-gray-100 p-4">
                  <div>HDFC Bank</div>
                  <div>8.2%</div>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-100 p-4">
                  <div>Infosys</div>
                  <div>7.5%</div>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-100 p-4">
                  <div>Reliance Industries</div>
                  <div>6.9%</div>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-100 p-4">
                  <div>TCS</div>
                  <div>5.8%</div>
                </div>
                
                <div className="flex justify-between items-center p-4">
                  <div>ICICI Bank</div>
                  <div>5.2%</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Fund Manager</h3>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden p-4">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <span className="text-gray-700 font-medium">JD</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Jinesh Desai</h4>
                    <p className="text-sm text-gray-500">Managing since April 2018</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  With over 15 years of experience in equity research and fund management, Jinesh has consistently delivered strong risk-adjusted returns across market cycles.
                </p>
              </div>
            </div>
            
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
          </div>
        )}
      </div>
      
      <div className="p-6 border-t border-gray-200 bg-white">
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
              className="input-standard pl-8 text-lg font-semibold"
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
