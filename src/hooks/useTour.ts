import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TourState, TourStatus } from '@/types/tour';

const TOUR_STORAGE_KEY = 'crm_tour_state';

const defaultTourState: TourState = {
  status: 'not_started',
  currentStepIndex: 0,
  tourId: 'crm-dashboard-onboarding'
};

const getTourState = (): TourState => {
  try {
    const stored = localStorage.getItem(TOUR_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading tour state:', error);
  }
  return defaultTourState;
};

const saveTourState = (state: TourState): TourState => {
  try {
    localStorage.setItem(TOUR_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving tour state:', error);
  }
  return state;
};

export const useTourState = () => {
  return useQuery({
    queryKey: ['tourState'],
    queryFn: getTourState,
    staleTime: Infinity
  });
};

export const useTourMutations = () => {
  const queryClient = useQueryClient();

  const updateTourState = useMutation({
    mutationFn: (updates: Partial<TourState>) => {
      const currentState = getTourState();
      const newState = { ...currentState, ...updates };
      return Promise.resolve(saveTourState(newState));
    },
    onSuccess: (newState) => {
      queryClient.setQueryData(['tourState'], newState);
    }
  });

  const startTour = () => {
    updateTourState.mutate({
      status: 'in_progress',
      currentStepIndex: 0,
      startedAt: new Date().toISOString(),
      completedAt: undefined,
      skippedAt: undefined
    });
  };

  const nextStep = (totalSteps: number) => {
    const currentState = getTourState();
    const nextIndex = currentState.currentStepIndex + 1;
    
    if (nextIndex >= totalSteps) {
      updateTourState.mutate({
        status: 'completed',
        currentStepIndex: totalSteps - 1,
        completedAt: new Date().toISOString()
      });
    } else {
      updateTourState.mutate({
        currentStepIndex: nextIndex
      });
    }
  };

  const previousStep = () => {
    const currentState = getTourState();
    const prevIndex = Math.max(0, currentState.currentStepIndex - 1);
    updateTourState.mutate({
      currentStepIndex: prevIndex
    });
  };

  const skipTour = () => {
    updateTourState.mutate({
      status: 'skipped',
      skippedAt: new Date().toISOString()
    });
  };

  const completeTour = () => {
    updateTourState.mutate({
      status: 'completed',
      completedAt: new Date().toISOString()
    });
  };

  const restartTour = () => {
    updateTourState.mutate({
      status: 'in_progress',
      currentStepIndex: 0,
      startedAt: new Date().toISOString(),
      completedAt: undefined,
      skippedAt: undefined
    });
  };

  const resetTour = () => {
    updateTourState.mutate(defaultTourState);
  };

  return {
    updateTourState,
    startTour,
    nextStep,
    previousStep,
    skipTour,
    completeTour,
    restartTour,
    resetTour
  };
};

export const useIsFirstTimeUser = () => {
  const { data: tourState } = useTourState();
  return tourState?.status === 'not_started';
};
