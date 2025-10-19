'use client';
import { useState } from 'react';
import AdminStats from './components/AdminStats';
import UserManagement from './components/UserManagement';
import AuditLogs from './components/AuditLogs';
import SystemSettings from './components/SystemSettings';
import QuoteManagement from './components/QuoteManagement';
export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const tabs = [
        { id: 'overview', label: 'Overview', icon: '📊', component: <AdminStats /> },
        { id: 'quotes', label: 'Quote Management', icon: '📋', component: <QuoteManagement /> },
        { id: 'users', label: 'User Management', icon: '👥', component: <UserManagement /> },
        { id: 'audit', label: 'Audit Logs', icon: '📝', component: <AuditLogs /> },
        { id: 'settings', label: 'System Settings', icon: '⚙️', component: <SystemSettings /> }
    ];
    return (<div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, Administrator</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {tabs.find(tab => tab.id === activeTab)?.component}
          </div>
        </div>
      </div>
    </div>);
}
