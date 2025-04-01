
import React, { useState } from "react";
import { useProfile } from "../../contexts/ProfileContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Upload } from "lucide-react";
import BackButton from "./BackButton";

const BasicInfoStep = () => {
  const { profileData, updateProfileData, saveAndContinue, skipStep } = useProfile();
  const [name, setName] = useState(profileData.fullName);
  const [imageSrc, setImageSrc] = useState<string | null>(profileData.profilePicture);

  const handleContinue = () => {
    updateProfileData({ fullName: name, profilePicture: imageSrc });
    saveAndContinue();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImageSrc(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="step-content space-y-6">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative group">
          <Avatar className="w-24 h-24 border-2 border-primary/20">
            <AvatarImage src={imageSrc || ""} alt={name} />
            <AvatarFallback className="text-xl bg-primary/10 text-primary">
              {getInitials(name || "User Profile")}
            </AvatarFallback>
          </Avatar>
          
          <label htmlFor="profile-picture" className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
            <Upload className="h-6 w-6 text-white" />
            <span className="sr-only">Upload profile picture</span>
          </label>
          <input 
            id="profile-picture" 
            type="file" 
            accept="image/*" 
            className="sr-only" 
            onChange={handleImageUpload}
          />
        </div>

        <div className="w-full space-y-3">
          <Label htmlFor="full-name">Full Name</Label>
          <Input
            id="full-name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">This is how you'll appear to others</p>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <BackButton />
        <div className="flex gap-2">
          <Button variant="ghost" onClick={skipStep}>
            Skip
          </Button>
          <Button onClick={handleContinue} disabled={!name.trim()}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;
