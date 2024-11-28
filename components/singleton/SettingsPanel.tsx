"use client";

import { useState, useEffect } from "react";
import {
  UserSettings,
  userSettingsManager,
  Theme,
  Language,
  FontSize,
} from "@/lib/patterns/singleton";

const ThemeSelector = () => {
  // 초기값을 userSettingsManager에서 바로 가져옴
  const [theme, setTheme] = useState<Theme>(
    userSettingsManager.getSettings().theme
  );

  useEffect(() => {
    const unsubscribe = userSettingsManager.subscribe((settings) => {
      setTheme(settings.theme);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">테마</label>
      <select
        value={theme}
        onChange={(e) =>
          userSettingsManager.updateSettings({ theme: e.target.value as Theme })
        }
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="light">라이트 모드</option>
        <option value="dark">다크 모드</option>
        <option value="system">시스템 설정</option>
      </select>
    </div>
  );
};

const LanguageSelector = () => {
  const [language, setLanguage] = useState<Language>(
    userSettingsManager.getSettings().language
  );

  useEffect(() => {
    const unsubscribe = userSettingsManager.subscribe((settings) => {
      setLanguage(settings.language);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">언어</label>
      <select
        value={language}
        onChange={(e) =>
          userSettingsManager.updateSettings({
            language: e.target.value as Language,
          })
        }
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="ko">한국어</option>
        <option value="en">English</option>
        <option value="ja">日本語</option>
      </select>
    </div>
  );
};

const FontSizeSelector = () => {
  const [fontSize, setFontSize] = useState<FontSize>(
    userSettingsManager.getSettings().fontSize
  );

  useEffect(() => {
    const unsubscribe = userSettingsManager.subscribe((settings) => {
      setFontSize(settings.fontSize);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        글자 크기
      </label>
      <select
        value={fontSize}
        onChange={(e) =>
          userSettingsManager.updateSettings({
            fontSize: e.target.value as FontSize,
          })
        }
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="small">작게</option>
        <option value="medium">보통</option>
        <option value="large">크게</option>
      </select>
    </div>
  );
};

const ToggleSettings = () => {
  const initialSettings = userSettingsManager.getSettings();
  const [settings, setSettings] = useState<UserSettings>(initialSettings);

  useEffect(() => {
    const unsubscribe = userSettingsManager.subscribe(setSettings);
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">알림 설정</span>
        <button
          onClick={() =>
            userSettingsManager.updateSettings({
              notifications: !settings.notifications,
            })
          }
          className={`${
            settings.notifications ? "bg-indigo-600" : "bg-gray-200"
          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          <span
            className={`${
              settings.notifications ? "translate-x-5" : "translate-x-0"
            } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">자동 저장</span>
        <button
          onClick={() =>
            userSettingsManager.updateSettings({ autoSave: !settings.autoSave })
          }
          className={`${
            settings.autoSave ? "bg-indigo-600" : "bg-gray-200"
          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          <span
            className={`${
              settings.autoSave ? "translate-x-5" : "translate-x-0"
            } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
          />
        </button>
      </div>
    </div>
  );
};

export const SettingsPanel = () => {
  return (
    <div className="space-y-6">
      <ThemeSelector />
      <LanguageSelector />
      <FontSizeSelector />
      <ToggleSettings />
    </div>
  );
};
