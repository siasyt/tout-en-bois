import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Archivo, Inter, Noto_Sans_SC } from "next/font/google";
import { locales, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

// 标题字体
const archivo = Archivo({
    subsets: ["latin"],
    variable: "--font-archivo",
    display: "swap",
});

// 正文字体
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

// 中文字体（文件较大，不预加载，按需分片下载）
const notoSansSC = Noto_Sans_SC({
    variable: "--font-noto-sc",
    weight: ["400", "500", "700"],
    display: "swap",
    preload: false,
});

// 构建时生成 /fr 和 /zh 两个版本
export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

// 只允许 fr 和 zh，其他语言路径直接 404
export const dynamicParams = false;

// 页面标题和描述（浏览器标签页、搜索引擎显示）
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    if (locale === "zh") {
        return {
            title: "全木工艺 Tout en Bois | 板材供应与标准化加工中心",
            description: "巴黎大区板材供应、标准化加工与定制木作补充服务。",
        };
    }

    return {
        title: "Tout en Bois | Fourniture et usinage de panneaux",
        description:
            "Centre de fourniture et d'usinage standardisé de panneaux en Île-de-France.",
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!isLocale(locale)) {
        notFound();
    }

    const dict = await getDictionary(locale);

    return (
        <html
            lang={locale}
            data-scroll-behavior="smooth"
            className={`${archivo.variable} ${inter.variable} ${notoSansSC.variable}`}
        >
            <body className="antialiased">
                <Header locale={locale} nav={dict.nav} />
                {children}
                <Footer locale={locale} nav={dict.nav} footer={dict.footer} />
            </body>
        </html>
    );
}