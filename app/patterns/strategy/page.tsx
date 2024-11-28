"use client";

import { ProductList } from "@/components/strategy/ProductList";
import { generateSampleProducts } from "@/lib/patterns/strategy";

export default function StrategyPatternPage() {
  const products = generateSampleProducts();

  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">
          Strategy Pattern Example - Product Sorting
        </h1>

        <ProductList products={products} />
      </div>
      <div className="bg-white shadow rounded-lg p-6 mt-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">
          Pattern Description
        </h3>
        <div className="prose prose-sm">
          <p>
            스트래티지 패턴은 알고리즘군을 정의하고 각각을 캡슐화하여 교환해서
            사용할 수 있게 해주는 디자인 패턴입니다. 알고리즘을 사용하는
            클라이언트와는 독립적으로 알고리즘을 변경할 수 있습니다.
          </p>
          <p className="mt-2">이 데모에서는:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>각각의 정렬 방식이 개별 전략으로 구현되어 있습니다</li>
            <li>
              ProductSorter가 전략을 보관하고 실행하는 컨텍스트 역할을 합니다
            </li>
            <li>정렬 전략을 실행 중에 동적으로 교체할 수 있습니다</li>
            <li>
              새로운 정렬 방식을 추가할 때 기존 코드를 수정하지 않고 새로운
              전략만 추가하면 됩니다
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
