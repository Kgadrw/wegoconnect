import { useState, useEffect } from "react";
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, AlertTriangle, X, Wallet } from "lucide-react";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/priceFormatter";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { SkeletonCard, SkeletonTable, SkeletonChart } from "@/components/admin/SkeletonLoader";

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  recentOrders: any[];
  outOfStockProducts?: Array<{ _id: string; name: string }>;
  profit?: {
    total: number;
    today: number;
    month: number;
    year: number;
    daily: Array<{ _id: string; profit: number }>;
    monthly: Array<{ _id: string; profit: number }>;
  };
}

const AdminDashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await api.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return formatPrice(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "Good morning! Here's what's happening today.";
    } else if (hour >= 12 && hour < 17) {
      return "Good afternoon! Here's what's happening today.";
    } else if (hour >= 17 && hour < 21) {
      return "Good evening! Here's what's happening today.";
    } else {
      return "Good night! Here's what's happening today.";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Page Header Skeleton */}
        <div>
          <div className="h-9 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-64 animate-pulse"></div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        {/* Profit Analytics Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonCard />
          <SkeletonChart />
        </div>

        {/* Recent Orders Skeleton */}
        <SkeletonTable />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Failed to load statistics</p>
        </div>
      </div>
    );
  }

  const statsCards = [
    {
      label: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      label: "Total Profit",
      value: formatCurrency(stats.profit?.total || 0),
      icon: Wallet,
      color: "bg-emerald-500",
    },
    {
      label: "Today's Profit",
      value: formatCurrency(stats.profit?.today || 0),
      icon: TrendingUp,
      color: "bg-blue-500",
    },
    {
      label: "This Month's Profit",
      value: formatCurrency(stats.profit?.month || 0),
      icon: TrendingUp,
      color: "bg-purple-500",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: "bg-orange-500",
    },
    {
      label: "Products",
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      color: "bg-indigo-500",
    },
  ];

  const visibleOutOfStockProducts = stats.outOfStockProducts?.filter(
    (product) => !dismissedAlerts.has(product._id)
  ) || [];

  const handleDismissAlert = (productId: string) => {
    setDismissedAlerts((prev) => new Set(prev).add(productId));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">{getGreeting()}</p>
      </div>

      {/* Out of Stock Alerts */}
      {visibleOutOfStockProducts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h2 className="text-lg font-semibold text-red-900">
                Out of Stock Products
              </h2>
            </div>
            <span className="text-sm text-red-700">
              {visibleOutOfStockProducts.length} {visibleOutOfStockProducts.length === 1 ? 'product' : 'products'}
            </span>
          </div>
          <div className="space-y-2">
            {visibleOutOfStockProducts.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between bg-white rounded-lg p-3 border border-red-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">{product.name}</span>
                  <span className="text-xs text-red-600 font-semibold">OUT OF STOCK</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to="/admin/products"
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Manage Stock
                  </Link>
                  <button
                    onClick={() => handleDismissAlert(product._id)}
                    className="p-1 hover:bg-red-100 rounded transition-colors"
                    title="Dismiss"
                  >
                    <X className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Profit Analytics */}
      {stats.profit && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profit Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Profit Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Profit (All Time)</p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">
                    {formatCurrency(stats.profit.total)}
                  </p>
                </div>
                <Wallet className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-xs font-medium text-gray-600">Today</p>
                  <p className="text-lg font-bold text-blue-600 mt-1">
                    {formatCurrency(stats.profit.today)}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-xs font-medium text-gray-600">This Month</p>
                  <p className="text-lg font-bold text-purple-600 mt-1">
                    {formatCurrency(stats.profit.month)}
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-xs font-medium text-gray-600">This Year</p>
                  <p className="text-lg font-bold text-orange-600 mt-1">
                    {formatCurrency(stats.profit.year)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Profit Histogram */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Profit Report (Last 12 Months)</h2>
            {stats.profit.monthly && stats.profit.monthly.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart 
                  data={stats.profit.monthly.map((item: any) => ({
                    month: new Date(item._id + '-01').toLocaleDateString('en-US', { month: 'short' }),
                    year: new Date(item._id + '-01').getFullYear(),
                    profit: item.profit,
                    fullDate: new Date(item._id + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                  }))}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280"
                    fontSize={11}
                    tickLine={false}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(value) => {
                      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                      if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                      return value.toString();
                    }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '10px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label, payload) => payload?.[0]?.payload?.fullDate || label}
                  />
                  <Bar 
                    dataKey="profit" 
                    fill="#10b981" 
                    radius={[4, 4, 0, 0]}
                    name="Profit"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-8">No profit data available</p>
            )}
          </div>
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No recent orders
                  </td>
                </tr>
              ) : (
                stats.recentOrders.map((order: any) => (
                  <tr key={order._id || order.orderId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.items && order.items.length > 0
                        ? order.items[0].productName
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt || order.date)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
