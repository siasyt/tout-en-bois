type ContactMapProps = {
    title: string;
    address: string;
};

export default function ContactMap({ title, address }: ContactMapProps) {
    // 根据地址生成 Google Maps 嵌入链接（无需 API 密钥）
    const src = `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`;

    return (
        <section className="bg-paper pb-20">
            <div className="mx-auto max-w-7xl px-6">
                <p className="mb-6 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-wood">
                    <span className="h-px w-10 bg-wood" />
                    {title}
                </p>

                {/* 地图：默认灰色调，悬停恢复彩色 */}
                <div className="relative h-[420px] overflow-hidden border border-line bg-sand">
                    <iframe
                        src={src}
                        title={title}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="h-full w-full grayscale transition-all duration-500 hover:grayscale-0"
                    />
                </div>
            </div>
        </section>
    );
}