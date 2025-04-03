
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palmtree, MapPin, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-tropical-turquoise/10 to-tropical-coral/10 p-4">
      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Your Travel Dashboard</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your profile has been created successfully. This is your dashboard where you can plan trips, 
            connect with fellow travelers, and manage your travel preferences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-tropical-turquoise/20 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-tropical-turquoise/10 rounded-full mb-4">
                <Palmtree className="h-8 w-8 text-tropical-turquoise" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Discover Destinations</h3>
              <p className="text-gray-600 mb-4">
                Explore trending destinations that match your travel preferences.
              </p>
              <Button className="mt-auto bg-tropical-turquoise text-white hover:bg-tropical-turquoise/90">
                Explore Now
              </Button>
            </div>
          </Card>
          
          <Card className="p-6 border-tropical-turquoise/20 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-tropical-coral/10 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-tropical-coral" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Plan Your Trip</h3>
              <p className="text-gray-600 mb-4">
                Create detailed itineraries for your next adventure.
              </p>
              <Button className="mt-auto bg-tropical-coral text-white hover:bg-tropical-coral/90">
                Start Planning
              </Button>
            </div>
          </Card>
          
          <Card className="p-6 border-tropical-turquoise/20 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-gradient-to-r from-tropical-turquoise/20 to-tropical-coral/20 rounded-full mb-4">
                <Compass className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Edit Profile</h3>
              <p className="text-gray-600 mb-4">
                Update your travel preferences and personal information.
              </p>
              <Button 
                onClick={() => navigate("/edit-profile")}
                className="mt-auto bg-gradient-to-r from-tropical-turquoise to-tropical-coral text-white hover:opacity-90"
              >
                Edit Profile
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
