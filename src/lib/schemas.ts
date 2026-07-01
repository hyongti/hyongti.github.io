import { z } from "zod";

// 출력 타입을 일관되게(전부 string) 유지하고,
// 익명일 때만 이름/비밀번호를 필수로 검사한다.
export const commentSchema = (anonymous: boolean) =>
  z
    .object({
      name: z.string().trim().max(40, "이름은 40자 이내로"),
      password: z.string().max(60, "비밀번호는 60자 이내로"),
      body: z
        .string()
        .trim()
        .min(1, "댓글을 입력하세요")
        .max(2000, "댓글은 2000자 이내로"),
    })
    .superRefine((val, ctx) => {
      if (!anonymous) return;
      if (val.name.trim().length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["name"],
          message: "이름을 입력해 주세요",
        });
      }
      if (val.password.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["password"],
          message: "비밀번호를 입력해 주세요",
        });
      }
    });

// zodResolver 는 폼 입력 타입을 optional 로 추론하므로 그에 맞춘다.
// (필수 여부는 위 스키마가 런타임에 강제)
export type CommentFormValues = {
  name?: string;
  password?: string;
  body?: string;
};
