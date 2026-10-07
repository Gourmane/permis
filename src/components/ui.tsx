"use client";
import { useEffect, useRef } from "react";
import { Check, X } from "lucide-react";
import type { Answer } from "@/types";
export function Numeric({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <bdi dir="ltr" className={"numeric " + className}>
      {children}
    </bdi>
  );
}
export function AnswerButton({
  value,
  selected,
  correct,
  incorrect,
  disabled,
  onClick,
}: {
  value: Answer;
  selected: boolean;
  correct: boolean;
  incorrect: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      disabled={disabled}
      aria-pressed={selected}
      aria-label={"الإجابة " + value}
      onClick={onClick}
      className={[
        "answer-button",
        selected && "selected",
        correct && "correct",
        incorrect && "incorrect",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Numeric>{value}</Numeric>
      {incorrect ? <X /> : selected || correct ? <Check /> : null}
    </button>
  );
}
export function Dialog({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    d?.showModal();
    return () => {
      d?.close();
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-label={title}
    >
      <div className="dialog-header">
        <h2>{title}</h2>
        <button className="icon-button" onClick={onClose} aria-label="إغلاق">
          <X />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function Empty({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="empty">
      <div className="empty-mark">
        <span />
      </div>
      <h2>{title}</h2>
      <p>{text}</p>
      {children}
    </div>
  );
}
export function Heading({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {action}
    </div>
  );
}
export function Bar({ value, label }: { value: number; label: string }) {
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}
export function QuestionImage({
  src,
  alt,
  onClick,
  lazy = false,
}: {
  src: string;
  alt: string;
  onClick?: () => void;
  lazy?: boolean;
}) {
  const ref = useRef<HTMLImageElement>(null);
  return (
    <div className="question-image" onClick={onClick}>
      {/* The original image remains the question source. */}
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        onLoad={(e) => {
          e.currentTarget.style.maxWidth = `${e.currentTarget.naturalWidth}px`;
        }}
        width={752}
        height={475}
        onError={() => {
          if (ref.current) {
            ref.current.style.display = "none";
            ref.current.parentElement?.classList.add("missing-image");
          }
        }}
      />
      <span className="image-error">
        تعذّر عرض صورة السؤال. أعد تحميل الصفحة أو اختر سؤالًا آخر.
      </span>
    </div>
  );
}
