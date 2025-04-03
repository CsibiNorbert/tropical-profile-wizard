
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Star } from "lucide-react";
import { TravelerProfile } from "@/types/traveler";

interface TravelerCardProps {
  traveler: TravelerProfile;
  onSendRequest: () => void;
  onViewProfile: () => void;
}

const TravelerCard = ({ traveler, onSendRequest, onViewProfile }: TravelerCardProps) => {
  const calculateCompatibility = () => {
    // This would be a more complex algorithm in a real app
    return Math.floor(Math.random() * 30) + 70; // Return a number between 70-99
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img 
          src={traveler.photo} 
          alt={`${traveler.name}'s profile`} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <h3 className="text-white text-lg font-semibold">{traveler.name}, {traveler.age}</h3>
          <div className="flex items-center text-white/80 text-sm">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{traveler.destination}</span>
          </div>
        </div>
        
        <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center">
          <Star className="h-3 w-3 text-yellow-500 mr-1" fill="#f59e0b" />
          <span className="text-xs font-medium">{calculateCompatibility()}% match</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{new Date(traveler.startDate).toLocaleDateString()} - {new Date(traveler.endDate).toLocaleDateString()}</span>
        </div>
        
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{traveler.bio}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {traveler.interests.slice(0, 3).map((interest, i) => (
            <span key={i} className="text-xs bg-tropical-turquoise/10 text-tropical-turquoise px-2 py-1 rounded-full">
              {interest}
            </span>
          ))}
          {traveler.interests.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              +{traveler.interests.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-transparent border border-tropical-turquoise text-tropical-turquoise hover:bg-tropical-turquoise/10"
            onClick={onViewProfile}
          >
            View Profile
          </Button>
          <Button 
            className="flex-1 bg-tropical-turquoise hover:bg-tropical-turquoise/90 text-white"
            onClick={onSendRequest}
          >
            Connect
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TravelerCard;
