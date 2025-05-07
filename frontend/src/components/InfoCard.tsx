
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'emerald' | 'ocean' | 'amber';
}

const InfoCard: React.FC<InfoCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  color = 'emerald' 
}) => {
  const colorClasses = {
    emerald: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
    ocean: 'text-ocean-500 bg-ocean-50 dark:bg-ocean-900/20',
    amber: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20',
  };
  
  const trendColor = trend?.isPositive ? 'text-red-500' : 'text-emerald-500';
  const trendIcon = trend?.isPositive ? '↑' : '↓';

  return (
    <div className="info-card card-hover">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</h3>
          <p className="text-2xl font-display font-bold text-gray-800 dark:text-white">{value}</p>
          {trend && (
            <div className={`flex items-center mt-1 text-sm font-medium ${trendColor}`}>
              <span>{trendIcon} {Math.abs(trend.value)}%</span>
              <span className="ml-1 text-gray-500 dark:text-gray-400">{trend.isPositive ? 'increase' : 'reduction'}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
