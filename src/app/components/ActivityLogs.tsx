import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

interface ActivityLog {
  id: string;
  action: string;
  userEmail: string;
  details: string;
  timestamp: string;
  type: 'user' | 'post' | 'system';
}

interface ActivityLogsProps {
  logs: ActivityLog[];
  onLoadMore: () => void;
  hasMore: boolean;
}

export function ActivityLogs({ logs, onLoadMore, hasMore }: ActivityLogsProps) {
  const [filterType, setFilterType] = useState<'all' | 'user' | 'post' | 'system'>('all');

  const filteredLogs = logs.filter(log => 
    filterType === 'all' ? true : log.type === filterType
  );

  const getActionColor = (type: string) => {
    switch (type) {
      case 'user': return 'text-blue-600';
      case 'post': return 'text-green-600';
      case 'system': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Activity Logs</CardTitle>
          <div className="flex space-x-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="rounded-md border border-gray-300 px-3 py-1"
            >
              <option value="all">All Activities</option>
              <option value="user">User Activities</option>
              <option value="post">Post Activities</option>
              <option value="system">System Activities</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredLogs.map((log) => (
            <div key={log.id} className="border-b pb-3 last:border-b-0">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`font-medium ${getActionColor(log.type)}`}>
                    {log.action}
                  </span>
                  <span className="text-gray-600 ml-2">by {log.userEmail}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{log.details}</p>
            </div>
          ))}
          
          {hasMore && (
            <div className="text-center pt-4">
              <button
                onClick={onLoadMore}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-600"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}