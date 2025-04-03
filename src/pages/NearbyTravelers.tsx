
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Coffee, MessageSquare, Utensils, Map } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileNavbar from "@/components/layout/MobileNavbar";

interface NearbyTraveler {
  id: string;
  name: string;
  photo: string;
  distance: number; // in meters
  bio: string;
  verified: boolean;
  available: boolean;
}

const mockNearbyTravelers: NearbyTraveler[] = [
  {
    id: "1",
    name: "Jamie Chen",
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
    distance: 350,
    bio: "Budget backpacker exploring Southeast Asia.",
    verified: true,
    available: true
  },
  {
    id: "2",
    name: "Taylor Wong",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    distance: 800,
    bio: "Cultural enthusiast and food blogger.",
    verified: true,
    available: true
  },
  {
    id: "3",
    name: "Morgan Lee",
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
    distance: 1200,
    bio: "Yoga instructor and beach lover.",
    verified: true,
    available: false
  }
];

const NearbyTravelerCard = ({ traveler }: { traveler: NearbyTraveler }) => {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);
  
  return (
    <Card className="overflow-hidden">
      <div className="p-3">
        <div className="flex items-center">
          <img 
            src={traveler.photo} 
            alt={traveler.name}
            className="h-14 w-14 rounded-full object-cover mr-3" 
          />
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="font-medium text-gray-800 mr-2">{traveler.name}</h3>
              {traveler.verified && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{(traveler.distance < 1000) ? `${traveler.distance}m away` : `${(traveler.distance / 1000).toFixed(1)}km away`}</span>
              {traveler.available && (
                <span className="ml-2 text-xs text-tropical-turquoise font-medium">
                  Available now
                </span>
              )}
            </div>
            <p className="text-sm text-gray-700 mt-1 truncate">{traveler.bio}</p>
          </div>
        </div>
        
        <div className="mt-3 flex items-center">
          <Button 
            variant="outline" 
            size="sm" 
            className="mr-2"
            onClick={() => setShowActions(!showActions)}
          >
            {showActions ? "Hide" : "Meet up"}
          </Button>
          
          <Button 
            className="bg-tropical-turquoise hover:bg-tropical-turquoise/90"
            size="sm"
            onClick={() => navigate(`/chat/${traveler.id}`)}
          >
            <MessageSquare className="h-4 w-4 mr-1" /> Message
          </Button>
        </div>
        
        {showActions && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex flex-col h-auto py-2"
            >
              <Coffee className="h-4 w-4 mb-1" />
              <span className="text-xs">Coffee</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex flex-col h-auto py-2"
            >
              <Utensils className="h-4 w-4 mb-1" />
              <span className="text-xs">Meal</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex flex-col h-auto py-2"
            >
              <Map className="h-4 w-4 mb-1" />
              <span className="text-xs">Explore</span>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

const NearbyTravelers = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-tropical-turquoise/10 to-tropical-coral/10 pb-16">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Nearby Travelers</h1>
        <p className="text-sm text-gray-600 mb-4">
          Find other solo travelers currently in your area
        </p>
        
        <div className="mb-4">
          <Button className="w-full bg-tropical-ocean hover:bg-tropical-ocean/90">
            <MapPin className="h-4 w-4 mr-2" /> Update My Location
          </Button>
        </div>
        
        <div className="space-y-3">
          {mockNearbyTravelers.map(traveler => (
            <NearbyTravelerCard key={traveler.id} traveler={traveler} />
          ))}
          
          {mockNearbyTravelers.length === 0 && (
            <Card className="p-6 text-center">
              <h3 className="text-lg font-medium text-gray-700 mb-2">No travelers nearby</h3>
              <p className="text-gray-500">
                There are no other travelers in your area currently.
              </p>
            </Card>
          )}
        </div>
        
        <p className="text-xs text-gray-500 mt-4 text-center">
          Your location is only shared when you're actively using this feature.
          You can disable location sharing at any time.
        </p>
      </div>
      
      <MobileNavbar />
    </div>
  );
};

export default NearbyTravelers;
