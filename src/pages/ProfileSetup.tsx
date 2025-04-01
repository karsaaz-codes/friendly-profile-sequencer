import React, { useEffect } from "react";
import { ProfileProvider, useProfile } from "../contexts/ProfileContext";
import ProfileSetupLayout from "../components/profile-setup/ProfileSetupLayout";
import BasicInfoStep from "../components/profile-setup/BasicInfoStep";
import AboutStep from "../components/profile-setup/AboutStep";
import SkillsStep from "../components/profile-setup/SkillsStep";
import LocationStep from "../components/profile-setup/LocationStep";
import ContactStep from "../components/profile-setup/ContactStep";
import CompleteStep from "../components/profile-setup/CompleteStep";

const ProfileSetupContent = () => {
  const { currentStep, steps, updateStepStatus } = useProfile();

  useEffect(() => {
    // Mark the first step as in-progress when first loaded
    if (steps[0].status === "not-started") {
      updateStepStatus(steps[0].id, "in-progress");
    }
  }, [steps, updateStepStatus]);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep />;
      case 1:
        return <AboutStep />;
      case 2:
        return <SkillsStep />;
      case 3:
        return <LocationStep />;
      case 4:
        return <ContactStep />;
      case 5:
        return <CompleteStep />;
      default:
        return <BasicInfoStep />;
    }
  };

  return (
    <ProfileSetupLayout>
      {renderStep()}
    </ProfileSetupLayout>
  );
};

const ProfileSetup = () => {
  return (
    <ProfileProvider>
      <ProfileSetupContent />
    </ProfileProvider>
  );
};

export default ProfileSetup;
