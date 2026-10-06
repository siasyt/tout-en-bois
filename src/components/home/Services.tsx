"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

// 图片按顺序对应三项服务
const images = [
  "/images/service-panels.jpg",
  "/images/service-machining.jpg",
  "/images/service-furniture.jpg",
];

type ServicesProps = {
  locale: Locale;
  services: Dictionary["services"];
};

export default function Services({ locale, services }: ServicesProps) {
  return (
    <section className="bg-paper py-24">
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
            {services.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
            {services.title}
          </h2>
        </motion.div>

        {/* 三张服务卡片 */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {services.items.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            >
              <Link href={`/${locale}/services/`} className="group block">
                {/* 图片（缺图时显示浅沙色） */}
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image
                    src={images[index]}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* 文字 */}
                <div className="mt-6">
                  <span className="font-display text-sm font-semibold text-wood">
                    {item.number}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-semibold text-ink transition-colors group-hover:text-wood">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.text}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink">
                    {services.more}
                    <ArrowRight
                      size={16}
                      className="text-wood transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}