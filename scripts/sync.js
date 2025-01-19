const { syncDirectories } = require('../app/lib/sync');

const config = {
  sourcePath: process.env.SOURCE_PATH || 'C:\\buckalew-financial-unified',
  backupPath: process.env.BACKUP_PATH || 'C:\\buckalew-backup-0118',
  excludePatterns: [
    'node_modules',
    '.next',
    '.git',
    'coverage',
    'dist'
  ]
};

syncDirectories(config).catch(console.error);