"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { blankProgress, validateBackup } from "@/lib/logic";
import { byId } from "@/lib/content";
import { loadProgress, saveProgress } from "@/storage";
import type { Progress } from "@/types";
type State = {
  progress: Progress;
  ready: boolean;
  error: string;
  update: (fn: (p: Progress) => Progress) => Promise<boolean>;
  replace: (p: Progress) => Promise<boolean>;
};
const Context = createContext<State | null>(null);
export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(blankProgress);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const current = useRef(progress);
  const readFailed = useRef(false);
  const queue = useRef(Promise.resolve(true));
  useEffect(() => {
    let active = true;
    loadProgress()
      .then((p) => {
        if (!active) return;
        if (p) {
          const safe = validateBackup(p, new Set(byId.keys()));
          current.current = safe;
          setProgress(safe);
        }
      })
      .catch(() => {
        readFailed.current = true;
        if (active)
          setError(
            "تعذّر قراءة التقدم المحفوظ. تحقق من السماح بالتخزين في المتصفح أو استورد نسخة احتياطية.",
          );
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);
  const commit = useCallback(
    (fn: (p: Progress) => Progress, recover = false) => {
      queue.current = queue.current.then(async () => {
        try {
          if (readFailed.current && !recover)
            throw new Error("Storage requires recovery");
          const next = fn(current.current);
          await saveProgress(next);
          readFailed.current = false;
          current.current = next;
          setProgress(next);
          setError("");
          return true;
        } catch {
          setError(
            "تعذّر حفظ التقدم. قد تكون مساحة التخزين ممتلئة أو غير متاحة. صدّر نسخة احتياطية قبل مغادرة الصفحة.",
          );
          return false;
        }
      });
      return queue.current;
    },
    [],
  );
  const update = useCallback(
    (fn: (p: Progress) => Progress) => commit(fn),
    [commit],
  );
  const replace = useCallback((p: Progress) => commit(() => p, true), [commit]);
  return (
    <Context.Provider value={{ progress, ready, error, update, replace }}>
      {children}
    </Context.Provider>
  );
}
export function useProgress() {
  const context = useContext(Context);
  if (!context) throw new Error("سياق التقدم غير متاح");
  return context;
}
