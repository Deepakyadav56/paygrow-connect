
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Clock, AlertCircle, Check, HelpCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';

// Mock transaction data - in a real app this would come from an API call
const mockTransactions = [
  {
    id: "tx-001",
    title: "Parag Parikh Flexi Cap Fund",
    description: "SIP Investment",
    amount: 5000,
    date: "2025-04-02T10:30:00",
    status: "completed",
    type: "debit",
    category: "Investment",
    paymentMode: "UPI",
    referenceId: "REF12345678",
    transactionFee: 0,
    recipientName: "PPFAS Mutual Fund",
    notes: "",
    bankAccount: "HDFC Bank ****6789",
    icon: "🔵"
  },
  {
    id: "tx-002",
    title: "HDFC Flexi Cap Fund",
    description: "Lump Sum Investment",
    amount: 10000,
    date: "2025-03-28T14:45:00",
    status: "completed",
    type: "debit",
    category: "Investment",
    paymentMode: "Net Banking",
    referenceId: "REF87654321",
    transactionFee: 0,
    recipientName: "HDFC Mutual Fund",
    notes: "First investment in this fund",
    bankAccount: "SBI ****1234",
    icon: "🔴"
  },
  {
    id: "tx-003",
    title: "Quant Small Cap Fund",
    description: "SIP Installment",
    amount: 2500,
    date: "2025-03-15T09:15:00",
    status: "processing",
    type: "debit",
    category: "Investment",
    paymentMode: "UPI",
    referenceId: "REF23456789",
    transactionFee: 0,
    recipientName: "Quant Mutual Fund",
    notes: "",
    bankAccount: "HDFC Bank ****6789",
    icon: "⚫"
  },
  {
    id: "tx-004",
    title: "SBI Dividend Yield Fund",
    description: "Dividend Payout",
    amount: 1250,
    date: "2025-03-10T16:30:00",
    status: "completed",
    type: "credit",
    category: "Dividend",
    paymentMode: "Direct Credit",
    referenceId: "REF34567890",
    transactionFee: 0,
    recipientName: "Your Account",
    notes: "Quarterly dividend",
    bankAccount: "SBI ****1234",
    icon: "🔵"
  },
  {
    id: "tx-005",
    title: "ICICI Prudential Value Discovery Fund",
    description: "Redemption",
    amount: 8500,
    date: "2025-03-05T11:20:00",
    status: "completed",
    type: "credit",
    category: "Redemption",
    paymentMode: "IMPS",
    referenceId: "REF45678901",
    transactionFee: 0,
    recipientName: "Your Account",
    notes: "Partial redemption",
    bankAccount: "ICICI Bank ****5678",
    icon: "🟠"
  }
];

interface TransactionStatus {
  label: string;
  color: string;
  icon: React.ReactNode;
}

const TransactionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      const foundTransaction = mockTransactions.find(tx => tx.id === id);
      setTransaction(foundTransaction || null);
      setIsLoading(false);
    }, 800);
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="app-container bg-app-teal-50 min-h-screen">
        <Header title="Transaction Details" showBack />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-app-teal-700"></div>
        </div>
      </div>
    );
  }
  
  if (!transaction) {
    return (
      <div className="app-container bg-app-teal-50 min-h-screen">
        <Header title="Transaction Details" showBack />
        <div className="flex flex-col items-center justify-center h-[80vh] px-4 text-center">
          <AlertCircle size={48} className="text-app-teal-700 mb-4" />
          <h2 className="text-xl font-semibold text-app-teal-900 mb-2">Transaction Not Found</h2>
          <p className="text-app-teal-700 mb-6">The transaction you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => navigate('/transactions')}
            className="bg-app-teal-700 hover:bg-app-teal-800 text-white"
          >
            Go to Transactions
          </Button>
        </div>
      </div>
    );
  }
  
  // Define status indicator
  const getStatusInfo = (status: string): TransactionStatus => {
    switch (status) {
      case 'completed':
        return { 
          label: 'Completed', 
          color: 'bg-app-teal-100 text-app-teal-800', 
          icon: <Check size={14} className="text-app-teal-700" /> 
        };
      case 'processing':
        return { 
          label: 'Processing', 
          color: 'bg-amber-100 text-amber-800', 
          icon: <Clock size={14} className="text-amber-700" /> 
        };
      case 'failed':
        return { 
          label: 'Failed', 
          color: 'bg-red-100 text-red-800', 
          icon: <AlertCircle size={14} className="text-red-700" /> 
        };
      default:
        return { 
          label: 'Unknown', 
          color: 'bg-gray-100 text-gray-800', 
          icon: <HelpCircle size={14} className="text-gray-700" /> 
        };
    }
  };
  
  const statusInfo = getStatusInfo(transaction.status);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="app-container bg-app-teal-50 min-h-screen pb-6">
      <Header title="Transaction Details" showBack />
      
      <div className="p-4">
        {/* Top Summary Card */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-6 border border-app-teal-100">
          <div className="flex items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-app-teal-100 flex items-center justify-center mr-4 text-xl">
              {transaction.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-app-teal-900">{transaction.title}</h1>
              <p className="text-sm text-app-teal-700">{transaction.description}</p>
              <div className="flex items-center mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                  {statusInfo.icon}
                  <span className="ml-1">{statusInfo.label}</span>
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-center py-3">
            <div className="text-sm text-app-teal-700 mb-1">
              {transaction.type === 'credit' ? 'Amount Received' : 'Amount Paid'}
            </div>
            <div className={`text-2xl font-bold ${transaction.type === 'credit' ? 'text-app-green' : 'text-app-teal-900'}`}>
              {transaction.type === 'credit' ? '+' : ''}
              ₹{transaction.amount.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-app-teal-600 mt-1">
              {formatDate(transaction.date)}
            </div>
          </div>
          
          <div className="flex gap-2 mt-3">
            <Button
              variant="outline"
              className="flex-1 border-app-teal-200 text-app-teal-700 hover:bg-app-teal-50"
              onClick={() => {}}
            >
              <Download size={16} className="mr-1" />
              Receipt
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-app-teal-200 text-app-teal-700 hover:bg-app-teal-50"
              onClick={() => {}}
            >
              <Share2 size={16} className="mr-1" />
              Share
            </Button>
          </div>
        </div>
        
        {/* Transaction Details */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-6 border border-app-teal-100">
          <h2 className="text-lg font-semibold text-app-teal-900 mb-4">Transaction Details</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-app-teal-700">Transaction ID</span>
              <span className="text-app-teal-900 font-medium">{transaction.id}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-app-teal-700">Reference ID</span>
              <span className="text-app-teal-900 font-medium">{transaction.referenceId}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-app-teal-700">Date & Time</span>
              <span className="text-app-teal-900 font-medium">{formatDate(transaction.date)}</span>
            </div>
            
            <Separator className="bg-app-teal-100" />
            
            <div className="flex justify-between">
              <span className="text-app-teal-700">Category</span>
              <span className="text-app-teal-900 font-medium">{transaction.category}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-app-teal-700">Payment Mode</span>
              <span className="text-app-teal-900 font-medium">{transaction.paymentMode}</span>
            </div>
            
            {transaction.bankAccount && (
              <div className="flex justify-between">
                <span className="text-app-teal-700">Bank Account</span>
                <span className="text-app-teal-900 font-medium">{transaction.bankAccount}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-app-teal-700">{transaction.type === 'credit' ? 'Sender' : 'Recipient'}</span>
              <span className="text-app-teal-900 font-medium">{transaction.recipientName}</span>
            </div>
            
            {transaction.transactionFee > 0 && (
              <div className="flex justify-between">
                <span className="text-app-teal-700">Transaction Fee</span>
                <span className="text-app-teal-900 font-medium">₹{transaction.transactionFee.toLocaleString('en-IN')}</span>
              </div>
            )}
            
            {transaction.notes && (
              <>
                <Separator className="bg-app-teal-100" />
                <div>
                  <span className="text-app-teal-700 block mb-1">Notes</span>
                  <p className="text-app-teal-900 bg-app-teal-50 p-3 rounded-md">{transaction.notes}</p>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Additional Information - Tabs for investment specific details */}
        {transaction.category === 'Investment' && (
          <div className="bg-white rounded-lg shadow-md border border-app-teal-100 overflow-hidden">
            <Tabs defaultValue="details">
              <TabsList className="w-full bg-app-teal-50 p-0">
                <TabsTrigger value="details" className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:text-app-teal-800">
                  Fund Details
                </TabsTrigger>
                <TabsTrigger value="navs" className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:text-app-teal-800">
                  NAV Info
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="p-5">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-app-teal-700">Fund Name</span>
                    <span className="text-app-teal-900 font-medium">{transaction.title}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-app-teal-700">Investment Type</span>
                    <span className="text-app-teal-900 font-medium">{transaction.description}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-app-teal-700">Folio Number</span>
                    <span className="text-app-teal-900 font-medium">1234567/89</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-app-teal-700">Units Allotted</span>
                    <span className="text-app-teal-900 font-medium">123.456</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="navs" className="p-5">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-app-teal-700">NAV Date</span>
                    <span className="text-app-teal-900 font-medium">03 Apr 2025</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-app-teal-700">NAV Value</span>
                    <span className="text-app-teal-900 font-medium">₹42.85</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-app-teal-700">NAV Change</span>
                    <span className="text-app-green font-medium flex items-center">
                      +0.34 (+0.82%)
                    </span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
        
        {/* Related Transactions - Show for SIP investments */}
        {transaction.description && transaction.description.includes('SIP') && (
          <div className="bg-white rounded-lg shadow-md p-5 mt-6 border border-app-teal-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-app-teal-900">Related SIP Transactions</h2>
              <Button variant="ghost" className="h-8 px-2 text-app-teal-700 hover:text-app-teal-900 hover:bg-app-teal-50">
                View All
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-app-teal-50 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-app-teal-700 mr-2" />
                  <span className="text-sm text-app-teal-900">05 Mar 2025</span>
                </div>
                <span className="text-sm font-medium text-app-teal-900">₹{transaction.amount.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-app-teal-50 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-app-teal-700 mr-2" />
                  <span className="text-sm text-app-teal-900">05 Feb 2025</span>
                </div>
                <span className="text-sm font-medium text-app-teal-900">₹{transaction.amount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Help & Support */}
        <div className="mt-6 text-center">
          <Button 
            variant="link" 
            className="text-app-teal-700 hover:text-app-teal-900"
            onClick={() => navigate('/help/transaction')}
          >
            <HelpCircle size={16} className="mr-1" />
            Need help with this transaction?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsPage;
