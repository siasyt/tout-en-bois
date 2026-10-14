import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import PageHeader from "@/components/PageHeader";
import AboutStory from "@/components/about/AboutStory";
import AboutPartners from "@/components/about/AboutPartners";
import AboutMission from "@/components/about/AboutMission";
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
        title: `${dict.nav.about} | Tout en Bois`,
        description: dict.aboutPage.intro,
    };
}

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);

    return (
        <main>
            <PageHeader
                eyebrow={dict.aboutPage.eyebrow}
                title={dict.aboutPage.title}
                intro={dict.aboutPage.intro}
            />

            <AboutStory story={dict.aboutPage.story} quote={dict.aboutPage.quote} />

            {/* 合作品牌与项目 */}
            <AboutPartners content={dict.aboutPage.partners} />

            <AboutMission
                problems={dict.aboutPage.problems}
                direction={dict.aboutPage.direction}
                closing={dict.aboutPage.closing}
            />

            {/* 底部联系引导（与首页共用） */}
            <CallToAction locale={locale as Locale} cta={dict.cta} />
        </main>
    );
}