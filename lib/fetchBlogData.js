import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDirectory = path.join(process.cwd(), 'data', 'blog');

export const getBlogData = () => {
    const fileNames = fs.readdirSync(blogDirectory).filter((fileName) => {
        return path.extname(fileName).toLowerCase() === '.md';
    });

    const blogData = fileNames.map((fileName) => {
        const filePath = path.join(blogDirectory, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);
        return data;
    });

    // Sort the blog posts by createdAt tag
    blogData.sort((a, b) => {
        if (a.createdAt < b.createdAt) {
            return 1;
        } else if (a.createdAt > b.createdAt) {
            return -1;
        } else {
            return 0;
        }
    });

    return blogData;
};