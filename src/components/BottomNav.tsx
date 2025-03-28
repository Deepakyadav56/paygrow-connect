
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Send, Banknote, LineChart, Menu } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 flex items-center justify-around p-2">
      <NavLink 
        to="/home"
        className={({ isActive }) => 
          `flex flex-col items-center py-2 px-3 ${isActive ? 'text-app-blue' : 'text-gray-500'}`
        }
      >
        <Home size={22} className="mb-1" />
        <span className="text-xs">Home</span>
      </NavLink>
      
      <NavLink 
        to="/payments"
        className={({ isActive }) => 
          `flex flex-col items-center py-2 px-3 ${isActive ? 'text-app-blue' : 'text-gray-500'}`
        }
      >
        <Send size={22} className="mb-1" />
        <span className="text-xs">Payments</span>
      </NavLink>
      
      <NavLink 
        to="/bills"
        className={({ isActive }) => 
          `flex flex-col items-center py-2 px-3 ${isActive ? 'text-app-blue' : 'text-gray-500'}`
        }
      >
        <Banknote size={22} className="mb-1" />
        <span className="text-xs">Bills</span>
      </NavLink>
      
      <NavLink 
        to="/invest"
        className={({ isActive }) => 
          `flex flex-col items-center py-2 px-3 ${isActive ? 'text-app-blue' : 'text-gray-500'}`
        }
      >
        <LineChart size={22} className="mb-1" />
        <span className="text-xs">Invest</span>
      </NavLink>
      
      <NavLink 
        to="/more"
        className={({ isActive }) => 
          `flex flex-col items-center py-2 px-3 ${isActive ? 'text-app-blue' : 'text-gray-500'}`
        }
      >
        <Menu size={22} className="mb-1" />
        <span className="text-xs">More</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
