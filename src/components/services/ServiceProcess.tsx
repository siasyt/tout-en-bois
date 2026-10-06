"use client";

import { motion } from "motion/react";
import type { Dictionary } from "@/i18n/get-dictionary";

type ServiceProcessProps = {
    process: Dictionary["servicesPage"]["process"];
};

export default function ServiceProcess({ process }: ServiceProcessProps) {
    return (
        <section className="bg-sand py-24">
            <div className="mx-auto max-w-7xl px-6">
                {/* 区块标题 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    <p className="mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-wood">
                        <span className="h-px w-10 bg-wood" />
                        {process.eyebrow}
                    </p>
                    <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
                        {process.title}
                    </h2>
                </motion.div>

                {/* 四个步骤 */}
                <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                    {/* 大屏幕：连接各步骤的横线 */}
                    <span className="absolute left-8 right-8 top-8 hidden h-px bg-wood/30 lg:block" />

                    {process.steps.map((step, index) => (
                        <motion.li
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                            className="group relative"
                        >
                            {/* 编号方块 */}
                            <span className="relative flex h-16 w-16 items-center justify-center border border-wood/40 bg-paper font-display text-xl font-bold text-wood transition-colors duration-300 group-hover:border-wood group-hover:bg-wood group-hover:text-white">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            {/* 文字 */}
                            <h3 className="mt-6 font-display text-lg font-semibold text-ink">
                                {step.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                        </motion.li>
                    ))}
                </ol>
            </div>
        </section>
    );
}