const fs = require('fs');

let code = fs.readFileSync('app/components/layout/NavbarClient.tsx', 'utf8');

// 1. Mobile Menu Wrapper
code = code.replace(
  /<AnimatePresence>\n\s*\{mobileMenuOpen && \(\n\s*<motion\.div\n\s*initial=\{\{ opacity: 0, height: 0 \}\}\n\s*animate=\{\{ opacity: 1, height: "auto" \}\}\n\s*exit=\{\{ opacity: 0, height: 0 \}\}\n\s*className=\{styles\.mobileMenu\}\n\s*>/g,
  `<motion.div
              initial={false}
              animate={{ opacity: mobileMenuOpen ? 1 : 0, height: mobileMenuOpen ? "auto" : 0 }}
              style={{ overflow: "hidden", pointerEvents: mobileMenuOpen ? "auto" : "none" }}
              className={styles.mobileMenu}
            >`
);

code = code.replace(
  /\s*<\/motion\.div>\n\s*\)\}\n\s*<\/AnimatePresence>\n\s*<\/header>/g,
  `\n            </motion.div>\n      </header>`
);

// 2. Mobile Dropdowns
const dropdowns = ["genelIngilizce", "sinav", "digerDiller", "subeler", "hakkimizda"];

dropdowns.forEach(dropdown => {
  const searchMobileOpen = `<AnimatePresence>\n                  {mobileActiveDropdown === "${dropdown}" && (\n                    <motion.div\n                      initial={{ opacity: 0, height: 0 }}\n                      animate={{ opacity: 1, height: "auto" }}\n                      exit={{ opacity: 0, height: 0 }}\n                      className={styles.mobileDropdownContent}\n                    >`;
  const replaceMobileOpen = `<motion.div\n                      initial={false}\n                      animate={{ opacity: mobileActiveDropdown === "${dropdown}" ? 1 : 0, height: mobileActiveDropdown === "${dropdown}" ? "auto" : 0 }}\n                      style={{ overflow: "hidden" }}\n                      className={styles.mobileDropdownContent}\n                    >`;
  code = code.replace(searchMobileOpen, replaceMobileOpen);
});

// Mobile dropdown closings
code = code.replace(
  /                    <\/motion\.div>\n                  \)}\n                <\/AnimatePresence>/g,
  `                    </motion.div>`
);

// 3. Desktop Dropdowns
const dDropdowns = [
  { key: "genelIngilizce", search: `                  {activeDropdown === "genelIngilizce" && (\n                    <MegaMenuGenelIngilizce data={megaMenus.genelIngilizce} />\n                  )}`, replace: `                  <div style={{ display: activeDropdown === "genelIngilizce" ? "block" : "none", width: "100%", position: "absolute", top: "100%", left: 0, zIndex: 10 }}>\n                    <MegaMenuGenelIngilizce data={megaMenus.genelIngilizce} />\n                  </div>` },
  { key: "sinav", search: `                  {activeDropdown === "sinav" && <MegaMenuSinav data={megaMenus.sinav} />}`, replace: `                  <div style={{ display: activeDropdown === "sinav" ? "block" : "none", width: "100%", position: "absolute", top: "100%", left: 0, zIndex: 10 }}>\n                    <MegaMenuSinav data={megaMenus.sinav} />\n                  </div>` },
  { key: "digerDiller", search: `                  {activeDropdown === "digerDiller" && <MegaMenuDigerDiller data={megaMenus.digerDiller} />}`, replace: `                  <div style={{ display: activeDropdown === "digerDiller" ? "block" : "none", width: "100%", position: "absolute", top: "100%", left: 0, zIndex: 10 }}>\n                    <MegaMenuDigerDiller data={megaMenus.digerDiller} />\n                  </div>` },
  { key: "subeler", search: `                  {activeDropdown === "subeler" && <MegaMenuSubeler data={megaMenus.subeler} />}`, replace: `                  <div style={{ display: activeDropdown === "subeler" ? "block" : "none", width: "100%", position: "absolute", top: "100%", left: 0, zIndex: 10 }}>\n                    <MegaMenuSubeler data={megaMenus.subeler} />\n                  </div>` },
  { key: "hakkimizda", search: `                  {activeDropdown === "hakkimizda" && <MegaMenuHakkimizda data={megaMenus.hakkimizda} />}`, replace: `                  <div style={{ display: activeDropdown === "hakkimizda" ? "block" : "none", width: "100%", position: "absolute", top: "100%", left: 0, zIndex: 10 }}>\n                    <MegaMenuHakkimizda data={megaMenus.hakkimizda} />\n                  </div>` }
];

dDropdowns.forEach(d => {
  code = code.replace(
    `<AnimatePresence>\n${d.search}\n                </AnimatePresence>`,
    d.replace
  );
});

fs.writeFileSync('app/components/layout/NavbarClient.tsx', code);
console.log("NavbarClient.tsx modified for SEO safely");
