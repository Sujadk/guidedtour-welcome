import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CheckSquare, 
  BarChart3, 
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useTourMutations, useTourState } from '@/hooks/useTour';
import { analytics } from '@/lib/analytics';
import { crmDashboardTour } from '@/config/tourSteps';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Users, label: 'Contacts' },
  { icon: Briefcase, label: 'Deals' },
  { icon: CheckSquare, label: 'Tasks' },
  { icon: BarChart3, label: 'Reports' },
];

export const Sidebar = () => {
  const { restartTour } = useTourMutations();
  const { data: tourState } = useTourState();

  const handleRestartTour = () => {
    restartTour();
    analytics.trackTourStarted(crmDashboardTour.id, crmDashboardTour.steps.length);
  };

  const canRestartTour = tourState?.status === 'completed' || tourState?.status === 'skipped';

  return (
    <aside 
      className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen"
      data-tour="sidebar-nav"
    >
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-lg">C</span>
          </div>
          <span className="font-display font-semibold text-lg text-sidebar-foreground">
            CRM Pro
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  item.active
                    ? 'bg-sidebar-accent text-sidebar-primary'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all">
              <HelpCircle className="w-5 h-5" />
              Help & Support
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>Documentation</DropdownMenuItem>
            <DropdownMenuItem>Contact Support</DropdownMenuItem>
            {canRestartTour && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleRestartTour}>
                  Restart Onboarding Tour
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all">
          <Settings className="w-5 h-5" />
          Settings
        </button>
      </div>

      {/* User */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-medium">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john@company.com</p>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
};
