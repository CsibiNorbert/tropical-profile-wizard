
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ArrowLeft, CalendarIcon, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const CreateTrip = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<[Date | undefined, Date | undefined]>([undefined, undefined]);
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-tropical-turquoise/10 to-tropical-coral/10">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/itinerary')}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">New Trip</h1>
        </div>
        
        <Card className="p-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="destination" placeholder="City, country" className="pl-9" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dates">Travel Dates</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="dates"
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange[0] && dateRange[1] ? (
                      <>
                        {format(dateRange[0], "PPP")} - {format(dateRange[1], "PPP")}
                      </>
                    ) : (
                      <span>Select date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={{
                      from: dateRange[0],
                      to: dateRange[1]
                    }}
                    onSelect={(range) => {
                      setDateRange([range?.from, range?.to]);
                    }}
                    numberOfMonths={2}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <textarea 
                id="description" 
                className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md min-h-24"
                placeholder="Tell a bit about your trip"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cover">Cover Photo (optional)</Label>
              <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Drag and drop an image or click to browse
                </p>
                <Button variant="outline" size="sm">
                  Choose Image
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              className="w-full bg-tropical-turquoise hover:bg-tropical-turquoise/90"
              onClick={() => {
                // In a real app, this would save the trip data
                // For now, navigate back to the itinerary page
                navigate('/itinerary');
              }}
            >
              Create Trip
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateTrip;
