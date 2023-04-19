import RecentPost from "components/RecentPost";
import { allPosts } from "contentlayer/generated";
import { InferGetStaticPropsType } from "next";

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className={`my-5 w-full`}>
      <div className={`flex flex-col`}>
        {posts.slice(0, 5).map((post) => (
          <RecentPost key={post._id} post={post} />
        ))}
      </div>
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

export default Home;
