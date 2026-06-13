import React from 'react';
import { Bell, Moon, Sun, Search } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, darkMode, toggleDarkMode }) => {
  return (
    <nav className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 h-16 flex items-center px-8 fixed right-0 left-72 z-50">
      <div className="flex-1 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tickets..."
            className="w-full bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-slate-300 dark:focus:border-slate-700 pl-11 py-2.5 rounded-2xl text-sm placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={toggleDarkMode}
          className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button className="relative text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
          <Bell className="w-5 h-5" />
          <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-[9px] text-white font-medium">3</span>
          </div>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-800">
          <div className="text-right">
            <div className="text-sm font-semibold text-slate-900 dark:text-white">{user.username}</div>
            <div className="text-[10px] text-emerald-500 -mt-0.5">Online</div>
          </div>
          <div className="w-8 h-8 bg-gradient-to-br from-violet-400 to-fuchsia-500 text-white text-sm font-bold flex items-center justify-center rounded-2xl shadow-inner">
            {user.username?.substring(0, 1).toUpperCase()}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;