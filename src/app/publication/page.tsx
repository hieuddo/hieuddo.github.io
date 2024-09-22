import BlurFade from "@/components/magicui/blur-fade";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import publicationData from "@/data/publications.json";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { SiAcm } from "react-icons/si";

interface Links {
  DOI: string;
  pdf: string;
  code: string;
}

interface Props {
  title: string;
  authors: string;
  dates: string;
  venue: string;
  image?: string;
  links?: Links;
}

const LinkIcons: React.FC<{ links: Links }> = ({ links }) => {
  const linkItems = [
    { url: links.DOI, icon: <SiAcm />, label: "DOI" },
    { url: links.pdf, icon: <AiOutlineFilePdf />, label: "PDF" },
    { url: links.code, icon: <FaGithub />, label: "Code" },
  ];

  return (
    <div style={{ display: "flex", gap: "30px", marginLeft: "10px" }}>
      {linkItems.map(
        (link, index) =>
          link.url && (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              {link.icon} {link.label}
            </a>
          )
      )}
    </div>
  );
};

function PubCard({ title, authors, dates, venue, image, links }: Props) {
  return (
    <li className="relative ml-10 py-4">
      {image && (
        <div className="absolute -left-16 top-2 flex items-center justify-center bg-white rounded-full">
          <Avatar className="border size-12 m-auto">
            <AvatarImage src={image} alt={title} className="object-contain" />
            <AvatarFallback>{title[0]}</AvatarFallback>
          </Avatar>
        </div>
      )}
      <div className="flex flex-1 flex-col justify-start gap-1">
        {dates && (
          <time className="text-xs text-muted-foreground">{dates}</time>
        )}
        <h2 className="font-semibold leading-none">{title}</h2>
        {venue && <p className="text-sm text-muted-foreground">{venue}</p>}
        {authors && (
          <span className="prose dark:prose-invert text-sm text-muted-foreground">
            {authors}
          </span>
        )}
        {links && <LinkIcons links={links} />}
      </div>
    </li>
  );
}

export const metadata = {
  title: "Publication",
  description: "Publication page",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">
          Publication
        </h1>
        {publicationData.map((yearData, yearIndex) => (
          <div key={yearIndex}>
            <h2 className="font-semibold text-xl mb-4">{yearData.year}</h2>
            <ul>
              {yearData.publications.map((pub, pubIndex) => (
                <BlurFade
                  key={pub.title + pub.time}
                  delay={BLUR_FADE_DELAY * 11 + pubIndex * 0.05}
                >
                  <PubCard
                    title={pub.title}
                    authors={pub.authors}
                    venue={pub.venue}
                    dates={pub.time}
                    image={pub.image}
                    links={pub.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </div>
        ))}
      </BlurFade>
    </section>
  );
}
