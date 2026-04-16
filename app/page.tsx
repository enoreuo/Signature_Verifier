'use client';

import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'success' | 'error' | null>(null); // 'success', 'error', or null
  const [message, setMessage] = useState('');

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    setMessage('Verifying...');

    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, code }),
    });

    const data = await response.json();
    
    if (data.success) {
      setStatus('success');
      setMessage(data.message);
    } else {
      setStatus('error');
      setMessage(data.message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-gray-800">
        <h1 className="text-2xl font-bold mb-6 text-center">Verify Signature</h1>
        
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Your Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Secret Code</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter the secret code"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Verify
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-md text-center font-medium ${
            status === 'success' ? 'bg-green-100 text-green-700' : 
            status === 'error' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
          }`}>
            {message}
          </div>
        )}
      </div>
    </main>
  );
}