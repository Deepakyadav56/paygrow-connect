
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, Award, ArrowRight, Wallet, PiggyBank, Home, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface InvestmentGoalProps {
  title: string;
  targetAmount: number;
  currentAmount: number;
  dueDate?: string;
  iconType?: 'target' | 'trending' | 'award' | 'wallet' | 'piggybank' | 'home' | 'education';
  actionLink?: string;
  color?: string;
}

const InvestmentGoalCard: React.FC<InvestmentGoalProps> = ({
  title,
  targetAmount,
  currentAmount,
  dueDate,
  iconType = 'target',
  actionLink,
  color
}) => {
  const navigate = useNavigate();
  const progress = Math.min(Math.round((currentAmount / targetAmount) * 100), 100);
  
  const getBackgroundClass = () => {
    switch (iconType) {
      case 'target':
        return 'bg-blue-50';
      case 'trending':
        return 'bg-green-50';
      case 'award':
        return 'bg-purple-50';
      case 'wallet':
        return 'bg-amber-50';
      case 'piggybank':
        return 'bg-rose-50';
      case 'home':
        return 'bg-indigo-50';
      case 'education':
        return 'bg-teal-50';
      default:
        return 'bg-gray-50';
    }
  };
  
  const getIcon = () => {
    switch (iconType) {
      case 'target':
        return <Target className="text-app-blue" />;
      case 'trending':
        return <TrendingUp className="text-app-green" />;
      case 'award':
        return <Award className="text-app-purple" />;
      case 'wallet':
        return <Wallet className="text-app-orange" />;
      case 'piggybank':
        return <PiggyBank className="text-app-red" />;
      case 'home':
        return <Home className="text-indigo-500" />;
      case 'education':
        return <GraduationCap className="text-teal-500" />;
      default:
        return <Target className="text-app-blue" />;
    }
  };

  return (
    <Card className="border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 rounded-xl">
      <CardContent className="p-5">
        <div className="flex items-center mb-4">
          <div className={`w-10 h-10 rounded-full ${getBackgroundClass()} flex items-center justify-center mr-3`}>
            {getIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            {dueDate && <p className="text-xs text-gray-500">Target date: {dueDate}</p>}
          </div>
        </div>
        
        <div className="space-y-2 mb-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-2.5 rounded-full" 
            style={{backgroundColor: 'rgba(229, 231, 235, 0.5)'}}
          />
        </div>
        
        <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500 mb-1">Current</p>
            <p className="font-semibold text-gray-900">₹{currentAmount.toLocaleString('en-IN')}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">Target</p>
            <p className="font-semibold text-gray-900">₹{targetAmount.toLocaleString('en-IN')}</p>
          </div>
        </div>
        
        {actionLink && (
          <Button 
            variant="ghost" 
            className="w-full mt-4 flex justify-between items-center text-app-blue hover:bg-app-light-blue hover:text-app-dark-blue transition-colors"
            onClick={() => navigate(actionLink)}
          >
            <span>View Details</span>
            <ArrowRight size={16} />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default InvestmentGoalCard;
