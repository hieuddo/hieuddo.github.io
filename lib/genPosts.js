const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const markdownDir = path.join('data', 'blog');
const blogDir = path.join('pages', 'blog');
const templatePath = path.join('components', 'layouts', 'blogpost.js');


const markdownFiles = fs.readdirSync(markdownDir).filter(file => file.endsWith('.md'));

markdownFiles.forEach(file => {
  const filePath = path.join(markdownDir, file);
  let fileContent = fs.readFileSync(filePath, 'utf-8');
  fs.writeFileSync(filePath, fileContent);
  const { data } = matter(fs.readFileSync(filePath, 'utf8'));
  const slug = data.slug || path.basename(file, '.md');
  const fileName = `${slug}.js`;
  const newFilePath = path.join(blogDir, fileName);

  const PostTemplate = fs.readFileSync(templatePath, 'utf8');
  const newFileContents = PostTemplate.replace(/const filePath = '.*';/, `const filePath = '${filePath}';`);

  fs.writeFileSync(newFilePath, newFileContents);
});