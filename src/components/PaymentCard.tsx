
import React from 'react';
import { CreditCard, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentCardProps {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  balance: number;
  cardType?: 'visa' | 'mastercard' | 'rupay';
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  cardNumber,
  cardHolder,
  expiryDate,
  balance,
  cardType = 'visa'
}) => {
  const formatCardNumber = (number: string) => {
    // Show last 4 digits and mask the rest
    return `•••• •••• •••• ${number.slice(-4)}`;
  };

  const copyCardNumber = () => {
    navigator.clipboard.writeText(cardNumber);
    toast.success('Card number copied to clipboard');
  };

  let cardLogo;
  if (cardType === 'visa') {
    cardLogo = "VISA";
  } else if (cardType === 'mastercard') {
    cardLogo = "MasterCard";
  } else {
    cardLogo = "RuPay";
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="gradient-card p-5 text-white w-full max-w-sm">
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center">
          <CreditCard size={24} className="mr-2" />
          <span className="font-semibold">PayGrow Card</span>
        </div>
        <div className="text-xl font-bold">
          {cardLogo}
        </div>
      </div>
      
      <div className="mb-8">
        <div className="text-sm opacity-80 mb-1">Available Balance</div>
        <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
      </div>
      
      <div className="flex justify-between items-end">
        <div>
          <div className="text-sm opacity-80 mb-1">Card Number</div>
          <div className="flex items-center">
            <div className="font-medium">{formatCardNumber(cardNumber)}</div>
            <button 
              onClick={copyCardNumber}
              className="ml-2 opacity-70 hover:opacity-100"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm opacity-80 mb-1">Expiry</div>
          <div className="font-medium">{expiryDate}</div>
        </div>
      </div>
      
      <div className="mt-6 text-sm font-medium">{cardHolder.toUpperCase()}</div>
    </div>
  );
};

export default PaymentCard;
