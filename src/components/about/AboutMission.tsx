"use client";

import { motion, MotionConfig } from "motion/react";
import { Gauge, Timer, Ruler, ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import DirectionIllustration from "./DirectionIllustration";
import type { Dictionary } from "@/i18n/get-dictionary";

// 图标按顺序对应：效率、交付、标准化
const problemIcons = [Gauge, Timer, Ruler];

type AboutMissionProps = {
    problems: Dictionary["aboutPage"]["problems"];
    direction: Dictionary["aboutPage"]["direction"];
    closing: Dictionary["aboutPage"]["closing"];
};

export default function AboutMission({ problems, direction, closing }: AboutMissionProps) {
    return (
        // reducedMotion="user"：访客系统开启"减少动态效果"时自动停止动画
        <MotionConfig reducedMotion="user">
            {/* 我们解决的问题 */}
            <section className="bg-paper py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="max-w-3xl"
                    >
                        <p className="mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-wood">
                            <span className="h-px w-10 bg-wood" />
                            {problems.eyebrow}
                        </p>
                        <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
                            {problems.title}
                        </h2>
                    </motion.div>

                    <div className="mt-14 grid gap-8 md:grid-cols-3">
                        {problems.items.map((item, index) => {
                            const Icon = problemIcons[index] ?? Gauge;

                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                                    className="group relative border border-line bg-paper p-8 transition-colors duration-300 hover:border-wood"
                                >
                                    {/* 悬停时顶部出现的橡木色线条 */}
                                    <span className="absolute left-0 top-0 h-1 w-0 bg-wood transition-all duration-500 group-hover:w-full" />

                                    <div className="flex h-14 w-14 items-center justify-center bg-sand text-wood transition-colors duration-300 group-hover:bg-wood group-hover:text-white">
                                        <Icon size={26} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="mt-6 font-display text-xl font-semibold text-ink">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-base leading-relaxed text-muted">{item.text}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 发展方向 */}
            <section className="bg-sand py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="max-w-3xl"
                    >
                        <p className="mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-wood">
                            <span className="h-px w-10 bg-wood" />
                            {direction.eyebrow}
                        </p>
                        <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
                            {direction.title}
                        </h2>
                    </motion.div>

                    <ol className="mt-14 grid gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
                        {direction.steps.map((step, index) => (
                            <Step
                                key={step.title}
                                index={index}
                                title={step.title}
                                text={step.text}
                                isLast={index === direction.steps.length - 1}
                            />
                        ))}
                    </ol>
                </div>
            </section>

            {/* 结尾 */}
            <section className="relative overflow-hidden bg-charcoal py-24 text-paper">
                <LogoMark className="pointer-events-none absolute -left-20 top-1/2 h-96 w-96 -translate-y-1/2 text-white/5" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative mx-auto max-w-4xl px-6 text-center"
                >
                    <p className="font-display text-2xl font-bold leading-snug md:text-4xl">
                        {closing.title}
                    </p>
                    <span className="mx-auto mt-10 block h-0.5 w-16 bg-wood-light" />
                    <p className="mt-8 text-lg text-wood-light">{closing.text}</p>
                </motion.div>
            </section>
        </MotionConfig>
    );
}

// 发展方向的单个步骤（大屏幕时后面跟一个律动的箭头）
function Step({
    index,
    title,
    text,
    isLast,
}: {
    index: number;
    title: string;
    text: string;
    isLast: boolean;
}) {
    return (
        <>
            <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
                className="bg-paper p-8"
            >
                {/* 动态插画 */}
                <div className="mb-6 flex h-28 items-center justify-center bg-sand/60">
                    <DirectionIllustration index={index} />
                </div>

                <span className="font-display text-4xl font-bold text-wood/30">
                    {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{text}</p>
            </motion.li>

            {/* 步骤之间的箭头：大屏幕横向律动，小屏幕隐藏 */}
            {!isLast && (
                <li aria-hidden="true" className="hidden items-center justify-center lg:flex">
                    <motion.span
                        animate={{ x: [0, 6, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowRight size={28} strokeWidth={1.5} className="text-wood" />
                    </motion.span>
                </li>
            )}
        </>
    );
}