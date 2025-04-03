
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

type NavigationButtonsProps = {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  canProgress: boolean;
};

const NavigationButtons = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  canProgress = true,
}: NavigationButtonsProps) => {
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="flex justify-between mt-8">
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={isFirstStep}
        className={`${
          isFirstStep ? "opacity-0 pointer-events-none" : ""
        } border-tropical-turquoise text-tropical-turquoise hover:bg-tropical-turquoise/10 hover:text-tropical-turquoise`}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <Button
        onClick={onNext}
        disabled={!canProgress}
        className="bg-gradient-to-r from-tropical-turquoise to-tropical-coral text-white hover:opacity-90"
      >
        {isLastStep ? (
          <>
            Complete
            <Check className="ml-2 h-4 w-4" />
          </>
        ) : (
          <>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default NavigationButtons;
