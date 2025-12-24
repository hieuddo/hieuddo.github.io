interface MarkdownVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  width?: number | string;
  height?: number | string;
}

export default function MarkdownVideo({
  src,
  width,
  height,
  className,
  ...props
}: MarkdownVideoProps) {
  if (!src && !props.children) return null;

  return (
    <video
      preload="metadata"
      playsInline
      className={`rounded-lg my-8 w-full object-cover ${className || ''}`}
      width={width}
      height={height}
      {...props}
      controls={true}
    >
      {src && <source src={typeof src === 'string' ? src : undefined} />}
      {props.children}
      Your browser does not support the video tag.
    </video>
  );
}
