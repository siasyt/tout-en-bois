"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { consumeLanguageSwitch } from "@/lib/animation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type HeroProps = {
  locale: Locale;
  hero: Dictionary["hero"];
};

export default function Hero({ locale, hero }: HeroProps) {
  // 刚切换过语言时，动画瞬间完成，内容直接显示
  const [instant] = useState(consumeLanguageSwitch);

  return (
    <section className="relative flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-charcoal">
      {/* 背景图 */}
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* 左深右浅的渐变遮罩，保证文字清晰 */}
      <div className="absolute inset-0 bg-linear-to-r from-charcoal/90 via-charcoal/60 to-charcoal/20" />

      {/* 文字内容 */}
      <div className="relative mx-auto w-full max-w-7xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={instant ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* 小标题 */}
          <p className="mb-6 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-wood-light">
            <span className="h-px w-10 bg-wood-light" />
            {hero.eyebrow}
          </p>

          {/* 主标题 */}
          <h1 className="font-display text-4xl font-bold leading-tight text-paper md:text-6xl">
            {hero.title}
          </h1>

          {/* 副标题 */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/80">
            {hero.subtitle}
          </p>

          {/* 按钮 */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={`/${locale}/contact/`}
              className="group inline-flex items-center gap-2 bg-wood px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-wood-dark"
            >
              {hero.ctaPrimary}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href={`/${locale}/services/`}
              className="inline-flex items-center border border-paper/40 px-7 py-4 text-sm font-medium text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
            >
              {hero.ctaSecondary}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}