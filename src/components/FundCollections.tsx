
import React from 'react';
import { useNavigate } from 'react-router-dom';

type Collection = {
  id: string;
  name: string;
  icon: React.ReactNode | string;
};

interface FundCollectionsProps {
  collections: Collection[];
  viewAllLink?: string;
}

const FundCollections: React.FC<FundCollectionsProps> = ({ collections, viewAllLink }) => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Collections</h2>
        {viewAllLink && (
          <button 
            onClick={() => navigate(viewAllLink)}
            className="text-green-500 font-semibold text-sm"
          >
            View all
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {collections.map((collection) => (
          <div 
            key={collection.id}
            className="flex flex-col items-center justify-center bg-white rounded-lg p-3 border border-gray-100"
            onClick={() => navigate(`/invest/collections/${collection.id}`)}
          >
            <div className="w-12 h-12 mb-2">
              {typeof collection.icon === 'string' ? (
                <img src={collection.icon} alt={collection.name} className="w-full h-full object-contain" />
              ) : (
                collection.icon
              )}
            </div>
            <span className="text-sm text-center font-medium">{collection.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundCollections;
