const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'app', 'components');

function replaceInFile(filename, replacements) {
  const filepath = path.join(componentsDir, filename);
  if (!fs.existsSync(filepath)) return;
  
  let content = fs.readFileSync(filepath, 'utf8');
  let originalContent = content;
  
  for (const { regex, replacement } of replacements) {
    content = content.replace(regex, replacement);
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Fixed ${filename}`);
  }
}

// 1. HeroSlider.module.css
// overlay, badge, ctaBtn, arrowBtn text should be #ffffff
replaceInFile('HeroSlider.module.css', [
  { regex: /\.overlay\s*{[^}]*color:\s*var\(--text-primary\);/g, replacement: match => match.replace('var(--text-primary)', '#ffffff') },
  { regex: /\.badge\s*{[^}]*color:\s*var\(--text-primary\);/g, replacement: match => match.replace('var(--text-primary)', '#ffffff') },
  { regex: /\.ctaBtn\s*{[^}]*color:\s*var\(--text-primary\);/g, replacement: match => match.replace('var(--text-primary)', '#ffffff') },
  { regex: /\.arrowBtn\s*{[^}]*color:\s*var\(--text-primary\);/g, replacement: match => match.replace('var(--text-primary)', '#ffffff') },
]);

// 2. Navbar.module.css
// topBar, langActive, mobileLangActive text should be #ffffff
// nav background should be var(--nav-bg) instead of rgba(15, 23, 42, 0.95)
replaceInFile('Navbar.module.css', [
  { regex: /\.topBar\s*{[^}]*color:\s*var\(--text-primary\);/g, replacement: match => match.replace('var(--text-primary)', '#ffffff') },
  { regex: /\.langActive\s*{[^}]*color:\s*var\(--bg-primary\);/g, replacement: match => match.replace('var(--bg-primary)', '#ffffff') },
  { regex: /\.mobileLangActive\s*{[^}]*color:\s*var\(--bg-primary\);/g, replacement: match => match.replace('var(--bg-primary)', '#ffffff') },
  { regex: /background-color:\s*rgba\(15,\s*23,\s*42,\s*0\.95\);/g, replacement: 'background-color: var(--nav-bg);' },
]);

// 3. UpcomingProgramsTable.module.css
// Red or colored headers/badges should be white text
replaceInFile('UpcomingProgramsTable.module.css', [
  { regex: /color:\s*var\(--bg-primary\);/g, replacement: 'color: #ffffff;' }, // it replaced #ffffff on red bg to --bg-primary
  { regex: /color:\s*var\(--text-primary\);/g, replacement: 'color: #ffffff;' }, // if it mistakenly put --text-primary on dark elements
]);

// 4. Contact.module.css
// Fix places where it shouldn't be var(--text-primary) if on red bg, wait... Contact module had a lot of text-primary. Let's make sure buttons are white.
replaceInFile('Contact.module.css', [
  { regex: /\.submitBtn\s*{[^}]*color:\s*var\(--text-primary\);/g, replacement: match => match.replace('var(--text-primary)', '#ffffff') },
]);

// 5. MegaMenu.module.css
// Red buttons/badges
replaceInFile('MegaMenu.module.css', [
  { regex: /\.featuredCourse\s*{[^}]*color:\s*var\(--text-primary\);/g, replacement: match => match.replace('var(--text-primary)', '#ffffff') },
  { regex: /\.exploreBtn\s*{[^}]*color:\s*var\(--text-primary\);/g, replacement: match => match.replace('var(--text-primary)', '#ffffff') },
]);

// 6. WhatsAppButton.module.css
replaceInFile('WhatsAppButton.module.css', [
  { regex: /color:\s*var\(--text-primary\);/g, replacement: 'color: #ffffff;' },
]);

// 7. Footer.module.css
replaceInFile('Footer.module.css', [
  { regex: /\.sendBtn\s*{[^}]*color:\s*var\(--text-primary\);/g, replacement: match => match.replace('var(--text-primary)', '#ffffff') },
]);

console.log("Fixes applied!");
