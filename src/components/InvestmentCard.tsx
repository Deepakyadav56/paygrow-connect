
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface InvestmentCardProps {
  name: string;
  category: string;
  value: number;
  change: number;
  changePercentage: number;
  oneYearReturn?: number;
  threeYearReturn?: number;
  fiveYearReturn?: number;
  highlighted?: boolean;
  onClick?: () => void;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({
  name,
  category,
  value,
  change,
  changePercentage,
  oneYearReturn,
  threeYearReturn,
  fiveYearReturn,
  highlighted = false,
  onClick
}) => {
  const isPositive = change >= 0;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const formatPercentage = (percentage: number) => {
    return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  return (
    <div 
      className={`${highlighted ? 'card-investment-highlight' : 'card-investment'} ${onClick ? 'cursor-pointer hover:shadow-md' : ''} transition-all duration-200 w-full`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-900">{name}</h3>
          <p className="text-xs text-gray-500">{category}</p>
        </div>
        {isPositive ? (
          <div className="badge badge-success flex items-center">
            <TrendingUp size={12} className="mr-1" />
            {formatPercentage(changePercentage)}
          </div>
        ) : (
          <div className="badge badge-danger flex items-center">
            <TrendingDown size={12} className="mr-1" />
            {formatPercentage(changePercentage)}
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg font-semibold">{formatCurrency(value)}</div>
        <div className={`text-sm ${isPositive ? 'text-app-green' : 'text-app-red'}`}>
          {isPositive ? '+' : ''}{formatCurrency(change)}
        </div>
      </div>
      
      {(oneYearReturn !== undefined || threeYearReturn !== undefined || fiveYearReturn !== undefined) && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between text-xs">
            {oneYearReturn !== undefined && (
              <div>
                <div className="text-gray-500">1Y</div>
                <div className={oneYearReturn >= 0 ? 'text-app-green' : 'text-app-red'}>
                  {formatPercentage(oneYearReturn)}
                </div>
              </div>
            )}
            
            {threeYearReturn !== undefined && (
              <div>
                <div className="text-gray-500">3Y</div>
                <div className={threeYearReturn >= 0 ? 'text-app-green' : 'text-app-red'}>
                  {formatPercentage(threeYearReturn)}
                </div>
              </div>
            )}
            
            {fiveYearReturn !== undefined && (
              <div>
                <div className="text-gray-500">5Y</div>
                <div className={fiveYearReturn >= 0 ? 'text-app-green' : 'text-app-red'}>
                  {formatPercentage(fiveYearReturn)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentCard;
