"use client";

import { useEffect, useState } from "react";
import { Notification, notificationService } from "@/lib/patterns/observer";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const NotificationIcon = ({ type }: { type: Notification["type"] }) => {
  const className = "h-6 w-6";
  switch (type) {
    case "success":
      return <CheckCircleIcon className={`${className} text-green-500`} />;
    case "error":
      return <XCircleIcon className={`${className} text-red-500`} />;
    case "warning":
      return (
        <ExclamationCircleIcon className={`${className} text-yellow-500`} />
      );
    default:
      return <InformationCircleIcon className={`${className} text-blue-500`} />;
  }
};

export const NotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // 컴포넌트 마운트시 notifications 초기화
    setNotifications([]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unsubscribe = notificationService.subscribe((notification: any) => {
      if (!notification) {
        setNotifications([]);
      } else if (notification.type === "batch") {
        // 배치 업데이트 처리
        setNotifications(notification.data);
      } else {
        setNotifications((prev) => [...prev, notification]);
      }
    });

    // 컴포넌트 언마운트시 cleanup
    return () => {
      unsubscribe();
      setNotifications([]);
    };
  }, []); // 의존성 배열이 비어있어 마운트시에만 실행

  return (
    <div className="space-y-4">
      {notifications.map((notification, index) => (
        <div
          key={`${notification.id}-${index}`}
          className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow"
        >
          <NotificationIcon type={notification.type} />
          <div>
            <p className="text-sm text-gray-900">{notification.message}</p>
            <p className="text-xs text-gray-500">
              {new Date(notification.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const NotificationBadge = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0); // 초기화

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unsubscribe = notificationService.subscribe((notification: any) => {
      if (!notification) {
        setCount(0);
      } else if (notification.type === "batch") {
        // 배치 데이터를 받았을 때 전체 개수 설정
        setCount(notification.data.length);
      } else {
        setCount((prev) => prev + 1);
      }
    });

    return () => {
      unsubscribe();
      setCount(0);
    };
  }, []);

  return count > 0 ? (
    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
      {count}
    </span>
  ) : null;
};

let notificationCounter = 0;

export const NotificationControls = () => {
  const types: Notification["type"][] = ["info", "success", "warning", "error"];

  const createNotification = (type: Notification["type"]) => {
    const timestamp = Date.now();
    notificationCounter += 1;
    notificationService.notify({
      id: `notification-${notificationCounter}-${timestamp}`,
      message: `This is a ${type} notification!`,
      type,
      timestamp,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => createNotification(type)}
            className="px-4 py-2 text-sm font-medium text-white rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add {type}
          </button>
        ))}
      </div>
      <button
        onClick={() => notificationService.clearNotifications()}
        className="px-4 py-2 text-sm font-medium text-white rounded-md bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Clear All
      </button>
    </div>
  );
};
