
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Lightbulb, TrendingUp, PieChart, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Insight {
  id: string;
  type: 'tip' | 'alert' | 'recommendation' | 'analysis';
  title: string;
  description: string;
  actionLink?: string;
  actionText?: string;
}

interface InvestmentInsightsProps {
  insights: Insight[];
  maxItems?: number;
  viewAllLink?: string;
}

const getInsightIcon = (type: Insight['type']) => {
  switch (type) {
    case 'tip':
      return <Lightbulb className="text-app-orange" size={18} />;
    case 'alert':
      return <AlertCircle className="text-app-red" size={18} />;
    case 'recommendation':
      return <TrendingUp className="text-app-green" size={18} />;
    case 'analysis':
      return <PieChart className="text-app-blue" size={18} />;
    default:
      return <Lightbulb className="text-app-orange" size={18} />;
  }
};

const getInsightColor = (type: Insight['type']) => {
  switch (type) {
    case 'tip':
      return 'bg-amber-50 border-amber-200';
    case 'alert':
      return 'bg-red-50 border-red-200';
    case 'recommendation':
      return 'bg-green-50 border-green-200';
    case 'analysis':
      return 'bg-blue-50 border-blue-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

const InvestmentInsights: React.FC<InvestmentInsightsProps> = ({ insights, maxItems = 3, viewAllLink }) => {
  const navigate = useNavigate();
  const displayInsights = insights.slice(0, maxItems);
  
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="px-4 pt-4 pb-2 flex justify-between items-center">
        <h3 className="font-medium text-lg">Investment Insights</h3>
        {viewAllLink && (
          <Button 
            variant="ghost" 
            className="p-0 h-auto text-app-blue text-sm"
            onClick={() => navigate(viewAllLink)}
          >
            View All <ChevronRight size={16} />
          </Button>
        )}
      </div>
      <CardContent className="p-4 space-y-3">
        {displayInsights.map((insight) => (
          <div 
            key={insight.id} 
            className={`p-3 rounded-lg border ${getInsightColor(insight.type)} ${insight.actionLink ? 'cursor-pointer' : ''}`}
            onClick={() => insight.actionLink && navigate(insight.actionLink)}
          >
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">
                {getInsightIcon(insight.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{insight.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                {insight.actionLink && insight.actionText && (
                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto text-app-blue text-xs mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(insight.actionLink!);
                    }}
                  >
                    {insight.actionText} <ChevronRight size={12} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default InvestmentInsights;
