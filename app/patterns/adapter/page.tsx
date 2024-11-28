"use client";

import { UserDisplay } from "@/components/adapter/UserDisplay";

export default function AdapterPatternPage() {
  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">
          Adapter Pattern Example - User Data Integration
        </h1>
        <UserDisplay />
      </div>
      <div className="bg-white shadow rounded-lg p-6 mt-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">
          Pattern Description
        </h3>
        <div className="prose prose-sm">
          <p>
            어댑터 패턴은 호환되지 않는 인터페이스를 가진 클래스들이 함께 동작할
            수 있도록 변환해주는 구조적 디자인 패턴입니다. 서로 다른
            인터페이스를 가진 코드를 함께 작동하게 만들 수 있습니다.
          </p>
          <p className="mt-4">
            이 예제에서는 두 가지 다른 형식의 사용자 데이터를 다룹니다:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-4">
            <li>
              <strong>Legacy System (기존/구형 시스템):</strong>
              <ul className="list-disc pl-5 mt-2">
                <li>오래전에 만들어진 기존 시스템의 데이터 형식</li>
                <li>snake_case 네이밍 규칙 사용 (예: user_id, first_name)</li>
                <li>이름을 first_name과 last_name으로 분리</li>
                <li>단순한 평면적 데이터 구조 사용</li>
              </ul>
            </li>
            <li>
              <strong>Third Party System (외부/제3자 시스템):</strong>
              <ul className="list-disc pl-5 mt-2">
                <li>
                  외부 서비스(예: 구글, 페이스북 로그인)에서 제공하는 데이터
                  형식
                </li>
                <li>camelCase 네이밍 규칙 사용 (예: displayName)</li>
                <li>이름을 하나의 필드로 통합</li>
                <li>중첩된 객체 구조 사용 (metadata 내부에 정보 포함)</li>
              </ul>
            </li>
          </ul>
          <p className="mt-4">어댑터 패턴의 적용:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>
              각 데이터 소스별로 전용 어댑터(LegacyUserAdapter,
              ThirdPartyUserAdapter)를 구현하여 데이터 변환을 처리합니다
            </li>
            <li>
              두 형식의 데이터를 모두 표준화된 하나의 형식(StandardUserData)으로
              변환합니다
            </li>
            <li>
              UI 컴포넌트는 이 표준화된 데이터 형식만 이해하면 되므로, 데이터의
              출처와 관계없이 일관된 방식으로 표시할 수 있습니다
            </li>
            <li>
              새로운 데이터 소스(예: 다른 소셜 로그인)가 추가되어도 해당
              어댑터만 새로 구현하면 되므로 확장이 용이합니다
            </li>
          </ul>
          <p className="mt-4">실제 활용 사례:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>오래된 사내 회원관리 시스템과 새로운 소셜 로그인 통합</li>
            <li>여러 외부 API들의 데이터를 일관된 형식으로 변환</li>
            <li>레거시 시스템 데이터를 새로운 시스템에 맞게 변환</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
