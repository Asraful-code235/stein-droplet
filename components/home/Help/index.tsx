import React from "react";
import Image, { StaticImageData } from "next/image";
import Help from "@/assets/Help.png";
import ellipse from "@/assets/Ellipse.png";
import phone from "@/assets/mobile.png";
import Message from "@/assets/mail.png";
import Location from "@/assets/location.png";

// Type definitions
type TextFieldProps = {
  type?: "text" | "email" | "tel" | "password" | "number";
  id: string;
  placeholder: string;
  rounded?: "md" | "xl" | "full";
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

type ContactInfoItemProps = {
  icon: StaticImageData;
  text: string;
};

// Reusable TextField Component
const TextField: React.FC<TextFieldProps> = ({
  type = "text",
  id,
  placeholder,
  rounded = "md",
  className = "",
  ...props
}) => {
  const roundedClass =
    {
      md: "rounded-md",
      xl: "rounded-xl",
      full: "rounded-full",
    }[rounded] || "rounded-md";

  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className={`w-full px-4 py-2 text-[#B7B7B7] bg-[#EFEEEE] ${roundedClass} focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};

// Reusable Contact Info Item Component
const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ icon, text }) => (
  <div className="flex items-center gap-4">
    <div className="relative h-9 w-9 flex-shrink-0">
      <Image
        src={ellipse}
        alt="best"
        width={36}
        height={36}
        className="absolute h-full w-full"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src={icon}
          alt="best"
          width={16}
          height={16}
          className="drop-shadow-sm"
        />
      </div>
    </div>
    <p className="text-sm md:text-[14px] font-medium text-fontColor">{text}</p>
  </div>
);

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Left Column - Contact Information */}
        <div className="p-4 sm:p-6 lg:p-8 rounded-lg">
          <h1 className="text-2xl sm:text-[28px] md:text-[31px] text-darkfontColor font-bold">
            We're Here to Help
          </h1>

          <p className="mt-2 mb-6 md:mb-8 text-xs sm:text-sm md:text-[14px] font-normal text-fontColor">
            Durable, stylish, and built to last—just like our support. Message
            us anytime.
          </p>

          <div className="mb-4 md:mb-6">
            <Image
              src={Help}
              alt="Customersupport"
              className="rounded-lg w-full h-auto max-h-[290px] object-cover"
              width={600}
              height={400}
            />
          </div>

          {/* Contact Info Items */}
          <div className="space-y-3 md:space-y-4">
            <ContactInfoItem icon={phone} text="+344556666" />
            <ContactInfoItem icon={Message} text="info@steinmarine.com" />
            <ContactInfoItem icon={Location} text="SteinMarinegvs bfvirgt8" />
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="p-4 sm:p-6 lg:p-8 rounded-lg flex items-center">
          <form className="w-full space-y-3 md:space-y-4">
            <TextField
              type="text"
              id="name"
              placeholder="Your full name"
              rounded="xl"
            />

            <TextField
              type="email"
              id="email"
              placeholder="Your email address"
            />

            <TextField type="tel" id="phone" placeholder="Your phone number" />

            <div>
              <textarea
                id="message"
                rows={4}
                placeholder="Your message"
                className="w-full px-4 py-2 bg-[#EFEEEE] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-[70%] md:w-[50%] lg:w-[40%] bg-[#142239] text-white py-2 md:p-3 text-sm sm:text-base md:text-[20px] rounded-3xl"
              >
                Quick Chat
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
