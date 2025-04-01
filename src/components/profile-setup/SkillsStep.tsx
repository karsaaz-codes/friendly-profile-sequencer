
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
        <div className="space-y-2">
          <Label htmlFor="skills">Skills</Label>
          <form onSubmit={handleAddSkill} className="flex gap-2">
            <Input
              id="skills"
              placeholder="Add a skill (e.g., JavaScript, Design)"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={!newSkill.trim()}>Add</Button>
          </form>
          <p className="text-xs text-muted-foreground">
            Add skills that represent your expertise
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="flex items-center gap-1 py-1 px-3">
                {skill}
                <button 
                  type="button" 
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-1 rounded-full hover:bg-muted p-0.5"
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

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={skipStep}>
          Skip
        </Button>
        <Button onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SkillsStep;
