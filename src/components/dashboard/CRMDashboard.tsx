import { Sidebar } from './Sidebar';
import { DashboardHeader } from './DashboardHeader';
import { StatsCards } from './StatsCards';
import { ContactsTable } from './ContactsTable';
import { QuickActions } from './QuickActions';
import { ActivityFeed } from './ActivityFeed';

export const CRMDashboard = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats */}
            <StatsCards />

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Contacts table - spans 3 columns */}
              <div className="lg:col-span-3">
                <ContactsTable />
              </div>

              {/* Right sidebar */}
              <div className="space-y-6">
                <QuickActions />
                <ActivityFeed />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
