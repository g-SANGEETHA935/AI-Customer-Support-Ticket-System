import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      <div className="text-center max-w-md px-6">
        <div className="text-[180px] font-black tracking-[-10px] leading-none text-slate-800 select-none">404</div>
        
        <div className="-mt-8">
          <div className="text-3xl font-medium mb-3">Page not found</div>
          <p className="text-slate-400">The page you are looking for doesn't exist or has been moved.</p>
        </div>
        
        <Link to="/dashboard">
          <Button className="mt-10 text-lg px-10">Return to Dashboard</Button>
        </Link>
        
        <div className="text-xs text-slate-600 mt-20">SupportAI • AI Customer Support Ticket System</div>
      </div>
    </div>
  );
};

export default NotFound;