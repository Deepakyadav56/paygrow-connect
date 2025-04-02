
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Lightbulb, TrendingUp, PieChart, ChevronRight, LineChart, ArrowUpRight, Target, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Insight {
  id: string;
  type: 'tip' | 'alert' | 'recommendation' | 'analysis' | 'opportunity' | 'trending' | 'top';
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
    case 'opportunity':
      return <Target className="text-app-purple" size={18} />;
    case 'trending':
      return <LineChart className="text-indigo-500" size={18} />;
    case 'top':
      return <Star className="text-amber-500" size={18} />;
    default:
      return <Lightbulb className="text-app-orange" size={18} />;
  }
};

const getInsightColor = (type: Insight['type']) => {
  switch (type) {
    case 'tip':
      return 'bg-amber-50 border-amber-100';
    case 'alert':
      return 'bg-red-50 border-red-100';
    case 'recommendation':
      return 'bg-green-50 border-green-100';
    case 'analysis':
      return 'bg-blue-50 border-blue-100';
    case 'opportunity':
      return 'bg-purple-50 border-purple-100';
    case 'trending':
      return 'bg-indigo-50 border-indigo-100';
    case 'top':
      return 'bg-amber-50 border-amber-100';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

const InvestmentInsights: React.FC<InvestmentInsightsProps> = ({ insights, maxItems = 3, viewAllLink }) => {
  const navigate = useNavigate();
  const displayInsights = insights.slice(0, maxItems);
  
  return (
    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl">
      <div className="px-5 pt-4 pb-2 flex justify-between items-center">
        <h3 className="font-medium text-lg text-gray-900">Investment Insights</h3>
        {viewAllLink && (
          <Button 
            variant="ghost" 
            className="p-0 h-auto text-app-blue text-sm hover:bg-transparent"
            onClick={() => navigate(viewAllLink)}
          >
            View All <ChevronRight size={16} />
          </Button>
        )}
      </div>
      <CardContent className="p-5 space-y-3">
        {displayInsights.map((insight) => (
          <div 
            key={insight.id} 
            className={`p-3.5 rounded-xl border ${getInsightColor(insight.type)} ${insight.actionLink ? 'cursor-pointer transform transition-transform hover:scale-[1.01]' : ''}`}
            onClick={() => insight.actionLink && navigate(insight.actionLink)}
          >
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">
                {getInsightIcon(insight.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm text-gray-900">{insight.title}</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{insight.description}</p>
                {insight.actionLink && insight.actionText && (
                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto text-app-blue text-xs mt-2 hover:bg-transparent group"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(insight.actionLink!);
                    }}
                  >
                    {insight.actionText} 
                    <ArrowUpRight size={12} className="ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
