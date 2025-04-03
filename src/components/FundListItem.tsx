
import React from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FundListItemProps {
  id: string;
  name: string;
  logo: React.ReactNode | string;
  category: string;
  subCategory: string;
  rating?: number;
  returns: {
    value: string;
    period: string;
  };
}

const FundListItem: React.FC<FundListItemProps> = ({
  id,
  name,
  logo,
  category,
  subCategory,
  rating,
  returns
}) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="border-b border-gray-200 py-4 flex justify-between items-center"
      onClick={() => navigate(`/invest/fund/${id}`)}
    >
      <div className="flex items-center">
        <div className="w-10 h-10 mr-3 flex-shrink-0">
          {typeof logo === 'string' ? (
            <img src={logo} alt={name} className="w-full h-full object-contain" />
          ) : (
            logo
          )}
        </div>
        <div>
          <h3 className="font-medium mb-1">{name}</h3>
          <div className="flex items-center text-gray-500 text-sm">
            <span>
              {category} {subCategory}
            </span>
            {rating && (
              <>
                <span className="mx-1">•</span>
                <span className="flex items-center">
                  {rating} <Star size={14} className="ml-0.5 text-yellow-500" fill="currentColor" />
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-right">
        <div className="text-lg font-semibold">{returns.value}</div>
        <div className="text-sm text-gray-500">{returns.period}</div>
      </div>
    </div>
  );
};

export default FundListItem;
