import React from 'react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
        
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
            <input 
              type="text" 
              id="name" 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
              required 
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your.email@example.com"
              required 
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="(123) 456-7890"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
            <textarea 
              id="message" 
              rows={4}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="How can we help you today?"
              required
            ></textarea>
          </div>
          
          <div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <p className="text-gray-700">📞 Phone: (555) 123-4567</p>
          <p className="text-gray-700">📧 Email: info@buckalew-financial.com</p>
          <p className="text-gray-700">📍 Address: 123 Financial Ave, Suite 500, Metropolis, ST 12345</p>
        </div>
      </div>
    </div>
  );
}