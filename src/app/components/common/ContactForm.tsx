import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredContact: 'email'
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error();
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        preferredContact: 'email'
      });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Preferred Contact Method</label>
        <select
          value={formData.preferredContact}
          onChange={(e) => setFormData({...formData, preferredContact: e.target.value})}
          className="w-full p-2 border rounded"
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          required
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className="w-full p-2 border rounded h-32"
        />
      </div>

      <Button 
        type="submit" 
        disabled={status === 'loading'}
        className="w-full"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </Button>

      {status === 'success' && (
        <p className="text-green-600">Message sent successfully!</p>
      )}
      {status === 'error' && (
        <p className="text-red-600">Failed to send message. Please try again.</p>
      )}
    </form>
  );
}