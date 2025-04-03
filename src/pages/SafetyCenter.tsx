
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Shield,
  Phone,
  Bell,
  MapPin,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileNavbar from "@/components/layout/MobileNavbar";

interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

const SafetyCenter = () => {
  const navigate = useNavigate();
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    {
      name: "Emma Rivera",
      phone: "+1 (555) 123-4567",
      relationship: "Sister"
    }
  ]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState<EmergencyContact>({
    name: "",
    phone: "",
    relationship: ""
  });
  
  const addContact = () => {
    if (newContact.name && newContact.phone) {
      setEmergencyContacts([...emergencyContacts, newContact]);
      setNewContact({ name: "", phone: "", relationship: "" });
      setShowAddContact(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-tropical-turquoise/10 to-tropical-coral/10 pb-16">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/dashboard')}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Safety Center</h1>
        </div>
        
        <Card className="p-4 mb-4 border-l-4 border-l-tropical-turquoise">
          <div className="flex">
            <Shield className="h-6 w-6 text-tropical-turquoise mr-3 shrink-0" />
            <div>
              <h2 className="font-medium text-gray-800 mb-1">Your Safety is Our Priority</h2>
              <p className="text-sm text-gray-600">
                Set up safety features to help ensure a secure travel experience.
              </p>
            </div>
          </div>
        </Card>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-2">Emergency Contacts</h2>
            
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="p-3 mb-3">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.phone}</p>
                    {contact.relationship && (
                      <p className="text-xs text-gray-500">{contact.relationship}</p>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-500 h-8">
                    Remove
                  </Button>
                </div>
              </Card>
            ))}
            
            {showAddContact ? (
              <Card className="p-3 mb-3">
                <h3 className="font-medium text-gray-800 mb-2">Add Emergency Contact</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      value={newContact.name}
                      onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                      placeholder="Contact name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={newContact.phone}
                      onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                      placeholder="Phone number with country code"
                    />
                  </div>
                  <div>
                    <Label htmlFor="relationship">Relationship (Optional)</Label>
                    <Input 
                      id="relationship" 
                      value={newContact.relationship}
                      onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                      placeholder="E.g. Friend, Family, Partner"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setShowAddContact(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1 bg-tropical-turquoise hover:bg-tropical-turquoise/90"
                      onClick={addContact}
                    >
                      Save Contact
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowAddContact(true)}
              >
                <Phone className="h-4 w-4 mr-2" /> Add Emergency Contact
              </Button>
            )}
          </div>
          
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-2">Safety Check-ins</h2>
            <Card className="p-3 mb-3">
              <div className="flex items-start mb-3">
                <Bell className="h-5 w-5 mr-3 text-tropical-coral shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800">Check-in Reminders</h3>
                  <p className="text-sm text-gray-600">
                    Get reminders to check in with your emergency contacts.
                  </p>
                </div>
                <div className="ml-auto">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-success" 
                    defaultChecked={true}
                  />
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-tropical-coral shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800">Location Sharing</h3>
                  <p className="text-sm text-gray-600">
                    Temporarily share your location with emergency contacts.
                  </p>
                </div>
                <div className="ml-auto">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-success" 
                    defaultChecked={false}
                  />
                </div>
              </div>
            </Card>
          </div>
          
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-2">Verification Status</h2>
            <Card className="p-3 mb-3">
              <div className="flex items-start mb-3">
                <CheckCircle className="h-5 w-5 mr-3 text-green-500 shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800">Email Verified</h3>
                  <p className="text-sm text-gray-600">
                    Your email address has been verified.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 mr-3 text-yellow-500 shrink-0" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">Phone Not Verified</h3>
                  <p className="text-sm text-gray-600">
                    Verify your phone number for additional security.
                  </p>
                </div>
                <Button 
                  size="sm"
                  className="bg-tropical-turquoise hover:bg-tropical-turquoise/90"
                >
                  Verify
                </Button>
              </div>
            </Card>
          </div>
          
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-2">Safe Meeting Spots</h2>
            <Card className="p-3">
              <p className="text-sm text-gray-600 mb-3">
                When meeting other travelers for the first time, we recommend public places like:
              </p>
              <ul className="text-sm text-gray-700 space-y-2 ml-5 list-disc">
                <li>Coffee shops during daylight hours</li>
                <li>Hotel lobbies or restaurants</li>
                <li>Popular tourist attractions</li>
                <li>Official information centers</li>
              </ul>
              <Button 
                className="w-full mt-4 bg-tropical-ocean hover:bg-tropical-ocean/90"
                // This would normally open a map view of nearby safe meeting spots
              >
                Find Safe Meeting Spots Nearby
              </Button>
            </Card>
          </div>
        </div>
      </div>
      
      <MobileNavbar />
    </div>
  );
};

export default SafetyCenter;
