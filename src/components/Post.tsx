import type { Post } from "contentlayer/generated";
import Link from "next/link";

interface Props {
  post: Post;
}

const BlogPost = ({ post }: Props) => {
  return (
    <Link
      href={`/post/${post._raw.flattenedPath}`}
      passHref
      className="w-full my-7"
    >
      <div className="font-medium text-xs text-gray-400">{post.date}</div>
      <div className={`font-extrabold text-2xl mt-2`}>{post.title}</div>
    </Link>
  );
};

export default BlogPost;
