import type { Metadata, Viewport } from "next";
import "@fontsource/noto-sans-arabic/arabic-400.css";
import "@fontsource/noto-sans-arabic/arabic-600.css";
import "@fontsource/noto-kufi-arabic/arabic-600.css";
import "./globals.css";
import { ProgressProvider } from "@/storage/provider";
import { Shell } from "@/components/shell";
export const metadata: Metadata = {
  title: { default: "طريقي — تدرب على قانون السير", template: "%s | طريقي" },
  description:
    "تدرب على أسئلة قانون السير المغربي، راجع أخطاءك واحفظ تقدمك على جهازك.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "طريقي", statusBarStyle: "default" },
  icons: { icon: "/icon.svg", apple: "/icon-192.png" },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#082b5a",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <script
          type="application/json"
          id="design-contract"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              thesis:
                "Moroccan driving practice: image first, deliberate multi-answer confirmation.",
              world:
                "User-pinned royal blue #1552ac, deep blue #082b5a, yellow #ffc34a, white, original sign outlines. Local Noto Kufi headings, Noto Sans prose; Latin utility digits.",
              story:
                "Choose a series, inspect its source image, select all answers, understand correction before continuing.",
              viewport:
                "Mobile: welcome then colorful practice links. Desktop: bounded learning grid and main quiz on left, progress/navigation on right. Signature: numbered selection keys with persistent green/red correction.",
              form: "Code-led, user reference pins direction over seed 15144445.",
              finish:
                "unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md",
            }),
          }}
        />
        <a className="skip-link" href="#main-content">
          انتقل إلى المحتوى
        </a>
        <ProgressProvider>
          <Shell>{children}</Shell>
        </ProgressProvider>
      </body>
    </html>
  );
}
