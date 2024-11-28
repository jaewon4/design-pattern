import { Alert as AlertType } from "@/lib/patterns/factory";
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const alertStyles = {
  success: "bg-green-50 text-green-800 border-green-200",
  error: "bg-red-50 text-red-800 border-red-200",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
  info: "bg-blue-50 text-blue-800 border-blue-200",
};

const alertIcons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
};

interface AlertProps {
  alert: AlertType;
  onClose?: (id: string) => void;
}

export const Alert = ({ alert, onClose }: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (alert.duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.(alert.id);
      }, alert.duration);

      return () => clearTimeout(timer);
    }
  }, [alert, onClose]);

  if (!isVisible) return null;

  const Icon = alertIcons[alert.type];

  return (
    <div
      className={`${
        alertStyles[alert.type]
      } border rounded-lg p-4 mb-4 flex items-start`}
    >
      <Icon className="h-5 w-5 mr-3" />
      <div className="flex-1">{alert.message}</div>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.(alert.id);
        }}
        className="ml-3 text-gray-400 hover:text-gray-600"
      >
        <span className="sr-only">Close</span>
        <XCircleIcon className="h-5 w-5" />
      </button>
    </div>
  );
};
