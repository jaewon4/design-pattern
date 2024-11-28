import Link from "next/link";

const patterns = [
  {
    id: "observer",
    name: "Observer Pattern",
    description: "실시간 업데이트와 이벤트 처리",
  },
  { id: "singleton", name: "Singleton Pattern", description: "전역 상태 관리" },
  { id: "factory", name: "Factory Pattern", description: "객체 생성 패턴" },
  {
    id: "proxy",
    name: "Proxy Pattern",
    description: "데이터 접근 제어 및 캐싱",
  },
  { id: "composite", name: "Composite Pattern", description: "계층 구조 구현" },
  {
    id: "strategy",
    name: "Strategy Pattern",
    description: "알고리즘 교체 가능한 구현",
  },
  { id: "decorator", name: "Decorator Pattern", description: "동적 기능 추가" },
  { id: "adapter", name: "Adapter Pattern", description: "인터페이스 통합" },
];

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {patterns.map((pattern) => (
        <div
          key={pattern.id}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">
              {pattern.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{pattern.description}</p>
            <div className="mt-4">
              <Link
                href={`/patterns/${pattern.id}`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                예제 보기
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
