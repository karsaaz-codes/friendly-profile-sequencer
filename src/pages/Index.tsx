
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Our Platform
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Get started by setting up your profile or providing additional information.
                </p>
              </div>
              <div className="space-x-4">
                <Link to="/profile-setup">
                  <Button>Setup Profile</Button>
                </Link>
                <Link to="/user-data">
                  <Button variant="outline">Complete User Data</Button>
                </Link>
                <Link to="/experience">
                  <Button variant="secondary">Add Experience</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
