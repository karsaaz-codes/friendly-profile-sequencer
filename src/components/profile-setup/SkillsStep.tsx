
import React, { useState } from "react";
import { useProfile } from "../../contexts/ProfileContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { X } from "lucide-react";

const SkillsStep = () => {
  const { profileData, updateProfileData, saveAndContinue, skipStep } = useProfile();
  const [skills, setSkills] = useState<string[]>(profileData.skills || []);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleContinue = () => {
    updateProfileData({ skills });
    saveAndContinue();
  };

  return (
    <div className="step-content space-y-6">
      <div className="space-y-4">
        <div className="space-y-2 animate-fade-in">
          <Label htmlFor="skills">Skills</Label>
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
              disabled={!newSkill.trim()}
              className="transition-all duration-300"
            >
              Add
            </Button>
          </form>
          <p className="text-xs text-muted-foreground">
            Add skills that represent your expertise
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 min-h-[100px]">
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
            <p className="text-sm text-muted-foreground italic animate-fade-in">No skills added yet</p>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={skipStep} className="transition-all duration-200 hover:bg-muted/50">
          Skip
        </Button>
        <Button 
          onClick={handleContinue}
          className="transition-all duration-200 hover:shadow-md"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SkillsStep;
