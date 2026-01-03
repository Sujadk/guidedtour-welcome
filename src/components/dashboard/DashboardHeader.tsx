import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const DashboardHeader = () => {
  return (
    <header 
      className="flex items-center justify-between py-4 px-6 border-b border-border bg-card/50"
      data-tour="dashboard-header"
    >
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Welcome back, John! 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Here's what's happening with your CRM today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search contacts, deals..." 
            className="pl-10 w-64 bg-muted/50 border-border focus:bg-background"
          />
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>
      </div>
    </header>
  );
};
