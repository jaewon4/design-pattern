"use client";

import { SettingsPanel } from "@/components/singleton/SettingsPanel";
import { userSettingsManager } from "@/lib/patterns/singleton";
import { useEffect, useState } from "react";

export default function SingletonPatternPage() {
  const [settingsJson, setSettingsJson] = useState("");

  useEffect(() => {
    const unsubscribe = userSettingsManager.subscribe((settings) => {
      setSettingsJson(JSON.stringify(settings, null, 2));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Singleton Pattern Demo - User Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              설정 패널
            </h3>
            <SettingsPanel />
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              현재 설정값
            </h3>
            <pre className="bg-gray-50 p-4 rounded-md overflow-auto">
              {settingsJson}
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">
          Pattern Description
        </h3>
        <div className="prose prose-sm">
          <p>
            Singleton 패턴은 클래스의 인스턴스가 오직 하나만 생성되는 것을
            보장하고, 이에 대한 전역적인 접근점을 제공하는 디자인 패턴입니다.
          </p>
          <p className="mt-2">이 데모에서는:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>UserSettingsManager가 싱글톤으로 구현되어 있습니다</li>
            <li>모든 컴포넌트가 동일한 설정 인스턴스를 공유합니다</li>
            <li>설정이 localStorage에 자동으로 저장됩니다</li>
            <li>페이지를 새로고침해도 설정이 유지됩니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
