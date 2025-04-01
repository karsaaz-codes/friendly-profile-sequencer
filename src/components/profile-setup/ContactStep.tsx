
import React, { useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Globe, Linkedin, Mail, Twitter } from "lucide-react";

const ContactStep = () => {
  const { profileData, updateProfileData, saveAndContinue, skipStep } = useProfile();
  const [email, setEmail] = useState(profileData.contactEmail || "");
  const [linkedin, setLinkedin] = useState(profileData.socialLinks.linkedin || "");
  const [twitter, setTwitter] = useState(profileData.socialLinks.twitter || "");
  const [github, setGithub] = useState(profileData.socialLinks.github || "");
  const [website, setWebsite] = useState(profileData.socialLinks.website || "");

  const handleContinue = () => {
    updateProfileData({
      contactEmail: email,
      socialLinks: {
        linkedin,
        twitter,
        github,
        website,
      },
    });
    saveAndContinue();
  };

  return (
    <div className="step-content space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center gap-2">
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </Label>
          <Input
            id="linkedin"
            placeholder="https://linkedin.com/in/yourusername"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="twitter" className="flex items-center gap-2">
            <Twitter className="h-4 w-4" />
            Twitter
          </Label>
          <Input
            id="twitter"
            placeholder="https://twitter.com/yourusername"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github" className="flex items-center gap-2">
            <Github className="h-4 w-4" />
            GitHub
          </Label>
          <Input
            id="github"
            placeholder="https://github.com/yourusername"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Website
          </Label>
          <Input
            id="website"
            placeholder="https://yourwebsite.com"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={skipStep}>
          Skip
        </Button>
        <Button onClick={handleContinue} disabled={email && !/^\S+@\S+\.\S+$/.test(email)}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ContactStep;
