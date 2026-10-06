import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import PageHeader from "@/components/PageHeader";
import MaterialGrid from "@/components/materials/MaterialGrid";
import CallToAction from "@/components/home/CallToAction";

// 浏览器标签页标题
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);

    return {
        title: `${dict.nav.materials} | Tout en Bois`,
        description: dict.materialsPage.intro,
    };
}

export default async function MaterialsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);

    return (
        <main>
            <PageHeader
                eyebrow={dict.materialsPage.eyebrow}
                title={dict.materialsPage.title}
                intro={dict.materialsPage.intro}
            />

            <MaterialGrid materials={dict.materialsPage} />

            {/* 底部联系引导（与首页共用） */}
            <CallToAction locale={locale as Locale} cta={dict.cta} />
        </main>
    );
}