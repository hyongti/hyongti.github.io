# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Next.js 15와 MDX로 구축된 개인 블로그/포트폴리오 웹사이트. GitHub Pages에 정적 사이트로 배포됨.

## 명령어

```bash
pnpm dev      # 개발 서버 실행 (Turbopack)
pnpm build    # 프로덕션 빌드
pnpm lint     # ESLint 실행
pnpm deploy   # 빌드 후 gh-pages 브랜치에 배포
```

## 아키텍처

**기술 스택:** Next.js 15, React 19, TypeScript 5, Tailwind CSS 4, Contentlayer2 (MDX 콘텐츠 관리)

**주요 디렉토리:**
- `src/pages/` - Next.js 페이지 라우트 (blog, about, projects)
- `src/components/layouts/` - 레이아웃 컴포넌트 (Layout, Navbar, Content)
- `src/hooks/` - 커스텀 React 훅
- `posts/` - MDX 형식의 블로그 글

**콘텐츠 시스템:**
- 블로그 글은 `/posts/` 디렉토리에 MDX 파일로 저장 (프론트매터: `title`, `date`, `description`)
- Contentlayer2가 MDX를 처리하고 타입이 지정된 콘텐츠 생성 (설정: `contentlayer.config.ts`)
- `contentlayer2/generated`에서 `allPosts`로 글 목록 접근

**라우팅:**
- `/` → `/blog`로 리다이렉트
- `/blog/[id]` - 개별 글의 동적 라우트 (파일명이 slug로 사용됨)

**배포:**
- `/out/` 디렉토리로 정적 익스포트
- main 브랜치 푸시 시 GitHub Actions가 gh-pages 브랜치로 배포

## 설정 파일

- `next.config.js` - Contentlayer2 플러그인, 정적 익스포트 설정
- `contentlayer.config.ts` - Post 문서 스키마 정의
- `postcss.config.mjs` - Tailwind CSS 4 PostCSS 설정

## 알려진 TODO

- `src/const/navlinks.ts` - 링크 관리 통합 필요
- `src/components/layouts/Navbar.tsx` - 코드 리팩토링 필요
- `src/pages/blog/[id].tsx` - 링크 및 코드 블록 스타일링 필요
