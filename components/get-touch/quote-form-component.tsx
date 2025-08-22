"use client";
import Image from "next/image";
import React, { useState } from "react";
import quote from "@/assets/quote.png";
import blackdoc from "@/assets/blackdecument.png";
import { FormInput } from "../FormInput";
import { getProductsByCategorySlug } from "@/lib/api";
import { toast } from "react-toastify";
import { useTranslation } from "@/lib/i18n";

interface Field {
  id: number;
  name: string;
}
interface RequestFormData {
  formTitle: { title: string; description: string };
  fields: Field[];
  locale: any;
  data: any;
}

export default function QuoteFormComponent({
  data,
  locale,
  Categories,
}: {
  data: any;
  Categories: { title: string; slug: string }[];
  locale: any;
}) {
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [projectTypeList, setProjectTypeList] = useState<
    { title: string; slug: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));

    if (id === "select Category") {
      setProjectTypeList([]);
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const payload = {
    name: formValues.name || "",
    phone: formValues.phone || "",
    email: formValues.email || "",
    short_message: formValues.short_message || "",
    message: formValues.message || "",
    category: formValues["select Category"] || "",
  };

  const payloadCustomer = {
    name: payload.name,
    phone: payload.phone,
    email: payload.email,
  };

  try {
    // Send both requests to Strapi in parallel
    const [quoteRes, customerRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quote-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: payload }),
      }),
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: payloadCustomer }),
      }),
    ]);

    // Handle quote request response
    if (!quoteRes.ok) {
      const err = await quoteRes.json();
      throw new Error(`Quote submission failed: ${err.error?.message || quoteRes.statusText}`);
    }

    // Handle customer response
    if (!customerRes.ok) {
      const err = await customerRes.json();
      throw new Error(`Customer creation failed: ${err.error?.message || customerRes.statusText}`);
    }

    // Send email via API route
    const emailRes = await fetch("/api/send-messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: payload }),
    });

    const emailBody = await emailRes.json();

    if (!emailRes.ok) {
      throw new Error(`Email error: ${emailBody.error?.message || emailRes.statusText}`);
    }

    toast.success("Quote submitted and emailed successfully!");
    setFormValues({});
  } catch (err: any) {
    toast.error(err.message || "Submission failed");
  }
};


  return (
    <div className="mx-auto bg-white border border-[#CB7856] rounded-xl p-6 md:p-8 shadow-md h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <Image src={quote} height={23} width={23} alt="QuoteIcon" />
        <h3 className="text-2xl font-semibold">{data.formTitle.title}</h3>
      </div>
      <p className="text-sm mb-6">{data.formTitle.description}</p>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        <div className="space-y-5 flex-1">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              id="name"
              label={t('contact.name')}
              type="text"
              required
              onChange={handleChange}
            />
            <FormInput
              id="phone"
              label={t('contact.phone')}
              type="tel"
              onChange={handleChange}
            />
          </div>
          <FormInput
            id="email"
            label={t('contact.email')}
            type="email"
            required
            onChange={handleChange}
          />

          <div>
            <label htmlFor="select Category" className="block mb-1">
              {t('contact.selectCategory')} *
            </label>
            <select
              id="select Category"
              onChange={handleChange}
              value={formValues["select Category"] || ""}
              required
              className="w-full border px-2 py-2 rounded"
            >
              <option value="">{t('contact.choose')}</option>
              {Categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <FormInput
            id="short_message"
            label={t('contact.quoteRequirements')}
            type="text"
            required
            onChange={handleChange}
          />

          {isLoading && <p>{t('contact.loadingProducts')}</p>}
          {error && <p className="text-red-500">{error}</p>}

          <FormInput
            id="message"
            label={t('contact.message')}
            type="textarea"
            rows={5}
            placeholder={t('contact.projectPlaceholder')}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-3 bg-[#CB7856] text-white py-3 rounded w-full mt-6"
        >
          <Image src={blackdoc} height={23} width={23} alt="SubmitIcon" />
          {t('buttons.requestQuote')}
        </button>
      </form>
    </div>
  );
}
