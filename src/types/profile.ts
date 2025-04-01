
export type ProfileData = {
  fullName: string;
  profilePicture: string | null;
  jobTitle: string;
  company: string;
  bio: string;
  skills: string[];
  location: string;
  contactEmail: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
};

export type StepStatus = "not-started" | "in-progress" | "completed" | "skipped";

export type ProfileStep = {
  id: string;
  title: string;
  status: StepStatus;
};
