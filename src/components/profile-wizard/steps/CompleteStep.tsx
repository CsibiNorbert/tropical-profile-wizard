
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWizard } from "../WizardProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CompleteStep = () => {
  const { profile, setComplete } = useWizard();
  const navigate = useNavigate();
  
  useEffect(() => {
    setComplete(true);
  }, [setComplete]);

  const handleContinue = () => {
    navigate("/dashboard");
  };

  return (
    <div className="text-center py-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="rounded-full bg-green-100 p-3 mb-2">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Profile Complete!</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Thanks {profile.name}! Your travel profile has been created successfully. You're all set to
          start your journey with us.
        </p>
        
        <div className="mt-8 flex flex-col md:flex-row items-center gap-4">
          <Button
            onClick={handleContinue}
            className="bg-gradient-to-r from-tropical-turquoise to-tropical-coral text-white hover:opacity-90 px-6 py-2"
          >
            Go to Dashboard
          </Button>
          <Button
            variant="outline"
            className="border-tropical-turquoise text-tropical-turquoise hover:bg-tropical-turquoise/10"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompleteStep;
