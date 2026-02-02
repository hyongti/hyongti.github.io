import Content from "components/layouts/Content";
import SEO, { SITE_URL } from "components/SEO";

const About = () => {
  return (
    <Content description="김형태">
      <SEO
        title="About"
        description="김형태 - 개발자 소개"
        url={`${SITE_URL}/about`}
      />
      <div>소개</div>
    </Content>
  );
};

export default About;
