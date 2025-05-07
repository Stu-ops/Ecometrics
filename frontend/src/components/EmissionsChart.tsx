
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', emissions: 240 },
  { month: 'Feb', emissions: 230 },
  { month: 'Mar', emissions: 250 },
  { month: 'Apr', emissions: 210 },
  { month: 'May', emissions: 190 },
  { month: 'Jun', emissions: 180 },
  { month: 'Jul', emissions: 195 },
  { month: 'Aug', emissions: 185 },
  { month: 'Sep', emissions: 170 },
  { month: 'Oct', emissions: 160 },
  { month: 'Nov', emissions: 150 },
  { month: 'Dec', emissions: 145 },
];

const EmissionsChart: React.FC = () => {
  return (
    <div className="info-card h-[300px]">
      <h3 className="text-lg font-display font-semibold mb-4 text-gray-800 dark:text-gray-200">Carbon Emissions Trend</h3>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="month" 
            tick={{ fill: '#888', fontSize: 12 }} 
            tickLine={false}
            axisLine={{ stroke: '#eee' }}
          />
          <YAxis 
            tick={{ fill: '#888', fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}kg`}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: '8px'
            }}
            formatter={(value) => [`${value} kg CO₂`, 'Emissions']}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="emissions" 
            stroke="#10b981" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorEmissions)" 
            activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2, fill: '#10b981' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmissionsChart;
