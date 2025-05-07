
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Car, Home, Factory, ShoppingBag, Leaf } from 'lucide-react';

const data = [
  { name: 'Transportation', value: 35, icon: Car },
  { name: 'Home Energy', value: 25, icon: Home },
  { name: 'Food', value: 15, icon: ShoppingBag },
  { name: 'Industrial', value: 20, icon: Factory },
  { name: 'Other', value: 5, icon: Leaf },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const EmissionsBySource: React.FC = () => {
  return (
    <div className="info-card">
      <h3 className="text-lg font-display font-semibold mb-4 text-gray-800 dark:text-gray-200">Emissions By Source</h3>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="w-full h-[200px] md:w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                animationDuration={800}
                animationBegin={200}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '8px'
                }}
                formatter={(value) => [`${value}%`, 'Percentage']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/2 grid grid-cols-1 gap-2 mt-4 md:mt-0">
          {data.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-4 h-4" style={{ backgroundColor: COLORS[index % COLORS.length], borderRadius: '4px' }} />
                <Icon size={16} className="text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                <span className="text-sm font-bold ml-auto">{item.value}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmissionsBySource;
