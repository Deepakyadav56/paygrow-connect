
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Jan', fund: 1000, benchmark: 980 },
  { date: 'Feb', fund: 1020, benchmark: 990 },
  { date: 'Mar', fund: 1050, benchmark: 1010 },
  { date: 'Apr', fund: 1030, benchmark: 1000 },
  { date: 'May', fund: 1070, benchmark: 1030 },
  { date: 'Jun', fund: 1100, benchmark: 1050 },
  { date: 'Jul', fund: 1150, benchmark: 1090 },
  { date: 'Aug', fund: 1130, benchmark: 1070 },
  { date: 'Sep', fund: 1180, benchmark: 1100 },
  { date: 'Oct', fund: 1200, benchmark: 1110 },
  { date: 'Nov', fund: 1220, benchmark: 1130 },
  { date: 'Dec', fund: 1250, benchmark: 1150 },
];

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

const FundPerfChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis 
          dataKey="date" 
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
          dataKey="fund" 
          stroke="#0066FF" 
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
        <Line 
          type="monotone" 
          dataKey="benchmark" 
          stroke="#888" 
          strokeWidth={1.5}
          dot={false}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default FundPerfChart;
