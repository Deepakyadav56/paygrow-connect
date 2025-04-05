
import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WatchlistSectionProps {
  itemCount?: number;
}

const WatchlistSection: React.FC<WatchlistSectionProps> = ({ itemCount = 0 }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-white border border-app-teal-200 rounded-lg p-4 flex justify-between items-center mb-6 cursor-pointer hover:bg-app-teal-50 transition-colors shadow-sm"
      onClick={() => navigate('/invest/watchlist')}
    >
      <div className="flex items-center">
        <div className="relative">
          <Star size={20} className="text-app-teal-600 mr-2" fill="currentColor" />
        </div>
        <span className="font-medium text-app-teal-800">Watchlist</span>
      </div>
      <div className="flex items-center">
        <span className="text-app-teal-600 mr-1">{itemCount} {itemCount === 1 ? 'fund' : 'funds'}</span>
        <ChevronRight size={18} className="text-app-teal-500" />
      </div>
    </div>
  );
};

export default WatchlistSection;
