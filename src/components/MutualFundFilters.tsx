
import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { 
  SlidersHorizontal, 
  X, 
  ChevronDown, 
  Star,
  ArrowDownUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterOption {
  id: string;
  label: string;
  checked?: boolean;
}

interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
}

interface MutualFundFiltersProps {
  sortOptions: FilterOption[];
  selectedSort: string;
  onSortChange: (value: string) => void;
  categories: FilterSection;
  riskLevels: FilterSection;
  ratings: FilterSection;
  fundHouses: FilterOption[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (category: string, value: string, checked: boolean) => void;
  totalFunds: number;
  onClearAll: () => void;
  onApplyFilters: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const MutualFundFilters: React.FC<MutualFundFiltersProps> = ({
  sortOptions,
  selectedSort,
  onSortChange,
  categories,
  riskLevels,
  ratings,
  fundHouses,
  selectedFilters,
  onFilterChange,
  totalFunds,
  onClearAll,
  onApplyFilters,
  isOpen,
  onOpenChange
}) => {
  const [searchFundHouse, setSearchFundHouse] = React.useState('');
  const [activeSection, setActiveSection] = React.useState<string>('sort');
  
  const filteredFundHouses = fundHouses.filter(house => 
    house.label.toLowerCase().includes(searchFundHouse.toLowerCase())
  );
  
  const renderFilterContent = () => {
    switch (activeSection) {
      case 'sort':
        return (
          <RadioGroup value={selectedSort} onValueChange={onSortChange} className="space-y-2">
            {sortOptions.map(option => (
              <div key={option.id} className="flex items-center space-x-2 py-3 border-b border-gray-100">
                <RadioGroupItem 
                  value={option.id} 
                  id={`sort-${option.id}`}
                  className="border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <label htmlFor={`sort-${option.id}`} className="font-medium">{option.label}</label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case 'categories':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg mb-2">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Index Funds only</span>
                <Toggle variant="outline" className="data-[state=on]:bg-green-500 data-[state=on]:text-white border border-gray-300 rounded-full h-6 w-12">
                </Toggle>
              </div>
            </div>
            
            {categories.options.map((option) => (
              <div key={option.id} className="flex items-center py-3 border-b border-gray-100 justify-between">
                <label htmlFor={`category-${option.id}`} className="font-medium">{option.label}</label>
                <div className="flex items-center">
                  <Checkbox 
                    id={`category-${option.id}`} 
                    checked={selectedFilters['categories']?.includes(option.id)} 
                    onCheckedChange={(checked) => onFilterChange('categories', option.id, !!checked)}
                    className="border-gray-400 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <ChevronDown size={16} className="ml-6 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        );
        
      case 'risk':
        return (
          <div className="space-y-2">
            {riskLevels.options.map((option) => (
              <div key={option.id} className="flex items-center py-3 border-b border-gray-100 justify-between">
                <label htmlFor={`risk-${option.id}`} className="font-medium">{option.label}</label>
                <Checkbox 
                  id={`risk-${option.id}`} 
                  checked={selectedFilters['risk']?.includes(option.id)} 
                  onCheckedChange={(checked) => onFilterChange('risk', option.id, !!checked)}
                  className="border-gray-400 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
              </div>
            ))}
          </div>
        );
        
      case 'ratings':
        return (
          <div className="space-y-2">
            {ratings.options.map((option) => (
              <div key={option.id} className="flex items-center py-3 border-b border-gray-100 justify-between">
                <label htmlFor={`rating-${option.id}`} className="font-medium flex items-center">
                  {option.label} {option.id !== '1' && <Star size={16} className="ml-1 text-yellow-500" fill="currentColor" />}
                </label>
                <Checkbox 
                  id={`rating-${option.id}`} 
                  checked={selectedFilters['ratings']?.includes(option.id)} 
                  onCheckedChange={(checked) => onFilterChange('ratings', option.id, !!checked)}
                  className="border-gray-400 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
              </div>
            ))}
          </div>
        );
        
      case 'fundHouse':
        return (
          <div className="space-y-4">
            <Input
              placeholder="Search fund house"
              value={searchFundHouse}
              onChange={(e) => setSearchFundHouse(e.target.value)}
              className="border-gray-300"
            />
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredFundHouses.map((house) => (
                <div key={house.id} className="flex items-center py-3 border-b border-gray-100 justify-between">
                  <label htmlFor={`house-${house.id}`} className="font-medium">{house.label}</label>
                  <Checkbox 
                    id={`house-${house.id}`} 
                    checked={selectedFilters['fundHouse']?.includes(house.id)} 
                    onCheckedChange={(checked) => onFilterChange('fundHouse', house.id, !!checked)}
                    className="border-gray-400 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
          <SlidersHorizontal size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <button onClick={() => onOpenChange(false)}>
              <X size={24} />
            </button>
            <SheetTitle className="text-lg font-bold">Filters</SheetTitle>
            <button onClick={onClearAll} className="text-gray-400 text-sm">
              Clear all
            </button>
          </div>
          
          <div className="flex h-full">
            {/* Left sidebar */}
            <div className="w-1/3 border-r border-gray-200">
              {[
                { id: 'sort', label: 'Sort by' },
                { id: 'categories', label: 'Categories' },
                { id: 'risk', label: 'Risk' },
                { id: 'ratings', label: 'Ratings' },
                { id: 'fundHouse', label: 'Fund House' }
              ].map((section) => (
                <div 
                  key={section.id} 
                  className={`p-4 border-b border-gray-200 ${
                    activeSection === section.id ? 'bg-white border-l-4 border-l-green-500' : ''
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.label}
                </div>
              ))}
            </div>
            
            {/* Right content */}
            <div className="w-2/3 p-4 overflow-y-auto">
              {renderFilterContent()}
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <Button 
              className="w-full bg-green-500 hover:bg-green-600 text-white py-6 rounded-lg text-base"
              onClick={() => {
                onApplyFilters();
                onOpenChange(false);
              }}
            >
              View {totalFunds} funds
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MutualFundFilters;
