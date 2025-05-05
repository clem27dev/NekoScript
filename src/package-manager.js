
const fs = require('fs');
const path = require('path');
const axios = require('axios');

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

  async publishPackage(packageData) {
    const manifest = {
      name: packageData.name,
      version: packageData.version,
      description: packageData.description,
      author: packageData.author,
      files: packageData.files
    };

    const packageDir = path.join(this.registryDir, packageData.name);
    fs.mkdirSync(packageDir, { recursive: true });

    // Sauvegarder le manifest
    fs.writeFileSync(
      path.join(packageDir, 'neko.json'),
      JSON.stringify(manifest, null, 2)
    );

    // Copier les fichiers du package
    packageData.files.forEach(file => {
      const content = fs.readFileSync(file);
      fs.writeFileSync(path.join(packageDir, path.basename(file)), content);
    });

    console.log('📦 Package publié:', manifest.name);
    return manifest;
  }

  async installPackage(packageName) {
    const sourceDir = path.join(this.registryDir, packageName);
    const targetDir = path.join(this.packagesDir, packageName);

    if (!fs.existsSync(sourceDir)) {
      throw new Error(`Package ${packageName} non trouvé!`);
    }

    // Copier le package
    fs.mkdirSync(targetDir, { recursive: true });
    const manifest = JSON.parse(
      fs.readFileSync(path.join(sourceDir, 'neko.json'), 'utf-8')
    );

    manifest.files.forEach(file => {
      const content = fs.readFileSync(path.join(sourceDir, path.basename(file)));
      fs.writeFileSync(path.join(targetDir, path.basename(file)), content);
    });

    console.log('📥 Package installé:', packageName);
    return manifest;
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
