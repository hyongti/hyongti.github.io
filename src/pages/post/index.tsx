import BlogPost from "components/Post";
import Layout from "components/Layout/Layout";
import { allPosts } from "contentlayer/generated";
import { InferGetStaticPropsType } from "next";

const Blog = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className={`mt-10 flex flex-col`}>
      {posts.map((post) => (
        <BlogPost key={post._id} post={post} />
      ))}
    </div>
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
