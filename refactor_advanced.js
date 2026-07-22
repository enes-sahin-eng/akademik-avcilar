const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'app', 'components');

const colorReplacements = [
  // Backgrounds / Surfaces
  { regex: /background(-color)?:\s*var\(--bg-primary\)/g, replace: 'background$1: var(--bg-surface)' },
  { regex: /background(-color)?:\s*#(1e293b|334155|475569)/gi, replace: 'background$1: var(--bg-surface-alt)' },
  { regex: /background(-color)?:\s*#(f1f5f9|f4f4f5|f8fafc)/gi, replace: 'background$1: var(--bg-surface-hover)' },
  { regex: /background(-color)?:\s*#111827/gi, replace: 'background$1: var(--bg-surface)' },
  { regex: /background(-color)?:\s*#1f2937/gi, replace: 'background$1: var(--bg-surface-alt)' },
  
  // Borders
  { regex: /border(-color|-top|-bottom|-left|-right)?:\s*([^;]*)#(e2e8f0|e5e7eb|f1f5f9)/gi, replace: 'border$1: $2var(--border-subtle)' },
  { regex: /border(-color|-top|-bottom|-left|-right)?:\s*([^;]*)#(334155|475569|1e293b)/gi, replace: 'border$1: $2var(--border-strong)' },
  { regex: /border(-color|-top|-bottom|-left|-right)?:\s*([^;]*)var\(--border-primary\)/gi, replace: 'border$1: $2var(--border-subtle)' },
  
  // Text Colors
  { regex: /color:\s*#(111827|0f172a|1f2937)/gi, replace: 'color: var(--text-primary)' },
  { regex: /color:\s*#(4b5563|475569)/gi, replace: 'color: var(--text-secondary)' },
  { regex: /color:\s*#(64748b|6b7280|94a3b8|9ca3af|a1a1aa|cbd5e1|d1d5db)/gi, replace: 'color: var(--text-muted)' },
  
  // Specific Blues / Greens
  { regex: /#(1e3a8a|0284c7|3b82f6)/gi, replace: 'var(--accent-blue)' },
  { regex: /#(22c55e|16a34a|25d366)/gi, replace: 'var(--accent-green)' },
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.module.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const { regex, replace } of colorReplacements) {
        content = content.replace(regex, replace);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Refactored ${file}`);
      }
    }
  }
}

processDirectory(cssDir);
