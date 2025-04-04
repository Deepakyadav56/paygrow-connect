import React, { useState } from 'react';
import { X, Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import FundComparisonTable from '@/components/FundComparisonTable';

// Mock data for funds
const availableFunds = [
  { 
    id: 'motilal-midcap', 
    name: 'Motilal Oswal Midcap Fund', 
    logo: <div className="w-full h-full bg-yellow-500 rounded"></div>, 
    category: 'Equity - Mid Cap',
    aum: '₹2,560 Cr',
    expense: '0.63%',
    returns: {
      oneYear: '19.82%',
      threeYear: '28.82%',
      fiveYear: '15.62%'
    },
    risk: 'Very High',
    rating: 5,
    minInvestment: '₹500',
    exitLoad: '1% for redemption within 15 days',
    taxImplications: 'STCG: Income Tax Slab, LTCG: 10% above ₹1L'
  },
  { 
    id: 'sbi-psu', 
    name: 'SBI PSU Fund', 
    logo: <div className="w-full h-full bg-blue-500 rounded"></div>, 
    category: 'Equity - Thematic',
    aum: '₹1,824 Cr',
    expense: '0.88%',
    returns: {
      oneYear: '21.51%',
      threeYear: '31.31%',
      fiveYear: '17.23%'
    },
    risk: 'High',
    rating: 4,
    minInvestment: '₹500',
    exitLoad: '1% for redemption within 30 days',
    taxImplications: 'STCG: Income Tax Slab, LTCG: 10% above ₹1L'
  },
  { 
    id: 'parag-parikh', 
    name: 'Parag Parikh Flexi Cap Fund', 
    logo: <div className="w-full h-full bg-green-500 rounded"></div>, 
    category: 'Equity - Flexi Cap',
    aum: '₹37,248 Cr',
    expense: '0.54%',
    returns: {
      oneYear: '15.38%',
      threeYear: '17.12%',
      fiveYear: '16.90%'
    },
    risk: 'Moderately High',
    rating: 5,
    minInvestment: '₹1,000',
    exitLoad: '2% for redemption within 365 days, 1% for redemption within 366-730 days',
    taxImplications: 'STCG: Income Tax Slab, LTCG: 10% above ₹1L'
  },
  { 
    id: 'hdfc-flexi', 
    name: 'HDFC Flexi Cap Fund', 
    logo: <div className="w-full h-full bg-red-500 rounded"></div>, 
    category: 'Equity - Flexi Cap',
    aum: '₹45,368 Cr',
    expense: '0.52%',
    returns: {
      oneYear: '17.58%',
      threeYear: '22.07%',
      fiveYear: '13.32%'
    },
    risk: 'Moderately High',
    rating: 5,
    minInvestment: '₹100',
    exitLoad: '1% for redemption within 1 year',
    taxImplications: 'STCG: Income Tax Slab, LTCG: 10% above ₹1L'
  },
  { 
    id: 'quant-small', 
    name: 'Quant Small Cap Fund', 
    logo: <div className="w-full h-full bg-gray-500 rounded"></div>, 
    category: 'Equity - Small Cap',
    aum: '₹5,420 Cr',
    expense: '0.62%',
    returns: {
      oneYear: '12.25%',
      threeYear: '20.82%',
      fiveYear: '18.32%'
    },
    risk: 'Very High',
    rating: 5,
    minInvestment: '₹500',
    exitLoad: '1% for redemption within 30 days',
    taxImplications: 'STCG: Income Tax Slab, LTCG: 10% above ₹1L'
  }
];

const FundComparePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFunds, setSelectedFunds] = useState([availableFunds[0], availableFunds[2]]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddFund, setShowAddFund] = useState(false);
  
  const MAX_FUNDS = 3;
  
  const filteredFunds = availableFunds.filter(
    fund => 
      fund.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
      !selectedFunds.some(selected => selected.id === fund.id)
  );
  
  const addFund = (fund: any) => {
    if (selectedFunds.length < MAX_FUNDS) {
      setSelectedFunds([...selectedFunds, fund]);
      setShowAddFund(false);
      setSearchQuery('');
    }
  };
  
  const removeFund = (fundId: string) => {
    setSelectedFunds(selectedFunds.filter(fund => fund.id !== fundId));
  };
  
  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <Header title="Compare Funds" showBack />
      
      <div className="p-4">
        {/* Selected funds */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Selected Funds</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedFunds.map(fund => (
              <div 
                key={fund.id} 
                className="flex items-center bg-white rounded-full px-3 py-2 border border-gray-200"
              >
                <div className="w-6 h-6 mr-2">
                  {typeof fund.logo === 'string' ? (
                    <img src={fund.logo} alt={fund.name} className="w-full h-full object-contain" />
                  ) : (
                    fund.logo
                  )}
                </div>
                <span className="mr-2 truncate max-w-[150px]">{fund.name}</span>
                <button 
                  className="ml-1 text-gray-400 hover:text-gray-600"
                  onClick={() => removeFund(fund.id)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            
            {selectedFunds.length < MAX_FUNDS && (
              <button 
                className="flex items-center bg-gray-100 rounded-full px-3 py-2 text-gray-600 hover:bg-gray-200"
                onClick={() => setShowAddFund(true)}
              >
                <Plus size={16} className="mr-1" />
                Add Fund
              </button>
            )}
          </div>
          
          {/* Add Fund UI */}
          {showAddFund && (
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <div className="flex items-center mb-4">
                <h3 className="text-lg font-medium">Add fund to compare</h3>
                <button 
                  className="ml-auto text-gray-400 hover:text-gray-600"
                  onClick={() => {
                    setShowAddFund(false);
                    setSearchQuery('');
                  }}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input 
                  placeholder="Search funds" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <div className="max-h-60 overflow-y-auto">
                {filteredFunds.length > 0 ? (
                  filteredFunds.map(fund => (
                    <div 
                      key={fund.id}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                      onClick={() => addFund(fund)}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 mr-3">
                          {typeof fund.logo === 'string' ? (
                            <img src={fund.logo} alt={fund.name} className="w-full h-full object-contain" />
                          ) : (
                            fund.logo
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{fund.name}</h4>
                          <p className="text-sm text-gray-500">{fund.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-600 font-semibold">{fund.returns.threeYear}</div>
                        <div className="text-xs text-gray-500">3Y Returns</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-4 text-gray-500">
                    No funds found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Comparison table */}
        {selectedFunds.length > 1 ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <FundComparisonTable funds={selectedFunds} />
          </div>
        ) : (
          <div className="text-center p-8 bg-white rounded-lg">
            <p className="text-gray-500">Please select at least 2 funds to compare</p>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex gap-4 mt-6">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1 bg-green-500 hover:bg-green-600"
            onClick={() => {}}
          >
            Share Comparison
          </Button>
        </div>
      </div>
      
      <BottomNav activeTab="invest" />
    </div>
  );
};

export default FundComparePage;
