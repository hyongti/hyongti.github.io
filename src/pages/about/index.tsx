import Content from "components/layouts/Content";
import SEO, { SITE_URL } from "components/SEO";

const experiences = [
  {
    company: "주식회사 크리스비",
    meta: "2024.05 – 현재 · 정규직",
    summary:
      "소비재 기업의 성과 관리 서비스를 개발합니다. 이커머스 셀러를 위한 데이터 분석 대시보드 SaaS로, Cafe24·Amazon·Facebook Ads 등 다양한 데이터소스를 연동해 매출·마케팅 데이터를 통합 시각화하고, 공급망(SCM) 관리로 재고·물류·S&OP 회의까지 일원화해 데이터 기반 의사결정을 지원합니다.",
    points: [
      "프레임워크 통합·마이그레이션 — Remix 등으로 파편화된 대시보드·관리자·랜딩을 Next.js(Page Router)로 통합, 기술 스택 단일화 및 유지보수 비용 절감",
      "모노레포 구축(Nx) — 폴리레포 프로젝트들을 Nx 기반 모노레포로 통합, Vercel 배포 파이프라인 최적화로 개발 생산성과 코드 재사용성 극대화",
      "UI/UX 현대화·시스템 표준화 — Shadcn UI와 Tailwind CSS 도입으로 대시보드 전면 개편, 디자인 일관성 확보 및 컴포넌트 단위 유지보수성 강화",
      "데이터 기반 의사결정 지원 — GTM으로 Meta Pixel·GA 등 마케팅/분석 이벤트를 통합 관리하고, 수집된 데이터로 UI/UX 가설 검증 및 개선",
      "유저 리텐션 강화 — Supabase 기반 유저 온보딩 가이드 시스템 구축으로 신규 유저의 진입장벽 완화",
    ],
  },
  {
    company: "에스케이플래닛",
    meta: "2022.03 – 2024.05 · 정규직 / 인턴",
    summary:
      "웹·웹뷰 기반의 다양한 서비스를 프론트엔드로 담당했습니다.",
    points: [
      "경유 쇼핑 플랫폼 Wezuro — 모바일 웹·웹뷰 기반 하이브리드 앱 개발 (Next.js)",
      "Wezuro 백오피스 — 여러 개의 input을 가진 복잡한 폼의 유효성 검사 (React·react-hook-form·zod·Tailwind)",
      "사내 블록체인 NFT 마켓플레이스 데모 구축 (React·ethers.js·web3.js)",
      "SK온 x 마이클 '내 차 배터리 관리' 페이지 개발·개편 — 차트 컴포넌트 고도화, 스토리북 기반 컴포넌트 개발(CDD) (React·D3.js·rechart.js·Storybook)",
    ],
  },
];

const education = [
  {
    name: "연세대학교 대기과학과",
    meta: "2011.03 – 2018.02 · 졸업",
    points: [],
  },
  {
    name: "42SEOUL (Cadet)",
    meta: "2020.10 – 2022.03 · 수료",
    points: [
      "C 언어로 그래픽 렌더링 프로그램 개발",
      "Docker를 활용한 프로젝트 빌드",
      "TypeScript·React 중심의 JavaScript ES6+ 개발",
      "Figma 프로토타이핑 및 styled-component 컴포넌트 구현",
      "Jira/Confluence를 이용한 프로젝트 관리·협업",
    ],
  },
];

const skills = [
  "React",
  "TypeScript",
  "Next.js",
  "JavaScript",
  "GraphQL",
  "Docker",
  "C/C++",
  "AWS",
];

const activities = [
  {
    title: "구글 머신러닝 부트캠프",
    meta: "2023.09",
    desc: "코세라 강의로 이론을 학습하고 캐글 컴피티션 참가로 실습하며 딥러닝에 대한 개괄적인 이해를 갖췄습니다.",
    links: [
      {
        label: "수료증",
        href: "https://coursera.org/share/6499da8ff5595d579fea9e918b131b4b",
      },
    ],
  },
];

const sectionTitle =
  "mb-8 text-xs font-semibold uppercase tracking-widest text-neutral-400";

const About = () => {
  return (
    <Content description="ABOUT">
      <SEO
        title="About"
        description="김형태 — 프론트엔드 개발자"
        url={`${SITE_URL}/about`}
      />
      <div className="w-full max-w-2xl px-6 text-neutral-800">
        {/* 헤드라인 — 직접 다듬을 부분 */}
        <header className="mb-16">
          <h1 className="text-5xl font-bold tracking-tight text-neutral-900">
            김형태
          </h1>
          <p className="mt-4 text-lg text-sky-700">
            React·Next.js 기반 5년차 웹 프론트엔드 개발자
          </p>
        </header>

        <section className="mb-20 space-y-5">
          <p className="text-base leading-8 text-neutral-700">
            React와 Next.js를 기반으로 사용자에게 매끄러운 경험을 제공하는 5년차
            웹 프론트엔드 개발자입니다. 단순히 화면을 구현하는 데 그치지 않고,
            비즈니스 목표와 사용자 니즈를 기술적으로 최적화하여 &lsquo;더 나은
            제품&rsquo;을 만드는 데 집중합니다.
          </p>
          <p className="text-base leading-8 text-neutral-700">
            비전공자로 시작했지만 42서울에서의 2년간 시스템·네트워크·웹을 아우르는
            과정을 거치며 탄탄한 컴퓨터 공학 기초를 쌓았습니다. 이 기반을 바탕으로
            프론트엔드라는 직무에 스스로를 가두지 않고, 서비스 전체 구조를
            이해하며 유연하게 협업하고 문제를 해결하려 노력합니다.
          </p>
        </section>

        <section className="mb-20">
          <h2 className={sectionTitle}>경력 · 4년 5개월</h2>
          <ul className="flex flex-col gap-12">
            {experiences.map((exp) => (
              <li key={exp.company} className="border-l-2 border-neutral-100 pl-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {exp.company}
                  </h3>
                  <span className="text-sm text-neutral-400">{exp.meta}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-neutral-600">
                  {exp.summary}
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {exp.points.map((point) => (
                    <li
                      key={point}
                      className="relative pl-4 text-sm leading-7 text-neutral-600 before:absolute before:left-0 before:text-sky-400 before:content-['·']"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-20">
          <h2 className={sectionTitle}>학력</h2>
          <ul className="flex flex-col gap-8">
            {education.map((edu) => (
              <li key={edu.name}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-base font-semibold text-neutral-900">
                    {edu.name}
                  </h3>
                  <span className="text-sm text-neutral-400">{edu.meta}</span>
                </div>
                {edu.points.length > 0 && (
                  <ul className="mt-3 flex flex-col gap-2">
                    {edu.points.map((point) => (
                      <li
                        key={point}
                        className="relative pl-4 text-sm leading-7 text-neutral-600 before:absolute before:left-0 before:text-sky-400 before:content-['·']"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-20">
          <h2 className={sectionTitle}>스킬</h2>
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-neutral-200 px-3 py-1 text-sm text-neutral-700"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-20">
          <h2 className={sectionTitle}>활동 · 그 외</h2>
          <ul className="flex flex-col gap-8">
            {activities.map((act) => (
              <li key={act.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-base font-semibold text-neutral-900">
                    {act.title}
                  </h3>
                  <span className="text-sm text-neutral-400">{act.meta}</span>
                </div>
                <p className="mt-2 text-sm leading-7 text-neutral-600">
                  {act.desc}
                </p>
                <div className="mt-2 flex flex-wrap gap-4">
                  {act.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-sky-700 underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className={sectionTitle}>연락처</h2>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href="mailto:dev.hyongti@gmail.com"
              className="text-base text-sky-700 underline-offset-4 hover:underline"
            >
              dev.hyongti@gmail.com
            </a>
            <a
              href="https://github.com/hyongti"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-sky-700 underline-offset-4 hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/%ED%98%95%ED%83%9C-%EA%B9%80-a33060232/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-sky-700 underline-offset-4 hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </div>
    </Content>
  );
};

export default About;
