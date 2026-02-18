import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Car Management', path: '/cars', icon: '🚗' },
    { name: 'Package Management', path: '/packages', icon: '📦' },
    { name: 'Service Package', path: '/services', icon: '🧼' },
    { name: 'Payment Management', path: '/payments', icon: '💳' },
    { name: 'Reports', path: '/reports', icon: '📈' },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar - Mobile */}
      <nav className="bg-blue-600 text-white p-4 lg:hidden">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">CWSMS</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar - Desktop & Mobile */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-blue-800 text-white transition-transform duration-300 ease-in-out`}
        >
          {/* Logo Section */}
          <div className="p-6 bg-blue-900">
            <h1 className="text-2xl font-bold text-center">CWSMS</h1>
            <p className="text-xs text-center text-blue-300 mt-1">Car Wash Sales System</p>
          </div>

          {/* Navigation Menu */}
          <nav className="mt-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-6 py-3 transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'bg-blue-700 border-l-4 border-white'
                    : 'hover:bg-blue-700'
                }`}
              >
                <span className="text-2xl mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-6 py-3 mt-6 text-left hover:bg-red-700 transition-colors duration-200"
            >
              <span className="text-2xl mr-3">🚪</span>
              <span className="font-medium">Logout</span>
            </button>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
