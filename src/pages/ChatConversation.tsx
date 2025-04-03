
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Send, ArrowLeft, Image, MapPin } from "lucide-react";
import { mockTravelers, mockMessages } from "@/data/mockTravelers";
import { Message } from "@/types/traveler";

const ChatConversation = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  // Find the other user
  const otherUser = mockTravelers.find(traveler => traveler.id === userId);
  
  useEffect(() => {
    // In a real app, we would fetch messages from the API
    // and mark them as read
    if (userId) {
      const chatMessages = mockMessages.filter(
        msg => (msg.senderId === userId && msg.receiverId === "current-user") || 
               (msg.senderId === "current-user" && msg.receiverId === userId)
      ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      
      setMessages(chatMessages);
    }
    
    // Scroll to bottom on load
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [userId]);
  
  const sendMessage = () => {
    if (!newMessage.trim() || !userId) return;
    
    // In a real app, we would send this to the API
    const message: Message = {
      id: `temp-${Date.now()}`,
      senderId: "current-user",
      receiverId: userId,
      content: newMessage,
      read: false,
      createdAt: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage("");
    
    // Scroll to bottom
    setTimeout(() => {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  if (!otherUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>User not found</p>
        <Button onClick={() => navigate('/chat')}>Back to Messages</Button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/chat')}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <img 
          src={otherUser.photo} 
          alt={otherUser.name}
          className="h-10 w-10 rounded-full object-cover" 
        />
        <div className="ml-3">
          <h3 className="font-medium text-gray-900">{otherUser.name}</h3>
          <p className="text-xs text-gray-500">
            {otherUser.destination} • {new Date(otherUser.startDate).toLocaleDateString()} - {new Date(otherUser.endDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      {/* Message area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div 
            key={message.id}
            className={`flex ${message.senderId === "current-user" ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[75%] rounded-lg p-3 ${
                message.senderId === "current-user" 
                  ? 'bg-tropical-turquoise text-white rounded-tr-none' 
                  : 'bg-white border border-gray-200 rounded-tl-none'
              }`}
            >
              {message.content}
              {message.mediaUrl && (
                <img 
                  src={message.mediaUrl} 
                  alt="Shared media" 
                  className="mt-2 rounded-md max-h-40 w-full object-cover"
                />
              )}
              {message.locationPin && (
                <div className="mt-2 bg-white/90 rounded-md p-2 flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1 text-tropical-coral" />
                  <span className="text-gray-700">{message.locationPin.label}</span>
                </div>
              )}
              <div className={`text-xs mt-1 ${message.senderId === "current-user" ? 'text-white/80' : 'text-gray-500'}`}>
                {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      
      {/* Message input */}
      <div className="bg-white border-t p-3 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-500"
          // In a real app, this would open image upload
        >
          <Image className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-500 mr-2"
          // In a real app, this would open location picker
        >
          <MapPin className="h-5 w-5" />
        </Button>
        <Input 
          placeholder="Type a message..." 
          className="flex-1"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-2 text-tropical-turquoise"
          disabled={!newMessage.trim()}
          onClick={sendMessage}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatConversation;
