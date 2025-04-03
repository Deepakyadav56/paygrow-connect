
import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FundListItem from './FundListItem';

interface WatchlistProps {
  watchlistFunds: Array<{
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
  }>;
}

const WatchlistSection: React.FC<WatchlistProps> = ({ watchlistFunds }) => {
  const navigate = useNavigate();
  
  if (watchlistFunds.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 mb-6 text-center">
        <div className="flex justify-center mb-4">
          <Star size={40} className="text-yellow-500" fill="currentColor" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Your watchlist is empty</h3>
        <p className="text-gray-500 mb-4">Add mutual funds to your watchlist to track them easily</p>
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
          onClick={() => navigate('/invest/mutual-funds')}
        >
          Explore Funds
        </button>
      </div>
    );
  }
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Watchlist</h2>
        <button 
          className="flex items-center text-green-500"
          onClick={() => navigate('/invest/watchlist')}
        >
          View All <ChevronRight size={18} />
        </button>
      </div>
      
      <div className="bg-white rounded-lg overflow-hidden">
        {watchlistFunds.map(fund => (
          <FundListItem
            key={fund.id}
            id={fund.id}
            name={fund.name}
            logo={fund.logo}
            category={fund.category}
            subCategory={fund.subCategory}
            rating={fund.rating}
            returns={fund.returns}
          />
        ))}
      </div>
    </div>
  );
};

export default WatchlistSection;
