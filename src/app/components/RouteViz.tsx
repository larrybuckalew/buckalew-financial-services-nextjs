import React, { useState } from 'react';

const RouteViz = () => {
  const [activeTab, setActiveTab] = useState('conflicts');
  
  const routeData = {
    app: [
      { path: '/', component: 'page.tsx' },
      { path: '/medicare', component: 'page.tsx' },
      { path: '/insurance', component: 'page.tsx' }
    ],
    pages: [
      { path: '/index.tsx', component: 'index.tsx' },
      { path: '/medicare.tsx', component: 'medicare.tsx' },
      { path: '/insurance.tsx', component: 'insurance.tsx' }
    ]
  };

  const conflicts = routeData.app.filter(appRoute => 
    routeData.pages.some(pageRoute => 
      pageRoute.path.replace('.tsx', '').replace('/index', '') === appRoute.path
    )
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 text-blue-500 font-bold">📁</div>
        <h2 className="text-xl font-semibold">Route Migration Dashboard</h2>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab('conflicts')}
          className={`px-4 py-2 rounded ${
            activeTab === 'conflicts' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100'
          }`}
        >
          Conflicts ({conflicts.length})
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded ${
            activeTab === 'all' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100'
          }`}
        >
          All Routes
        </button>
      </div>

      {activeTab === 'conflicts' ? (
        <div className="space-y-4">
          <h3 className="font-medium">Route Conflicts to Resolve:</h3>
          {conflicts.map((route, idx) => (
            <div key={idx} className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="font-medium text-yellow-800">
                Duplicate Route: {route.path}
              </p>
              <div className="mt-2 text-sm">
                <p>App Dir: {route.component}</p>
                <p>Pages Dir: {
                  routeData.pages.find(p => 
                    p.path.replace('.tsx', '').replace('/index', '') === route.path
                  )?.component
                }</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">App Directory Routes</h3>
            <div className="space-y-2">
              {routeData.app.map((route, idx) => (
                <div key={idx} className="p-2 bg-gray-50 rounded">
                  {route.path} → {route.component}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Pages Directory Routes</h3>
            <div className="space-y-2">
              {routeData.pages.map((route, idx) => (
                <div key={idx} className="p-2 bg-gray-50 rounded">
                  {route.path}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteViz;