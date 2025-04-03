
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palmtree, MapPin, Compass, MessageSquare, Calendar, Users, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileNavbar from "@/components/layout/MobileNavbar";

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-tropical-turquoise/10 to-tropical-coral/10 pb-16">
      <div className="max-w-6xl mx-auto py-4 px-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">SoloTravel</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Connect with fellow travelers, plan your adventures, and explore safely.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 border-tropical-turquoise/20 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="p-2 bg-tropical-turquoise/10 rounded-full mb-2">
                <Users className="h-6 w-6 text-tropical-turquoise" />
              </div>
              <h3 className="text-base font-semibold mb-1">Find Companions</h3>
              <p className="text-gray-600 text-xs mb-3">
                Match with travelers heading to your destination
              </p>
              <Button 
                onClick={() => navigate("/travel-companions")}
                className="w-full bg-tropical-turquoise text-white hover:bg-tropical-turquoise/90"
                size="sm"
              >
                Find Matches
              </Button>
            </div>
          </Card>
          
          <Card className="p-4 border-tropical-turquoise/20 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="p-2 bg-tropical-coral/10 rounded-full mb-2">
                <MessageSquare className="h-6 w-6 text-tropical-coral" />
              </div>
              <h3 className="text-base font-semibold mb-1">Messages</h3>
              <p className="text-gray-600 text-xs mb-3">
                Chat with your travel connections
              </p>
              <Button 
                onClick={() => navigate("/chat")}
                className="w-full bg-tropical-coral text-white hover:bg-tropical-coral/90"
                size="sm"
              >
                Open Chat
              </Button>
            </div>
          </Card>
          
          <Card className="p-4 border-tropical-turquoise/20 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="p-2 bg-gradient-to-r from-tropical-turquoise/20 to-tropical-coral/20 rounded-full mb-2">
                <Calendar className="h-6 w-6 text-gray-700" />
              </div>
              <h3 className="text-base font-semibold mb-1">My Trips</h3>
              <p className="text-gray-600 text-xs mb-3">
                Plan and share your travel itineraries
              </p>
              <Button 
                onClick={() => navigate("/itinerary")}
                className="w-full bg-gradient-to-r from-tropical-turquoise to-tropical-coral text-white hover:opacity-90"
                size="sm"
              >
                View Itineraries
              </Button>
            </div>
          </Card>
          
          <Card className="p-4 border-tropical-turquoise/20 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="p-2 bg-tropical-sand/20 rounded-full mb-2">
                <Navigation className="h-6 w-6 text-tropical-ocean" />
              </div>
              <h3 className="text-base font-semibold mb-1">Nearby</h3>
              <p className="text-gray-600 text-xs mb-3">
                Discover travelers around your location
              </p>
              <Button 
                onClick={() => navigate("/nearby-travelers")}
                className="w-full bg-tropical-ocean text-white hover:bg-tropical-ocean/90"
                size="sm"
              >
                Find Nearby
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="mt-6">
          <Card className="p-4 border-tropical-turquoise/20 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-tropical-turquoise/10 rounded-full mr-3">
                <Compass className="h-6 w-6 text-tropical-turquoise" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold mb-1">Safety Center</h3>
                <p className="text-gray-600 text-xs">Set up emergency contacts and safety features</p>
              </div>
              <Button 
                onClick={() => navigate("/safety-center")}
                className="bg-gradient-to-r from-tropical-turquoise to-tropical-coral text-white hover:opacity-90"
                size="sm"
              >
                Safety
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      <MobileNavbar />
    </div>
  );
};

export default Dashboard;
