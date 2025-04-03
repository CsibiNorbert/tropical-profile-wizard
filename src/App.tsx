
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProfileWizard from "./pages/ProfileWizard";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import TravelCompanions from "./pages/TravelCompanions";
import Chat from "./pages/Chat";
import ChatConversation from "./pages/ChatConversation";
import Itinerary from "./pages/Itinerary";
import CreateTrip from "./pages/CreateTrip";
import TripDetails from "./pages/TripDetails";
import NearbyTravelers from "./pages/NearbyTravelers";
import SafetyCenter from "./pages/SafetyCenter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile-wizard" element={<ProfileWizard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/travel-companions" element={<TravelCompanions />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:userId" element={<ChatConversation />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/trip/:tripId" element={<TripDetails />} />
          <Route path="/nearby-travelers" element={<NearbyTravelers />} />
          <Route path="/safety-center" element={<SafetyCenter />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
