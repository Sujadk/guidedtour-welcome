# Guided Welcome - Interactive User Onboarding System

A modern, accessible, and customizable user onboarding system built with React, TypeScript, and Tailwind CSS. This project provides an interactive guided tour experience for CRM dashboard applications with spotlight effects, tooltips, and step-by-step navigation.

## 🚀 Features

- **Interactive Guided Tours**: Step-by-step guided tours with customizable tooltips and spotlight effects
- **CRM Dashboard Demo**: Fully functional CRM dashboard demonstration including:
  - Key metrics and statistics cards
  - Activity feed with real-time updates
  - Contacts table with management features
  - Quick actions panel
  - Responsive sidebar navigation
- **Accessibility First**: Built with ARIA labels, keyboard navigation, and screen reader support
- **Analytics Integration**: Track user interactions and tour completion rates
- **Customizable Tour Steps**: Easy-to-configure tour steps with flexible positioning
- **Modern UI Components**: 40+ shadcn/ui components for consistent design
- **Responsive Design**: Mobile-first approach that works on all screen sizes
- **Type-Safe**: Full TypeScript implementation for better developer experience

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom configuration
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Notifications**: Sonner for toast notifications

## 📦 Installation

### Prerequisites

- Node.js 16+ or Bun runtime
- npm or Bun package manager

### Setup Instructions

1. **Clone the repository**

```bash
git clone <YOUR_GIT_URL>
cd guided-welcome
```

2. **Install dependencies**

```bash
# Using npm
npm install

# Or using Bun
bun install
```

3. **Start the development server**

```bash
# Using npm
npm run dev

# Or using Bun
bun run dev
```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

## 🏗️ Project Structure

```
guided-welcome/
├── src/
│   ├── components/          # React components
│   │   ├── dashboard/       # CRM dashboard components
│   │   ├── tour/           # Tour provider and tooltip components
│   │   └── ui/             # Reusable UI components (shadcn/ui)
│   ├── config/             # Configuration files
│   │   └── tourSteps.ts    # Tour step definitions
│   ├── hooks/              # Custom React hooks
│   │   ├── useTour.ts      # Tour state management
│   │   └── use-mobile.tsx  # Responsive utilities
│   ├── lib/                # Utility libraries
│   │   ├── analytics.ts    # Analytics tracking
│   │   └── utils.ts        # Helper functions
│   ├── pages/              # Page components
│   ├── types/              # TypeScript type definitions
│   └── App.tsx             # Main application component
├── public/                 # Static assets
└── Configuration files     # Vite, TypeScript, Tailwind, ESLint
```

## 🎯 Usage

### Creating a Custom Tour

1. **Define your tour steps** in `src/config/tourSteps.ts`:

```typescript
import { TourConfig } from "@/types/tour";

export const myCustomTour: TourConfig = {
  id: "my-custom-tour",
  name: "My Custom Tour",
  steps: [
    {
      id: "step-1",
      targetSelector: '[data-tour="element-1"]',
      title: "Welcome!",
      content: "This is your first tour step.",
      position: "bottom",
      spotlightPadding: 8,
      ariaLabel: "Welcome step",
    },
    // Add more steps...
  ],
};
```

2. **Add tour attributes** to your HTML elements:

```tsx
<div data-tour="element-1">Your content here</div>
```

3. **Use the TourProvider** to wrap your components:

```tsx
import { TourProvider } from "@/components/tour/TourProvider";
import { myCustomTour } from "@/config/tourSteps";

function MyApp() {
  return (
    <TourProvider config={myCustomTour}>{/* Your app content */}</TourProvider>
  );
}
```

### Analytics Integration

Track user interactions and tour progress:

```typescript
import { trackTourEvent } from "@/lib/analytics";

// Track tour completion
trackTourEvent("tour_completed", {
  tourId: "crm-dashboard-onboarding",
  completionTime: 120,
});
```

## 🎨 Customization

### Styling

The project uses Tailwind CSS for styling. Customize the theme in `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        // Add your custom colors
      },
    },
  },
};
```

### Tour Tooltip Appearance

Modify the tooltip styles in `src/components/tour/TourTooltip.tsx`.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development environment
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🧪 Tour Features

- **Spotlight Effect**: Highlights target elements with customizable padding
- **Smart Positioning**: Automatically positions tooltips (top, bottom, left, right)
- **Progress Tracking**: Visual progress indicator showing current step
- **Keyboard Navigation**: Navigate with arrow keys and Escape to exit
- **Mobile Responsive**: Adapts to different screen sizes
- **Skip/Complete Options**: Users can skip or complete tours at any time
- **Step Validation**: Ensures target elements exist before showing tooltips

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## 🔗 Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)



