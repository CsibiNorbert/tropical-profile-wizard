
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Compass, MessageSquare, Calendar, Users, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileNavbar from "@/components/layout/MobileNavbar";
import { useState, useEffect } from "react";
import { Trip, TravelerProfile } from "@/types/traveler";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

// Mock data for upcoming trips
const mockUpcomingTrips: Trip[] = [
  {
    id: "1",
    userId: "current-user",
    destination: "Bali, Indonesia",
    startDate: "2025-05-10",
    endDate: "2025-05-20",
    activities: [],
    sharedWith: []
  },
  {
    id: "2",
    userId: "current-user",
    destination: "Bangkok, Thailand",
    startDate: "2025-06-15",
    endDate: "2025-06-22",
    activities: [],
    sharedWith: []
  }
];

// Mock data for potential matches
const mockPotentialMatches: TravelerProfile[] = [
  {
    id: "101",
    name: "Emma W.",
    age: 28,
    gender: "Female",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
    bio: "Adventure seeker, love exploring new cultures",
    destination: "Bali, Indonesia",
    startDate: "2025-05-12",
    endDate: "2025-05-19",
    interests: ["hiking", "photography", "local cuisine"],
    languages: ["English", "Spanish"],
    travelStyle: "adventure",
    verified: true
  },
  {
    id: "102",
    name: "Michael T.",
    age: 32,
    gender: "Male",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
    bio: "Digital nomad exploring SE Asia",
    destination: "Bangkok, Thailand",
    startDate: "2025-06-17",
    endDate: "2025-06-24",
    interests: ["coworking", "street food", "nightlife"],
    languages: ["English", "German"],
    travelStyle: "culture",
    verified: true
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([]);
  const [potentialMatches, setPotentialMatches] = useState<TravelerProfile[]>([]);
  
  useEffect(() => {
    // In a real app, we would fetch the user's upcoming trips and potential matches here
    // For now, we'll use our mock data
    setUpcomingTrips(mockUpcomingTrips);
    setPotentialMatches(mockPotentialMatches);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-tropical-turquoise/10 to-tropical-coral/10 pb-16">
      <div className="max-w-6xl mx-auto py-4 px-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">SoloTravel</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Connect with fellow travelers, plan your adventures, and explore safely.
          </p>
        </div>
        
        {/* Upcoming Trips Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Your Upcoming Trips</h2>
            <Button 
              onClick={() => navigate('/create-trip')}
              className="bg-tropical-turquoise hover:bg-tropical-turquoise/90"
              size="sm"
            >
              Create Trip
            </Button>
          </div>
          
          {upcomingTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingTrips.map(trip => (
                <Card 
                  key={trip.id} 
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/trip/${trip.id}`)}
                >
                  <div className="p-4 flex items-center">
                    <div className="p-3 rounded-full bg-tropical-turquoise/10 mr-3">
                      <MapPin className="h-5 w-5 text-tropical-turquoise" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{trip.destination}</h3>
                      <p className="text-sm text-gray-600">
                        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-4 text-center">
              <p className="text-gray-600 mb-4">You don't have any upcoming trips.</p>
              <Button 
                onClick={() => navigate('/create-trip')}
                className="bg-tropical-turquoise hover:bg-tropical-turquoise/90"
              >
                Plan Your First Adventure
              </Button>
            </Card>
          )}
        </div>
        
        {/* Potential Travel Companions Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Potential Travel Companions</h2>
            <Button 
              onClick={() => navigate('/travel-companions')}
              className="bg-tropical-coral hover:bg-tropical-coral/90"
              size="sm"
            >
              View All
            </Button>
          </div>
          
          {potentialMatches.length > 0 ? (
            <Card className="overflow-hidden">
              <Table>
                <TableBody>
                  {potentialMatches.map(match => (
                    <TableRow 
                      key={match.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => navigate(`/chat/${match.id}`)}
                    >
                      <TableCell className="py-2 pl-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                            <img 
                              src={match.photo} 
                              alt={match.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{match.name}, {match.age}</p>
                            <p className="text-xs text-gray-600">{match.destination}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-4">
                        <p className="text-sm text-gray-600">
                          {formatDate(match.startDate)} - {formatDate(match.endDate)}
                        </p>
                        <div className="flex items-center justify-end mt-1">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                            Trip Overlap
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          ) : (
            <Card className="p-4 text-center">
              <p className="text-gray-600">
                No potential matches found for your upcoming trips.
              </p>
              <Button 
                variant="link" 
                onClick={() => navigate('/travel-companions')}
                className="text-tropical-coral"
              >
                Browse All Travelers
              </Button>
            </Card>
          )}
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
