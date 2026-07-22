const fs = require('fs');
const path = require('path');

const cssFilesDir = path.join(__dirname, 'app', 'components');

const colorMap = {
  '#0f172a': 'var(--bg-primary)',
  '#cbd5e1': 'var(--text-secondary)',
  '#334155': 'var(--border-primary)',
  '#1e293b': 'var(--dropdown-bg)',
  '#dc2626': 'var(--accent-red)',
  '#ef4444': 'var(--hover-red)',
};

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.module.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      // Specifically target color and background-color for #ffffff and #f8fafc
      content = content.replace(/color:\s*(#ffffff|#f8fafc)/gi, 'color: var(--text-primary)');
      content = content.replace(/background(-color)?:\s*#ffffff/gi, 'background$1: var(--bg-primary)');
      
      for (const [hex, variable] of Object.entries(colorMap)) {
        const regex = new RegExp(hex, 'gi');
        if (regex.test(content)) {
          content = content.replace(regex, variable);
          modified = true;
        }
      }
      
      if (modified || content !== fs.readFileSync(fullPath, 'utf8')) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${file}`);
      }
    }
  }
}

processDirectory(cssFilesDir);
