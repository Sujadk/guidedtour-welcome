export type TourStatus = 'not_started' | 'in_progress' | 'skipped' | 'completed';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TourStep {
  id: string;
  targetSelector: string;
  title: string;
  content: string;
  position: TooltipPosition;
  spotlightPadding?: number;
  ariaLabel?: string;
}

export interface TourConfig {
  id: string;
  name: string;
  steps: TourStep[];
}

export interface TourState {
  status: TourStatus;
  currentStepIndex: number;
  tourId: string;
  startedAt?: string;
  completedAt?: string;
  skippedAt?: string;
}

export interface TourAnalyticsEvent {
  event: 'tour_started' | 'tour_step_viewed' | 'tour_step_completed' | 'tour_skipped' | 'tour_completed';
  tourId: string;
  stepId?: string;
  stepIndex?: number;
  totalSteps?: number;
  timestamp: string;
}
