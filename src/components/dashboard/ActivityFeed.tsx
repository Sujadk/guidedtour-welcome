import { MessageSquare, Phone, Mail, CheckCircle } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'call',
    icon: Phone,
    title: 'Call with Sarah Johnson',
    description: 'Discussed Q2 expansion plans',
    time: '30 min ago',
    color: 'text-success'
  },
  {
    id: 2,
    type: 'email',
    icon: Mail,
    title: 'Email sent to Michael Chen',
    description: 'Proposal for TechStart project',
    time: '2 hours ago',
    color: 'text-info'
  },
  {
    id: 3,
    type: 'task',
    icon: CheckCircle,
    title: 'Task completed',
    description: 'Follow up with Global Enterprise',
    time: '4 hours ago',
    color: 'text-primary'
  },
  {
    id: 4,
    type: 'note',
    icon: MessageSquare,
    title: 'Note added',
    description: 'Updated pricing for Innovate Co deal',
    time: 'Yesterday',
    color: 'text-warning'
  }
];

export const ActivityFeed = () => {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <h3 className="font-display font-semibold text-foreground mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className={`p-2 rounded-lg bg-muted ${activity.color}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{activity.title}</p>
              <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
