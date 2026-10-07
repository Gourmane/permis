---
name: "طريقي"
description: "Arabic driving practice in a deep blue road-sign world."
colors:
  bg: "#082b5a"
  surface: "#103a71"
  royal: "#1552ac"
  ink: "#ffffff"
  muted: "#c4d6ee"
  primary: "#ffc34a"
  soft: "#1b4e91"
  line: "#315a8d"
  green: "#126e46"
  red: "#b62536"
  amber: "#775000"
  nav-bg: "#06234b"
  control-bg: "#164783"
  control-hover: "#235a9b"
  royal-hover: "#2163bd"
  focus: "#ffd575"
  destination-red: "#ca2e3e"
  success-bg: "#dff7e8"
  error-bg: "#ffe5e8"
  error-ink: "#9b1428"
  warning-bg: "#fff1ce"
  track: "#3865a0"
typography:
  headline:
    fontFamily: "Noto Kufi Arabic, sans-serif"
    fontSize: "clamp(25px, 2.6vw, 34px)"
    fontWeight: 600
    lineHeight: 1.6
  title:
    fontFamily: "Noto Kufi Arabic, sans-serif"
    fontSize: "21px"
    fontWeight: 600
    lineHeight: 1.6
  card-title:
    fontFamily: "Noto Kufi Arabic, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.6
  body:
    fontFamily: "Noto Sans Arabic, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "Noto Sans Arabic, sans-serif"
    fontSize: "12px"
    lineHeight: 1.85
  answer-number:
    fontFamily: "Noto Sans Arabic, sans-serif"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: 1.85
rounded:
  badge: "8px"
  field: "9px"
  control: "12px"
  surface: "16px"
spacing:
  small: "8px"
  gap: "12px"
  compact: "16px"
  control: "20px"
  layout: "24px"
  panel: "26px"
  gutter: "36px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.bg}"
    rounded: "{rounded.control}"
    padding: "11px 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.focus}"
    textColor: "{colors.bg}"
  button-secondary:
    backgroundColor: "{colors.control-bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "11px 20px"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.control-hover}"
  button-danger:
    backgroundColor: "#791c2b"
    textColor: "#ffe0e2"
    rounded: "{rounded.control}"
    padding: "11px 20px"
    height: "48px"
  field-select:
    backgroundColor: "#123e75"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "8px 12px"
    height: "44px"
  nav-active:
    backgroundColor: "{colors.royal}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "11px 14px"
    height: "49px"
  badge-success:
    backgroundColor: "{colors.success-bg}"
    textColor: "{colors.green}"
    rounded: "{rounded.badge}"
    padding: "4px 9px"
  series-card:
    backgroundColor: "{colors.royal}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "22px"
  series-blocked:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "22px"
  home-path:
    backgroundColor: "{colors.royal}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "26px"
    height: "154px"
  answer-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.bg}"
    rounded: "{rounded.control}"
    height: "86px"
  answer-correct:
    backgroundColor: "{colors.green}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "86px"
  answer-incorrect:
    backgroundColor: "{colors.red}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "86px"
  feedback-error:
    backgroundColor: "{colors.error-bg}"
    textColor: "{colors.error-ink}"
    rounded: "{rounded.control}"
    padding: "18px 22px"
---

# Design System: طريقي

## Overview

**Creative North Star: "طريقي — the blue road to practice"**

A confident Arabic driving-practice interface built around a deep blue canvas, royal blue destinations and warm yellow actions. The user's pinned direction overrides the earlier seed (15144445) and the previous light study interface. This is a record of the implemented system, not a proposal for another theme.

White Arabic typography sits above faint original road-sign outlines. The original question image remains the visual authority during practice; large numbered answer keys and persistent correction states give the learning loop a clear rhythm. UI text reads right to left, while utility numbers use Latin digits and isolated left-to-right expressions.

**Key Characteristics:**

- Deep blue surroundings, royal blue cards, white type and yellow actions.
- Local Arabic heading and body fonts with Latin utility digits.
- Six colorful home destinations and an image-led practice surface.
- Explicit correction through text, icons and color.

## Colors

The palette uses saturated blue surfaces, crisp white Arabic type and warm yellow interaction cues. Frontmatter values are normative and match the implemented CSS; the source names primary as the yellow action color.

### Primary

- **Deep Road Blue** (bg): repeating-pattern page canvas and topbar.
- **Royal Practice Blue** (royal): destination cards, ready series, active desktop navigation and default answer keys.
- **Warm Signal Yellow** (primary): primary actions, selections, progress fills and small learning icons.

### Secondary

- **Destination Red** (destination-red): the home mistakes destination, distinct from the darker answer-error red.
- **Correct Green / Answer Red** (green / red): filled correction keys with white digits.
- **Success Tint / Error Tint / Warning Tint** (success-bg / error-bg / warning-bg): readable feedback and status surfaces with dark semantic text.
- **Amber / Error Ink** (amber / error-ink): text on warning and error tints.

### Neutral

- **White Type** (ink): primary text on blue.
- **Cool Supporting Type** (muted): descriptions, labels and secondary information.
- **Layer Blue** (surface): panels, metrics and blocked series.
- **Navigation Blue** (nav-bg): fixed right navigation and mobile bottom bar.
- **Soft Blue / Border Blue / Progress Track** (soft / line / track): secondary layers, separators and unfilled progress.
- **Control Blue / Control Hover / Royal Hover** (control-bg / control-hover / royal-hover): interactive blue surfaces.
- **Warm Focus** (focus): visible keyboard outline, primary hover and active mobile navigation.

**The Correction Clarity Rule.** Pair correction color with Arabic text and a check or cross; locked answer keys retain full opacity.

## Typography

**Display Font:** locally bundled Noto Kufi Arabic, sans-serif fallback.
**Body Font:** locally bundled Noto Sans Arabic, sans-serif fallback.

Kufi provides confident Arabic headings; Sans carries directions, labels and numeric controls. The app imports Arabic font subsets locally: Kufi 600 and Sans 400/600. Latin glyphs follow the declared font stack and available glyph coverage.

### Hierarchy

- **Headline:** responsive page heading from the frontmatter; becomes 25px at 520px and below.
- **Title:** section heading at 21px; section title rows use 19px, then 17px on small mobile.
- **Card title:** 17px; series titles become 15px on small mobile. Home destination titles use 20px at full desktop and 19px on small mobile.
- **Body:** 15px with generous 1.85 leading; 14px at 520px and below.
- **Label:** commonly 12px; individual badges and keyboard guidance use 10–11px.
- **Answer number:** 32px, weight 600; 30px on small mobile. Numeric expressions have tabular figures, no wrapping and bidi isolation.

**The Reading Direction Rule.** Keep Arabic text RTL. Format utility digits through src/lib/numbers.ts and isolate composite numeric expressions with Numeric; answer keys stay in 1–4 left-to-right order.

## Layout

The document root is Arabic RTL. Desktop has a fixed right sidebar (230px), a 72px topbar and a bounded main area (1320px) with 36px horizontal gutters. The sidebar narrows to 205px and gutters to 24px at 1150px and below.

The home screen begins with a welcome heading and description without an eyebrow. Six destinations form a two-column grid with 18px gaps; a resumable session inserts a strip above them. Metrics use four columns and series use three, becoming four series columns at 1500px. Home previews retain three columns on wide screens.

Practice is bounded to 1120px: the first RTL grid track holds progress/navigation on the right (260px), and the original question plus answers sit on the left (maximum 752px). At 1150px the progress track becomes 220px and the gap 18px. At 1000px the quiz collapses into a column capped at 752px; the progress summary stays above the question and its question grid, helper and exit link are hidden.

At 800px the desktop sidebar disappears, the topbar becomes 64px and a fixed five-destination bottom navigation appears. Main bottom padding (105px, or 104px on small mobile) accommodates the navigation and its safe-area inset; the content scrolls beneath the fixed bar.

At 520px home destinations become a single column with 14px gaps, 134px minimum height, 22px padding and 56px circular icons. Main gutters become 16px. Series remain a two-column grid; headings and controls adapt to the smaller width. The four answer keys retain their left-to-right order and four-column layout.

## Elevation & Depth

Tonal blue layers and a low-opacity repeating road-sign pattern establish depth. The original SVG tile is 380 × 360px with pale blue outline strokes and 0.11 opacity; keep it behind content. Home destinations and ready series have restrained dark shadows, while ordinary panels, metrics and blocked series rely on their surface tone. The image dialog receives stronger elevation.

### Shadow Vocabulary

- **Destination:** `0 12px 26px #00173335`.
- **Series:** `0 10px 22px #00173330`; blocked series remove this shadow.
- **Dialog:** `0 18px 80px #00173380`, over a `#00152bd9` backdrop.

State changes use background transitions of 0.15s. There is no ornamental entrance animation or progress animation; reduced-motion mode disables transitions and smooth scrolling.

## Shapes

Surfaces and major cards use softly rounded 16px corners. Buttons, answer keys and quiz images use 12px; badges and question-navigation keys use 8px; select fields use 9px. White circular destination icons provide a repeated silhouette against rectangular cards. Dividers use blue strokes; answer keys use a stronger 2px state border.

## Components

### Buttons

Primary actions are yellow with deep blue text; secondary controls are blue with white text. Both use 12px corners, 11px × 20px padding and a 48px minimum height. Hover brightens the surface; keyboard focus uses a 3px warm yellow outline with 4px offset. Small buttons retain a 44px minimum height; icon controls are 44px square. Disabled ordinary buttons use 0.55 opacity. Danger actions use a dark burgundy surface and pale text. Series actions use a white surface with blue text.

### Inputs / Fields

Select filters have a label above, 44px minimum height, blue fill, blue border, 9px corners and 8px × 12px padding. They share the global visible focus outline. On small screens the filters wrap and field width becomes fluid. Checkboxes use the yellow accent.

### Navigation

The desktop menu pairs line icons and Arabic labels; its active row is royal blue with white text and a direction arrow. Rows have 49px minimum height and 12px corners. The mobile bar uses five icon/label destinations, 49px minimum-height links and a warm yellow active state. Settings remains available from the topbar.

### Chips

Status badges use compact 8px corners. Success uses a pale green surface with green text; awaiting verification uses pale yellow with amber text. Always preserve the status wording.

### Cards / Containers

Ready series are royal blue, padded 22px, with a pale numeric tile, status badge, progress track, real results and a white action. Their small-mobile padding becomes 16px. Blocked series use the layer-blue surface without shadow and direct the learner to content review.

**The Source Truth Rule.** Show unverified series as awaiting verification with a content-review link. Never style source availability as scoreable readiness.

Series 1 currently has source images but unverified answer keys. It remains quarantined from available questions and cannot be trained or scored. This status must stay truthful in future visual work.

### Home Destinations

Six full-card links combine a white circular line-icon disc, Kufi title, short description and trailing left arrow. Blue is the default, mistakes is red and topic practice is yellow with deep blue text. Desktop cards have 154px minimum height and 64px icons; small mobile uses the values in Layout.

### Answer Keys & Feedback

Four numbered keys support multiple selection with a separate confirmation action. Defaults are royal blue; selected keys are yellow with deep blue digits; saved correct keys are green and selected incorrect keys are red. Check/cross icons distinguish states. Locked keys retain opacity 1. Keys are at least 86px tall, or 80px on small mobile.

Feedback uses pale green or pale red, a text-and-icon verdict and both selected and correct answers. Error feedback includes a white correction-download button. Desktop question navigation uses 40px keys: current is yellow and answered is green.

### Source Image & Dialog

Show the full original image with automatic height, containment and a natural-width cap. The practice image is a zoom trigger. The native modal supports close, Escape, focus restoration, an additional zoom step, scrolling and a full-screen request where supported. It is capped at the smaller of 95vw and 1000px, with 90dvh maximum height.

## Do's and Don'ts

### Do:

- **Do** preserve the user-pinned blue, white and yellow world and the faint original road-sign pattern.
- **Do** keep Arabic text RTL and Latin numeric expressions isolated through Numeric.
- **Do** display the complete source question image with zoom access, four multi-select keys and a separate confirmation action.
- **Do** preserve text, icon and color correction, full-opacity locked keys, visible focus and reduced-motion support.
- **Do** retain truthful awaiting-verification cards and empty states; Series 1 has images but remains blocked from scoring until its answer keys are verified.

### Don't:

- **Don't** restore the stale light palette or Eastern-digit formatting.
- **Don't** crop the source question, invent answer keys or explanations, or fabricate progress.
- **Don't** turn the yellow action color into a default surface for every card.
- **Don't** describe all controls as at least 44px: the desktop question-navigation grid currently uses 40px keys.
