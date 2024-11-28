# Design Patterns Study with Next.js

이 프로젝트는 JavaScript/TypeScript로 구현하는 디자인 패턴 학습을 위한 레포지토리입니다. Next.js와 React를 사용하여 실제 웹 애플리케이션에서 각 디자인 패턴이 어떻게 적용되는지 보여줍니다.

## 학습 디자인 패턴

- Observer Pattern (완료)
- Singleton Pattern
- Factory Pattern
- Proxy Pattern
- Composite Pattern
- Strategy Pattern
- Decorator Pattern
- Adapter Pattern

## Project Structure

```
.
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── observer/
│   ├── singleton/
│   ├── factory/
│   ├── proxy/
│   ├── composite/
│   ├── strategy/
│   ├── decorator/
│   └── adapter/
├── lib/
│   ├── patterns/
│   │   ├── observer.ts
│   │   ├── singleton.ts
│   │   ├── factory.ts
│   │   ├── proxy.ts
│   │   ├── composite.ts
│   │   ├── strategy.ts
│   │   ├── decorator.ts
│   │   └── adapter.ts
│   └── utils/
├── types/
└── styles/
```

## Directory Structure

### `/app`

Next.js 13+ App Router의 메인 디렉토리입니다.

- `layout.tsx`: 전역 레이아웃 컴포넌트
- `page.tsx`: 메인 페이지 컴포넌트

### `/components`

각 디자인 패턴을 구현한 React 컴포넌트들이 패턴별로 구성되어 있습니다.

- `/observer`: Observer 패턴 예제 컴포넌트
- `/singleton`: Singleton 패턴 예제 컴포넌트
- `/factory`: Factory 패턴 예제 컴포넌트
- `/proxy`: Proxy 패턴 예제 컴포넌트
- `/composite`: Composite 패턴 예제 컴포넌트
- `/strategy`: Strategy 패턴 예제 컴포넌트
- `/decorator`: Decorator 패턴 예제 컴포넌트
- `/adapter`: Adapter 패턴 예제 컴포넌트

### `/lib`

핵심 패턴 구현체와 유틸리티 함수들을 포함합니다.

- `/patterns`: 각 디자인 패턴의 실제 TypeScript 구현체
- `/utils`: 유틸리티 함수들

### `/types`

TypeScript 타입 정의 파일들을 포함합니다.

### `/styles`

전역 스타일 및 CSS 모듈 파일들을 포함합니다.

## Getting Started

```bash
# 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

http://localhost:3000 에서 각 디자인 패턴의 실제 구현과 예제를 확인할 수 있습니다.
