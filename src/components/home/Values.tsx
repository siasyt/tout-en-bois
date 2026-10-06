"use client";

import { motion } from "motion/react";
import { Layers, Cog, Truck, Handshake } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";

// 图标按顺序对应：优质材料、精工制造、稳定交付、共创价值
const icons = [Layers, Cog, Truck, Handshake];

type ValuesProps = {
    values: Dictionary["values"];
};

export default function Values({ values }: ValuesProps) {
    return (
        <section className="border-b border-line bg-line">
            {/* gap-px + 背景色 = 格子之间的细分隔线 */}
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
                {values.items.map((item, index) => {
                    const Icon = icons[index] ?? Layers;

                    return (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                            className="group flex items-start gap-5 bg-paper px-6 py-10"
                        >
                            {/* 图标方块 */}
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-sand text-wood transition-colors duration-300 group-hover:bg-wood group-hover:text-white">
                                <Icon size={22} strokeWidth={1.75} />
                            </div>

                            {/* 标题和说明 */}
                            <div>
                                <h3 className="font-display text-lg font-semibold text-ink">
                                    {item.title}
                                </h3>
                                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                                    {item.text}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}