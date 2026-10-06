"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Quote } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";

type AboutStoryProps = {
    story: Dictionary["aboutPage"]["story"];
    quote: string;
};

export default function AboutStory({ story, quote }: AboutStoryProps) {
    return (
        <>
            {/* 品牌故事：图左文右 */}
            <section className="bg-paper py-24">
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
                    {/* 图片 */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative aspect-[4/5] overflow-hidden bg-sand"
                    >
                        <Image
                            src="/images/about-story.jpg"
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 45vw, 100vw"
                            className="object-cover"
                        />
                        {/* 右下角橡木色装饰条 */}
                        <div className="absolute bottom-0 right-0 h-2 w-1/3 bg-wood" />
                    </motion.div>

                    {/* 文字 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                    >
                        <p className="mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-wood">
                            <span className="h-px w-10 bg-wood" />
                            {story.eyebrow}
                        </p>
                        <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
                            {story.title}
                        </h2>
                        <div className="mt-8 space-y-5">
                            {story.paragraphs.map((paragraph) => (
                                <p key={paragraph} className="text-lg leading-relaxed text-muted">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 定位语：大字引言 */}
            <section className="bg-sand py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mx-auto max-w-4xl px-6 text-center"
                >
                    <Quote size={40} strokeWidth={1.25} className="mx-auto text-wood" />
                    <p className="mt-8 font-display text-2xl font-semibold leading-snug text-ink md:text-3xl">
                        {quote}
                    </p>
                    <span className="mx-auto mt-8 block h-0.5 w-16 bg-wood" />
                </motion.div>
            </section>
        </>
    );
}