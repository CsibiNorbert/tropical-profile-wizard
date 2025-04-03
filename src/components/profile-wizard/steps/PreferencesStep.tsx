
import PreferenceSlider from "../PreferenceSlider";
import { useWizard } from "../WizardProvider";

const PreferencesStep = () => {
  const { profile, updateProfile } = useWizard();
  
  const handleTravelStyleChange = (value: number) => {
    updateProfile({
      preferences: { ...profile.preferences, travelStyle: value },
    });
  };

  const handleBudgetChange = (value: number) => {
    updateProfile({
      preferences: { ...profile.preferences, budget: value },
    });
  };

  const handlePaceChange = (value: number) => {
    updateProfile({
      preferences: { ...profile.preferences, pace: value },
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Tell us how you like to travel
        </h2>
        <p className="text-gray-600 mb-6">
          Use the sliders below to indicate your travel preferences.
        </p>
      </div>

      <PreferenceSlider
        label="Travel Style"
        leftLabel="Relaxation"
        rightLabel="Adventure"
        value={profile.preferences.travelStyle}
        onChange={handleTravelStyleChange}
      />

      <PreferenceSlider
        label="Budget Level"
        leftLabel="Budget-friendly"
        rightLabel="Luxury"
        value={profile.preferences.budget}
        onChange={handleBudgetChange}
      />

      <PreferenceSlider
        label="Travel Pace"
        leftLabel="Slow & Steady"
        rightLabel="Fast-paced"
        value={profile.preferences.pace}
        onChange={handlePaceChange}
      />
    </div>
  );
};

export default PreferencesStep;
