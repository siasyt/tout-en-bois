"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";

// 图片按顺序对应三项服务（与首页共用）
const images = [
    "/images/service-panels.jpg",
    "/images/service-machining.jpg",
    "/images/service-furniture.jpg",
];

type ServiceDetailsProps = {
    items: Dictionary["servicesPage"]["items"];
};

export default function ServiceDetails({ items }: ServiceDetailsProps) {
    return (
        <section className="bg-paper py-24">
            <div className="mx-auto max-w-7xl space-y-24 px-6 md:space-y-32">
                {items.map((item, index) => {
                    // 偶数项图左文右，奇数项图右文左
                    const reversed = index % 2 === 1;

                    return (
                        <div
                            key={item.number}
                            id={`service-${item.number}`}
                            className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-20"
                        >
                            {/* 图片 */}
                            <motion.div
                                initial={{ opacity: 0, x: reversed ? 30 : -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className={`relative aspect-[4/3] overflow-hidden bg-sand ${reversed ? "lg:order-2" : ""
                                    }`}
                            >
                                <Image
                                    src={images[index]}
                                    alt={item.title}
                                    fill
                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                    className="object-cover"
                                />
                                {/* 大号编号压在图片角落 */}
                                <span className="absolute bottom-0 left-0 bg-wood px-5 py-3 font-display text-2xl font-bold text-white">
                                    {item.number}
                                </span>
                            </motion.div>

                            {/* 文字 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                            >
                                <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
                                    {item.title}
                                </h2>
                                <p className="mt-5 text-lg leading-relaxed text-muted">{item.text}</p>

                                {/* 细项列表（两列） */}
                                <ul className="mt-8 grid gap-x-8 gap-y-3 border-t border-line pt-8 sm:grid-cols-2">
                                    {item.details.map((detail) => (
                                        <li key={detail} className="flex items-center gap-3 text-base text-ink">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-sand text-wood">
                                                <Check size={14} strokeWidth={2.5} />
                                            </span>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}