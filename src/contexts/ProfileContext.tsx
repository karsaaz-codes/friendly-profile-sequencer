import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProfileData, ProfileStep } from "../types/profile";
import { toast } from "../components/ui/use-toast";

interface ProfileContextType {
  profileData: ProfileData;
  updateProfileData: (data: Partial<ProfileData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: ProfileStep[];
  updateStepStatus: (stepId: string, status: ProfileStep["status"]) => void;
  isCompleted: boolean;
  saveAndContinue: () => void;
  skipStep: () => void;
  goToPreviousStep: () => void;
}

const defaultProfileData: ProfileData = {
  fullName: "",
  profilePicture: null,
  jobTitle: "",
  company: "",
  bio: "",
  skills: [],
  location: "",
  contactEmail: "",
  socialLinks: {},
};

const defaultSteps: ProfileStep[] = [
  { id: "basics", title: "Basic Info", status: "not-started" },
  { id: "about", title: "About You", status: "not-started" },
  { id: "skills", title: "Skills", status: "not-started" },
  { id: "location", title: "Location", status: "not-started" },
  { id: "contact", title: "Contact", status: "not-started" },
  { id: "complete", title: "Complete", status: "not-started" },
];

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfileData);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<ProfileStep[]>(defaultSteps);
  const [isCompleted, setIsCompleted] = useState(false);

  const updateProfileData = (data: Partial<ProfileData>) => {
    setProfileData((prev) => ({ ...prev, ...data }));
  };

  const updateStepStatus = (stepId: string, status: ProfileStep["status"]) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId ? { ...step, status } : step
      )
    );
  };

  const saveAndContinue = () => {
    const currentStepId = steps[currentStep].id;
    updateStepStatus(currentStepId, "completed");
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      const nextStepId = steps[currentStep + 1].id;
      updateStepStatus(nextStepId, "in-progress");
    } else {
      setIsCompleted(true);
      toast({
        title: "Profile completed!",
        description: "Your profile has been successfully set up.",
        duration: 5000,
      });
    }
  };

  const skipStep = () => {
    const currentStepId = steps[currentStep].id;
    updateStepStatus(currentStepId, "skipped");
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      const nextStepId = steps[currentStep + 1].id;
      updateStepStatus(nextStepId, "in-progress");
    } else {
      setIsCompleted(true);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      const currentStepId = steps[currentStep].id;
      if (steps[currentStep].status === "in-progress") {
        updateStepStatus(currentStepId, "not-started");
      }
      
      setCurrentStep(currentStep - 1);
      
      const prevStepId = steps[currentStep - 1].id;
      updateStepStatus(prevStepId, "in-progress");
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        updateProfileData,
        currentStep,
        setCurrentStep,
        steps,
        updateStepStatus,
        isCompleted,
        saveAndContinue,
        skipStep,
        goToPreviousStep,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
