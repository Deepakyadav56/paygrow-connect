
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from '@/components/ui/button';

export interface ChartData {
  month: string;
  value: number;
  benchmark: number;
}

interface FundPerfChartProps {
  data: ChartData[];
  fundName: string;
  benchmarkName: string;
  fullView?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
        <p className="font-medium text-sm mb-1">{label}</p>
        <p className="text-app-blue font-medium text-sm">
          {payload[0].name}: ₹{payload[0].value.toLocaleString('en-IN')}
        </p>
        <p className="text-gray-600 text-sm">
          {payload[1].name}: ₹{payload[1].value.toLocaleString('en-IN')}
        </p>
      </div>
    );
  }

  return null;
};

const FundPerfChart: React.FC<FundPerfChartProps> = ({ 
  data, 
  fundName, 
  benchmarkName, 
  fullView = false 
}) => {
  const [timeRange, setTimeRange] = useState<'1y' | '3y' | '5y' | 'all'>('1y');
  
  // Filter data based on selected time range
  const getFilteredData = () => {
    if (timeRange === 'all' || data.length <= 12) return data;
    
    const ranges = {
      '1y': 12,
      '3y': 36,
      '5y': 60
    };
    
    return data.slice(-ranges[timeRange]);
  };

  return (
    <div className={`${fullView ? "h-96" : "h-72"} bg-white rounded-xl shadow-sm p-5 border border-gray-100`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-900">Performance Comparison</h3>
        <div className="flex space-x-1 bg-gray-100 p-0.5 rounded-lg">
          <Button 
            variant={timeRange === '1y' ? 'default' : 'ghost'} 
            className={`h-7 text-xs px-3 rounded-md ${timeRange === '1y' ? 'bg-white text-app-blue shadow-sm' : 'text-gray-600 hover:bg-transparent hover:text-gray-900'}`}
            onClick={() => setTimeRange('1y')}
          >
            1Y
          </Button>
          <Button 
            variant={timeRange === '3y' ? 'default' : 'ghost'} 
            className={`h-7 text-xs px-3 rounded-md ${timeRange === '3y' ? 'bg-white text-app-blue shadow-sm' : 'text-gray-600 hover:bg-transparent hover:text-gray-900'}`}
            onClick={() => setTimeRange('3y')}
          >
            3Y
          </Button>
          <Button 
            variant={timeRange === '5y' ? 'default' : 'ghost'} 
            className={`h-7 text-xs px-3 rounded-md ${timeRange === '5y' ? 'bg-white text-app-blue shadow-sm' : 'text-gray-600 hover:bg-transparent hover:text-gray-900'}`}
            onClick={() => setTimeRange('5y')}
          >
            5Y
          </Button>
          <Button 
            variant={timeRange === 'all' ? 'default' : 'ghost'} 
            className={`h-7 text-xs px-3 rounded-md ${timeRange === 'all' ? 'bg-white text-app-blue shadow-sm' : 'text-gray-600 hover:bg-transparent hover:text-gray-900'}`}
            onClick={() => setTimeRange('all')}
          >
            All
          </Button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={getFilteredData()}
          margin={{ top: 10, right: 5, left: 5, bottom: 15 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0066FF" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#0066FF" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#888' }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#888' }} 
            width={50}
            tickFormatter={(value) => `₹${value.toLocaleString('en-IN', {
              notation: 'compact',
              compactDisplay: 'short'
            })}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={36}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#0066FF" 
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0 }}
            name={fundName}
            fill="url(#colorValue)"
          />
          <Line 
            type="monotone" 
            dataKey="benchmark" 
            stroke="#888888" 
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0 }}
            name={benchmarkName}
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FundPerfChart;
