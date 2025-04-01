
import React, { useState } from "react";
import { useProfile } from "../../contexts/ProfileContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import BackButton from "./BackButton";

const AboutStep = () => {
  const { profileData, updateProfileData, saveAndContinue, skipStep } = useProfile();
  const [jobTitle, setJobTitle] = useState(profileData.jobTitle);
  const [company, setCompany] = useState(profileData.company);
  const [bio, setBio] = useState(profileData.bio);

  const handleContinue = () => {
    updateProfileData({ jobTitle, company, bio });
    saveAndContinue();
  };

  return (
    <div className="step-content space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="job-title">Job Title</Label>
          <Input
            id="job-title"
            placeholder="Software Engineer"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company/Organization</Label>
          <Input
            id="company"
            placeholder="Acme Inc."
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us a little about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            Brief description about your background and interests
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <BackButton />
        <div className="flex gap-2">
          <Button variant="ghost" onClick={skipStep}>
            Skip
          </Button>
          <Button 
            onClick={handleContinue}
            disabled={!jobTitle.trim() && !company.trim() && !bio.trim()}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutStep;
