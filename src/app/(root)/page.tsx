"use client";

import { useEffect } from "react";

export default function RootRedirectPage() {
  useEffect(() => {
    // 浏览器语言为中文 → 中文版，否则 → 法语版
    const isChinese = navigator.language.toLowerCase().startsWith("zh");
    window.location.replace(isChinese ? "/zh/" : "/fr/");
  }, []);

  // 跳转前短暂显示，或浏览器禁用 JavaScript 时手动选择
  return (
    <main className="min-h-screen flex items-center justify-center gap-6 text-forest">
      <a href="/fr/" className="hover:text-bronze">Français</a>
      <span className="text-line">|</span>
      <a href="/zh/" className="hover:text-bronze">中文</a>
    </main>
  );
}