
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = Math.round((currentStep / (totalSteps - 1)) * 100);
  
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center"
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all",
                i < currentStep
                  ? "bg-tropical-turquoise border-tropical-turquoise text-white"
                  : i === currentStep
                  ? "border-tropical-turquoise text-tropical-turquoise"
                  : "border-gray-300 text-gray-400"
              )}
            >
              {i + 1}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-gradient-to-r from-tropical-turquoise to-tropical-coral rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
