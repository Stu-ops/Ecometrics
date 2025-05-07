
import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';

interface InsightCardProps {
  title: string;
  description: string;
  impact: string;
  isBookmarked?: boolean;
  onBookmark?: () => void;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  description,
  impact,
  isBookmarked = false,
  onBookmark,
}) => {
  return (
    <div className="info-card card-hover overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 eco-gradient opacity-70"></div>
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-display font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
        <button 
          onClick={onBookmark}
          className="text-gray-400 hover:text-amber-500 transition-colors"
        >
          {isBookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
        </button>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{description}</p>
      <div className="bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-md">
        <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
          Potential Impact: <span className="font-bold">{impact}</span>
        </p>
      </div>
    </div>
  );
};

export default InsightCard;
