import { promises as fs } from 'fs';
import path from 'path';

export interface SyncConfig {
  sourcePath: string;
  backupPath: string;
  excludePatterns?: string[];
}

export async function syncDirectories(config: SyncConfig) {
  const { sourcePath, backupPath, excludePatterns = [] } = config;

  try {
    // Create backup directory if it doesn't exist
    await fs.mkdir(backupPath, { recursive: true });

    // Get list of files to sync
    const filesToSync = await getFilesToSync(sourcePath, excludePatterns);

    // Sync each file
    for (const file of filesToSync) {
      const relativePath = path.relative(sourcePath, file);
      const targetPath = path.join(backupPath, relativePath);

      // Ensure target directory exists
      await fs.mkdir(path.dirname(targetPath), { recursive: true });

      // Copy file
      await fs.copyFile(file, targetPath);
    }

    console.log('Sync completed successfully');
  } catch (error) {
    console.error('Sync failed:', error);
    throw error;
  }
}

async function getFilesToSync(directory: string, excludePatterns: string[]): Promise<string[]> {
  const files: string[] = [];
  const entries = await fs.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    // Check if path should be excluded
    if (excludePatterns.some(pattern => fullPath.includes(pattern))) {
      continue;
    }

    if (entry.isDirectory()) {
      files.push(...await getFilesToSync(fullPath, excludePatterns));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}