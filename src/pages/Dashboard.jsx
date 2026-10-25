import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  FileText, 
  Menu, 
  X, 
  ChevronLeft,
  ChevronRight,
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Download, 
  CheckCircle,
  PlusCircle
} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile drawer state
  const [isCollapsed, setIsCollapsed] = useState(false);   // Desktop sidebar collapse state

  // Navigation config
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'addClient', label: 'Add Client', icon: UserPlus },
    { id: 'viewClient', label: 'View Clients', icon: Users },
    { id: 'statement', label: 'Statement', icon: FileText },
  ];

  // Dummy Client Data
  const [clients, setClients] = useState([
    { id: 1, name: 'Aarav Sharma', email: 'aarav@example.com', phone: '+91 98765 43210', status: 'Active', amount: '₹45,000' },
    { id: 2, name: 'Priya Patel', email: 'priya@example.com', phone: '+91 98765 12345', status: 'Pending', amount: '₹12,500' },
    { id: 3, name: 'Rahul Verma', email: 'rahul@example.com', phone: '+91 98123 45678', status: 'Active', amount: '₹78,000' },
    { id: 4, name: 'Ananya Roy', email: 'ananya@example.com', phone: '+91 97111 22233', status: 'Inactive', amount: '₹0' },
  ]);

  // Dummy Statement Data
  const statements = [
    { id: 'TXN1001', date: '2026-10-24', client: 'Aarav Sharma', type: 'Credit', amount: '₹15,000', status: 'Completed' },
    { id: 'TXN1002', date: '2026-10-23', client: 'Priya Patel', type: 'Debit', amount: '₹2,500', status: 'Pending' },
    { id: 'TXN1003', date: '2026-10-22', client: 'Rahul Verma', type: 'Credit', amount: '₹28,000', status: 'Completed' },
    { id: 'TXN1004', date: '2026-10-20', client: 'Ananya Roy', type: 'Credit', amount: '₹5,000', status: 'Failed' },
  ];

  // Helper function to render view content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview setActiveTab={setActiveTab} clients={clients} statements={statements} />;
      case 'addClient':
        return <AddClientForm setClients={setClients} setActiveTab={setActiveTab} />;
      case 'viewClient':
        return <ViewClients clients={clients} setActiveTab={setActiveTab} />;
      case 'statement':
        return <StatementView statements={statements} />;
      default:
        return <DashboardOverview setActiveTab={setActiveTab} clients={clients} statements={statements} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800">
      
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between bg-slate-900 text-white p-4 sticky top-0 z-30 shadow-md">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">
            N
          </div>
          <span className="font-semibold text-lg tracking-wide">Admin Portal</span>
        </div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1 rounded-md hover:bg-slate-800 focus:outline-none"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Backdrop for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar Navigation */}
      <aside className={`
        fixed md:static top-0 left-0 z-50 h-full bg-slate-900 text-slate-300 flex flex-col justify-between p-4 transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'}
        ${isCollapsed ? 'md:w-20' : 'md:w-64'}
      `}>
        <div>
          {/* Logo / Brand Header & Collapse Toggle */}
          <div className="flex items-center justify-between px-2 py-3 mb-6 border-b border-slate-800">
            <div className={`flex items-center space-x-3 overflow-hidden ${isCollapsed ? 'md:hidden' : 'flex'}`}>
              <div className="w-9 h-9 shrink-0 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
                N
              </div>
              <div className="truncate">
                <h1 className="font-bold text-white tracking-wide text-sm">Admin Portal</h1>
                <p className="text-[11px] text-slate-400">Management Suite</p>
              </div>
            </div>

            {/* Collapsed Logo View */}
            <div className={`hidden ${isCollapsed ? 'md:flex' : 'md:hidden'} justify-center w-full`}>
              <div className="w-9 h-9 shrink-0 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
                N
              </div>
            </div>

            {/* Desktop Collapse Arrow Button */}
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition ml-auto"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  title={isCollapsed ? item.label : ''}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-3 rounded-xl font-medium text-sm transition-all duration-200 group relative
                    ${isActive 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold' 
                      : 'hover:bg-slate-800/80 hover:text-white text-slate-400'}
                  `}
                >
                  <Icon size={20} className={`shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                  <span className={`truncate transition-opacity duration-200 ${isCollapsed ? 'md:hidden' : 'block'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Admin User Footer Position */}
        <div className="border-t border-slate-800 pt-4 mt-auto">
          <div className="flex items-center space-x-3 px-2 py-2 overflow-hidden">
            <div className="w-9 h-9 shrink-0 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-200 shadow-sm">
              AD
            </div>
            <div className={`truncate transition-opacity duration-200 ${isCollapsed ? 'md:hidden' : 'block'}`}>
              <p className="text-sm font-semibold text-white truncate">Admin User</p>
              <p className="text-xs text-slate-400 truncate">admin@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {renderTabContent()}
        </div>
      </main>

    </div>
  );
}

/* ==========================================================================
   TAB 1: Dashboard Overview
   ========================================================================== */
function DashboardOverview({ setActiveTab, clients, statements }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
          <p className="text-sm text-slate-500">Welcome back! Here is what's happening today.</p>
        </div>
        <button 
          onClick={() => setActiveTab('addClient')}
          className="inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-indigo-500/20 transition"
        >
          <PlusCircle size={18} />
          <span>Add New Client</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Total Revenue</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900">₹1,35,500</span>
            <div className="flex items-center space-x-1 text-xs text-emerald-600 mt-1">
              <ArrowUpRight size={14} />
              <span>+12.5% from last month</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Active Clients</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900">{clients.length}</span>
            <div className="flex items-center space-x-1 text-xs text-indigo-600 mt-1">
              <ArrowUpRight size={14} />
              <span>+3 new this week</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Pending Payments</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <ArrowDownRight size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900">₹12,500</span>
            <div className="flex items-center space-x-1 text-xs text-amber-600 mt-1">
              <span>1 invoice overdue</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Completed Txns</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <CheckCircle size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900">42</span>
            <div className="flex items-center space-x-1 text-xs text-slate-500 mt-1">
              <span>100% success rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Recent Activity */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900">Recent Transactions</h3>
          <button 
            onClick={() => setActiveTab('statement')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View All
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {statements.slice(0, 3).map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between text-sm">
              <div>
                <p className="font-semibold text-slate-800">{item.client}</p>
                <p className="text-xs text-slate-400">{item.date} • {item.id}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900">{item.amount}</p>
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                  item.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   TAB 2: Add Client Component
   ========================================================================== */
function AddClientForm({ setClients, setActiveTab }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    status: 'Active',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newClient = {
      id: Date.now(),
      ...formData,
      amount: formData.amount ? `₹${Number(formData.amount).toLocaleString('en-IN')}` : '₹0'
    };

    setClients((prev) => [newClient, ...prev]);
    setActiveTab('viewClient');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Add New Client</h2>
        <p className="text-sm text-slate-500">Fill out the form below to register a new client.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
            Full Name
          </label>
          <input 
            type="text" 
            required
            placeholder="e.g. Rahul Sharma"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              required
              placeholder="rahul@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Phone Number
            </label>
            <input 
              type="tel" 
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Initial Amount (₹)
            </label>
            <input 
              type="number" 
              placeholder="10000"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm bg-white"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="pt-4 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setActiveTab('viewClient')}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow-md shadow-indigo-500/20 transition"
          >
            Save Client
          </button>
        </div>
      </form>
    </div>
  );
}

/* ==========================================================================
   TAB 3: View Clients Component
   ========================================================================== */
function ViewClients({ clients, setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Clients</h2>
          <p className="text-sm text-slate-500">Manage and view all registered clients.</p>
        </div>
        <button 
          onClick={() => setActiveTab('addClient')}
          className="inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-medium text-sm shadow-md shadow-indigo-500/20 transition"
        >
          <UserPlus size={18} />
          <span>Add Client</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search client by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
          />
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3.5 px-5">Client Name</th>
                <th className="py-3.5 px-5">Contact Details</th>
                <th className="py-3.5 px-5">Balance / Amount</th>
                <th className="py-3.5 px-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 px-5 font-semibold text-slate-800">
                      {client.name}
                    </td>
                    <td className="py-4 px-5">
                      <p className="text-slate-700">{client.email}</p>
                      <p className="text-xs text-slate-400">{client.phone}</p>
                    </td>
                    <td className="py-4 px-5 font-semibold text-slate-900">
                      {client.amount}
                    </td>
                    <td className="py-4 px-5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        client.status === 'Active' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : client.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-slate-400">
                    No clients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   TAB 4: Statement Component
   ========================================================================== */
function StatementView({ statements }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Account Statements</h2>
          <p className="text-sm text-slate-500">View transaction history and download reports.</p>
        </div>
        <button className="inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl font-medium text-sm shadow-sm transition">
          <Download size={18} />
          <span>Export Statement</span>
        </button>
      </div>

      {/* Statement Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3.5 px-5">Txn ID</th>
                <th className="py-3.5 px-5">Date</th>
                <th className="py-3.5 px-5">Client</th>
                <th className="py-3.5 px-5">Type</th>
                <th className="py-3.5 px-5">Amount</th>
                <th className="py-3.5 px-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {statements.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-4 px-5 font-mono text-xs font-medium text-slate-600">
                    {txn.id}
                  </td>
                  <td className="py-4 px-5 text-slate-600">{txn.date}</td>
                  <td className="py-4 px-5 font-semibold text-slate-800">{txn.client}</td>
                  <td className="py-4 px-5">
                    <span className={`text-xs font-semibold ${
                      txn.type === 'Credit' ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {txn.type}
                    </span>
                  </td>
                  <td className="py-4 px-5 font-semibold text-slate-900">{txn.amount}</td>
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      txn.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : txn.status === 'Pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}