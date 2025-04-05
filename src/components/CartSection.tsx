
import React from 'react';
import { ShoppingCart, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CartSectionProps {
  itemCount: number;
}

const CartSection: React.FC<CartSectionProps> = ({ itemCount }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-white border border-app-teal-200 rounded-lg p-4 flex justify-between items-center mb-6 cursor-pointer hover:bg-app-teal-50 transition-colors shadow-sm"
      onClick={() => navigate('/invest/cart')}
    >
      <div className="flex items-center">
        <div className="relative">
          <ShoppingCart size={20} className="text-app-teal-600 mr-2" />
          {itemCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-app-teal-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {itemCount}
            </div>
          )}
        </div>
        <span className="font-medium text-app-teal-800">Cart</span>
      </div>
      <div className="flex items-center">
        <span className="text-app-teal-600 mr-1">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
        <ChevronRight size={18} className="text-app-teal-500" />
      </div>
    </div>
  );
};

export default CartSection;
