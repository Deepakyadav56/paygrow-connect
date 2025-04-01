
import React from 'react';
import { Calendar, ArrowDown, ArrowUp, BarChart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type ActivityType = 'sip_payment' | 'investment' | 'redemption' | 'dividend';

interface Activity {
  id: string;
  type: ActivityType;
  date: string;
  amount: number;
  fundName: string;
  description: string;
}

interface RecentActivityProps {
  activities: Activity[];
  maxItems?: number;
  showTitle?: boolean;
}

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case 'sip_payment':
      return <Calendar className="text-app-blue" size={18} />;
    case 'investment':
      return <ArrowDown className="text-app-green" size={18} />;
    case 'redemption':
      return <ArrowUp className="text-app-red" size={18} />;
    case 'dividend':
      return <BarChart className="text-app-purple" size={18} />;
    default:
      return <Calendar className="text-gray-500" size={18} />;
  }
};

const getActivityLabel = (type: ActivityType) => {
  switch (type) {
    case 'sip_payment':
      return 'SIP Payment';
    case 'investment':
      return 'One-time Investment';
    case 'redemption':
      return 'Redemption';
    case 'dividend':
      return 'Dividend Payout';
    default:
      return 'Activity';
  }
};

const RecentActivity: React.FC<RecentActivityProps> = ({ 
  activities, 
  maxItems = 5,
  showTitle = true 
}) => {
  const displayActivities = activities.slice(0, maxItems);
  
  return (
    <Card className="shadow-sm border-none">
      {showTitle && (
        <div className="px-4 pt-4 pb-2">
          <h3 className="font-medium text-lg">Recent Activity</h3>
        </div>
      )}
      <CardContent className="p-0">
        {displayActivities.length > 0 ? (
          <div className="divide-y">
            {displayActivities.map((activity) => (
              <div key={activity.id} className="p-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.fundName}</p>
                  <p className="text-xs text-gray-500">
                    {getActivityLabel(activity.type)} • {activity.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${activity.type === 'redemption' ? 'text-app-red' : 'text-app-green'}`}>
                    {activity.type === 'redemption' ? '-' : '+'} ₹{activity.amount.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-gray-500">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            No recent activity to display
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
