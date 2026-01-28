import Link from "next/link";

interface PostProps {
  post: {
    id: string;
    title: string;
    date: string;
    _sys: {
      filename: string;
    };
  };
}

const BlogPost = ({ post }: PostProps) => {
  return (
    <Link
      href={`/blog/${post._sys.filename}`}
      passHref
      className="w-full"
    >
      <div className="font-medium text-xs text-gray-400">{post.date}</div>
      <div className={`font-extrabold text-2xl mt-2`}>{post.title}</div>
    </Link>
  );
};

export default BlogPost;
