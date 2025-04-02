
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ComparisonData {
  label: string;
  sipValue: number;
  lumpSumValue: number;
}

interface InvestmentComparisonChartProps {
  data: ComparisonData[];
  title?: string;
  compactView?: boolean;
}

const InvestmentComparisonChart: React.FC<InvestmentComparisonChartProps> = ({ 
  data, 
  title = "SIP vs Lump Sum Performance",
  compactView = false 
}) => {
  const [chartType, setChartType] = useState<'line' | 'area'>('area');
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
      notation: compactView ? 'compact' : 'standard'
    }).format(value);
  };
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
          <p className="font-medium text-sm mb-1.5">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p 
              key={`item-${index}`} 
              className="text-sm" 
              style={{ color: entry.color }}
            >
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl">
      <div className="px-5 pt-4 pb-2 flex justify-between items-center">
        <h3 className="font-medium text-gray-900">{title}</h3>
        {!compactView && (
          <div className="flex space-x-1 bg-gray-100 p-0.5 rounded-lg">
            <Button 
              variant={chartType === 'area' ? 'default' : 'ghost'} 
              className={`h-7 text-xs px-3 rounded-md ${chartType === 'area' ? 'bg-white text-app-blue shadow-sm' : 'text-gray-600 hover:bg-transparent hover:text-gray-900'}`}
              onClick={() => setChartType('area')}
            >
              Area
            </Button>
            <Button 
              variant={chartType === 'line' ? 'default' : 'ghost'} 
              className={`h-7 text-xs px-3 rounded-md ${chartType === 'line' ? 'bg-white text-app-blue shadow-sm' : 'text-gray-600 hover:bg-transparent hover:text-gray-900'}`}
              onClick={() => setChartType('line')}
            >
              Line
            </Button>
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <div className={compactView ? "h-48" : "h-64"}>
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 5,
                  left: 5,
                  bottom: 15,
                }}
              >
                <defs>
                  <linearGradient id="colorSip" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorLumpSum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00AA5B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00AA5B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="label" 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fontSize: 12, fill: '#888' }}
                  dy={10}
                />
                <YAxis 
                  tickFormatter={formatCurrency} 
                  width={50}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: '#888' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                  iconType="circle"
                  iconSize={8}
                />
                <Area
                  type="monotone"
                  dataKey="sipValue"
                  name="SIP Investment"
                  stroke="#0066FF"
                  fillOpacity={1}
                  fill="url(#colorSip)"
                  strokeWidth={2}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Area
                  type="monotone"
                  dataKey="lumpSumValue"
                  name="Lump Sum Investment"
                  stroke="#00AA5B"
                  fillOpacity={1}
                  fill="url(#colorLumpSum)"
                  strokeWidth={2}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            ) : (
              <LineChart
                data={data}
                margin={{
                  top: 10,
                  right: 5,
                  left: 5,
                  bottom: 15,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="label" 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fontSize: 12, fill: '#888' }}
                  dy={10}
                />
                <YAxis 
                  tickFormatter={formatCurrency} 
                  width={50}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: '#888' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                  iconType="circle"
                  iconSize={8}
                />
                <Line
                  name="SIP Investment"
                  type="monotone"
                  dataKey="sipValue"
                  stroke="#0066FF"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line
                  name="Lump Sum Investment"
                  type="monotone"
                  dataKey="lumpSumValue"
                  stroke="#00AA5B"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentComparisonChart;
