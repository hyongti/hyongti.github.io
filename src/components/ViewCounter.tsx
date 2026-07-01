import { useEffect, useState } from "react";
import { supabase } from "lib/supabase";

export function ViewCounter({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const key = `viewed:${slug}`;

    // ?owner=1 로 한 번 접속하면 이 브라우저를 "주인"으로 표시 → 이후 조회수 미집계
    // ?owner=0 으로 접속하면 해제
    const owner = new URLSearchParams(window.location.search).get("owner");
    if (owner === "1") localStorage.setItem("owner", "1");
    if (owner === "0") localStorage.removeItem("owner");
    const isOwner = localStorage.getItem("owner") === "1";

    async function readOnly() {
      const { data } = await supabase
        .from("post_views")
        .select("count")
        .eq("post_slug", slug)
        .maybeSingle();
      if (!cancelled) setCount(data?.count ?? 0);
    }

    async function run() {
      // 주인 브라우저이거나, 같은 세션에서 이미 본 글이면 → 집계 안 하고 숫자만 읽기
      if (isOwner || sessionStorage.getItem(key)) {
        await readOnly();
        return;
      }

      const { data, error } = await supabase.rpc("increment_view", { slug });
      if (!cancelled && !error) {
        sessionStorage.setItem(key, "1");
        setCount(data as number);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return <span>조회 {count ?? "–"}</span>;
}
