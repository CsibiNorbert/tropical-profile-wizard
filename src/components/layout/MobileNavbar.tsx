
import { Home, Search, Calendar, MessageSquare, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const MobileNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 z-40">
      <div className="flex justify-around items-center h-16">
        <button 
          onClick={() => navigate("/dashboard")}
          className={`flex flex-col items-center justify-center w-full h-full ${isActive("/dashboard") ? "text-tropical-turquoise" : "text-gray-500"}`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button 
          onClick={() => navigate("/travel-companions")}
          className={`flex flex-col items-center justify-center w-full h-full ${isActive("/travel-companions") ? "text-tropical-turquoise" : "text-gray-500"}`}
        >
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1">Discover</span>
        </button>
        
        <button 
          onClick={() => navigate("/itinerary")}
          className={`flex flex-col items-center justify-center w-full h-full ${isActive("/itinerary") ? "text-tropical-turquoise" : "text-gray-500"}`}
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs mt-1">Trips</span>
        </button>
        
        <button 
          onClick={() => navigate("/chat")}
          className={`flex flex-col items-center justify-center w-full h-full ${isActive("/chat") ? "text-tropical-turquoise" : "text-gray-500"}`}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs mt-1">Chat</span>
        </button>
        
        <button 
          onClick={() => navigate("/edit-profile")}
          className={`flex flex-col items-center justify-center w-full h-full ${isActive("/edit-profile") ? "text-tropical-turquoise" : "text-gray-500"}`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default MobileNavbar;
