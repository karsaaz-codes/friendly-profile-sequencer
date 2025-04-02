
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { X, Plus, Briefcase, MapPin, Heart, Code, User } from "lucide-react";
import { toast } from "../components/ui/use-toast";

const UserDataForm = () => {
  const navigate = useNavigate();
  
  // Form state
  const [age, setAge] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [locPreference, setLocPreference] = useState<string>("remote");
  const [workingExperience, setWorkingExperience] = useState<string>("");
  
  // Input state for skills and interests
  const [newSkill, setNewSkill] = useState<string>("");
  const [newInterest, setNewInterest] = useState<string>("");

  // Common interest suggestions
  const interestSuggestions = [
    "Reading", "Travel", "Music", "Sports", "Gaming", 
    "Photography", "Cooking", "Art", "Nature", "Technology"
  ];

  // Add a new skill
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  // Remove a skill
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  // Add a new interest
  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  // Add a suggested interest
  const handleAddSuggestedInterest = (interest: string) => {
    if (!interests.includes(interest)) {
      setInterests([...interests, interest]);
    }
  };

  // Remove an interest
  const handleRemoveInterest = (interestToRemove: string) => {
    setInterests(interests.filter(interest => interest !== interestToRemove));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!age || isNaN(Number(age)) || Number(age) <= 0) {
      toast({
        title: "Invalid age",
        description: "Please enter a valid age",
        variant: "destructive"
      });
      return;
    }

    if (!workingExperience || isNaN(Number(workingExperience)) || Number(workingExperience) < 0) {
      toast({
        title: "Invalid work experience",
        description: "Please enter a valid number of years of experience",
        variant: "destructive"
      });
      return;
    }

    if (skills.length === 0) {
      toast({
        title: "Skills required",
        description: "Please add at least one skill",
        variant: "destructive"
      });
      return;
    }

    // Prepare data to save
    const userData = {
      age: Number(age),
      skills: skills,
      interests: interests,
      loc_preference: locPreference,
      working_experience: Number(workingExperience)
    };

    console.log("Submitting user data:", userData);
    
    // In a real application, you would submit this data to your backend
    // For now, we'll just show a success message and navigate to the dashboard
    toast({
      title: "Success!",
      description: "Your information has been saved successfully.",
    });
    
    // Navigate to dashboard after submission
    navigate("/dashboard");
  };

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Complete Your Profile</h1>
          <p className="text-muted-foreground mt-2">Tell us more about yourself so we can personalize your experience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Age */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <Label htmlFor="age" className="font-medium">Age</Label>
            </div>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
              min="1"
            />
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              <Label htmlFor="skills" className="font-medium">Skills</Label>
            </div>
            <form onSubmit={handleAddSkill} className="flex gap-2">
              <Input
                id="skills"
                placeholder="Add a skill (e.g., JavaScript, Design)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 transition-all duration-300 focus:ring-2 focus:ring-primary/50"
              />
              <Button 
                type="submit" 
                variant="outline"
                disabled={!newSkill.trim()}
                className="transition-all duration-300"
                size="icon"
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add skill</span>
              </Button>
            </form>
            <div className="flex flex-wrap gap-2 mt-4 min-h-[60px]">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="flex items-center gap-1 py-1 px-3 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {skill}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 rounded-full hover:bg-muted p-0.5 transition-colors duration-200"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {skill}</span>
                    </button>
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">No skills added yet</p>
              )}
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <Label htmlFor="interests" className="font-medium">Interests</Label>
            </div>
            <form onSubmit={handleAddInterest} className="flex gap-2">
              <Input
                id="interests"
                placeholder="Add an interest (e.g., Travel, Music)"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                className="flex-1 transition-all duration-300 focus:ring-2 focus:ring-primary/50"
              />
              <Button 
                type="submit" 
                variant="outline"
                disabled={!newInterest.trim()}
                className="transition-all duration-300"
                size="icon"
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add interest</span>
              </Button>
            </form>

            {/* Interest suggestions */}
            <div className="flex flex-wrap gap-2 mt-2">
              {interestSuggestions.map((interest) => (
                <Badge 
                  key={interest}
                  variant="outline"
                  className={`cursor-pointer hover:bg-primary/10 transition-colors ${
                    interests.includes(interest) ? "bg-primary/10" : ""
                  }`}
                  onClick={() => handleAddSuggestedInterest(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-4 min-h-[60px]">
              {interests.length > 0 ? (
                interests.map((interest, index) => (
                  <Badge 
                    key={interest} 
                    variant="secondary" 
                    className="flex items-center gap-1 py-1 px-3 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {interest}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveInterest(interest)}
                      className="ml-1 rounded-full hover:bg-muted p-0.5 transition-colors duration-200"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {interest}</span>
                    </button>
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">No interests added yet</p>
              )}
            </div>
          </div>

          {/* Location Preference */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <Label className="font-medium">Location Preference</Label>
            </div>
            <RadioGroup 
              value={locPreference} 
              onValueChange={setLocPreference}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="remote" id="remote" />
                <Label htmlFor="remote">Remote</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hybrid" id="hybrid" />
                <Label htmlFor="hybrid">Hybrid</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="onsite" id="onsite" />
                <Label htmlFor="onsite">On-site</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Working Experience */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <Label htmlFor="experience" className="font-medium">Years of Experience</Label>
            </div>
            <Input
              id="experience"
              type="number"
              placeholder="Years of professional experience"
              value={workingExperience}
              onChange={(e) => setWorkingExperience(e.target.value)}
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
              min="0"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full py-6 text-base font-medium transition-all duration-200 hover:shadow-md"
            >
              Save and Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDataForm;
