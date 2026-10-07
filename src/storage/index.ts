import { openDB, type IDBPDatabase } from "idb";
import type { Progress } from "@/types";
let database: Promise<IDBPDatabase> | null = null;
const db = () =>
  (database ??= openDB("tariqi-progress", 1, {
    upgrade(db) {
      db.createObjectStore("state");
    },
  }).catch((error) => {
    database = null;
    throw error;
  }));
export async function loadProgress(): Promise<Progress | null> {
  return (await db()).get("state", "progress");
}
export async function saveProgress(progress: Progress): Promise<void> {
  await (await db()).put("state", progress, "progress");
}
