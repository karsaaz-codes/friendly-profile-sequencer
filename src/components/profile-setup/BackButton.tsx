
import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { useProfile } from "../../contexts/ProfileContext";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  className?: string;
  onClick?: () => void;
  route?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className, onClick, route }) => {
  const navigate = useNavigate();
  const { currentStep, goToPreviousStep } = useProfile();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (route) {
      navigate(route);
    } else if (currentStep !== undefined) {
      // Don't render the back button on the first step of profile setup
      if (currentStep === 0) {
        return null;
      }
      goToPreviousStep();
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleClick} 
      className={`gap-1 ${className || ""}`}
    >
      <ChevronLeft className="h-4 w-4" />
      Back
    </Button>
  );
};

export default BackButton;
