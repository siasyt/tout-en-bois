// 网站支持的语言
export const locales = ["fr", "zh"] as const;

// 语言类型：只能是 "fr" 或 "zh"
export type Locale = (typeof locales)[number];

// 默认语言：法语
export const defaultLocale: Locale = "fr";

// 语言切换按钮上显示的名称
export const localeNames: Record<Locale, string> = {
  fr: "Français",
  zh: "中文",
};

// 判断一个字符串是不是支持的语言
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}