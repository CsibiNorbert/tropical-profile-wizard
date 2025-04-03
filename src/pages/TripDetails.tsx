
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Share2, Plus, Calendar, MapPin, Trash2 } from "lucide-react";
import MobileNavbar from "@/components/layout/MobileNavbar";

// Mock activity for the trip details page
interface Activity {
  id: string;
  name: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
}

const mockTripDetails = {
  id: "1",
  destination: "Bali, Indonesia",
  image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
  startDate: "2025-05-10",
  endDate: "2025-05-20",
  description: "My dream vacation to explore Bali's beaches, temples, and rice terraces.",
  activities: [
    {
      id: "1",
      name: "Mount Batur Sunrise Trek",
      description: "Early morning hike to watch the sunrise from the volcano.",
      date: "2025-05-12",
      time: "04:00 AM - 11:00 AM",
      location: "Mount Batur, Kintamani"
    },
    {
      id: "2",
      name: "Ubud Monkey Forest",
      description: "Visit the sacred monkey sanctuary in Ubud.",
      date: "2025-05-14",
      time: "10:00 AM - 12:00 PM",
      location: "Ubud Monkey Forest, Ubud"
    },
    {
      id: "3",
      name: "Tegallalang Rice Terraces",
      description: "Explore the beautiful rice terraces and take photos.",
      date: "2025-05-15",
      time: "09:00 AM - 11:00 AM",
      location: "Tegallalang, Ubud"
    },
    {
      id: "4",
      name: "Dinner at Potato Head Beach Club",
      description: "Sunset dinner at the famous beach club.",
      date: "2025-05-17",
      time: "05:00 PM - 08:00 PM",
      location: "Seminyak Beach"
    },
    {
      id: "5",
      name: "Tanah Lot Temple Visit",
      description: "Visit the iconic sea temple during low tide.",
      date: "2025-05-18",
      time: "03:00 PM - 06:00 PM",
      location: "Tanah Lot, Tabanan"
    }
  ]
};

const ActivityCard = ({ activity }: { activity: Activity }) => {
  const [showDetails, setShowDetails] = useState(false);
  const date = new Date(activity.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short', 
    day: 'numeric'
  });
  
  return (
    <Card 
      className={`overflow-hidden transition-all ${showDetails ? 'mb-4' : ''}`}
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="p-3 cursor-pointer">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-800">{activity.name}</h3>
          <button className="text-gray-500 hover:text-gray-700">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{date}</span>
          {activity.time && <span className="ml-2">{activity.time}</span>}
        </div>
        
        {showDetails && (
          <div className="mt-3 space-y-2">
            {activity.location && (
              <div className="flex items-start text-sm text-gray-600">
                <MapPin className="h-3 w-3 mr-1 mt-0.5 shrink-0" />
                <span>{activity.location}</span>
              </div>
            )}
            
            <p className="text-sm text-gray-700">{activity.description}</p>
            
            <div className="flex justify-end gap-2 mt-2">
              <Button size="sm" variant="outline">Edit</Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

const TripDetails = () => {
  const navigate = useNavigate();
  const { tripId } = useParams<{ tripId: string }>();
  
  // In a real app, we would fetch the trip details based on the tripId
  const trip = mockTripDetails;
  
  // Group activities by date
  const groupedActivities = trip.activities.reduce((groups, activity) => {
    const date = activity.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {} as Record<string, Activity[]>);
  
  // Sort dates
  const sortedDates = Object.keys(groupedActivities).sort();
  
  return (
    <div className="min-h-screen pb-16">
      <div className="relative">
        <img 
          src={trip.image} 
          alt={trip.destination} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
          <h1 className="text-white text-2xl font-bold">{trip.destination}</h1>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/itinerary')}
          className="absolute top-4 left-4 bg-white/80 text-gray-800"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4 bg-white/80 text-gray-800"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span>
            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
          </span>
        </div>
        
        <p className="text-gray-700 mb-4">
          {trip.description}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-800">Activities</h2>
          <Button 
            size="sm"
            className="bg-tropical-turquoise hover:bg-tropical-turquoise/90"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Activity
          </Button>
        </div>
        
        <div className="space-y-4">
          {sortedDates.map(date => (
            <div key={date}>
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </h3>
              <div className="space-y-2">
                {groupedActivities[date].map(activity => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <MobileNavbar />
    </div>
  );
};

export default TripDetails;
