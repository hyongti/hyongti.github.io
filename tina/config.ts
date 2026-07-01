import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "posts",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "slug",
            label: "Slug (파일명, 영문으로 입력)",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "string",
            name: "series",
            label: "시리즈 (선택사항)",
          },
          {
            type: "number",
            name: "seriesOrder",
            label: "시리즈 내 순서 (선택사항)",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "LinkCard",
                label: "Link Card",
                fields: [
                  {
                    name: "url",
                    label: "URL",
                    type: "string",
                    required: true,
                  },
                  {
                    name: "title",
                    label: "Title (수동 입력, 선택사항)",
                    type: "string",
                  },
                  {
                    name: "description",
                    label: "Description (수동 입력, 선택사항)",
                    type: "string",
                  },
                  {
                    name: "image",
                    label: "Image URL (수동 입력, 선택사항)",
                    type: "string",
                  },
                ],
              },
              {
                name: "YouTube",
                label: "YouTube",
                fields: [
                  {
                    name: "id",
                    label: "Video ID (예: dQw4w9WgXcQ)",
                    type: "string",
                    required: true,
                  },
                  {
                    name: "start",
                    label: "시작 시간 (초, 선택사항)",
                    type: "number",
                  },
                  {
                    name: "end",
                    label: "끝 시간 (초, 선택사항)",
                    type: "number",
                  },
                ],
              },
              {
                name: "Video",
                label: "Video",
                fields: [
                  {
                    name: "src",
                    label: "동영상 경로 (예: /uploads/coderain.mp4)",
                    type: "string",
                    required: true,
                  },
                  {
                    name: "caption",
                    label: "캡션 (선택사항)",
                    type: "string",
                  },
                ],
              },
              {
                name: "Callout",
                label: "Callout (강조 상자)",
                fields: [
                  {
                    name: "icon",
                    label: "아이콘 (이모지, 선택사항)",
                    type: "string",
                  },
                  {
                    name: "children",
                    label: "내용",
                    type: "rich-text",
                  },
                ],
              },
            ],
          },
        ],
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              if (!values?.slug) return "untitled";
              return values.slug
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");
            },
          },
          router: ({ document }) => `/blog/${document._sys.filename}`,
        },
      },
    ],
  },
});
