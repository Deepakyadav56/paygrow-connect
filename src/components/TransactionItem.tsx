
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TransactionItemProps {
  id: string;
  title: string;
  description?: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
  category?: string;
  icon?: React.ReactNode;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  id,
  title,
  description,
  amount,
  date,
  type,
  category,
  icon
}) => {
  const navigate = useNavigate();
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const handleClick = () => {
    navigate(`/transaction/${id}`);
  };

  return (
    <div className="transaction-item bg-white p-4 rounded-lg border border-app-teal-100 shadow-sm mb-3 hover:shadow-md transition-shadow cursor-pointer" onClick={handleClick}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {icon ? (
            <div className="mr-3">{icon}</div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-app-teal-100 mr-3 flex items-center justify-center">
              {title.charAt(0).toUpperCase()}
            </div>
          )}
          
          <div>
            <div className="font-medium text-app-teal-900">{title}</div>
            {description && <div className="text-xs text-app-teal-600">{description}</div>}
            {category && <div className="text-xs text-app-teal-500 mt-0.5">{category}</div>}
          </div>
        </div>
        
        <div className="text-right">
          <div className={`font-medium ${type === 'credit' ? 'text-app-green' : 'text-app-teal-900'}`}>
            {type === 'credit' ? '+' : ''}{formatCurrency(amount)}
          </div>
          <div className="text-xs text-app-teal-600">{date}</div>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
