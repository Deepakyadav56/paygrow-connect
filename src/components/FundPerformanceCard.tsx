
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    <Card className="shadow-sm border-none">
      <div className="px-4 pt-4 pb-2">
        <h3 className="font-medium">Performance</h3>
      </div>
      <CardContent>
        {compactView ? (
          <div className="flex justify-between">
            {returnPeriods.slice(0, 3).map((period, index) => (
              <div key={index} className="text-center">
                <p className="text-xs text-gray-500 mb-1">{period.label}</p>
                {renderReturnValue(period.fundReturn)}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
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
            
            {showBenchmark && (
              <div className="grid grid-cols-4 gap-4 items-center">
                <div className="flex items-center">
                  <span className="text-sm font-medium">Benchmark</span>
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
                      <span className="text-gray-400">N/A</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {showCategory && (
              <div className="grid grid-cols-4 gap-4 items-center">
                <div className="flex items-center">
                  <span className="text-sm font-medium">Category</span>
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
                      <span className="text-gray-400">N/A</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {returnPeriods.length > 3 && (
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
                  <div className="text-sm font-medium">Fund</div>
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
