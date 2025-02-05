const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const FONTS_DIR = path.join(process.cwd(), 'public', 'fonts');

// Define font URLs
const FONT_URLS = {
  montserrat: 'https://fonts.google.com/download?family=Montserrat',
  merriweather: 'https://fonts.google.com/download?family=Merriweather'
};

async function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const file = fs.createWriteStream(outputPath);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function setupFonts() {
  try {
    // Create fonts directory if it doesn't exist
    await fs.mkdir(FONTS_DIR, { recursive: true });
    console.log('Created fonts directory');

    // Download and process each font
    for (const [fontName, url] of Object.entries(FONT_URLS)) {
      const zipPath = path.join(FONTS_DIR, `${fontName}.zip`);
      
      console.log(`Downloading ${fontName}...`);
      await downloadFile(url, zipPath);
      
      console.log(`Extracting ${fontName}...`);
      await execPromise(`unzip -o ${zipPath} -d ${FONTS_DIR}/${fontName}`);
      
      // Clean up zip file
      await fs.unlink(zipPath);
    }

    // Move required font files to the main fonts directory
    const requiredFonts = [
      'Montserrat-Regular.ttf',
      'Montserrat-Bold.ttf',
      'Montserrat-Light.ttf',
      'Montserrat-Medium.ttf',
      'Merriweather-Regular.ttf',
      'Merriweather-Bold.ttf'
    ];

    for (const font of requiredFonts) {
      const fontFamily = font.split('-')[0].toLowerCase();
      const sourcePath = path.join(FONTS_DIR, fontFamily, 'static', font);
      const destPath = path.join(FONTS_DIR, font);
      
      try {
        await fs.copyFile(sourcePath, destPath);
        console.log(`Copied ${font}`);
      } catch (err) {
        console.error(`Failed to copy ${font}: ${err.message}`);
      }
    }

    // Clean up extracted directories
    await fs.rm(path.join(FONTS_DIR, 'montserrat'), { recursive: true });
    await fs.rm(path.join(FONTS_DIR, 'merriweather'), { recursive: true });

    console.log('Font setup completed successfully!');
  } catch (error) {
    console.error('Error setting up fonts:', error);
    process.exit(1);
  }
}

setupFonts();