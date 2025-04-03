
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

type Fund = {
  id: string;
  name: string;
  logo: React.ReactNode | string;
  category: string;
  subCategory: string;
  rating: number;
  returns: {
    value: string;
    period: string;
  };
};

interface PopularFundsProps {
  funds: Fund[];
  viewAllLink: string;
}

const PopularFunds: React.FC<PopularFundsProps> = ({ funds, viewAllLink }) => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Popular Funds</h2>
        <button 
          onClick={() => navigate(viewAllLink)}
          className="text-green-500 font-semibold text-sm"
        >
          All Mutual Funds
        </button>
      </div>
      
      <div className="space-y-4">
        {funds.map((fund) => (
          <div 
            key={fund.id}
            className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center shadow-sm"
            onClick={() => navigate(`/invest/fund/${fund.id}`)}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 mr-3 flex-shrink-0">
                {typeof fund.logo === 'string' ? (
                  <img src={fund.logo} alt={fund.name} className="w-full h-full object-contain" />
                ) : (
                  fund.logo
                )}
              </div>
              <div>
                <h3 className="font-medium mb-1">{fund.name}</h3>
                <div className="flex items-center text-gray-600 text-sm">
                  <span>{fund.category} {fund.subCategory}</span>
                  {fund.rating > 0 && (
                    <>
                      <span className="mx-1">•</span>
                      <span className="flex items-center">
                        {fund.rating} <Star size={14} className="ml-0.5 text-yellow-500" fill="currentColor" />
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-semibold">{fund.returns.value}</div>
              <div className="text-sm text-gray-500">{fund.returns.period}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularFunds;
