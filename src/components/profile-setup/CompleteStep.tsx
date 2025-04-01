
import React from "react";
import { useProfile } from "../../contexts/ProfileContext";
import { Button } from "../../components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompleteStep = () => {
  const { profileData } = useProfile();
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  const handleViewProfile = () => {
    navigate("/profile");
  };

  // Count completed sections
  const completedCount = Object.values(profileData).filter(
    (value) => {
      if (typeof value === "string") return value.trim() !== "";
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === "object" && value !== null) {
        return Object.values(value).some((v) => v && typeof v === "string" && v.trim() !== "");
      }
      return false;
    }
  ).length;

  const totalSections = Object.keys(profileData).length;
  const completionPercentage = Math.round((completedCount / totalSections) * 100);

  return (
    <div className="step-content space-y-6 text-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        
        <h2 className="text-2xl font-bold">Profile Setup Complete!</h2>
        
        <p className="text-muted-foreground">
          You've completed {completionPercentage}% of your profile information.
          You can always edit your details later from your profile settings.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3 pt-6">
        <Button onClick={handleViewProfile} variant="outline">
          View My Profile
        </Button>
        <Button onClick={handleGoToDashboard}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default CompleteStep;
