import { ComponentType } from "react";

// 기본 컴포넌트 Props 인터페이스
export interface BaseComponentProps {
  title: string;
  content: string;
}

// 데코레이터에 추가되는 Props 타입들
export interface WithLoadingProps {
  isLoading?: boolean;
}

export interface WithErrorProps {
  error?: Error | null;
}

export interface WithAuthProps {
  isAuthenticated?: boolean;
}

// HOC 데코레이터 타입
export type WithLoading = <P extends BaseComponentProps>(
  WrappedComponent: ComponentType<P>
) => ComponentType<P & WithLoadingProps>;

export type WithError = <P extends BaseComponentProps>(
  WrappedComponent: ComponentType<P>
) => ComponentType<P & WithErrorProps>;

export type WithAuth = <P extends BaseComponentProps>(
  WrappedComponent: ComponentType<P>
) => ComponentType<P & WithAuthProps>;
