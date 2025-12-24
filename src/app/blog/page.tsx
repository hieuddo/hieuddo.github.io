import BlurFade from '@/components/magicui/blur-fade';
import { getBlogPosts } from '@/data/blog';
import { ProjectCard } from '@/components/project-card';

export const metadata = {
  title: 'Blog',
  description: 'My thoughts on software development, life, and more.',
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">
          Personal Blogs
        </h1>
      </BlurFade>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
        {posts
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post, id) => (
            <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
              <ProjectCard
                href={`/blog/${post.slug}`}
                key={post.slug}
                title={post.metadata.title}
                description={post.metadata.summary}
                dates={post.metadata.publishedAt}
                tags={post.metadata.tags || []}
                image={post.metadata.image}
              />
            </BlurFade>
          ))}
      </div>
    </section>
  );
}
