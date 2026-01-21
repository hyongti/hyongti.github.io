import Content from "components/layouts/Content";
import client from "../../../tina/__generated__/client";
import { InferGetStaticPropsType, GetStaticPaths } from "next";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

const Post = ({ data, query, variables }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: tinaData } = useTina({
    query,
    variables,
    data,
  });

  const post = tinaData.post;

  return (
    <Content>
      <article className="prose mt-10 w-full">
        <h1 className="text-sky-700">{post.title}</h1>
        <TinaMarkdown content={post.body} />
      </article>
    </Content>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsResponse = await client.queries.postConnection();

  const paths = postsResponse.data.postConnection.edges?.map((edge) => ({
    params: { id: edge?.node?._sys.filename },
  })).filter(Boolean) || [];

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const tinaProps = await client.queries.post({
    relativePath: `${params.id}.mdx`,
  });

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
    },
  };
};

export default Post;
