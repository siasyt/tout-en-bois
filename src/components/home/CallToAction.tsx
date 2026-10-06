"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type CallToActionProps = {
    locale: Locale;
    cta: Dictionary["cta"];
};

export default function CallToAction({ locale, cta }: CallToActionProps) {
    return (
        <section className="relative overflow-hidden bg-wood">
            {/* 右侧淡化的 Logo 图形作为装饰 */}
            <LogoMark className="pointer-events-none absolute -right-16 top-1/2 h-80 w-80 -translate-y-1/2 text-white/10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-20 md:flex-row md:items-center"
            >
                {/* 文字 */}
                <div className="max-w-2xl">
                    <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">
                        {cta.title}
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-white/85">{cta.text}</p>
                </div>

                {/* 按钮 */}
                <Link
                    href={`/${locale}/contact/`}
                    className="group inline-flex shrink-0 items-center gap-2 bg-charcoal px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-ink"
                >
                    {cta.button}
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
            </motion.div>
        </section>
    );
}