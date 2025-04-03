
import React from 'react';
import { useNavigate } from 'react-router-dom';

type Tool = {
  id: string;
  name: string;
  icon: React.ReactNode | string;
  badge?: number;
  link: string;
};

interface ProductsToolsProps {
  tools: Tool[];
}

const ProductsTools: React.FC<ProductsToolsProps> = ({ tools }) => {
  const navigate = useNavigate();
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Products & tools</h2>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        {tools.map((tool) => (
          <div 
            key={tool.id}
            className="flex flex-col items-center justify-center"
            onClick={() => navigate(tool.link)}
          >
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-2 relative">
              {typeof tool.icon === 'string' ? (
                <img src={tool.icon} alt={tool.name} className="w-8 h-8 object-contain" />
              ) : (
                tool.icon
              )}
              {tool.badge && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {tool.badge}
                </span>
              )}
            </div>
            <span className="text-xs text-center">{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsTools;
