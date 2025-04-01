
import React from "react";
import { useProfile } from "../../contexts/ProfileContext";
import { Progress } from "../../components/ui/progress";
import { Card } from "../../components/ui/card";

interface ProfileSetupLayoutProps {
  children: React.ReactNode;
}

const ProfileSetupLayout: React.FC<ProfileSetupLayoutProps> = ({ children }) => {
  const { steps, currentStep } = useProfile();
  
  // Calculate progress percentage
  const totalSteps = steps.length - 1; // Exclude final complete step from calculation
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-secondary/30 to-background p-4 sm:p-6 transition-all duration-300">
      <Card className="w-full max-w-3xl p-6 sm:p-8 shadow-xl border-none animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground text-center mb-4">Step {currentStep + 1} of {steps.length}</p>
          <Progress value={progressPercentage} className="h-2" />
          
          <div className="flex justify-between mt-3 text-xs text-muted-foreground">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`${
                  index === currentStep 
                    ? "text-primary font-medium" 
                    : index < currentStep 
                      ? "text-muted-foreground" 
                      : "text-muted-foreground/50"
                } transition-colors duration-200`}
              >
                {step.title}
              </div>
            ))}
          </div>
        </div>
        
        <div className="step-content-wrapper">
          {children}
        </div>
      </Card>
      
      <p className="mt-4 text-sm text-muted-foreground text-center">
        Your information helps us personalize your experience
      </p>
    </div>
  );
};

export default ProfileSetupLayout;
