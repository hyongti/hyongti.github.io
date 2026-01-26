import Content from "components/layouts/Content";
import { LinkCard } from "components/LinkCard";
import client from "../../../tina/__generated__/client";
import { InferGetStaticPropsType, GetStaticPaths } from "next";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-python";
import "prismjs/components/prism-markdown";

const CodeBlock = (props: { lang?: string; value: string }) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [props.value]);

  return (
    <pre className="rounded-lg overflow-x-auto">
      <code ref={codeRef} className={`language-${props.lang || "text"}`}>
        {props.value}
      </code>
    </pre>
  );
};

const components = {
  code_block: CodeBlock,
  code: (props: { children: React.ReactNode }) => (
    <code className="bg-gray-200 text-red-600 px-1 py-0.5 rounded text-sm">
      {props.children}
    </code>
  ),
  LinkCard: (props: { url: string; title?: string; description?: string; image?: string }) => (
    <LinkCard url={props.url} title={props.title} description={props.description} image={props.image} />
  ),
};

const Post = ({ data, query, variables }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: tinaData } = useTina({
    query,
    variables,
    data,
  });

  const post = tinaData.post;

  return (
    <Content>
      <article className="prose mt-10 w-full max-w-none">
        <h1 className="text-sky-700">{post.title}</h1>
        <TinaMarkdown content={post.body} components={components} />
      </article>
    </Content>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsResponse = await client.queries.postConnection();

  const paths = postsResponse.data.postConnection.edges?.map((edge) => ({
    params: { id: edge?.node?._sys.filename },
  })).filter(Boolean) || [];

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const tinaProps = await client.queries.post({
    relativePath: `${params.id}.mdx`,
  });

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
    },
  };
};

export default Post;
