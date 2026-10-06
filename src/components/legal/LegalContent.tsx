import { Info } from "lucide-react";

type Section = {
    title: string;
    paragraphs: string[];
};

type LegalContentProps = {
    updated: string;
    notice: string;
    sections: Section[];
};

// 法律声明、隐私政策通用排版
export default function LegalContent({ updated, notice, sections }: LegalContentProps) {
    return (
        <section className="bg-paper py-20">
            <div className="mx-auto max-w-3xl px-6">
                {/* 更新日期 */}
                <p className="text-sm text-muted">{updated}</p>

                {/* 中文版提示（法语版为空，不显示） */}
                {notice && (
                    <p className="mt-6 flex items-start gap-3 border-l-2 border-wood bg-sand px-5 py-4 text-sm leading-relaxed text-muted">
                        <Info size={18} className="mt-0.5 shrink-0 text-wood" />
                        {notice}
                    </p>
                )}

                {/* 各条款 */}
                <div className="mt-12 space-y-12">
                    {sections.map((section, index) => (
                        <article key={section.title} className="border-t border-line pt-8">
                            <h2 className="flex items-baseline gap-4 font-display text-xl font-semibold text-ink">
                                <span className="text-sm font-bold text-wood">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                {section.title}
                            </h2>
                            <div className="mt-4 space-y-3 pl-10">
                                {section.paragraphs.map((paragraph) => (
                                    <p key={paragraph} className="text-base leading-relaxed text-muted">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}