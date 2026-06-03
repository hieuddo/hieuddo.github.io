import Image from 'next/image';
import { cn } from '@/lib/utils'; // Assuming you have a utility for merging classes

interface MarkdownImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  // react-markdown types `img` src as `string | Blob`; markdown only ever yields a string URL.
  src?: string | Blob;
  width?: number | string;
  height?: number | string;
}

export default function MarkdownImage({
  src,
  alt,
  width,
  height,
  className,
  ...props
}: MarkdownImageProps) {
  if (typeof src !== 'string') return null;

  // Type guard or conversion for width/height since they come as string/number from rehype
  const w = width ? Number(width) : 800; // Default or fallback width
  const h = height ? Number(height) : 600; // Default or fallback height

  if (typeof src === 'string' && src.startsWith('/')) {
    return (
      <Image
        src={src}
        alt={alt || ''}
        width={w}
        height={h}
        className={cn('rounded-lg mt-8 mb-2 w-full object-cover', className)}
        {...props}
      />
    );
  }

  // External images or missing dimensions fallback to standard img or configure domains
  // For now, assuming standard img for external or using specific handling if needed
  // Using unoptimized Image for external if domain not in config?
  // Let's stick to standard img for external to avoid config errors unless expected.
  // BUT the user wants <Image>, and we are using `unoptimized: true` so external should work fine with <Image> too
  // provided we give it dimensions or use fill.
  // Since we might not have dimensions for external, let's use standard img for safety unless we want `fill`.

  // Actually, unoptimized doesn't remove the need for width/height/fill.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={cn('rounded-lg mt-8 mb-2 w-full object-cover', className)}
      {...props}
    />
  );
}
