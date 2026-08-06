const fs = require('fs');

// We'll reset the file first to guarantee a clean slate
try {
  require('child_process').execSync('git checkout app/components/layout/NavbarClient.tsx');
} catch(e) {}

let code = fs.readFileSync('app/components/layout/NavbarClient.tsx', 'utf8');

// 1. Mobile Menu Wrapper
code = code.replace(
  /<AnimatePresence>\s*\{mobileMenuOpen && \(\s*<motion\.div\s+initial=\{\{ opacity: 0, height: 0 \}\}\s+animate=\{\{ opacity: 1, height: "auto" \}\}\s+exit=\{\{ opacity: 0, height: 0 \}\}\s+className=\{styles\.mobileMenu\}\s*>/g,
  `<div className={\`\${styles.mobileMenu} \${styles.mobileMenuWrapper} \${mobileMenuOpen ? styles.mobileMenuWrapperOpen : ""}\`}>`
);

// We need to also remove the closing tags for mobileMenuOpen AnimatePresence
code = code.replace(
  /<\/motion\.div>\s*\)\}\s*<\/AnimatePresence>\s*<\/header>/,
  `</div>\n      </header>`
);

// 2. Mobile Dropdowns
const dropdowns = ["genelIngilizce", "sinav", "digerDiller", "subeler", "hakkimizda"];

dropdowns.forEach(dropdown => {
  const regexMobileOpen = new RegExp(`<AnimatePresence>\s*\\{mobileActiveDropdown === "${dropdown}" && \\(\s*<motion\\.div\\s+initial=\\{\\{\s*opacity:\s*0,\s*height:\s*0\s*\\}\\}\\s+animate=\\{\\{\s*opacity:\s*1,\s*height:\s*"auto"\s*\\}\\}\\s+exit=\\{\\{\s*opacity:\s*0,\s*height:\s*0\s*\\}\\}\\s+className=\\{styles\\.mobileDropdownContent\\}\s*>`, "g");
  code = code.replace(regexMobileOpen, `<div className={\`\${styles.mobileDropdownContent} \${styles.mobileMegaMenu} \${mobileActiveDropdown === "${dropdown}" ? styles.mobileMegaMenuOpen : ""}\`}>`);
  
  // Desktop opening
  const regexDesktopOpen = new RegExp(`<AnimatePresence>\s*\\{activeDropdown === "${dropdown}" && \\(\s*(<MegaMenu[A-Za-z]+\\s+data=\\{megaMenus\\.[a-zA-Z]+\\}\s*\\/>)\s*\\)\\}\s*<\\/AnimatePresence>`, "g");
  code = code.replace(regexDesktopOpen, (match, p1) => {
    return `<div className={\`\${styles.desktopMegaMenu} \${activeDropdown === "${dropdown}" ? styles.desktopMegaMenuOpen : ""}\`}>\n                  ${p1}\n                </div>`;
  });
});

// For mobile closings, we replaced `<motion.div>` with `<div>`, so we close with `</div>`.
code = code.replace(
  /(<MegaMenu[A-Za-z]+\s*data=\{megaMenus\.[a-zA-Z]+\}\s*\/>\s*)<\/motion\.div>\s*\)\}\s*<\/AnimatePresence>/g,
  '$1</div>'
);

fs.writeFileSync('app/components/layout/NavbarClient.tsx', code);
console.log("NavbarClient.tsx modified for SEO cleanly without inline styles");
