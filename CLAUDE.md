# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Next.js 15와 TinaCMS로 구축된 개인 블로그/포트폴리오 웹사이트. 정적 사이트로 익스포트되어 GitHub Pages에 배포됨.

## 명령어

```bash
pnpm dev      # TinaCMS + Next.js 개발 서버 실행 (Turbopack)
              # → 사이트: localhost:3000, 관리자 UI: localhost:3000/admin
pnpm build    # TinaCMS 빌드 + Next.js 프로덕션 빌드 + 사이트맵 생성
pnpm start    # 빌드된 결과물 실행
pnpm lint     # ESLint 실행
pnpm deploy   # 빌드 후 out/ 을 gh-pages 브랜치로 subtree push (수동 배포)
```

## 아키텍처

**기술 스택:** Next.js 15 (Pages Router), React 19, TypeScript 5, Tailwind CSS 4, TinaCMS (MDX 콘텐츠 관리), Prism.js (코드 하이라이팅)

**주요 디렉토리:**
- `src/pages/` - Next.js 페이지 라우트 (`index`, `blog`, `about`, `projects`)
- `src/components/` - 컴포넌트
  - `layouts/` - `Layout`, `Navbar`, `Content`
  - `Post.tsx`, `SEO.tsx`, `YouTube.tsx`, `LinkCard.tsx`
- `src/hooks/` - 커스텀 React 훅 (`useScrollDirection`)
- `src/lib/gtag.ts` - Google Analytics 헬퍼
- `src/const/navlinks.ts` - 내비게이션 링크 정의
- `posts/` - MDX 형식의 블로그 글
- `tina/` - TinaCMS 설정 및 생성된 클라이언트/타입
- `scripts/generate-sitemap.mjs` - 빌드 시 `sitemap.xml` / `robots.txt` 생성

**콘텐츠 시스템 (TinaCMS):**
- 블로그 글은 `posts/` 디렉토리에 MDX 파일로 저장
- 프론트매터 필드: `slug`(파일명·URL로 사용), `title`, `date`, `description`
- 콘텐츠 스키마는 `tina/config.ts`의 `post` 컬렉션에 정의
- `tina/__generated__/client.ts`의 생성된 클라이언트로 글 조회
  - 목록: `client.queries.postConnection` (`src/pages/blog/index.tsx`)
  - 단일 글: `client.queries.post` + `useTina` + `<TinaMarkdown>` (`src/pages/blog/[id].tsx`)
- 본문에서 사용 가능한 커스텀 컴포넌트 (config의 `templates`에 정의):
  - `<YouTube id="..." />` - 유튜브 임베드
  - `<LinkCard url="..." />` - 링크 미리보기 카드
- 스키마 변경 시 `tina/__generated__/` 파일들이 재생성됨 (수동 편집 금지)

**글 작성 방법:**
1. **관리자 UI:** `pnpm dev` 실행 후 `localhost:3000/admin`에서 리치텍스트로 작성 (저장 시 `posts/*.mdx` 자동 생성)
2. **직접 작성:** `posts/`에 `.mdx` 파일 생성 후 프론트매터(`slug`, `title`, `date`, `description`) 작성

**라우팅:**
- `/` → 홈
- `/blog` - 글 목록, `/blog/[id]` - 개별 글 (파일명이 slug)
- `/about`, `/projects`

**배포:**
- `next.config.js`에서 `output: "export"`로 `out/` 디렉토리에 정적 익스포트
- **자동 배포:** main 브랜치 푸시 시 `.github/workflows/main.yml`이 빌드 후 gh-pages 브랜치로 배포
  - 필요한 GitHub Secrets: `TINA_CLIENT_ID`, `TINA_TOKEN`, `NEXT_PUBLIC_GA_ID`
- **수동 배포:** `pnpm deploy` (git subtree push)

## 설정 파일

- `next.config.js` - 정적 익스포트(`output: "export"`), 이미지 최적화 비활성화
- `tina/config.ts` - TinaCMS 스키마 및 미디어/빌드 설정 (`outputFolder: "admin"`)
- `postcss.config.mjs` - Tailwind CSS 4 PostCSS 설정
- `.env` - `NEXT_PUBLIC_TINA_CLIENT_ID`, `TINA_TOKEN` 등 (커밋 금지)

## 알려진 TODO

- `src/const/navlinks.ts` - 링크 관리 통합 필요
- `src/components/layouts/Navbar.tsx` - 코드 리팩토링 필요
