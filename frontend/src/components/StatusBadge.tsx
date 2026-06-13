import React from 'react';
import { cn } from '../utils/cn';

interface StatusBadgeProps {
  status: 'Open' | 'In Progress' | 'Resolved';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles = {
    Open: 'bg-amber-100 text-amber-700 border-amber-200',
    'In Progress': 'bg-blue-100 text-blue-700 border-blue-200',
    Resolved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };

  const dotColors = {
    Open: 'bg-amber-500',
    'In Progress': 'bg-blue-500',
    Resolved: 'bg-emerald-500',
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-3.5 py-1 rounded-3xl text-xs font-medium border",
      styles[status]
    )}>
      <div className={cn("w-2 h-2 rounded-full", dotColors[status])}></div>
      {status}
    </div>
  );
};

export default StatusBadge;