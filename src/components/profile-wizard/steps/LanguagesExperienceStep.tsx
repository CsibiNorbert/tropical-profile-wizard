
import { useState, useEffect } from "react";
import { useWizard } from "../WizardProvider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const experienceLevels = [
  { value: 0, label: "Novice Traveler", description: "Just getting started with travel" },
  { value: 1, label: "Casual Traveler", description: "A few trips under your belt" },
  { value: 2, label: "Intermediate", description: "Regular traveler with varied experiences" },
  { value: 3, label: "Experienced", description: "Seasoned traveler, been to many destinations" },
  { value: 4, label: "Expert", description: "Globetrotter with extensive worldwide travel" },
];

const LanguagesExperienceStep = () => {
  const { profile, updateProfile } = useWizard();
  const [languages, setLanguages] = useState<string[]>(profile.languages);
  const [newLanguage, setNewLanguage] = useState("");
  const [experience, setExperience] = useState(profile.experience);

  useEffect(() => {
    updateProfile({ languages, experience });
  }, [languages, experience, updateProfile]);

  const addLanguage = () => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      setLanguages([...languages, newLanguage.trim()]);
      setNewLanguage("");
    }
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addLanguage();
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label>Languages</Label>
        <div className="flex flex-wrap gap-2 mb-3">
          {languages.map((lang, index) => (
            <div
              key={index}
              className="px-3 py-1 bg-tropical-turquoise/10 text-tropical-turquoise rounded-full flex items-center gap-1"
            >
              <span>{lang}</span>
              <button
                onClick={() => removeLanguage(index)}
                className="text-tropical-turquoise hover:text-tropical-coral transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Add language"
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="border-gray-300 focus:border-tropical-turquoise focus:ring-tropical-turquoise/30"
          />
          <Button
            type="button"
            onClick={addLanguage}
            variant="outline"
            className="border-tropical-turquoise text-tropical-turquoise hover:bg-tropical-turquoise/10"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          Add languages you speak, even if only at a basic level.
        </p>
      </div>

      <div className="space-y-3">
        <Label>Travel Experience Level</Label>
        <RadioGroup
          value={String(experience)}
          onValueChange={(value) => setExperience(parseInt(value, 10))}
          className="space-y-3"
        >
          {experienceLevels.map((level) => (
            <div
              key={level.value}
              className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-gray-50 transition-colors"
            >
              <RadioGroupItem
                value={String(level.value)}
                id={`experience-${level.value}`}
                className="border-gray-300 text-tropical-turquoise focus:ring-tropical-turquoise/30"
              />
              <div className="flex-1">
                <Label
                  htmlFor={`experience-${level.value}`}
                  className="font-medium cursor-pointer"
                >
                  {level.label}
                </Label>
                <p className="text-sm text-gray-500">{level.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default LanguagesExperienceStep;
