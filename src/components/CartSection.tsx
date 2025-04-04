
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
      className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center mb-6 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => navigate('/invest/cart')}
    >
      <div className="flex items-center">
        <div className="relative">
          <ShoppingCart size={20} className="text-green-500 mr-2" />
          {itemCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {itemCount}
            </div>
          )}
        </div>
        <span className="font-medium">Cart</span>
      </div>
      <div className="flex items-center">
        <span className="text-gray-500 mr-1">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
        <ChevronRight size={18} className="text-gray-400" />
      </div>
    </div>
  );
};

export default CartSection;
