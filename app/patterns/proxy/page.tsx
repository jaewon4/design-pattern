"use client";

import { PostList } from "@/components/proxy/PostList";

export default function ProxyPatternPage() {
  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">
          Proxy Pattern Example - Cached API Service
        </h1>

        <PostList />
      </div>
      <div className="bg-white shadow rounded-lg p-6 mt-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">
          Pattern Description
        </h3>
        <div className="prose prose-sm">
          <p>
            프록시 패턴은 특정 객체에 대한 접근을 제어하거나 추가적인 기능을
            제공하는 대리자 객체를 두는 디자인 패턴입니다. 원본 객체의
            인터페이스를 그대로 유지하면서 기능을 확장하거나 접근을 제어할 수
            있습니다.
          </p>
          <p className="mt-2">이 데모에서는:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>
              ProxyDataService가 실제 API 요청을 캐싱하여 성능을 최적화합니다
            </li>
            <li>
              캐시된 데이터는 1분간 유효하며, 그 동안은 실제 API 호출을 하지
              않습니다
            </li>
            <li>
              캐시를 수동으로 초기화할 수 있어 최신 데이터를 강제로 불러올 수
              있습니다
            </li>
            <li>
              프록시는 원본 서비스와 동일한 인터페이스를 유지하여 클라이언트
              코드의 변경 없이 적용됩니다
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
