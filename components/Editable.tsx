import React, { useState, useEffect, useRef } from "react";

interface EditableTextProps {
  initialValue: string | number;
  onSave: (value: string | number) => void;
  placeholder?: string;
  className?: string;
  type?: string;
  inputClassName?: string;
}

export default function EditableText({
  initialValue,
  onSave,
  placeholder = "Enter text",
  className = "",
  type = "text",
  inputClassName = "",
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string | number>(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = (): void => {
    setIsEditing(false);
    if (value !== initialValue) {
      onSave(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <div
      className={`px-2 py-1 cursor-pointer whitespace-nowrap ${className}`}
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`w-full outline-none bg-transparent whitespace-nowrap ${inputClassName}`}
          placeholder={placeholder}
        />
      ) : (
        <span>{value || placeholder}</span>
      )}
    </div>
  );
}
