
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

// Default colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B', '#6BD4FF', '#8DD1E1', '#A4DE6C', '#D0ED57'];

const FundHoldings: React.FC<FundHoldingsProps> = ({ 
  stockHoldings, 
  sectorAllocation, 
  assetAllocation = [], 
  showTabs = true 
}) => {
  const [activeTab, setActiveTab] = useState<string>("stocks");
  
  const renderHoldingsList = (holdings: Holding[]) => (
    <div className="space-y-3 mt-4">
      {holdings.map((holding, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: holding.color || COLORS[index % COLORS.length] }}
            ></div>
            <span className="text-sm">{holding.name}</span>
          </div>
          <div className="text-sm font-medium">{holding.percentage.toFixed(2)}%</div>
        </div>
      ))}
    </div>
  );
  
  const renderPieChart = (data: Holding[]) => (
    <div className="h-52 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name, props) => [`${props.payload.percentage.toFixed(2)}%`, name]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
  
  return (
    <Card className="shadow-sm border-none">
      <div className="px-4 pt-4 pb-2">
        <h3 className="font-medium">Fund Holdings</h3>
      </div>
      <CardContent>
        {showTabs ? (
          <Tabs defaultValue="stocks" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-2">
              <TabsTrigger value="stocks">Top Stocks</TabsTrigger>
              <TabsTrigger value="sectors">Sectors</TabsTrigger>
              {assetAllocation.length > 0 && (
                <TabsTrigger value="assets">Asset Class</TabsTrigger>
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
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Top Stock Holdings</h4>
              {renderHoldingsList(stockHoldings.slice(0, 5))}
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Sector Allocation</h4>
              {renderHoldingsList(sectorAllocation.slice(0, 5))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default FundHoldings;
