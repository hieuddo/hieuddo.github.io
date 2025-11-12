import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const getBlogs = () => {
  try {
    const directory = path.join(process.cwd(), 'content');
    const files = fs.readdirSync(directory);
    const blogs = files
      .filter((filename) => filename.endsWith('.mdx'))
      .map((filename) => {
        try {
          const filePath = path.join(directory, filename);
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const { data } = matter(fileContent);

          const publishedAt = data.publishedAt;
          const tagsArray = data.tags
            ? data.tags.split(',').map((tag: string) => tag.trim())
            : [];

          return {
            ...data,
            title: data.title,
            summary: data.summary,
            image: data.image,
            tags: tagsArray,
            publishedAt: publishedAt,
            href: `/blog/${filename.replace('.mdx', '')}`,
          };
        } catch (error) {
          console.error(`Error processing file ${filename}:`, error);
          return null;
        }
      })
      .filter((blog) => blog !== null);

    blogs.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return blogs;
  } catch (error) {
    console.error('Error reading blogs directory:', error);
    return [];
  }
};

export default getBlogs;
