"use client";

import { motion } from "motion/react";

// 发展方向的三个动态插画，按步骤顺序选择
export default function DirectionIllustration({ index }: { index: number }) {
    if (index === 0) return <Network />;
    if (index === 1) return <Machining />;
    return <Replicate />;
}

// 01：中心供应商连向四周客户，小圆点持续流向客户
function Network() {
    const nodes: [number, number][] = [
        [24, 22],
        [136, 22],
        [24, 78],
        [136, 78],
    ];

    return (
        <svg viewBox="0 0 160 100" className="h-full w-auto" aria-hidden="true">
            {/* 连线：进入视口时依次画出 */}
            {nodes.map(([x, y], i) => (
                <motion.line
                    key={`line-${i}`}
                    x1={80}
                    y1={50}
                    x2={x}
                    y2={y}
                    className="stroke-wood-light"
                    strokeWidth={1.5}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                />
            ))}

            {/* 流动的小圆点 */}
            {nodes.map(([x, y], i) => (
                <motion.circle
                    key={`dot-${i}`}
                    cx={80}
                    cy={50}
                    r={2.5}
                    className="fill-wood"
                    initial={{ opacity: 0 }}
                    animate={{ cx: [80, x], cy: [50, y], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                />
            ))}

            {/* 四周的客户 */}
            {nodes.map(([x, y], i) => (
                <rect
                    key={`node-${i}`}
                    x={x - 7}
                    y={y - 7}
                    width={14}
                    height={14}
                    className="fill-paper stroke-wood"
                    strokeWidth={1.5}
                />
            ))}

            {/* 中心：全木工艺 */}
            <rect x={68} y={38} width={24} height={24} className="fill-wood" />
        </svg>
    );
}

// 02：刀头在板材上方左右往返并旋转，切割线持续流动
function Machining() {
    return (
        <svg viewBox="0 0 160 100" className="h-full w-auto" aria-hidden="true">
            {/* 设备横梁 */}
            <rect x={14} y={14} width={132} height={6} className="fill-ink/15" />

            {/* 板材 */}
            <rect x={14} y={66} width={132} height={14} className="fill-wood-light" />
            <rect x={14} y={80} width={132} height={4} className="fill-wood" />

            {/* 流动的切割线 */}
            <motion.line
                x1={22}
                y1={66}
                x2={138}
                y2={66}
                className="stroke-wood-dark"
                strokeWidth={2}
                strokeDasharray="6 4"
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />

            {/* 主轴 + 刀头：左右往返 */}
            <motion.g
                animate={{ x: [-45, 45] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            >
                <rect x={74} y={20} width={12} height={26} className="fill-ink/70" />

                {/* 刀头：持续旋转 */}
                <motion.g
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                >
                    <circle cx={80} cy={56} r={10} className="fill-paper stroke-wood" strokeWidth={2} />
                    <line x1={70} y1={56} x2={90} y2={56} className="stroke-wood" strokeWidth={2} />
                    <line x1={80} y1={46} x2={80} y2={66} className="stroke-wood" strokeWidth={2} />
                </motion.g>
            </motion.g>
        </svg>
    );
}

// 03：三摞相同的板材依次出现、停留、消失，循环复制
function Replicate() {
    const stacks = [28, 80, 132];

    return (
        <svg viewBox="0 0 160 100" className="h-full w-auto" aria-hidden="true">
            {/* 地面线 */}
            <line x1={8} y1={84} x2={152} y2={84} className="stroke-ink/15" strokeWidth={1.5} />

            {stacks.map((cx, i) => (
                <motion.g
                    key={cx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0], y: [12, 0, 0, 0] }}
                    transition={{
                        duration: 3.6,
                        times: [0, 0.2, 0.85, 1],
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeOut",
                    }}
                >
                    {[0, 1, 2].map((j) => (
                        <rect
                            key={j}
                            x={cx - 20}
                            y={70 - j * 14}
                            width={40}
                            height={10}
                            className={j % 2 === 0 ? "fill-wood" : "fill-wood-light"}
                        />
                    ))}
                </motion.g>
            ))}
        </svg>
    );
}