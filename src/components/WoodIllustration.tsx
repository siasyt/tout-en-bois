// 木材插画：一摞堆叠的板材（纯代码绘制，颜色随品牌配色）

type Slab = {
    x: number; // 水平偏移，让板材错落摆放
    y: number; // 板材正面的上沿位置
};

const WIDTH = 220; // 板材正面宽度
const THICK = 14;  // 板材厚度
const DX = 60;     // 透视深度（水平）
const DY = -30;    // 透视深度（垂直）

// 从下往上依次绘制四块板材
const slabs: Slab[] = [
    { x: 40, y: 160 },
    { x: 50, y: 146 },
    { x: 36, y: 132 },
    { x: 54, y: 118 },
];

// 把坐标数组转成 SVG polygon 需要的格式
function pts(points: [number, number][]) {
    return points.map(([x, y]) => `${x},${y}`).join(" ");
}

export default function WoodIllustration({ className = "" }: { className?: string }) {
    const top = slabs[slabs.length - 1];

    return (
        <svg viewBox="0 0 360 200" className={className} aria-hidden="true">
            {/* 地面阴影 */}
            <ellipse cx="180" cy="180" rx="150" ry="8" className="fill-ink/10" />

            {slabs.map(({ x, y }, index) => (
                <g key={index}>
                    {/* 顶面 */}
                    <polygon
                        points={pts([
                            [x, y],
                            [x + WIDTH, y],
                            [x + WIDTH + DX, y + DY],
                            [x + DX, y + DY],
                        ])}
                        className="fill-wood-light"
                    />
                    {/* 侧面 */}
                    <polygon
                        points={pts([
                            [x + WIDTH, y],
                            [x + WIDTH + DX, y + DY],
                            [x + WIDTH + DX, y + DY + THICK],
                            [x + WIDTH, y + THICK],
                        ])}
                        className="fill-wood-dark"
                    />
                    {/* 正面 */}
                    <rect x={x} y={y} width={WIDTH} height={THICK} className="fill-wood" />
                    {/* 正面的板材分层线 */}
                    <line
                        x1={x}
                        y1={y + THICK / 2}
                        x2={x + WIDTH}
                        y2={y + THICK / 2}
                        className="stroke-wood-dark/40"
                        strokeWidth="1"
                    />
                </g>
            ))}

            {/* 最上面一块板材顶面的木纹 */}
            {[0.25, 0.5, 0.75].map((t) => (
                <path
                    key={t}
                    d={`M${top.x + DX * t + 15} ${top.y + DY * t}
              q ${WIDTH / 4} ${-3} ${WIDTH / 2} 0
              t ${WIDTH / 2 - 30} 0`}
                    className="fill-none stroke-wood/50"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            ))}
        </svg>
    );
}