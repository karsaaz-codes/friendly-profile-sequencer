
import React from "react";
import { useProfile } from "../../contexts/ProfileContext";
import { Button } from "../ui/button";
import BackButton from "./BackButton";
import ExperienceList from "./experience/ExperienceList";
import ExperienceForm from "./experience/ExperienceForm";
import { Experience } from "../../types/profile";

const ExperienceStep = () => {
  const { experiences, setExperiences, saveAndContinue, skipStep, updateProfileData } = useProfile();

  const addExperience = (experience: Experience) => {
    setExperiences([...experiences, experience]);
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
      {/* Experience list component */}
      <ExperienceList 
        experiences={experiences} 
        onRemove={removeExperience} 
      />

      {/* Experience form component */}
      <ExperienceForm onAddExperience={addExperience} />

      {/* Navigation buttons */}
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
