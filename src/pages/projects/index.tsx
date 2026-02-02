import Content from "components/layouts/Content";
import SEO, { SITE_URL } from "components/SEO";

const Projects = () => {
  return (
    <Content description="프로젝트">
      <SEO
        title="Projects"
        description="프로젝트 목록"
        url={`${SITE_URL}/projects`}
      />
      projects
    </Content>
  );
};

export default Projects;
