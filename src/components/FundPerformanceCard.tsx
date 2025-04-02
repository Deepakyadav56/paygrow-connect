
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Info, Calendar } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface ReturnPeriod {
  label: string;
  fundReturn: number;
  benchmarkReturn?: number;
  categoryReturn?: number;
}

interface FundPerformanceCardProps {
  returnPeriods: ReturnPeriod[];
  showBenchmark?: boolean;
  showCategory?: boolean;
  compactView?: boolean;
}

const FundPerformanceCard: React.FC<FundPerformanceCardProps> = ({
  returnPeriods,
  showBenchmark = true,
  showCategory = true,
  compactView = false
}) => {
  const [viewMode, setViewMode] = useState<'all' | 'table'>('all');
  
  const renderReturnValue = (value: number) => {
    const isPositive = value >= 0;
    
    return (
      <div className={`flex items-center ${isPositive ? 'text-app-green' : 'text-app-red'}`}>
        {isPositive ? (
          <ArrowUp size={14} className="mr-1" />
        ) : (
          <ArrowDown size={14} className="mr-1" />
        )}
        <span className="font-medium">{isPositive ? '+' : ''}{value.toFixed(2)}%</span>
      </div>
    );
  };
  
  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl">
      <div className="px-5 pt-4 pb-2 flex justify-between items-center">
        <h3 className="font-medium text-lg text-gray-900">Performance</h3>
        {!compactView && (
          <div className="flex space-x-1 bg-gray-100 p-0.5 rounded-lg">
            <Button 
              variant={viewMode === 'all' ? 'default' : 'ghost'} 
              className={`h-7 text-xs px-3 rounded-md ${viewMode === 'all' ? 'bg-white text-app-blue shadow-sm' : 'text-gray-600 hover:bg-transparent hover:text-gray-900'}`}
              onClick={() => setViewMode('all')}
            >
              All
            </Button>
            <Button 
              variant={viewMode === 'table' ? 'default' : 'ghost'} 
              className={`h-7 text-xs px-3 rounded-md ${viewMode === 'table' ? 'bg-white text-app-blue shadow-sm' : 'text-gray-600 hover:bg-transparent hover:text-gray-900'}`}
              onClick={() => setViewMode('table')}
            >
              Table
            </Button>
          </div>
        )}
      </div>
      <CardContent className="p-5">
        {compactView ? (
          <div className="flex justify-between">
            {returnPeriods.slice(0, 3).map((period, index) => (
              <div key={index} className="text-center bg-gray-50 px-4 py-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1.5">{period.label}</p>
                {renderReturnValue(period.fundReturn)}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            <div className="grid grid-cols-4 gap-4 pb-3 border-b border-gray-100">
              <div className="font-medium"></div>
              {returnPeriods.slice(0, 3).map((period, index) => (
                <div key={index} className="text-center font-medium text-sm">
                  {period.label}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-4 gap-4 items-center">
              <div className="flex items-center">
                <Calendar size={16} className="text-app-blue mr-2" />
                <span className="text-sm font-medium">Fund</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={14} className="ml-1 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Annualized returns of the fund</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {returnPeriods.slice(0, 3).map((period, index) => (
                <div key={index} className="text-center">
                  {renderReturnValue(period.fundReturn)}
                </div>
              ))}
            </div>
            
            {showBenchmark && viewMode === 'all' && (
              <div className="grid grid-cols-4 gap-4 items-center">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700">Benchmark</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info size={14} className="ml-1 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Index used for comparison (e.g. Nifty 50)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {returnPeriods.slice(0, 3).map((period, index) => (
                  <div key={index} className="text-center">
                    {period.benchmarkReturn !== undefined ? (
                      renderReturnValue(period.benchmarkReturn)
                    ) : (
                      <span className="text-gray-400 text-sm">N/A</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {showCategory && viewMode === 'all' && (
              <div className="grid grid-cols-4 gap-4 items-center">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700">Category</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info size={14} className="ml-1 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Average returns of funds in the same category</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {returnPeriods.slice(0, 3).map((period, index) => (
                  <div key={index} className="text-center">
                    {period.categoryReturn !== undefined ? (
                      renderReturnValue(period.categoryReturn)
                    ) : (
                      <span className="text-gray-400 text-sm">N/A</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {returnPeriods.length > 3 && viewMode === 'table' && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-4 gap-4 pb-3">
                  <div className="font-medium"></div>
                  {returnPeriods.slice(3).map((period, index) => (
                    <div key={index} className="text-center font-medium text-sm">
                      {period.label}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="text-sm font-medium text-gray-700">Fund</div>
                  {returnPeriods.slice(3).map((period, index) => (
                    <div key={index} className="text-center">
                      {renderReturnValue(period.fundReturn)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FundPerformanceCard;
