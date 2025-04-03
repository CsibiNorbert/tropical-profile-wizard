
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileNavbar from "@/components/layout/MobileNavbar";
import { mockTravelers, mockConnections, mockMessages } from "@/data/mockTravelers";

const Chat = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get all connections
  const connections = mockConnections.filter(conn => conn.status === "accepted");
  
  // Get the latest message for each connection to display in the preview
  const chatPreviews = connections.map(connection => {
    const otherUserId = connection.connectedUserId;
    const otherUser = mockTravelers.find(traveler => traveler.id === otherUserId);
    
    if (!otherUser) return null;
    
    // Get the latest message between these users
    const messages = mockMessages.filter(
      msg => (msg.senderId === otherUserId && msg.receiverId === "current-user") || 
             (msg.senderId === "current-user" && msg.receiverId === otherUserId)
    ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    const lastMessage = messages[0];
    const unreadCount = messages.filter(
      msg => msg.receiverId === "current-user" && !msg.read
    ).length;
    
    return {
      userId: otherUserId,
      name: otherUser.name,
      photo: otherUser.photo,
      lastMessage: lastMessage?.content || "",
      timestamp: lastMessage?.createdAt || "",
      unreadCount
    };
  }).filter(Boolean);
  
  // Filter chat previews based on search
  const filteredChats = chatPreviews.filter(chat => 
    chat && chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="sticky top-0 bg-white z-10 shadow-sm">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Messages</h1>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search conversations..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="px-4">
        {filteredChats.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No conversations yet.</p>
            <Button 
              variant="link" 
              className="text-tropical-turquoise"
              onClick={() => navigate("/travel-companions")}
            >
              Find travel companions
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredChats.map((chat) => (
              chat && (
                <button
                  key={chat.userId}
                  className="w-full flex items-center py-3 px-1 hover:bg-gray-50"
                  onClick={() => navigate(`/chat/${chat.userId}`)}
                >
                  <div className="relative">
                    <img 
                      src={chat.photo} 
                      alt={chat.name}
                      className="h-12 w-12 rounded-full object-cover" 
                    />
                    {chat.unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 bg-tropical-coral text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {chat.unreadCount}
                      </div>
                    )}
                  </div>
                  <div className="ml-3 flex-1 text-left">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium text-gray-900">{chat.name}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(chat.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={`text-sm ${chat.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-500'} truncate`}>
                      {chat.lastMessage}
                    </p>
                  </div>
                </button>
              )
            ))}
          </div>
        )}
        
        {/* Request section */}
        <div className="mt-4">
          <h2 className="text-sm font-medium text-gray-700 mb-2">Connection Requests</h2>
          {mockConnections.filter(conn => conn.status === "pending").length === 0 ? (
            <p className="text-sm text-gray-500">No pending requests</p>
          ) : (
            mockConnections.filter(conn => conn.status === "pending").map(connection => {
              const otherUser = mockTravelers.find(traveler => traveler.id === connection.connectedUserId);
              if (!otherUser) return null;
              
              return (
                <div key={connection.id} className="flex items-center justify-between py-3 border-b">
                  <div className="flex items-center">
                    <img 
                      src={otherUser.photo} 
                      alt={otherUser.name}
                      className="h-10 w-10 rounded-full object-cover" 
                    />
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900">{otherUser.name}</h3>
                      <p className="text-xs text-gray-500">
                        Wants to connect with you
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Decline
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-tropical-turquoise hover:bg-tropical-turquoise/90"
                    >
                      Accept
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      
      <MobileNavbar />
    </div>
  );
};

export default Chat;
