"use client";

import {
  NotificationList,
  NotificationBadge,
  NotificationControls,
} from "@/components/observer/NotificationCenter";

export default function ObserverPatternPage() {
  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">
            Observer Pattern Demo
          </h2>
          <div className="relative">
            <span className="text-lg">🔔</span>
            <NotificationBadge />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Notification Controls
          </h3>
          <NotificationControls />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Notifications
          </h3>
          <NotificationList />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">
          Pattern Description
        </h3>
        <div className="prose prose-sm">
          <p>
            Observer 패턴은 객체의 상태 변화를 관찰하는 옵저버들의 목록을 객체에
            등록하여 상태 변화가 있을 때마다 메서드 등을 통해 객체가 직접 목록의
            각 옵저버에게 통지하도록 하는 디자인 패턴입니다.
          </p>
          <p className="mt-2">이 데모에서는:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>
              NotificationSubject가 상태를 관리하고 옵저버들에게 변경사항을
              알립니다
            </li>
            <li>
              NotificationList와 NotificationBadge가 옵저버로서 알림 상태를
              구독합니다
            </li>
            <li>
              각 컴포넌트는 독립적으로 업데이트되며, 느슨한 결합을 유지합니다
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
