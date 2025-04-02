
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';

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
  assetAllocation
}) => {
  const isPositive = returns >= 0;
  
  return (
    <Card className="border-none shadow-sm overflow-hidden bg-gradient-to-br from-white to-gray-50">
      <CardContent className="p-4">
        <div className="mb-4">
          <p className="text-sm text-gray-500">Total Portfolio Value</p>
          <h2 className="text-2xl font-bold">₹{totalValue.toLocaleString('en-IN')}</h2>
          
          <div className={`flex items-center mt-1 ${isPositive ? 'text-app-green' : 'text-app-red'}`}>
            {isPositive ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
            <span className="font-medium">
              {isPositive ? '+' : ''}₹{returns.toLocaleString('en-IN')} ({isPositive ? '+' : ''}{returnsPercentage.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
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
          
          <div className="flex-1 ml-4 space-y-3">
            {assetAllocation.map((item) => (
              <div key={item.name} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{item.name}</span>
                </div>
                <div className="text-sm font-medium">{((item.value / totalValue) * 100).toFixed(0)}%</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Invested Amount</p>
            <p className="font-medium">₹{investedAmount.toLocaleString('en-IN')}</p>
          </div>
          <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">XIRR</p>
            <p className={`font-medium ${isPositive ? 'text-app-green' : 'text-app-red'}`}>
              {isPositive ? '+' : ''}{(returnsPercentage * 0.87).toFixed(2)}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummary;
