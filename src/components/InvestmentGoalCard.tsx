
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, Award } from 'lucide-react';

interface InvestmentGoalProps {
  title: string;
  targetAmount: number;
  currentAmount: number;
  dueDate?: string;
  iconType?: 'target' | 'trending' | 'award';
}

const InvestmentGoalCard: React.FC<InvestmentGoalProps> = ({
  title,
  targetAmount,
  currentAmount,
  dueDate,
  iconType = 'target'
}) => {
  const progress = Math.min(Math.round((currentAmount / targetAmount) * 100), 100);
  
  const getIcon = () => {
    switch (iconType) {
      case 'target':
        return <Target className="text-app-blue" />;
      case 'trending':
        return <TrendingUp className="text-app-green" />;
      case 'award':
        return <Award className="text-app-purple" />;
      default:
        return <Target className="text-app-blue" />;
    }
  };

  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
            {getIcon()}
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            {dueDate && <p className="text-xs text-gray-500">Target date: {dueDate}</p>}
          </div>
        </div>
        
        <div className="space-y-2 mb-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Current</p>
            <p className="font-medium">₹{currentAmount.toLocaleString('en-IN')}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Target</p>
            <p className="font-medium">₹{targetAmount.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentGoalCard;
