
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, MapPin, Mail, Linkedin, Twitter, Github, Globe, Edit, ArrowLeft,
  Briefcase, Award, Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProfileProvider, useProfile } from "../contexts/ProfileContext";

// Separate ProfileContent component that uses the useProfile hook
const ProfileContent = () => {
  const navigate = useNavigate();
  const { profileData, experiences, certifications } = useProfile();
  
  // Extract profile data from context
  const {
    fullName,
    profilePicture,
    jobTitle,
    company,
    bio,
    skills,
    location,
    contactEmail,
    socialLinks
  } = profileData;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate("/profile-setup")} className="flex items-center gap-1">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        <Card className="shadow-md border-none mb-6">
          <CardHeader className="pb-0">
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              <Avatar className="w-24 h-24 border-2 border-primary/20">
                <AvatarImage src={profilePicture || ""} alt={fullName} />
                <AvatarFallback className="text-xl bg-primary/10 text-primary">
                  {fullName ? fullName.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2) : "U"}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl font-bold">{fullName || "No Name Set"}</h1>
                <p className="text-muted-foreground">{jobTitle || "No Title Set"}</p>
                
                <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                  {company && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span>{company}</span>
                    </div>
                  )}
                  
                  {location && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6 space-y-6">
            {bio && (
              <div>
                <h2 className="text-md font-semibold mb-2">About</h2>
                <p className="text-muted-foreground">{bio}</p>
              </div>
            )}
            
            {skills && skills.length > 0 && (
              <div>
                <h2 className="text-md font-semibold mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Experience Section */}
        {experiences && experiences.length > 0 && (
          <Card className="shadow-md border-none mb-6">
            <CardHeader>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" /> Experience
              </h2>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              {experiences.map((exp, index) => (
                <div key={index} className={`${index !== experiences.length - 1 ? 'border-b pb-4 mb-4' : ''}`}>
                  <h3 className="font-medium">{exp.job_title}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                    <Building2 className="h-3.5 w-3.5" /> {exp.employer}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <Clock className="h-3.5 w-3.5" /> {exp.duration} {exp.duration === 1 ? 'month' : 'months'}
                  </div>
                  <p className="text-sm mb-2">{exp.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {exp.skills.map((skill, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Certifications Section */}
        {certifications && certifications.length > 0 && (
          <Card className="shadow-md border-none mb-6">
            <CardHeader>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" /> Certifications
              </h2>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className={`${index !== certifications.length - 1 ? 'border-b pb-3 mb-3' : ''}`}>
                  <h3 className="font-medium">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">Issued by: {cert.issued_by}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
        
        <Card className="shadow-md border-none">
          <CardHeader>
            <h2 className="text-xl font-semibold">Contact & Social</h2>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contactEmail && (
                <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                  <span>{contactEmail}</span>
                </a>
              )}
              
              {socialLinks?.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
              )}
              
              {socialLinks?.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </a>
              )}
              
              {socialLinks?.github && (
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              )}
              
              {socialLinks?.website && (
                <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                  <Globe className="h-4 w-4" />
                  <span>Website</span>
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Main Profile component wrapped with the ProfileProvider
const Profile = () => {
  return (
    <ProfileProvider>
      <ProfileContent />
    </ProfileProvider>
  );
};

export default Profile;
