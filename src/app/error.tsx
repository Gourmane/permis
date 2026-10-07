"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="empty" role="alert">
      <h1>تعذّر عرض الصفحة</h1>
      <p>حاول تحميلها مجددًا. تقدمك المحفوظ يبقى على جهازك.</p>
      <button className="button primary" onClick={reset}>
        حاول مجددًا
      </button>
    </div>
  );
}
