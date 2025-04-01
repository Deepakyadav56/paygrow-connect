
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';

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
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
      notation: compactView ? 'compact' : 'standard'
    }).format(value);
  };
  
  return (
    <Card className="shadow-sm border-none">
      <div className="px-4 pt-4 pb-2">
        <h3 className="font-medium">{title}</h3>
      </div>
      <CardContent>
        <div className={compactView ? "h-40" : "h-60"}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="label" 
                tickLine={false} 
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tickFormatter={formatCurrency} 
                width={50}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value as number), '']}
                labelFormatter={(label) => `Period: ${label}`}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line
                name="SIP Investment"
                type="monotone"
                dataKey="sipValue"
                stroke="#0066FF"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                name="Lump Sum Investment"
                type="monotone"
                dataKey="lumpSumValue"
                stroke="#00AA5B"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentComparisonChart;
