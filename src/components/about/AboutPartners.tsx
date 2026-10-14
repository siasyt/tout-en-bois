"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { partners, type Partner } from "@/data/partners";
import type { Dictionary } from "@/i18n/get-dictionary";

type AboutPartnersProps = {
    content: Dictionary["aboutPage"]["partners"];
};

// 左右两端渐隐
const edgeFade = {
    maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
    WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
};

export default function AboutPartners({ content }: AboutPartnersProps) {
    // 分成两行，上下两行反向滚动
    const half = Math.ceil(partners.length / 2);
    const rows = [partners.slice(0, half), partners.slice(half)];

    return (
        <section className="overflow-hidden bg-paper py-24">
            {/* 区块标题（居中） */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto max-w-3xl px-6 text-center"
            >
                <p className="flex items-center justify-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-wood">
                    <span className="h-px w-10 bg-wood" />
                    {content.eyebrow}
                    <span className="h-px w-10 bg-wood" />
                </p>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
                    {content.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted">{content.text}</p>
            </motion.div>

            {/* 两行滚动 Logo 墙 */}
            <div className="mt-14 space-y-6" style={edgeFade}>
                {rows.map((row, index) => (
                    <LogoRow key={index} items={row} reverse={index === 1} />
                ))}
            </div>
        </section>
    );
}

// 单行滚动：列表复制一份首尾相接，形成无缝循环
function LogoRow({ items, reverse }: { items: Partner[]; reverse: boolean }) {
    return (
        <div className="marquee">
            <ul className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}>
                {[...items, ...items].map((partner, index) => (
                    <li
                        key={`${partner.logo}-${index}`}
                        // 第二份只是为了循环，对读屏软件隐藏
                        aria-hidden={index >= items.length}
                        className="group mr-6 flex h-24 w-48 shrink-0 items-center justify-center border border-line bg-paper px-6 transition-colors duration-300 hover:border-wood"
                    >
                        <Image
                            src={partner.logo}
                            alt={partner.name}
                            width={160}
                            height={64}
                            className="h-12 w-auto max-w-[140px] object-contain opacity-60 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}