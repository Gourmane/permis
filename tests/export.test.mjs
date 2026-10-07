import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  payloadDestination,
  normalizeExport,
} from "../scripts/normalize-export.mjs";
test("native Windows and POSIX payload paths match browser URLs", () => {
  for (const name of [
    "series/__next.series/__PAGE__.txt",
    "series\\__next.series\\__PAGE__.txt",
  ])
    assert.equal(
      payloadDestination(name),
      path.join("series", "__next.series.__PAGE__.txt"),
    );
  assert.equal(payloadDestination("series/__next.series.__PAGE__.txt"), null);
  assert.equal(
    payloadDestination("questions/series-01/question-001.webp"),
    null,
  );
});
test("export repair preserves originals, is idempotent, and rejects conflicts", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "tariqi-export-"));
  try {
    const source = path.join(root, "series", "__next.series", "__PAGE__.txt");
    await mkdir(path.dirname(source), { recursive: true });
    await writeFile(source, "route payload");
    assert.equal(await normalizeExport(root), 1);
    assert.equal(await normalizeExport(root), 0);
    assert.equal(await readFile(source, "utf8"), "route payload");
    const target = path.join(root, "series", "__next.series.__PAGE__.txt");
    assert.equal(await readFile(target, "utf8"), "route payload");
    await writeFile(target, "different");
    await assert.rejects(
      normalizeExport(root),
      /Conflicting exported route payload/,
    );
  } finally {
    assert.equal(path.dirname(path.resolve(root)), path.resolve(tmpdir()));
    assert.ok(path.basename(root).startsWith("tariqi-export-"));
    await rm(root, { recursive: true, force: true });
  }
});
