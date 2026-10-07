"use client";
import { series, number } from "@/lib/content";
import { SeriesCard } from "@/features/dashboard";
import { Heading } from "@/components/ui";
export default function Page() {
  return (
    <>
      <Heading
        title="سلاسل الامتحان"
        text={`${number(series.length)} سلسلة من فيديوهاتك الأصلية. تقدّم بالوتيرة التي تناسبك.`}
      />
      <div className="series-grid">
        {series.map((s) => (
          <SeriesCard key={s.id} item={s} />
        ))}
      </div>
    </>
  );
}
