"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type HeaderProps = {
    locale: Locale;
    nav: Dictionary["nav"];
};

// 去掉末尾斜杠，方便比较路径
function normalize(path: string) {
    return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

export default function Header({ locale, nav }: HeaderProps) {
    const pathname = normalize(usePathname());
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // 页面滚动后给导航栏加阴影
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const home = `/${locale}`;
    const links = [
        { href: `${home}/`, label: nav.home },
        { href: `${home}/services/`, label: nav.services },
        { href: `${home}/materials/`, label: nav.materials },
        { href: `${home}/about/`, label: nav.about },
    ];

    // 判断当前菜单项是否为所在页面
    function isActive(href: string) {
        const target = normalize(href);
        return target === home ? pathname === home : pathname.startsWith(target);
    }

    return (
        <header
            className={`sticky top-0 z-50 bg-paper/90 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "shadow-[0_1px_12px_rgba(0,0,0,0.06)]" : ""
                }`}
        >
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <Link href={`${home}/`} aria-label="Tout en Bois">
                    <Logo />
                </Link>

                {/* 桌面端菜单 */}
                <nav className="hidden items-center gap-8 lg:flex">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:bg-wood after:transition-all after:duration-300 ${isActive(link.href)
                                ? "text-wood after:w-full"
                                : "text-ink hover:text-wood after:w-0 hover:after:w-full"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* 桌面端右侧：语言切换 + 询价按钮 */}
                <div className="hidden items-center gap-6 lg:flex">
                    <LanguageSwitcher current={locale} />
                    <Link
                        href={`${home}/contact/`}
                        className="bg-wood px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-wood-dark"
                    >
                        {nav.quote}
                    </Link>
                </div>

                {/* 手机端：汉堡按钮 */}
                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-2 text-ink lg:hidden"
                    aria-label="Menu"
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* 手机端：展开菜单 */}
            <div
                className={`overflow-hidden border-t border-line bg-paper transition-all duration-300 lg:hidden ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 border-transparent opacity-0"
                    }`}
            >
                <nav className="flex flex-col px-6 py-4">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className={`border-b border-line py-3 text-base font-medium ${isActive(link.href) ? "text-wood" : "text-ink"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="flex items-center justify-between pt-5">
                        <LanguageSwitcher current={locale} />
                        <Link
                            href={`${home}/contact/`}
                            onClick={() => setMenuOpen(false)}
                            className="bg-wood px-5 py-2.5 text-sm font-medium text-white"
                        >
                            {nav.quote}
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}