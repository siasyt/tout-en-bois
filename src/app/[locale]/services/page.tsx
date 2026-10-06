import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import PageHeader from "@/components/PageHeader";
import ServiceDetails from "@/components/services/ServiceDetails";
import ServiceProcess from "@/components/services/ServiceProcess";
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
        title: `${dict.nav.services} | Tout en Bois`,
        description: dict.servicesPage.intro,
    };
}

export default async function ServicesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);

    return (
        <main>
            <PageHeader
                eyebrow={dict.servicesPage.eyebrow}
                title={dict.servicesPage.title}
                intro={dict.servicesPage.intro}
            />

            <ServiceDetails items={dict.servicesPage.items} />

            <ServiceProcess process={dict.servicesPage.process} />

            {/* 底部联系引导（与首页共用） */}
            <CallToAction locale={locale as Locale} cta={dict.cta} />
        </main>
    );
}