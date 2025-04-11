
import React from "react";
import { Experience } from "../../../types/profile";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Briefcase, Building, Clock, Tag, Trash2 } from "lucide-react";

interface ExperienceListProps {
  experiences: Experience[];
  onRemove: (index: number) => void;
}

const ExperienceList: React.FC<ExperienceListProps> = ({ experiences, onRemove }) => {
  if (experiences.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <Briefcase className="h-5 w-5" />
        Added Experiences
      </h2>
      
      <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2">
        {experiences.map((exp, index) => (
          <Card key={index} className="animate-fade-in shadow-sm">
            <CardHeader className="pb-2 pt-3 px-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">{exp.job_title}</CardTitle>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Building className="h-3 w-3" /> 
                    {exp.employer}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                  onClick={() => onRemove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0 px-4 pb-3">
              <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                <Clock className="h-3 w-3" /> 
                {exp.duration} {exp.duration === 1 ? 'month' : 'months'}
              </div>
              
              <p className="text-xs mt-1 line-clamp-2">{exp.description}</p>
              
              {exp.skills.length > 0 && (
                <div className="mt-2">
                  <div className="text-xs font-medium flex items-center gap-1 mb-1">
                    <Tag className="h-3 w-3" /> Skills
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {exp.skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className="bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-sm text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExperienceList;
