import { Card } from "@/components/ui/card";
import { Music, Clock } from "lucide-react";

interface ProjectCardProps {
  name: string;
  genre: string;
  lastModified: string;
  onClick: () => void;
}

const ProjectCard = ({ name, genre, lastModified, onClick }: ProjectCardProps) => {
  return (
    <Card
      className="p-4 bg-daw-secondary hover:bg-opacity-80 transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <Music className="w-8 h-8 text-daw-accent" />
        <div className="flex items-center text-sm text-daw-text/60">
          <Clock className="w-4 h-4 mr-1" />
          {lastModified}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-daw-text mb-1 group-hover:text-daw-accent transition-colors">
        {name}
      </h3>
      <p className="text-sm text-daw-text/60">{genre}</p>
    </Card>
  );
};

export default ProjectCard;