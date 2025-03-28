
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Send, Banknote, LineChart, Menu } from 'lucide-react';

const BottomNav: React.FC = () => {
  return (
    <nav className="bottom-nav">
      <NavLink 
        to="/"
        className={({ isActive }) => 
          `nav-item ${isActive ? 'active' : 'text-gray-500'}`
        }
      >
        <Home size={22} className="nav-icon" />
        <span className="text-xs">Home</span>
      </NavLink>
      
      <NavLink 
        to="/payments"
        className={({ isActive }) => 
          `nav-item ${isActive ? 'active' : 'text-gray-500'}`
        }
      >
        <Send size={22} className="nav-icon" />
        <span className="text-xs">Payments</span>
      </NavLink>
      
      <NavLink 
        to="/bills"
        className={({ isActive }) => 
          `nav-item ${isActive ? 'active' : 'text-gray-500'}`
        }
      >
        <Banknote size={22} className="nav-icon" />
        <span className="text-xs">Bills</span>
      </NavLink>
      
      <NavLink 
        to="/invest"
        className={({ isActive }) => 
          `nav-item ${isActive ? 'active' : 'text-gray-500'}`
        }
      >
        <LineChart size={22} className="nav-icon" />
        <span className="text-xs">Invest</span>
      </NavLink>
      
      <NavLink 
        to="/more"
        className={({ isActive }) => 
          `nav-item ${isActive ? 'active' : 'text-gray-500'}`
        }
      >
        <Menu size={22} className="nav-icon" />
        <span className="text-xs">More</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
