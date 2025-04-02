
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Lightbulb, TrendingUp, PieChart } from 'lucide-react';

interface Insight {
  id: string;
  type: 'tip' | 'alert' | 'recommendation' | 'analysis';
  title: string;
  description: string;
}

interface InvestmentInsightsProps {
  insights: Insight[];
  maxItems?: number;
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

const InvestmentInsights: React.FC<InvestmentInsightsProps> = ({ insights, maxItems = 3 }) => {
  const displayInsights = insights.slice(0, maxItems);
  
  return (
    <Card className="border-none shadow-sm">
      <div className="px-4 pt-4 pb-2">
        <h3 className="font-medium text-lg">Investment Insights</h3>
      </div>
      <CardContent className="p-4 space-y-3">
        {displayInsights.map((insight) => (
          <div 
            key={insight.id} 
            className={`p-3 rounded-lg border ${getInsightColor(insight.type)}`}
          >
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">
                {getInsightIcon(insight.type)}
              </div>
              <div>
                <h4 className="font-medium text-sm">{insight.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default InvestmentInsights;
