
import React from "react";
import { useProfile } from "../../contexts/ProfileContext";
import { Button } from "../../components/ui/button";
import { CheckCircle2, Briefcase, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

const CompleteStep = () => {
  const { profileData, experiences, certifications } = useProfile();
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

  // Add experience and certification counts to completion percentage
  const totalSections = Object.keys(profileData).length;
  const experienceSection = experiences.length > 0 ? 1 : 0;
  const certificationSection = certifications.length > 0 ? 1 : 0;
  const totalWithExtra = totalSections + experienceSection + certificationSection;
  const completedWithExtra = completedCount + experienceSection + certificationSection;
  const completionPercentage = Math.round((completedWithExtra / totalWithExtra) * 100);

  return (
    <div className="step-content space-y-6">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        
        <h2 className="text-2xl font-bold">Profile Setup Complete!</h2>
        
        <p className="text-muted-foreground text-center">
          You've completed {completionPercentage}% of your profile information.
          You can always edit your details later from your profile settings.
        </p>
      </div>

      {/* Profile summary cards */}
      <div className="space-y-6 w-full max-w-md mx-auto">
        {/* Experience summary */}
        {experiences.length > 0 && (
          <Card className="shadow-sm">
            <CardContent className="pt-4">
              <h3 className="text-base font-semibold flex items-center gap-2 mb-3">
                <Briefcase className="h-4 w-4 text-primary" />
                Experience ({experiences.length})
              </h3>
              <div className="space-y-3">
                {experiences.map((exp, index) => (
                  <div key={index} className="border-b pb-2 last:border-0 last:pb-0">
                    <div className="font-medium text-sm">{exp.job_title}</div>
                    <div className="text-xs text-muted-foreground">{exp.employer} • {exp.duration} {exp.duration === 1 ? 'month' : 'months'}</div>
                    {exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {exp.skills.slice(0, 3).map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs px-1 py-0">{skill}</Badge>
                        ))}
                        {exp.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs px-1 py-0">+{exp.skills.length - 3}</Badge>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Certifications summary */}
        {certifications.length > 0 && (
          <Card className="shadow-sm">
            <CardContent className="pt-4">
              <h3 className="text-base font-semibold flex items-center gap-2 mb-3">
                <Award className="h-4 w-4 text-primary" />
                Certifications ({certifications.length})
              </h3>
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <div key={index} className="border-b pb-2 last:border-0 last:pb-0">
                    <div className="font-medium text-sm">{cert.title}</div>
                    <div className="text-xs text-muted-foreground">Issued by: {cert.issued_by}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
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
