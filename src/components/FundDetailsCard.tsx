
import React from 'react';
import { Info, AlertTriangle, Percent, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FundDetailsCardProps {
  nav: number;
  aum?: number;
  expenseRatio: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  fundCategory: string;
  fundType: string;
  exitLoad?: string;
  lockInPeriod?: string;
  minSipAmount?: number;
  minLumpSumAmount?: number;
  fundManager?: string;
  launchDate?: string;
  benchmark?: string;
  compactView?: boolean;
}

const FundDetailsCard: React.FC<FundDetailsCardProps> = ({
  nav,
  aum,
  expenseRatio,
  riskLevel,
  fundCategory,
  fundType,
  exitLoad = 'None',
  lockInPeriod = 'None',
  minSipAmount = 500,
  minLumpSumAmount = 5000,
  fundManager,
  launchDate,
  benchmark,
  compactView = false
}) => {
  const renderRiskIndicator = (risk: 'Low' | 'Moderate' | 'High') => {
    const getColor = () => {
      switch (risk) {
        case 'Low':
          return 'bg-green-500';
        case 'Moderate':
          return 'bg-yellow-500';
        case 'High':
          return 'bg-red-500';
        default:
          return 'bg-gray-500';
      }
    };
    
    return (
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full ${getColor()} mr-2`}></div>
        <span>{risk}</span>
      </div>
    );
  };

  // Format large numbers in a readable way
  const formatNumber = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    } else {
      return `₹${value.toLocaleString('en-IN')}`;
    }
  };

  return (
    <Card className="shadow-sm border-none">
      <div className="px-4 pt-4 pb-2">
        <h3 className="font-medium">Fund Information</h3>
      </div>
      <CardContent>
        {compactView ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">NAV</p>
              <p className="font-medium">₹{nav.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-medium">{fundCategory}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Risk Level</p>
              {renderRiskIndicator(riskLevel)}
            </div>
            <div>
              <p className="text-sm text-gray-500">Expense Ratio</p>
              <p className="font-medium">{expenseRatio}%</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-4">
              <div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-500 mr-1">NAV</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info size={14} className="text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Net Asset Value per unit</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="font-medium">₹{nav.toFixed(2)}</p>
              </div>
              {aum && (
                <div>
                  <div className="flex items-center">
                    <p className="text-sm text-gray-500 mr-1">AUM</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info size={14} className="text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Assets Under Management</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="font-medium">{formatNumber(aum)}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{fundCategory}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fund Type</p>
                <p className="font-medium">{fundType}</p>
              </div>
              <div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-500 mr-1">Risk Level</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertTriangle size={14} className="text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Risk assessment based on historical volatility</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {renderRiskIndicator(riskLevel)}
              </div>
              <div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-500 mr-1">Expense Ratio</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Percent size={14} className="text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Annual fund management fee</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="font-medium">{expenseRatio}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Exit Load</p>
                <p className="font-medium">{exitLoad}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Lock-in Period</p>
                <p className="font-medium">{lockInPeriod}</p>
              </div>
            </div>
            
            {(minSipAmount || minLumpSumAmount) && (
              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 mt-4">
                <div>
                  <p className="text-sm text-gray-500">Min. SIP Amount</p>
                  <p className="font-medium">₹{minSipAmount?.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Min. Lump Sum</p>
                  <p className="font-medium">₹{minLumpSumAmount?.toLocaleString('en-IN')}</p>
                </div>
              </div>
            )}
            
            {(fundManager || launchDate || benchmark) && (
              <div className="border-t border-gray-100 pt-4 mt-4">
                {fundManager && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-500">Fund Manager</p>
                    <p className="font-medium">{fundManager}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  {launchDate && (
                    <div>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-500 mr-1">Launch Date</p>
                        <Calendar size={14} className="text-gray-400" />
                      </div>
                      <p className="font-medium">{launchDate}</p>
                    </div>
                  )}
                  
                  {benchmark && (
                    <div>
                      <p className="text-sm text-gray-500">Benchmark</p>
                      <p className="font-medium">{benchmark}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FundDetailsCard;
