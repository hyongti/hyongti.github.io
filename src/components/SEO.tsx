import Head from "next/head";

const SITE_NAME = "hyongti 블로그";
const SITE_URL = "https://hyongti.github.io";
const DEFAULT_DESCRIPTION = "개발 블로그 - 웹 개발, 프로그래밍에 대한 글을 씁니다.";

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  type?: "website" | "article";
  publishedAt?: string;
}

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  url = SITE_URL,
  type = "website",
  publishedAt,
}: SEOProps) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="ko_KR" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {type === "article" && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
    </Head>
  );
};

export default SEO;
export { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION };
