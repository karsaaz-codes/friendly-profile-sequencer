
import React, { useState } from "react";
import { useProfile } from "../../contexts/ProfileContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Award, BookOpen, Plus, Trash2 } from "lucide-react";
import BackButton from "./BackButton";

const CertificationStep = () => {
  const { certifications, setCertifications, saveAndContinue, skipStep, updateProfileData } = useProfile();
  
  const [newCertification, setNewCertification] = useState({
    title: "",
    issued_by: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCertification({ ...newCertification, [name]: value });
  };

  const addCertification = () => {
    // Validate required fields
    if (!newCertification.title || !newCertification.issued_by) {
      return;
    }

    setCertifications([...certifications, newCertification]);
    setNewCertification({
      title: "",
      issued_by: ""
    });
  };

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    // Update profile data with certification information before continuing
    updateProfileData({
      // Store the certifications in the profile data
      // This ensures the data is properly saved within the profile context
      professionalCertifications: certifications
    });
    
    saveAndContinue();
  };

  return (
    <div className="step-content space-y-6">
      {/* Current certifications list */}
      {certifications.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Award className="h-5 w-5" />
            Added Certifications
          </h2>
          
          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
            {certifications.map((cert, index) => (
              <Card key={index} className="animate-fade-in shadow-sm">
                <CardContent className="p-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-sm">{cert.title}</h3>
                    <p className="text-xs text-muted-foreground">Issued by: {cert.issued_by}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => removeCertification(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Add new certification form */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> 
            Add Certification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="title" className="text-xs">Certification Title *</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., AWS Solutions Architect"
              value={newCertification.title}
              onChange={handleInputChange}
              className="h-8 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="issued_by" className="text-xs">Issued By *</Label>
            <Input
              id="issued_by"
              name="issued_by"
              placeholder="e.g., Amazon Web Services"
              value={newCertification.issued_by}
              onChange={handleInputChange}
              className="h-8 text-sm"
            />
          </div>

          <Button
            type="button"
            onClick={addCertification}
            disabled={!newCertification.title || !newCertification.issued_by}
            className="w-full h-8 text-xs flex items-center gap-1 mt-2"
            size="sm"
          >
            <Plus className="h-3 w-3" /> Add Certification
          </Button>
        </CardContent>
      </Card>

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

export default CertificationStep;
