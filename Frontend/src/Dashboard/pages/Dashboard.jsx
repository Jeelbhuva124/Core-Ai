import { motion } from 'framer-motion';
import { Users, Package, ShoppingCart, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '1,284', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Total Products', value: '348', icon: Package, color: 'text-violet-500', bg: 'bg-violet-500/10' },
  { label: 'Total Orders', value: '2,951', icon: ShoppingCart, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'Revenue', value: '₹4,82,500', icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-500/10' },
];

export const Dashboard = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground font-medium">{stat.label}</span>
                <div className={`p-2 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity Placeholder */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
                <div className="flex-1 space-y-1">
                  <div className="h-3 bg-muted rounded animate-pulse w-1/3" />
                  <div className="h-2 bg-muted rounded animate-pulse w-1/4" />
                </div>
                <div className="h-3 bg-muted rounded animate-pulse w-16" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
