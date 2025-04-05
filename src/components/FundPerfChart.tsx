
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import { CalendarDays, ChevronDown, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DataPoint {
  month: string;
  value: number;
  benchmark: number;
  category?: number;
}

interface FundPerfChartProps {
  data: DataPoint[];
  fundName: string;
  benchmarkName: string;
  categoryName?: string;
  fullView?: boolean;
  compactView?: boolean;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow border border-app-teal-100">
        <p className="font-medium text-app-teal-900">{label}</p>
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} className="flex items-center mt-1">
            <div 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-app-teal-700">{entry.name}:</span>
            <span className="ml-1 font-medium text-app-teal-900">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const FundPerfChart: React.FC<FundPerfChartProps> = ({ 
  data, 
  fundName, 
  benchmarkName, 
  categoryName,
  fullView = false,
  compactView = false
}) => {
  // State for time period filter
  const [timePeriod, setTimePeriod] = useState<'1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y' | 'ALL'>('1Y');
  const [showControls, setShowControls] = useState<boolean>(false);
  
  // Filter data based on selected time period
  const getFilteredData = () => {
    const currentData = [...data];
    
    if (timePeriod === '1M') {
      return currentData.slice(-2);
    } else if (timePeriod === '3M') {
      return currentData.slice(-4);
    } else if (timePeriod === '6M') {
      return currentData.slice(-7);
    } else if (timePeriod === '1Y') {
      return currentData.slice(-13);
    } else if (timePeriod === '3Y') {
      // For demo purposes, just show all data
      return currentData;
    } else if (timePeriod === '5Y') {
      // For demo purposes, just show all data
      return currentData;
    } else {
      return currentData;
    }
  };
  
  const filteredData = getFilteredData();
  
  // Calculate growth percentage
  const calculateGrowth = () => {
    if (filteredData.length < 2) return { fund: 0, benchmark: 0, category: 0 };
    
    const firstDataPoint = filteredData[0];
    const lastDataPoint = filteredData[filteredData.length - 1];
    
    const fundGrowth = ((lastDataPoint.value - firstDataPoint.value) / firstDataPoint.value) * 100;
    const benchmarkGrowth = ((lastDataPoint.benchmark - firstDataPoint.benchmark) / firstDataPoint.benchmark) * 100;
    const categoryGrowth = firstDataPoint.category && lastDataPoint.category ? 
      ((lastDataPoint.category - firstDataPoint.category) / firstDataPoint.category) * 100 : 0;
    
    return { fund: fundGrowth, benchmark: benchmarkGrowth, category: categoryGrowth };
  };
  
  const growth = calculateGrowth();
  
  return (
    <div className={`bg-white rounded-lg ${compactView ? 'p-3' : 'p-4'} shadow-sm`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className={`${compactView ? 'text-sm' : 'text-base'} font-medium text-app-teal-900`}>
          Performance
        </h3>
        
        <div className="flex items-center space-x-2">
          {!compactView && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowControls(!showControls)}
              className="h-7 px-2 text-app-teal-700 hover:text-app-teal-800 hover:bg-app-teal-50"
            >
              <CalendarDays size={16} className="mr-1" />
              {timePeriod}
              <ChevronDown size={14} className="ml-1" />
            </Button>
          )}
        </div>
      </div>
      
      {showControls && !compactView && (
        <div className="mb-3">
          <Tabs 
            value={timePeriod} 
            onValueChange={(value) => setTimePeriod(value as '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y' | 'ALL')}
          >
            <TabsList className="bg-app-teal-50 p-1 rounded-lg">
              <TabsTrigger 
                value="1M" 
                className="rounded-md data-[state=active]:bg-app-teal-100 data-[state=active]:text-app-teal-800"
              >
                1M
              </TabsTrigger>
              <TabsTrigger 
                value="3M" 
                className="rounded-md data-[state=active]:bg-app-teal-100 data-[state=active]:text-app-teal-800"
              >
                3M
              </TabsTrigger>
              <TabsTrigger 
                value="6M" 
                className="rounded-md data-[state=active]:bg-app-teal-100 data-[state=active]:text-app-teal-800"
              >
                6M
              </TabsTrigger>
              <TabsTrigger 
                value="1Y" 
                className="rounded-md data-[state=active]:bg-app-teal-100 data-[state=active]:text-app-teal-800"
              >
                1Y
              </TabsTrigger>
              <TabsTrigger 
                value="3Y" 
                className="rounded-md data-[state=active]:bg-app-teal-100 data-[state=active]:text-app-teal-800"
              >
                3Y
              </TabsTrigger>
              <TabsTrigger 
                value="5Y" 
                className="rounded-md data-[state=active]:bg-app-teal-100 data-[state=active]:text-app-teal-800"
              >
                5Y
              </TabsTrigger>
              <TabsTrigger 
                value="ALL" 
                className="rounded-md data-[state=active]:bg-app-teal-100 data-[state=active]:text-app-teal-800"
              >
                ALL
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}
      
      {compactView && (
        <div className="mb-3">
          <Tabs 
            value={timePeriod} 
            onValueChange={(value) => setTimePeriod(value as '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y' | 'ALL')}
          >
            <TabsList className="bg-app-teal-50 p-1 rounded-lg grid grid-cols-4 gap-1">
              <TabsTrigger 
                value="1M" 
                className="rounded-md text-xs h-7 data-[state=active]:bg-app-teal-100 data-[state=active]:text-app-teal-800"
              >
                1M
              </TabsTrigger>
              <TabsTrigger 
                value="3M" 
                className="rounded-md text-xs h-7 data-[state=active]:bg-app-teal-100 data-[state=active]:text-app-teal-800"
              >
                3M
              </TabsTrigger>
              <TabsTrigger 
                value="6M" 
                className="rounded-md text-xs h-7 data-[state=active]:bg-app-teal-100 data-[state=active]:text-app-teal-800"
              >
                6M
              </TabsTrigger>
              <TabsTrigger 
                value="1Y" 
                className="rounded-md text-xs h-7 data-[state=active]:bg-app-teal-100 data-[state=active]:text-app-teal-800"
              >
                1Y
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}
      
      <div className={`${compactView ? 'h-44' : fullView ? 'h-80' : 'h-64'} mt-4`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{
              top: 5,
              right: 0,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7e9" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: compactView ? 10 : 12, fill: '#64748b' }} 
              interval={compactView ? 1 : 0} 
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              tick={{ fontSize: compactView ? 10 : 12, fill: '#64748b' }} 
              domain={['dataMin - 10', 'dataMax + 10']}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={compactView ? 20 : 36} />
            <Line
              name={compactView ? "Fund" : fundName}
              type="monotone"
              dataKey="value"
              stroke="#088F8F"
              strokeWidth={2}
              dot={{ r: compactView ? 1 : 2, fill: "#088F8F" }}
              activeDot={{ r: compactView ? 4 : 6 }}
            />
            <Line
              name={compactView ? "Benchmark" : benchmarkName}
              type="monotone"
              dataKey="benchmark"
              stroke="#A5D7E8"
              strokeWidth={2}
              dot={{ r: compactView ? 1 : 2, fill: "#A5D7E8" }}
              activeDot={{ r: compactView ? 4 : 6 }}
            />
            {categoryName && (
              <Line
                name="Category Avg"
                type="monotone"
                dataKey="category"
                stroke="#ACBCFF"
                strokeWidth={2}
                dot={{ r: compactView ? 1 : 2, fill: "#ACBCFF" }}
                activeDot={{ r: compactView ? 4 : 6 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className={`grid ${categoryName ? 'grid-cols-3' : 'grid-cols-2'} gap-2 mt-3 pt-3 border-t border-app-teal-100`}>
        <div>
          <p className="text-xs text-app-teal-600">{compactView ? "Fund" : fundName}</p>
          <p className={`${growth.fund >= 0 ? 'text-app-green' : 'text-app-red'} font-semibold ${compactView ? 'text-sm' : 'text-base'}`}>
            {growth.fund >= 0 ? '+' : ''}{growth.fund.toFixed(2)}%
          </p>
        </div>
        
        <div>
          <p className="text-xs text-app-teal-600">{compactView ? "Benchmark" : benchmarkName}</p>
          <p className={`${growth.benchmark >= 0 ? 'text-app-green' : 'text-app-red'} font-semibold ${compactView ? 'text-sm' : 'text-base'}`}>
            {growth.benchmark >= 0 ? '+' : ''}{growth.benchmark.toFixed(2)}%
          </p>
        </div>
        
        {categoryName && (
          <div>
            <p className="text-xs text-app-teal-600">Category Avg</p>
            <p className={`${growth.category >= 0 ? 'text-app-green' : 'text-app-red'} font-semibold ${compactView ? 'text-sm' : 'text-base'}`}>
              {growth.category >= 0 ? '+' : ''}{growth.category.toFixed(2)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FundPerfChart;
