import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import PageHeader from "@/components/PageHeader";
import LegalContent from "@/components/legal/LegalContent";

// 浏览器标签页标题
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);

    return {
        title: `${dict.legalPage.title} | Tout en Bois`,
    };
}

export default async function LegalPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);
    const page = dict.legalPage;

    return (
        <main>
            <PageHeader eyebrow={page.eyebrow} title={page.title} />
            <LegalContent updated={page.updated} notice={page.notice} sections={page.sections} />
        </main>
    );
}