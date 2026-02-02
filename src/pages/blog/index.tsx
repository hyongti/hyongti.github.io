import Content from "components/layouts/Content";
import SEO, { SITE_URL } from "components/SEO";
import Post from "components/Post";
import client from "../../../tina/__generated__/client";
import { InferGetStaticPropsType } from "next";

const Blog = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Content>
      <SEO
        title="블로그"
        description="개발 블로그 글 목록"
        url={`${SITE_URL}/blog`}
      />
      <div className="w-full max-w-3xl mx-auto px-4 flex flex-col gap-y-6">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </Content>
  );
};

export const getStaticProps = async () => {
  const postsResponse = await client.queries.postConnection({
    sort: "date",
  });

  const posts = postsResponse.data.postConnection.edges
    ?.map((edge) => edge?.node)
    .filter(Boolean)
    .reverse() || [];

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
