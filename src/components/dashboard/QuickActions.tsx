import { Plus, UserPlus, Briefcase, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const actions = [
  { icon: UserPlus, label: 'Add Contact', variant: 'default' as const },
  { icon: Briefcase, label: 'New Deal', variant: 'secondary' as const },
  { icon: Calendar, label: 'Schedule', variant: 'secondary' as const },
  { icon: FileText, label: 'Create Note', variant: 'secondary' as const },
];

export const QuickActions = () => {
  return (
    <div 
      className="bg-card border border-border rounded-xl p-4"
      data-tour="quick-actions"
    >
      <h3 className="font-display font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="space-y-2">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            className={`w-full justify-start gap-3 ${
              action.variant === 'default' 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                : ''
            }`}
          >
            <action.icon className="w-4 h-4" />
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
