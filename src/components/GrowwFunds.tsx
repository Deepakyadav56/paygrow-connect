
import React from 'react';
import { useNavigate } from 'react-router-dom';

type Fund = {
  id: string;
  name: string;
  logo: React.ReactNode | string;
  returns: {
    value: string;
    period: string;
  };
};

interface GrowwFundsProps {
  funds: Fund[];
  viewAllLink: string;
}

const GrowwFunds: React.FC<GrowwFundsProps> = ({ funds, viewAllLink }) => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Funds by Groww</h2>
        <button 
          onClick={() => navigate(viewAllLink)}
          className="text-green-500 font-semibold text-sm"
        >
          View all
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {funds.map((fund) => (
          <div 
            key={fund.id}
            className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col shadow-sm"
            onClick={() => navigate(`/invest/fund/${fund.id}`)}
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 mr-3 flex-shrink-0">
                {typeof fund.logo === 'string' ? (
                  <img src={fund.logo} alt={fund.name} className="w-full h-full object-contain" />
                ) : (
                  fund.logo
                )}
              </div>
              <h3 className="font-medium">{fund.name}</h3>
            </div>
            
            <div className="mt-auto">
              <div className="text-lg font-semibold">{fund.returns.value}</div>
              <div className="text-sm text-gray-500">{fund.returns.period}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrowwFunds;
