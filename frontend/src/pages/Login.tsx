import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await authAPI.login(username, password);

      const userData = data.user || {
        id: 0,
        username,
        email: username.includes('@') ? username : 'user@example.com',
        is_staff: false,
      };

      login(userData, data.access, data.refresh);

      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        'Invalid credentials. Please try again.';
      toast.error(typeof message === 'string' ? message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-11 w-11 bg-violet-600 rounded-2xl flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div className="text-white">
              <div className="text-4xl font-semibold tracking-tighter">SupportAI</div>
              <div className="text-xs text-slate-500">INTELLIGENT TICKETING</div>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-semibold text-white tracking-tight">Sign in</h1>
            <p className="text-slate-400 mt-3">Access your support dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
            />
            
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
            />

            <Button 
              type="submit" 
              className="w-full h-12 text-base"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-violet-400 hover:text-violet-300 font-medium">
                Create account
              </Link>
            </p>
          </div>

          <div className="mt-12 text-center text-[10px] text-slate-500">
            Backend: Django REST Framework + JWT
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-zinc-900 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:40px_40px]"></div>
        
        <div className="max-w-md text-center relative z-10 px-8">
          <div className="inline-flex items-center gap-2 bg-white/5 text-white text-sm px-5 py-2 rounded-3xl mb-8 border border-white/10">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            AI POWERED SUPPORT
          </div>
          
          <h2 className="text-white text-5xl font-semibold tracking-tighter leading-none mb-6">
            Modern customer support, <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">reimagined</span>.
          </h2>
          
          <p className="text-slate-400 text-lg">
            Create tickets. Get AI categorized insights and response suggestions. 
            Track progress in real time.
          </p>
          
          <div className="mt-16 grid grid-cols-3 gap-px bg-white/10 rounded-3xl overflow-hidden">
            {['98%', '24/7', 'AI'].map((stat, i) => (
              <div key={i} className="bg-slate-900/80 py-6 text-center">
                <div className="text-3xl font-semibold text-white">{stat}</div>
                <div className="text-xs text-slate-400 mt-1 tracking-wider">UPTIME</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;