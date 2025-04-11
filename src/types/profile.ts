
export type Experience = {
  job_title: string;
  employer: string;
  duration: number;
  description: string;
  skills: string[];
};

export type Certification = {
  title: string;
  issued_by: string;
};

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
  workExperiences?: Experience[];
  professionalCertifications?: Certification[];
};

export type StepStatus = "not-started" | "in-progress" | "completed" | "skipped";

export type ProfileStep = {
  id: string;
  title: string;
  status: StepStatus;
};
