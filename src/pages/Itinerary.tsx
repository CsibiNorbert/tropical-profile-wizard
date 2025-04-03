
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileNavbar from "@/components/layout/MobileNavbar";

interface TripPreviewProps {
  id: string;
  destination: string;
  image: string;
  startDate: string;
  endDate: string;
  activities: number;
}

// Mock data for trips
const mockTrips: TripPreviewProps[] = [
  {
    id: "1",
    destination: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
    startDate: "2025-05-10",
    endDate: "2025-05-20",
    activities: 5
  },
  {
    id: "2",
    destination: "Bangkok, Thailand",
    image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=800&auto=format&fit=crop",
    startDate: "2025-06-15",
    endDate: "2025-06-22",
    activities: 3
  }
];

const TripCard = ({ trip, onSelect }: { trip: TripPreviewProps, onSelect: () => void }) => {
  const startDate = new Date(trip.startDate).toLocaleDateString();
  const endDate = new Date(trip.endDate).toLocaleDateString();
  
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onSelect}
    >
      <div className="relative">
        <img 
          src={trip.image} 
          alt={trip.destination} 
          className="w-full h-32 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
          <h3 className="text-white font-semibold">{trip.destination}</h3>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{startDate} - {endDate}</span>
        </div>
        <p className="text-xs text-gray-500">{trip.activities} activities planned</p>
      </div>
    </Card>
  );
};

const Itinerary = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-tropical-turquoise/10 to-tropical-coral/10 pb-16">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">My Trips</h1>
          <Button 
            onClick={() => navigate('/create-trip')}
            className="bg-tropical-turquoise hover:bg-tropical-turquoise/90"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" /> New Trip
          </Button>
        </div>
        
        {mockTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockTrips.map(trip => (
              <TripCard 
                key={trip.id} 
                trip={trip} 
                onSelect={() => navigate(`/trip/${trip.id}`)} 
              />
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-2">No trips yet</h3>
            <p className="text-gray-500 mb-4">
              Start planning your adventures by creating your first trip.
            </p>
            <Button 
              onClick={() => navigate('/create-trip')}
              className="bg-tropical-turquoise hover:bg-tropical-turquoise/90"
            >
              <Plus className="h-4 w-4 mr-1" /> Create First Trip
            </Button>
          </Card>
        )}
        
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-800 mb-3">Shared With Me</h2>
          <Card className="p-4 text-center">
            <p className="text-gray-500">
              No trips have been shared with you yet.
            </p>
          </Card>
        </div>
      </div>
      
      <MobileNavbar />
    </div>
  );
};

export default Itinerary;
