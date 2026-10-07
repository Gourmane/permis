# Redesign and functional audit — 2026-10-07

## Series 1: verified root cause and remaining blocker

The canonical ID is `series-01`; all 40 `s01-qNNN` question IDs and images exist. This is not a slug, index, navigation, or IndexedDB mismatch. All 40 question records contain `correctAnswers: []`, `needsReview: true`, and no verified answer timestamp. The source extraction report confirms the video did not reveal visually selected answers. The playable-content filter therefore returns zero questions.

The UI now explains this and opens the filtered source-content review rather than presenting a dead start control. A reusable session initializer rejects empty, duplicate, or unverified question sets. Content validation generates `reports/content-integrity.json`, including zero-playable-series blockers; `npm run validate-content:strict` fails on these blockers. The normal build preserves quarantined content and reports the blocker explicitly.

**Series 1 has NOT been made scoreable.** A trusted answer key, verified against the source explanation, is required. No answers were guessed and no questions were removed. All 13 playable series, 2–14, initialize at their first valid question in both unit and browser checks.

## UI and responsive changes

- Deep blue Arabic RTL app shell, original lightweight traffic-sign SVG pattern, white text, royal blue cards, yellow accents, and explicit green/red correction.
- Six colorful home destinations, series cards with question counts, progress, last/best score, continue/retry states, and a clear pending-content state.
- Desktop quiz has a bounded image/answer area on the left and series/progress/bookmark/question navigation on the right; tablet/mobile collapse into one column.
- Reusable answer controls permit multiple choices before confirmation. Correction stays visible until the user chooses the next question.
- Images preserve their source aspect ratio and cap at natural pixel width; zoom, extra zoom, and fullscreen remain available.
- Results show score and percentage, review-errors navigation, retry, wrong-only practice, and return-to-series actions.
- Mistake history retains earlier mistakes after mastery and now shows/toggles bookmarks directly.
- Local Noto fonts, themed focus states, reduced-motion support, large touch controls, and 44px section links.

## Latin digits

`src/lib/numbers.ts` forces `ar-MA-u-nu-latn` for numbers/dates. `Numeric` uses an LTR `bdi` for ratios and answer combinations. Old Arabic-Indic session/result labels are normalized on backup loading without changing stored question IDs, histories, bookmarks, or schema version. No extracted question images were altered.

## Additional fixes

- Finished results persist through page refresh using the saved latest result.
- Retrying from results clears the result screen only after the replacement session saves successfully.
- An unreadable stored progress record cannot be overwritten by normal quiz updates; explicit validated import/reset can recover it.
- A failed IndexedDB open can be retried.
- Next.js 16.4's Windows exporter passes native backslashes to its slash-only segment filename encoder, producing nested payload paths although the client requests dotted names. Tested `postbuild` normalization emits matching static payloads, preserves originals, and rejects conflicts. Browser console 404s are resolved for the exported site, not just hidden by the preview server.

## Verification

- `npm run lint`: PASS.
- `npm test`: PASS, 16 tests.
- `npm run build`: PASS, all static routes generated, 10 Windows route payloads normalized.
- `npm run test:browser`: PASS, 19 checks: all playable series, multiselect, correction, previous navigation, refresh, zoom, mistake history/mastery, bookmarks, correction PNG/ZIP, backup export/import validation, real reset and restore, responsive routes, runtime errors.
- `npm run test:quiz`: PASS: full 40-question run scores 39/40 with one intentionally incomplete multi-answer response; results survive reload; wrong-only/topic/mixed/mistake practice starts; statistics match; no runtime or console errors.
- Viewports: 360×800, 375×812, 390×844, 412×915, 430×932, 768×1024, 1366×768, 1440×900, 1920×1080. Main screens and quiz pass overflow/digit checks; question images never upscale beyond source width.
- Visual review: approved on refreshed desktop/mobile evidence; both reviewer findings resolved. See `reports/design-review.md`.
- Source data: 420 questions, 14 series, 380 verified playable questions, 40 pending source verification. Every image path exists.

## Manual intervention

Supply/verify the 40 answers for Series 1 and document the source evidence as described in README.md. Until then, strict content validation intentionally fails for `series-01`. Source-image text is not transcribed for screen readers; existing question alt text identifies the question only.
