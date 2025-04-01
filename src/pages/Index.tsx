
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleStartProfileSetup = () => {
    navigate("/profile-setup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4">
      <div className="text-center max-w-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your App</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Let's get started by setting up your profile
        </p>
        <Button size="lg" onClick={handleStartProfileSetup}>
          Start Profile Setup
        </Button>
      </div>
    </div>
  );
};

export default Index;
