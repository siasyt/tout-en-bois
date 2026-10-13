"use client";

import { motion, MotionConfig } from "motion/react";
import ProcessIllustration from "./ProcessIllustration";
import type { Dictionary } from "@/i18n/get-dictionary";

type ServiceProcessProps = {
    process: Dictionary["servicesPage"]["process"];
};

export default function ServiceProcess({ process }: ServiceProcessProps) {
    return (
        // reducedMotion="user"：访客系统开启"减少动态效果"时自动停止动画
        <MotionConfig reducedMotion="user">
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
                        {/* 大屏幕：动态连接线 */}
                        <span className="absolute left-8 right-8 top-8 hidden h-px bg-wood/20 lg:block">
                            {/* 进入视口时从左到右填充 */}
                            <motion.span
                                className="absolute inset-0 origin-left bg-wood/60"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 1.6, ease: "easeInOut" }}
                            />
                            {/* 沿线循环流动的小圆点 */}
                            <motion.span
                                className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-wood"
                                animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1.6 }}
                            />
                        </span>

                        {process.steps.map((step, index) => (
                            <motion.li
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                                className="group relative flex flex-col"
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

                                {/* 动态插画（mt-auto 让四个插画底部对齐） */}
                                <div className="mt-auto pt-6">
                                    <div className="flex h-28 items-center justify-center bg-paper/70">
                                        <ProcessIllustration index={index} />
                                    </div>
                                </div>
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </section>
        </MotionConfig>
    );
}