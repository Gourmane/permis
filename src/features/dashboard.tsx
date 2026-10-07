"use client";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Layers,
  Bookmark,
  Shuffle,
  OctagonAlert,
  ChartNoAxesCombined,
  Route,
  Check,
} from "lucide-react";
import {
  available,
  number,
  percent,
  series,
  seriesQuestions,
  ratio,
} from "@/lib/content";
import { useProgress } from "@/storage/provider";
import { useStartQuiz } from "@/features/use-start-quiz";
import { Heading, Bar, Numeric } from "@/components/ui";
import type { Series } from "@/types";
export function SeriesCard({ item }: { item: Series }) {
  const { progress } = useProgress();
  const start = useStartQuiz();
  const list = seriesQuestions(item.id);
  const attempted = list.filter(
    (q) => (progress.records[q.id]?.attempts ?? 0) > 0,
  ).length;
  const results = progress.results.filter((r) => r.seriesId === item.id);
  const best = results.reduce<(typeof results)[number] | null>(
    (best, r) =>
      !best || percent(r.correct, r.total) > percent(best.correct, best.total)
        ? r
        : best,
    null,
  );
  const last = results.at(-1);
  const resume =
    progress.session?.seriesId === item.id &&
    list.length > 0 &&
    progress.session.ids.every((id) => list.some((q) => q.id === id));
  return (
    <article className={`series-card ${!list.length ? "series-blocked" : ""}`}>
      <div className="series-card-header">
        <span className="number-tile">
          <Numeric>{number(item.number)}</Numeric>
        </span>
        <span
          className={`badge ${last ? "success" : !list.length ? "warning" : ""}`}
        >
          {!list.length
            ? "بانتظار التحقق"
            : resume
              ? "قيد التقدم"
              : last
                ? "مكتملة"
                : "جاهزة للتدريب"}
        </span>
      </div>
      <h3>السلسلة {number(item.number)}</h3>
      <div className="series-main-score">
        <Numeric>
          {last ? ratio(last.correct, last.total) : number(item.questionCount)}
        </Numeric>
        <span>{last ? "آخر نتيجة" : "سؤالًا في السلسلة"}</span>
      </div>
      <div className="series-card-meta">
        <span>أسئلة أجبت عنها</span>
        <Numeric>{ratio(attempted, list.length || item.questionCount)}</Numeric>
      </div>
      <Bar
        value={percent(attempted, list.length)}
        label={`تقدم السلسلة ${number(item.number)}`}
      />
      <div className="series-scores">
        <span>أفضل نتيجة</span>
        <Numeric>{best ? ratio(best.correct, best.total) : "—"}</Numeric>
      </div>
      {!list.length ? (
        <>
          <p className="series-blocker">
            صور الأسئلة متاحة. الإجابات الصحيحة لم تُتحقق من المصدر بعد.
          </p>
          <Link className="button small" href={`/review/?series=${item.id}`}>
            مراجعة محتوى السلسلة <ArrowLeft size={16} />
          </Link>
        </>
      ) : resume ? (
        <Link className="button small" href="/quiz/">
          متابعة التدريب <ArrowLeft size={16} />
        </Link>
      ) : (
        <button
          className="button small"
          onClick={() => start(list, `السلسلة ${number(item.number)}`, item.id)}
        >
          {last ? "إعادة السلسلة" : "ابدأ التدريب"}
          <ArrowLeft size={16} />
        </button>
      )}
    </article>
  );
}
const destinations = [
  {
    href: "/series/",
    title: "سلاسل الامتحان",
    text: "تدرّب على أسئلة الامتحان، سلسلة بعد سلسلة",
    icon: Layers,
    tone: "blue",
  },
  {
    href: "/mistakes/",
    title: "أخطائي",
    text: "راجع التصحيح وحوّل أخطاءك إلى تقدم",
    icon: OctagonAlert,
    tone: "red",
  },
  {
    href: "/topics/",
    title: "التدريب حسب المحور",
    text: "علامات، أسبقية، سلامة… ركّز على ما تحتاجه",
    icon: BookOpen,
    tone: "yellow",
  },
  {
    href: "/practice/",
    title: "اختبار مختلط",
    text: "اختبر معلوماتك بأسئلة من مختلف السلاسل",
    icon: Shuffle,
    tone: "blue",
  },
  {
    href: "/bookmarks/",
    title: "الأسئلة المحفوظة",
    text: "أسئلتك المهمة، جاهزة للمراجعة",
    icon: Bookmark,
    tone: "blue",
  },
  {
    href: "/statistics/",
    title: "الإحصائيات",
    text: "تابع دقتك، واطّلع على تقدمك",
    icon: ChartNoAxesCombined,
    tone: "blue",
  },
];
export default function Home() {
  const { progress } = useProgress();
  const records = Object.values(progress.records);
  const attempted = records.filter((r) => r.attempts > 0).length;
  const correct = records.reduce((n, r) => n + r.correct, 0);
  const total = records.reduce((n, r) => n + r.attempts, 0);
  const mistakes = records.filter((r) => r.wrong > 0 && !r.mastered).length;
  return (
    <>
      <Heading
        title="مرحبًا بك في طريقي"
        text="تعلّم قانون السير المغربي. تدرّب اليوم، وتقدّم بثقة."
      />
      {progress.session && (
        <section className="resume-strip">
          <Route size={25} />
          <div>
            <strong>لنُكمل من حيث توقّفت</strong>
            <p>{progress.session.label} · تقدمك محفوظ على هذا الجهاز</p>
          </div>
          <Link href="/quiz/" className="button primary">
            متابعة التدريب <ArrowLeft size={18} />
          </Link>
        </section>
      )}
      <section className="home-paths" aria-label="اختر طريقة التدريب">
        {destinations.map(({ href, title, text, icon: Icon, tone }) => (
          <Link key={href} href={href} className={`home-path tone-${tone}`}>
            <span className="path-icon">
              <Icon size={29} />
            </span>
            <span className="path-copy">
              <h2>{title}</h2>
              <p>{text}</p>
            </span>
            <ArrowLeft className="path-arrow" size={22} />
          </Link>
        ))}
      </section>
      <div className="section-title">
        <h2>خطواتك في التعلّم</h2>
        <Link className="text-link" href="/statistics/">
          عرض التقدم <ArrowLeft size={16} />
        </Link>
      </div>
      <section className="metric-row" aria-label="ملخص التقدم">
        {[
          {
            label: "الأسئلة المتاحة",
            value: number(available.length),
            icon: Layers,
          },
          { label: "أسئلة أجبت عنها", value: number(attempted), icon: Check },
          {
            label: "دقة إجاباتك",
            value: total ? `${number(percent(correct, total))}%` : "—",
            icon: ChartNoAxesCombined,
          },
          {
            label: "أخطاء للمراجعة",
            value: number(mistakes),
            icon: OctagonAlert,
          },
        ].map(({ label, value, icon: Icon }) => (
          <div className="metric" key={label}>
            <div className="metric-top">
              <span>{label}</span>
              <Icon size={18} />
            </div>
            <strong>
              <Numeric>{value}</Numeric>
            </strong>
          </div>
        ))}
      </section>
      <div className="section-title">
        <h2>جاهز لسلسلة جديدة؟</h2>
        <Link className="text-link" href="/series/">
          كل السلاسل <ArrowLeft size={16} />
        </Link>
      </div>
      <section className="series-grid home-series">
        {series
          .filter((s) => seriesQuestions(s.id).length)
          .slice(0, 3)
          .map((s) => (
            <SeriesCard key={s.id} item={s} />
          ))}
      </section>
      <p className="local-note">
        تقدمك محفوظ على هذا الجهاز. انقله من الإعدادات عبر تصدير نسخة احتياطية.
      </p>
    </>
  );
}
