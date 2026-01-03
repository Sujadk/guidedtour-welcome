import { CRMDashboard } from '@/components/dashboard/CRMDashboard';
import { TourProvider } from '@/components/tour/TourProvider';

const Index = () => {
  return (
    <TourProvider>
      <CRMDashboard />
    </TourProvider>
  );
};

export default Index;
