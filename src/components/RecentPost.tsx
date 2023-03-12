import { Post } from "contentlayer/generated";
import Link from "next/link";

interface Props {
  post: Post;
}

const RecentPost = ({ post }: Props) => {
  return (
    <Link
      key={post._id}
      href={`/blog/${post._raw.flattenedPath}`}
      passHref
      className="mt-5"
    >
      <div className={`font-medium text-xl`}>{post.title}</div>
    </Link>
  );
};

export default RecentPost;
