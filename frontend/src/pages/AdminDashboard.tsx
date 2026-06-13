import React, { useEffect, useState } from 'react';
import { Ticket } from '../types';
import { ticketsAPI } from '../utils/api';
import toast from 'react-hot-toast';
import StatusBadge from '../components/StatusBadge';
import { Card } from '../components/ui/Card';
import { Ticket as TicketIcon, Clock, TrendingUp } from 'lucide-react';

interface AdminDashboardProps {
  user?: any;
}

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const fetchTickets = async () => {
    try {
      const data = await ticketsAPI.getAdminTickets();
      setTickets(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Couldn't load tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTickets(); }, []);

  const filteredTickets = filter === 'All' ? tickets : tickets.filter(t => t.status === filter);
  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'Open').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length,
  };

  const handleStatusUpdate = async (id: number, status: 'Open' | 'In Progress' | 'Resolved') => {
    try {
      await ticketsAPI.updateTicket(id, { status });
      toast.success('Ticket updated');
      fetchTickets();
    } catch (e) { toast.error('Update failed'); }
  };

  return (
    <div className="p-8 pt-24">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-4">
              <div className="text-xs font-mono bg-rose-100 text-rose-600 px-3 py-1 rounded">ADMIN MODE</div>
              <h1 className="text-5xl font-semibold tracking-[-2px]">Support Operations</h1>
            </div>
            <p className="text-slate-500 mt-1">Monitor • Categorize • Resolve</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card><div className="flex items-center justify-between"><div><div className="text-xs text-slate-500">TOTAL</div><div className="text-6xl font-semibold tracking-tighter mt-2">{stats.total}</div></div><TicketIcon className="text-violet-400 w-10 h-10" /></div></Card>
          <Card><div className="flex items-center justify-between"><div><div className="text-xs text-amber-500">OPEN</div><div className="text-6xl font-semibold tracking-tighter mt-2 text-amber-500">{stats.open}</div></div><div className="text-4xl">⚠️</div></div></Card>
          <Card><div className="flex items-center justify-between"><div><div className="text-xs text-blue-500">IN PROGRESS</div><div className="text-6xl font-semibold tracking-tighter mt-2 text-blue-500">{stats.inProgress}</div></div><Clock className="text-blue-400 w-10 h-10" /></div></Card>
          <Card><div className="flex items-center justify-between"><div><div className="text-xs text-emerald-500">RESOLVED</div><div className="text-6xl font-semibold tracking-tighter mt-2 text-emerald-500">{stats.resolved}</div></div><TrendingUp className="text-emerald-500 w-10 h-10" /></div></Card>
        </div>

        <Card title={`All Tickets (${filteredTickets.length})`}>
          <div className="flex gap-2 mb-6">
            {['All', 'Open', 'In Progress', 'Resolved'].map(s => (
              <button key={s} onClick={() => setFilter(s)} className={`px-6 py-2 text-sm rounded-3xl transition-all ${filter === s ? 'bg-slate-900 text-white' : 'bg-white border'}`}>{s}</button>
            ))}
          </div>
          {loading ? (
            <div className="flex justify-center py-16"><div className="animate-spin h-6 w-6 border-4 border-current border-t-transparent rounded-full"></div></div>
          ) : (
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-xs text-left text-slate-400">
                  <th className="pl-4 py-5 font-normal">SUBJECT</th>
                  <th className="py-5 font-normal">USER</th>
                  <th className="py-5 font-normal">CATEGORY</th>
                  <th className="py-5 font-normal">STATUS</th>
                  <th className="py-5 font-normal">UPDATED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b hover:bg-slate-50">
                    <td className="pl-4 py-5 font-medium">{ticket.title}</td>
                    <td className="py-5 text-sm text-slate-500">{ticket.username || 'Customer'}</td>
                    <td className="py-5"><span className="text-xs px-4 py-1 rounded-3xl bg-slate-100">{ticket.category || 'Uncategorized'}</span></td>
                    <td className="py-5"><StatusBadge status={ticket.status} /></td>
                    <td className="py-5 text-xs text-slate-400">{new Date(ticket.updated_at).toLocaleDateString()}</td>
                    <td className="pr-4 text-right">
                      <select value={ticket.status} onChange={(e) => handleStatusUpdate(ticket.id, e.target.value as any)} className="bg-transparent border border-slate-300 text-xs py-1 px-4 rounded-3xl">
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;