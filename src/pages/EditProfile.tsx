
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Card } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { User, CalendarIcon, Camera } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import MobileNavbar from "@/components/layout/MobileNavbar";

const EditProfile = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState("https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop");
  const [birthDate, setBirthDate] = useState<Date | undefined>(new Date(1995, 0, 1));
  const [travelPreferences, setTravelPreferences] = useState({
    adventure: 70,
    relaxation: 50,
    budget: 40,
    culture: 80,
  });
  
  const handleSave = () => {
    // In a real app, this would save to the backend
    // For now, just navigate back
    navigate("/dashboard");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-tropical-turquoise/10 to-tropical-coral/10 pb-16">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile</h1>
        
        <Card className="p-4">
          {/* Profile photo */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-2">
              <img 
                src={photo} 
                alt="Profile" 
                className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md" 
              />
              <button 
                className="absolute bottom-0 right-0 bg-tropical-turquoise text-white rounded-full p-1"
                onClick={() => {/* Would open photo selector */}}
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <Button variant="link" className="text-tropical-turquoise">
              Change photo
            </Button>
          </div>
          
          {/* Personal details */}
          <div className="space-y-4 mb-6">
            <h2 className="font-medium text-gray-700">Personal Details</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Alex" placeholder="First Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Rivera" placeholder="Last Name" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="alex@example.com" placeholder="Email" readOnly />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="birthDate">Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {birthDate ? format(birthDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={birthDate}
                    onSelect={setBirthDate}
                    initialFocus
                    captionLayout="dropdown-buttons"
                    fromYear={1950}
                    toYear={2010}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select defaultValue="female">
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Travel preferences */}
          <div className="space-y-4 mb-6">
            <h2 className="font-medium text-gray-700">Travel Preferences</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Adventure vs. Relaxation</Label>
                  <span className="text-xs text-gray-500">{travelPreferences.adventure}%</span>
                </div>
                <Slider
                  value={[travelPreferences.adventure]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setTravelPreferences(prev => ({...prev, adventure: value[0]}))}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Relaxation</span>
                  <span>Adventure</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Budget vs. Luxury</Label>
                  <span className="text-xs text-gray-500">{travelPreferences.budget}%</span>
                </div>
                <Slider
                  value={[travelPreferences.budget]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setTravelPreferences(prev => ({...prev, budget: value[0]}))}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Budget</span>
                  <span>Luxury</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Cultural Immersion</Label>
                  <span className="text-xs text-gray-500">{travelPreferences.culture}%</span>
                </div>
                <Slider
                  value={[travelPreferences.culture]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setTravelPreferences(prev => ({...prev, culture: value[0]}))}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Tourist spots</span>
                  <span>Local immersion</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea 
                id="bio" 
                className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md min-h-24"
                defaultValue="Digital nomad exploring Southeast Asia. Love hiking, photography and trying local street food."
                placeholder="Tell other travelers about yourself"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="font-medium text-gray-700">Interests & Languages</h2>
            
            <div className="space-y-2">
              <Label htmlFor="interests">Interests (comma separated)</Label>
              <Input 
                id="interests" 
                defaultValue="hiking, photography, food, markets, beaches" 
                placeholder="E.g. hiking, food, museums" 
              />
              <p className="text-xs text-gray-500 mt-1">These help other travelers find common interests</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="languages">Languages (comma separated)</Label>
              <Input 
                id="languages" 
                defaultValue="English, Spanish, Basic Indonesian" 
                placeholder="E.g. English, Spanish" 
              />
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-tropical-turquoise hover:bg-tropical-turquoise/90"
              onClick={handleSave}
            >
              Save Profile
            </Button>
          </div>
        </Card>
      </div>
      
      <MobileNavbar />
    </div>
  );
};

export default EditProfile;
