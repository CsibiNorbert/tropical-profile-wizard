
export interface TravelerProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  photo: string;
  bio: string;
  destination: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  interests: string[];
  languages: string[];
  travelStyle: 'adventure' | 'relaxation' | 'culture' | 'food' | 'budget' | 'luxury';
  verified: boolean;
}

export interface Connection {
  id: string;
  userId: string;
  connectedUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string; // ISO date string
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  mediaUrl?: string;
  locationPin?: {
    lat: number;
    lng: number;
    label: string;
  };
  read: boolean;
  createdAt: string; // ISO date string
}

export interface Trip {
  id: string;
  userId: string;
  destination: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  activities: Activity[];
  sharedWith: string[]; // User IDs
}

export interface Activity {
  id: string;
  name: string;
  description?: string;
  location?: string;
  date: string; // ISO date string
  startTime?: string; // HH:MM format
  endTime?: string; // HH:MM format
  photo?: string;
}
