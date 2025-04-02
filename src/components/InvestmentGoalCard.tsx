
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface InvestmentGoalProps {
  title: string;
  targetAmount: number;
  currentAmount: number;
  dueDate?: string;
  iconType?: 'target' | 'trending' | 'award';
  actionLink?: string;
}

const InvestmentGoalCard: React.FC<InvestmentGoalProps> = ({
  title,
  targetAmount,
  currentAmount,
  dueDate,
  iconType = 'target',
  actionLink
}) => {
  const navigate = useNavigate();
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
    <Card className="border-none shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
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
        
        {actionLink && (
          <Button 
            variant="ghost" 
            className="w-full mt-3 flex justify-between items-center text-app-blue"
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
