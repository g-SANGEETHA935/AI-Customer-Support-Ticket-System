import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  Ticket,
  Shield,
  LogOut,
  MessageSquare
} from 'lucide-react';
import { User } from '../types';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { 
      icon: <LayoutDashboard className="w-5 h-5" />, 
      label: 'Dashboard', 
      path: '/dashboard',
      adminOnly: false 
    },
    { 
      icon: <PlusCircle className="w-5 h-5" />, 
      label: 'Create Ticket', 
      path: '/create-ticket',
      adminOnly: false 
    },
    { 
      icon: <Ticket className="w-5 h-5" />, 
      label: 'My Tickets', 
      path: '/my-tickets',
      adminOnly: false 
    },
  ];

  const adminItems = [
    { 
      icon: <Shield className="w-5 h-5" />, 
      label: 'Admin Dashboard', 
      path: '/admin',
      adminOnly: true 
    },
  ];

  return (
    <div className="w-72 bg-slate-950 text-white h-screen fixed flex flex-col border-r border-slate-800">
      <div className="p-8 flex items-center gap-3 border-b border-slate-800">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center">
          <MessageSquare className="w-6 h-6" />
        </div>
        <div>
          <div className="font-semibold text-2xl tracking-tighter">SupportAI</div>
          <div className="text-[10px] text-slate-500 -mt-1">CUSTOMER SUPPORT</div>
        </div>
      </div>

      <div className="px-4 py-8 flex-1 overflow-y-auto">
        <div className="px-4 mb-3 text-xs font-semibold tracking-widest text-slate-500">MAIN</div>
        
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3.5 rounded-2xl mb-1 transition-colors text-sm font-medium ${
                isActive 
                  ? 'bg-white/10 text-white' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}

        {user.is_staff && (
          <>
            <div className="px-4 mt-8 mb-3 text-xs font-semibold tracking-widest text-slate-500">ADMIN</div>
            {adminItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3.5 rounded-2xl mb-1 transition-colors text-sm font-medium ${
                    isActive 
                      ? 'bg-white/10 text-white' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </>
        )}
      </div>

      <div className="p-6 border-t border-slate-800 mt-auto">
        <div className="flex items-center gap-3 px-4 py-3 bg-slate-900 rounded-3xl">
          <div className="w-9 h-9 bg-violet-500/20 text-violet-400 rounded-2xl flex items-center justify-center text-sm font-semibold">
            {user.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate">{user.username}</div>
            <div className="text-slate-500 text-xs truncate">{user.email}</div>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="mt-4 flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-2xl text-sm font-medium transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;