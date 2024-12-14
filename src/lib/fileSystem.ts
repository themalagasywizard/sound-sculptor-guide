export class FileSystemManager {
  private directoryHandle: FileSystemDirectoryHandle | null = null;

  async saveProject(projectName: string, projectData: any) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: `${projectName}.json`,
        types: [{
          description: 'JSON Files',
          accept: {
            'application/json': ['.json'],
          },
        }],
      });

      const writable = await handle.createWritable();
      await writable.write(JSON.stringify(projectData, null, 2));
      await writable.close();

      return true;
    } catch (error) {
      console.error('Error saving project:', error);
      return false;
    }
  }

  async openProject() {
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [{
          description: 'JSON Files',
          accept: {
            'application/json': ['.json'],
          },
        }],
      });

      const file = await fileHandle.getFile();
      const content = await file.text();
      return JSON.parse(content);
    } catch (error) {
      console.error('Error opening project:', error);
      return null;
    }
  }
}

export const fileSystem = new FileSystemManager();