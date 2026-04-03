const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules')) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
};

const mapColors = (content) => {
  let str = content;
  // Handle surfaces and borders
  str = str.replace(/bg-surface/g, 'bg-card border border-border');
  str = str.replace(/border-\[\#1a2233\]/g, 'border-border');
  
  // Handle typography colors cleanly
  str = str.replace(/text-white/g, 'text-foreground');
  str = str.replace(/font-display/g, 'font-sans font-semibold tracking-tight');
  str = str.replace(/text-gray-200/g, 'text-muted-foreground');
  str = str.replace(/text-gray-300/g, 'text-muted-foreground');
  str = str.replace(/text-gray-400/g, 'text-muted-foreground');
  str = str.replace(/text-gray-500/g, 'text-muted-foreground');
  
  // Remove vomiting aesthetics
  str = str.replace(/tracking-widest/g, 'tracking-normal');
  str = str.replace(/tracking-wider/g, 'tracking-normal');
  str = str.replace(/ uppercase /g, ' '); 
  str = str.replace(/uppercase /g, ''); 
  str = str.replace(/"uppercase"/g, '""'); 
  
  str = str.replace(/shadow-glow/g, 'shadow-md');
  str = str.replace(/shadow-\[.*?\]/g, 'shadow-sm'); 
  return str;
};

walk('./src').forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, mapColors(content), 'utf8');
});
console.log('Done mapping components to minimal Shadcn format!');
