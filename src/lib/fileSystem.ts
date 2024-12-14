export interface ProjectMetadata {
  name: string;
  bpm: number;
  createdAt: string;
  lastModified: string;
  tracks: Track[];
}

export interface Track {
  id: string;
  name: string;
  type: 'audio' | 'midi';
  volume: number;
  muted: boolean;
  solo: boolean;
}

export interface AudioFile {
  id: string;
  name: string;
  category: string;
  duration: string;
  path: string;
  handle?: FileSystemFileHandle;
}

class FileSystemManager {
  private static instance: FileSystemManager;
  private projectHandle: FileSystemDirectoryHandle | null = null;
  private libraryHandle: FileSystemDirectoryHandle | null = null;

  private constructor() {}

  static getInstance(): FileSystemManager {
    if (!this.instance) {
      this.instance = new FileSystemManager();
    }
    return this.instance;
  }

  async requestPermission(): Promise<boolean> {
    try {
      const dirHandle = await window.showDirectoryPicker({
        mode: 'readwrite',
      });
      this.projectHandle = dirHandle;
      return true;
    } catch (error) {
      console.error('Permission denied:', error);
      return false;
    }
  }

  async saveProject(projectData: ProjectMetadata): Promise<void> {
    if (!this.projectHandle) {
      throw new Error('No project directory selected');
    }

    try {
      const fileHandle = await this.projectHandle.getFileHandle(
        `${projectData.name}.json`,
        { create: true }
      );
      const writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify(projectData, null, 2));
      await writable.close();
    } catch (error) {
      console.error('Error saving project:', error);
      throw error;
    }
  }

  async loadProject(fileHandle: FileSystemFileHandle): Promise<ProjectMetadata> {
    try {
      const file = await fileHandle.getFile();
      const content = await file.text();
      return JSON.parse(content) as ProjectMetadata;
    } catch (error) {
      console.error('Error loading project:', error);
      throw error;
    }
  }

  async saveAudioToLibrary(file: File, category: string): Promise<AudioFile> {
    if (!this.libraryHandle) {
      throw new Error('No library directory selected');
    }

    try {
      const fileHandle = await this.libraryHandle.getFileHandle(file.name, {
        create: true,
      });
      const writable = await fileHandle.createWritable();
      await writable.write(file);
      await writable.close();

      const audio = new Audio();
      audio.src = URL.createObjectURL(file);
      
      return new Promise((resolve) => {
        audio.onloadedmetadata = () => {
          const duration = `${Math.floor(audio.duration / 60)}:${Math.floor(
            audio.duration % 60
          )
            .toString()
            .padStart(2, '0')}`;

          resolve({
            id: crypto.randomUUID(),
            name: file.name.replace(/\.[^/.]+$/, ''),
            category,
            duration,
            path: file.name,
            handle: fileHandle,
          });
        };
      });
    } catch (error) {
      console.error('Error saving audio file:', error);
      throw error;
    }
  }
}

export const fileSystem = FileSystemManager.getInstance();