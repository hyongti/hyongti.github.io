import Link from "next/link";

interface PostProps {
  post: {
    id: string;
    title: string;
    date: string;
    series?: string | null;
    seriesOrder?: number | null;
    _sys: {
      filename: string;
    };
  };
  seriesFirstSlug?: string;
}

const BlogPost = ({ post, seriesFirstSlug }: PostProps) => {
  return (
    <div className="relative w-full">
      <div className="font-medium text-xs text-gray-400">{post.date}</div>
      {post.series && (
        <div className="mt-2">
          <Link
            href={`/blog/${seriesFirstSlug ?? post._sys.filename}`}
            className="relative z-10 inline-flex items-center rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700 ring-1 ring-inset ring-sky-100 transition-colors hover:bg-sky-100"
          >
            {post.series}
            {post.seriesOrder ? ` · ${post.seriesOrder}편` : ""}
          </Link>
        </div>
      )}
      <div className="font-extrabold text-2xl mt-2">{post.title}</div>
      <Link
        href={`/blog/${post._sys.filename}`}
        aria-label={post.title}
        className="absolute inset-0 z-0"
      />
    </div>
  );
};

export default BlogPost;
