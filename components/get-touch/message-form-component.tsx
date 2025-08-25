"use client";
import Image from "next/image";
import React, { useState } from "react";
import Message from "@/assets/Message.png";
import arrow from "@/assets/arrowblack.png";
import { FormInput } from "../FormInput";
import { toast } from "react-toastify";
import { useTranslation } from "@/lib/i18n";

export default function MessageFormComponent() {
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formValues.name,
      phone: formValues.phone,
      email: formValues.email,
      message: formValues.message,
    };

    const payloadCustomer = {
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
    };

    const headers = { "Content-Type": "application/json" };

    try {
      // 1. Save message to Strapi
      const [strapiRes, customerRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/send-messages`, {
          method: "POST",
          headers,
          body: JSON.stringify({ data: payload }),
        }),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customers`, {
          method: "POST",
          headers,
          body: JSON.stringify({ data: payloadCustomer }),
        }),
      ]);

      const strapiBody = await strapiRes.json();
      const customerBody = await customerRes.json();

      if (!strapiRes.ok) {
        throw new Error(
          `Strapi error: ${strapiBody.error?.message || strapiRes.statusText}`
        );
      }

      if (!customerRes.ok) {
        throw new Error(
          `Customer error: ${
            customerBody.error?.message || customerRes.statusText
          }`
        );
      }

      // 2. Send email via Next.js API route
      const emailRes = await fetch("/api/send-messages", {
        method: "POST",
        headers,
        body: JSON.stringify({ data: payload }),
      });

      const emailBody = await emailRes.json();

      if (!emailRes.ok) {
        throw new Error(
          `Email error: ${emailBody.error?.message || emailRes.statusText}`
        );
      }

      toast.success("Your message has been submitted and emailed successfully");
      setFormValues({});
    } catch (err: any) {
      toast.error(`Submission failed: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-[#CB7856] mx-auto  max-w-xl w-full h-full text-[#101820] rounded-xl p-6 md:p-8 shadow-md overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <Image src={Message} height={23} width={23} alt="Message" />
        <h3 className="text-[24px] font-semibold font-inter">
          {t("contact.sendUsAMessage")}
        </h3>
      </div>
      <p className="text-[14px] mb-6">{t("contact.messageDescription")}</p>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        <div className="space-y-5 flex-1">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              id="name"
              label={t("contact.name")}
              type="text"
              required
              onChange={handleChange}
            />
            <FormInput
              id="phone"
              label={t("contact.phone")}
              type="tel"
              onChange={handleChange}
            />
          </div>
          <FormInput
            id="email"
            label={t("contact.email")}
            type="email"
            required
            onChange={handleChange}
          />
          <FormInput
            id="message"
            label={t("contact.message")}
            type="textarea"
            placeholder={t("contact.messagePlaceholder")}
            rows={5}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex gap-3 justify-center items-center bg-[#CB7856] w-full text-white font-inter py-3 rounded-md mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </>
          ) : (
            <>
              <Image src={arrow} width={20} height={20} alt="Send" />
              {t("buttons.sendMessage")}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
