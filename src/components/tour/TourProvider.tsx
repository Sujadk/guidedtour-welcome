import { useEffect, useCallback } from 'react';
import { useTourState, useTourMutations, useIsFirstTimeUser } from '@/hooks/useTour';
import { TourTooltip } from './TourTooltip';
import { crmDashboardTour } from '@/config/tourSteps';
import { analytics } from '@/lib/analytics';

interface TourProviderProps {
  children: React.ReactNode;
}

export const TourProvider = ({ children }: TourProviderProps) => {
  const { data: tourState, isLoading } = useTourState();
  const { nextStep, previousStep, skipTour, completeTour, startTour } = useTourMutations();
  const isFirstTimeUser = useIsFirstTimeUser();

  const totalSteps = crmDashboardTour.steps.length;
  const currentStep = tourState?.currentStepIndex ?? 0;
  const currentStepConfig = crmDashboardTour.steps[currentStep];

  // Auto-start tour for first-time users
  useEffect(() => {
    if (!isLoading && isFirstTimeUser) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        startTour();
        analytics.trackTourStarted(crmDashboardTour.id, totalSteps);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isFirstTimeUser, startTour, totalSteps]);

  // Track step views
  useEffect(() => {
    if (tourState?.status === 'in_progress' && currentStepConfig) {
      analytics.trackStepViewed(
        crmDashboardTour.id,
        currentStepConfig.id,
        currentStep,
        totalSteps
      );
    }
  }, [tourState?.status, currentStep, currentStepConfig, totalSteps]);

  const handleNext = useCallback(() => {
    if (currentStepConfig) {
      analytics.trackStepCompleted(
        crmDashboardTour.id,
        currentStepConfig.id,
        currentStep,
        totalSteps
      );
    }
    nextStep(totalSteps);
  }, [currentStep, currentStepConfig, nextStep, totalSteps]);

  const handleSkip = useCallback(() => {
    if (currentStepConfig) {
      analytics.trackTourSkipped(
        crmDashboardTour.id,
        currentStepConfig.id,
        currentStep,
        totalSteps
      );
    }
    skipTour();
  }, [currentStep, currentStepConfig, skipTour, totalSteps]);

  const handleComplete = useCallback(() => {
    analytics.trackTourCompleted(crmDashboardTour.id, totalSteps);
    completeTour();
  }, [completeTour, totalSteps]);

  const showTour = tourState?.status === 'in_progress' && currentStepConfig;

  return (
    <>
      {children}
      {showTour && (
        <TourTooltip
          step={currentStepConfig}
          currentStep={currentStep}
          totalSteps={totalSteps}
          onNext={handleNext}
          onPrevious={previousStep}
          onSkip={handleSkip}
          onComplete={handleComplete}
        />
      )}
    </>
  );
};
