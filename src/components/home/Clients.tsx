"use client";

import { motion } from "motion/react";
import { HardHat, PencilRuler, Presentation, Store, Warehouse } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";

// 图标按顺序对应：装修公司、设计师、展陈与活动公司、品牌落地服务商、建材商与同行
const icons = [HardHat, PencilRuler, Presentation, Store, Warehouse];

type ClientsProps = {
  clients: Dictionary["clients"];
};

export default function Clients({ clients }: ClientsProps) {
  return (
    <section className="bg-sand py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* 区块标题（居中） */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-wood"
        >
          <span className="h-px w-10 bg-wood" />
          {clients.eyebrow}
          <span className="h-px w-10 bg-wood" />
        </motion.p>

        {/* 五个客户类型 */}
        <div className="mt-14 grid grid-cols-2 gap-y-10 md:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-line">
          {clients.items.map((item, index) => {
            const Icon = icons[index] ?? Store;

            return (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="group flex flex-col items-center px-4 text-center"
              >
                <Icon
                  size={40}
                  strokeWidth={1.25}
                  className="text-ink transition-colors duration-300 group-hover:text-wood"
                />
                <span className="mt-4 text-sm font-medium leading-snug text-ink">
                  {item}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* 底部说明 */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-14 max-w-2xl border-t border-line pt-8 text-center text-base text-muted"
        >
          {clients.note}
        </motion.p>
      </div>
    </section>
  );
}