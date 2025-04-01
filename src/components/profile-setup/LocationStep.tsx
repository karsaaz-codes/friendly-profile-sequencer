
import React, { useState } from "react";
import { useProfile } from "../../contexts/ProfileContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { MapPin } from "lucide-react";

const LocationStep = () => {
  const { profileData, updateProfileData, saveAndContinue, skipStep } = useProfile();
  const [location, setLocation] = useState(profileData.location);

  const handleContinue = () => {
    updateProfileData({ location });
    saveAndContinue();
  };

  return (
    <div className="step-content space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Your Location</Label>
          <Input
            id="location"
            placeholder="City, Country"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Share your city or region to connect with people nearby
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={skipStep}>
          Skip
        </Button>
        <Button onClick={handleContinue} disabled={!location.trim()}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default LocationStep;
