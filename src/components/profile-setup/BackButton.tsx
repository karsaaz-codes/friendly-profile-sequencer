
import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { useProfile } from "../../contexts/ProfileContext";

interface BackButtonProps {
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const { currentStep, goToPreviousStep } = useProfile();
  
  // Don't render the back button on the first step
  if (currentStep === 0) {
    return null;
  }

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={goToPreviousStep} 
      className={`gap-1 ${className || ""}`}
    >
      <ChevronLeft className="h-4 w-4" />
      Back
    </Button>
  );
};

export default BackButton;
