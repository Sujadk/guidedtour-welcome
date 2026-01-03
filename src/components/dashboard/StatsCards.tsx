import { Users, Briefcase, DollarSign, CheckSquare, TrendingUp, TrendingDown } from 'lucide-react';

const stats = [
  {
    label: 'Total Contacts',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'primary'
  },
  {
    label: 'Active Deals',
    value: '142',
    change: '+8.2%',
    trend: 'up',
    icon: Briefcase,
    color: 'info'
  },
  {
    label: 'Revenue',
    value: '$482,390',
    change: '+23.1%',
    trend: 'up',
    icon: DollarSign,
    color: 'success'
  },
  {
    label: 'Pending Tasks',
    value: '38',
    change: '-5.4%',
    trend: 'down',
    icon: CheckSquare,
    color: 'warning'
  }
];

const colorClasses = {
  primary: 'text-primary bg-primary/10',
  info: 'text-info bg-info/10',
  success: 'text-success bg-success/10',
  warning: 'text-warning bg-warning/10'
};

export const StatsCards = () => {
  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      data-tour="stats-cards"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="stat-card group">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              stat.trend === 'up' ? 'text-success' : 'text-destructive'
            }`}>
              {stat.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {stat.change}
            </div>
          </div>
          <p className="text-2xl font-display font-bold text-foreground mb-1">
            {stat.value}
          </p>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};
