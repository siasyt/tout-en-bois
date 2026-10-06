import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Hero from "@/components/home/Hero";
import Values from "@/components/home/Values";
import Services from "@/components/home/Services";
import Advantages from "@/components/home/Advantages";
import Clients from "@/components/home/Clients";
import CallToAction from "@/components/home/CallToAction";

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);

    return (
        <main>
            <Hero locale={locale as Locale} hero={dict.hero} />
            <Values values={dict.values} />
            <Services locale={locale as Locale} services={dict.services} />
            <Advantages advantages={dict.advantages} />
            <Clients clients={dict.clients} />
            <CallToAction locale={locale as Locale} cta={dict.cta} />
        </main>
    );
}