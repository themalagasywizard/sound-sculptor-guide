import React from 'react';
import { Button } from '@/components/ui/button';
import { fileSystem } from '@/lib/fileSystem';
import { useToast } from '@/components/ui/use-toast';
import { Save, FolderOpen } from 'lucide-react';

interface ProjectManagerProps {
  onProjectLoad?: (projectData: any) => void;
}

const ProjectManager = ({ onProjectLoad }: ProjectManagerProps) => {
  const { toast } = useToast();

  const handleSaveProject = async () => {
    try {
      const projectData = {
        name: "My Project",
        tracks: [],
        // ... other project data
      };

      const success = await fileSystem.saveProject("My Project", projectData);
      
      if (success) {
        toast({
          title: "Project Saved",
          description: "Your project has been saved successfully",
        });
      } else {
        toast({
          title: "Save Failed",
          description: "Failed to save the project",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Error",
        description: "An error occurred while saving the project",
        variant: "destructive",
      });
    }
  };

  const handleOpenProject = async () => {
    try {
      const projectData = await fileSystem.openProject();
      
      if (projectData) {
        onProjectLoad?.(projectData);
        toast({
          title: "Project Opened",
          description: "Your project has been loaded successfully",
        });
      }
    } catch (error) {
      console.error('Error opening project:', error);
      toast({
        title: "Error",
        description: "An error occurred while opening the project",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleSaveProject}
        className="bg-daw-accent hover:bg-daw-accent/80"
      >
        <Save className="mr-2 h-4 w-4" />
        Save Project
      </Button>
      <Button
        onClick={handleOpenProject}
        variant="outline"
        className="border-daw-accent text-daw-accent hover:bg-daw-accent/10"
      >
        <FolderOpen className="mr-2 h-4 w-4" />
        Open Project
      </Button>
    </div>
  );
};

export default ProjectManager;
