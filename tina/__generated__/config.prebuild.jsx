// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
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
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "date",
            label: "Date",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true
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
                    required: true
                  },
                  {
                    name: "title",
                    label: "Title (\uC218\uB3D9 \uC785\uB825, \uC120\uD0DD\uC0AC\uD56D)",
                    type: "string"
                  },
                  {
                    name: "description",
                    label: "Description (\uC218\uB3D9 \uC785\uB825, \uC120\uD0DD\uC0AC\uD56D)",
                    type: "string"
                  },
                  {
                    name: "image",
                    label: "Image URL (\uC218\uB3D9 \uC785\uB825, \uC120\uD0DD\uC0AC\uD56D)",
                    type: "string"
                  }
                ]
              }
            ]
          }
        ],
        ui: {
          router: ({ document }) => `/blog/${document._sys.filename}`
        }
      }
    ]
  }
});
export {
  config_default as default
};
