type VideoProps = {
  src: string;
  caption?: string;
};

export function Video({ src, caption }: VideoProps) {
  return (
    <figure className="not-prose my-6">
      <video
        className="h-48 w-full rounded-lg object-cover sm:h-64"
        src={src}
        autoPlay
        muted
        loop
        playsInline
      />
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-gray-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
