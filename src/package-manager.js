const axios = require('axios');
const fs = require('fs');
const path = require('path');

class NekoPackageManager {
  constructor() {
    this.packagesDir = path.join(process.cwd(), 'neko_packages');
    this.registryDir = path.join(process.cwd(), 'neko_registry');

    [this.packagesDir, this.registryDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    });
  }

  async installPackage(packageName) {
    try {
      const sourceDir = path.join(this.registryDir, packageName);
      const targetDir = path.join(this.packagesDir, packageName);
      
      // Copier le workflow
      const workflowConfig = path.join(__dirname, '../config/nekoscript.workflow.json');
      if (fs.existsSync(workflowConfig)) {
        fs.copyFileSync(workflowConfig, path.join(process.cwd(), '.replit'));
      }

      if (!fs.existsSync(sourceDir)) {
        throw new Error(`Package ${packageName} non trouvé!`);
      }

      fs.mkdirSync(targetDir, { recursive: true });
      const manifest = JSON.parse(
        fs.readFileSync(path.join(sourceDir, 'neko.json'), 'utf-8')
      );

      manifest.files.forEach(file => {
        const content = fs.readFileSync(path.join(sourceDir, path.basename(file)));
        fs.writeFileSync(path.join(targetDir, path.basename(file)), content);
      });

      return manifest;
    } catch (error) {
      throw new Error(`Erreur d'installation: ${error.message}`);
    }
  }

  loadPackage(packageName) {
    const packagePath = path.join(this.packagesDir, packageName);
    if (!fs.existsSync(packagePath)) {
      throw new Error(`Package ${packageName} non trouvé!`);
    }
    return require(packagePath);
  }
}

module.exports = NekoPackageManager;