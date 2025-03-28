
import React from 'react';
import { 
  CreditCard, Shield, Gift, Headphones, User, Settings, FileText, HelpCircle, Share, Award, 
  ArrowRight, BookOpen, Smartphone, MessageSquare
} from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  showArrow?: boolean;
  highlight?: boolean;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, description, showArrow = true, highlight = false, onClick }) => {
  return (
    <div 
      className={`p-4 bg-white rounded-xl shadow-sm flex items-center ${highlight ? 'border border-app-blue/20' : ''} ${onClick ? 'cursor-pointer hover:shadow-md transition-all duration-200' : ''}`}
      onClick={onClick}
    >
      <div className={`w-10 h-10 rounded-full ${highlight ? 'bg-app-light-blue text-app-blue' : 'bg-gray-100'} flex items-center justify-center mr-3`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="font-medium">{title}</div>
        {description && <div className="text-xs text-gray-500">{description}</div>}
      </div>
      {showArrow && <ArrowRight size={16} className="text-gray-400" />}
    </div>
  );
};

const MorePage: React.FC = () => {
  return (
    <div className="app-container pb-20">
      <Header title="More" showNotification showProfile />
      
      <div className="px-6 py-4">
        <div className="p-5 bg-gradient-to-r from-app-blue to-app-dark-blue rounded-xl mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4">
              <User size={24} className="text-white" />
            </div>
            <div className="text-white">
              <h3 className="font-medium">John Doe</h3>
              <p className="text-sm text-white/80">+91 98765 43210</p>
            </div>
          </div>
          <button className="mt-4 py-2 px-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm">
            View Profile
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Account</h2>
            <MenuItem 
              icon={<CreditCard size={18} />} 
              title="Payment Methods" 
              description="Add & manage payment options"
            />
            <MenuItem 
              icon={<Shield size={18} />} 
              title="Security & Privacy" 
              description="Control your app security settings"
            />
            <MenuItem 
              icon={<User size={18} />} 
              title="Personal Information" 
              description="Manage your profile details"
            />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Rewards & Referrals</h2>
            <MenuItem 
              icon={<Gift size={18} />} 
              title="Rewards" 
              description="View your earned rewards"
              highlight
            />
            <MenuItem 
              icon={<Share size={18} />} 
              title="Refer & Earn" 
              description="Invite friends and earn rewards"
            />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Help & Info</h2>
            <MenuItem 
              icon={<HelpCircle size={18} />} 
              title="Help Center" 
              description="Get answers to your questions"
            />
            <MenuItem 
              icon={<Smartphone size={18} />} 
              title="About PayGrow" 
              description="App version 1.0.0"
            />
            <MenuItem 
              icon={<FileText size={18} />} 
              title="Terms & Policies" 
              description="Legal information"
            />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Resources</h2>
            <MenuItem 
              icon={<BookOpen size={18} />} 
              title="Learning Center" 
              description="Learn about investing and personal finance"
            />
            <MenuItem 
              icon={<Award size={18} />} 
              title="Investment Academy" 
              description="Courses and tutorials for investors"
            />
            <MenuItem 
              icon={<MessageSquare size={18} />} 
              title="Community" 
              description="Join discussions with other investors"
              highlight
            />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Preferences</h2>
            <MenuItem 
              icon={<Settings size={18} />} 
              title="App Settings" 
              description="Customize your app experience"
            />
            <MenuItem 
              icon={<Headphones size={18} />} 
              title="Customer Support" 
              description="We're here to help"
            />
          </div>
          
          <button className="w-full mt-4 py-3 text-app-red font-medium">
            Logout
          </button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default MorePage;
