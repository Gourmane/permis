import { readdir, copyFile, readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
/** Next's exporter passes native Windows separators to a slash-only encoder.
 * Emit the dotted URLs expected by its client, without removing original files.
 */
export function payloadDestination(relativeFile) {
  const parts = relativeFile.split(/[\\/]/);
  const marker = parts.findIndex((part) => part.startsWith("__next."));
  if (
    marker < 0 ||
    marker === parts.length - 1 ||
    !relativeFile.endsWith(".txt")
  )
    return null;
  return path.join(...parts.slice(0, marker), parts.slice(marker).join("."));
}
export async function normalizeExport(root) {
  let count = 0;
  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const source = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(source);
        continue;
      }
      const relative = path.relative(root, source);
      const destination = payloadDestination(relative);
      if (!destination) continue;
      const target = path.join(root, destination);
      const existing = await readFile(target).catch((error) => {
        if (error.code === "ENOENT") return null;
        throw error;
      });
      if (existing && !existing.equals(await readFile(source)))
        throw new Error("Conflicting exported route payload: " + destination);
      if (!existing) {
        await copyFile(source, target);
        count++;
      }
    }
  }
  await visit(root);
  return count;
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  console.log(
    "Normalized static route payloads:",
    await normalizeExport(path.resolve("out")),
  );
}
