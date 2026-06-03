import React from 'react';

export interface PublicationLinks {
  DOI: string;
  pdf: string | string[];
  code?: string;
}

export interface Publication {
  title: string;
  authors: string;
  time: string;
  venue: string;
  image?: string;
  links?: PublicationLinks;
}

export interface YearGroup {
  year: string;
  publications: Publication[];
}

/** Bold + underline the site owner's name wherever it appears in an author string. */
export const highlightAuthor = (authorsStr: string) => {
  const regex = /(Jaime Hieu Do|Hieu Do)/g;
  const parts = authorsStr.split(regex);
  return parts.map((part, index) =>
    part === 'Jaime Hieu Do' || part === 'Hieu Do' ? (
      <strong
        key={index}
        className="text-foreground font-bold underline decoration-primary/40 underline-offset-2"
      >
        {part}
      </strong>
    ) : (
      part
    )
  );
};
