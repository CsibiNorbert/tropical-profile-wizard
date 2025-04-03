
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-tropical-turquoise/30 to-tropical-coral/30">
      <div className="text-center max-w-3xl mx-auto p-6">
        <h1 className="text-5xl font-bold mb-6 text-gray-800">Tropical Profile Wizard</h1>
        <p className="text-xl text-gray-700 mb-8">
          Create your travel profile and connect with like-minded travelers around the world.
          Tell us about your preferences and start your journey today!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate('/profile-wizard')}
            className="bg-gradient-to-r from-tropical-turquoise to-tropical-coral text-white hover:opacity-90 px-8 py-6 text-lg"
          >
            Create Your Profile
          </Button>
          <Button
            variant="outline"
            className="border-tropical-turquoise text-tropical-turquoise hover:bg-tropical-turquoise/10 px-8 py-6 text-lg"
            onClick={() => window.open("https://github.com/your-username/tropical-profile-wizard", "_blank")}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
