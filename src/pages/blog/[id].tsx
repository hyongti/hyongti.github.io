import Content from 'components/Layouts/Content';
import { allPosts } from 'contentlayer/generated';
import { InferGetStaticPropsType } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const MDXComponent = useMDXComponent(post.body.code);

  return (
    <Content>
      {/* TODO: prose 관련 css 설정 필요, 현재 링크나 코드블록도 그냥 검정 글씨 */}
      <article className="mt-10 prose w-full">
        <h1 className="text-sky-700">{post.title}</h1>
        <MDXComponent />
      </article>
    </Content>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: allPosts.map((p) => ({ params: { id: p._raw.flattenedPath } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const post = allPosts.find((p) => p._raw.flattenedPath === params.id);
  return {
    props: {
      post,
    },
  };
};

export default Post;
