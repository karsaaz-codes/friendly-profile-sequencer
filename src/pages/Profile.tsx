import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, MapPin, Mail, Linkedin, Twitter, Github, Globe, LogOut, Edit, 
  Briefcase, Award, Clock, User2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: number;
  user_id: number;
  bio: string;
  location: string;
  contact_email: string;
  company: string;
  age: number;
  skills: string[];
  interests: string[];
  full_name: string;
  loc_preference: string;
  working_experience: number;
  profile_pic_id: string | null;
  github_link: string;
  twitter_link: string;
  linkedin_link: string;
  website_link: string;
}

interface Experience {
  job_title: string;
  employer: string;
  duration: string;
  description: string;
  skills: string[];
}

interface Certification {
  id: number;
  user_id: number;
  title: string;
  issued_by: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("appToken");
        if (!token) {
          navigate("/sign-in");
          return;
        }
        const response = await axios.get(`${BASE_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setProfile(response.data.profile);
        setExperiences(response.data.experiences || []);
        setCertifications(response.data.certifications || []);
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Error fetching profile",
          description: err instanceof Error ? err.message : "Failed to load profile"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem("appToken");
    navigate("/sign-in");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-12 bg-muted rounded-full mx-auto" />
          <div className="h-4 w-32 bg-muted rounded mx-auto" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-[400px]">
          <CardHeader className="text-center space-y-2">
            <User2 className="w-12 h-12 mx-auto text-muted-foreground" />
            <h2 className="text-xl font-semibold">Profile Not Found</h2>
            <p className="text-muted-foreground">You haven't created a profile yet.</p>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => navigate("/create-profile")}>
              Create Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Card */}
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <Avatar className="w-24 h-24 border-2 border-primary/20">
                {profile.profile_pic_id ? (
                  <AvatarImage src={profile.profile_pic_id} alt={profile.full_name} />
                ) : (
                  <AvatarFallback className="text-xl bg-primary/10 text-primary">
                    {profile.full_name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
              
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold mb-1">{profile.full_name || "Anonymous User"}</h1>
                <p className="text-muted-foreground mb-3">{profile.bio || "No bio provided"}</p>
                
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-4">
                  {profile.company && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span>{profile.company}</span>
                    </div>
                  )}
                  
                  {profile.location && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  
                  {profile.contact_email && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{profile.contact_email}</span>
                    </div>
                  )}
                </div>

                {profile.skills && profile.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="px-2 py-0.5">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Experience Section */}
        {experiences.length > 0 && (
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Work Experience
              </h2>
            </CardHeader>
            <CardContent className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className={index !== experiences.length - 1 ? "pb-6 border-b" : ""}>
                  <h3 className="font-medium text-lg">{exp.job_title}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                    <Building2 className="h-4 w-4" /> {exp.employer}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4" /> {exp.duration}
                  </div>
                  <p className="text-sm mb-3">{exp.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills?.map((skill, i) => (
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
        {certifications.length > 0 && (
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Certifications
              </h2>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-4 rounded-lg bg-muted/50">
                  <h3 className="font-medium mb-1">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">{cert.issued_by}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Social Links */}
        {(profile.github_link || profile.linkedin_link || profile.twitter_link || profile.website_link) && (
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <h2 className="text-xl font-semibold">Connect & Social</h2>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profile.github_link && (
                <a 
                  href={profile.github_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              )}
              {profile.linkedin_link && (
                <a 
                  href={profile.linkedin_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
              )}
              {profile.twitter_link && (
                <a 
                  href={profile.twitter_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </a>
              )}
              {profile.website_link && (
                <a 
                  href={profile.website_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span>Website</span>
                </a>
              )}
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex justify-between gap-4">
          <Button variant="outline" onClick={() => navigate("/profile/edit")} className="flex-1 sm:flex-none">
            <Edit className="w-4 h-4 mr-2" /> Edit Profile
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleLogout}
            className="flex-1 sm:flex-none"
          >
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
