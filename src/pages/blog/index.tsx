import Content from "components/layouts/Content";
import Post from "components/Post";
import client from "../../../tina/__generated__/client";
import { InferGetStaticPropsType } from "next";

const Blog = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Content>
      <div className="w-full max-w-3xl mx-auto px-4">
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
