import type { Locale } from "./config";
import fr from "./dictionaries/fr.json";

// 以法语文件的结构作为类型标准，中文文件必须保持相同结构
export type Dictionary = typeof fr;

// 按语言按需加载对应的内容文件
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
  zh: () => import("./dictionaries/zh.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}