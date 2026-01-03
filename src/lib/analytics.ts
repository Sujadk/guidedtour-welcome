import { TourAnalyticsEvent } from '@/types/tour';

class Analytics {
  private queue: TourAnalyticsEvent[] = [];

  track(event: TourAnalyticsEvent) {
    this.queue.push(event);
    
    // Log to console in development
    console.log('[Analytics]', event.event, {
      tourId: event.tourId,
      stepId: event.stepId,
      stepIndex: event.stepIndex,
      totalSteps: event.totalSteps,
      timestamp: event.timestamp
    });

    // In production, you would send to your analytics service
    // this.sendToService(event);
  }

  trackTourStarted(tourId: string, totalSteps: number) {
    this.track({
      event: 'tour_started',
      tourId,
      totalSteps,
      timestamp: new Date().toISOString()
    });
  }

  trackStepViewed(tourId: string, stepId: string, stepIndex: number, totalSteps: number) {
    this.track({
      event: 'tour_step_viewed',
      tourId,
      stepId,
      stepIndex,
      totalSteps,
      timestamp: new Date().toISOString()
    });
  }

  trackStepCompleted(tourId: string, stepId: string, stepIndex: number, totalSteps: number) {
    this.track({
      event: 'tour_step_completed',
      tourId,
      stepId,
      stepIndex,
      totalSteps,
      timestamp: new Date().toISOString()
    });
  }

  trackTourSkipped(tourId: string, stepId: string, stepIndex: number, totalSteps: number) {
    this.track({
      event: 'tour_skipped',
      tourId,
      stepId,
      stepIndex,
      totalSteps,
      timestamp: new Date().toISOString()
    });
  }

  trackTourCompleted(tourId: string, totalSteps: number) {
    this.track({
      event: 'tour_completed',
      tourId,
      totalSteps,
      timestamp: new Date().toISOString()
    });
  }

  getQueue() {
    return [...this.queue];
  }
}

export const analytics = new Analytics();
