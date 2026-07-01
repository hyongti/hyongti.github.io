import Content from "components/layouts/Content";
import SEO, { SITE_URL } from "components/SEO";
import { LinkCard } from "components/LinkCard";
import { YouTube } from "components/YouTube";
import { Video } from "components/Video";
import { Callout } from "components/Callout";
import { SeriesNav } from "components/SeriesNav";
import { PostNav } from "components/PostNav";
import { ViewCounter } from "components/ViewCounter";
import { LikeButton } from "components/LikeButton";
import { Comments } from "components/Comments";
import client from "../../../tina/__generated__/client";
import { InferGetStaticPropsType, GetStaticPaths } from "next";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useEffect, useRef } from "react";
import Head from "next/head";
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
  YouTube: (props: { id: string; start?: number; end?: number }) => (
    <YouTube id={props.id} start={props.start} end={props.end} />
  ),
  Video: (props: { src: string; caption?: string }) => (
    <Video src={props.src} caption={props.caption} />
  ),
  Callout: (props: { icon?: string; children?: any }) => (
    <Callout icon={props.icon}>
      <TinaMarkdown content={props.children} />
    </Callout>
  ),
};

const Post = ({ data, query, variables, slug, seriesPosts, prev, next }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: tinaData } = useTina({
    query,
    variables,
    data,
  });

  const post = tinaData.post;
  const url = `${SITE_URL}/blog/${slug}`;
  const fullTitle = post.series
    ? `${post.series}${post.seriesOrder ? ` (${post.seriesOrder})` : ""} — ${post.title}`
    : post.title;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fullTitle,
    datePublished: post.date || undefined,
    description: post.description || "",
    author: {
      "@type": "Person",
      name: "hyongti",
    },
  };

  return (
    <Content>
      <SEO
        title={fullTitle}
        description={post.description || undefined}
        url={url}
        type="article"
        publishedAt={post.date || undefined}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <article className="prose mt-10 w-full max-w-3xl mx-auto px-4">
        <div className="not-prose mb-8">
          {post.series && (
            <p className="text-sm font-semibold text-sky-600">
              {post.series}
              {post.seriesOrder ? ` (${post.seriesOrder})` : ""}
            </p>
          )}
          <h1 className="mt-1 text-3xl font-extrabold text-sky-700 sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
            <span>{post.date}</span>
            <span>·</span>
            <ViewCounter slug={slug} />
          </div>
        </div>
        <TinaMarkdown content={post.body} components={components} />
        <LikeButton slug={slug} />
        {post.series && (
          <SeriesNav
            series={post.series}
            posts={seriesPosts}
            currentSlug={slug}
          />
        )}
        <PostNav prev={prev} next={next} />
        <Comments slug={slug} />
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

type SeriesItem = { title: string; slug: string; order: number };
type NavPost = { title: string; slug: string };

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const tinaProps = await client.queries.post({
    relativePath: `${params.id}.mdx`,
  });
  const current = tinaProps.data.post;

  // 전체 글 (날짜 오름차순)
  const all = await client.queries.postConnection({ sort: "date" });
  const nodes = (all.data.postConnection.edges ?? [])
    .map((edge) => edge?.node)
    .filter(Boolean);

  // 같은 시리즈 목차
  let seriesPosts: SeriesItem[] = [];
  if (current.series) {
    seriesPosts = nodes
      .filter((node) => node!.series === current.series)
      .map((node) => ({
        title: node!.title,
        slug: node!._sys.filename,
        order: node!.seriesOrder ?? 0,
      }))
      .sort((a, b) => a.order - b.order);
  }

  // 이전/다음 글 (시리즈 무관, 날짜순)
  const idx = nodes.findIndex((node) => node!._sys.filename === params.id);
  const olderNode = idx > 0 ? nodes[idx - 1] : null;
  const newerNode =
    idx >= 0 && idx < nodes.length - 1 ? nodes[idx + 1] : null;
  const prev: NavPost | null = olderNode
    ? { title: olderNode.title, slug: olderNode._sys.filename }
    : null;
  const next: NavPost | null = newerNode
    ? { title: newerNode.title, slug: newerNode._sys.filename }
    : null;

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      slug: params.id,
      seriesPosts,
      prev,
      next,
    },
  };
};

export default Post;
