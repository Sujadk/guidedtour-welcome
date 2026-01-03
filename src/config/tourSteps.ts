import { TourConfig } from '@/types/tour';

export const crmDashboardTour: TourConfig = {
  id: 'crm-dashboard-onboarding',
  name: 'CRM Dashboard Onboarding',
  steps: [
    {
      id: 'welcome',
      targetSelector: '[data-tour="dashboard-header"]',
      title: 'Welcome to Your CRM! 👋',
      content: 'This is your command center for managing customer relationships. Let us show you around the key features.',
      position: 'bottom',
      spotlightPadding: 8,
      ariaLabel: 'Welcome to CRM dashboard introduction'
    },
    {
      id: 'sidebar-navigation',
      targetSelector: '[data-tour="sidebar-nav"]',
      title: 'Quick Navigation',
      content: 'Access all your CRM modules from here — Contacts, Deals, Tasks, and Reports are just a click away.',
      position: 'right',
      spotlightPadding: 4,
      ariaLabel: 'Sidebar navigation explanation'
    },
    {
      id: 'stats-overview',
      targetSelector: '[data-tour="stats-cards"]',
      title: 'Key Metrics at a Glance',
      content: 'Track your most important metrics here. See total contacts, active deals, revenue, and tasks in real-time.',
      position: 'bottom',
      spotlightPadding: 8,
      ariaLabel: 'Statistics overview explanation'
    },
    {
      id: 'contacts-table',
      targetSelector: '[data-tour="contacts-table"]',
      title: 'Your Contact List',
      content: 'View and manage all your contacts. Click any row to see full details, or use the search to find specific people.',
      position: 'top',
      spotlightPadding: 8,
      ariaLabel: 'Contacts table explanation'
    },
    {
      id: 'quick-actions',
      targetSelector: '[data-tour="quick-actions"]',
      title: 'Quick Actions',
      content: 'Need to add a new contact or deal? Use these quick action buttons to get started right away.',
      position: 'left',
      spotlightPadding: 8,
      ariaLabel: 'Quick actions explanation'
    }
  ]
};
