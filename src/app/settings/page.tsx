import React from 'react';

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-12">Account Settings</h1>
      
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">First Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Doe"
              />
            </div>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Contact Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="emailNotifications" 
                className="mr-2"
              />
              <label htmlFor="emailNotifications">Receive email notifications</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="smsAlerts" 
                className="mr-2"
              />
              <label htmlFor="smsAlerts">Receive SMS alerts</label>
            </div>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Security</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Change Password
          </button>
        </section>
        
        <section className="text-center">
          <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300">
            Save Changes
          </button>
        </section>
      </div>
    </div>
  );
}