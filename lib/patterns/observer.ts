type Observer<T> = (data: T) => void;

export class NotificationSubject<T> {
  private observers: Observer<T>[] = [];
  private notifications: T[] = [];

  subscribe(observer: Observer<T>) {
    this.observers.push(observer);
    // 현재 상태를 한번에 전달하되, 각 알림을 개별적으로 보내지 않음
    if (this.notifications.length > 0) {
      observer({
        type: "batch",
        data: [...this.notifications],
      } as unknown as T);
    }

    return () => {
      this.observers = this.observers.filter((obs) => obs !== observer);
    };
  }

  notify(data: T) {
    this.notifications.push(data);
    this.observers.forEach((observer) => observer(data));
  }

  getNotifications() {
    return [...this.notifications];
  }

  clearNotifications() {
    this.notifications = [];
    this.observers.forEach((observer) => observer(null as T));
  }
}

export type Notification = {
  id: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: number;
};

export const notificationService = new NotificationSubject<Notification>();
