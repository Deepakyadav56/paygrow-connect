
import React from 'react';
import { X } from 'lucide-react';

interface FilterChip {
  id: string;
  label: string;
  category: string;
}

interface FilterChipsProps {
  filters: FilterChip[];
  onRemove: (id: string, category: string) => void;
  onClearAll: () => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ filters, onRemove, onClearAll }) => {
  if (filters.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map((filter) => (
        <div 
          key={`${filter.category}-${filter.id}`}
          className="bg-white border border-gray-200 rounded-full px-3 py-1 flex items-center text-sm"
        >
          <span>{filter.label}</span>
          <button 
            className="ml-1" 
            onClick={() => onRemove(filter.id, filter.category)}
          >
            <X size={14} />
          </button>
        </div>
      ))}
      
      {filters.length > 1 && (
        <button 
          className="text-gray-400 text-sm px-2"
          onClick={onClearAll}
        >
          Clear all
        </button>
      )}
    </div>
  );
};

export default FilterChips;
