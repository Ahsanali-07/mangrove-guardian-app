import { useState } from "react";
import { Camera, MapPin, Send, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { id: "cutting", label: "Illegal Cutting", color: "bg-destructive" },
  { id: "dumping", label: "Waste Dumping", color: "bg-sunset-orange" },
  { id: "pollution", label: "Water Pollution", color: "bg-ocean-blue" },
  { id: "construction", label: "Illegal Construction", color: "bg-earth-brown" },
  { id: "other", label: "Other", color: "bg-muted" },
];

export const ReportScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { toast } = useToast();

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setPhotos(prev => [...prev, ...files]);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast({
            title: "Location captured",
            description: "GPS coordinates have been recorded for your report.",
          });
        },
        () => {
          toast({
            title: "Location access denied",
            description: "Please enable location services for accurate reporting.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleSubmit = () => {
    if (!selectedCategory || !description || photos.length === 0) {
      toast({
        title: "Incomplete report",
        description: "Please fill all required fields and add at least one photo.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Report submitted successfully!",
      description: "Thank you for protecting our mangroves. You've earned 50 points!",
    });
    
    // Reset form
    setSelectedCategory("");
    setDescription("");
    setPhotos([]);
    setLocation(null);
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <div className="pt-12 pb-8 px-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 animate-float">
          <Camera className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Report Incident</h1>
        <p className="text-white/80">Help protect our mangrove ecosystems</p>
      </div>

      <div className="bg-background rounded-t-3xl min-h-96 pt-6 px-6">
        <div className="space-y-6 pb-6">
          {/* Category Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What type of incident?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className={`p-3 cursor-pointer text-center justify-center ${
                      selectedCategory === category.id 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.label}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Describe what you observed in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="h-8 w-8 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                  />
                </label>
                
                {photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  onClick={getLocation}
                  className="w-full"
                  disabled={!!location}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {location ? "Location Captured" : "Get Current Location"}
                </Button>
                
                {location && (
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Latitude: {location.lat.toFixed(6)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Longitude: {location.lng.toFixed(6)}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            size="lg"
          >
            <Send className="h-4 w-4 mr-2" />
            Submit Report
          </Button>
        </div>
      </div>
    </div>
  );
};