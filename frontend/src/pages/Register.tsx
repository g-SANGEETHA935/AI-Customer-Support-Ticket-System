import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { MessageSquare } from 'lucide-react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setIsLoading(true);

    try {
      await authAPI.register(
        formData.username, 
        formData.email, 
        formData.password
      );
      
      toast.success('Account created successfully! Please sign in.');
      navigate('/login');
    } catch (error: any) {
      const message = error.response?.data?.detail || 
                     Object.values(error.response?.data || {})[0] || 
                     'Registration failed. Please try again.';
      toast.error(Array.isArray(message) ? message[0] : message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-violet-600 rounded-2xl flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div className="text-white text-3xl font-semibold tracking-tighter">SupportAI</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">
          <h2 className="text-3xl font-semibold text-white mb-2">Create account</h2>
          <p className="text-slate-400 mb-8">Join the modern support experience</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="johndoe"
              required
              className="bg-slate-950 border-slate-700 text-white"
            />
            
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@company.com"
              required
              className="bg-slate-950 border-slate-700 text-white"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              required
              className="bg-slate-950 border-slate-700 text-white"
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              className="bg-slate-950 border-slate-700 text-white"
            />

            <Button 
              type="submit" 
              className="w-full h-12 mt-3 text-base font-semibold"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="text-center mt-8 text-slate-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-400 hover:underline">
              Sign in
            </Link>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-slate-500">
          Powered by Django REST Framework • Secure JWT Auth
        </div>
      </div>
    </div>
  );
};

export default Register;