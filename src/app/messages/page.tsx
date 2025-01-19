import React from 'react';

export default function MessagesPage() {
  const messages = [
    {
      id: 1,
      sender: 'Financial Advisor',
      subject: 'Investment Portfolio Review',
      preview: 'We noticed some opportunities for rebalancing your current investment strategy...',
      date: '2024-01-15',
      unread: true
    },
    {
      id: 2,
      sender: 'Account Services',
      subject: 'Annual Tax Document Ready',
      preview: 'Your annual tax summary is now available in the document vault...',
      date: '2024-01-10',
      unread: false
    },
    {
      id: 3,
      sender: 'Retirement Planning Team',
      subject: 'Upcoming Retirement Consultation',
      preview: 'We would like to schedule your annual retirement planning session...',
      date: '2024-01-05',
      unread: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-12">Messages</h1>
      
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`p-4 border-b flex justify-between items-center ${message.unread ? 'bg-blue-50' : 'bg-white'} hover:bg-gray-100 transition duration-300`}
          >
            <div>
              <div className="flex items-center">
                <h3 className="font-semibold mr-2">{message.sender}</h3>
                {message.unread && <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">New</span>}
              </div>
              <h4 className="text-gray-700 font-medium">{message.subject}</h4>
              <p className="text-gray-500 text-sm">{message.preview}</p>
            </div>
            <span className="text-gray-500 text-sm">{message.date}</span>
          </div>
        ))}
        
        <div className="p-4 text-center">
          <button className="text-blue-600 hover:underline">
            View All Messages
          </button>
        </div>
      </div>
    </div>
  );
}