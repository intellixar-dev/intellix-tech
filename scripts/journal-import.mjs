import fs from 'node:fs';

const [metadataPath, markdownPath] = process.argv.slice(2);
if (!metadataPath || !markdownPath) {
  console.error('Usage: node scripts/journal-import.mjs article.json draft.md');
  process.exit(1);
}
const article = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
article.content = fs.readFileSync(markdownPath, 'utf8');
fs.writeFileSync(metadataPath, `${JSON.stringify(article, null, 2)}\n`);
console.log(`Updated content in ${metadataPath}`);
