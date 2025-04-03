
import React from 'react';
import { Calendar, MoreVertical, Edit, Pause, Play, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SIPManagementCardProps {
  sip: {
    id: string;
    fundId: string;
    fundName: string;
    logo: React.ReactNode | string;
    amount: number;
    frequency: string;
    nextDate: string;
    status: 'active' | 'paused' | 'stopped';
    totalInvested: number;
    currentValue: number;
    returns: {
      value: number;
      percentage: number;
    };
  };
}

const SIPManagementCard: React.FC<SIPManagementCardProps> = ({ sip }) => {
  const navigate = useNavigate();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'paused':
        return 'bg-orange-100 text-orange-700';
      case 'stopped':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'paused':
        return 'Paused';
      case 'stopped':
        return 'Stopped';
      default:
        return 'Unknown';
    }
  };
  
  const isPositive = sip.returns.percentage >= 0;
  
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 mb-4">
      {/* Fund header section */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <div className="flex items-center">
          <div className="w-10 h-10 mr-3 flex-shrink-0">
            {typeof sip.logo === 'string' ? (
              <img src={sip.logo} alt={sip.fundName} className="w-full h-full object-contain" />
            ) : (
              sip.logo
            )}
          </div>
          <div>
            <h3 className="font-medium">{sip.fundName}</h3>
            <div className="flex items-center mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(sip.status)}`}>
                {getStatusText(sip.status)}
              </span>
            </div>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2">
              <MoreVertical size={18} className="text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => navigate(`/invest/sip/modify/${sip.fundId}`)}>
              <Edit size={16} className="mr-2" />
              Modify SIP
            </DropdownMenuItem>
            {sip.status === 'active' && (
              <DropdownMenuItem onClick={() => navigate(`/invest/sip/pause/${sip.id}`)}>
                <Pause size={16} className="mr-2" />
                Pause SIP
              </DropdownMenuItem>
            )}
            {sip.status === 'paused' && (
              <DropdownMenuItem onClick={() => navigate(`/invest/sip/resume/${sip.id}`)}>
                <Play size={16} className="mr-2" />
                Resume SIP
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate(`/invest/sip/cancel/${sip.id}`)}>
              <span className="text-red-500 flex items-center">Cancel SIP</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* SIP details section */}
      <div className="p-4">
        <div className="flex justify-between mb-3">
          <div>
            <div className="text-gray-500 text-sm">SIP Amount</div>
            <div className="font-semibold">₹{sip.amount.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Frequency</div>
            <div className="font-semibold">{sip.frequency}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm flex items-center">
              <Calendar size={14} className="mr-1" /> Next Date
            </div>
            <div className="font-semibold">{sip.nextDate}</div>
          </div>
        </div>
        
        {/* Investment values */}
        <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
          <div>
            <div className="text-gray-500 text-sm">Total Invested</div>
            <div className="font-semibold">₹{sip.totalInvested.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Current Value</div>
            <div className="font-semibold">₹{sip.currentValue.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Returns</div>
            <div className={`font-semibold flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive && <ArrowUp size={14} className="mr-1" />}
              {!isPositive && <ArrowUp size={14} className="mr-1 transform rotate-180" />}
              {isPositive ? '+' : ''}₹{Math.abs(sip.returns.value).toLocaleString()} ({isPositive ? '+' : ''}{sip.returns.percentage.toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SIPManagementCard;
