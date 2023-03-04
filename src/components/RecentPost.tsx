import Link from "next/link";

const RecentPost = ({ post }) => {
  return (
    <Link
      key={post._id}
      href={`/blog/${post._raw.flattenedPath}`}
      passHref
      className="mt-5"
    >
      <div className={`font-medium text-xl`}>{post.title}</div>
      <div className={`font-light`}>{post.description}</div>
    </Link>
  );
};

export default RecentPost;
