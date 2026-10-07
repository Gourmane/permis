import Link from "next/link";
export default function NotFound() {
  return (
    <div className="empty">
      <h1>الصفحة غير موجودة</h1>
      <p>اختر صفحة من القائمة لمتابعة التدريب.</p>
      <Link href="/" className="button primary">
        العودة للرئيسية
      </Link>
    </div>
  );
}
