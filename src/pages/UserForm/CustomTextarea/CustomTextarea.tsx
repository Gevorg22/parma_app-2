import React from "react";
import { useField } from "formik";
import cn from "classnames";

interface CustomTextareaProps {
  label?: string;
  name: string;
  placeholder?: string;
  className?: string;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({ label, name, placeholder, className }) => {
  const [field, meta] = useField(name);

  return (
    <>
      {label && (
        <label htmlFor={name} className="user-form__label">
          {label}:
        </label>
      )}
      <textarea
        {...field}
        id={name}
        placeholder={placeholder}
        className={cn(className, { "user-form__input-error": meta.touched && meta.error })}
      />
      {meta.touched && meta.error && <div className="user-form__error">{meta.error}</div>}
    </>
  );
};

export default CustomTextarea;
