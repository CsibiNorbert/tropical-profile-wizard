
import { useState, useEffect } from "react";
import { WizardProvider, useWizard } from "../components/profile-wizard/WizardProvider";
import WizardLayout from "../components/profile-wizard/WizardLayout";
import ProgressBar from "../components/profile-wizard/ProgressBar";
import NavigationButtons from "../components/profile-wizard/NavigationButtons";
import BasicInfoStep from "../components/profile-wizard/steps/BasicInfoStep";
import PreferencesStep from "../components/profile-wizard/steps/PreferencesStep";
import BioPhotoStep from "../components/profile-wizard/steps/BioPhotoStep";
import LanguagesExperienceStep from "../components/profile-wizard/steps/LanguagesExperienceStep";
import CompleteStep from "../components/profile-wizard/steps/CompleteStep";
import { toast } from "sonner";

const WizardContent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { profile, isComplete } = useWizard();
  
  const steps = [
    {
      title: "Basic Information",
      subtitle: "Let's start with some basics about you",
      component: <BasicInfoStep />,
      isValid: () => !!profile.name && !!profile.age && !!profile.gender,
    },
    {
      title: "Travel Preferences",
      subtitle: "Tell us how you like to travel",
      component: <PreferencesStep />,
      isValid: () => true,
    },
    {
      title: "Bio & Photo",
      subtitle: "Add a bit about yourself and a profile picture",
      component: <BioPhotoStep />,
      isValid: () => !!profile.bio,
    },
    {
      title: "Languages & Experience",
      subtitle: "Share your language skills and travel experience",
      component: <LanguagesExperienceStep />,
      isValid: () => profile.languages.length > 0,
    },
    {
      title: "All Done!",
      subtitle: "Your profile is complete",
      component: <CompleteStep />,
      isValid: () => true,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const current = steps[currentStep];
      if (!current.isValid()) {
        toast.error("Please complete all required fields before proceeding");
        return;
      }
      
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const currentStepData = steps[currentStep];

  useEffect(() => {
    // This prevents going back after completing the wizard
    if (isComplete && currentStep !== steps.length - 1) {
      setCurrentStep(steps.length - 1);
    }
  }, [isComplete, currentStep, steps.length]);

  return (
    <WizardLayout 
      title={currentStepData.title}
      subtitle={currentStepData.subtitle}
    >
      <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
      <div className="min-h-[400px]">
        {currentStepData.component}
      </div>
      <NavigationButtons
        currentStep={currentStep}
        totalSteps={steps.length}
        onNext={handleNext}
        onPrev={handlePrev}
        canProgress={currentStepData.isValid()}
      />
    </WizardLayout>
  );
};

const ProfileWizard = () => {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  );
};

export default ProfileWizard;
