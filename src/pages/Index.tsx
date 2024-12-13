import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Plus, BookOpen, Play } from "lucide-react";
import WaveformVisualizer from "@/components/WaveformVisualizer";
import ProjectCard from "@/components/ProjectCard";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const recentProjects = [
    { name: "Lo-fi Beat", genre: "Lo-fi Hip Hop", lastModified: "2h ago" },
    { name: "Ambient Pad", genre: "Ambient", lastModified: "1d ago" },
    { name: "Dance Track", genre: "Electronic", lastModified: "3d ago" },
  ];

  return (
    <div className="min-h-screen bg-daw-background text-daw-text">
      {/* Navigation Bar */}
      <nav className="border-b border-daw-secondary p-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-daw-text hover:bg-daw-secondary">
                Home
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-4 w-[200px] bg-daw-secondary">
                  <NavigationMenuLink className="block p-2 hover:bg-daw-accent/20 rounded cursor-pointer">
                    Dashboard
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-daw-text hover:bg-daw-secondary">
                Library
              </NavigationMenuTrigger>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-daw-text hover:bg-daw-secondary">
                Projects
              </NavigationMenuTrigger>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-daw-text hover:bg-daw-secondary">
                Account
              </NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      <main className="max-w-6xl mx-auto p-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Music Studio</h1>
          <p className="text-xl text-daw-text/60 mb-8">
            Create amazing music with the power of AI
          </p>
        </div>

        {/* Prompt Input */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Input
              placeholder="Describe your music (e.g., 'Create a lo-fi beat at 80 bpm')"
              className="bg-daw-secondary border-daw-accent text-daw-text pl-4 pr-12 py-6 text-lg"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-daw-accent hover:text-daw-accent/80 hover:bg-transparent"
            >
              <Mic className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center gap-4 mb-16">
          <Button
            className="bg-daw-accent hover:bg-daw-accent/80 text-white px-6 py-2 flex items-center gap-2"
            onClick={() => navigate("/workspace")}
          >
            <Plus className="h-5 w-5" /> New Project
          </Button>
          <Button
            variant="outline"
            className="border-daw-accent text-daw-accent hover:bg-daw-accent/10"
          >
            <Play className="h-5 w-5 mr-2" /> Browse Loops
          </Button>
          <Button
            variant="outline"
            className="border-daw-accent text-daw-accent hover:bg-daw-accent/10"
          >
            <BookOpen className="h-5 w-5 mr-2" /> Tutorial
          </Button>
        </div>

        {/* Recent Projects */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Recent Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <ProjectCard
                key={project.name}
                {...project}
                onClick={() => navigate("/workspace")}
              />
            ))}
          </div>
        </div>

        {/* Waveform Visualization */}
        <div className="mt-12">
          <WaveformVisualizer />
        </div>
      </main>
    </div>
  );
};

export default Index;