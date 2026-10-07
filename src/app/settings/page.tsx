"use client";
import { useRef, useState } from "react";
import { Download, Upload, RotateCcw, HardDrive } from "lucide-react";
import { useProgress } from "@/storage/provider";
import { byId } from "@/lib/content";
import { blankProgress, validateBackup } from "@/lib/logic";
import { downloadBlob } from "@/lib/download";
import { Heading, Dialog } from "@/components/ui";
import type { Progress } from "@/types";
export default function Page() {
  const { progress, replace } = useProgress();
  const input = useRef<HTMLInputElement>(null);
  const [reset, setReset] = useState(false);
  const [imported, setImported] = useState<Progress | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function read(file: File | undefined) {
    if (!file) return;
    try {
      if (file.size > 10 * 1024 * 1024)
        throw new Error("حجم النسخة كبير جدًا. الحد الأقصى عشرة ميغابايت.");
      const data = JSON.parse(await file.text());
      setImported(validateBackup(data, new Set(byId.keys())));
      setMessage("");
    } catch (e) {
      setMessage(
        e instanceof SyntaxError
          ? "الملف ليس نسخة احتياطية سليمة. اختر ملفًا سبق تصديره من طريقي."
          : e instanceof Error
            ? e.message
            : "تعذّر قراءة الملف.",
      );
    }
    if (input.current) input.current.value = "";
  }
  async function save(p: Progress) {
    setBusy(true);
    if (await replace(p)) {
      setMessage(
        imported
          ? "تم استيراد التقدم بنجاح."
          : "تم حذف التقدم. يمكنك البدء من جديد.",
      );
      setImported(null);
      setReset(false);
    }
    setBusy(false);
  }
  return (
    <>
      <Heading
        title="الإعدادات والنسخ الاحتياطي"
        text="احتفظ بتقدمك، وانقله إلى جهاز آخر عندما تحتاج."
      />
      <p className="notice">
        <HardDrive
          size={19}
          style={{
            display: "inline",
            verticalAlign: "middle",
            marginInlineEnd: 8,
          }}
        />
        التخزين على هذا الجهاز فقط. لا توجد مزامنة تلقائية بين الأجهزة أو
        المتصفحات.
      </p>
      {message && (
        <p role="status" className="notice">
          {message}
        </p>
      )}
      <div className="settings-list">
        <div className="setting-row">
          <div>
            <h3>تصدير التقدم</h3>
            <p>احفظ نسخة تحتوي على إجاباتك وأخطائك ومحفوظاتك ونتائجك.</p>
          </div>
          <button
            className="button"
            onClick={() => {
              downloadBlob(
                new Blob([JSON.stringify(progress, null, 2)], {
                  type: "application/json",
                }),
                `تقدم-طريقي-${new Date().toISOString().slice(0, 10)}.json`,
              );
              setMessage("تم تجهيز النسخة الاحتياطية للتنزيل.");
            }}
          >
            <Download size={18} />
            تصدير التقدم
          </button>
        </div>
        <div className="setting-row">
          <div>
            <h3>استيراد التقدم</h3>
            <p>استعد نسخة محفوظة أو انقل تقدمك من جهاز آخر.</p>
          </div>
          <button className="button" onClick={() => input.current?.click()}>
            <Upload size={18} />
            اختيار نسخة احتياطية
          </button>
          <input
            ref={input}
            className="file-input"
            type="file"
            accept=".json,application/json"
            aria-label="ملف النسخة الاحتياطية"
            onChange={(e) => read(e.target.files?.[0])}
          />
        </div>
        <div className="setting-row">
          <div>
            <h3>إعادة ضبط التقدم</h3>
            <p>احذف كل إجاباتك ونتائجك وملاحظات الحفظ على هذا الجهاز.</p>
          </div>
          <button className="button danger" onClick={() => setReset(true)}>
            <RotateCcw size={18} />
            حذف التقدم
          </button>
        </div>
        <div className="setting-row">
          <div>
            <h3>عن طريقي</h3>
            <p>
              تطبيق للتدرب على قانون السير المغربي من صور فيديوهاتك الأصلية.
              يعمل دون حساب. يمكنك إضافته إلى الشاشة الرئيسية من قائمة المتصفح.
              يحتاج تحميل الصفحات والصور إلى اتصال.
            </p>
            <p>
              إذا حذفت بيانات المتصفح، قد تفقد تقدمك. صدّر نسخة احتياطية دوريًا.
            </p>
          </div>
        </div>
      </div>
      {reset && (
        <Dialog
          title="حذف كل التقدم؟"
          onClose={() => {
            if (!busy) setReset(false);
          }}
        >
          <p>
            ستُحذف الإجابات والأخطاء والمحفوظات والنتائج نهائيًا من هذا المتصفح.
            احفظ نسخة احتياطية أولًا إذا احتجت إليها.
          </p>
          <div className="actions">
            <button
              className="button danger"
              disabled={busy}
              onClick={() => save(blankProgress())}
            >
              نعم، احذف التقدم
            </button>
            <button
              className="button"
              disabled={busy}
              onClick={() => setReset(false)}
            >
              إلغاء
            </button>
          </div>
        </Dialog>
      )}
      {imported && (
        <Dialog
          title="استيراد النسخة الاحتياطية؟"
          onClose={() => {
            if (!busy) setImported(null);
          }}
        >
          <p>
            سيُستبدل تقدمك الحالي ببيانات هذه النسخة. صدّر تقدمك الحالي أولًا
            إذا أردت الاحتفاظ به.
          </p>
          <div className="actions">
            <button
              className="button primary"
              disabled={busy}
              onClick={() => save(imported)}
            >
              استيراد واستبدال التقدم
            </button>
            <button
              className="button"
              disabled={busy}
              onClick={() => setImported(null)}
            >
              إلغاء
            </button>
          </div>
        </Dialog>
      )}
    </>
  );
}
