const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'app/components/home/HeroSlider.tsx',
  'app/components/home/MiniGallery.tsx',
  'app/components/home/ProgramTabsSection.tsx',
  'app/components/home/StudentReviewsAndAwards.tsx',
  'app/components/course/PlacementTestBanner.tsx',
  'app/components/ui/CampusCarousel.tsx'
];

for (const relPath of filesToUpdate) {
  const file = path.join(__dirname, relPath);
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // Replace alt="..." without title="..."
    content = content.replace(/alt=(["'])(.*?)\1(?![^>]*title=)/g, 'alt=$1$2$1 title=$1$2$1');
    
    // Replace alt={something} without title
    content = content.replace(/alt={([^}]+)}(?![^>]*title=)/g, 'alt={$1} title={$1}');

    if (content !== originalContent) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated alt/titles in ${relPath}`);
    }
  }
}
