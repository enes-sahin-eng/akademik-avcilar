const fs = require('fs');

let c = fs.readFileSync('app/components/layout/Footer.tsx', 'utf8');

c = c.replace('"use client";\n', '');
c = c.replace('import React, { useState } from "react";', 'import React from "react";\nimport { getDictionary, type Locale } from "../../dictionaries/getDictionary";\nimport { NewsletterForm } from "./NewsletterForm";');
c = c.replace('import { HeadphonesIcon, Check } from "lucide-react";', 'import { HeadphonesIcon } from "lucide-react";');
c = c.replace('import { motion, AnimatePresence } from "framer-motion";\n', '');
c = c.replace('export const Footer: React.FC = () => {', 'interface Props {\n  lang: Locale;\n}\n\nexport const Footer = async ({ lang }: Props) => {');
c = c.replace('const dict = useDictionary();', 'const dict = await getDictionary(lang);');
c = c.replace(/const \[email[\s\S]*?setEmail\("");\n  };\n\n/g, '');
c = c.replace(/<div className=\{styles\.newsletterBox\}>[\s\S]*?<\/form>\s*<\/div>/, '<NewsletterForm footerData={footerData} />');
c = c.replace(/\{?\/\* SUCCESS MODAL \*\/\}?\s*<AnimatePresence>[\s\S]*?<\/AnimatePresence>/, '');

fs.writeFileSync('app/components/layout/Footer.tsx', c);
console.log('Done!');
