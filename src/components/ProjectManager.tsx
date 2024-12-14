import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Save, FolderOpen, Download } from 'lucide-react';
import { fileSystem, ProjectMetadata } from '@/lib/fileSystem';

interface ProjectManagerProps {
  onProjectLoad: (project: ProjectMetadata) => void;
}

const ProjectManager = ({ onProjectLoad }: ProjectManagerProps) => {
  const { toast } = useToast();

  const handleSaveProject = async () => {
    try {
      const hasPermission = await fileSystem.requestPermission();
      if (!hasPermission) {
        toast({
          title: 'Permission Denied',
          description: 'Please grant permission to save projects locally.',
          variant: 'destructive',
        });
        return;
      }

      const projectData: ProjectMetadata = {
        name: 'My Project',
        bpm: 120,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        tracks: [],
      };

      await fileSystem.saveProject(projectData);
      toast({
        title: 'Project Saved',
        description: 'Your project has been saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save project.',
        variant: 'destructive',
      });
    }
  };

  const handleOpenProject = async () => {
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: 'DAW Project Files',
            accept: {
              'application/json': ['.json'],
            },
          },
        ],
      });

      const project = await fileSystem.loadProject(fileHandle);
      onProjectLoad(project);
      toast({
        title: 'Project Loaded',
        description: 'Your project has been loaded successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load project.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Button onClick={handleSaveProject}>
        <Save className="mr-2" />
        Save Project
      </Button>
      <Button onClick={handleOpenProject}>
        <FolderOpen className="mr-2" />
        Open Project
      </Button>
      <Button>
        <Download className="mr-2" />
        Export Track
      </Button>
    </div>
  );
};

export default ProjectManager;