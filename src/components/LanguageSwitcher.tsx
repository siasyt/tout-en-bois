"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

// 按钮上显示的简短名称
const labels: Record<Locale, string> = {
    fr: "FR",
    zh: "中文",
};

export default function LanguageSwitcher({ current }: { current: Locale }) {
    const pathname = usePathname();

    // 把当前路径里的语言部分替换成目标语言，页面保持不变
    function pathFor(target: Locale) {
        const segments = pathname.split("/");
        segments[1] = target;
        return segments.join("/");
    }

    return (
        <div className="flex items-center gap-2 text-sm">
            {locales.map((locale, index) => (
                <span key={locale} className="flex items-center gap-2">
                    {index > 0 && <span className="text-line">|</span>}
                    {locale === current ? (
                        <span className="font-semibold text-ink">{labels[locale]}</span>
                    ) : (
                        <Link
                            href={pathFor(locale)}
                            className="text-muted hover:text-wood transition-colors"
                        >
                            {labels[locale]}
                        </Link>
                    )}
                </span>
            ))}
        </div>
    );
}