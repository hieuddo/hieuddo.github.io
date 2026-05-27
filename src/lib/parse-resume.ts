import fs from 'fs';
import path from 'path';

export interface WorkItem {
  company: string;
  href: string;
  badges: string[];
  location: string;
  title: string;
  logoUrl: string;
  start: string;
  end: string;
  description: string[];
}

/**
 * Helper to extract content inside balanced outer curly braces starting from a search index
 */
function extractOuterBraces(text: string, startIndex: number): { content: string; endIndex: number } | null {
  let depth = 0;
  const firstBraceIndex = text.indexOf('{', startIndex);
  if (firstBraceIndex === -1) return null;
  
  for (let i = firstBraceIndex; i < text.length; i++) {
    if (text[i] === '{') {
      depth++;
    } else if (text[i] === '}') {
      depth--;
      if (depth === 0) {
        return {
          content: text.substring(firstBraceIndex + 1, i),
          endIndex: i,
        };
      }
    }
  }
  return null;
}

export function parseWorkExperienceFromTex(): WorkItem[] {
  try {
    const texPath = path.join(process.cwd(), 'resume', 'resume.tex');
    if (!fs.existsSync(texPath)) {
      console.warn(`resume.tex not found at ${texPath}`);
      return [];
    }

    const content = fs.readFileSync(texPath, 'utf-8');

    // Extract content of Work Experience section
    const sectionMatch = content.match(/\\section\{Work Experience\}([\s\S]*?)(?:\\section|$)/);
    if (!sectionMatch) {
      return [];
    }

    const workSection = sectionMatch[1];
    const items: WorkItem[] = [];
    
    const searchStr = '\\resumeProjectHeading';
    let idx = workSection.indexOf(searchStr);
    
    while (idx !== -1) {
      const headingStart = idx + searchStr.length;
      
      // Extract the first argument of the heading
      const firstArg = extractOuterBraces(workSection, headingStart);
      if (!firstArg) break;
      
      const headingText = firstArg.content;
      
      // Find boundaries of content associated with this heading
      const nextIdx = workSection.indexOf(searchStr, firstArg.endIndex);
      const blockContent = nextIdx === -1 
        ? workSection.substring(firstArg.endIndex) 
        : workSection.substring(firstArg.endIndex, nextIdx);
        
      // Extract resumeItems inside this block
      const description: string[] = [];
      let itemIdx = blockContent.indexOf('\\resumeItem');
      while (itemIdx !== -1) {
        // Ensure this is \resumeItem specifically, not \resumeItemListStart or \resumeItemListEnd
        const following = blockContent.substring(itemIdx + 11);
        if (/^\s*\{/.test(following)) {
          const itemContent = extractOuterBraces(blockContent, itemIdx + 11);
          if (itemContent) {
            // Clean up spacing and comments
            const cleanedItem = itemContent.content
              .replace(/%/g, '')
              .replace(/\n\s*/g, ' ')
              .trim();
            description.push(cleanedItem);
            itemIdx = blockContent.indexOf('\\resumeItem', itemContent.endIndex);
          } else {
            break;
          }
        } else {
          // Skip this false positive and search from the next character
          itemIdx = blockContent.indexOf('\\resumeItem', itemIdx + 11);
        }
      }
      
      // Parse heading details: Company $|$ Title $|$ Dates $|$ Location
      const parts = headingText.split('$|$').map(p => p.trim());
      if (parts.length >= 4) {
        const companyRaw = parts[0];
        const title = parts[1];
        const datesRaw = parts[2];
        const location = parts[3];
        
        // Extract company name from \textbf{Company}
        const companyMatch = companyRaw.match(/\\textbf\{([^}]+)\}/);
        const company = companyMatch ? companyMatch[1] : companyRaw;
        
        // Clean dates, replace standard LaTeX hyphens \textbf{--} or -- with standard -
        const dates = datesRaw.replace(/\\textbf\{--\}/g, '-').replace(/--/g, '-').trim();
        const dateParts = dates.split('-').map(d => d.trim());
        const start = dateParts[0] || '';
        const end = dateParts[1] || '';
        
        // Match logoUrl dynamically based on company name
        let logoUrl = '';
        if (company.toLowerCase().includes('singapore management university') || company.toLowerCase().includes('smu')) {
          logoUrl = '/work/smu.svg';
        }
        
        // Match company website dynamically
        let href = '';
        if (company.toLowerCase().includes('preferred.ai')) {
          href = 'https://preferred.ai/';
        }
        
        items.push({
          company,
          href,
          badges: [],
          location,
          title,
          logoUrl,
          start,
          end,
          description,
        });
      }
      
      idx = nextIdx;
    }
    
    return items;
  } catch (error) {
    console.error('Error parsing resume.tex:', error);
    return [];
  }
}
