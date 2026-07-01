import { useCallback, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "lib/supabase";
import { CommentForm } from "components/CommentForm";

type Comment = {
  id: string;
  author_name: string;
  body: string;
  created_at: string;
  likes: number;
};

export function Comments({ slug }: { slug: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // 삭제(비밀번호 확인)
  const [pwPromptId, setPwPromptId] = useState<string | null>(null);
  const [pwInput, setPwInput] = useState("");
  const [deleteNotice, setDeleteNotice] = useState<string | null>(null);

  // 좋아요 누른 댓글(브라우저 기억)
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const loadComments = useCallback(async () => {
    const { data } = await supabase
      .from("comments")
      .select("id, author_name, body, created_at, likes")
      .eq("post_slug", slug)
      .order("created_at", { ascending: true });
    setComments(data ?? []);
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) =>
      setUser(session?.user ?? null)
    );
    loadComments();
    return () => sub.subscription.unsubscribe();
  }, [loadComments]);

  // 댓글 목록이 바뀌면 좋아요 표시를 localStorage 기준으로 복원
  useEffect(() => {
    const map: Record<string, boolean> = {};
    for (const c of comments) {
      if (localStorage.getItem(`clike:${c.id}`) === "1") map[c.id] = true;
    }
    setLiked(map);
  }, [comments]);

  async function toggleLike(c: Comment) {
    const isLiked = liked[c.id];
    const { data, error } = await supabase.rpc("like_comment", {
      p_id: c.id,
      p_delta: isLiked ? -1 : 1,
    });
    if (error) return;
    setComments((prev) =>
      prev.map((x) => (x.id === c.id ? { ...x, likes: data as number } : x))
    );
    if (isLiked) localStorage.removeItem(`clike:${c.id}`);
    else localStorage.setItem(`clike:${c.id}`, "1");
    setLiked((prev) => ({ ...prev, [c.id]: !isLiked }));
  }

  async function startDelete(c: Comment) {
    setDeleteNotice(null);
    if (user) {
      // 로그인: 본인 댓글이면 비밀번호 없이 삭제
      const { data, error } = await supabase.rpc("delete_comment", { p_id: c.id });
      if (!error && data === true) return loadComments();
    }
    setPwPromptId(c.id);
    setPwInput("");
  }

  async function confirmDelete(c: Comment) {
    const { data, error } = await supabase.rpc("delete_comment", {
      p_id: c.id,
      p_password: pwInput,
    });
    if (!error && data === true) {
      setPwPromptId(null);
      setPwInput("");
      await loadComments();
    } else {
      setDeleteNotice("비밀번호가 일치하지 않습니다.");
    }
  }

  return (
    <section className="not-prose mt-16">
      <h2 className="text-lg font-bold text-gray-800">
        댓글{" "}
        {comments.length > 0 && (
          <span className="text-gray-400">{comments.length}</span>
        )}
      </h2>

      <div className="mt-6 space-y-5">
        {loading ? (
          <p className="text-sm text-gray-400">불러오는 중…</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-gray-400">
            아직 댓글이 없어요. 첫 댓글을 남겨보세요.
          </p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">
                    {c.author_name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDate(c.created_at)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => startDelete(c)}
                  className="text-xs text-gray-300 hover:text-gray-500"
                >
                  삭제
                </button>
              </div>
              <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700">
                {c.body}
              </p>
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => toggleLike(c)}
                  className={`inline-flex items-center gap-1 text-xs ${
                    liked[c.id]
                      ? "text-rose-500"
                      : "text-gray-400 hover:text-rose-400"
                  }`}
                >
                  <span>{liked[c.id] ? "♥" : "♡"}</span>
                  {c.likes > 0 && <span>{c.likes}</span>}
                </button>
              </div>

              {pwPromptId === c.id && (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <input
                    type="password"
                    value={pwInput}
                    onChange={(e) => setPwInput(e.target.value)}
                    placeholder="비밀번호"
                    className="w-28 rounded-md border border-gray-200 px-2 py-1 text-xs focus:border-sky-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => confirmDelete(c)}
                    className="rounded-md bg-gray-800 px-2.5 py-1 text-xs font-medium text-white"
                  >
                    삭제
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPwPromptId(null);
                      setDeleteNotice(null);
                    }}
                    className="text-xs text-gray-400"
                  >
                    취소
                  </button>
                  {deleteNotice && (
                    <span className="text-xs text-rose-500">{deleteNotice}</span>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <CommentForm
        key={user?.id ?? "anon"}
        slug={slug}
        user={user}
        onPosted={loadComments}
      />
    </section>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}`;
}
