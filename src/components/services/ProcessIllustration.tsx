"use client";

import { motion } from "motion/react";

// 合作流程的四个动态插画，按步骤顺序选择
export default function ProcessIllustration({ index }: { index: number }) {
    if (index === 0) return <Request />;
    if (index === 1) return <Quote />;
    if (index === 2) return <Fabrication />;
    return <Delivery />;
}

// 01 提交需求：图纸线条逐行画出，纸飞机飞出
function Request() {
    const lines = [
        { y: 30, x2: 94 },
        { y: 42, x2: 94 },
        { y: 54, x2: 94 },
        { y: 66, x2: 78 },
    ];

    return (
        <svg viewBox="0 0 160 100" className="h-full w-auto" aria-hidden="true">
            {/* 图纸 */}
            <rect x={40} y={12} width={64} height={76} className="fill-paper stroke-wood/40" strokeWidth={1.5} />

            {/* 逐行画出的线条 */}
            {lines.map((line, i) => (
                <motion.line
                    key={line.y}
                    x1={50}
                    y1={line.y}
                    x2={line.x2}
                    y2={line.y}
                    className="stroke-wood"
                    strokeWidth={2}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 1, 0] }}
                    transition={{
                        duration: 3,
                        times: [0, 0.3, 0.9, 1],
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* 纸飞机 */}
            <motion.path
                d="M108 44 L124 50 L108 56 L111 50 Z"
                className="fill-wood"
                initial={{ opacity: 0 }}
                animate={{ x: [0, 28], y: [0, -18], opacity: [0, 1, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.2, ease: "easeOut" }}
            />
        </svg>
    );
}

// 02 报价确认：明细逐行出现，确认勾弹出
function Quote() {
    const rows = [28, 40, 52];

    return (
        <svg viewBox="0 0 160 100" className="h-full w-auto" aria-hidden="true">
            {/* 报价单 */}
            <rect x={40} y={12} width={72} height={76} className="fill-paper stroke-wood/40" strokeWidth={1.5} />

            {/* 明细行：左边项目，右边金额 */}
            {rows.map((y, i) => (
                <motion.g
                    key={y}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{
                        duration: 3.2,
                        times: [0, 0.15, 0.9, 1],
                        repeat: Infinity,
                        delay: i * 0.25,
                    }}
                >
                    <line x1={50} y1={y} x2={78} y2={y} className="stroke-ink/30" strokeWidth={2} strokeLinecap="round" />
                    <line x1={90} y1={y} x2={102} y2={y} className="stroke-ink/30" strokeWidth={2} strokeLinecap="round" />
                </motion.g>
            ))}

            {/* 分隔线 + 合计 */}
            <line x1={50} y1={63} x2={102} y2={63} className="stroke-wood/40" strokeWidth={1} />
            <line x1={80} y1={73} x2={102} y2={73} className="stroke-wood" strokeWidth={3} strokeLinecap="round" />

            {/* 确认勾：圆形弹出 + 勾画出 */}
            <motion.g
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 0, 1.15, 1, 1, 0] }}
                transition={{
                    duration: 3.2,
                    times: [0, 0.35, 0.45, 0.5, 0.9, 1],
                    repeat: Infinity,
                }}
            >
                <circle cx={116} cy={76} r={12} className="fill-wood" />
                <motion.path
                    d="M110 76 L114 80 L122 72"
                    className="fill-none stroke-white"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 0, 1, 1, 0] }}
                    transition={{
                        duration: 3.2,
                        times: [0, 0.45, 0.6, 0.9, 1],
                        repeat: Infinity,
                    }}
                />
            </motion.g>
        </svg>
    );
}

// 03 工厂加工：刀头往下切过，板材分开再合拢
function Fabrication() {
    const timing = { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const };

    return (
        <svg viewBox="0 0 160 100" className="h-full w-auto" aria-hidden="true">
            {/* 左半块板材 */}
            <motion.g animate={{ x: [0, 0, -8, -8, 0] }} transition={{ ...timing, times: [0, 0.35, 0.5, 0.85, 1] }}>
                <rect x={30} y={40} width={50} height={24} className="fill-wood-light" />
                <rect x={30} y={64} width={50} height={4} className="fill-wood" />
            </motion.g>

            {/* 右半块板材 */}
            <motion.g animate={{ x: [0, 0, 8, 8, 0] }} transition={{ ...timing, times: [0, 0.35, 0.5, 0.85, 1] }}>
                <rect x={80} y={40} width={50} height={24} className="fill-wood-light" />
                <rect x={80} y={64} width={50} height={4} className="fill-wood" />
            </motion.g>

            {/* 切割线 */}
            <motion.line
                x1={80}
                y1={40}
                x2={80}
                y2={68}
                className="stroke-wood-dark"
                strokeWidth={1.5}
                strokeDasharray="3 3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{ ...timing, times: [0, 0.35, 0.85, 1] }}
            />

            {/* 刀头：从上往下移动并旋转 */}
            <motion.g animate={{ y: [0, 46, 46, 0] }} transition={{ ...timing, times: [0, 0.35, 0.85, 1] }}>
                <motion.g
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                >
                    <circle cx={80} cy={26} r={9} className="fill-paper stroke-ink/70" strokeWidth={2} />
                    <line x1={71} y1={26} x2={89} y2={26} className="stroke-ink/70" strokeWidth={2} />
                    <line x1={80} y1={17} x2={80} y2={35} className="stroke-ink/70" strokeWidth={2} />
                </motion.g>
            </motion.g>
        </svg>
    );
}

// 04 自提或配送：货车行驶，车轮转动，路面后退
function Delivery() {
    const wheels: [number, number][] = [
        [56, 74],
        [106, 74],
    ];

    return (
        <svg viewBox="0 0 160 100" className="h-full w-auto" aria-hidden="true">
            {/* 路面：虚线持续后退 */}
            <motion.line
                x1={8}
                y1={84}
                x2={152}
                y2={84}
                className="stroke-ink/25"
                strokeWidth={2}
                strokeDasharray="10 8"
                animate={{ strokeDashoffset: [0, 18] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
            />

            {/* 速度线 */}
            {[48, 56, 64].map((y, i) => (
                <motion.line
                    key={y}
                    x1={24}
                    y1={y}
                    x2={34}
                    y2={y}
                    className="stroke-wood/60"
                    strokeWidth={2}
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={{ x: [0, -10], opacity: [0, 1, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2, ease: "easeOut" }}
                />
            ))}

            {/* 车身：轻微上下颠簸 */}
            <motion.g animate={{ y: [0, -1.5, 0] }} transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}>
                {/* 货厢 */}
                <rect x={40} y={40} width={56} height={32} className="fill-wood" />
                {/* 车头 */}
                <path d="M96 50 H112 L120 60 V72 H96 Z" className="fill-ink/70" />
                {/* 车窗 */}
                <path d="M100 53 H110 L115 60 H100 Z" className="fill-paper" />
            </motion.g>

            {/* 车轮：持续转动 */}
            {wheels.map(([cx, cy]) => (
                <g key={cx}>
                    <circle cx={cx} cy={cy} r={8} className="fill-ink/80" />
                    <motion.g
                        style={{ transformBox: "fill-box", transformOrigin: "center" }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                    >
                        <circle cx={cx} cy={cy} r={3} className="fill-paper" />
                        <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} className="stroke-paper" strokeWidth={1.5} />
                    </motion.g>
                </g>
            ))}
        </svg>
    );
}