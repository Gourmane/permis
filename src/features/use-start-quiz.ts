"use client";
import { useRouter } from "next/navigation";
import { useProgress } from "@/storage/provider";
import { createSession } from "@/lib/session";
import { byId } from "@/lib/content";
import { latinDigits } from "@/lib/numbers";
import type { Question } from "@/types";
export function useStartQuiz() {
  const { update } = useProgress();
  const router = useRouter();
  return async (
    list: Question[],
    label: string,
    seriesId: string | null = null,
  ) => {
    if (
      !list.length ||
      new Set(list.map((q) => q.id)).size !== list.length ||
      list.some(
        (q) =>
          byId.get(q.id) !== q || q.needsReview || !q.correctAnswers.length,
      )
    )
      return false;
    const ok = await update((p) => ({
      ...p,
      session: createSession(list, latinDigits(label), seriesId),
    }));
    if (ok) router.push("/quiz/");
    return ok;
  };
}
