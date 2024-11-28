"use client";

import { useState } from "react";
import { ContentCard, ControlPanel } from "@/components/decorator/ContentCard";

export default function DecoratorPatternPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleToggleLoading = () => setIsLoading(!isLoading);
  const handleToggleError = () => {
    if (error) {
      setError(null);
    } else {
      setError(new Error("Something went wrong!"));
    }
  };
  const handleToggleAuth = () => setIsAuthenticated(!isAuthenticated);

  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">
          Decorator Pattern Example - Enhanced Content Card
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ContentCard
              title="Sample Content"
              content="This is a sample content that demonstrates the decorator pattern. The content can be wrapped with various decorators to add functionality like loading states, error handling, and authentication checks."
              isLoading={isLoading}
              error={error}
              isAuthenticated={isAuthenticated}
            />
          </div>

          <div>
            <ControlPanel
              onToggleLoading={handleToggleLoading}
              onToggleError={handleToggleError}
              onToggleAuth={handleToggleAuth}
              isLoading={isLoading}
              hasError={!!error}
              isAuthenticated={isAuthenticated}
            />
          </div>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6 mt-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">
          Pattern Description
        </h3>
        <div className="prose prose-sm">
          <p>
            데코레이터 패턴은 객체에 동적으로 새로운 책임을 추가할 수 있게
            해주는 패턴입니다. 데코레이터는 서브클래싱을 통한 확장보다 유연한
            대안을 제공합니다.
          </p>
          <p className="mt-2">이 데모에서는:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>
              기본 컴포넌트에 로딩, 에러 처리, 인증 체크 기능이 데코레이터로
              추가됩니다
            </li>
            <li>
              각 데코레이터는 Higher Order Component(HOC)로 구현되어 있습니다
            </li>
            <li>데코레이터는 순서대로 적용되며, 각각 독립적으로 동작합니다</li>
            <li>
              컴포넌트의 핵심 로직을 수정하지 않고도 새로운 기능을 추가할 수
              있습니다
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
