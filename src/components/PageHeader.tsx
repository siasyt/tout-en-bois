"use client";

import { motion } from "motion/react";
import { LogoMark } from "./Logo";

type PageHeaderProps = {
    eyebrow: string;
    title: string;
    intro?: string;
};

// 内页顶部横幅：服务、板材、关于我们、联系等页面通用
export default function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
    return (
        <section className="relative overflow-hidden bg-charcoal text-paper">
            {/* 右侧淡化的 Logo 图形作为装饰 */}
            <LogoMark className="pointer-events-none absolute -right-20 top-1/2 h-96 w-96 -translate-y-1/2 text-white/5" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative mx-auto max-w-7xl px-6 py-20 md:py-28"
            >
                <p className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-wood-light">
                    <span className="h-px w-10 bg-wood-light" />
                    {eyebrow}
                </p>
                <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl">
                    {title}
                </h1>
                {intro && (
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/75">{intro}</p>
                )}
            </motion.div>
        </section>
    );
}