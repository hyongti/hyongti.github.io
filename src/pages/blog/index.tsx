import Content from "components/layouts/Content";
import Post from "components/Post";
import { allPosts } from "contentlayer/generated";
import { InferGetStaticPropsType } from "next";

const Blog = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Content>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </Content>
  );
};

export const getStaticProps = async () => {
  const posts = allPosts.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
