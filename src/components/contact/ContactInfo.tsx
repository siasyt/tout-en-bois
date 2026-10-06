import { MapPin, Phone, Mail, Clock } from "lucide-react";
import WoodIllustration from "@/components/WoodIllustration";
import type { Dictionary } from "@/i18n/get-dictionary";

type ContactInfoProps = {
    title: string;
    footer: Dictionary["footer"];
};

export default function ContactInfo({ title, footer }: ContactInfoProps) {
    // 从文字中提取电话号码和邮箱，用于点击拨号 / 发邮件
    const phoneHref = `tel:${footer.phone.replace(/[^\d+]/g, "")}`;
    const emailHref = `mailto:${footer.email.split(" ")[0]}`;

    const items = [
        { icon: MapPin, value: footer.address },
        { icon: Phone, value: footer.phone, href: phoneHref },
        { icon: Mail, value: footer.email, href: emailHref },
        { icon: Clock, value: footer.hours },
    ];

    return (
        // h-full + flex-col：让插画在大屏幕上贴到底部，和右侧表单底部对齐
        <div className="flex h-full flex-col">
            <h2 className="font-display text-2xl font-bold text-ink">{title}</h2>

            <ul className="mt-8 space-y-6">
                {items.map(({ icon: Icon, value, href }) => (
                    <li key={value} className="flex items-start gap-4">
                        {/* 图标方块 */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-sand text-wood">
                            <Icon size={20} strokeWidth={1.75} />
                        </div>

                        {/* 内容（电话、邮箱可点击） */}
                        <div className="pt-3 text-base leading-relaxed text-ink">
                            {href ? (
                                <a href={href} className="transition-colors hover:text-wood">
                                    {value}
                                </a>
                            ) : (
                                <span>{value}</span>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            {/* 木材插画 */}
            <WoodIllustration className="mt-12 w-full max-w-sm lg:my-auto" />
        </div>
    );
}