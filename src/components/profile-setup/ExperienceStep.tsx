
import React, { useState } from "react";
import { useProfile } from "../../contexts/ProfileContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Briefcase, Building, Clock, Tag, Plus, Trash2 } from "lucide-react";
import BackButton from "./BackButton";

const ExperienceStep = () => {
  const { experiences, setExperiences, saveAndContinue, skipStep, updateProfileData } = useProfile();
  
  const [newExperience, setNewExperience] = useState({
    job_title: "",
    employer: "",
    duration: 0,
    description: "",
    skills: [] as string[]
  });
  const [newSkill, setNewSkill] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
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
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    // Update profile data with experience information before continuing
    updateProfileData({
      // Store the experiences in the profile data
      // This ensures the data is properly saved within the profile context
      workExperiences: experiences
    });
    
    saveAndContinue();
  };

  return (
    <div className="step-content space-y-6">
      {/* Current experiences list */}
      {experiences.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Added Experiences
          </h2>
          
          <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2">
            {experiences.map((exp, index) => (
              <Card key={index} className="animate-fade-in shadow-sm">
                <CardHeader className="pb-2 pt-3 px-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{exp.job_title}</CardTitle>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Building className="h-3 w-3" /> 
                        {exp.employer}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => removeExperience(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 px-4 pb-3">
                  <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                    <Clock className="h-3 w-3" /> 
                    {exp.duration} {exp.duration === 1 ? 'month' : 'months'}
                  </div>
                  
                  <p className="text-xs mt-1 line-clamp-2">{exp.description}</p>
                  
                  {exp.skills.length > 0 && (
                    <div className="mt-2">
                      <div className="text-xs font-medium flex items-center gap-1 mb-1">
                        <Tag className="h-3 w-3" /> Skills
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {exp.skills.map((skill, i) => (
                          <span 
                            key={i} 
                            className="bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-sm text-xs"
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
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Briefcase className="h-4 w-4" /> 
            Add Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Job Title and Employer */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="job_title" className="text-xs">Job Title *</Label>
              <Input
                id="job_title"
                name="job_title"
                placeholder="Enter job title"
                value={newExperience.job_title}
                onChange={handleInputChange}
                size={1}
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="employer" className="text-xs">Employer *</Label>
              <Input
                id="employer"
                name="employer"
                placeholder="Company name"
                value={newExperience.employer}
                onChange={handleInputChange}
                className="h-8 text-sm"
              />
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-1">
            <Label htmlFor="duration" className="text-xs">Duration (months) *</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              min="1"
              placeholder="Months"
              value={newExperience.duration || ""}
              onChange={handleInputChange}
              className="h-8 text-sm"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label htmlFor="description" className="text-xs">Description *</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your role and responsibilities"
              value={newExperience.description}
              onChange={handleInputChange}
              className="min-h-[80px] text-sm"
            />
          </div>

          {/* Skills */}
          <div className="space-y-1">
            <Label className="text-xs">Skills</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 h-8 text-sm"
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
                className="h-8 text-xs"
                size="sm"
              >
                Add
              </Button>
            </div>

            {/* Skills list */}
            {newExperience.skills.length > 0 && (
              <div className="mt-2">
                <div className="flex flex-wrap gap-1">
                  {newExperience.skills.map((skill, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-1 bg-secondary/50 rounded-full pl-2 pr-1 py-0.5 text-xs animate-fade-in"
                    >
                      {skill}
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-4 w-4 p-0 rounded-full" 
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
            onClick={addExperience}
            disabled={!newExperience.job_title || !newExperience.employer || !newExperience.description || newExperience.duration <= 0}
            className="w-full h-8 text-xs flex items-center gap-1 mt-2"
            size="sm"
          >
            <Plus className="h-3 w-3" /> Add Experience
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-2">
        <BackButton />
        <div className="flex gap-2">
          <Button variant="ghost" onClick={skipStep} size="sm">
            Skip
          </Button>
          <Button onClick={handleContinue} size="sm">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceStep;
