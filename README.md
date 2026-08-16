# Relay Work

소규모 팀이 공지와 요청을 등록·공유·확인·처리하는 전달사항 중심 업무 소통 서비스입니다. 메신저 속에서 놓치기 쉬운 내용을 한곳에서 관리하고, **읽음**과 **완료** 상태를 분리해 확인할 수 있습니다.

## 현재 구현 범위

- NestJS + Prisma 기반 팀·멤버·역할·카테고리·전달사항 API
- 대상별 공개, 읽음 기록, 완료 상태, 검색·필터, 팀 홈 집계
- Next.js 반응형 UI: 팀 선택·생성, 홈, 전달사항 목록/상세/작성/수정, 팀원·설정
- 빈 상태, 로딩, 오류, 삭제 확인, 다크 모드, UI 데이터 프리뷰

## 기술 스택

- Web: Next.js, TypeScript, Tailwind CSS, shadcn/ui
- API: NestJS, Zod, Prisma
- Database: SQLite
- Package manager: pnpm workspace

## 실행

```bash
pnpm install
pnpm --filter @relay-work/api dev
pnpm --filter @relay-work/web dev
```

- Web: `http://localhost:3000`
- API: `http://localhost:4000`
- UI 데이터 프리뷰: `http://localhost:3000/preview`

## 문서

- [API 계약](docs/API.md)
- [백엔드 구현 현황](docs/BACKEND_STATUS.md)
- [UI 가이드](docs/UI_GUIDE.md)
- [개발 범위와 진행 원칙](docs/DEVELOPMENT.md)

## AI Assistance

UI 초안, 반복 구현, API/문서 구조 검토에 OpenAI Codex를 보조적으로 활용했습니다. 요구사항 정의, UI·UX 판단, 코드 검토와 최종 통합은 작성자가 수행했습니다.
