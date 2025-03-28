
import React from 'react';
import { ArrowLeft, Bell, Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showProfile?: boolean;
  showNotification?: boolean;
  showSearch?: boolean;
  transparent?: boolean;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showProfile = false,
  showNotification = false,
  showSearch = false,
  transparent = false,
  children
}) => {
  const navigate = useNavigate();

  return (
    <header 
      className={`sticky top-0 z-10 px-4 py-4 flex items-center justify-between ${
        transparent ? 'bg-transparent' : 'bg-white shadow-sm'
      }`}
    >
      <div className="flex items-center">
        {showBack && (
          <button 
            onClick={() => navigate(-1)} 
            className="mr-2 rounded-full p-1.5 hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        {title && <h1 className="text-lg font-semibold">{title}</h1>}
      </div>

      {children}

      <div className="flex items-center space-x-3">
        {showSearch && (
          <button className="rounded-full p-1.5 hover:bg-gray-100">
            <Search size={20} />
          </button>
        )}
        {showNotification && (
          <button className="rounded-full p-1.5 hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 bg-app-red rounded-full w-2 h-2"></span>
          </button>
        )}
        {showProfile && (
          <button 
            onClick={() => navigate('/profile')} 
            className="rounded-full p-1.5 hover:bg-gray-100"
          >
            <User size={20} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
