import Link from "next/link";

type NavPost = { title: string; slug: string };

export function PostNav({
  prev,
  next,
}: {
  prev?: NavPost | null;
  next?: NavPost | null;
}) {
  if (!prev && !next) return null;
  return (
    <nav className="not-prose mt-10 grid grid-cols-2 gap-3">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex flex-col rounded-xl border border-gray-200 p-4 transition-colors hover:border-sky-200 hover:bg-sky-50/50"
        >
          <span className="text-xs text-gray-400">← 이전 글</span>
          <span className="mt-1 line-clamp-1 font-semibold text-gray-800 transition-colors group-hover:text-sky-700">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col items-end rounded-xl border border-gray-200 p-4 text-right transition-colors hover:border-sky-200 hover:bg-sky-50/50"
        >
          <span className="text-xs text-gray-400">다음 글 →</span>
          <span className="mt-1 line-clamp-1 font-semibold text-gray-800 transition-colors group-hover:text-sky-700">
            {next.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
