
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

interface Holding {
  name: string;
  value: number;
  percentage: number;
  color?: string;
}

interface FundHoldingsProps {
  stockHoldings: Holding[];
  sectorAllocation: Holding[];
  assetAllocation?: Holding[];
  showTabs?: boolean;
}

// Updated colors for pie chart with teal theme
const COLORS = [
  '#14b8a6', '#0f766e', '#99f6e4', '#5eead4', '#2dd4bf', 
  '#ccfbf1', '#0d9488', '#115e59', '#134e4a', '#042f2e'
];

const FundHoldings: React.FC<FundHoldingsProps> = ({ 
  stockHoldings, 
  sectorAllocation, 
  assetAllocation = [], 
  showTabs = true 
}) => {
  const [activeTab, setActiveTab] = useState<string>("stocks");
  
  const renderHoldingsList = (holdings: Holding[]) => (
    <div className="space-y-3 mt-5">
      {holdings.map((holding, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2.5" 
              style={{ backgroundColor: holding.color || COLORS[index % COLORS.length] }}
            ></div>
            <span className="text-sm text-gray-800">{holding.name}</span>
          </div>
          <div className="text-sm font-medium text-gray-900">{holding.percentage.toFixed(2)}%</div>
        </div>
      ))}
    </div>
  );
  
  const renderPieChart = (data: Holding[]) => (
    <div className="h-60 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            {COLORS.map((color, index) => (
              <linearGradient key={`gradient-${index}`} id={`colorGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={1} />
                <stop offset="100%" stopColor={color} stopOpacity={0.8} />
              </linearGradient>
            ))}
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            fill="#8884d8"
            dataKey="value"
            animationDuration={800}
            animationBegin={0}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || `url(#colorGradient-${index % COLORS.length})`}
                stroke="#fff"
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name, props) => [`${props.payload.percentage.toFixed(2)}%`, name]}
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              padding: '8px 12px', 
              border: '1px solid #eee',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
  
  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl">
      <div className="px-5 pt-4 pb-2">
        <h3 className="font-medium text-lg text-gray-900">Fund Holdings</h3>
      </div>
      <CardContent className="p-5">
        {showTabs ? (
          <Tabs defaultValue="stocks" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-3 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger 
                value="stocks"
                className={`rounded-md text-sm ${activeTab === 'stocks' ? 'bg-white shadow text-app-teal' : 'hover:text-gray-900'}`}
              >
                Top Stocks
              </TabsTrigger>
              <TabsTrigger 
                value="sectors"
                className={`rounded-md text-sm ${activeTab === 'sectors' ? 'bg-white shadow text-app-teal' : 'hover:text-gray-900'}`}
              >
                Sectors
              </TabsTrigger>
              {assetAllocation.length > 0 && (
                <TabsTrigger 
                  value="assets"
                  className={`rounded-md text-sm ${activeTab === 'assets' ? 'bg-white shadow text-app-teal' : 'hover:text-gray-900'}`}
                >
                  Asset Class
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="stocks">
              {renderPieChart(stockHoldings)}
              {renderHoldingsList(stockHoldings)}
            </TabsContent>
            
            <TabsContent value="sectors">
              {renderPieChart(sectorAllocation)}
              {renderHoldingsList(sectorAllocation)}
            </TabsContent>
            
            {assetAllocation.length > 0 && (
              <TabsContent value="assets">
                {renderPieChart(assetAllocation)}
                {renderHoldingsList(assetAllocation)}
              </TabsContent>
            )}
          </Tabs>
        ) : (
          <>
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3 text-gray-900">Top Stock Holdings</h4>
              {renderHoldingsList(stockHoldings.slice(0, 5))}
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-900">Sector Allocation</h4>
              {renderHoldingsList(sectorAllocation.slice(0, 5))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default FundHoldings;
