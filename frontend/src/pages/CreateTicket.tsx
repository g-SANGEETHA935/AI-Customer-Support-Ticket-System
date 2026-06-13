import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ticketsAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

const CreateTicket: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await ticketsAPI.createTicket(title, description);
      toast.success('Ticket created successfully! Our AI is analyzing it now.');
      navigate('/my-tickets');
    } catch (error) {
      toast.error('Failed to create ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 pt-24 max-w-3xl mx-auto">
      <div className="max-w-2xl">
        <div className="mb-8">
          <div className="uppercase font-mono text-xs tracking-[2px] text-violet-600">NEW REQUEST</div>
          <h1 className="text-5xl font-semibold tracking-tighter">Create a Support Ticket</h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">Describe your issue. Our AI will automatically categorize and suggest solutions.</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-8">
            <Input
              label="Ticket Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cannot access my billing dashboard"
              required
            />

            <div>
              <label className="text-sm font-medium text-slate-700 block mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-48 resize-y min-h-[160px] rounded-3xl border border-slate-200 p-6 focus:outline-none focus:border-violet-400 text-slate-700 placeholder:text-slate-400"
                placeholder="Please provide as much detail as possible..."
                required
              />
              <div className="text-xs text-slate-400 mt-3 flex items-center gap-2">
                <div className="px-2.5 py-1 bg-slate-100 rounded">AI will categorize this automatically</div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/my-tickets')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting Ticket...' : 'Create Ticket'}
              </Button>
            </div>
          </form>
        </Card>

        <div className="mt-8 text-xs text-center text-slate-400">
          All tickets are processed with our AI classification engine
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;