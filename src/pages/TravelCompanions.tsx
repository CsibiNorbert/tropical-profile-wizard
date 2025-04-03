
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Sheet, 
  SheetTrigger, 
  SheetContent, 
  SheetTitle, 
  SheetDescription, 
  SheetHeader,
  SheetFooter
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Search, Filter, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { PopoverTrigger, Popover, PopoverContent } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import MobileNavbar from "@/components/layout/MobileNavbar";
import TravelerCard from "@/components/travelers/TravelerCard";
import { mockTravelers } from "@/data/mockTravelers";

const TravelCompanions = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState<[Date | undefined, Date | undefined]>([undefined, undefined]);
  const [ageRange, setAgeRange] = useState([18, 65]);
  const [filteredTravelers, setFilteredTravelers] = useState(mockTravelers);
  
  const handleSearch = () => {
    // In a real app, this would make an API call to fetch matching travelers
    // For now, we'll just filter our mock data
    const filtered = mockTravelers.filter(traveler => {
      // Filter by destination (case-insensitive partial match)
      const destinationMatch = !destination || 
        traveler.destination.toLowerCase().includes(destination.toLowerCase());
        
      // Filter by age range
      const ageMatch = traveler.age >= ageRange[0] && traveler.age <= ageRange[1];
      
      // Filter by date - simplified for demo purposes
      // In a real app, we would check for overlap between travel dates
      const dateMatch = !dateRange[0] || !dateRange[1] || 
        (traveler.startDate <= dateRange[1] && traveler.endDate >= dateRange[0]);
      
      return destinationMatch && ageMatch && dateMatch;
    });
    
    setFilteredTravelers(filtered);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-tropical-turquoise/10 to-tropical-coral/10 pb-16">
      <div className="sticky top-0 bg-white z-10 shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Find Companions</h1>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Travelers</SheetTitle>
                  <SheetDescription>
                    Find companions who match your preferences.
                  </SheetDescription>
                </SheetHeader>
                
                <div className="py-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Travel Dates</label>
                    <div className="grid gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
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
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Age Range</label>
                    <div className="px-2">
                      <Slider
                        defaultValue={[18, 65]}
                        min={18}
                        max={80}
                        step={1}
                        value={ageRange}
                        onValueChange={setAgeRange}
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <div>{ageRange[0]} years</div>
                        <div>{ageRange[1]} years</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Add more filters here: Travel style, interests, etc. */}
                </div>
                
                <SheetFooter>
                  <Button 
                    className="w-full bg-tropical-turquoise hover:bg-tropical-turquoise/90"
                    onClick={() => {
                      handleSearch();
                    }}
                  >
                    Apply Filters
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search destinations..." 
                className="pl-9"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <Button 
              className="bg-tropical-turquoise hover:bg-tropical-turquoise/90"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-2">
        <p className="text-sm text-gray-500 mb-4">
          {filteredTravelers.length} travelers found
        </p>
        
        <div className="space-y-4">
          {filteredTravelers.map((traveler) => (
            <TravelerCard 
              key={traveler.id} 
              traveler={traveler} 
              onSendRequest={() => navigate(`/chat/${traveler.id}`)}
              onViewProfile={() => {}}
            />
          ))}
          
          {filteredTravelers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No travelers found matching your search criteria.</p>
              <Button 
                variant="link" 
                className="text-tropical-turquoise"
                onClick={() => {
                  setDestination("");
                  setDateRange([undefined, undefined]);
                  setAgeRange([18, 65]);
                  setFilteredTravelers(mockTravelers);
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <MobileNavbar />
    </div>
  );
};

export default TravelCompanions;
