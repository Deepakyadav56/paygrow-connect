
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

// Mock data for cart items
const mockCartItems = [
  { 
    id: 'motilal-midcap', 
    name: 'Motilal Oswal Midcap Fund', 
    logo: <div className="w-full h-full bg-yellow-500 rounded"></div>, 
    category: 'Equity - Mid Cap',
    amount: 5000,
    minAmount: 500,
    type: 'One-time'
  },
  { 
    id: 'hdfc-flexi', 
    name: 'HDFC Flexi Cap Fund', 
    logo: <div className="w-full h-full bg-red-500 rounded"></div>, 
    category: 'Equity - Flexi Cap',
    amount: 1000,
    minAmount: 100,
    type: 'SIP'
  }
];

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [selectedItems, setSelectedItems] = useState<string[]>(mockCartItems.map(item => item.id));
  
  const totalSelectedAmount = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.amount, 0);
  
  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.id));
    }
  };
  
  const handleSelectItem = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };
  
  const handleRemoveItem = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    setSelectedItems(selectedItems.filter(id => id !== itemId));
  };
  
  const handleContinue = () => {
    navigate('/invest/confirm');
  };
  
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <Header title="Cart" showBackButton />
      
      <div className="p-4">
        {cartItems.length > 0 ? (
          <>
            {/* Select all */}
            <div className="bg-white rounded-lg mb-4 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox 
                  id="select-all" 
                  checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                  onCheckedChange={handleSelectAll}
                  className="mr-3 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <label htmlFor="select-all" className="font-medium">Select All</label>
              </div>
              <div>
                {selectedItems.length} of {cartItems.length} selected
              </div>
            </div>
            
            {/* Cart items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                  {/* Item header */}
                  <div className="p-4 border-b border-gray-100 flex items-center">
                    <Checkbox 
                      id={`item-${item.id}`} 
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => handleSelectItem(item.id)}
                      className="mr-3 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <div className="flex items-center flex-1">
                      <div className="w-10 h-10 mr-3 flex-shrink-0">
                        {typeof item.logo === 'string' ? (
                          <img src={item.logo} alt={item.name} className="w-full h-full object-contain" />
                        ) : (
                          item.logo
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                    </div>
                    <button 
                      className="ml-2 text-gray-400 hover:text-red-500"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  {/* Item details */}
                  <div className="p-4">
                    <div className="flex justify-between mb-2">
                      <div className="text-gray-500">Investment Type</div>
                      <div className="font-medium">{item.type}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-gray-500">Amount</div>
                      <div className="font-medium">₹{item.amount.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Checkout */}
            <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="text-gray-500">Total Amount</div>
                <div className="text-xl font-semibold">₹{totalSelectedAmount.toLocaleString()}</div>
              </div>
              <Button 
                className="w-full bg-green-500 hover:bg-green-600 text-white py-6 rounded-lg text-base"
                disabled={selectedItems.length === 0}
                onClick={handleContinue}
              >
                Continue <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingCart size={32} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add mutual funds to your cart to invest</p>
            <Button 
              className="bg-green-500 hover:bg-green-600"
              onClick={() => navigate('/invest/mutual-funds')}
            >
              Explore Funds
            </Button>
          </div>
        )}
      </div>
      
      <BottomNav activeTab="invest" />
    </div>
  );
};

export default CartPage;
