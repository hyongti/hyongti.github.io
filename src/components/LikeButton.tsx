import { useEffect, useState } from "react";
import { supabase } from "lib/supabase";

export function LikeButton({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLiked(localStorage.getItem(`liked:${slug}`) === "1");
    supabase
      .from("post_likes")
      .select("count")
      .eq("post_slug", slug)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setCount(data?.count ?? 0);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  async function toggle() {
    if (busy) return;
    setBusy(true);
    const delta = liked ? -1 : 1;
    const { data, error } = await supabase.rpc("increment_like", {
      slug,
      delta,
    });
    if (!error) {
      setCount(data as number);
      const next = !liked;
      setLiked(next);
      if (next) localStorage.setItem(`liked:${slug}`, "1");
      else localStorage.removeItem(`liked:${slug}`);
    }
    setBusy(false);
  }

  return (
    <div className="not-prose mt-12 flex justify-center">
      <button
        onClick={toggle}
        disabled={busy}
        aria-pressed={liked}
        className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-colors disabled:opacity-60 ${
          liked
            ? "border-rose-200 bg-rose-50 text-rose-600"
            : "border-gray-200 text-gray-600 hover:border-rose-200 hover:text-rose-600"
        }`}
      >
        <span className="text-base leading-none">{liked ? "♥" : "♡"}</span>
        <span>좋아요 {count ?? "–"}</span>
      </button>
    </div>
  );
}
