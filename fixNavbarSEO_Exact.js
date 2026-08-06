const fs = require('fs');

try {
  require('child_process').execSync('git checkout app/components/layout/NavbarClient.tsx');
} catch(e) {}

let code = fs.readFileSync('app/components/layout/NavbarClient.tsx', 'utf8');

// 1. Mobile Menu Wrapper
code = code.split(`<AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={styles.mobileMenu}
            >`).join(`<div className={\`\${styles.mobileMenu} \${styles.mobileMenuWrapper} \${mobileMenuOpen ? styles.mobileMenuWrapperOpen : ""}\`}>`);

code = code.split(`            </motion.div>
          )}
        </AnimatePresence>
      </header>`).join(`            </div>
      </header>`);

// 2. Mobile Dropdowns
const dropdowns = ["genelIngilizce", "sinav", "digerDiller", "subeler", "hakkimizda"];
const DesktopComps = {
  genelIngilizce: "MegaMenuGenelIngilizce",
  sinav: "MegaMenuSinav",
  digerDiller: "MegaMenuDigerDiller",
  subeler: "MegaMenuSubeler",
  hakkimizda: "MegaMenuHakkimizda"
};

dropdowns.forEach(dropdown => {
  // Mobile opening
  const searchMobileOpen = `<AnimatePresence>
                  {mobileActiveDropdown === "${dropdown}" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={styles.mobileDropdownContent}
                    >`;
  const replaceMobileOpen = `<div className={\`\${styles.mobileDropdownContent} \${styles.mobileMegaMenu} \${mobileActiveDropdown === "${dropdown}" ? styles.mobileMegaMenuOpen : ""}\`}>`;
  code = code.split(searchMobileOpen).join(replaceMobileOpen);
  
  // Mobile closing
  const comp = DesktopComps[dropdown];
  const searchMobileClose = `                      <${comp} data={megaMenus.${dropdown}} />
                    </motion.div>
                  )}
                </AnimatePresence>`;
  const replaceMobileClose = `                      <${comp} data={megaMenus.${dropdown}} />
                    </div>`;
  code = code.split(searchMobileClose).join(replaceMobileClose);
  
  // Desktop opening & closing
  // Note: some have \n, some are single line.
  // let's just find and replace the whole AnimatePresence block for desktop
  let searchDesktop = `<AnimatePresence>
                  {activeDropdown === "${dropdown}" && (
                    <${comp} data={megaMenus.${dropdown}} />
                  )}
                </AnimatePresence>`;
  let replaceDesktop = `<div className={\`\${styles.desktopMegaMenu} \${activeDropdown === "${dropdown}" ? styles.desktopMegaMenuOpen : ""}\`}>
                  <${comp} data={megaMenus.${dropdown}} />
                </div>`;
                
  if (code.includes(searchDesktop)) {
    code = code.split(searchDesktop).join(replaceDesktop);
  } else {
    // maybe it's on one line
    let searchDesktop2 = `<AnimatePresence>
                  {activeDropdown === "${dropdown}" && <${comp} data={megaMenus.${dropdown}} />}
                </AnimatePresence>`;
    code = code.split(searchDesktop2).join(replaceDesktop);
  }
});

fs.writeFileSync('app/components/layout/NavbarClient.tsx', code);
console.log("NavbarClient.tsx modified perfectly with exact string replacements!");
