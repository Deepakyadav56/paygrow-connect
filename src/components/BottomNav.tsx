
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Send, Banknote, LineChart, Menu } from 'lucide-react';

interface BottomNavProps {
  activeTab?: 'home' | 'payments' | 'bills' | 'invest' | 'more';
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab }) => {
  const location = useLocation();
  
  // Determine active tab based on route if not explicitly provided
  const currentTab = activeTab || (() => {
    const path = location.pathname;
    if (path.includes('/home')) return 'home';
    if (path.includes('/payments')) return 'payments';
    if (path.includes('/bills')) return 'bills';
    if (path.includes('/invest')) return 'invest';
    if (path.includes('/more')) return 'more';
    return undefined;
  })();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-app-teal-200 z-10 flex items-center justify-around p-2 shadow-md">
      <NavLink 
        to="/home"
        className={({ isActive }) => 
          `flex flex-col items-center py-2 px-3 ${currentTab === 'home' || isActive ? 'text-app-teal-600' : 'text-gray-500'}`
        }
      >
        <Home size={22} className="mb-1" />
        <span className="text-xs">Home</span>
      </NavLink>
      
      <NavLink 
        to="/payments"
        className={({ isActive }) => 
          `flex flex-col items-center py-2 px-3 ${currentTab === 'payments' || isActive ? 'text-app-teal-600' : 'text-gray-500'}`
        }
      >
        <Send size={22} className="mb-1" />
        <span className="text-xs">Payments</span>
      </NavLink>
      
      <NavLink 
        to="/bills"
        className={({ isActive }) => 
          `flex flex-col items-center py-2 px-3 ${currentTab === 'bills' || isActive ? 'text-app-teal-600' : 'text-gray-500'}`
        }
      >
        <Banknote size={22} className="mb-1" />
        <span className="text-xs">Bills</span>
      </NavLink>
      
      <NavLink 
        to="/invest"
        className={({ isActive }) => 
          `flex flex-col items-center py-2 px-3 ${currentTab === 'invest' || isActive ? 'text-app-teal-600' : 'text-gray-500'}`
        }
      >
        <LineChart size={22} className="mb-1" />
        <span className="text-xs">Invest</span>
      </NavLink>
      
      <NavLink 
        to="/more"
        className={({ isActive }) => 
          `flex flex-col items-center py-2 px-3 ${currentTab === 'more' || isActive ? 'text-app-teal-600' : 'text-gray-500'}`
        }
      >
        <Menu size={22} className="mb-1" />
        <span className="text-xs">More</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
