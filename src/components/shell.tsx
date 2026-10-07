"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Layers,
  Bookmark,
  ChartNoAxesCombined,
  Settings,
  Shuffle,
  BookOpen,
  TrafficCone,
  ArrowLeft,
  OctagonAlert,
  HardDrive,
} from "lucide-react";
import { useProgress } from "@/storage/provider";
const nav = [
  { href: "/", label: "الرئيسية", icon: House },
  { href: "/series/", label: "السلاسل", icon: Layers },
  { href: "/mistakes/", label: "أخطائي", icon: OctagonAlert },
  { href: "/topics/", label: "المحاور", icon: BookOpen },
  { href: "/statistics/", label: "التقدم", icon: ChartNoAxesCombined },
];
export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { error, ready } = useProgress();
  return (
    <div className={`app-shell ${path === "/quiz/" ? "quiz-shell" : ""}`}>
      <aside className="sidebar">
        <Link href="/" className="brand">
          <span className="brand-icon">
            <TrafficCone size={27} />
          </span>
          <span>
            طريقي<small>تعلّم. تدرّب. تقدّم.</small>
          </span>
        </Link>
        <div className="nav-caption">مساحة التعلّم</div>
        <nav aria-label="القائمة الرئيسية">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
              className={`nav-link ${path === href ? "active" : ""}`}
            >
              <Icon size={21} />
              {label}
              {path === href && <ArrowLeft size={16} />}
            </Link>
          ))}
          <div className="nav-separator" />
          <Link
            className={`nav-link ${path === "/practice/" ? "active" : ""}`}
            href="/practice/"
          >
            <Shuffle size={21} />
            تدريب مختلط
          </Link>
          <Link
            className={`nav-link ${path === "/bookmarks/" ? "active" : ""}`}
            href="/bookmarks/"
          >
            <Bookmark size={21} />
            المحفوظات
          </Link>
          <Link
            className={`nav-link ${path === "/settings/" ? "active" : ""}`}
            href="/settings/"
          >
            <Settings size={21} />
            الإعدادات
          </Link>
        </nav>
        <div className="storage-note">
          <HardDrive size={19} />
          <span>
            تقدمك محفوظ هنا<small>على هذا الجهاز فقط</small>
          </span>
        </div>
      </aside>
      <div className="main-wrap">
        <header className="topbar">
          <span className="topbar-title">رفيقك في تعلّم قانون السير</span>
          <Link className="mobile-brand" href="/">
            <TrafficCone size={24} /> طريقي
          </Link>
          <Link
            className="icon-button"
            href="/settings/"
            aria-label="الإعدادات"
          >
            <Settings size={21} />
          </Link>
        </header>
        <main id="main-content">
          {error && (
            <div role="alert" className="notice danger">
              {error}
            </div>
          )}
          {!ready ? (
            <div className="loading" role="status">
              جارٍ تحميل تقدمك…
            </div>
          ) : (
            children
          )}
        </main>
        <footer className="site-footer">
          خطوة صغيرة كل يوم، وثقة أكبر في الطريق.
        </footer>
      </div>
      <nav className="bottom-nav" aria-label="التنقل على الهاتف">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={path === href ? "page" : undefined}
            className={path === href ? "active" : ""}
          >
            <Icon size={21} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
