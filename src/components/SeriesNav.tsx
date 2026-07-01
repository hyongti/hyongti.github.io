import Link from "next/link";

type SeriesItem = { title: string; slug: string; order: number };

export function SeriesNav({
  series,
  posts,
  currentSlug,
}: {
  series: string;
  posts: SeriesItem[];
  currentSlug: string;
}) {
  if (!posts || posts.length === 0) return null;
  const index = posts.findIndex((p) => p.slug === currentSlug);
  const next = index >= 0 ? posts[index + 1] : undefined;

  return (
    <aside className="not-prose mt-12 rounded-xl border border-gray-200 bg-gray-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        시리즈
      </p>
      <p className="mt-1 text-lg font-bold text-gray-800">{series}</p>
      <ol className="mt-3 flex flex-col gap-y-1">
        {posts.map((p) => {
          const isCurrent = p.slug === currentSlug;
          const inner = (
            <>
              <span className="tabular-nums text-gray-400">{p.order}.</span>
              <span>{p.title}</span>
            </>
          );
          return (
            <li key={p.slug}>
              {isCurrent ? (
                <span className="flex gap-2 font-semibold text-sky-700">
                  {inner}
                </span>
              ) : (
                <Link
                  href={`/blog/${p.slug}`}
                  className="flex gap-2 text-gray-600 hover:text-sky-700"
                >
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      {next && (
        <Link
          href={`/blog/${next.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:underline"
        >
          다음 편: {next.title} →
        </Link>
      )}
    </aside>
  );
}
