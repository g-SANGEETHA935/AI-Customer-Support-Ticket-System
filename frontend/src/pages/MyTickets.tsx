import React, { useEffect, useState } from 'react';
import { Ticket } from '../types';
import { ticketsAPI } from '../utils/api';
import toast from 'react-hot-toast';
import StatusBadge from '../components/StatusBadge';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Card } from '../components/ui/Card';

const MyTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data: Ticket[] = await ticketsAPI.getTickets();
      setTickets(data);
      setFilteredTickets(data);
    } catch (err) {
      toast.error('Failed to fetch your tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    let result = [...tickets];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(term) ||
          t.description.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'All') {
      result = result.filter((t) => t.status === statusFilter);
    }

    setFilteredTickets(result);
  }, [searchTerm, statusFilter, tickets]);

  const handleStatusChange = async (id: number, newStatus: 'Open' | 'In Progress' | 'Resolved') => {
    try {
      await ticketsAPI.updateTicket(id, { status: newStatus });
      toast.success(`Ticket status updated to ${newStatus}`);
      fetchTickets();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-semibold text-4xl tracking-tight">My Tickets</h1>
            <p className="text-slate-500">Manage and track all your support requests</p>
          </div>
          
          <Link
            to="/create-ticket"
            className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl text-sm inline-flex items-center gap-2 font-medium"
          >
            + New Ticket
          </Link>
        </div>

        <Card>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tickets by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 border border-slate-200 rounded-3xl py-3.5 px-5 focus:outline-none focus:border-violet-400"
              />
            </div>
            
            <div className="w-64">
              <div className="flex items-center gap-2 border border-slate-200 rounded-3xl px-5 h-[52px]">
                <Filter className="text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="flex-1 bg-transparent focus:outline-none text-sm"
                >
                  <option value="All">All Statuses</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="py-20 flex justify-center">
              <div className="h-7 w-7 border-4 border-violet-400 border-t-transparent animate-spin rounded-full"></div>
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-6">
                📭
              </div>
              <p className="text-xl font-medium text-slate-400">No tickets found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-xs uppercase tracking-wider text-slate-500">
                    <th className="py-5 px-6 font-normal">Ticket</th>
                    <th className="py-5 px-6 font-normal">Category</th>
                    <th className="py-5 px-6 font-normal">Status</th>
                    <th className="py-5 px-6 font-normal">Last Updated</th>
                    <th className="py-5 px-6 font-normal w-40">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-slate-50 dark:hover:bg-slate-900 group">
                      <td className="py-6 px-6">
                        <div className="font-medium text-slate-900 dark:text-white">{ticket.title}</div>
                        <div className="text-xs text-slate-500 line-clamp-1 mt-px pr-6">{ticket.description}</div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="inline-block text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 px-3 py-1 rounded-3xl">
                          {ticket.category || 'General'}
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <StatusBadge status={ticket.status} />
                      </td>
                      <td className="py-6 px-6 text-xs text-slate-500">
                        {new Date(ticket.updated_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-6 px-6">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/ticket/${ticket.id}`}
                            className="text-xs bg-white border border-slate-300 hover:border-violet-300 px-5 py-2 rounded-3xl transition-colors"
                          >
                            View
                          </Link>
                          {ticket.status !== 'Resolved' && (
                            <select
                              onChange={(e) => handleStatusChange(ticket.id, e.target.value as any)}
                              className="bg-white border border-transparent hover:border-slate-300 text-xs py-2 px-3 rounded-3xl cursor-pointer"
                              value={ticket.status}
                            >
                              <option value="Open">Open</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MyTickets;