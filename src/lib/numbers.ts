/** Arabic text with Latin digits; use Numeric for composite expressions. */
const formatter = new Intl.NumberFormat("ar-MA-u-nu-latn", {
  useGrouping: false,
});
export const latinDigits = (value: string): string =>
  value.replace(/[٠-٩۰-۹]/g, (digit) =>
    String(digit.charCodeAt(0) - (digit <= "٩" ? 0x660 : 0x6f0)),
  );
export const number = (value: number): string => formatter.format(value);
export const ratio = (value: number, total: number): string =>
  number(value) + "/" + number(total);
export const dateLabel = (value: string | null | undefined): string =>
  value && Number.isFinite(Date.parse(value))
    ? new Intl.DateTimeFormat("ar-MA-u-nu-latn").format(new Date(value))
    : "لم تبدأ بعد";
export const answerLabel = (answers: readonly number[]): string =>
  answers.length
    ? [...answers]
        .sort((a, b) => a - b)
        .map(number)
        .join(" + ")
    : "لم تُحدّد";
