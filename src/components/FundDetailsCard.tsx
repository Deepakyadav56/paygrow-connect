
import React from 'react';
import { Info, AlertTriangle, Percent, Calendar, Award, BarChart2, Clock } from 'lucide-react';
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
    const getConfig = () => {
      switch (risk) {
        case 'Low':
          return { color: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50' };
        case 'Moderate':
          return { color: 'bg-yellow-500', text: 'text-yellow-700', bg: 'bg-yellow-50' };
        case 'High':
          return { color: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50' };
        default:
          return { color: 'bg-gray-500', text: 'text-gray-700', bg: 'bg-gray-50' };
      }
    };
    
    const config = getConfig();
    
    return (
      <div className={`inline-flex items-center px-2.5 py-1 rounded-full ${config.bg} ${config.text} text-xs font-medium`}>
        <div className={`w-2 h-2 rounded-full ${config.color} mr-1.5`}></div>
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
    <Card className="shadow-sm border border-gray-100 rounded-xl">
      <div className="px-5 pt-4 pb-2">
        <h3 className="font-medium text-lg text-gray-900">Fund Information</h3>
      </div>
      <CardContent className="p-5">
        {compactView ? (
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">NAV</p>
              <p className="font-semibold text-gray-900">₹{nav.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Category</p>
              <p className="font-semibold text-gray-900">{fundCategory}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Risk Level</p>
              {renderRiskIndicator(riskLevel)}
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Expense Ratio</p>
              <p className="font-semibold text-gray-900">{expenseRatio}%</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-gray-50 p-3.5 rounded-lg">
                <div className="flex items-center">
                  <BarChart2 size={16} className="text-app-blue mr-2" />
                  <p className="text-sm text-gray-700 mr-1">NAV</p>
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
                <p className="font-semibold text-gray-900 mt-1.5">₹{nav.toFixed(2)}</p>
              </div>
              {aum && (
                <div className="bg-gray-50 p-3.5 rounded-lg">
                  <div className="flex items-center">
                    <Award size={16} className="text-app-purple mr-2" />
                    <p className="text-sm text-gray-700 mr-1">AUM</p>
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
                  <p className="font-semibold text-gray-900 mt-1.5">{formatNumber(aum)}</p>
                </div>
              )}
              <div className="bg-gray-50 p-3.5 rounded-lg">
                <p className="text-sm text-gray-700">Category</p>
                <p className="font-semibold text-gray-900 mt-1.5">{fundCategory}</p>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-lg">
                <p className="text-sm text-gray-700">Fund Type</p>
                <p className="font-semibold text-gray-900 mt-1.5">{fundType}</p>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle size={16} className="text-app-orange mr-2" />
                  <p className="text-sm text-gray-700 mr-1">Risk Level</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info size={14} className="text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Risk assessment based on historical volatility</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="mt-1.5">{renderRiskIndicator(riskLevel)}</div>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-lg">
                <div className="flex items-center">
                  <Percent size={16} className="text-app-green mr-2" />
                  <p className="text-sm text-gray-700 mr-1">Expense Ratio</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info size={14} className="text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Annual fund management fee</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="font-semibold text-gray-900 mt-1.5">{expenseRatio}%</p>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-lg">
                <p className="text-sm text-gray-700">Exit Load</p>
                <p className="font-semibold text-gray-900 mt-1.5">{exitLoad}</p>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-lg">
                <div className="flex items-center">
                  <Clock size={16} className="text-app-red mr-2" />
                  <p className="text-sm text-gray-700">Lock-in Period</p>
                </div>
                <p className="font-semibold text-gray-900 mt-1.5">{lockInPeriod}</p>
              </div>
            </div>
            
            {(minSipAmount || minLumpSumAmount) && (
              <div className="grid grid-cols-2 gap-5 border-t border-gray-100 pt-5">
                <div className="bg-gray-50 p-3.5 rounded-lg">
                  <p className="text-sm text-gray-700">Min. SIP Amount</p>
                  <p className="font-semibold text-gray-900 mt-1.5">₹{minSipAmount?.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-gray-50 p-3.5 rounded-lg">
                  <p className="text-sm text-gray-700">Min. Lump Sum</p>
                  <p className="font-semibold text-gray-900 mt-1.5">₹{minLumpSumAmount?.toLocaleString('en-IN')}</p>
                </div>
              </div>
            )}
            
            {(fundManager || launchDate || benchmark) && (
              <div className="border-t border-gray-100 pt-5">
                {fundManager && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-700">Fund Manager</p>
                    <p className="font-semibold text-gray-900 mt-1">{fundManager}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-5">
                  {launchDate && (
                    <div className="bg-gray-50 p-3.5 rounded-lg">
                      <div className="flex items-center">
                        <Calendar size={16} className="text-app-blue mr-2" />
                        <p className="text-sm text-gray-700">Launch Date</p>
                      </div>
                      <p className="font-semibold text-gray-900 mt-1.5">{launchDate}</p>
                    </div>
                  )}
                  
                  {benchmark && (
                    <div className="bg-gray-50 p-3.5 rounded-lg">
                      <p className="text-sm text-gray-700">Benchmark</p>
                      <p className="font-semibold text-gray-900 mt-1.5">{benchmark}</p>
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
