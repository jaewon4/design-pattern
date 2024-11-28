export type Theme = "light" | "dark" | "system";
export type Language = "ko" | "en" | "ja";
export type FontSize = "small" | "medium" | "large";

export interface UserSettings {
  theme: Theme;
  language: Language;
  fontSize: FontSize;
  notifications: boolean;
  autoSave: boolean;
}

export class UserSettingsManager {
  private static instance: UserSettingsManager;
  private listeners: ((settings: UserSettings) => void)[] = [];

  private settings: UserSettings = {
    theme: "system",
    language: "ko",
    fontSize: "medium",
    notifications: true,
    autoSave: true,
  };

  private constructor() {
    // 브라우저 환경에서만 실행
    if (typeof window !== "undefined") {
      // localStorage에서 설정 불러오기
      const savedSettings = localStorage.getItem("userSettings");
      if (savedSettings) {
        this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
      }
    }
  }

  public static getInstance(): UserSettingsManager {
    if (!UserSettingsManager.instance) {
      UserSettingsManager.instance = new UserSettingsManager();
    }
    return UserSettingsManager.instance;
  }

  public getSettings(): UserSettings {
    return { ...this.settings };
  }

  public updateSettings(newSettings: Partial<UserSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
    if (typeof window !== "undefined") {
      localStorage.setItem("userSettings", JSON.stringify(this.settings));
    }
    this.notifyListeners();
  }

  public subscribe(listener: (settings: UserSettings) => void): () => void {
    this.listeners.push(listener);
    listener(this.settings); // 즉시 현재 설정 전달

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.settings));
  }
}

// 전역 인스턴스 생성
export const userSettingsManager = UserSettingsManager.getInstance();
