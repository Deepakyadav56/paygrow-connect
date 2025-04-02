
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowUp, ArrowDown, TrendingUp, Info, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface AssetAllocation {
  name: string;
  value: number;
  color: string;
}

interface PortfolioSummaryProps {
  totalValue: number;
  investedAmount: number;
  returns: number;
  returnsPercentage: number;
  assetAllocation: AssetAllocation[];
  sipCount?: number;
  activeGoals?: number;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-md rounded-lg border border-gray-200 text-xs">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-gray-600">
          {payload[0].value.toLocaleString('en-IN')} ({(payload[0].payload.percent * 100).toFixed(2)}%)
        </p>
      </div>
    );
  }

  return null;
};

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  totalValue,
  investedAmount,
  returns,
  returnsPercentage,
  assetAllocation,
  sipCount = 0,
  activeGoals = 0
}) => {
  const navigate = useNavigate();
  const isPositive = returns >= 0;
  
  return (
    <Card className="border-none shadow-sm overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-xl">
      <CardContent className="p-5">
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Total Portfolio Value</p>
          <div className="flex items-end">
            <h2 className="text-2xl font-bold">₹{totalValue.toLocaleString('en-IN')}</h2>
            <div className={`flex items-center ml-2 text-sm ${isPositive ? 'text-app-green' : 'text-app-red'}`}>
              {isPositive ? <ArrowUp size={14} className="mr-0.5" /> : <ArrowDown size={14} className="mr-0.5" />}
              <span className="font-medium">
                {isPositive ? '+' : ''}{returnsPercentage.toFixed(2)}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center mt-1 text-sm text-gray-600">
            <span>Invested: ₹{investedAmount.toLocaleString('en-IN')}</span>
            <span className="mx-2">•</span>
            <span className={isPositive ? 'text-app-green' : 'text-app-red'}>
              Returns: {isPositive ? '+' : ''}₹{returns.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center">
          <div className="w-32 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetAllocation}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {assetAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex-1 ml-0 md:ml-4 space-y-2 mt-3 md:mt-0">
            <h4 className="font-medium text-sm">Asset Allocation</h4>
            {assetAllocation.map((item) => (
              <div key={item.name} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{item.name}</span>
                </div>
                <div className="text-sm font-medium">{((item.value / totalValue) * 100).toFixed(0)}%</div>
              </div>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              className="px-0 text-app-blue hover:bg-transparent"
              onClick={() => navigate('/portfolio/allocation')}
            >
              View Details <ArrowUpRight size={14} className="ml-1" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
          <div 
            className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-colors"
            onClick={() => navigate('/sip/management')}
          >
            <div className="flex justify-between">
              <p className="text-xs text-gray-500">Active SIPs</p>
              <TrendingUp size={16} className="text-app-green" />
            </div>
            <p className="font-medium mt-1">{sipCount}</p>
          </div>
          <div 
            className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-colors"
            onClick={() => navigate('/invest/goals')}
          >
            <div className="flex justify-between">
              <p className="text-xs text-gray-500">Investment Goals</p>
              <Info size={16} className="text-app-blue" />
            </div>
            <p className="font-medium mt-1">{activeGoals}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummary;
