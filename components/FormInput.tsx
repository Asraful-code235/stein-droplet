import React from "react";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
  rows?: number;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = "text",
  required = false,
  placeholder = "",
  className = "",
  rows,
  onChange,
}) => {
  const inputClass = `w-full px-4 py-2 rounded-md bg-transparent border border-[#CB7856] placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 ${className}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="font-inter text-[#101820] text-[14px] mb-1 block"
      >
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          required={required}
          placeholder={placeholder}
          className={inputClass}
          rows={rows}
          onChange={onChange}
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          placeholder={placeholder}
          className={inputClass}
          onChange={onChange}
        />
      )}
    </div>
  );
};
