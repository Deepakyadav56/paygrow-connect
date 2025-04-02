
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
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
      <div className="bg-white p-3 shadow-md rounded-lg border border-gray-200">
        <p className="font-medium text-sm">{label}</p>
        <p className="text-app-blue">
          Fund: ₹{payload[0].value.toLocaleString('en-IN')}
        </p>
        <p className="text-gray-600">
          Benchmark: ₹{payload[1].value.toLocaleString('en-IN')}
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
  return (
    <div className={fullView ? "h-80" : "h-60"}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#888' }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#888' }} 
            width={40}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#0066FF" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0 }}
            name={fundName}
          />
          <Line 
            type="monotone" 
            dataKey="benchmark" 
            stroke="#888" 
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0 }}
            name={benchmarkName}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FundPerfChart;
