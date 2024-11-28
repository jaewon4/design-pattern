// Alert 타입 정의
export type AlertType = "success" | "error" | "warning" | "info";

// Alert 인터페이스
export interface Alert {
  id: string;
  type: AlertType;
  message: string;
  duration?: number;
}

// Alert Factory 클래스
export class AlertFactory {
  private static counter = 0;

  static create(
    type: AlertType,
    message: string,
    duration: number = 3000
  ): Alert {
    return {
      id: `alert-${++this.counter}`,
      type,
      message,
      duration,
    };
  }

  static createSuccess(message: string, duration?: number): Alert {
    return this.create("success", message, duration);
  }

  static createError(message: string, duration?: number): Alert {
    return this.create("error", message, duration);
  }

  static createWarning(message: string, duration?: number): Alert {
    return this.create("warning", message, duration);
  }

  static createInfo(message: string, duration?: number): Alert {
    return this.create("info", message, duration);
  }
}
