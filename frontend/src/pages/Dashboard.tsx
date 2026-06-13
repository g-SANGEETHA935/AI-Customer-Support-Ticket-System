import React, { useEffect, useState } from 'react';
import { Ticket, User } from '../types';
import { ticketsAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { Card } from '../components/ui/Card';
import StatusBadge from '../components/StatusBadge';
import { Clock, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const data = await ticketsAPI.getTickets();
      setTickets(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to load tickets');
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const openTickets = tickets.filter(t => t.status === 'Open').length;
  const inProgress = tickets.filter(t => t.status === 'In Progress').length;
  const resolved = tickets.filter(t => t.status === 'Resolved').length;

  const recentTickets = [...tickets]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5);

  return (
    <div className="p-8 pt-24 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <div className="text-emerald-500 text-sm font-medium tracking-[0.125em]">OVERVIEW</div>
          <h1 className="text-5xl font-semibold tracking-tighter text-slate-900 dark:text-white">Good morning, {user.username}.</h1>
          <p className="text-slate-500 mt-2">Here's what's happening with your support tickets</p>
        </div>
        
        <Link 
          to="/create-ticket"
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 transition-colors text-white px-6 py-3 rounded-2xl text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> New Ticket
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
          <div className="flex justify-between">
            <div>
              <div className="text-blue-100 text-sm">OPEN TICKETS</div>
              <div className="text-7xl font-semibold tracking-tighter mt-3">{openTickets}</div>
            </div>
            <AlertCircle className="w-12 h-12 opacity-30" />
          </div>
          <div className="text-xs text-blue-100 mt-8">Requires attention</div>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <div className="uppercase text-xs tracking-widest text-slate-500">IN PROGRESS</div>
              <div className="text-6xl font-semibold tracking-tighter text-slate-900 dark:text-white mt-4">{inProgress}</div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-2xl">
              <Clock className="w-7 h-7 text-blue-600" />
            </div>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full mt-10 overflow-hidden">
            <div className="h-2 w-3/5 bg-blue-500 rounded-full"></div>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <div className="uppercase text-xs tracking-widest text-slate-500">RESOLVED</div>
              <div className="text-6xl font-semibold tracking-tighter text-slate-900 dark:text-white mt-4">{resolved}</div>
            </div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl">
              <CheckCircle2 className="w-7 h-7 text-emerald-600" />
            </div>
          </div>
          <div className="text-emerald-500 text-sm flex items-center gap-1 mt-10">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
            {resolved > 0 ? `${Math.round((resolved / (tickets.length || 1)) * 100)}% RESOLUTION RATE` : 'NO TICKETS YET'}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <Card title="Recent Tickets">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin h-6 w-6 border-2 border-violet-500 border-t-transparent rounded-full"></div>
              </div>
            ) : recentTickets.length > 0 ? (
              <div className="divide-y">
                {recentTickets.map(ticket => (
                  <div key={ticket.id} className="py-5 flex items-center justify-between group">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <StatusBadge status={ticket.status} />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white group-hover:text-violet-600 transition-colors">{ticket.title}</div>
                        <div className="text-xs text-slate-500 line-clamp-1 mt-1">{ticket.description}</div>
                      </div>
                    </div>
                    <div className="text-right text-xs text-slate-500">
                      {new Date(ticket.created_at).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center text-slate-400">
                No tickets yet. Create your first support ticket!
              </div>
            )}
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card title="AI Insights">
            <div className="space-y-6 py-2">
              <div className="border-l-4 border-violet-500 pl-5">
                <div className="uppercase text-xs text-violet-500 tracking-widest mb-1">MOST COMMON CATEGORY</div>
                <div className="font-semibold">Billing &amp; Payments</div>
                <div className="text-xs text-slate-500 mt-4">Last 30 days • 43% of all tickets</div>
              </div>

              <div className="border-l-4 border-amber-500 pl-5">
                <div className="uppercase text-xs text-amber-500 tracking-widest mb-1">AI RECOMMENDATION</div>
                <div className="text-sm leading-snug text-slate-600 dark:text-slate-400">
                  Consider creating a self-service FAQ for common password reset requests to reduce ticket volume by up to 60%.
                </div>
              </div>

              <div className="pt-4 border-t text-xs flex justify-between text-slate-500">
                <div>Powered by fine-tuned LLM</div>
                <div className="text-violet-500">VIEW FULL REPORT →</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;