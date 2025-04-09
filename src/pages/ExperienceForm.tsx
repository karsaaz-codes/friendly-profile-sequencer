
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
  Clock,
  Tag,
  ChevronRight
} from "lucide-react";

interface Experience {
  job_title: string;
  employer: string;
  duration: number; // in months
  description: string;
  skills: string[];
}

const ExperienceForm = () => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [newExperience, setNewExperience] = useState<Experience>({
    job_title: "",
    employer: "",
    duration: 0,
    description: "",
    skills: []
  });
  const [newSkill, setNewSkill] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Special handling for duration as a number
    if (name === 'duration') {
      setNewExperience({ ...newExperience, [name]: parseInt(value) || 0 });
    } else {
      setNewExperience({ ...newExperience, [name]: value });
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setNewExperience({
        ...newExperience,
        skills: [...newExperience.skills, newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setNewExperience({
      ...newExperience,
      skills: newExperience.skills.filter((_, i) => i !== index)
    });
  };

  const addExperience = () => {
    // Validate required fields
    if (!newExperience.job_title || !newExperience.employer || !newExperience.description || newExperience.duration <= 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and ensure duration is greater than 0.",
        variant: "destructive"
      });
      return;
    }

    setExperiences([...experiences, newExperience]);
    setNewExperience({
      job_title: "",
      employer: "",
      duration: 0,
      description: "",
      skills: []
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

    // Navigate to certification page after submission
    navigate("/certification");
  };

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <div className="mb-6">
        <BackButton route="/" className="mb-4" />
        <div className="text-center">
          <h1 className="text-2xl font-bold">Professional Experience</h1>
          <p className="text-muted-foreground mt-2">
            Tell us about your work history and professional skills
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
                        <CardTitle className="text-lg">{exp.job_title}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <Building className="h-4 w-4" /> 
                          {exp.employer}
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
                      <Clock className="h-4 w-4" /> 
                      {exp.duration} {exp.duration === 1 ? 'month' : 'months'}
                    </div>
                    
                    <p className="text-sm mt-2">{exp.description}</p>
                    
                    {exp.skills.length > 0 && (
                      <div className="mt-3">
                        <div className="text-sm font-medium flex items-center gap-1 mb-2">
                          <Tag className="h-4 w-4" /> Skills
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, i) => (
                            <span 
                              key={i} 
                              className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
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
              <Briefcase className="h-5 w-5" /> 
              Add New Experience
            </CardTitle>
            <CardDescription>
              Fill in the details about your work experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Job Title and Employer */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="job_title">Job Title *</Label>
                <Input
                  id="job_title"
                  name="job_title"
                  placeholder="Enter your job title"
                  value={newExperience.job_title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employer">Employer *</Label>
                <Input
                  id="employer"
                  name="employer"
                  placeholder="Enter company name"
                  value={newExperience.employer}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (months) *</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                min="1"
                placeholder="Enter duration in months"
                value={newExperience.duration || ""}
                onChange={handleInputChange}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your responsibilities and role"
                value={newExperience.description}
                onChange={handleInputChange}
                className="min-h-[100px]"
              />
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <Label>Skills</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={addSkill}
                  disabled={!newSkill.trim()}
                >
                  Add
                </Button>
              </div>

              {/* Skills list */}
              {newExperience.skills.length > 0 && (
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {newExperience.skills.map((skill, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-1 bg-secondary/50 rounded-full pl-3 pr-2 py-1 text-sm animate-fade-in"
                      >
                        {skill}
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-5 w-5 p-0 rounded-full" 
                          onClick={() => removeSkill(index)}
                        >
                          <span className="sr-only">Remove</span>
                          <span aria-hidden="true">×</span>
                        </Button>
                      </div>
                    ))}
                  </div>
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
            className="w-full py-6 text-base font-medium flex items-center justify-center gap-2"
            disabled={experiences.length === 0}
          >
            Continue to Certifications <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ExperienceForm;
