"use client";

import Link from "next/link";
import { useState } from "react";
import { CircleCheck, Send } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type ContactFormProps = {
    locale: Locale;
    form: Dictionary["contact"]["form"];
    privacyLabel: string;
};

type Status = "idle" | "sending" | "success" | "error";

// 输入框通用样式
const inputClass =
    "w-full border border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-muted/60 transition-colors focus:border-wood focus:outline-none";

export default function ContactForm({ locale, form, privacyLabel }: ContactFormProps) {
    const [status, setStatus] = useState<Status>("idle");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus("sending");

        // 临时模拟发送：下一步替换为真实的表单发送服务
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setStatus("success");
    }

    // 发送成功后显示的提示
    if (status === "success") {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center bg-sand px-8 py-16 text-center">
                <CircleCheck size={48} strokeWidth={1.5} className="text-wood" />
                <p className="mt-6 max-w-md text-lg leading-relaxed text-ink">{form.success}</p>
            </div>
        );
    }

    return (
        <div className="bg-sand px-6 py-10 md:px-10">
            <h2 className="font-display text-2xl font-bold text-ink">{form.title}</h2>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* 姓名 + 公司 */}
                <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
                            {form.name} <span className="text-wood">*</span>
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder={form.namePlaceholder}
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label htmlFor="company" className="mb-2 block text-sm font-medium text-ink">
                            {form.company}
                        </label>
                        <input
                            id="company"
                            name="company"
                            type="text"
                            placeholder={form.companyPlaceholder}
                            className={inputClass}
                        />
                    </div>
                </div>

                {/* 联系方式 */}
                <div>
                    <label htmlFor="contact" className="mb-2 block text-sm font-medium text-ink">
                        {form.contact} <span className="text-wood">*</span>
                    </label>
                    <input
                        id="contact"
                        name="contact"
                        type="text"
                        required
                        placeholder={form.contactPlaceholder}
                        className={inputClass}
                    />
                </div>

                {/* 需求描述 */}
                <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
                        {form.message} <span className="text-wood">*</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        placeholder={form.messagePlaceholder}
                        className={`${inputClass} resize-y`}
                    />
                </div>

                {/* RGPD 同意勾选 */}
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
                    <input
                        type="checkbox"
                        name="consent"
                        required
                        className="mt-1 h-4 w-4 shrink-0 accent-wood"
                    />
                    <span>
                        {form.consent}{" "}
                        <Link
                            href={`/${locale}/privacy/`}
                            className="text-wood underline underline-offset-2 hover:text-wood-dark"
                        >
                            {privacyLabel}
                        </Link>
                    </span>
                </label>

                {/* 发送失败提示 */}
                {status === "error" && (
                    <p className="border-l-2 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-800">
                        {form.error}
                    </p>
                )}

                {/* 提交按钮（居中） */}
                <div className="flex justify-center pt-2">
                    <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group inline-flex items-center gap-2 bg-wood px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-wood-dark disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {status === "sending" ? form.sending : form.submit}
                        <Send
                            size={16}
                            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </button>
                </div>
            </form>
        </div>
    );
}