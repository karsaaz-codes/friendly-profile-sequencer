
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import BackButton from "../components/profile-setup/BackButton";
import { toast } from "../components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { 
  Briefcase, 
  Building, 
  Calendar, 
  GraduationCap,
  Award
} from "lucide-react";

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
  achievements: string[];
}

const ExperienceForm = () => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [newExperience, setNewExperience] = useState<Experience>({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    description: "",
    achievements: []
  });
  const [newAchievement, setNewAchievement] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewExperience({ ...newExperience, [name]: value });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setNewExperience({ 
      ...newExperience, 
      currentlyWorking: checked,
      endDate: checked ? "" : newExperience.endDate 
    });
  };

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setNewExperience({
        ...newExperience,
        achievements: [...newExperience.achievements, newAchievement.trim()]
      });
      setNewAchievement("");
    }
  };

  const removeAchievement = (index: number) => {
    setNewExperience({
      ...newExperience,
      achievements: newExperience.achievements.filter((_, i) => i !== index)
    });
  };

  const addExperience = () => {
    // Validate required fields
    if (!newExperience.company || !newExperience.position || !newExperience.startDate) {
      toast({
        title: "Missing information",
        description: "Please fill in company, position, and start date.",
        variant: "destructive"
      });
      return;
    }

    if (!newExperience.currentlyWorking && !newExperience.endDate) {
      toast({
        title: "Missing end date",
        description: "Please provide an end date or check 'Currently working here'.",
        variant: "destructive"
      });
      return;
    }

    setExperiences([...experiences, newExperience]);
    setNewExperience({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      description: "",
      achievements: []
    });

    toast({
      title: "Experience added",
      description: "Your work experience has been added successfully."
    });
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would submit the completed experiences to your backend
    console.log("Submitting experiences:", experiences);

    toast({
      title: "Success!",
      description: "Your work experience has been saved successfully."
    });

    // Navigate to dashboard after submission
    navigate("/dashboard");
  };

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <div className="mb-6">
        <BackButton route="/" className="mb-4" />
        <div className="text-center">
          <h1 className="text-2xl font-bold">Professional Experience</h1>
          <p className="text-muted-foreground mt-2">
            Tell us about your work history and professional achievements
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Current experiences list */}
        {experiences.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Added Experiences
            </h2>
            
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <Card key={index} className="animate-fade-in">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{exp.position}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <Building className="h-4 w-4" /> 
                          {exp.company}
                        </CardDescription>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                        onClick={() => removeExperience(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                      <Calendar className="h-4 w-4" /> 
                      {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                    </div>
                    
                    {exp.description && (
                      <p className="text-sm mt-2">{exp.description}</p>
                    )}
                    
                    {exp.achievements.length > 0 && (
                      <div className="mt-3">
                        <div className="text-sm font-medium flex items-center gap-1 mb-1">
                          <Award className="h-4 w-4" /> Key Achievements
                        </div>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Add new experience form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <GraduationCap className="h-5 w-5" /> 
              Add New Experience
            </CardTitle>
            <CardDescription>
              Fill in the details about your work experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Company and Position */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Enter company name"
                  value={newExperience.company}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  name="position"
                  placeholder="Enter your job title"
                  value={newExperience.position}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={newExperience.startDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date {!newExperience.currentlyWorking && "*"}</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={newExperience.endDate}
                  onChange={handleInputChange}
                  disabled={newExperience.currentlyWorking}
                />
              </div>
            </div>

            {/* Currently working */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="currentlyWorking"
                checked={newExperience.currentlyWorking}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="currentlyWorking">I currently work here</Label>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your responsibilities and role"
                value={newExperience.description}
                onChange={handleInputChange}
                className="min-h-[100px]"
              />
            </div>

            {/* Achievements */}
            <div className="space-y-2">
              <Label>Key Achievements</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add an achievement"
                  value={newAchievement}
                  onChange={(e) => setNewAchievement(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={addAchievement}
                  disabled={!newAchievement.trim()}
                >
                  Add
                </Button>
              </div>

              {/* Achievement list */}
              {newExperience.achievements.length > 0 && (
                <div className="mt-3">
                  <ul className="space-y-1">
                    {newExperience.achievements.map((achievement, index) => (
                      <li 
                        key={index} 
                        className="flex justify-between items-center p-2 rounded bg-muted/50 animate-fade-in"
                      >
                        <span className="text-sm">{achievement}</span>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0" 
                          onClick={() => removeAchievement(index)}
                        >
                          <span className="sr-only">Remove</span>
                          <span aria-hidden="true">×</span>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Button 
              type="button" 
              className="w-full" 
              onClick={addExperience}
            >
              Add Experience
            </Button>
          </CardContent>
        </Card>

        {/* Submit button */}
        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full py-6 text-base font-medium"
            disabled={experiences.length === 0}
          >
            Save and Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ExperienceForm;
