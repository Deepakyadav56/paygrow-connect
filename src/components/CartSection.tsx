
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
      className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center mb-6"
      onClick={() => navigate('/invest/cart')}
    >
      <div className="flex items-center">
        <ShoppingCart size={20} className="text-green-500 mr-2" />
        <span className="font-medium">Cart</span>
      </div>
      <div className="flex items-center">
        <span className="text-gray-500 mr-1">{itemCount}</span>
        <ChevronRight size={18} className="text-gray-400" />
      </div>
    </div>
  );
};

export default CartSection;
