type YouTubeProps = {
  id: string;
  start?: number;
  end?: number;
};

export function YouTube({ id, start, end }: YouTubeProps) {
  const params = new URLSearchParams();
  if (start != null) params.set("start", String(start));
  if (end != null) params.set("end", String(end));
  const query = params.toString();

  return (
    <div className="my-4 aspect-video">
      <iframe
        className="w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${id}${query ? `?${query}` : ""}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
