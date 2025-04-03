
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

type PreferenceSliderProps = {
  label: string;
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
};

const PreferenceSlider = ({
  label,
  leftLabel,
  rightLabel,
  value,
  onChange,
  className,
}: PreferenceSliderProps) => {
  return (
    <div className={cn("mb-6", className)}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="space-y-3">
        <Slider
          defaultValue={[value]}
          max={100}
          step={1}
          onValueChange={(values) => onChange(values[0])}
          className="[&>span:first-child]:bg-gradient-to-r [&>span:first-child]:from-tropical-turquoise [&>span:first-child]:to-tropical-coral"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default PreferenceSlider;
