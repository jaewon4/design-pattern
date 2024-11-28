"use client";

import { useState } from "react";
import { Alert as AlertType, AlertFactory } from "@/lib/patterns/factory";
import { Alert } from "@/components/factory/Alert";

export default function FactoryPatternPage() {
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  const createAlert = (type: "success" | "error" | "warning" | "info") => {
    const messages = {
      success: "성공적으로 처리되었습니다!",
      error: "오류가 발생했습니다.",
      warning: "주의가 필요합니다.",
      info: "새로운 정보가 있습니다.",
    };

    let newAlert: AlertType;
    switch (type) {
      case "success":
        newAlert = AlertFactory.createSuccess(messages.success);
        break;
      case "error":
        newAlert = AlertFactory.createError(messages.error);
        break;
      case "warning":
        newAlert = AlertFactory.createWarning(messages.warning);
        break;
      case "info":
        newAlert = AlertFactory.createInfo(messages.info);
        break;
    }

    setAlerts((prev) => [...prev, newAlert]);
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">
          Factory Pattern Example - Alert System
        </h1>

        <div className="space-x-4 mb-8">
          <button
            onClick={() => createAlert("success")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Success Alert
          </button>
          <button
            onClick={() => createAlert("error")}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Error Alert
          </button>
          <button
            onClick={() => createAlert("warning")}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Warning Alert
          </button>
          <button
            onClick={() => createAlert("info")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Info Alert
          </button>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <Alert key={alert.id} alert={alert} onClose={removeAlert} />
          ))}
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6 mt-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">
          Pattern Description
        </h3>
        <div className="prose prose-sm">
          <p>
            Factory 패턴은 객체 생성 로직을 캡슐화하여 객체의 생성을
            서브클래스나 별도의 Factory 클래스에 위임하는 디자인 패턴입니다.
            이를 통해 객체 생성의 유연성을 높이고 코드의 결합도를 낮출 수
            있습니다.
          </p>
          <p className="mt-2">이 데모에서는:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>AlertFactory가 중앙에서 모든 Alert 객체의 생성을 담당합니다</li>
            <li>
              각 Alert 타입별로 전용 생성 메서드(createSuccess, createError
              등)를 제공하여 사용이 편리합니다
            </li>
            <li>
              Alert의 스타일, 아이콘, 지속시간 등의 복잡한 설정을 Factory가
              처리하여 클라이언트 코드를 단순화합니다
            </li>
            <li>
              새로운 Alert 타입이 필요할 때 Factory만 수정하면 되므로 확장성이
              우수합니다
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
