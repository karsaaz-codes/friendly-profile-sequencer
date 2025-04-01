
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <p className="text-muted-foreground">
          This is a placeholder dashboard page. Your profile setup is complete!
        </p>
        <div className="flex flex-col gap-2">
          <Button onClick={() => navigate("/profile")}>View Profile</Button>
          <Button variant="outline" onClick={() => navigate("/profile-setup")}>
            Edit Profile Setup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
