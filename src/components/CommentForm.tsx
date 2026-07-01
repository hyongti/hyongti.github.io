import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@supabase/supabase-js";
import { supabase } from "lib/supabase";
import { commentSchema, type CommentFormValues } from "lib/schemas";

export function CommentForm({
  slug,
  user,
  onPosted,
}: {
  slug: string;
  user: User | null;
  onPosted: () => void;
}) {
  const anonymous = !user;
  const [notice, setNotice] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema(anonymous)),
    defaultValues: { name: "", password: "", body: "" },
  });

  const onSubmit = async (values: CommentFormValues) => {
    setNotice(null);
    const authorName = user
      ? user.user_metadata?.name ||
        user.user_metadata?.full_name ||
        user.email?.split("@")[0] ||
        "익명"
      : (values.name ?? "").trim();

    const { error } = await supabase.rpc("post_comment", {
      p_slug: slug,
      p_name: authorName,
      p_body: values.body.trim(),
      p_password: user ? null : values.password,
    });

    if (error) {
      setNotice("등록에 실패했어요. 잠시 후 다시 시도해 주세요.");
      return;
    }

    reset();
    if (user) onPosted();
    else setNotice("댓글이 등록되었습니다. 확인 후 표시돼요.");
  };

  const inputClass =
    "rounded-md border border-gray-200 px-3 py-1.5 text-sm focus:border-sky-400 focus:outline-none";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-3">
      {user ? (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-semibold text-gray-800">
            {user.user_metadata?.name || user.email}
          </span>
          <span className="text-gray-400">님으로 작성</span>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="text-xs text-gray-400 underline"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <input
            {...register("name")}
            placeholder="이름"
            maxLength={40}
            className={`w-28 ${inputClass}`}
          />
          <input
            {...register("password")}
            type="password"
            placeholder="비밀번호"
            maxLength={60}
            className={`w-28 ${inputClass}`}
          />
        </div>
      )}

      {(errors.name || errors.password) && (
        <p className="text-sm text-rose-500">
          {errors.name?.message || errors.password?.message}
        </p>
      )}

      <textarea
        {...register("body")}
        placeholder="댓글을 입력하세요"
        maxLength={2000}
        rows={3}
        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none"
      />
      {errors.body && (
        <p className="text-sm text-rose-500">{errors.body.message}</p>
      )}

      {notice && <p className="text-sm text-sky-600">{notice}</p>}

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          {user
            ? "로그인 상태라 바로 표시돼요."
            : "비밀번호는 나중에 이 댓글을 삭제할 때 쓰여요. 익명 댓글은 확인 후 공개됩니다."}
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60"
        >
          {isSubmitting ? "등록 중…" : "댓글 남기기"}
        </button>
      </div>
    </form>
  );
}
