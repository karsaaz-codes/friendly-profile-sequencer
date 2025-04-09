
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import BackButton from "../components/profile-setup/BackButton";
import { toast } from "../components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "../components/ui/card";
import { Award, BookOpen, Plus, Trash2 } from "lucide-react";

interface Certification {
  title: string;
  issued_by: string;
}

const CertificationForm = () => {
  const navigate = useNavigate();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [newCertification, setNewCertification] = useState<Certification>({
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
      toast({
        title: "Missing information",
        description: "Please fill in both title and issuing organization.",
        variant: "destructive"
      });
      return;
    }

    setCertifications([...certifications, newCertification]);
    setNewCertification({
      title: "",
      issued_by: ""
    });

    toast({
      title: "Certification added",
      description: "Your certification has been added successfully."
    });
  };

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would submit the completed certifications to your backend
    console.log("Submitting certifications:", certifications);

    toast({
      title: "Success!",
      description: "Your certifications have been saved successfully."
    });

    // Navigate to next page or dashboard
    navigate("/dashboard");
  };

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <div className="mb-6">
        <BackButton route="/experience" className="mb-4" />
        <div className="text-center">
          <h1 className="text-2xl font-bold">Professional Certifications</h1>
          <p className="text-muted-foreground mt-2">
            Add any relevant certifications or qualifications you've earned
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Current certifications list */}
        {certifications.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Award className="h-5 w-5" />
              Added Certifications
            </h2>
            
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <Card key={index} className="animate-fade-in">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground">Issued by: {cert.issued_by}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
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
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> 
              Add New Certification
            </CardTitle>
            <CardDescription>
              Enter the details of your professional certification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Certification Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., AWS Certified Solutions Architect"
                value={newCertification.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="issued_by">Issued By *</Label>
              <Input
                id="issued_by"
                name="issued_by"
                placeholder="e.g., Amazon Web Services"
                value={newCertification.issued_by}
                onChange={handleInputChange}
              />
            </div>

            <Button
              type="button"
              onClick={addCertification}
              className="w-full flex gap-2 items-center"
            >
              <Plus className="h-4 w-4" /> Add Certification
            </Button>
          </CardContent>
        </Card>

        {/* Submit button */}
        <div className="pt-4">
          <Button
            type="submit"
            className="w-full py-6 text-base font-medium"
            disabled={certifications.length === 0}
          >
            Save and Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CertificationForm;
