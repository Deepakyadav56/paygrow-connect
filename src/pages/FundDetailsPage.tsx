
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Info, Calendar, Percent, BarChart, LineChart, ChevronRight, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import FundDetailsCard from '@/components/FundDetailsCard';
import FundPerformanceCard from '@/components/FundPerformanceCard';
import FundHoldings from '@/components/FundHoldings';
import FundPerfChart from '@/components/FundPerfChart';
import InvestmentComparisonChart from '@/components/InvestmentComparisonChart';
import RecentActivity, { ActivityType } from '@/components/RecentActivity';

// Mock fund data
const getFundDetails = (fundId: string) => {
  // In a real app, this would fetch data from an API
  return {
    id: fundId,
    name: fundId === 'fund1' ? 'HDFC Mid-Cap Opportunities Fund' : 'Axis Bluechip Fund',
    category: fundId === 'fund1' ? 'Equity - Mid Cap' : 'Equity - Large Cap',
    fundType: fundId === 'fund1' ? 'Growth' : 'Dividend',
    amc: fundId === 'fund1' ? 'HDFC Mutual Fund' : 'Axis Mutual Fund',
    nav: fundId === 'fund1' ? 36.67 : 25.85,
    aum: fundId === 'fund1' ? 54253000000 : 32176000000, // in rupees
    expenseRatio: fundId === 'fund1' ? 1.78 : 1.54,
    exitLoad: fundId === 'fund1' ? '1% if redeemed within 1 year' : '0.5% if redeemed within 6 months',
    lockInPeriod: 'None',
    riskLevel: fundId === 'fund1' ? 'High' : 'Moderate',
    minSipAmount: fundId === 'fund1' ? 500 : 1000,
    minLumpSumAmount: fundId === 'fund1' ? 5000 : 5000,
    fundManager: fundId === 'fund1' ? 'Chirag Setalvad' : 'Jinesh Gopani',
    launchDate: fundId === 'fund1' ? '25 Jun 2007' : '05 Jan 2010',
    benchmark: fundId === 'fund1' ? 'NIFTY Midcap 150 TRI' : 'NIFTY 50 TRI',
    returns: {
      oneMonth: fundId === 'fund1' ? 2.5 : 1.8,
      threeMonth: fundId === 'fund1' ? 7.2 : 4.9,
      sixMonth: fundId === 'fund1' ? 15.4 : 9.7,
      oneYear: fundId === 'fund1' ? 25.0 : 12.5,
      threeYear: fundId === 'fund1' ? 22.1 : 15.3,
      fiveYear: fundId === 'fund1' ? 18.5 : 13.7,
      tenYear: fundId === 'fund1' ? 16.9 : 12.8,
      sinceInception: fundId === 'fund1' ? 14.5 : 11.2
    },
    benchmarkReturns: {
      oneMonth: fundId === 'fund1' ? 2.1 : 1.5,
      threeMonth: fundId === 'fund1' ? 6.5 : 4.2,
      sixMonth: fundId === 'fund1' ? 13.8 : 8.9,
      oneYear: fundId === 'fund1' ? 21.4 : 11.3,
      threeYear: fundId === 'fund1' ? 18.7 : 13.9,
      fiveYear: fundId === 'fund1' ? 15.1 : 11.8,
      tenYear: fundId === 'fund1' ? 13.2 : 10.5,
      sinceInception: fundId === 'fund1' ? 11.8 : 9.7
    },
    categoryReturns: {
      oneMonth: fundId === 'fund1' ? 2.3 : 1.6,
      threeMonth: fundId === 'fund1' ? 6.8 : 4.5,
      sixMonth: fundId === 'fund1' ? 14.3 : 9.2,
      oneYear: fundId === 'fund1' ? 22.7 : 11.9,
      threeYear: fundId === 'fund1' ? 19.8 : 14.5,
      fiveYear: fundId === 'fund1' ? 16.2 : 12.4,
      tenYear: fundId === 'fund1' ? 14.6 : 11.3,
      sinceInception: fundId === 'fund1' ? 12.5 : 10.1
    },
    stockHoldings: [
      { name: fundId === 'fund1' ? 'Max Healthcare' : 'HDFC Bank', value: fundId === 'fund1' ? 750 : 950, percentage: fundId === 'fund1' ? 7.5 : 9.5 },
      { name: fundId === 'fund1' ? 'Cholamandalam Investment' : 'ICICI Bank', value: fundId === 'fund1' ? 720 : 850, percentage: fundId === 'fund1' ? 7.2 : 8.5 },
      { name: fundId === 'fund1' ? 'Supreme Industries' : 'Infosys', value: fundId === 'fund1' ? 680 : 780, percentage: fundId === 'fund1' ? 6.8 : 7.8 },
      { name: fundId === 'fund1' ? 'Voltas' : 'TCS', value: fundId === 'fund1' ? 620 : 750, percentage: fundId === 'fund1' ? 6.2 : 7.5 },
      { name: fundId === 'fund1' ? 'Sundaram Finance' : 'Reliance Industries', value: fundId === 'fund1' ? 580 : 720, percentage: fundId === 'fund1' ? 5.8 : 7.2 },
      { name: fundId === 'fund1' ? 'Coforge' : 'HUL', value: fundId === 'fund1' ? 540 : 650, percentage: fundId === 'fund1' ? 5.4 : 6.5 },
      { name: fundId === 'fund1' ? 'Dixon Technologies' : 'Bharti Airtel', value: fundId === 'fund1' ? 520 : 620, percentage: fundId === 'fund1' ? 5.2 : 6.2 },
      { name: fundId === 'fund1' ? 'City Union Bank' : 'Kotak Mahindra Bank', value: fundId === 'fund1' ? 480 : 580, percentage: fundId === 'fund1' ? 4.8 : 5.8 },
      { name: fundId === 'fund1' ? 'Brigade Enterprises' : 'Axis Bank', value: fundId === 'fund1' ? 450 : 550, percentage: fundId === 'fund1' ? 4.5 : 5.5 },
      { name: fundId === 'fund1' ? 'Page Industries' : 'L&T', value: fundId === 'fund1' ? 430 : 520, percentage: fundId === 'fund1' ? 4.3 : 5.2 }
    ],
    sectorAllocation: [
      { name: 'Financial Services', value: fundId === 'fund1' ? 2800 : 3600, percentage: fundId === 'fund1' ? 28 : 36 },
      { name: fundId === 'fund1' ? 'Consumer Discretionary' : 'IT', value: fundId === 'fund1' ? 1800 : 2200, percentage: fundId === 'fund1' ? 18 : 22 },
      { name: fundId === 'fund1' ? 'Industrials' : 'FMCG', value: fundId === 'fund1' ? 1400 : 1500, percentage: fundId === 'fund1' ? 14 : 15 },
      { name: fundId === 'fund1' ? 'Healthcare' : 'Oil & Gas', value: fundId === 'fund1' ? 1200 : 1300, percentage: fundId === 'fund1' ? 12 : 13 },
      { name: fundId === 'fund1' ? 'Technology' : 'Automobile', value: fundId === 'fund1' ? 800 : 900, percentage: fundId === 'fund1' ? 8 : 9 },
      { name: 'Others', value: fundId === 'fund1' ? 2000 : 500, percentage: fundId === 'fund1' ? 20 : 5 }
    ],
    assetAllocation: [
      { name: 'Equity', value: 9200, percentage: 92 },
      { name: 'Cash & Equivalents', value: 800, percentage: 8 }
    ],
    performanceData: [
      { month: 'Jan 2023', value: fundId === 'fund1' ? 100 : 100, benchmark: fundId === 'fund1' ? 100 : 100 },
      { month: 'Feb 2023', value: fundId === 'fund1' ? 103 : 102, benchmark: fundId === 'fund1' ? 102 : 101 },
      { month: 'Mar 2023', value: fundId === 'fund1' ? 106 : 104, benchmark: fundId === 'fund1' ? 104 : 103 },
      { month: 'Apr 2023', value: fundId === 'fund1' ? 104 : 103, benchmark: fundId === 'fund1' ? 103 : 102 },
      { month: 'May 2023', value: fundId === 'fund1' ? 108 : 105, benchmark: fundId === 'fund1' ? 106 : 104 },
      { month: 'Jun 2023', value: fundId === 'fund1' ? 112 : 108, benchmark: fundId === 'fund1' ? 109 : 106 },
      { month: 'Jul 2023', value: fundId === 'fund1' ? 116 : 110, benchmark: fundId === 'fund1' ? 112 : 108 },
      { month: 'Aug 2023', value: fundId === 'fund1' ? 120 : 113, benchmark: fundId === 'fund1' ? 115 : 110 },
      { month: 'Sep 2023', value: fundId === 'fund1' ? 118 : 111, benchmark: fundId === 'fund1' ? 113 : 109 },
      { month: 'Oct 2023', value: fundId === 'fund1' ? 122 : 114, benchmark: fundId === 'fund1' ? 116 : 111 },
      { month: 'Nov 2023', value: fundId === 'fund1' ? 126 : 117, benchmark: fundId === 'fund1' ? 119 : 113 },
      { month: 'Dec 2023', value: fundId === 'fund1' ? 130 : 120, benchmark: fundId === 'fund1' ? 122 : 115 },
      { month: 'Jan 2024', value: fundId === 'fund1' ? 135 : 122, benchmark: fundId === 'fund1' ? 126 : 117 },
      { month: 'Feb 2024', value: fundId === 'fund1' ? 140 : 124, benchmark: fundId === 'fund1' ? 130 : 119 },
      { month: 'Mar 2024', value: fundId === 'fund1' ? 144 : 126, benchmark: fundId === 'fund1' ? 133 : 121 },
      { month: 'Apr 2024', value: fundId === 'fund1' ? 150 : 128, benchmark: fundId === 'fund1' ? 137 : 123 },
      { month: 'May 2024', value: fundId === 'fund1' ? 155 : 130, benchmark: fundId === 'fund1' ? 140 : 125 },
      { month: 'Jun 2024', value: fundId === 'fund1' ? 160 : 132, benchmark: fundId === 'fund1' ? 143 : 127 },
      { month: 'Jul 2024', value: fundId === 'fund1' ? 165 : 134, benchmark: fundId === 'fund1' ? 146 : 129 }
    ],
    sipVsLumpSumData: [
      { label: '6 Months', sipValue: 60500, lumpSumValue: 60000 },
      { label: '1 Year', sipValue: 122000, lumpSumValue: 120000 },
      { label: '3 Years', sipValue: 391000, lumpSumValue: 360000 },
      { label: '5 Years', sipValue: 690000, lumpSumValue: 600000 },
      { label: '10 Years', sipValue: 1580000, lumpSumValue: 1200000 },
    ],
    recentActivities: [
      { 
        id: '1', 
        type: 'sip_payment' as ActivityType, 
        date: '10 Jul 2024', 
        amount: fundId === 'fund1' ? 5000 : 2000, 
        fundName: fundId === 'fund1' ? 'HDFC Mid-Cap Opportunities Fund' : 'Axis Bluechip Fund', 
        description: 'SIP Installment' 
      },
      { 
        id: '2', 
        type: 'investment' as ActivityType, 
        date: '15 Jun 2024', 
        amount: fundId === 'fund1' ? 10000 : 5000, 
        fundName: fundId === 'fund1' ? 'HDFC Mid-Cap Opportunities Fund' : 'Axis Bluechip Fund', 
        description: 'One-time Investment' 
      },
      { 
        id: '3', 
        type: 'dividend' as ActivityType, 
        date: '22 May 2024', 
        amount: fundId === 'fund1' ? 1250 : 850, 
        fundName: fundId === 'fund1' ? 'HDFC Mid-Cap Opportunities Fund' : 'Axis Bluechip Fund', 
        description: 'Dividend Payout' 
      }
    ]
  };
};

const FundDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { fundId } = useParams<{ fundId: string }>();
  const [activeTab, setActiveTab] = useState<string>("overview");
  
  // Fetch fund details using the fundId from the URL params
  const fundDetails = getFundDetails(fundId || 'fund1');
  
  // Transform data for the performance chart
  const returnPeriods = [
    { label: '1M', fundReturn: fundDetails.returns.oneMonth, benchmarkReturn: fundDetails.benchmarkReturns.oneMonth, categoryReturn: fundDetails.categoryReturns.oneMonth },
    { label: '3M', fundReturn: fundDetails.returns.threeMonth, benchmarkReturn: fundDetails.benchmarkReturns.threeMonth, categoryReturn: fundDetails.categoryReturns.threeMonth },
    { label: '6M', fundReturn: fundDetails.returns.sixMonth, benchmarkReturn: fundDetails.benchmarkReturns.sixMonth, categoryReturn: fundDetails.categoryReturns.sixMonth },
    { label: '1Y', fundReturn: fundDetails.returns.oneYear, benchmarkReturn: fundDetails.benchmarkReturns.oneYear, categoryReturn: fundDetails.categoryReturns.oneYear },
    { label: '3Y', fundReturn: fundDetails.returns.threeYear, benchmarkReturn: fundDetails.benchmarkReturns.threeYear, categoryReturn: fundDetails.categoryReturns.threeYear },
    { label: '5Y', fundReturn: fundDetails.returns.fiveYear, benchmarkReturn: fundDetails.benchmarkReturns.fiveYear, categoryReturn: fundDetails.categoryReturns.fiveYear },
    { label: '10Y', fundReturn: fundDetails.returns.tenYear, benchmarkReturn: fundDetails.benchmarkReturns.tenYear, categoryReturn: fundDetails.categoryReturns.tenYear },
    { label: 'Since Inception', fundReturn: fundDetails.returns.sinceInception, benchmarkReturn: fundDetails.benchmarkReturns.sinceInception, categoryReturn: fundDetails.categoryReturns.sinceInception }
  ];

  return (
    <div className="app-container pb-20">
      <Header 
        title={fundDetails.name} 
        showBack
        showProfile
      />
      
      <div className="px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">{fundDetails.name}</h2>
            <p className="text-sm text-gray-500">{fundDetails.category} • {fundDetails.amc}</p>
          </div>
          <div className="flex space-x-2">
            <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
              <Share2 size={18} />
            </button>
            <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
              <Download size={18} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500">NAV</p>
            <p className="text-xl font-bold">₹{fundDetails.nav.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">1Y Return</p>
            <p className="text-xl font-bold text-app-green">+{fundDetails.returns.oneYear.toFixed(2)}%</p>
          </div>
        </div>
        
        <div className="mb-6 flex space-x-3">
          <Button 
            onClick={() => navigate(`/invest/options/${fundId}`)} 
            className="flex-1 font-semibold"
          >
            Invest Now
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate(`/invest/sip/start/${fundId}`)} 
            className="flex-1 font-semibold"
          >
            Start SIP
          </Button>
        </div>
        
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <FundPerfChart 
              data={fundDetails.performanceData} 
              fundName={fundDetails.name} 
              benchmarkName={fundDetails.benchmark} 
            />
            
            <FundPerformanceCard 
              returnPeriods={returnPeriods.slice(0, 4)} 
              compactView={true} 
            />
            
            <FundDetailsCard 
              nav={fundDetails.nav}
              expenseRatio={fundDetails.expenseRatio}
              riskLevel={fundDetails.riskLevel as 'Low' | 'Moderate' | 'High'}
              fundCategory={fundDetails.category}
              fundType={fundDetails.fundType}
              compactView={true}
            />
            
            <div>
              <h3 className="font-medium mb-3">SIP vs Lump Sum (₹10,000 monthly)</h3>
              <InvestmentComparisonChart 
                data={fundDetails.sipVsLumpSumData} 
                compactView={true}
                title=""
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Fund Holdings</h3>
                <Button 
                  variant="ghost" 
                  className="h-8 p-0 text-app-blue"
                  onClick={() => setActiveTab("holdings")}
                >
                  View All <ChevronRight size={16} />
                </Button>
              </div>
              <FundHoldings 
                stockHoldings={fundDetails.stockHoldings.slice(0, 5)}
                sectorAllocation={fundDetails.sectorAllocation.slice(0, 5)}
                showTabs={false}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Historical Performance</h3>
              <FundPerfChart 
                data={fundDetails.performanceData} 
                fundName={fundDetails.name} 
                benchmarkName={fundDetails.benchmark} 
                fullView
              />
            </div>
            
            <FundPerformanceCard 
              returnPeriods={returnPeriods} 
              showBenchmark={true}
              showCategory={true}
            />
            
            <div>
              <h3 className="font-medium mb-3">SIP vs Lump Sum Comparison</h3>
              <p className="text-sm text-gray-500 mb-3">
                Comparing ₹10,000 monthly SIP vs one-time Lump Sum investment of equivalent amount over different time periods.
              </p>
              <InvestmentComparisonChart 
                data={fundDetails.sipVsLumpSumData} 
                title=""
              />
            </div>
          </TabsContent>
          
          <TabsContent value="holdings" className="space-y-6">
            <FundHoldings 
              stockHoldings={fundDetails.stockHoldings}
              sectorAllocation={fundDetails.sectorAllocation}
              assetAllocation={fundDetails.assetAllocation}
              showTabs={true}
            />
            
            <FundDetailsCard 
              nav={fundDetails.nav}
              aum={fundDetails.aum}
              expenseRatio={fundDetails.expenseRatio}
              riskLevel={fundDetails.riskLevel as 'Low' | 'Moderate' | 'High'}
              fundCategory={fundDetails.category}
              fundType={fundDetails.fundType}
              exitLoad={fundDetails.exitLoad}
              lockInPeriod={fundDetails.lockInPeriod}
              minSipAmount={fundDetails.minSipAmount}
              minLumpSumAmount={fundDetails.minLumpSumAmount}
              fundManager={fundDetails.fundManager}
              launchDate={fundDetails.launchDate}
              benchmark={fundDetails.benchmark}
            />
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-6">
            <RecentActivity 
              activities={fundDetails.recentActivities}
              maxItems={10}
            />
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate(`/invest/options/${fundId}`)} 
                  className="font-medium"
                >
                  Invest More
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate(`/invest/options/${fundId}`, { state: { defaultTab: 'sell' } })} 
                  className="font-medium"
                >
                  Redeem
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default FundDetailsPage;
