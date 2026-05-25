import BlurFade from '@/components/magicui/blur-fade';
import PublicationsExplorer from '@/components/publications-explorer';
import publicationData from '@/data/publications.json';

export const metadata = {
  title: 'Publications',
  description: 'Academic and scientific publications on Recommender Systems, Cross-Domain Recommendation, Continual Learning, and Multi-Task Learning by Jaime Hieu Do.',
};

const BLUR_FADE_DELAY = 0.04;

export default async function PublicationsPage() {
  return (
    <section className="space-y-6">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground pb-2 border-b border-border/40 w-full relative">
            Publications
            <span className="absolute bottom-0 left-0 w-16 h-[2px] bg-primary" />
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2 select-none">
            Research publications detailing the formulation and solution of dynamic real-world recommendation problems.
          </p>
        </div>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="mt-8">
          <PublicationsExplorer data={publicationData} />
        </div>
      </BlurFade>
    </section>
  );
}
