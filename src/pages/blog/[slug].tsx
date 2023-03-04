import Layout from "components/Layout";
import { allPosts } from "contentlayer/generated";
import { InferGetStaticPropsType } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const MDXComponent = useMDXComponent(post.body.code);
  return (
    <Layout>
      {/* TODO: prose 관련 css 분리 */}
      <article className="mt-10 prose prose-a:text-sky-500 prose-code:bg-orange-50 prose-code:text-red-400 prose-code:before:invisible prose-code:after:invisible prose-code:p-1 prose-code:rounded">
        <h1 className="text-sky-700">{post.title}</h1>
        <MDXComponent />
      </article>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: allPosts.map((p) => ({ params: { slug: p._raw.flattenedPath } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const post = allPosts.find((p) => p._raw.flattenedPath === params.slug);
  return {
    props: {
      post,
    },
  };
};

export default Post;
