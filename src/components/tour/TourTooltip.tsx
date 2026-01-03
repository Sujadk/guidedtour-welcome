import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { TourStep, TooltipPosition } from '@/types/tour';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface TourTooltipProps {
  step: TourStep;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onComplete: () => void;
}

interface Position {
  top: number;
  left: number;
  arrowPosition: TooltipPosition;
}

export const TourTooltip = ({
  step,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSkip,
  onComplete
}: TourTooltipProps) => {
  const [position, setPosition] = useState<Position | null>(null);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  useEffect(() => {
    const calculatePosition = () => {
      const target = document.querySelector(step.targetSelector);
      if (!target || !tooltipRef.current) {
        setPosition(null);
        setTargetRect(null);
        return;
      }

      const targetBounds = target.getBoundingClientRect();
      const tooltipBounds = tooltipRef.current.getBoundingClientRect();
      const padding = step.spotlightPadding ?? 8;
      const offset = 16;

      setTargetRect(targetBounds);

      let top = 0;
      let left = 0;
      let arrowPosition = step.position;

      switch (step.position) {
        case 'top':
          top = targetBounds.top - tooltipBounds.height - offset - padding;
          left = targetBounds.left + (targetBounds.width - tooltipBounds.width) / 2;
          break;
        case 'bottom':
          top = targetBounds.bottom + offset + padding;
          left = targetBounds.left + (targetBounds.width - tooltipBounds.width) / 2;
          break;
        case 'left':
          top = targetBounds.top + (targetBounds.height - tooltipBounds.height) / 2;
          left = targetBounds.left - tooltipBounds.width - offset - padding;
          break;
        case 'right':
          top = targetBounds.top + (targetBounds.height - tooltipBounds.height) / 2;
          left = targetBounds.right + offset + padding;
          break;
      }

      // Boundary checks
      const margin = 16;
      if (left < margin) left = margin;
      if (left + tooltipBounds.width > window.innerWidth - margin) {
        left = window.innerWidth - tooltipBounds.width - margin;
      }
      if (top < margin) top = margin;
      if (top + tooltipBounds.height > window.innerHeight - margin) {
        top = window.innerHeight - tooltipBounds.height - margin;
      }

      setPosition({ top, left, arrowPosition });
    };

    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', calculatePosition);

    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
    };
  }, [step]);

  // Apply highlight to target element
  useEffect(() => {
    const target = document.querySelector(step.targetSelector);
    if (target) {
      target.classList.add('tour-highlight', 'animate-pulse-glow');
      return () => {
        target.classList.remove('tour-highlight', 'animate-pulse-glow');
      };
    }
  }, [step.targetSelector]);

  const getArrowStyles = () => {
    if (!position) return {};
    
    const base = {
      position: 'absolute' as const,
      width: 0,
      height: 0,
      borderStyle: 'solid'
    };

    switch (position.arrowPosition) {
      case 'top':
        return {
          ...base,
          bottom: -8,
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: '8px 8px 0 8px',
          borderColor: 'hsl(222, 47%, 20%) transparent transparent transparent'
        };
      case 'bottom':
        return {
          ...base,
          top: -8,
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: '0 8px 8px 8px',
          borderColor: 'transparent transparent hsl(222, 47%, 20%) transparent'
        };
      case 'left':
        return {
          ...base,
          right: -8,
          top: '50%',
          transform: 'translateY(-50%)',
          borderWidth: '8px 0 8px 8px',
          borderColor: 'transparent transparent transparent hsl(222, 47%, 20%)'
        };
      case 'right':
        return {
          ...base,
          left: -8,
          top: '50%',
          transform: 'translateY(-50%)',
          borderWidth: '8px 8px 8px 0',
          borderColor: 'transparent hsl(222, 47%, 20%) transparent transparent'
        };
    }
  };

  if (!position) {
    // Fallback for missing target - center tooltip
    return (
      <div
        ref={tooltipRef}
        className="tour-tooltip fixed z-[100] w-80 animate-fade-in"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        role="dialog"
        aria-label={step.ariaLabel || step.title}
        aria-describedby="tour-content"
      >
        <TooltipContent
          step={step}
          currentStep={currentStep}
          totalSteps={totalSteps}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          onNext={onNext}
          onPrevious={onPrevious}
          onSkip={onSkip}
          onComplete={onComplete}
        />
      </div>
    );
  }

  return (
    <>
      {/* Spotlight overlay */}
      {targetRect && (
        <div
          className="fixed inset-0 z-40 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse ${targetRect.width + 60}px ${targetRect.height + 60}px at ${targetRect.left + targetRect.width / 2}px ${targetRect.top + targetRect.height / 2}px, transparent 0%, hsl(222, 47%, 6%, 0.85) 100%)`
          }}
        />
      )}
      
      <div
        ref={tooltipRef}
        className="tour-tooltip fixed z-[100] w-80 animate-slide-up"
        style={{
          top: position.top,
          left: position.left
        }}
        role="dialog"
        aria-label={step.ariaLabel || step.title}
        aria-describedby="tour-content"
      >
        <div style={getArrowStyles()} />
        <TooltipContent
          step={step}
          currentStep={currentStep}
          totalSteps={totalSteps}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          onNext={onNext}
          onPrevious={onPrevious}
          onSkip={onSkip}
          onComplete={onComplete}
        />
      </div>
    </>
  );
};

interface TooltipContentProps {
  step: TourStep;
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onComplete: () => void;
}

const TooltipContent = ({
  step,
  currentStep,
  totalSteps,
  isFirstStep,
  isLastStep,
  onNext,
  onPrevious,
  onSkip,
  onComplete
}: TooltipContentProps) => (
  <>
    <button
      onClick={onSkip}
      className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Skip tour"
    >
      <X className="w-4 h-4" />
    </button>

    <div className="pr-6">
      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
        {step.title}
      </h3>
      <p id="tour-content" className="text-sm text-muted-foreground leading-relaxed">
        {step.content}
      </p>
    </div>

    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
      <div className="flex items-center gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              i === currentStep
                ? 'w-4 bg-primary'
                : i < currentStep
                ? 'bg-primary/50'
                : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        {!isFirstStep && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onPrevious}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        )}
        
        {isLastStep ? (
          <Button
            size="sm"
            onClick={onComplete}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Finish Tour
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={onNext}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>

    <p className="text-xs text-muted-foreground/60 mt-3 text-center">
      Step {currentStep + 1} of {totalSteps}
    </p>
  </>
);
