import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import WaveformVisualizer from "@/components/WaveformVisualizer";
import ProjectCard from "@/components/ProjectCard";

const Index = () => {
  const recentProjects = [
    { name: "Synthwave Dreams", genre: "Electronic", lastModified: "2h ago" },
    { name: "Acoustic Session", genre: "Acoustic", lastModified: "1d ago" },
    { name: "Beat Project", genre: "Hip Hop", lastModified: "3d ago" },
  ];

  return (
    <div className="min-h-screen bg-daw-background text-daw-text p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Music Studio</h1>
          <p className="text-xl text-daw-text/60 mb-8">
            Create amazing music with the power of AI
          </p>
          <WaveformVisualizer />
          <Button
            className="mt-8 bg-daw-accent hover:bg-daw-accent/80 text-white"
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5" /> New Project
          </Button>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Recent Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <ProjectCard
                key={project.name}
                {...project}
                onClick={() => console.log("Opening project:", project.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;