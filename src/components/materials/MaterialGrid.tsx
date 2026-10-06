"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Info } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";

// 图片按顺序对应六类板材
const images = [
    "/images/material-particle.jpg",
    "/images/material-mdf.jpg",
    "/images/material-plywood.jpg",
    "/images/material-osb.jpg",
    "/images/material-melamine.jpg",
    "/images/material-edging.jpg",
];

type MaterialGridProps = {
    materials: Dictionary["materialsPage"];
};

export default function MaterialGrid({ materials }: MaterialGridProps) {
    const { labels, items, note } = materials;

    return (
        <section className="bg-paper py-24">
            <div className="mx-auto max-w-7xl px-6">
                {/* 板材卡片 */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item, index) => (
                        <motion.article
                            key={item.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: (index % 3) * 0.12, ease: "easeOut" }}
                            className="group flex flex-col border border-line bg-paper transition-colors duration-300 hover:border-wood"
                        >
                            {/* 图片（缺图时显示浅沙色） */}
                            <div className="relative aspect-[3/2] overflow-hidden bg-sand">
                                <Image
                                    src={images[index]}
                                    alt={item.name}
                                    fill
                                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            <div className="flex flex-1 flex-col p-6">
                                {/* 名称和简介 */}
                                <h2 className="font-display text-xl font-semibold text-ink">{item.name}</h2>
                                <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>

                                {/* 参数：厚度、规格 */}
                                <dl className="mt-6 border-t border-line text-sm">
                                    <div className="flex justify-between gap-4 border-b border-line py-3">
                                        <dt className="text-muted">{labels.thickness}</dt>
                                        <dd className="text-right font-medium text-ink">{item.thickness}</dd>
                                    </div>
                                    <div className="flex justify-between gap-4 border-b border-line py-3">
                                        <dt className="text-muted">{labels.format}</dt>
                                        <dd className="text-right font-medium text-ink">{item.format}</dd>
                                    </div>
                                </dl>

                                {/* 常见用途标签（mt-auto 让标签贴底，卡片底部对齐） */}
                                <div className="mt-auto pt-6">
                                    <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-wood">
                                        {labels.uses}
                                    </p>
                                    <ul className="flex flex-wrap gap-2">
                                        {item.uses.map((use) => (
                                            <li key={use} className="bg-sand px-3 py-1.5 text-xs text-ink">
                                                {use}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* 参考说明 */}
                <p className="mt-12 flex items-start gap-3 border-l-2 border-wood bg-sand px-5 py-4 text-sm leading-relaxed text-muted">
                    <Info size={18} className="mt-0.5 shrink-0 text-wood" />
                    {note}
                </p>
            </div>
        </section>
    );
}