import type { Question } from "@/types";
import { answerLabel, number } from "@/lib/content";
export function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
export async function correctionBlob(
  q: Question,
  selected: number[],
): Promise<Blob> {
  const image = new Image();
  image.src = q.image;
  await image.decode();
  await document.fonts.ready;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1000, image.naturalWidth);
  const h = Math.round(
    (image.naturalHeight * canvas.width) / image.naturalWidth,
  );
  canvas.height = h + 220;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("تعذّر إنشاء صورة التصحيح.");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, h);
  ctx.fillStyle = "#18344a";
  ctx.direction = "rtl";
  ctx.textAlign = "right";
  ctx.font = '600 28px "Noto Sans Arabic"';
  ctx.fillText(
    `السلسلة ${number(q.seriesNumber)} — السؤال ${number(q.questionNumber)}`,
    canvas.width - 36,
    h + 58,
  );
  ctx.font = '26px "Noto Sans Arabic"';
  ctx.fillStyle = "#b3343c";
  ctx.fillText(`إجابتي: ${answerLabel(selected)}`, canvas.width - 36, h + 114);
  ctx.fillStyle = "#187347";
  ctx.fillText(
    `الإجابة الصحيحة: ${answerLabel(q.correctAnswers)}`,
    canvas.width - 36,
    h + 169,
  );
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("تعذّر حفظ الصورة."))),
      "image/png",
    ),
  );
}
export async function downloadCorrection(q: Question, selected: number[]) {
  downloadBlob(await correctionBlob(q, selected), `تصحيح-${q.id}.png`);
}
export async function downloadAll(
  list: Question[],
  records: Record<string, { lastWrong: number[] }>,
) {
  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();
  for (const q of list) {
    zip.file(
      `تصحيح-${q.id}.png`,
      await correctionBlob(q, records[q.id]?.lastWrong ?? []),
    );
  }
  downloadBlob(
    await zip.generateAsync({ type: "blob", compression: "STORE" }),
    "تصحيحات-أخطائي.zip",
  );
}
