// Tout en Bois 标志（按品牌 Logo 重绘的扁平版，拿到原始文件后可替换）
// 颜色跟随文字颜色：外层加 text-wood 等类名即可改色

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className = "" }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      {/* 外框 */}
      <path
        fillRule="evenodd"
        d="M0 0H100V100H0Z M10 10V90H90V10Z"
      />
      {/* T 字横 */}
      <rect x="14" y="14" width="72" height="14" />
      {/* T 字竖 */}
      <rect x="43" y="28" width="14" height="62" />
      {/* 右下三角 */}
      <path d="M61 86H86V61Z" />
    </svg>
  );
}

type LogoProps = {
  // light：用于浅色背景；dark：用于深色背景（如页脚）
  variant?: "light" | "dark";
};

export default function Logo({ variant = "light" }: LogoProps) {
  const textColor = variant === "light" ? "text-ink" : "text-paper";
  const markColor = variant === "light" ? "text-wood" : "text-wood-light";

  return (
    <span className="flex items-center gap-3">
      <LogoMark className={`h-10 w-10 ${markColor}`} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-bold tracking-wide ${textColor}`}>
          TOUT <span className={markColor}>EN</span> BOIS
        </span>
        <span className={`mt-1 text-xs tracking-[0.4em] ${textColor} opacity-70`}>
          全木工艺
        </span>
      </span>
    </span>
  );
}