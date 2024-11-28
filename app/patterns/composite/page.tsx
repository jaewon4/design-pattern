"use client";

import { useState } from "react";
import { MenuItemComponent } from "@/components/composite/Menu";
import { createMenuTree } from "@/lib/patterns/composite";

export default function CompositePatternPage() {
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const menuTree = createMenuTree();

  const handleMenuSelect = (paths: string[]) => {
    setSelectedPath(paths);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">
          Composite Pattern Example - Hierarchical Menu
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-medium">Menu Structure</h2>
            </div>
            <div className="divide-y">
              {menuTree.getChildren().map((item) => (
                <MenuItemComponent
                  key={item.id}
                  item={item}
                  level={0}
                  onSelect={handleMenuSelect}
                />
              ))}
            </div>
          </div>

          <div className="col-span-2 bg-white shadow rounded-lg p-6">
            <h2 className="font-medium mb-4">Selected Path</h2>
            {selectedPath.length > 0 ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  {selectedPath.map((path, index) => (
                    <span key={index} className="flex items-center">
                      {index > 0 && <span className="mx-2">›</span>}
                      {path}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">메뉴를 선택해주세요</p>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6 mt-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">
          Pattern Description
        </h3>
        <div className="prose prose-sm">
          <p>
            컴포지트 패턴은 객체들의 관계를 트리 구조로 구성하여 부분-전체
            계층을 표현하는 패턴입니다. 개별 객체와 복합 객체를 동일한 방식으로
            다룰 수 있게 해줍니다.
          </p>
          <p className="mt-2">이 데모에서는:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>
              MenuGroup(Composite)과 MenuItem(Leaf)이 동일한 MenuComponent
              인터페이스를 구현합니다
            </li>
            <li>
              메뉴 구조가 재귀적으로 구성되어 무한한 깊이의 계층 구조를
              지원합니다
            </li>
            <li>모든 메뉴 항목이 자신의 경로를 추적할 수 있습니다</li>
            <li>
              클라이언트 코드는 개별 항목과 그룹을 동일한 방식으로 처리할 수
              있습니다
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
