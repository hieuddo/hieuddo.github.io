import fs from 'fs';
import imageSize from 'image-size';
import matter from 'gray-matter';
import path from 'path';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';



function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}


function rehypeImageMetadata() {
  return (tree: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree, 'element', (node: any) => {
      if (node.tagName === 'img' && node.properties.src) {
        const { src } = node.properties;
        if (src.startsWith('/')) {
          try {
            const imagePath = path.join(process.cwd(), 'public', src);
            const buffer = fs.readFileSync(imagePath);
            const dimensions = imageSize(buffer);
            node.properties.width = dimensions.width;
            node.properties.height = dimensions.height;
          } catch (e) {
            console.error(`Error processing image ${src}: ${e}`);
          }
        }
      }
    });
  };
}

function rehypeFigure() {
  return (tree: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree, 'element', (node: any) => {
      if (node.tagName === 'p') {
        const elementChildren = node.children.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (c: any) => c.type === 'element'
        );

        if (
          elementChildren.length === 1 &&
          elementChildren[0].tagName === 'img'
        ) {
          const img = elementChildren[0];
          const alt = img.properties.alt;

          if (alt && alt.trim()) {
            node.tagName = 'figure';
            node.properties.className = (
              node.properties.className || []
            ).concat('image-figure');

            const captionChildren: any[] = [];
            const parts = alt.split(/<br\s*\/?>/i);

            parts.forEach((part: string, index: number) => {
              if (part) {
                captionChildren.push({
                  type: 'text',
                  value: part,
                });
              }

              if (index < parts.length - 1) {
                captionChildren.push({
                  type: 'element',
                  tagName: 'br',
                  properties: {},
                  children: [],
                });
              }
            });

            node.children.push({
              type: 'element',
              tagName: 'figcaption',
              properties: {},
              children: captionChildren,
            });
          }
        }
      }
    });
  };
}


export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeImageMetadata)
    .use(rehypeFigure)
    .use(rehypePrettyCode, {
      // https://rehype-pretty.pages.dev/#usage
      theme: {
        light: 'min-light',
        dark: 'min-dark',
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

export async function getPost(slug: string) {
  const filePath = path.join('content', `${slug}.mdx`);
  let source = fs.readFileSync(filePath, 'utf-8');
  const { content: rawContent, data: metadata } = matter(source);
  const content = await markdownToHTML(rawContent);
  return {
    source: content,
    metadata,
    slug,
  };
}

async function getAllPosts(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  return Promise.all(
    mdxFiles.map(async (file) => {
      let slug = path.basename(file, path.extname(file));
      let { metadata, source } = await getPost(slug);
      return {
        metadata,
        slug,
        source,
      };
    })
  );
}

export async function getBlogPosts() {
  return getAllPosts(path.join(process.cwd(), 'content'));
}
