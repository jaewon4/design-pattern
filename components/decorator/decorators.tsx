import { WithLoading, WithError, WithAuth } from "@/lib/patterns/decorator";

export const withLoading: WithLoading = (WrappedComponent) => {
  return function WithLoadingComponent(props) {
    if (props.isLoading) {
      return (
        <div className="animate-pulse p-4 bg-white rounded-lg shadow">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
        </div>
      );
    }
    return <WrappedComponent {...props} />;
  };
};

export const withError: WithError = (WrappedComponent) => {
  return function WithErrorComponent(props) {
    if (props.error) {
      return (
        <div className="p-4 bg-red-50 rounded-lg">
          <h3 className="text-red-800 font-medium">Error</h3>
          <p className="text-red-600">{props.error.message}</p>
        </div>
      );
    }
    return <WrappedComponent {...props} />;
  };
};

export const withAuth: WithAuth = (WrappedComponent) => {
  return function WithAuthComponent(props) {
    if (!props.isAuthenticated) {
      return (
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h3 className="text-yellow-800 font-medium">
            Authentication Required
          </h3>
          <p className="text-yellow-600">Please log in to view this content.</p>
        </div>
      );
    }
    return <WrappedComponent {...props} />;
  };
};
