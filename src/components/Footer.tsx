import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Logo from "./Logo";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type FooterProps = {
    locale: Locale;
    nav: Dictionary["nav"];
    footer: Dictionary["footer"];
};

export default function Footer({ locale, nav, footer }: FooterProps) {
    const home = `/${locale}`;
    const year = new Date().getFullYear();

    const links = [
        { href: `${home}/`, label: nav.home },
        { href: `${home}/services/`, label: nav.services },
        { href: `${home}/materials/`, label: nav.materials },
        { href: `${home}/about/`, label: nav.about },
        { href: `${home}/contact/`, label: nav.contact },
    ];

    // 从文字中提取电话号码和邮箱，用于点击拨号 / 发邮件
    const phoneHref = `tel:${footer.phone.replace(/[^\d+]/g, "")}`;
    const emailHref = `mailto:${footer.email.split(" ")[0]}`;

    return (
        <footer className="bg-charcoal text-paper">
            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.5fr]">
                {/* 第一栏：Logo + 介绍 */}
                <div>
                    <Link href={`${home}/`} aria-label="Tout en Bois" className="inline-block">
                        <Logo variant="dark" />
                    </Link>
                    <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/60">
                        {footer.tagline}
                    </p>
                </div>

                {/* 第二栏：导航 */}
                <div>
                    <h3 className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-wood-light">
                        {footer.navTitle}
                    </h3>
                    <ul className="mt-6 space-y-3">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-sm text-paper/70 transition-colors hover:text-wood-light"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 第三栏：联系方式 */}
                <div>
                    <h3 className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-wood-light">
                        {footer.contactTitle}
                    </h3>
                    <ul className="mt-6 space-y-4 text-sm text-paper/70">
                        <li className="flex items-start gap-3">
                            <MapPin size={18} className="mt-0.5 shrink-0 text-wood-light" />
                            <span>{footer.address}</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Phone size={18} className="mt-0.5 shrink-0 text-wood-light" />
                            <a href={phoneHref} className="transition-colors hover:text-wood-light">
                                {footer.phone}
                            </a>
                        </li>
                        <li className="flex items-start gap-3">
                            <Mail size={18} className="mt-0.5 shrink-0 text-wood-light" />
                            <a href={emailHref} className="transition-colors hover:text-wood-light">
                                {footer.email}
                            </a>
                        </li>
                        <li className="flex items-start gap-3">
                            <Clock size={18} className="mt-0.5 shrink-0 text-wood-light" />
                            <span>{footer.hours}</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* 底部版权栏 */}
            <div className="border-t border-paper/10">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-paper/50 md:flex-row md:items-center md:justify-between">
                    <p>
                        © {year} Tout en Bois. {footer.rights}
                    </p>
                    <div className="flex gap-6">
                        <Link href={`${home}/legal/`} className="transition-colors hover:text-wood-light">
                            {footer.legal}
                        </Link>
                        <Link href={`${home}/privacy/`} className="transition-colors hover:text-wood-light">
                            {footer.privacy}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}