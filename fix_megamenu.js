const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'app', 'components', 'MegaMenu.module.css');
let content = fs.readFileSync(cssPath, 'utf8');

// promoTitle on dark gray bg
content = content.replace(/\.promoTitle\s*{[^}]*color:\s*var\(--text-primary\);/g, match => match.replace('var(--text-primary)', '#ffffff'));

// hover backgrounds on sections
content = content.replace(/\.sinavSection:hover\s*{[^}]*background-color:\s*var\(--text-primary\);/g, match => match.replace('var(--text-primary)', 'var(--dropdown-bg)'));
content = content.replace(/\.dillerSection:hover\s*{[^}]*background-color:\s*var\(--text-primary\);/g, match => match.replace('var(--text-primary)', 'var(--dropdown-bg)'));
content = content.replace(/\.hakkimizdaItem:hover\s*{[^}]*background-color:\s*var\(--text-primary\);/g, match => match.replace('var(--text-primary)', 'var(--dropdown-bg)'));

// news elements on dark bg/overlay
content = content.replace(/\.newsDateBadge\s*{[^}]*color:\s*var\(--text-primary\);/g, match => match.replace('var(--text-primary)', '#ffffff'));
content = content.replace(/\.newsTitle\s*{[^}]*color:\s*var\(--text-primary\);/g, match => match.replace('var(--text-primary)', '#ffffff'));
content = content.replace(/\.newsLink\s*{[^}]*color:\s*var\(--text-primary\);/g, match => match.replace('var(--text-primary)', '#ffffff'));

// subeler badges on red bg
content = content.replace(/\.subelerBadge\s*{[^}]*color:\s*var\(--text-primary\);/g, match => match.replace('var(--text-primary)', '#ffffff'));
content = content.replace(/\.subelerTopBadge\s*{[^}]*color:\s*var\(--text-primary\);/g, match => match.replace('var(--text-primary)', '#ffffff'));

// subeler buttons
content = content.replace(/\.subelerBtnGray\s*{[^}]*color:\s*var\(--text-primary\);/g, match => match.replace('var(--text-primary)', '#ffffff'));
// subelerBtnBlue uses var(--border-primary) background, text should be var(--text-primary)

fs.writeFileSync(cssPath, content, 'utf8');
console.log("MegaMenu fixed!");
