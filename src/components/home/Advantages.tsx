"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CircleCheck } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";

type AdvantagesProps = {
  advantages: Dictionary["advantages"];
};

export default function Advantages({ advantages }: AdvantagesProps) {
  return (
    <section className="bg-charcoal py-24 text-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        {/* 左侧图片 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative aspect-[4/5] overflow-hidden bg-ink"
        >
          <Image
            src="/images/advantages.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          {/* 左下角橡木色装饰块 */}
          <div className="absolute bottom-0 left-0 h-2 w-1/3 bg-wood" />
        </motion.div>

        {/* 右侧文字 */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-wood-light">
              <span className="h-px w-10 bg-wood-light" />
              {advantages.eyebrow}
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
              {advantages.title}
            </h2>
          </motion.div>

          {/* 优势列表 */}
          <ul className="mt-10 border-t border-paper/15">
            {advantages.items.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="flex items-start gap-4 border-b border-paper/15 py-5"
              >
                <CircleCheck
                  size={22}
                  strokeWidth={1.75}
                  className="mt-0.5 shrink-0 text-wood-light"
                />
                <span className="text-base leading-relaxed text-paper/85">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}