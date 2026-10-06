import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import PageHeader from "@/components/PageHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import ContactMap from "@/components/contact/ContactMap";

// 浏览器标签页标题
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);

    return {
        title: `${dict.nav.contact} | Tout en Bois`,
        description: dict.contact.intro,
    };
}

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);

    return (
        <main>
            <PageHeader
                eyebrow={dict.contact.eyebrow}
                title={dict.contact.title}
                intro={dict.contact.intro}
            />

            <section className="bg-paper py-20">
                <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_1.4fr]">
                    {/* 左侧：联系信息 */}
                    <ContactInfo title={dict.contact.infoTitle} footer={dict.footer} />

                    {/* 右侧：表单 */}
                    <ContactForm
                        locale={locale as Locale}
                        form={dict.contact.form}
                        privacyLabel={dict.footer.privacy}
                    />
                </div>
            </section>

            {/* 地图 */}
            <ContactMap title={dict.contact.mapTitle} address={dict.footer.address} />
        </main>
    );
}