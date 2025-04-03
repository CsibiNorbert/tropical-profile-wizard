
import { TravelerProfile } from "@/types/traveler";

// In a real app, this would come from your backend
export const mockTravelers: TravelerProfile[] = [
  {
    id: "1",
    name: "Alex Johnson",
    age: 28,
    gender: "non-binary",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    bio: "Digital nomad exploring Southeast Asia. Love hiking, photography and trying local street food.",
    destination: "Bali",
    startDate: "2025-05-10",
    endDate: "2025-05-20",
    interests: ["hiking", "photography", "food", "markets", "beaches"],
    languages: ["English", "Spanish", "Basic Indonesian"],
    travelStyle: "adventure",
    verified: true
  },
  {
    id: "2",
    name: "Morgan Lee",
    age: 31,
    gender: "female",
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
    bio: "Yoga instructor and beach lover. Always in search of the perfect sunset and vegetarian cuisine.",
    destination: "Bali",
    startDate: "2025-05-12",
    endDate: "2025-05-25",
    interests: ["yoga", "meditation", "vegan food", "beaches", "surfing"],
    languages: ["English", "French"],
    travelStyle: "relaxation",
    verified: true
  },
  {
    id: "3",
    name: "Jordan Smith",
    age: 26,
    gender: "male",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
    bio: "First time in Asia! Looking for adventure buddies to explore temples and try scuba diving.",
    destination: "Bali",
    startDate: "2025-05-05",
    endDate: "2025-05-15",
    interests: ["scuba diving", "temples", "hiking", "nightlife", "local cuisine"],
    languages: ["English", "German"],
    travelStyle: "adventure",
    verified: false
  },
  {
    id: "4",
    name: "Taylor Wong",
    age: 34,
    gender: "female",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    bio: "Cultural enthusiast and food blogger. Love exploring hidden gems and authentic experiences.",
    destination: "Bangkok",
    startDate: "2025-05-15",
    endDate: "2025-05-30",
    interests: ["food", "markets", "cooking classes", "temples", "history"],
    languages: ["English", "Thai", "Mandarin"],
    travelStyle: "culture",
    verified: true
  },
  {
    id: "5",
    name: "Sam Rivera",
    age: 29,
    gender: "male",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    bio: "Adventure photographer on a world tour. Always up for sunrise hikes and local beer tasting.",
    destination: "Chiang Mai",
    startDate: "2025-06-01",
    endDate: "2025-06-15",
    interests: ["photography", "hiking", "mountains", "local brews", "markets"],
    languages: ["English", "Spanish"],
    travelStyle: "adventure",
    verified: true
  },
  {
    id: "6",
    name: "Jamie Chen",
    age: 27,
    gender: "female",
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
    bio: "Budget backpacker exploring Southeast Asia. Love hostel life and making new friends along the way.",
    destination: "Bangkok",
    startDate: "2025-05-20",
    endDate: "2025-06-05",
    interests: ["backpacking", "budget travel", "hostels", "street food", "markets"],
    languages: ["English", "Mandarin"],
    travelStyle: "budget",
    verified: true
  }
];

export const mockConnections = [
  {
    id: "1",
    userId: "current-user", // This would be the logged in user's ID in a real app
    connectedUserId: "2",
    status: "accepted",
    createdAt: "2025-04-01T10:30:00Z"
  },
  {
    id: "2",
    userId: "current-user",
    connectedUserId: "3",
    status: "pending",
    createdAt: "2025-04-02T15:45:00Z"
  }
];

export const mockMessages = [
  {
    id: "1",
    senderId: "current-user",
    receiverId: "2",
    content: "Hi Morgan! I saw we'll both be in Bali next month. Would love to connect and maybe meet up for some yoga!",
    read: true,
    createdAt: "2025-04-01T10:35:00Z"
  },
  {
    id: "2",
    senderId: "2",
    receiverId: "current-user",
    content: "Hey! That sounds wonderful. I'll be staying in Ubud for the first week. Are you going to be there too?",
    read: true,
    createdAt: "2025-04-01T11:42:00Z"
  },
  {
    id: "3",
    senderId: "current-user",
    receiverId: "2",
    content: "Yes, I'll be in Ubud from the 10th-15th! Would love to join a yoga class together or grab a smoothie bowl.",
    read: true,
    createdAt: "2025-04-01T12:05:00Z"
  },
  {
    id: "4",
    senderId: "2",
    receiverId: "current-user",
    content: "Perfect! There's a great yoga studio near Monkey Forest that I want to try. And definitely up for smoothie bowls anytime!",
    mediaUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop",
    read: false,
    createdAt: "2025-04-02T09:18:00Z"
  }
];
