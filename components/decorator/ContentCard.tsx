import { BaseComponentProps } from "@/lib/patterns/decorator";
import { withLoading, withError, withAuth } from "./decorators";

// 기본 컴포넌트
const BaseContentCard: React.FC<BaseComponentProps> = ({ title, content }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600">{content}</p>
    </div>
  );
};

// 데코레이터 적용
export const ContentCard = withAuth(withError(withLoading(BaseContentCard)));

// 컨트롤 패널 컴포넌트
interface ControlPanelProps {
  onToggleLoading: () => void;
  onToggleError: () => void;
  onToggleAuth: () => void;
  isLoading: boolean;
  hasError: boolean;
  isAuthenticated: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onToggleLoading,
  onToggleError,
  onToggleAuth,
  isLoading,
  hasError,
  isAuthenticated,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <span className="font-medium">Loading State</span>
        <button
          onClick={onToggleLoading}
          className={`px-4 py-2 rounded ${
            isLoading ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {isLoading ? "Show Content" : "Show Loading"}
        </button>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <span className="font-medium">Error State</span>
        <button
          onClick={onToggleError}
          className={`px-4 py-2 rounded ${
            hasError ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {hasError ? "Clear Error" : "Show Error"}
        </button>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <span className="font-medium">Auth State</span>
        <button
          onClick={onToggleAuth}
          className={`px-4 py-2 rounded ${
            isAuthenticated ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};
