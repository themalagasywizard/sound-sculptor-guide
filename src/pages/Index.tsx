import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProjectManager from '@/components/ProjectManager';
import { ProjectMetadata } from '@/lib/fileSystem';

const Index = () => {
  const handleProjectLoad = (project: ProjectMetadata) => {
    console.log('Loaded project:', project);
    // Handle project loading logic here
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">DAW Studio</h1>
        <ProjectManager onProjectLoad={handleProjectLoad} />
        <div className="grid gap-4">
          <Link to="/workspace">
            <Button className="w-full">Open Workspace</Button>
          </Link>
          <Link to="/library">
            <Button className="w-full">Sound Library</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;