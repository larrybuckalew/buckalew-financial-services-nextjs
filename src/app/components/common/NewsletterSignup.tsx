import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (!response.ok) throw new Error();
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">Subscribe to Our Newsletter</h3>
      <p className="text-gray-600 mb-4">Get the latest insurance tips and updates.</p>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
      
      {status === 'success' && (
        <p className="text-green-600 mt-2">Successfully subscribed!</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 mt-2">Failed to subscribe. Please try again.</p>
      )}
    </div>
  );
}