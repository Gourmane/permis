# Answer Verification Audit

## Scope

- Date: 2026-10-07.
- Video 1 / Series 1: **SKIPPED intentionally**. Video 1 was not opened for extraction, playback, or hashing. No Series 1 question object or image was changed.
- Starting video/series: 2. Ending video/series: 14.
- 13 distinct original local MP4 files. Explicit series numbers in filenames match existing series mappings; hashes are distinct.
- 40 questions in each of Series 2–7; 20 in each of Series 8–14.

## Summary

| Measure | Count |
|---|---:|
| Videos audited | 13 |
| Series audited | 13 |
| Questions visually checked | 380 |
| Answer keys already correct | 370 |
| Incorrect keys found and corrected | 10 |
| Question-order / shifted answer or image pairing problems | 0 |
| Duplicate or missing numbered questions within a series | 0 |
| Question images showing corrections prematurely, repaired | 2 |
| Uncertain questions / manual review in audited scope | 0 |

## Evidence and method

Every numbered question and its correction were inspected visually in independently extracted full-resolution frames from the original local source video. The transcription was recorded before comparison with the existing key. No OCR or external driving rules supplied the answers. This was a frame-based visual audit; it does not claim uninterrupted real-time playback of every video.

Early Video 2 frames at 26/50/80/100/108s (Q1), 114/145/172s (Q2), and 182/200/206s (Q3) established the correction convention. Pale cyan/gray numbered overlays appear beside correct options in the question panel. Sidebar colors were not treated as answers. Every later correction was read from its explicit numbered overlays, including every simultaneous mark. Graphic theme changes retain this convention.

Fresh local evidence is in reports/answer-audit-evidence/ (ignored by Git to avoid committing bulk video-derived frames). The scoped extractor [audit-video-frames.py](../scripts/audit-video-frames.py) reproduces all frame pairs from originals and excludes Video 1. Original source hashes and timestamps below allow rechecking without these local images. [Independent observations](answer-audit-observations.json); [old/new row data](answer-audit-results.json).

All 380 existing WebPs were compared with the corresponding raw source frame using their exact crop dimensions. Mean absolute RGB differences ranged from 0.851 to 2.214 on the 0–255 scale, consistent with compression. This supports image identity, not answer correctness; numbering, options, and correction pairing were separately inspected visually. [Measurements](answer-audit-image-pairing.json).

## Source mapping

Hashes were checked before edits and rechecked afterward. Source videos are unchanged.

| Video / Series | Original filename | Questions | SHA-256 |
|---|---|---:|---|
| 2 | إمتحان تجريبي رقم 2 أصعب 40 سؤال.mp4 | 40 | 094aad92cc4373dc29b74a0213d3ac0e83793ed08f2026ee430f3c0d0295bcf4 |
| 3 | إمتحان تجريبي رقم 3 رخصة السياقة بالمغرب.mp4 | 40 | bed65506f775b942e1d76c7c46eaae180ce1e24a1e05ad37597ccc1a47d4c445 |
| 4 | إمتحان تجريبي رقم 4 أسئلة من أبرز الأسئلة المشابهة للإمتحان رخصة السياقة ب.mp4 | 40 | cf82d07a1fa969d77780788ced6ebeec449459ce5c036365dc200d744d2db70f |
| 5 | إمتحان تجريبي رقم 5, أسئلة من أبرز الأسئلة المشابهة للإمتحان رخصة السياقة ب.mp4 | 40 | 7ab36328e89a5bd8cc6075f59f64002378b041d05718b2048eaecda4408d0054 |
| 6 | إمتحان تجريبي رقم 6 ، اختبر معلوماتك قبل اجتياز امتحان رخصة السياقة.mp4 | 40 | b030c26d9d7bd3b793c78589d19ecbae2b91d30ef4824ab39de85e9d3af837ea |
| 7 | إمتحان تجريبي رقم 7 , اختبر معلوماتك قبل اجتياز امتحان رخصة السياقة بالتوفيق للجميع.mp4 | 40 | a4faad26c2beb9029626a0806eae5fac146fb714ff98d3a13bf47917483d34bf |
| 8 | إمتحان تجريبي رقم 8 ، إختبر معلوماتك قبل إجتياز امتحان رخصة السياقة.mp4 | 20 | 390302517beb7dc0e8d8489bb28d423e952f7fe78b32d4881bcb2facb7a3819c |
| 9 | إمتحان تجريبي رقم 9 ،أصعب 20 سؤال.mp4 | 20 | 57e476f08f9e1729452fbbacf4e6125e189059c0b1bae6ae1a2d0787be221ba5 |
| 10 | إمتحان تجريبي رقم 10 ، أصعب 20 سؤال 2026.mp4 | 20 | 2bea789b1ec1788b0a88c45e9dddb17be19f58c9073deaa92abb1db1e519cf38 |
| 11 | إمتحان تجريبي رقم 11، إختبر معلوماتك قبل إجتياز امتحان رخصة السياقة 2026.mp4 | 20 | d6cb947d563bf6bf254c8985c8947373d4b00d08a3d0f1fb4be528e3b3533a93 |
| 12 | إمتحان تجريبي رقم 12، أصعب 20 سؤال 2026.mp4 | 20 | 5e2619e928cfa17c2468817cddabebe098b8f51ce19eaf274e4c165c47a99a77 |
| 13 | إمتحان تجريبي رقم 13 إختبر معلوماتك قبل اجتياز امتحان رخصة السياقة.mp4 | 20 | 4a73511a1350e60de954123721599b40f1d9133b2837761160da52c516cdca4f |
| 14 | إمتحان تجريبي في أصعب 20 سؤال، إمتحان تجريبي رقم 14.mp4 | 20 | 04662e1dcbff554fdabc7ae04b4003f3fb5a349a8f0e4371d9524f040ddbf1df |

## Backup and changes

Original generated questions, series metadata, extraction metadata, and both affected WebPs were copied before mutations into [the dated backup](backups/answer-audit-2026-10-07/manifest.json). Its manifest records original hashes. The backup is outside public/ and is not deployed.

Only 10 answer keys and 2 question timestamps changed in production question JSON. IDs, numbering, source references, topics, other metadata, and Series 1 remain unchanged. Extraction answer metadata mirrors the visual observations; the generator respects the two clean-frame overrides to prevent restoring the old errors.

## Alignment and question-image fixes

No intro was counted as a question; every visible question number matches the dataset. Corrections belong to the same visible numbered question. Repeated subject matter across videos is source content, not an accidental duplicate extraction.

Two clean-question prefixes were dropped by the existing detector, which ignores segments shorter than 12 seconds. The selected question frames already contained correction overlays. Neither shifted subsequent questions. Earlier frames were inspected around both transitions:

| Question | Old frame | New clean frame | Correction | Key |
|---|---|---|---|---|
| S3 Q35 | 23:04 (1384s), marked 2 + 3 | [22:48 (1368s)](answer-audit-evidence/s03-boundary-1368.png) | 23:14 (1394s) | [2, 3], unchanged |
| S4 Q26 | 16:48 (1008s), marked 2 | [16:36 (996s)](answer-audit-evidence/s04-boundary-996.png) | 16:56 (1016s) | [2], unchanged |

## Application logic and integrity

- Existing exact-membership comparison ignored ordering and rejected subsets/supersets. No ordering or RTL value-mapping bug was found.
- Comparison now numerically sorts and removes duplicate selections, while empty sets and invalid values fail. Stored content keys must remain unique and sorted.
- Buttons display, toggle, and save the same values 1–4. Filtering, navigation, storage, and scoring use stable question IDs.
- Enhanced validation checks duplicate IDs/series numbers/question numbers, numbering gaps, canonical IDs/image paths, source consistency, invalid/duplicate/unsorted/empty keys, missing images, timestamps, and metadata.
- Empty keys explicitly marked needsReview remain isolated. Series 1 retains its existing 40 such records. The global strict check still fails on that intentionally skipped blocker.
- npm run validate-questions is an alias for the enhanced validator.

## Series 3 findings

All 40 questions and corrections were revalidated. 38 keys matched; Q21 and Q31 both had [2, 4] instead of the clearly visible [1, 4]. These are incorrect option transcriptions, not an off-by-one shift. Corrections are at 15:38 (938s) and 20:56 (1256s). Q35 had an answer-disclosing question image and was repaired separately.

## Verification

- Content validation: PASS, all 420 records structurally valid; 40 existing Series 1 records remain isolated.
- Unit/integration tests: PASS, 20 tests. All 380 video-transcribed keys; every possible selection (16 per question), reversed order, full per-series scoring, invalid/duplicate input, and both corrected Series 3 keys.
- Lint: PASS.
- Production build: PASS, TypeScript, 12 static pages, and route payload normalization. Initial build found two casts in intentional invalid-input tests; these were fixed before successful build.
- Chrome against production export: PASS, all 380 questions across all 13 series. Every image decoded, reversed video answer accepted, saved ID/value matched, full series score confirmed, and buttons 1–4 individually toggled in every series. [Browser results](answer-audit-browser.json).

## Manual review

None in Series 2–14. Series 1 was excluded entirely. Source typography occasionally repeats an unhighlighted option number (S4 Q31, S7 Q12/Q22); explicit correction numbers were clear and supplied the recorded keys.

## Per-series results

Every row compares the original app key to the visually observed correction. Question timestamps indicate a clear displayed frame, not an asserted exact first appearance.

## Series 2

Questions checked: 40. Matched: 39. Corrected: 1. Manual review: 0.

Source: إمتحان تجريبي رقم 2 أصعب 40 سؤال.mp4

Corrections:
- Q31: old [2, 4]; video [1, 4]; updated YES. Correction at 22:34 (1354s).

| Question / ID | Old key | Video key | Result | Question frame | Correction frame | App image / evidence |
|---|---|---|---|---|---|---|
| Q1 / s02-q001 | [2] | [2] | MATCH | 00:26 (26s) | 01:48 (108s) | [image](../public/questions/series-02/question-001.webp) / [question](answer-audit-evidence/s02-q001-question.jpg), [reveal](answer-audit-evidence/s02-q001-correction.jpg) |
| Q2 / s02-q002 | [1] | [1] | MATCH | 01:54 (114s) | 02:54 (174s) | [image](../public/questions/series-02/question-002.webp) / [question](answer-audit-evidence/s02-q002-question.jpg), [reveal](answer-audit-evidence/s02-q002-correction.jpg) |
| Q3 / s02-q003 | [1] | [1] | MATCH | 03:00 (180s) | 03:26 (206s) | [image](../public/questions/series-02/question-003.webp) / [question](answer-audit-evidence/s02-q003-question.jpg), [reveal](answer-audit-evidence/s02-q003-correction.jpg) |
| Q4 / s02-q004 | [1] | [1] | MATCH | 03:32 (212s) | 04:10 (250s) | [image](../public/questions/series-02/question-004.webp) / [question](answer-audit-evidence/s02-q004-question.jpg), [reveal](answer-audit-evidence/s02-q004-correction.jpg) |
| Q5 / s02-q005 | [3] | [3] | MATCH | 04:16 (256s) | 05:12 (312s) | [image](../public/questions/series-02/question-005.webp) / [question](answer-audit-evidence/s02-q005-question.jpg), [reveal](answer-audit-evidence/s02-q005-correction.jpg) |
| Q6 / s02-q006 | [2] | [2] | MATCH | 05:18 (318s) | 05:44 (344s) | [image](../public/questions/series-02/question-006.webp) / [question](answer-audit-evidence/s02-q006-question.jpg), [reveal](answer-audit-evidence/s02-q006-correction.jpg) |
| Q7 / s02-q007 | [3] | [3] | MATCH | 05:50 (350s) | 06:36 (396s) | [image](../public/questions/series-02/question-007.webp) / [question](answer-audit-evidence/s02-q007-question.jpg), [reveal](answer-audit-evidence/s02-q007-correction.jpg) |
| Q8 / s02-q008 | [2] | [2] | MATCH | 06:42 (402s) | 07:22 (442s) | [image](../public/questions/series-02/question-008.webp) / [question](answer-audit-evidence/s02-q008-question.jpg), [reveal](answer-audit-evidence/s02-q008-correction.jpg) |
| Q9 / s02-q009 | [1] | [1] | MATCH | 07:28 (448s) | 07:50 (470s) | [image](../public/questions/series-02/question-009.webp) / [question](answer-audit-evidence/s02-q009-question.jpg), [reveal](answer-audit-evidence/s02-q009-correction.jpg) |
| Q10 / s02-q010 | [2, 4] | [2, 4] | MATCH | 07:56 (476s) | 08:56 (536s) | [image](../public/questions/series-02/question-010.webp) / [question](answer-audit-evidence/s02-q010-question.jpg), [reveal](answer-audit-evidence/s02-q010-correction.jpg) |
| Q11 / s02-q011 | [1] | [1] | MATCH | 09:02 (542s) | 09:42 (582s) | [image](../public/questions/series-02/question-011.webp) / [question](answer-audit-evidence/s02-q011-question.jpg), [reveal](answer-audit-evidence/s02-q011-correction.jpg) |
| Q12 / s02-q012 | [2, 3] | [2, 3] | MATCH | 09:48 (588s) | 10:22 (622s) | [image](../public/questions/series-02/question-012.webp) / [question](answer-audit-evidence/s02-q012-question.jpg), [reveal](answer-audit-evidence/s02-q012-correction.jpg) |
| Q13 / s02-q013 | [3] | [3] | MATCH | 10:28 (628s) | 11:02 (662s) | [image](../public/questions/series-02/question-013.webp) / [question](answer-audit-evidence/s02-q013-question.jpg), [reveal](answer-audit-evidence/s02-q013-correction.jpg) |
| Q14 / s02-q014 | [1] | [1] | MATCH | 11:08 (668s) | 11:52 (712s) | [image](../public/questions/series-02/question-014.webp) / [question](answer-audit-evidence/s02-q014-question.jpg), [reveal](answer-audit-evidence/s02-q014-correction.jpg) |
| Q15 / s02-q015 | [1] | [1] | MATCH | 11:58 (718s) | 12:40 (760s) | [image](../public/questions/series-02/question-015.webp) / [question](answer-audit-evidence/s02-q015-question.jpg), [reveal](answer-audit-evidence/s02-q015-correction.jpg) |
| Q16 / s02-q016 | [2] | [2] | MATCH | 12:46 (766s) | 13:22 (802s) | [image](../public/questions/series-02/question-016.webp) / [question](answer-audit-evidence/s02-q016-question.jpg), [reveal](answer-audit-evidence/s02-q016-correction.jpg) |
| Q17 / s02-q017 | [2] | [2] | MATCH | 13:28 (808s) | 14:02 (842s) | [image](../public/questions/series-02/question-017.webp) / [question](answer-audit-evidence/s02-q017-question.jpg), [reveal](answer-audit-evidence/s02-q017-correction.jpg) |
| Q18 / s02-q018 | [1] | [1] | MATCH | 14:08 (848s) | 14:42 (882s) | [image](../public/questions/series-02/question-018.webp) / [question](answer-audit-evidence/s02-q018-question.jpg), [reveal](answer-audit-evidence/s02-q018-correction.jpg) |
| Q19 / s02-q019 | [2, 4] | [2, 4] | MATCH | 14:48 (888s) | 15:18 (918s) | [image](../public/questions/series-02/question-019.webp) / [question](answer-audit-evidence/s02-q019-question.jpg), [reveal](answer-audit-evidence/s02-q019-correction.jpg) |
| Q20 / s02-q020 | [2] | [2] | MATCH | 15:24 (924s) | 16:04 (964s) | [image](../public/questions/series-02/question-020.webp) / [question](answer-audit-evidence/s02-q020-question.jpg), [reveal](answer-audit-evidence/s02-q020-correction.jpg) |
| Q21 / s02-q021 | [3] | [3] | MATCH | 16:10 (970s) | 16:50 (1010s) | [image](../public/questions/series-02/question-021.webp) / [question](answer-audit-evidence/s02-q021-question.jpg), [reveal](answer-audit-evidence/s02-q021-correction.jpg) |
| Q22 / s02-q022 | [3] | [3] | MATCH | 16:56 (1016s) | 17:24 (1044s) | [image](../public/questions/series-02/question-022.webp) / [question](answer-audit-evidence/s02-q022-question.jpg), [reveal](answer-audit-evidence/s02-q022-correction.jpg) |
| Q23 / s02-q023 | [1] | [1] | MATCH | 17:30 (1050s) | 17:50 (1070s) | [image](../public/questions/series-02/question-023.webp) / [question](answer-audit-evidence/s02-q023-question.jpg), [reveal](answer-audit-evidence/s02-q023-correction.jpg) |
| Q24 / s02-q024 | [2] | [2] | MATCH | 17:56 (1076s) | 18:20 (1100s) | [image](../public/questions/series-02/question-024.webp) / [question](answer-audit-evidence/s02-q024-question.jpg), [reveal](answer-audit-evidence/s02-q024-correction.jpg) |
| Q25 / s02-q025 | [2, 4] | [2, 4] | MATCH | 18:26 (1106s) | 18:48 (1128s) | [image](../public/questions/series-02/question-025.webp) / [question](answer-audit-evidence/s02-q025-question.jpg), [reveal](answer-audit-evidence/s02-q025-correction.jpg) |
| Q26 / s02-q026 | [1, 2] | [1, 2] | MATCH | 18:54 (1134s) | 19:14 (1154s) | [image](../public/questions/series-02/question-026.webp) / [question](answer-audit-evidence/s02-q026-question.jpg), [reveal](answer-audit-evidence/s02-q026-correction.jpg) |
| Q27 / s02-q027 | [1] | [1] | MATCH | 19:20 (1160s) | 19:58 (1198s) | [image](../public/questions/series-02/question-027.webp) / [question](answer-audit-evidence/s02-q027-question.jpg), [reveal](answer-audit-evidence/s02-q027-correction.jpg) |
| Q28 / s02-q028 | [2] | [2] | MATCH | 20:04 (1204s) | 20:34 (1234s) | [image](../public/questions/series-02/question-028.webp) / [question](answer-audit-evidence/s02-q028-question.jpg), [reveal](answer-audit-evidence/s02-q028-correction.jpg) |
| Q29 / s02-q029 | [1] | [1] | MATCH | 20:40 (1240s) | 21:18 (1278s) | [image](../public/questions/series-02/question-029.webp) / [question](answer-audit-evidence/s02-q029-question.jpg), [reveal](answer-audit-evidence/s02-q029-correction.jpg) |
| Q30 / s02-q030 | [1, 2] | [1, 2] | MATCH | 21:24 (1284s) | 21:56 (1316s) | [image](../public/questions/series-02/question-030.webp) / [question](answer-audit-evidence/s02-q030-question.jpg), [reveal](answer-audit-evidence/s02-q030-correction.jpg) |
| Q31 / s02-q031 | [2, 4] | [1, 4] | CORRECTED | 22:02 (1322s) | 22:34 (1354s) | [image](../public/questions/series-02/question-031.webp) / [question](answer-audit-evidence/s02-q031-question.jpg), [reveal](answer-audit-evidence/s02-q031-correction.jpg) |
| Q32 / s02-q032 | [1] | [1] | MATCH | 22:40 (1360s) | 23:24 (1404s) | [image](../public/questions/series-02/question-032.webp) / [question](answer-audit-evidence/s02-q032-question.jpg), [reveal](answer-audit-evidence/s02-q032-correction.jpg) |
| Q33 / s02-q033 | [1] | [1] | MATCH | 23:30 (1410s) | 23:58 (1438s) | [image](../public/questions/series-02/question-033.webp) / [question](answer-audit-evidence/s02-q033-question.jpg), [reveal](answer-audit-evidence/s02-q033-correction.jpg) |
| Q34 / s02-q034 | [2, 3] | [2, 3] | MATCH | 24:04 (1444s) | 24:32 (1472s) | [image](../public/questions/series-02/question-034.webp) / [question](answer-audit-evidence/s02-q034-question.jpg), [reveal](answer-audit-evidence/s02-q034-correction.jpg) |
| Q35 / s02-q035 | [1] | [1] | MATCH | 24:38 (1478s) | 25:02 (1502s) | [image](../public/questions/series-02/question-035.webp) / [question](answer-audit-evidence/s02-q035-question.jpg), [reveal](answer-audit-evidence/s02-q035-correction.jpg) |
| Q36 / s02-q036 | [2] | [2] | MATCH | 25:08 (1508s) | 25:42 (1542s) | [image](../public/questions/series-02/question-036.webp) / [question](answer-audit-evidence/s02-q036-question.jpg), [reveal](answer-audit-evidence/s02-q036-correction.jpg) |
| Q37 / s02-q037 | [1] | [1] | MATCH | 25:48 (1548s) | 26:24 (1584s) | [image](../public/questions/series-02/question-037.webp) / [question](answer-audit-evidence/s02-q037-question.jpg), [reveal](answer-audit-evidence/s02-q037-correction.jpg) |
| Q38 / s02-q038 | [1] | [1] | MATCH | 26:30 (1590s) | 26:52 (1612s) | [image](../public/questions/series-02/question-038.webp) / [question](answer-audit-evidence/s02-q038-question.jpg), [reveal](answer-audit-evidence/s02-q038-correction.jpg) |
| Q39 / s02-q039 | [2] | [2] | MATCH | 26:58 (1618s) | 27:22 (1642s) | [image](../public/questions/series-02/question-039.webp) / [question](answer-audit-evidence/s02-q039-question.jpg), [reveal](answer-audit-evidence/s02-q039-correction.jpg) |
| Q40 / s02-q040 | [2] | [2] | MATCH | 27:28 (1648s) | 27:54 (1674s) | [image](../public/questions/series-02/question-040.webp) / [question](answer-audit-evidence/s02-q040-question.jpg), [reveal](answer-audit-evidence/s02-q040-correction.jpg) |

## Series 3

Questions checked: 40. Matched: 38. Corrected: 2. Manual review: 0.

Source: إمتحان تجريبي رقم 3 رخصة السياقة بالمغرب.mp4

Corrections:
- Q21: old [2, 4]; video [1, 4]; updated YES. Correction at 15:38 (938s).
- Q31: old [2, 4]; video [1, 4]; updated YES. Correction at 20:56 (1256s).

| Question / ID | Old key | Video key | Result | Question frame | Correction frame | App image / evidence |
|---|---|---|---|---|---|---|
| Q1 / s03-q001 | [2] | [2] | MATCH | 00:26 (26s) | 01:46 (106s) | [image](../public/questions/series-03/question-001.webp) / [question](answer-audit-evidence/s03-q001-question.jpg), [reveal](answer-audit-evidence/s03-q001-correction.jpg) |
| Q2 / s03-q002 | [3] | [3] | MATCH | 01:52 (112s) | 02:20 (140s) | [image](../public/questions/series-03/question-002.webp) / [question](answer-audit-evidence/s03-q002-question.jpg), [reveal](answer-audit-evidence/s03-q002-correction.jpg) |
| Q3 / s03-q003 | [1] | [1] | MATCH | 02:26 (146s) | 03:10 (190s) | [image](../public/questions/series-03/question-003.webp) / [question](answer-audit-evidence/s03-q003-question.jpg), [reveal](answer-audit-evidence/s03-q003-correction.jpg) |
| Q4 / s03-q004 | [1, 3] | [1, 3] | MATCH | 03:16 (196s) | 03:52 (232s) | [image](../public/questions/series-03/question-004.webp) / [question](answer-audit-evidence/s03-q004-question.jpg), [reveal](answer-audit-evidence/s03-q004-correction.jpg) |
| Q5 / s03-q005 | [1] | [1] | MATCH | 03:58 (238s) | 04:40 (280s) | [image](../public/questions/series-03/question-005.webp) / [question](answer-audit-evidence/s03-q005-question.jpg), [reveal](answer-audit-evidence/s03-q005-correction.jpg) |
| Q6 / s03-q006 | [2, 4] | [2, 4] | MATCH | 04:46 (286s) | 05:14 (314s) | [image](../public/questions/series-03/question-006.webp) / [question](answer-audit-evidence/s03-q006-question.jpg), [reveal](answer-audit-evidence/s03-q006-correction.jpg) |
| Q7 / s03-q007 | [1, 3] | [1, 3] | MATCH | 05:20 (320s) | 05:58 (358s) | [image](../public/questions/series-03/question-007.webp) / [question](answer-audit-evidence/s03-q007-question.jpg), [reveal](answer-audit-evidence/s03-q007-correction.jpg) |
| Q8 / s03-q008 | [1] | [1] | MATCH | 06:04 (364s) | 06:36 (396s) | [image](../public/questions/series-03/question-008.webp) / [question](answer-audit-evidence/s03-q008-question.jpg), [reveal](answer-audit-evidence/s03-q008-correction.jpg) |
| Q9 / s03-q009 | [3] | [3] | MATCH | 06:42 (402s) | 07:28 (448s) | [image](../public/questions/series-03/question-009.webp) / [question](answer-audit-evidence/s03-q009-question.jpg), [reveal](answer-audit-evidence/s03-q009-correction.jpg) |
| Q10 / s03-q010 | [2, 3] | [2, 3] | MATCH | 07:34 (454s) | 08:10 (490s) | [image](../public/questions/series-03/question-010.webp) / [question](answer-audit-evidence/s03-q010-question.jpg), [reveal](answer-audit-evidence/s03-q010-correction.jpg) |
| Q11 / s03-q011 | [1, 3] | [1, 3] | MATCH | 08:16 (496s) | 08:58 (538s) | [image](../public/questions/series-03/question-011.webp) / [question](answer-audit-evidence/s03-q011-question.jpg), [reveal](answer-audit-evidence/s03-q011-correction.jpg) |
| Q12 / s03-q012 | [2] | [2] | MATCH | 09:04 (544s) | 09:34 (574s) | [image](../public/questions/series-03/question-012.webp) / [question](answer-audit-evidence/s03-q012-question.jpg), [reveal](answer-audit-evidence/s03-q012-correction.jpg) |
| Q13 / s03-q013 | [1] | [1] | MATCH | 09:40 (580s) | 10:02 (602s) | [image](../public/questions/series-03/question-013.webp) / [question](answer-audit-evidence/s03-q013-question.jpg), [reveal](answer-audit-evidence/s03-q013-correction.jpg) |
| Q14 / s03-q014 | [1] | [1] | MATCH | 10:08 (608s) | 10:38 (638s) | [image](../public/questions/series-03/question-014.webp) / [question](answer-audit-evidence/s03-q014-question.jpg), [reveal](answer-audit-evidence/s03-q014-correction.jpg) |
| Q15 / s03-q015 | [1] | [1] | MATCH | 10:44 (644s) | 11:20 (680s) | [image](../public/questions/series-03/question-015.webp) / [question](answer-audit-evidence/s03-q015-question.jpg), [reveal](answer-audit-evidence/s03-q015-correction.jpg) |
| Q16 / s03-q016 | [1] | [1] | MATCH | 11:26 (686s) | 11:46 (706s) | [image](../public/questions/series-03/question-016.webp) / [question](answer-audit-evidence/s03-q016-question.jpg), [reveal](answer-audit-evidence/s03-q016-correction.jpg) |
| Q17 / s03-q017 | [1, 3] | [1, 3] | MATCH | 11:52 (712s) | 12:36 (756s) | [image](../public/questions/series-03/question-017.webp) / [question](answer-audit-evidence/s03-q017-question.jpg), [reveal](answer-audit-evidence/s03-q017-correction.jpg) |
| Q18 / s03-q018 | [2] | [2] | MATCH | 12:42 (762s) | 13:12 (792s) | [image](../public/questions/series-03/question-018.webp) / [question](answer-audit-evidence/s03-q018-question.jpg), [reveal](answer-audit-evidence/s03-q018-correction.jpg) |
| Q19 / s03-q019 | [2] | [2] | MATCH | 13:18 (798s) | 13:54 (834s) | [image](../public/questions/series-03/question-019.webp) / [question](answer-audit-evidence/s03-q019-question.jpg), [reveal](answer-audit-evidence/s03-q019-correction.jpg) |
| Q20 / s03-q020 | [2] | [2] | MATCH | 14:00 (840s) | 14:54 (894s) | [image](../public/questions/series-03/question-020.webp) / [question](answer-audit-evidence/s03-q020-question.jpg), [reveal](answer-audit-evidence/s03-q020-correction.jpg) |
| Q21 / s03-q021 | [2, 4] | [1, 4] | CORRECTED | 15:00 (900s) | 15:38 (938s) | [image](../public/questions/series-03/question-021.webp) / [question](answer-audit-evidence/s03-q021-question.jpg), [reveal](answer-audit-evidence/s03-q021-correction.jpg) |
| Q22 / s03-q022 | [1, 4] | [1, 4] | MATCH | 15:44 (944s) | 16:14 (974s) | [image](../public/questions/series-03/question-022.webp) / [question](answer-audit-evidence/s03-q022-question.jpg), [reveal](answer-audit-evidence/s03-q022-correction.jpg) |
| Q23 / s03-q023 | [2] | [2] | MATCH | 16:20 (980s) | 16:42 (1002s) | [image](../public/questions/series-03/question-023.webp) / [question](answer-audit-evidence/s03-q023-question.jpg), [reveal](answer-audit-evidence/s03-q023-correction.jpg) |
| Q24 / s03-q024 | [2] | [2] | MATCH | 16:48 (1008s) | 17:16 (1036s) | [image](../public/questions/series-03/question-024.webp) / [question](answer-audit-evidence/s03-q024-question.jpg), [reveal](answer-audit-evidence/s03-q024-correction.jpg) |
| Q25 / s03-q025 | [1] | [1] | MATCH | 17:22 (1042s) | 17:44 (1064s) | [image](../public/questions/series-03/question-025.webp) / [question](answer-audit-evidence/s03-q025-question.jpg), [reveal](answer-audit-evidence/s03-q025-correction.jpg) |
| Q26 / s03-q026 | [1, 2] | [1, 2] | MATCH | 17:50 (1070s) | 18:16 (1096s) | [image](../public/questions/series-03/question-026.webp) / [question](answer-audit-evidence/s03-q026-question.jpg), [reveal](answer-audit-evidence/s03-q026-correction.jpg) |
| Q27 / s03-q027 | [2] | [2] | MATCH | 18:22 (1102s) | 18:48 (1128s) | [image](../public/questions/series-03/question-027.webp) / [question](answer-audit-evidence/s03-q027-question.jpg), [reveal](answer-audit-evidence/s03-q027-correction.jpg) |
| Q28 / s03-q028 | [1] | [1] | MATCH | 18:54 (1134s) | 19:18 (1158s) | [image](../public/questions/series-03/question-028.webp) / [question](answer-audit-evidence/s03-q028-question.jpg), [reveal](answer-audit-evidence/s03-q028-correction.jpg) |
| Q29 / s03-q029 | [1] | [1] | MATCH | 19:24 (1164s) | 19:50 (1190s) | [image](../public/questions/series-03/question-029.webp) / [question](answer-audit-evidence/s03-q029-question.jpg), [reveal](answer-audit-evidence/s03-q029-correction.jpg) |
| Q30 / s03-q030 | [2, 4] | [2, 4] | MATCH | 19:56 (1196s) | 20:20 (1220s) | [image](../public/questions/series-03/question-030.webp) / [question](answer-audit-evidence/s03-q030-question.jpg), [reveal](answer-audit-evidence/s03-q030-correction.jpg) |
| Q31 / s03-q031 | [2, 4] | [1, 4] | CORRECTED | 20:26 (1226s) | 20:56 (1256s) | [image](../public/questions/series-03/question-031.webp) / [question](answer-audit-evidence/s03-q031-question.jpg), [reveal](answer-audit-evidence/s03-q031-correction.jpg) |
| Q32 / s03-q032 | [2] | [2] | MATCH | 21:02 (1262s) | 21:20 (1280s) | [image](../public/questions/series-03/question-032.webp) / [question](answer-audit-evidence/s03-q032-question.jpg), [reveal](answer-audit-evidence/s03-q032-correction.jpg) |
| Q33 / s03-q033 | [1, 3] | [1, 3] | MATCH | 21:26 (1286s) | 22:02 (1322s) | [image](../public/questions/series-03/question-033.webp) / [question](answer-audit-evidence/s03-q033-question.jpg), [reveal](answer-audit-evidence/s03-q033-correction.jpg) |
| Q34 / s03-q034 | [1] | [1] | MATCH | 22:08 (1328s) | 22:42 (1362s) | [image](../public/questions/series-03/question-034.webp) / [question](answer-audit-evidence/s03-q034-question.jpg), [reveal](answer-audit-evidence/s03-q034-correction.jpg) |
| Q35 / s03-q035 | [2, 3] | [2, 3] | MATCH | 22:48 (1368s) | 23:14 (1394s) | [image](../public/questions/series-03/question-035.webp) / [question](answer-audit-evidence/s03-boundary-1368.png), [reveal](answer-audit-evidence/s03-q035-correction.jpg) |
| Q36 / s03-q036 | [1] | [1] | MATCH | 23:20 (1400s) | 23:52 (1432s) | [image](../public/questions/series-03/question-036.webp) / [question](answer-audit-evidence/s03-q036-question.jpg), [reveal](answer-audit-evidence/s03-q036-correction.jpg) |
| Q37 / s03-q037 | [1, 3] | [1, 3] | MATCH | 23:58 (1438s) | 24:26 (1466s) | [image](../public/questions/series-03/question-037.webp) / [question](answer-audit-evidence/s03-q037-question.jpg), [reveal](answer-audit-evidence/s03-q037-correction.jpg) |
| Q38 / s03-q038 | [1] | [1] | MATCH | 24:32 (1472s) | 25:02 (1502s) | [image](../public/questions/series-03/question-038.webp) / [question](answer-audit-evidence/s03-q038-question.jpg), [reveal](answer-audit-evidence/s03-q038-correction.jpg) |
| Q39 / s03-q039 | [2] | [2] | MATCH | 25:08 (1508s) | 25:32 (1532s) | [image](../public/questions/series-03/question-039.webp) / [question](answer-audit-evidence/s03-q039-question.jpg), [reveal](answer-audit-evidence/s03-q039-correction.jpg) |
| Q40 / s03-q040 | [2] | [2] | MATCH | 25:38 (1538s) | 26:12 (1572s) | [image](../public/questions/series-03/question-040.webp) / [question](answer-audit-evidence/s03-q040-question.jpg), [reveal](answer-audit-evidence/s03-q040-correction.jpg) |

## Series 4

Questions checked: 40. Matched: 39. Corrected: 1. Manual review: 0.

Source: إمتحان تجريبي رقم 4 أسئلة من أبرز الأسئلة المشابهة للإمتحان رخصة السياقة ب.mp4

Corrections:
- Q33: old [2, 4]; video [1, 4]; updated YES. Correction at 21:08 (1268s).

| Question / ID | Old key | Video key | Result | Question frame | Correction frame | App image / evidence |
|---|---|---|---|---|---|---|
| Q1 / s04-q001 | [1] | [1] | MATCH | 00:26 (26s) | 01:48 (108s) | [image](../public/questions/series-04/question-001.webp) / [question](answer-audit-evidence/s04-q001-question.jpg), [reveal](answer-audit-evidence/s04-q001-correction.jpg) |
| Q2 / s04-q002 | [1] | [1] | MATCH | 01:54 (114s) | 02:28 (148s) | [image](../public/questions/series-04/question-002.webp) / [question](answer-audit-evidence/s04-q002-question.jpg), [reveal](answer-audit-evidence/s04-q002-correction.jpg) |
| Q3 / s04-q003 | [3] | [3] | MATCH | 02:34 (154s) | 03:04 (184s) | [image](../public/questions/series-04/question-003.webp) / [question](answer-audit-evidence/s04-q003-question.jpg), [reveal](answer-audit-evidence/s04-q003-correction.jpg) |
| Q4 / s04-q004 | [1, 3] | [1, 3] | MATCH | 03:10 (190s) | 04:02 (242s) | [image](../public/questions/series-04/question-004.webp) / [question](answer-audit-evidence/s04-q004-question.jpg), [reveal](answer-audit-evidence/s04-q004-correction.jpg) |
| Q5 / s04-q005 | [1] | [1] | MATCH | 04:08 (248s) | 04:36 (276s) | [image](../public/questions/series-04/question-005.webp) / [question](answer-audit-evidence/s04-q005-question.jpg), [reveal](answer-audit-evidence/s04-q005-correction.jpg) |
| Q6 / s04-q006 | [1, 3] | [1, 3] | MATCH | 04:42 (282s) | 05:12 (312s) | [image](../public/questions/series-04/question-006.webp) / [question](answer-audit-evidence/s04-q006-question.jpg), [reveal](answer-audit-evidence/s04-q006-correction.jpg) |
| Q7 / s04-q007 | [2] | [2] | MATCH | 05:18 (318s) | 05:50 (350s) | [image](../public/questions/series-04/question-007.webp) / [question](answer-audit-evidence/s04-q007-question.jpg), [reveal](answer-audit-evidence/s04-q007-correction.jpg) |
| Q8 / s04-q008 | [2] | [2] | MATCH | 05:56 (356s) | 06:22 (382s) | [image](../public/questions/series-04/question-008.webp) / [question](answer-audit-evidence/s04-q008-question.jpg), [reveal](answer-audit-evidence/s04-q008-correction.jpg) |
| Q9 / s04-q009 | [2] | [2] | MATCH | 06:28 (388s) | 06:54 (414s) | [image](../public/questions/series-04/question-009.webp) / [question](answer-audit-evidence/s04-q009-question.jpg), [reveal](answer-audit-evidence/s04-q009-correction.jpg) |
| Q10 / s04-q010 | [3] | [3] | MATCH | 07:00 (420s) | 07:32 (452s) | [image](../public/questions/series-04/question-010.webp) / [question](answer-audit-evidence/s04-q010-question.jpg), [reveal](answer-audit-evidence/s04-q010-correction.jpg) |
| Q11 / s04-q011 | [1] | [1] | MATCH | 07:38 (458s) | 08:02 (482s) | [image](../public/questions/series-04/question-011.webp) / [question](answer-audit-evidence/s04-q011-question.jpg), [reveal](answer-audit-evidence/s04-q011-correction.jpg) |
| Q12 / s04-q012 | [1] | [1] | MATCH | 08:08 (488s) | 08:36 (516s) | [image](../public/questions/series-04/question-012.webp) / [question](answer-audit-evidence/s04-q012-question.jpg), [reveal](answer-audit-evidence/s04-q012-correction.jpg) |
| Q13 / s04-q013 | [2, 3] | [2, 3] | MATCH | 08:42 (522s) | 09:18 (558s) | [image](../public/questions/series-04/question-013.webp) / [question](answer-audit-evidence/s04-q013-question.jpg), [reveal](answer-audit-evidence/s04-q013-correction.jpg) |
| Q14 / s04-q014 | [1, 4] | [1, 4] | MATCH | 09:24 (564s) | 10:00 (600s) | [image](../public/questions/series-04/question-014.webp) / [question](answer-audit-evidence/s04-q014-question.jpg), [reveal](answer-audit-evidence/s04-q014-correction.jpg) |
| Q15 / s04-q015 | [1] | [1] | MATCH | 10:06 (606s) | 10:40 (640s) | [image](../public/questions/series-04/question-015.webp) / [question](answer-audit-evidence/s04-q015-question.jpg), [reveal](answer-audit-evidence/s04-q015-correction.jpg) |
| Q16 / s04-q016 | [2] | [2] | MATCH | 10:46 (646s) | 11:20 (680s) | [image](../public/questions/series-04/question-016.webp) / [question](answer-audit-evidence/s04-q016-question.jpg), [reveal](answer-audit-evidence/s04-q016-correction.jpg) |
| Q17 / s04-q017 | [1, 3] | [1, 3] | MATCH | 11:26 (686s) | 11:50 (710s) | [image](../public/questions/series-04/question-017.webp) / [question](answer-audit-evidence/s04-q017-question.jpg), [reveal](answer-audit-evidence/s04-q017-correction.jpg) |
| Q18 / s04-q018 | [1] | [1] | MATCH | 11:56 (716s) | 12:20 (740s) | [image](../public/questions/series-04/question-018.webp) / [question](answer-audit-evidence/s04-q018-question.jpg), [reveal](answer-audit-evidence/s04-q018-correction.jpg) |
| Q19 / s04-q019 | [2] | [2] | MATCH | 12:26 (746s) | 13:02 (782s) | [image](../public/questions/series-04/question-019.webp) / [question](answer-audit-evidence/s04-q019-question.jpg), [reveal](answer-audit-evidence/s04-q019-correction.jpg) |
| Q20 / s04-q020 | [2] | [2] | MATCH | 13:08 (788s) | 13:28 (808s) | [image](../public/questions/series-04/question-020.webp) / [question](answer-audit-evidence/s04-q020-question.jpg), [reveal](answer-audit-evidence/s04-q020-correction.jpg) |
| Q21 / s04-q021 | [3, 4] | [3, 4] | MATCH | 13:34 (814s) | 14:14 (854s) | [image](../public/questions/series-04/question-021.webp) / [question](answer-audit-evidence/s04-q021-question.jpg), [reveal](answer-audit-evidence/s04-q021-correction.jpg) |
| Q22 / s04-q022 | [1, 3] | [1, 3] | MATCH | 14:20 (860s) | 14:46 (886s) | [image](../public/questions/series-04/question-022.webp) / [question](answer-audit-evidence/s04-q022-question.jpg), [reveal](answer-audit-evidence/s04-q022-correction.jpg) |
| Q23 / s04-q023 | [2] | [2] | MATCH | 14:52 (892s) | 15:18 (918s) | [image](../public/questions/series-04/question-023.webp) / [question](answer-audit-evidence/s04-q023-question.jpg), [reveal](answer-audit-evidence/s04-q023-correction.jpg) |
| Q24 / s04-q024 | [3] | [3] | MATCH | 15:24 (924s) | 15:52 (952s) | [image](../public/questions/series-04/question-024.webp) / [question](answer-audit-evidence/s04-q024-question.jpg), [reveal](answer-audit-evidence/s04-q024-correction.jpg) |
| Q25 / s04-q025 | [1] | [1] | MATCH | 15:58 (958s) | 16:30 (990s) | [image](../public/questions/series-04/question-025.webp) / [question](answer-audit-evidence/s04-q025-question.jpg), [reveal](answer-audit-evidence/s04-q025-correction.jpg) |
| Q26 / s04-q026 | [2] | [2] | MATCH | 16:36 (996s) | 16:56 (1016s) | [image](../public/questions/series-04/question-026.webp) / [question](answer-audit-evidence/s04-boundary-996.png), [reveal](answer-audit-evidence/s04-q026-correction.jpg) |
| Q27 / s04-q027 | [2] | [2] | MATCH | 17:02 (1022s) | 17:18 (1038s) | [image](../public/questions/series-04/question-027.webp) / [question](answer-audit-evidence/s04-q027-question.jpg), [reveal](answer-audit-evidence/s04-q027-correction.jpg) |
| Q28 / s04-q028 | [1] | [1] | MATCH | 17:24 (1044s) | 18:16 (1096s) | [image](../public/questions/series-04/question-028.webp) / [question](answer-audit-evidence/s04-q028-question.jpg), [reveal](answer-audit-evidence/s04-q028-correction.jpg) |
| Q29 / s04-q029 | [2, 4] | [2, 4] | MATCH | 18:22 (1102s) | 18:40 (1120s) | [image](../public/questions/series-04/question-029.webp) / [question](answer-audit-evidence/s04-q029-question.jpg), [reveal](answer-audit-evidence/s04-q029-correction.jpg) |
| Q30 / s04-q030 | [2] | [2] | MATCH | 18:46 (1126s) | 19:14 (1154s) | [image](../public/questions/series-04/question-030.webp) / [question](answer-audit-evidence/s04-q030-question.jpg), [reveal](answer-audit-evidence/s04-q030-correction.jpg) |
| Q31 / s04-q031 | [2, 3] | [2, 3] | MATCH | 19:20 (1160s) | 20:04 (1204s) | [image](../public/questions/series-04/question-031.webp) / [question](answer-audit-evidence/s04-q031-question.jpg), [reveal](answer-audit-evidence/s04-q031-correction.jpg) |
| Q32 / s04-q032 | [2] | [2] | MATCH | 20:10 (1210s) | 20:38 (1238s) | [image](../public/questions/series-04/question-032.webp) / [question](answer-audit-evidence/s04-q032-question.jpg), [reveal](answer-audit-evidence/s04-q032-correction.jpg) |
| Q33 / s04-q033 | [2, 4] | [1, 4] | CORRECTED | 20:44 (1244s) | 21:08 (1268s) | [image](../public/questions/series-04/question-033.webp) / [question](answer-audit-evidence/s04-q033-question.jpg), [reveal](answer-audit-evidence/s04-q033-correction.jpg) |
| Q34 / s04-q034 | [1] | [1] | MATCH | 21:14 (1274s) | 21:40 (1300s) | [image](../public/questions/series-04/question-034.webp) / [question](answer-audit-evidence/s04-q034-question.jpg), [reveal](answer-audit-evidence/s04-q034-correction.jpg) |
| Q35 / s04-q035 | [2] | [2] | MATCH | 21:46 (1306s) | 22:06 (1326s) | [image](../public/questions/series-04/question-035.webp) / [question](answer-audit-evidence/s04-q035-question.jpg), [reveal](answer-audit-evidence/s04-q035-correction.jpg) |
| Q36 / s04-q036 | [1, 3] | [1, 3] | MATCH | 22:12 (1332s) | 22:40 (1360s) | [image](../public/questions/series-04/question-036.webp) / [question](answer-audit-evidence/s04-q036-question.jpg), [reveal](answer-audit-evidence/s04-q036-correction.jpg) |
| Q37 / s04-q037 | [2] | [2] | MATCH | 22:46 (1366s) | 23:14 (1394s) | [image](../public/questions/series-04/question-037.webp) / [question](answer-audit-evidence/s04-q037-question.jpg), [reveal](answer-audit-evidence/s04-q037-correction.jpg) |
| Q38 / s04-q038 | [1] | [1] | MATCH | 23:20 (1400s) | 23:52 (1432s) | [image](../public/questions/series-04/question-038.webp) / [question](answer-audit-evidence/s04-q038-question.jpg), [reveal](answer-audit-evidence/s04-q038-correction.jpg) |
| Q39 / s04-q039 | [1] | [1] | MATCH | 23:58 (1438s) | 24:20 (1460s) | [image](../public/questions/series-04/question-039.webp) / [question](answer-audit-evidence/s04-q039-question.jpg), [reveal](answer-audit-evidence/s04-q039-correction.jpg) |
| Q40 / s04-q040 | [1, 2] | [1, 2] | MATCH | 24:26 (1466s) | 24:54 (1494s) | [image](../public/questions/series-04/question-040.webp) / [question](answer-audit-evidence/s04-q040-question.jpg), [reveal](answer-audit-evidence/s04-q040-correction.jpg) |

## Series 5

Questions checked: 40. Matched: 39. Corrected: 1. Manual review: 0.

Source: إمتحان تجريبي رقم 5, أسئلة من أبرز الأسئلة المشابهة للإمتحان رخصة السياقة ب.mp4

Corrections:
- Q39: old [2]; video [1]; updated YES. Correction at 26:10 (1570s).

| Question / ID | Old key | Video key | Result | Question frame | Correction frame | App image / evidence |
|---|---|---|---|---|---|---|
| Q1 / s05-q001 | [1] | [1] | MATCH | 00:26 (26s) | 01:18 (78s) | [image](../public/questions/series-05/question-001.webp) / [question](answer-audit-evidence/s05-q001-question.jpg), [reveal](answer-audit-evidence/s05-q001-correction.jpg) |
| Q2 / s05-q002 | [2] | [2] | MATCH | 01:24 (84s) | 01:54 (114s) | [image](../public/questions/series-05/question-002.webp) / [question](answer-audit-evidence/s05-q002-question.jpg), [reveal](answer-audit-evidence/s05-q002-correction.jpg) |
| Q3 / s05-q003 | [1] | [1] | MATCH | 02:00 (120s) | 02:56 (176s) | [image](../public/questions/series-05/question-003.webp) / [question](answer-audit-evidence/s05-q003-question.jpg), [reveal](answer-audit-evidence/s05-q003-correction.jpg) |
| Q4 / s05-q004 | [3] | [3] | MATCH | 03:02 (182s) | 04:04 (244s) | [image](../public/questions/series-05/question-004.webp) / [question](answer-audit-evidence/s05-q004-question.jpg), [reveal](answer-audit-evidence/s05-q004-correction.jpg) |
| Q5 / s05-q005 | [3] | [3] | MATCH | 04:10 (250s) | 04:56 (296s) | [image](../public/questions/series-05/question-005.webp) / [question](answer-audit-evidence/s05-q005-question.jpg), [reveal](answer-audit-evidence/s05-q005-correction.jpg) |
| Q6 / s05-q006 | [2] | [2] | MATCH | 05:02 (302s) | 05:42 (342s) | [image](../public/questions/series-05/question-006.webp) / [question](answer-audit-evidence/s05-q006-question.jpg), [reveal](answer-audit-evidence/s05-q006-correction.jpg) |
| Q7 / s05-q007 | [2] | [2] | MATCH | 05:48 (348s) | 06:18 (378s) | [image](../public/questions/series-05/question-007.webp) / [question](answer-audit-evidence/s05-q007-question.jpg), [reveal](answer-audit-evidence/s05-q007-correction.jpg) |
| Q8 / s05-q008 | [3] | [3] | MATCH | 06:24 (384s) | 07:20 (440s) | [image](../public/questions/series-05/question-008.webp) / [question](answer-audit-evidence/s05-q008-question.jpg), [reveal](answer-audit-evidence/s05-q008-correction.jpg) |
| Q9 / s05-q009 | [2, 3] | [2, 3] | MATCH | 07:26 (446s) | 08:04 (484s) | [image](../public/questions/series-05/question-009.webp) / [question](answer-audit-evidence/s05-q009-question.jpg), [reveal](answer-audit-evidence/s05-q009-correction.jpg) |
| Q10 / s05-q010 | [1, 2] | [1, 2] | MATCH | 08:10 (490s) | 08:46 (526s) | [image](../public/questions/series-05/question-010.webp) / [question](answer-audit-evidence/s05-q010-question.jpg), [reveal](answer-audit-evidence/s05-q010-correction.jpg) |
| Q11 / s05-q011 | [2] | [2] | MATCH | 08:52 (532s) | 09:28 (568s) | [image](../public/questions/series-05/question-011.webp) / [question](answer-audit-evidence/s05-q011-question.jpg), [reveal](answer-audit-evidence/s05-q011-correction.jpg) |
| Q12 / s05-q012 | [1] | [1] | MATCH | 09:34 (574s) | 09:58 (598s) | [image](../public/questions/series-05/question-012.webp) / [question](answer-audit-evidence/s05-q012-question.jpg), [reveal](answer-audit-evidence/s05-q012-correction.jpg) |
| Q13 / s05-q013 | [1, 3] | [1, 3] | MATCH | 10:04 (604s) | 10:54 (654s) | [image](../public/questions/series-05/question-013.webp) / [question](answer-audit-evidence/s05-q013-question.jpg), [reveal](answer-audit-evidence/s05-q013-correction.jpg) |
| Q14 / s05-q014 | [2, 3] | [2, 3] | MATCH | 11:00 (660s) | 11:46 (706s) | [image](../public/questions/series-05/question-014.webp) / [question](answer-audit-evidence/s05-q014-question.jpg), [reveal](answer-audit-evidence/s05-q014-correction.jpg) |
| Q15 / s05-q015 | [2] | [2] | MATCH | 11:52 (712s) | 12:16 (736s) | [image](../public/questions/series-05/question-015.webp) / [question](answer-audit-evidence/s05-q015-question.jpg), [reveal](answer-audit-evidence/s05-q015-correction.jpg) |
| Q16 / s05-q016 | [1] | [1] | MATCH | 12:22 (742s) | 12:52 (772s) | [image](../public/questions/series-05/question-016.webp) / [question](answer-audit-evidence/s05-q016-question.jpg), [reveal](answer-audit-evidence/s05-q016-correction.jpg) |
| Q17 / s05-q017 | [2, 4] | [2, 4] | MATCH | 12:58 (778s) | 13:32 (812s) | [image](../public/questions/series-05/question-017.webp) / [question](answer-audit-evidence/s05-q017-question.jpg), [reveal](answer-audit-evidence/s05-q017-correction.jpg) |
| Q18 / s05-q018 | [1] | [1] | MATCH | 13:38 (818s) | 14:02 (842s) | [image](../public/questions/series-05/question-018.webp) / [question](answer-audit-evidence/s05-q018-question.jpg), [reveal](answer-audit-evidence/s05-q018-correction.jpg) |
| Q19 / s05-q019 | [2] | [2] | MATCH | 14:08 (848s) | 14:34 (874s) | [image](../public/questions/series-05/question-019.webp) / [question](answer-audit-evidence/s05-q019-question.jpg), [reveal](answer-audit-evidence/s05-q019-correction.jpg) |
| Q20 / s05-q020 | [2] | [2] | MATCH | 14:40 (880s) | 15:04 (904s) | [image](../public/questions/series-05/question-020.webp) / [question](answer-audit-evidence/s05-q020-question.jpg), [reveal](answer-audit-evidence/s05-q020-correction.jpg) |
| Q21 / s05-q021 | [1, 2, 4] | [1, 2, 4] | MATCH | 15:10 (910s) | 16:12 (972s) | [image](../public/questions/series-05/question-021.webp) / [question](answer-audit-evidence/s05-q021-question.jpg), [reveal](answer-audit-evidence/s05-q021-correction.jpg) |
| Q22 / s05-q022 | [2] | [2] | MATCH | 16:18 (978s) | 16:58 (1018s) | [image](../public/questions/series-05/question-022.webp) / [question](answer-audit-evidence/s05-q022-question.jpg), [reveal](answer-audit-evidence/s05-q022-correction.jpg) |
| Q23 / s05-q023 | [1] | [1] | MATCH | 17:04 (1024s) | 17:22 (1042s) | [image](../public/questions/series-05/question-023.webp) / [question](answer-audit-evidence/s05-q023-question.jpg), [reveal](answer-audit-evidence/s05-q023-correction.jpg) |
| Q24 / s05-q024 | [2] | [2] | MATCH | 17:28 (1048s) | 17:52 (1072s) | [image](../public/questions/series-05/question-024.webp) / [question](answer-audit-evidence/s05-q024-question.jpg), [reveal](answer-audit-evidence/s05-q024-correction.jpg) |
| Q25 / s05-q025 | [2] | [2] | MATCH | 17:58 (1078s) | 18:24 (1104s) | [image](../public/questions/series-05/question-025.webp) / [question](answer-audit-evidence/s05-q025-question.jpg), [reveal](answer-audit-evidence/s05-q025-correction.jpg) |
| Q26 / s05-q026 | [2] | [2] | MATCH | 18:30 (1110s) | 18:56 (1136s) | [image](../public/questions/series-05/question-026.webp) / [question](answer-audit-evidence/s05-q026-question.jpg), [reveal](answer-audit-evidence/s05-q026-correction.jpg) |
| Q27 / s05-q027 | [2] | [2] | MATCH | 19:02 (1142s) | 19:24 (1164s) | [image](../public/questions/series-05/question-027.webp) / [question](answer-audit-evidence/s05-q027-question.jpg), [reveal](answer-audit-evidence/s05-q027-correction.jpg) |
| Q28 / s05-q028 | [1, 3] | [1, 3] | MATCH | 19:30 (1170s) | 19:52 (1192s) | [image](../public/questions/series-05/question-028.webp) / [question](answer-audit-evidence/s05-q028-question.jpg), [reveal](answer-audit-evidence/s05-q028-correction.jpg) |
| Q29 / s05-q029 | [2] | [2] | MATCH | 19:58 (1198s) | 20:26 (1226s) | [image](../public/questions/series-05/question-029.webp) / [question](answer-audit-evidence/s05-q029-question.jpg), [reveal](answer-audit-evidence/s05-q029-correction.jpg) |
| Q30 / s05-q030 | [1] | [1] | MATCH | 20:32 (1232s) | 20:50 (1250s) | [image](../public/questions/series-05/question-030.webp) / [question](answer-audit-evidence/s05-q030-question.jpg), [reveal](answer-audit-evidence/s05-q030-correction.jpg) |
| Q31 / s05-q031 | [3] | [3] | MATCH | 20:56 (1256s) | 21:22 (1282s) | [image](../public/questions/series-05/question-031.webp) / [question](answer-audit-evidence/s05-q031-question.jpg), [reveal](answer-audit-evidence/s05-q031-correction.jpg) |
| Q32 / s05-q032 | [1] | [1] | MATCH | 21:28 (1288s) | 21:52 (1312s) | [image](../public/questions/series-05/question-032.webp) / [question](answer-audit-evidence/s05-q032-question.jpg), [reveal](answer-audit-evidence/s05-q032-correction.jpg) |
| Q33 / s05-q033 | [1] | [1] | MATCH | 21:58 (1318s) | 22:20 (1340s) | [image](../public/questions/series-05/question-033.webp) / [question](answer-audit-evidence/s05-q033-question.jpg), [reveal](answer-audit-evidence/s05-q033-correction.jpg) |
| Q34 / s05-q034 | [1, 3] | [1, 3] | MATCH | 22:26 (1346s) | 22:56 (1376s) | [image](../public/questions/series-05/question-034.webp) / [question](answer-audit-evidence/s05-q034-question.jpg), [reveal](answer-audit-evidence/s05-q034-correction.jpg) |
| Q35 / s05-q035 | [3] | [3] | MATCH | 23:02 (1382s) | 23:30 (1410s) | [image](../public/questions/series-05/question-035.webp) / [question](answer-audit-evidence/s05-q035-question.jpg), [reveal](answer-audit-evidence/s05-q035-correction.jpg) |
| Q36 / s05-q036 | [2, 4] | [2, 4] | MATCH | 23:36 (1416s) | 24:22 (1462s) | [image](../public/questions/series-05/question-036.webp) / [question](answer-audit-evidence/s05-q036-question.jpg), [reveal](answer-audit-evidence/s05-q036-correction.jpg) |
| Q37 / s05-q037 | [1, 2] | [1, 2] | MATCH | 24:28 (1468s) | 25:16 (1516s) | [image](../public/questions/series-05/question-037.webp) / [question](answer-audit-evidence/s05-q037-question.jpg), [reveal](answer-audit-evidence/s05-q037-correction.jpg) |
| Q38 / s05-q038 | [3] | [3] | MATCH | 25:22 (1522s) | 25:44 (1544s) | [image](../public/questions/series-05/question-038.webp) / [question](answer-audit-evidence/s05-q038-question.jpg), [reveal](answer-audit-evidence/s05-q038-correction.jpg) |
| Q39 / s05-q039 | [2] | [1] | CORRECTED | 25:50 (1550s) | 26:10 (1570s) | [image](../public/questions/series-05/question-039.webp) / [question](answer-audit-evidence/s05-q039-question.jpg), [reveal](answer-audit-evidence/s05-q039-correction.jpg) |
| Q40 / s05-q040 | [2] | [2] | MATCH | 26:16 (1576s) | 26:44 (1604s) | [image](../public/questions/series-05/question-040.webp) / [question](answer-audit-evidence/s05-q040-question.jpg), [reveal](answer-audit-evidence/s05-q040-correction.jpg) |

## Series 6

Questions checked: 40. Matched: 40. Corrected: 0. Manual review: 0.

Source: إمتحان تجريبي رقم 6 ، اختبر معلوماتك قبل اجتياز امتحان رخصة السياقة.mp4

Corrections:
None.

| Question / ID | Old key | Video key | Result | Question frame | Correction frame | App image / evidence |
|---|---|---|---|---|---|---|
| Q1 / s06-q001 | [1] | [1] | MATCH | 00:26 (26s) | 01:06 (66s) | [image](../public/questions/series-06/question-001.webp) / [question](answer-audit-evidence/s06-q001-question.jpg), [reveal](answer-audit-evidence/s06-q001-correction.jpg) |
| Q2 / s06-q002 | [1] | [1] | MATCH | 01:12 (72s) | 01:48 (108s) | [image](../public/questions/series-06/question-002.webp) / [question](answer-audit-evidence/s06-q002-question.jpg), [reveal](answer-audit-evidence/s06-q002-correction.jpg) |
| Q3 / s06-q003 | [2] | [2] | MATCH | 01:54 (114s) | 02:20 (140s) | [image](../public/questions/series-06/question-003.webp) / [question](answer-audit-evidence/s06-q003-question.jpg), [reveal](answer-audit-evidence/s06-q003-correction.jpg) |
| Q4 / s06-q004 | [2] | [2] | MATCH | 02:26 (146s) | 03:06 (186s) | [image](../public/questions/series-06/question-004.webp) / [question](answer-audit-evidence/s06-q004-question.jpg), [reveal](answer-audit-evidence/s06-q004-correction.jpg) |
| Q5 / s06-q005 | [2] | [2] | MATCH | 03:12 (192s) | 03:36 (216s) | [image](../public/questions/series-06/question-005.webp) / [question](answer-audit-evidence/s06-q005-question.jpg), [reveal](answer-audit-evidence/s06-q005-correction.jpg) |
| Q6 / s06-q006 | [1, 3] | [1, 3] | MATCH | 03:42 (222s) | 04:14 (254s) | [image](../public/questions/series-06/question-006.webp) / [question](answer-audit-evidence/s06-q006-question.jpg), [reveal](answer-audit-evidence/s06-q006-correction.jpg) |
| Q7 / s06-q007 | [3] | [3] | MATCH | 04:20 (260s) | 04:52 (292s) | [image](../public/questions/series-06/question-007.webp) / [question](answer-audit-evidence/s06-q007-question.jpg), [reveal](answer-audit-evidence/s06-q007-correction.jpg) |
| Q8 / s06-q008 | [1, 4] | [1, 4] | MATCH | 04:58 (298s) | 05:38 (338s) | [image](../public/questions/series-06/question-008.webp) / [question](answer-audit-evidence/s06-q008-question.jpg), [reveal](answer-audit-evidence/s06-q008-correction.jpg) |
| Q9 / s06-q009 | [1, 4] | [1, 4] | MATCH | 05:44 (344s) | 06:14 (374s) | [image](../public/questions/series-06/question-009.webp) / [question](answer-audit-evidence/s06-q009-question.jpg), [reveal](answer-audit-evidence/s06-q009-correction.jpg) |
| Q10 / s06-q010 | [2, 4] | [2, 4] | MATCH | 06:20 (380s) | 06:48 (408s) | [image](../public/questions/series-06/question-010.webp) / [question](answer-audit-evidence/s06-q010-question.jpg), [reveal](answer-audit-evidence/s06-q010-correction.jpg) |
| Q11 / s06-q011 | [2] | [2] | MATCH | 06:54 (414s) | 07:22 (442s) | [image](../public/questions/series-06/question-011.webp) / [question](answer-audit-evidence/s06-q011-question.jpg), [reveal](answer-audit-evidence/s06-q011-correction.jpg) |
| Q12 / s06-q012 | [1, 3, 4] | [1, 3, 4] | MATCH | 07:28 (448s) | 08:04 (484s) | [image](../public/questions/series-06/question-012.webp) / [question](answer-audit-evidence/s06-q012-question.jpg), [reveal](answer-audit-evidence/s06-q012-correction.jpg) |
| Q13 / s06-q013 | [2] | [2] | MATCH | 08:10 (490s) | 08:34 (514s) | [image](../public/questions/series-06/question-013.webp) / [question](answer-audit-evidence/s06-q013-question.jpg), [reveal](answer-audit-evidence/s06-q013-correction.jpg) |
| Q14 / s06-q014 | [1] | [1] | MATCH | 08:40 (520s) | 09:06 (546s) | [image](../public/questions/series-06/question-014.webp) / [question](answer-audit-evidence/s06-q014-question.jpg), [reveal](answer-audit-evidence/s06-q014-correction.jpg) |
| Q15 / s06-q015 | [2, 3] | [2, 3] | MATCH | 09:12 (552s) | 09:40 (580s) | [image](../public/questions/series-06/question-015.webp) / [question](answer-audit-evidence/s06-q015-question.jpg), [reveal](answer-audit-evidence/s06-q015-correction.jpg) |
| Q16 / s06-q016 | [2] | [2] | MATCH | 09:46 (586s) | 10:06 (606s) | [image](../public/questions/series-06/question-016.webp) / [question](answer-audit-evidence/s06-q016-question.jpg), [reveal](answer-audit-evidence/s06-q016-correction.jpg) |
| Q17 / s06-q017 | [1, 3] | [1, 3] | MATCH | 10:12 (612s) | 10:40 (640s) | [image](../public/questions/series-06/question-017.webp) / [question](answer-audit-evidence/s06-q017-question.jpg), [reveal](answer-audit-evidence/s06-q017-correction.jpg) |
| Q18 / s06-q018 | [3] | [3] | MATCH | 10:46 (646s) | 11:16 (676s) | [image](../public/questions/series-06/question-018.webp) / [question](answer-audit-evidence/s06-q018-question.jpg), [reveal](answer-audit-evidence/s06-q018-correction.jpg) |
| Q19 / s06-q019 | [1, 3] | [1, 3] | MATCH | 11:22 (682s) | 12:00 (720s) | [image](../public/questions/series-06/question-019.webp) / [question](answer-audit-evidence/s06-q019-question.jpg), [reveal](answer-audit-evidence/s06-q019-correction.jpg) |
| Q20 / s06-q020 | [1, 4] | [1, 4] | MATCH | 12:06 (726s) | 12:48 (768s) | [image](../public/questions/series-06/question-020.webp) / [question](answer-audit-evidence/s06-q020-question.jpg), [reveal](answer-audit-evidence/s06-q020-correction.jpg) |
| Q21 / s06-q021 | [1] | [1] | MATCH | 12:54 (774s) | 13:42 (822s) | [image](../public/questions/series-06/question-021.webp) / [question](answer-audit-evidence/s06-q021-question.jpg), [reveal](answer-audit-evidence/s06-q021-correction.jpg) |
| Q22 / s06-q022 | [1] | [1] | MATCH | 13:48 (828s) | 14:18 (858s) | [image](../public/questions/series-06/question-022.webp) / [question](answer-audit-evidence/s06-q022-question.jpg), [reveal](answer-audit-evidence/s06-q022-correction.jpg) |
| Q23 / s06-q023 | [2, 4] | [2, 4] | MATCH | 14:24 (864s) | 14:46 (886s) | [image](../public/questions/series-06/question-023.webp) / [question](answer-audit-evidence/s06-q023-question.jpg), [reveal](answer-audit-evidence/s06-q023-correction.jpg) |
| Q24 / s06-q024 | [2] | [2] | MATCH | 14:52 (892s) | 15:14 (914s) | [image](../public/questions/series-06/question-024.webp) / [question](answer-audit-evidence/s06-q024-question.jpg), [reveal](answer-audit-evidence/s06-q024-correction.jpg) |
| Q25 / s06-q025 | [2] | [2] | MATCH | 15:20 (920s) | 15:52 (952s) | [image](../public/questions/series-06/question-025.webp) / [question](answer-audit-evidence/s06-q025-question.jpg), [reveal](answer-audit-evidence/s06-q025-correction.jpg) |
| Q26 / s06-q026 | [1] | [1] | MATCH | 15:58 (958s) | 16:24 (984s) | [image](../public/questions/series-06/question-026.webp) / [question](answer-audit-evidence/s06-q026-question.jpg), [reveal](answer-audit-evidence/s06-q026-correction.jpg) |
| Q27 / s06-q027 | [1, 3] | [1, 3] | MATCH | 16:30 (990s) | 16:52 (1012s) | [image](../public/questions/series-06/question-027.webp) / [question](answer-audit-evidence/s06-q027-question.jpg), [reveal](answer-audit-evidence/s06-q027-correction.jpg) |
| Q28 / s06-q028 | [2, 4] | [2, 4] | MATCH | 16:58 (1018s) | 17:20 (1040s) | [image](../public/questions/series-06/question-028.webp) / [question](answer-audit-evidence/s06-q028-question.jpg), [reveal](answer-audit-evidence/s06-q028-correction.jpg) |
| Q29 / s06-q029 | [2] | [2] | MATCH | 17:26 (1046s) | 17:48 (1068s) | [image](../public/questions/series-06/question-029.webp) / [question](answer-audit-evidence/s06-q029-question.jpg), [reveal](answer-audit-evidence/s06-q029-correction.jpg) |
| Q30 / s06-q030 | [3] | [3] | MATCH | 17:54 (1074s) | 18:20 (1100s) | [image](../public/questions/series-06/question-030.webp) / [question](answer-audit-evidence/s06-q030-question.jpg), [reveal](answer-audit-evidence/s06-q030-correction.jpg) |
| Q31 / s06-q031 | [3] | [3] | MATCH | 18:26 (1106s) | 18:46 (1126s) | [image](../public/questions/series-06/question-031.webp) / [question](answer-audit-evidence/s06-q031-question.jpg), [reveal](answer-audit-evidence/s06-q031-correction.jpg) |
| Q32 / s06-q032 | [2] | [2] | MATCH | 18:52 (1132s) | 19:16 (1156s) | [image](../public/questions/series-06/question-032.webp) / [question](answer-audit-evidence/s06-q032-question.jpg), [reveal](answer-audit-evidence/s06-q032-correction.jpg) |
| Q33 / s06-q033 | [1, 3] | [1, 3] | MATCH | 19:22 (1162s) | 19:58 (1198s) | [image](../public/questions/series-06/question-033.webp) / [question](answer-audit-evidence/s06-q033-question.jpg), [reveal](answer-audit-evidence/s06-q033-correction.jpg) |
| Q34 / s06-q034 | [1] | [1] | MATCH | 20:04 (1204s) | 20:22 (1222s) | [image](../public/questions/series-06/question-034.webp) / [question](answer-audit-evidence/s06-q034-question.jpg), [reveal](answer-audit-evidence/s06-q034-correction.jpg) |
| Q35 / s06-q035 | [1] | [1] | MATCH | 20:28 (1228s) | 20:50 (1250s) | [image](../public/questions/series-06/question-035.webp) / [question](answer-audit-evidence/s06-q035-question.jpg), [reveal](answer-audit-evidence/s06-q035-correction.jpg) |
| Q36 / s06-q036 | [2] | [2] | MATCH | 20:56 (1256s) | 21:22 (1282s) | [image](../public/questions/series-06/question-036.webp) / [question](answer-audit-evidence/s06-q036-question.jpg), [reveal](answer-audit-evidence/s06-q036-correction.jpg) |
| Q37 / s06-q037 | [2] | [2] | MATCH | 21:28 (1288s) | 21:58 (1318s) | [image](../public/questions/series-06/question-037.webp) / [question](answer-audit-evidence/s06-q037-question.jpg), [reveal](answer-audit-evidence/s06-q037-correction.jpg) |
| Q38 / s06-q038 | [2] | [2] | MATCH | 22:04 (1324s) | 22:26 (1346s) | [image](../public/questions/series-06/question-038.webp) / [question](answer-audit-evidence/s06-q038-question.jpg), [reveal](answer-audit-evidence/s06-q038-correction.jpg) |
| Q39 / s06-q039 | [2, 3] | [2, 3] | MATCH | 22:32 (1352s) | 23:04 (1384s) | [image](../public/questions/series-06/question-039.webp) / [question](answer-audit-evidence/s06-q039-question.jpg), [reveal](answer-audit-evidence/s06-q039-correction.jpg) |
| Q40 / s06-q040 | [2] | [2] | MATCH | 23:10 (1390s) | 23:32 (1412s) | [image](../public/questions/series-06/question-040.webp) / [question](answer-audit-evidence/s06-q040-question.jpg), [reveal](answer-audit-evidence/s06-q040-correction.jpg) |

## Series 7

Questions checked: 40. Matched: 38. Corrected: 2. Manual review: 0.

Source: إمتحان تجريبي رقم 7 , اختبر معلوماتك قبل اجتياز امتحان رخصة السياقة بالتوفيق للجميع.mp4

Corrections:
- Q34: old [2, 4]; video [1, 4]; updated YES. Correction at 21:04 (1264s).
- Q39: old [2]; video [1]; updated YES. Correction at 23:30 (1410s).

| Question / ID | Old key | Video key | Result | Question frame | Correction frame | App image / evidence |
|---|---|---|---|---|---|---|
| Q1 / s07-q001 | [2, 4] | [2, 4] | MATCH | 00:26 (26s) | 01:22 (82s) | [image](../public/questions/series-07/question-001.webp) / [question](answer-audit-evidence/s07-q001-question.jpg), [reveal](answer-audit-evidence/s07-q001-correction.jpg) |
| Q2 / s07-q002 | [1] | [1] | MATCH | 01:28 (88s) | 02:04 (124s) | [image](../public/questions/series-07/question-002.webp) / [question](answer-audit-evidence/s07-q002-question.jpg), [reveal](answer-audit-evidence/s07-q002-correction.jpg) |
| Q3 / s07-q003 | [1] | [1] | MATCH | 02:10 (130s) | 02:30 (150s) | [image](../public/questions/series-07/question-003.webp) / [question](answer-audit-evidence/s07-q003-question.jpg), [reveal](answer-audit-evidence/s07-q003-correction.jpg) |
| Q4 / s07-q004 | [2, 4] | [2, 4] | MATCH | 02:36 (156s) | 03:22 (202s) | [image](../public/questions/series-07/question-004.webp) / [question](answer-audit-evidence/s07-q004-question.jpg), [reveal](answer-audit-evidence/s07-q004-correction.jpg) |
| Q5 / s07-q005 | [1] | [1] | MATCH | 03:28 (208s) | 04:02 (242s) | [image](../public/questions/series-07/question-005.webp) / [question](answer-audit-evidence/s07-q005-question.jpg), [reveal](answer-audit-evidence/s07-q005-correction.jpg) |
| Q6 / s07-q006 | [3] | [3] | MATCH | 04:08 (248s) | 04:36 (276s) | [image](../public/questions/series-07/question-006.webp) / [question](answer-audit-evidence/s07-q006-question.jpg), [reveal](answer-audit-evidence/s07-q006-correction.jpg) |
| Q7 / s07-q007 | [1] | [1] | MATCH | 04:42 (282s) | 05:12 (312s) | [image](../public/questions/series-07/question-007.webp) / [question](answer-audit-evidence/s07-q007-question.jpg), [reveal](answer-audit-evidence/s07-q007-correction.jpg) |
| Q8 / s07-q008 | [2] | [2] | MATCH | 05:18 (318s) | 05:50 (350s) | [image](../public/questions/series-07/question-008.webp) / [question](answer-audit-evidence/s07-q008-question.jpg), [reveal](answer-audit-evidence/s07-q008-correction.jpg) |
| Q9 / s07-q009 | [2] | [2] | MATCH | 05:56 (356s) | 06:28 (388s) | [image](../public/questions/series-07/question-009.webp) / [question](answer-audit-evidence/s07-q009-question.jpg), [reveal](answer-audit-evidence/s07-q009-correction.jpg) |
| Q10 / s07-q010 | [1] | [1] | MATCH | 06:34 (394s) | 07:12 (432s) | [image](../public/questions/series-07/question-010.webp) / [question](answer-audit-evidence/s07-q010-question.jpg), [reveal](answer-audit-evidence/s07-q010-correction.jpg) |
| Q11 / s07-q011 | [1, 3] | [1, 3] | MATCH | 07:18 (438s) | 07:46 (466s) | [image](../public/questions/series-07/question-011.webp) / [question](answer-audit-evidence/s07-q011-question.jpg), [reveal](answer-audit-evidence/s07-q011-correction.jpg) |
| Q12 / s07-q012 | [1, 4] | [1, 4] | MATCH | 07:52 (472s) | 08:26 (506s) | [image](../public/questions/series-07/question-012.webp) / [question](answer-audit-evidence/s07-q012-question.jpg), [reveal](answer-audit-evidence/s07-q012-correction.jpg) |
| Q13 / s07-q013 | [2] | [2] | MATCH | 08:32 (512s) | 08:58 (538s) | [image](../public/questions/series-07/question-013.webp) / [question](answer-audit-evidence/s07-q013-question.jpg), [reveal](answer-audit-evidence/s07-q013-correction.jpg) |
| Q14 / s07-q014 | [1] | [1] | MATCH | 09:04 (544s) | 09:34 (574s) | [image](../public/questions/series-07/question-014.webp) / [question](answer-audit-evidence/s07-q014-question.jpg), [reveal](answer-audit-evidence/s07-q014-correction.jpg) |
| Q15 / s07-q015 | [1] | [1] | MATCH | 09:40 (580s) | 10:04 (604s) | [image](../public/questions/series-07/question-015.webp) / [question](answer-audit-evidence/s07-q015-question.jpg), [reveal](answer-audit-evidence/s07-q015-correction.jpg) |
| Q16 / s07-q016 | [2] | [2] | MATCH | 10:10 (610s) | 10:46 (646s) | [image](../public/questions/series-07/question-016.webp) / [question](answer-audit-evidence/s07-q016-question.jpg), [reveal](answer-audit-evidence/s07-q016-correction.jpg) |
| Q17 / s07-q017 | [1] | [1] | MATCH | 10:52 (652s) | 11:12 (672s) | [image](../public/questions/series-07/question-017.webp) / [question](answer-audit-evidence/s07-q017-question.jpg), [reveal](answer-audit-evidence/s07-q017-correction.jpg) |
| Q18 / s07-q018 | [2] | [2] | MATCH | 11:18 (678s) | 11:44 (704s) | [image](../public/questions/series-07/question-018.webp) / [question](answer-audit-evidence/s07-q018-question.jpg), [reveal](answer-audit-evidence/s07-q018-correction.jpg) |
| Q19 / s07-q019 | [3] | [3] | MATCH | 11:50 (710s) | 12:18 (738s) | [image](../public/questions/series-07/question-019.webp) / [question](answer-audit-evidence/s07-q019-question.jpg), [reveal](answer-audit-evidence/s07-q019-correction.jpg) |
| Q20 / s07-q020 | [2] | [2] | MATCH | 12:24 (744s) | 12:44 (764s) | [image](../public/questions/series-07/question-020.webp) / [question](answer-audit-evidence/s07-q020-question.jpg), [reveal](answer-audit-evidence/s07-q020-correction.jpg) |
| Q21 / s07-q021 | [1] | [1] | MATCH | 12:50 (770s) | 13:26 (806s) | [image](../public/questions/series-07/question-021.webp) / [question](answer-audit-evidence/s07-q021-question.jpg), [reveal](answer-audit-evidence/s07-q021-correction.jpg) |
| Q22 / s07-q022 | [1, 3] | [1, 3] | MATCH | 13:32 (812s) | 14:12 (852s) | [image](../public/questions/series-07/question-022.webp) / [question](answer-audit-evidence/s07-q022-question.jpg), [reveal](answer-audit-evidence/s07-q022-correction.jpg) |
| Q23 / s07-q023 | [1, 3] | [1, 3] | MATCH | 14:18 (858s) | 14:54 (894s) | [image](../public/questions/series-07/question-023.webp) / [question](answer-audit-evidence/s07-q023-question.jpg), [reveal](answer-audit-evidence/s07-q023-correction.jpg) |
| Q24 / s07-q024 | [1, 3] | [1, 3] | MATCH | 15:00 (900s) | 15:38 (938s) | [image](../public/questions/series-07/question-024.webp) / [question](answer-audit-evidence/s07-q024-question.jpg), [reveal](answer-audit-evidence/s07-q024-correction.jpg) |
| Q25 / s07-q025 | [2] | [2] | MATCH | 15:44 (944s) | 16:06 (966s) | [image](../public/questions/series-07/question-025.webp) / [question](answer-audit-evidence/s07-q025-question.jpg), [reveal](answer-audit-evidence/s07-q025-correction.jpg) |
| Q26 / s07-q026 | [2] | [2] | MATCH | 16:12 (972s) | 16:42 (1002s) | [image](../public/questions/series-07/question-026.webp) / [question](answer-audit-evidence/s07-q026-question.jpg), [reveal](answer-audit-evidence/s07-q026-correction.jpg) |
| Q27 / s07-q027 | [2] | [2] | MATCH | 16:48 (1008s) | 17:10 (1030s) | [image](../public/questions/series-07/question-027.webp) / [question](answer-audit-evidence/s07-q027-question.jpg), [reveal](answer-audit-evidence/s07-q027-correction.jpg) |
| Q28 / s07-q028 | [1, 3] | [1, 3] | MATCH | 17:16 (1036s) | 17:38 (1058s) | [image](../public/questions/series-07/question-028.webp) / [question](answer-audit-evidence/s07-q028-question.jpg), [reveal](answer-audit-evidence/s07-q028-correction.jpg) |
| Q29 / s07-q029 | [1] | [1] | MATCH | 17:44 (1064s) | 18:06 (1086s) | [image](../public/questions/series-07/question-029.webp) / [question](answer-audit-evidence/s07-q029-question.jpg), [reveal](answer-audit-evidence/s07-q029-correction.jpg) |
| Q30 / s07-q030 | [3] | [3] | MATCH | 18:12 (1092s) | 18:40 (1120s) | [image](../public/questions/series-07/question-030.webp) / [question](answer-audit-evidence/s07-q030-question.jpg), [reveal](answer-audit-evidence/s07-q030-correction.jpg) |
| Q31 / s07-q031 | [1, 4] | [1, 4] | MATCH | 18:46 (1126s) | 19:16 (1156s) | [image](../public/questions/series-07/question-031.webp) / [question](answer-audit-evidence/s07-q031-question.jpg), [reveal](answer-audit-evidence/s07-q031-correction.jpg) |
| Q32 / s07-q032 | [1, 3] | [1, 3] | MATCH | 19:22 (1162s) | 19:44 (1184s) | [image](../public/questions/series-07/question-032.webp) / [question](answer-audit-evidence/s07-q032-question.jpg), [reveal](answer-audit-evidence/s07-q032-correction.jpg) |
| Q33 / s07-q033 | [1, 3] | [1, 3] | MATCH | 19:50 (1190s) | 20:22 (1222s) | [image](../public/questions/series-07/question-033.webp) / [question](answer-audit-evidence/s07-q033-question.jpg), [reveal](answer-audit-evidence/s07-q033-correction.jpg) |
| Q34 / s07-q034 | [2, 4] | [1, 4] | CORRECTED | 20:28 (1228s) | 21:04 (1264s) | [image](../public/questions/series-07/question-034.webp) / [question](answer-audit-evidence/s07-q034-question.jpg), [reveal](answer-audit-evidence/s07-q034-correction.jpg) |
| Q35 / s07-q035 | [1] | [1] | MATCH | 21:10 (1270s) | 21:34 (1294s) | [image](../public/questions/series-07/question-035.webp) / [question](answer-audit-evidence/s07-q035-question.jpg), [reveal](answer-audit-evidence/s07-q035-correction.jpg) |
| Q36 / s07-q036 | [1] | [1] | MATCH | 21:40 (1300s) | 22:00 (1320s) | [image](../public/questions/series-07/question-036.webp) / [question](answer-audit-evidence/s07-q036-question.jpg), [reveal](answer-audit-evidence/s07-q036-correction.jpg) |
| Q37 / s07-q037 | [3] | [3] | MATCH | 22:06 (1326s) | 22:36 (1356s) | [image](../public/questions/series-07/question-037.webp) / [question](answer-audit-evidence/s07-q037-question.jpg), [reveal](answer-audit-evidence/s07-q037-correction.jpg) |
| Q38 / s07-q038 | [3] | [3] | MATCH | 22:42 (1362s) | 23:04 (1384s) | [image](../public/questions/series-07/question-038.webp) / [question](answer-audit-evidence/s07-q038-question.jpg), [reveal](answer-audit-evidence/s07-q038-correction.jpg) |
| Q39 / s07-q039 | [2] | [1] | CORRECTED | 23:10 (1390s) | 23:30 (1410s) | [image](../public/questions/series-07/question-039.webp) / [question](answer-audit-evidence/s07-q039-question.jpg), [reveal](answer-audit-evidence/s07-q039-correction.jpg) |
| Q40 / s07-q040 | [1, 3] | [1, 3] | MATCH | 23:36 (1416s) | 24:08 (1448s) | [image](../public/questions/series-07/question-040.webp) / [question](answer-audit-evidence/s07-q040-question.jpg), [reveal](answer-audit-evidence/s07-q040-correction.jpg) |

## Series 8

Questions checked: 20. Matched: 19. Corrected: 1. Manual review: 0.

Source: إمتحان تجريبي رقم 8 ، إختبر معلوماتك قبل إجتياز امتحان رخصة السياقة.mp4

Corrections:
- Q4: old [2]; video [1, 2]; updated YES. Correction at 03:44 (224s).

| Question / ID | Old key | Video key | Result | Question frame | Correction frame | App image / evidence |
|---|---|---|---|---|---|---|
| Q1 / s08-q001 | [1, 2, 4] | [1, 2, 4] | MATCH | 00:26 (26s) | 01:38 (98s) | [image](../public/questions/series-08/question-001.webp) / [question](answer-audit-evidence/s08-q001-question.jpg), [reveal](answer-audit-evidence/s08-q001-correction.jpg) |
| Q2 / s08-q002 | [1] | [1] | MATCH | 01:44 (104s) | 02:12 (132s) | [image](../public/questions/series-08/question-002.webp) / [question](answer-audit-evidence/s08-q002-question.jpg), [reveal](answer-audit-evidence/s08-q002-correction.jpg) |
| Q3 / s08-q003 | [1] | [1] | MATCH | 02:18 (138s) | 03:00 (180s) | [image](../public/questions/series-08/question-003.webp) / [question](answer-audit-evidence/s08-q003-question.jpg), [reveal](answer-audit-evidence/s08-q003-correction.jpg) |
| Q4 / s08-q004 | [2] | [1, 2] | CORRECTED | 03:06 (186s) | 03:44 (224s) | [image](../public/questions/series-08/question-004.webp) / [question](answer-audit-evidence/s08-q004-question.jpg), [reveal](answer-audit-evidence/s08-q004-correction.jpg) |
| Q5 / s08-q005 | [3] | [3] | MATCH | 03:50 (230s) | 04:20 (260s) | [image](../public/questions/series-08/question-005.webp) / [question](answer-audit-evidence/s08-q005-question.jpg), [reveal](answer-audit-evidence/s08-q005-correction.jpg) |
| Q6 / s08-q006 | [2] | [2] | MATCH | 04:26 (266s) | 04:52 (292s) | [image](../public/questions/series-08/question-006.webp) / [question](answer-audit-evidence/s08-q006-question.jpg), [reveal](answer-audit-evidence/s08-q006-correction.jpg) |
| Q7 / s08-q007 | [1, 4] | [1, 4] | MATCH | 04:58 (298s) | 05:52 (352s) | [image](../public/questions/series-08/question-007.webp) / [question](answer-audit-evidence/s08-q007-question.jpg), [reveal](answer-audit-evidence/s08-q007-correction.jpg) |
| Q8 / s08-q008 | [3] | [3] | MATCH | 05:58 (358s) | 06:54 (414s) | [image](../public/questions/series-08/question-008.webp) / [question](answer-audit-evidence/s08-q008-question.jpg), [reveal](answer-audit-evidence/s08-q008-correction.jpg) |
| Q9 / s08-q009 | [1, 4] | [1, 4] | MATCH | 07:00 (420s) | 08:08 (488s) | [image](../public/questions/series-08/question-009.webp) / [question](answer-audit-evidence/s08-q009-question.jpg), [reveal](answer-audit-evidence/s08-q009-correction.jpg) |
| Q10 / s08-q010 | [2, 4] | [2, 4] | MATCH | 08:14 (494s) | 09:00 (540s) | [image](../public/questions/series-08/question-010.webp) / [question](answer-audit-evidence/s08-q010-question.jpg), [reveal](answer-audit-evidence/s08-q010-correction.jpg) |
| Q11 / s08-q011 | [3] | [3] | MATCH | 09:14 (554s) | 09:54 (594s) | [image](../public/questions/series-08/question-011.webp) / [question](answer-audit-evidence/s08-q011-question.jpg), [reveal](answer-audit-evidence/s08-q011-correction.jpg) |
| Q12 / s08-q012 | [1, 3] | [1, 3] | MATCH | 10:00 (600s) | 10:26 (626s) | [image](../public/questions/series-08/question-012.webp) / [question](answer-audit-evidence/s08-q012-question.jpg), [reveal](answer-audit-evidence/s08-q012-correction.jpg) |
| Q13 / s08-q013 | [1] | [1] | MATCH | 10:32 (632s) | 10:52 (652s) | [image](../public/questions/series-08/question-013.webp) / [question](answer-audit-evidence/s08-q013-question.jpg), [reveal](answer-audit-evidence/s08-q013-correction.jpg) |
| Q14 / s08-q014 | [1] | [1] | MATCH | 10:58 (658s) | 11:28 (688s) | [image](../public/questions/series-08/question-014.webp) / [question](answer-audit-evidence/s08-q014-question.jpg), [reveal](answer-audit-evidence/s08-q014-correction.jpg) |
| Q15 / s08-q015 | [3] | [3] | MATCH | 11:34 (694s) | 12:10 (730s) | [image](../public/questions/series-08/question-015.webp) / [question](answer-audit-evidence/s08-q015-question.jpg), [reveal](answer-audit-evidence/s08-q015-correction.jpg) |
| Q16 / s08-q016 | [1] | [1] | MATCH | 12:16 (736s) | 12:38 (758s) | [image](../public/questions/series-08/question-016.webp) / [question](answer-audit-evidence/s08-q016-question.jpg), [reveal](answer-audit-evidence/s08-q016-correction.jpg) |
| Q17 / s08-q017 | [1] | [1] | MATCH | 12:44 (764s) | 13:22 (802s) | [image](../public/questions/series-08/question-017.webp) / [question](answer-audit-evidence/s08-q017-question.jpg), [reveal](answer-audit-evidence/s08-q017-correction.jpg) |
| Q18 / s08-q018 | [2, 3] | [2, 3] | MATCH | 13:28 (808s) | 13:58 (838s) | [image](../public/questions/series-08/question-018.webp) / [question](answer-audit-evidence/s08-q018-question.jpg), [reveal](answer-audit-evidence/s08-q018-correction.jpg) |
| Q19 / s08-q019 | [2] | [2] | MATCH | 14:04 (844s) | 14:28 (868s) | [image](../public/questions/series-08/question-019.webp) / [question](answer-audit-evidence/s08-q019-question.jpg), [reveal](answer-audit-evidence/s08-q019-correction.jpg) |
| Q20 / s08-q020 | [1] | [1] | MATCH | 14:34 (874s) | 15:02 (902s) | [image](../public/questions/series-08/question-020.webp) / [question](answer-audit-evidence/s08-q020-question.jpg), [reveal](answer-audit-evidence/s08-q020-correction.jpg) |

## Series 9

Questions checked: 20. Matched: 20. Corrected: 0. Manual review: 0.

Source: إمتحان تجريبي رقم 9 ،أصعب 20 سؤال.mp4

Corrections:
None.

| Question / ID | Old key | Video key | Result | Question frame | Correction frame | App image / evidence |
|---|---|---|---|---|---|---|
| Q1 / s09-q001 | [1, 4] | [1, 4] | MATCH | 00:26 (26s) | 01:46 (106s) | [image](../public/questions/series-09/question-001.webp) / [question](answer-audit-evidence/s09-q001-question.jpg), [reveal](answer-audit-evidence/s09-q001-correction.jpg) |
| Q2 / s09-q002 | [2, 3] | [2, 3] | MATCH | 01:52 (112s) | 02:38 (158s) | [image](../public/questions/series-09/question-002.webp) / [question](answer-audit-evidence/s09-q002-question.jpg), [reveal](answer-audit-evidence/s09-q002-correction.jpg) |
| Q3 / s09-q003 | [2] | [2] | MATCH | 02:44 (164s) | 03:12 (192s) | [image](../public/questions/series-09/question-003.webp) / [question](answer-audit-evidence/s09-q003-question.jpg), [reveal](answer-audit-evidence/s09-q003-correction.jpg) |
| Q4 / s09-q004 | [1, 2] | [1, 2] | MATCH | 03:18 (198s) | 04:10 (250s) | [image](../public/questions/series-09/question-004.webp) / [question](answer-audit-evidence/s09-q004-question.jpg), [reveal](answer-audit-evidence/s09-q004-correction.jpg) |
| Q5 / s09-q005 | [1, 3, 4] | [1, 3, 4] | MATCH | 04:16 (256s) | 05:16 (316s) | [image](../public/questions/series-09/question-005.webp) / [question](answer-audit-evidence/s09-q005-question.jpg), [reveal](answer-audit-evidence/s09-q005-correction.jpg) |
| Q6 / s09-q006 | [1, 4] | [1, 4] | MATCH | 05:22 (322s) | 05:58 (358s) | [image](../public/questions/series-09/question-006.webp) / [question](answer-audit-evidence/s09-q006-question.jpg), [reveal](answer-audit-evidence/s09-q006-correction.jpg) |
| Q7 / s09-q007 | [2, 3] | [2, 3] | MATCH | 06:04 (364s) | 06:44 (404s) | [image](../public/questions/series-09/question-007.webp) / [question](answer-audit-evidence/s09-q007-question.jpg), [reveal](answer-audit-evidence/s09-q007-correction.jpg) |
| Q8 / s09-q008 | [2] | [2] | MATCH | 06:50 (410s) | 07:26 (446s) | [image](../public/questions/series-09/question-008.webp) / [question](answer-audit-evidence/s09-q008-question.jpg), [reveal](answer-audit-evidence/s09-q008-correction.jpg) |
| Q9 / s09-q009 | [2] | [2] | MATCH | 07:32 (452s) | 07:58 (478s) | [image](../public/questions/series-09/question-009.webp) / [question](answer-audit-evidence/s09-q009-question.jpg), [reveal](answer-audit-evidence/s09-q009-correction.jpg) |
| Q10 / s09-q010 | [3] | [3] | MATCH | 08:04 (484s) | 08:36 (516s) | [image](../public/questions/series-09/question-010.webp) / [question](answer-audit-evidence/s09-q010-question.jpg), [reveal](answer-audit-evidence/s09-q010-correction.jpg) |
| Q11 / s09-q011 | [1, 2, 4] | [1, 2, 4] | MATCH | 08:42 (522s) | 09:14 (554s) | [image](../public/questions/series-09/question-011.webp) / [question](answer-audit-evidence/s09-q011-question.jpg), [reveal](answer-audit-evidence/s09-q011-correction.jpg) |
| Q12 / s09-q012 | [2, 4] | [2, 4] | MATCH | 09:20 (560s) | 10:06 (606s) | [image](../public/questions/series-09/question-012.webp) / [question](answer-audit-evidence/s09-q012-question.jpg), [reveal](answer-audit-evidence/s09-q012-correction.jpg) |
| Q13 / s09-q013 | [1] | [1] | MATCH | 10:12 (612s) | 10:52 (652s) | [image](../public/questions/series-09/question-013.webp) / [question](answer-audit-evidence/s09-q013-question.jpg), [reveal](answer-audit-evidence/s09-q013-correction.jpg) |
| Q14 / s09-q014 | [1] | [1] | MATCH | 10:58 (658s) | 11:28 (688s) | [image](../public/questions/series-09/question-014.webp) / [question](answer-audit-evidence/s09-q014-question.jpg), [reveal](answer-audit-evidence/s09-q014-correction.jpg) |
| Q15 / s09-q015 | [3, 4] | [3, 4] | MATCH | 11:34 (694s) | 12:22 (742s) | [image](../public/questions/series-09/question-015.webp) / [question](answer-audit-evidence/s09-q015-question.jpg), [reveal](answer-audit-evidence/s09-q015-correction.jpg) |
| Q16 / s09-q016 | [1, 4] | [1, 4] | MATCH | 12:28 (748s) | 13:10 (790s) | [image](../public/questions/series-09/question-016.webp) / [question](answer-audit-evidence/s09-q016-question.jpg), [reveal](answer-audit-evidence/s09-q016-correction.jpg) |
| Q17 / s09-q017 | [2, 4] | [2, 4] | MATCH | 13:16 (796s) | 14:04 (844s) | [image](../public/questions/series-09/question-017.webp) / [question](answer-audit-evidence/s09-q017-question.jpg), [reveal](answer-audit-evidence/s09-q017-correction.jpg) |
| Q18 / s09-q018 | [1, 3] | [1, 3] | MATCH | 14:10 (850s) | 14:48 (888s) | [image](../public/questions/series-09/question-018.webp) / [question](answer-audit-evidence/s09-q018-question.jpg), [reveal](answer-audit-evidence/s09-q018-correction.jpg) |
| Q19 / s09-q019 | [1] | [1] | MATCH | 14:54 (894s) | 15:24 (924s) | [image](../public/questions/series-09/question-019.webp) / [question](answer-audit-evidence/s09-q019-question.jpg), [reveal](answer-audit-evidence/s09-q019-correction.jpg) |
| Q20 / s09-q020 | [2] | [2] | MATCH | 15:30 (930s) | 15:58 (958s) | [image](../public/questions/series-09/question-020.webp) / [question](answer-audit-evidence/s09-q020-question.jpg), [reveal](answer-audit-evidence/s09-q020-correction.jpg) |

## Series 10

Questions checked: 20. Matched: 20. Corrected: 0. Manual review: 0.

Source: إمتحان تجريبي رقم 10 ، أصعب 20 سؤال 2026.mp4

Corrections:
None.

| Question / ID | Old key | Video key | Result | Question frame | Correction frame | App image / evidence |
|---|---|---|---|---|---|---|
| Q1 / s10-q001 | [1] | [1] | MATCH | 00:26 (26s) | 01:26 (86s) | [image](../public/questions/series-10/question-001.webp) / [question](answer-audit-evidence/s10-q001-question.jpg), [reveal](answer-audit-evidence/s10-q001-correction.jpg) |
| Q2 / s10-q002 | [2, 4] | [2, 4] | MATCH | 01:32 (92s) | 02:30 (150s) | [image](../public/questions/series-10/question-002.webp) / [question](answer-audit-evidence/s10-q002-question.jpg), [reveal](answer-audit-evidence/s10-q002-correction.jpg) |
| Q3 / s10-q003 | [1, 4] | [1, 4] | MATCH | 02:36 (156s) | 03:24 (204s) | [image](../public/questions/series-10/question-003.webp) / [question](answer-audit-evidence/s10-q003-question.jpg), [reveal](answer-audit-evidence/s10-q003-correction.jpg) |
| Q4 / s10-q004 | [1, 3] | [1, 3] | MATCH | 03:30 (210s) | 04:10 (250s) | [image](../public/questions/series-10/question-004.webp) / [question](answer-audit-evidence/s10-q004-question.jpg), [reveal](answer-audit-evidence/s10-q004-correction.jpg) |
| Q5 / s10-q005 | [3] | [3] | MATCH | 04:16 (256s) | 04:52 (292s) | [image](../public/questions/series-10/question-005.webp) / [question](answer-audit-evidence/s10-q005-question.jpg), [reveal](answer-audit-evidence/s10-q005-correction.jpg) |
| Q6 / s10-q006 | [2] | [2] | MATCH | 04:58 (298s) | 05:44 (344s) | [image](../public/questions/series-10/question-006.webp) / [question](answer-audit-evidence/s10-q006-question.jpg), [reveal](answer-audit-evidence/s10-q006-correction.jpg) |
| Q7 / s10-q007 | [2] | [2] | MATCH | 05:50 (350s) | 06:32 (392s) | [image](../public/questions/series-10/question-007.webp) / [question](answer-audit-evidence/s10-q007-question.jpg), [reveal](answer-audit-evidence/s10-q007-correction.jpg) |
| Q8 / s10-q008 | [2] | [2] | MATCH | 06:38 (398s) | 07:34 (454s) | [image](../public/questions/series-10/question-008.webp) / [question](answer-audit-evidence/s10-q008-question.jpg), [reveal](answer-audit-evidence/s10-q008-correction.jpg) |
| Q9 / s10-q009 | [2] | [2] | MATCH | 07:40 (460s) | 08:12 (492s) | [image](../public/questions/series-10/question-009.webp) / [question](answer-audit-evidence/s10-q009-question.jpg), [reveal](answer-audit-evidence/s10-q009-correction.jpg) |
| Q10 / s10-q010 | [3] | [3] | MATCH | 08:18 (498s) | 09:14 (554s) | [image](../public/questions/series-10/question-010.webp) / [question](answer-audit-evidence/s10-q010-question.jpg), [reveal](answer-audit-evidence/s10-q010-correction.jpg) |
| Q11 / s10-q011 | [1] | [1] | MATCH | 09:20 (560s) | 09:56 (596s) | [image](../public/questions/series-10/question-011.webp) / [question](answer-audit-evidence/s10-q011-question.jpg), [reveal](answer-audit-evidence/s10-q011-correction.jpg) |
| Q12 / s10-q012 | [2, 3] | [2, 3] | MATCH | 10:02 (602s) | 10:58 (658s) | [image](../public/questions/series-10/question-012.webp) / [question](answer-audit-evidence/s10-q012-question.jpg), [reveal](answer-audit-evidence/s10-q012-correction.jpg) |
| Q13 / s10-q013 | [3] | [3] | MATCH | 11:04 (664s) | 11:36 (696s) | [image](../public/questions/series-10/question-013.webp) / [question](answer-audit-evidence/s10-q013-question.jpg), [reveal](answer-audit-evidence/s10-q013-correction.jpg) |
| Q14 / s10-q014 | [1, 3] | [1, 3] | MATCH | 11:42 (702s) | 12:16 (736s) | [image](../public/questions/series-10/question-014.webp) / [question](answer-audit-evidence/s10-q014-question.jpg), [reveal](answer-audit-evidence/s10-q014-correction.jpg) |
| Q15 / s10-q015 | [1] | [1] | MATCH | 12:22 (742s) | 12:46 (766s) | [image](../public/questions/series-10/question-015.webp) / [question](answer-audit-evidence/s10-q015-question.jpg), [reveal](answer-audit-evidence/s10-q015-correction.jpg) |
| Q16 / s10-q016 | [1, 2, 4] | [1, 2, 4] | MATCH | 12:52 (772s) | 13:32 (812s) | [image](../public/questions/series-10/question-016.webp) / [question](answer-audit-evidence/s10-q016-question.jpg), [reveal](answer-audit-evidence/s10-q016-correction.jpg) |
| Q17 / s10-q017 | [1] | [1] | MATCH | 13:38 (818s) | 14:12 (852s) | [image](../public/questions/series-10/question-017.webp) / [question](answer-audit-evidence/s10-q017-question.jpg), [reveal](answer-audit-evidence/s10-q017-correction.jpg) |
| Q18 / s10-q018 | [1, 3] | [1, 3] | MATCH | 14:18 (858s) | 14:54 (894s) | [image](../public/questions/series-10/question-018.webp) / [question](answer-audit-evidence/s10-q018-question.jpg), [reveal](answer-audit-evidence/s10-q018-correction.jpg) |
| Q19 / s10-q019 | [2, 4] | [2, 4] | MATCH | 15:00 (900s) | 15:30 (930s) | [image](../public/questions/series-10/question-019.webp) / [question](answer-audit-evidence/s10-q019-question.jpg), [reveal](answer-audit-evidence/s10-q019-correction.jpg) |
| Q20 / s10-q020 | [3] | [3] | MATCH | 15:36 (936s) | 16:12 (972s) | [image](../public/questions/series-10/question-020.webp) / [question](answer-audit-evidence/s10-q020-question.jpg), [reveal](answer-audit-evidence/s10-q020-correction.jpg) |

## Series 11

Questions checked: 20. Matched: 19. Corrected: 1. Manual review: 0.

Source: إمتحان تجريبي رقم 11، إختبر معلوماتك قبل إجتياز امتحان رخصة السياقة 2026.mp4

Corrections:
- Q14: old [1, 3]; video [1, 3, 4]; updated YES. Correction at 11:38 (698s).

| Question / ID | Old key | Video key | Result | Question frame | Correction frame | App image / evidence |
|---|---|---|---|---|---|---|
| Q1 / s11-q001 | [2] | [2] | MATCH | 00:26 (26s) | 01:40 (100s) | [image](../public/questions/series-11/question-001.webp) / [question](answer-audit-evidence/s11-q001-question.jpg), [reveal](answer-audit-evidence/s11-q001-correction.jpg) |
| Q2 / s11-q002 | [2] | [2] | MATCH | 01:46 (106s) | 02:46 (166s) | [image](../public/questions/series-11/question-002.webp) / [question](answer-audit-evidence/s11-q002-question.jpg), [reveal](answer-audit-evidence/s11-q002-correction.jpg) |
| Q3 / s11-q003 | [1] | [1] | MATCH | 02:52 (172s) | 03:20 (200s) | [image](../public/questions/series-11/question-003.webp) / [question](answer-audit-evidence/s11-q003-question.jpg), [reveal](answer-audit-evidence/s11-q003-correction.jpg) |
| Q4 / s11-q004 | [3] | [3] | MATCH | 03:26 (206s) | 04:24 (264s) | [image](../public/questions/series-11/question-004.webp) / [question](answer-audit-evidence/s11-q004-question.jpg), [reveal](answer-audit-evidence/s11-q004-correction.jpg) |
| Q5 / s11-q005 | [1] | [1] | MATCH | 04:30 (270s) | 05:08 (308s) | [image](../public/questions/series-11/question-005.webp) / [question](answer-audit-evidence/s11-q005-question.jpg), [reveal](answer-audit-evidence/s11-q005-correction.jpg) |
| Q6 / s11-q006 | [1] | [1] | MATCH | 05:14 (314s) | 05:48 (348s) | [image](../public/questions/series-11/question-006.webp) / [question](answer-audit-evidence/s11-q006-question.jpg), [reveal](answer-audit-evidence/s11-q006-correction.jpg) |
| Q7 / s11-q007 | [2] | [2] | MATCH | 05:54 (354s) | 06:40 (400s) | [image](../public/questions/series-11/question-007.webp) / [question](answer-audit-evidence/s11-q007-question.jpg), [reveal](answer-audit-evidence/s11-q007-correction.jpg) |
| Q8 / s11-q008 | [1] | [1] | MATCH | 06:46 (406s) | 07:26 (446s) | [image](../public/questions/series-11/question-008.webp) / [question](answer-audit-evidence/s11-q008-question.jpg), [reveal](answer-audit-evidence/s11-q008-correction.jpg) |
| Q9 / s11-q009 | [2, 3] | [2, 3] | MATCH | 07:32 (452s) | 08:12 (492s) | [image](../public/questions/series-11/question-009.webp) / [question](answer-audit-evidence/s11-q009-question.jpg), [reveal](answer-audit-evidence/s11-q009-correction.jpg) |
| Q10 / s11-q010 | [1, 3] | [1, 3] | MATCH | 08:18 (498s) | 09:10 (550s) | [image](../public/questions/series-11/question-010.webp) / [question](answer-audit-evidence/s11-q010-question.jpg), [reveal](answer-audit-evidence/s11-q010-correction.jpg) |
| Q11 / s11-q011 | [2] | [2] | MATCH | 09:16 (556s) | 09:40 (580s) | [image](../public/questions/series-11/question-011.webp) / [question](answer-audit-evidence/s11-q011-question.jpg), [reveal](answer-audit-evidence/s11-q011-correction.jpg) |
| Q12 / s11-q012 | [1] | [1] | MATCH | 09:46 (586s) | 10:14 (614s) | [image](../public/questions/series-11/question-012.webp) / [question](answer-audit-evidence/s11-q012-question.jpg), [reveal](answer-audit-evidence/s11-q012-correction.jpg) |
| Q13 / s11-q013 | [1, 3] | [1, 3] | MATCH | 10:20 (620s) | 10:56 (656s) | [image](../public/questions/series-11/question-013.webp) / [question](answer-audit-evidence/s11-q013-question.jpg), [reveal](answer-audit-evidence/s11-q013-correction.jpg) |
| Q14 / s11-q014 | [1, 3] | [1, 3, 4] | CORRECTED | 11:02 (662s) | 11:38 (698s) | [image](../public/questions/series-11/question-014.webp) / [question](answer-audit-evidence/s11-q014-question.jpg), [reveal](answer-audit-evidence/s11-q014-correction.jpg) |
| Q15 / s11-q015 | [1, 3] | [1, 3] | MATCH | 11:44 (704s) | 12:18 (738s) | [image](../public/questions/series-11/question-015.webp) / [question](answer-audit-evidence/s11-q015-question.jpg), [reveal](answer-audit-evidence/s11-q015-correction.jpg) |
| Q16 / s11-q016 | [1, 3] | [1, 3] | MATCH | 12:24 (744s) | 12:54 (774s) | [image](../public/questions/series-11/question-016.webp) / [question](answer-audit-evidence/s11-q016-question.jpg), [reveal](answer-audit-evidence/s11-q016-correction.jpg) |
| Q17 / s11-q017 | [1] | [1] | MATCH | 13:00 (780s) | 13:18 (798s) | [image](../public/questions/series-11/question-017.webp) / [question](answer-audit-evidence/s11-q017-question.jpg), [reveal](answer-audit-evidence/s11-q017-correction.jpg) |
| Q18 / s11-q018 | [3] | [3] | MATCH | 13:24 (804s) | 13:54 (834s) | [image](../public/questions/series-11/question-018.webp) / [question](answer-audit-evidence/s11-q018-question.jpg), [reveal](answer-audit-evidence/s11-q018-correction.jpg) |
| Q19 / s11-q019 | [2] | [2] | MATCH | 14:00 (840s) | 14:34 (874s) | [image](../public/questions/series-11/question-019.webp) / [question](answer-audit-evidence/s11-q019-question.jpg), [reveal](answer-audit-evidence/s11-q019-correction.jpg) |
| Q20 / s11-q020 | [2] | [2] | MATCH | 14:40 (880s) | 15:04 (904s) | [image](../public/questions/series-11/question-020.webp) / [question](answer-audit-evidence/s11-q020-question.jpg), [reveal](answer-audit-evidence/s11-q020-correction.jpg) |

## Series 12

Questions checked: 20. Matched: 20. Corrected: 0. Manual review: 0.

Source: إمتحان تجريبي رقم 12، أصعب 20 سؤال 2026.mp4

Corrections:
None.

| Question / ID | Old key | Video key | Result | Question frame | Correction frame | App image / evidence |
|---|---|---|---|---|---|---|
| Q1 / s12-q001 | [4] | [4] | MATCH | 00:26 (26s) | 01:10 (70s) | [image](../public/questions/series-12/question-001.webp) / [question](answer-audit-evidence/s12-q001-question.jpg), [reveal](answer-audit-evidence/s12-q001-correction.jpg) |
| Q2 / s12-q002 | [1] | [1] | MATCH | 01:16 (76s) | 01:48 (108s) | [image](../public/questions/series-12/question-002.webp) / [question](answer-audit-evidence/s12-q002-question.jpg), [reveal](answer-audit-evidence/s12-q002-correction.jpg) |
| Q3 / s12-q003 | [2] | [2] | MATCH | 01:54 (114s) | 02:34 (154s) | [image](../public/questions/series-12/question-003.webp) / [question](answer-audit-evidence/s12-q003-question.jpg), [reveal](answer-audit-evidence/s12-q003-correction.jpg) |
| Q4 / s12-q004 | [2] | [2] | MATCH | 02:40 (160s) | 03:22 (202s) | [image](../public/questions/series-12/question-004.webp) / [question](answer-audit-evidence/s12-q004-question.jpg), [reveal](answer-audit-evidence/s12-q004-correction.jpg) |
| Q5 / s12-q005 | [2, 3] | [2, 3] | MATCH | 03:28 (208s) | 04:10 (250s) | [image](../public/questions/series-12/question-005.webp) / [question](answer-audit-evidence/s12-q005-question.jpg), [reveal](answer-audit-evidence/s12-q005-correction.jpg) |
| Q6 / s12-q006 | [1, 3] | [1, 3] | MATCH | 04:16 (256s) | 04:58 (298s) | [image](../public/questions/series-12/question-006.webp) / [question](answer-audit-evidence/s12-q006-question.jpg), [reveal](answer-audit-evidence/s12-q006-correction.jpg) |
| Q7 / s12-q007 | [1] | [1] | MATCH | 05:04 (304s) | 06:00 (360s) | [image](../public/questions/series-12/question-007.webp) / [question](answer-audit-evidence/s12-q007-question.jpg), [reveal](answer-audit-evidence/s12-q007-correction.jpg) |
| Q8 / s12-q008 | [1, 4] | [1, 4] | MATCH | 06:06 (366s) | 07:20 (440s) | [image](../public/questions/series-12/question-008.webp) / [question](answer-audit-evidence/s12-q008-question.jpg), [reveal](answer-audit-evidence/s12-q008-correction.jpg) |
| Q9 / s12-q009 | [1] | [1] | MATCH | 07:26 (446s) | 07:58 (478s) | [image](../public/questions/series-12/question-009.webp) / [question](answer-audit-evidence/s12-q009-question.jpg), [reveal](answer-audit-evidence/s12-q009-correction.jpg) |
| Q10 / s12-q010 | [1] | [1] | MATCH | 08:04 (484s) | 08:36 (516s) | [image](../public/questions/series-12/question-010.webp) / [question](answer-audit-evidence/s12-q010-question.jpg), [reveal](answer-audit-evidence/s12-q010-correction.jpg) |
| Q11 / s12-q011 | [2] | [2] | MATCH | 08:42 (522s) | 09:30 (570s) | [image](../public/questions/series-12/question-011.webp) / [question](answer-audit-evidence/s12-q011-question.jpg), [reveal](answer-audit-evidence/s12-q011-correction.jpg) |
| Q12 / s12-q012 | [3] | [3] | MATCH | 09:36 (576s) | 10:16 (616s) | [image](../public/questions/series-12/question-012.webp) / [question](answer-audit-evidence/s12-q012-question.jpg), [reveal](answer-audit-evidence/s12-q012-correction.jpg) |
| Q13 / s12-q013 | [2] | [2] | MATCH | 10:22 (622s) | 10:58 (658s) | [image](../public/questions/series-12/question-013.webp) / [question](answer-audit-evidence/s12-q013-question.jpg), [reveal](answer-audit-evidence/s12-q013-correction.jpg) |
| Q14 / s12-q014 | [1, 4] | [1, 4] | MATCH | 11:04 (664s) | 11:40 (700s) | [image](../public/questions/series-12/question-014.webp) / [question](answer-audit-evidence/s12-q014-question.jpg), [reveal](answer-audit-evidence/s12-q014-correction.jpg) |
| Q15 / s12-q015 | [1] | [1] | MATCH | 11:46 (706s) | 12:20 (740s) | [image](../public/questions/series-12/question-015.webp) / [question](answer-audit-evidence/s12-q015-question.jpg), [reveal](answer-audit-evidence/s12-q015-correction.jpg) |
| Q16 / s12-q016 | [1] | [1] | MATCH | 12:26 (746s) | 12:46 (766s) | [image](../public/questions/series-12/question-016.webp) / [question](answer-audit-evidence/s12-q016-question.jpg), [reveal](answer-audit-evidence/s12-q016-correction.jpg) |
| Q17 / s12-q017 | [1, 3] | [1, 3] | MATCH | 12:52 (772s) | 13:32 (812s) | [image](../public/questions/series-12/question-017.webp) / [question](answer-audit-evidence/s12-q017-question.jpg), [reveal](answer-audit-evidence/s12-q017-correction.jpg) |
| Q18 / s12-q018 | [2] | [2] | MATCH | 13:38 (818s) | 14:12 (852s) | [image](../public/questions/series-12/question-018.webp) / [question](answer-audit-evidence/s12-q018-question.jpg), [reveal](answer-audit-evidence/s12-q018-correction.jpg) |
| Q19 / s12-q019 | [1, 2] | [1, 2] | MATCH | 14:18 (858s) | 14:54 (894s) | [image](../public/questions/series-12/question-019.webp) / [question](answer-audit-evidence/s12-q019-question.jpg), [reveal](answer-audit-evidence/s12-q019-correction.jpg) |
| Q20 / s12-q020 | [1, 3] | [1, 3] | MATCH | 15:00 (900s) | 15:36 (936s) | [image](../public/questions/series-12/question-020.webp) / [question](answer-audit-evidence/s12-q020-question.jpg), [reveal](answer-audit-evidence/s12-q020-correction.jpg) |

## Series 13

Questions checked: 20. Matched: 20. Corrected: 0. Manual review: 0.

Source: إمتحان تجريبي رقم 13 إختبر معلوماتك قبل اجتياز امتحان رخصة السياقة.mp4

Corrections:
None.

| Question / ID | Old key | Video key | Result | Question frame | Correction frame | App image / evidence |
|---|---|---|---|---|---|---|
| Q1 / s13-q001 | [2] | [2] | MATCH | 00:26 (26s) | 01:36 (96s) | [image](../public/questions/series-13/question-001.webp) / [question](answer-audit-evidence/s13-q001-question.jpg), [reveal](answer-audit-evidence/s13-q001-correction.jpg) |
| Q2 / s13-q002 | [1] | [1] | MATCH | 01:42 (102s) | 02:12 (132s) | [image](../public/questions/series-13/question-002.webp) / [question](answer-audit-evidence/s13-q002-question.jpg), [reveal](answer-audit-evidence/s13-q002-correction.jpg) |
| Q3 / s13-q003 | [1] | [1] | MATCH | 02:18 (138s) | 02:50 (170s) | [image](../public/questions/series-13/question-003.webp) / [question](answer-audit-evidence/s13-q003-question.jpg), [reveal](answer-audit-evidence/s13-q003-correction.jpg) |
| Q4 / s13-q004 | [1, 3] | [1, 3] | MATCH | 02:56 (176s) | 03:26 (206s) | [image](../public/questions/series-13/question-004.webp) / [question](answer-audit-evidence/s13-q004-question.jpg), [reveal](answer-audit-evidence/s13-q004-correction.jpg) |
| Q5 / s13-q005 | [1] | [1] | MATCH | 03:32 (212s) | 04:16 (256s) | [image](../public/questions/series-13/question-005.webp) / [question](answer-audit-evidence/s13-q005-question.jpg), [reveal](answer-audit-evidence/s13-q005-correction.jpg) |
| Q6 / s13-q006 | [1] | [1] | MATCH | 04:22 (262s) | 04:40 (280s) | [image](../public/questions/series-13/question-006.webp) / [question](answer-audit-evidence/s13-q006-question.jpg), [reveal](answer-audit-evidence/s13-q006-correction.jpg) |
| Q7 / s13-q007 | [3] | [3] | MATCH | 04:46 (286s) | 05:26 (326s) | [image](../public/questions/series-13/question-007.webp) / [question](answer-audit-evidence/s13-q007-question.jpg), [reveal](answer-audit-evidence/s13-q007-correction.jpg) |
| Q8 / s13-q008 | [2] | [2] | MATCH | 05:32 (332s) | 06:18 (378s) | [image](../public/questions/series-13/question-008.webp) / [question](answer-audit-evidence/s13-q008-question.jpg), [reveal](answer-audit-evidence/s13-q008-correction.jpg) |
| Q9 / s13-q009 | [2, 4] | [2, 4] | MATCH | 06:24 (384s) | 07:14 (434s) | [image](../public/questions/series-13/question-009.webp) / [question](answer-audit-evidence/s13-q009-question.jpg), [reveal](answer-audit-evidence/s13-q009-correction.jpg) |
| Q10 / s13-q010 | [2] | [2] | MATCH | 07:20 (440s) | 08:00 (480s) | [image](../public/questions/series-13/question-010.webp) / [question](answer-audit-evidence/s13-q010-question.jpg), [reveal](answer-audit-evidence/s13-q010-correction.jpg) |
| Q11 / s13-q011 | [3] | [3] | MATCH | 08:06 (486s) | 08:42 (522s) | [image](../public/questions/series-13/question-011.webp) / [question](answer-audit-evidence/s13-q011-question.jpg), [reveal](answer-audit-evidence/s13-q011-correction.jpg) |
| Q12 / s13-q012 | [3] | [3] | MATCH | 08:48 (528s) | 09:32 (572s) | [image](../public/questions/series-13/question-012.webp) / [question](answer-audit-evidence/s13-q012-question.jpg), [reveal](answer-audit-evidence/s13-q012-correction.jpg) |
| Q13 / s13-q013 | [1, 2] | [1, 2] | MATCH | 09:38 (578s) | 10:26 (626s) | [image](../public/questions/series-13/question-013.webp) / [question](answer-audit-evidence/s13-q013-question.jpg), [reveal](answer-audit-evidence/s13-q013-correction.jpg) |
| Q14 / s13-q014 | [1, 4] | [1, 4] | MATCH | 10:32 (632s) | 11:24 (684s) | [image](../public/questions/series-13/question-014.webp) / [question](answer-audit-evidence/s13-q014-question.jpg), [reveal](answer-audit-evidence/s13-q014-correction.jpg) |
| Q15 / s13-q015 | [1] | [1] | MATCH | 11:30 (690s) | 12:00 (720s) | [image](../public/questions/series-13/question-015.webp) / [question](answer-audit-evidence/s13-q015-question.jpg), [reveal](answer-audit-evidence/s13-q015-correction.jpg) |
| Q16 / s13-q016 | [2] | [2] | MATCH | 12:06 (726s) | 12:32 (752s) | [image](../public/questions/series-13/question-016.webp) / [question](answer-audit-evidence/s13-q016-question.jpg), [reveal](answer-audit-evidence/s13-q016-correction.jpg) |
| Q17 / s13-q017 | [2] | [2] | MATCH | 12:38 (758s) | 13:08 (788s) | [image](../public/questions/series-13/question-017.webp) / [question](answer-audit-evidence/s13-q017-question.jpg), [reveal](answer-audit-evidence/s13-q017-correction.jpg) |
| Q18 / s13-q018 | [2] | [2] | MATCH | 13:14 (794s) | 13:32 (812s) | [image](../public/questions/series-13/question-018.webp) / [question](answer-audit-evidence/s13-q018-question.jpg), [reveal](answer-audit-evidence/s13-q018-correction.jpg) |
| Q19 / s13-q019 | [1] | [1] | MATCH | 13:38 (818s) | 14:00 (840s) | [image](../public/questions/series-13/question-019.webp) / [question](answer-audit-evidence/s13-q019-question.jpg), [reveal](answer-audit-evidence/s13-q019-correction.jpg) |
| Q20 / s13-q020 | [2] | [2] | MATCH | 14:06 (846s) | 14:50 (890s) | [image](../public/questions/series-13/question-020.webp) / [question](answer-audit-evidence/s13-q020-question.jpg), [reveal](answer-audit-evidence/s13-q020-correction.jpg) |

## Series 14

Questions checked: 20. Matched: 19. Corrected: 1. Manual review: 0.

Source: إمتحان تجريبي في أصعب 20 سؤال، إمتحان تجريبي رقم 14.mp4

Corrections:
- Q1: old [2, 4]; video [1, 4]; updated YES. Correction at 01:22 (82s).

| Question / ID | Old key | Video key | Result | Question frame | Correction frame | App image / evidence |
|---|---|---|---|---|---|---|
| Q1 / s14-q001 | [2, 4] | [1, 4] | CORRECTED | 00:26 (26s) | 01:22 (82s) | [image](../public/questions/series-14/question-001.webp) / [question](answer-audit-evidence/s14-q001-question.jpg), [reveal](answer-audit-evidence/s14-q001-correction.jpg) |
| Q2 / s14-q002 | [1] | [1] | MATCH | 01:28 (88s) | 02:14 (134s) | [image](../public/questions/series-14/question-002.webp) / [question](answer-audit-evidence/s14-q002-question.jpg), [reveal](answer-audit-evidence/s14-q002-correction.jpg) |
| Q3 / s14-q003 | [1, 3] | [1, 3] | MATCH | 02:20 (140s) | 03:30 (210s) | [image](../public/questions/series-14/question-003.webp) / [question](answer-audit-evidence/s14-q003-question.jpg), [reveal](answer-audit-evidence/s14-q003-correction.jpg) |
| Q4 / s14-q004 | [3] | [3] | MATCH | 03:36 (216s) | 04:18 (258s) | [image](../public/questions/series-14/question-004.webp) / [question](answer-audit-evidence/s14-q004-question.jpg), [reveal](answer-audit-evidence/s14-q004-correction.jpg) |
| Q5 / s14-q005 | [1] | [1] | MATCH | 04:24 (264s) | 05:20 (320s) | [image](../public/questions/series-14/question-005.webp) / [question](answer-audit-evidence/s14-q005-question.jpg), [reveal](answer-audit-evidence/s14-q005-correction.jpg) |
| Q6 / s14-q006 | [2] | [2] | MATCH | 05:26 (326s) | 06:04 (364s) | [image](../public/questions/series-14/question-006.webp) / [question](answer-audit-evidence/s14-q006-question.jpg), [reveal](answer-audit-evidence/s14-q006-correction.jpg) |
| Q7 / s14-q007 | [1, 3] | [1, 3] | MATCH | 06:10 (370s) | 06:54 (414s) | [image](../public/questions/series-14/question-007.webp) / [question](answer-audit-evidence/s14-q007-question.jpg), [reveal](answer-audit-evidence/s14-q007-correction.jpg) |
| Q8 / s14-q008 | [3] | [3] | MATCH | 07:00 (420s) | 07:34 (454s) | [image](../public/questions/series-14/question-008.webp) / [question](answer-audit-evidence/s14-q008-question.jpg), [reveal](answer-audit-evidence/s14-q008-correction.jpg) |
| Q9 / s14-q009 | [2, 4] | [2, 4] | MATCH | 07:40 (460s) | 08:18 (498s) | [image](../public/questions/series-14/question-009.webp) / [question](answer-audit-evidence/s14-q009-question.jpg), [reveal](answer-audit-evidence/s14-q009-correction.jpg) |
| Q10 / s14-q010 | [2, 4] | [2, 4] | MATCH | 08:24 (504s) | 09:20 (560s) | [image](../public/questions/series-14/question-010.webp) / [question](answer-audit-evidence/s14-q010-question.jpg), [reveal](answer-audit-evidence/s14-q010-correction.jpg) |
| Q11 / s14-q011 | [1, 3] | [1, 3] | MATCH | 09:26 (566s) | 10:00 (600s) | [image](../public/questions/series-14/question-011.webp) / [question](answer-audit-evidence/s14-q011-question.jpg), [reveal](answer-audit-evidence/s14-q011-correction.jpg) |
| Q12 / s14-q012 | [1] | [1] | MATCH | 10:06 (606s) | 11:04 (664s) | [image](../public/questions/series-14/question-012.webp) / [question](answer-audit-evidence/s14-q012-question.jpg), [reveal](answer-audit-evidence/s14-q012-correction.jpg) |
| Q13 / s14-q013 | [3] | [3] | MATCH | 11:10 (670s) | 11:50 (710s) | [image](../public/questions/series-14/question-013.webp) / [question](answer-audit-evidence/s14-q013-question.jpg), [reveal](answer-audit-evidence/s14-q013-correction.jpg) |
| Q14 / s14-q014 | [1] | [1] | MATCH | 11:56 (716s) | 12:30 (750s) | [image](../public/questions/series-14/question-014.webp) / [question](answer-audit-evidence/s14-q014-question.jpg), [reveal](answer-audit-evidence/s14-q014-correction.jpg) |
| Q15 / s14-q015 | [1, 4] | [1, 4] | MATCH | 12:36 (756s) | 13:10 (790s) | [image](../public/questions/series-14/question-015.webp) / [question](answer-audit-evidence/s14-q015-question.jpg), [reveal](answer-audit-evidence/s14-q015-correction.jpg) |
| Q16 / s14-q016 | [2] | [2] | MATCH | 13:16 (796s) | 13:58 (838s) | [image](../public/questions/series-14/question-016.webp) / [question](answer-audit-evidence/s14-q016-question.jpg), [reveal](answer-audit-evidence/s14-q016-correction.jpg) |
| Q17 / s14-q017 | [2] | [2] | MATCH | 14:04 (844s) | 14:40 (880s) | [image](../public/questions/series-14/question-017.webp) / [question](answer-audit-evidence/s14-q017-question.jpg), [reveal](answer-audit-evidence/s14-q017-correction.jpg) |
| Q18 / s14-q018 | [1] | [1] | MATCH | 14:46 (886s) | 15:28 (928s) | [image](../public/questions/series-14/question-018.webp) / [question](answer-audit-evidence/s14-q018-question.jpg), [reveal](answer-audit-evidence/s14-q018-correction.jpg) |
| Q19 / s14-q019 | [2] | [2] | MATCH | 15:34 (934s) | 16:06 (966s) | [image](../public/questions/series-14/question-019.webp) / [question](answer-audit-evidence/s14-q019-question.jpg), [reveal](answer-audit-evidence/s14-q019-correction.jpg) |
| Q20 / s14-q020 | [2] | [2] | MATCH | 16:12 (972s) | 16:46 (1006s) | [image](../public/questions/series-14/question-020.webp) / [question](answer-audit-evidence/s14-q020-question.jpg), [reveal](answer-audit-evidence/s14-q020-correction.jpg) |
