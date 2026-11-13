---
name: Project Eros
description: Find your place among 842 real OkCupid profiles, on a dark map computed in the browser.
colors:
  aurora-green: "#5cf0b0"
  nebula-blue: "#6eb5ff"
  twilight-violet: "#c99bff"
  lantern-amber: "#ffc06e"
  heartbeat-pink: "#ff8fc7"
  ink-black: "#08080c"
  panel: "rgba(255, 255, 255, 0.025)"
  panel-strong: "rgba(255, 255, 255, 0.045)"
  tooltip-ink: "rgba(13, 13, 20, 0.96)"
  paper-white: "#eaeaf2"
  text-dim: "#9a9aad"
  text-faint: "#7a7a90"
  line: "rgba(255, 255, 255, 0.08)"
  line-strong: "rgba(255, 255, 255, 0.16)"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(38px, 6.4vw, 72px)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Space Grotesk, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(28px, 4.4vw, 46px)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Space Grotesk, system-ui, -apple-system, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Space Grotesk, system-ui, -apple-system, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "13px"
    fontWeight: 500
    letterSpacing: "0.04em"
  stat:
    fontFamily: "JetBrains Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "clamp(28px, 4vw, 40px)"
    fontWeight: 600
    letterSpacing: "-0.02em"
rounded:
  xs: "8px"
  sm: "10px"
  md: "14px"
  pill: "999px"
spacing:
  gutter: "24px"
  gap: "16px"
  panel: "clamp(18px, 2.4vw, 26px)"
  section: "clamp(64px, 10vw, 112px)"
components:
  button:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.paper-white}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
  button-small:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.sm}"
    padding: "7px 13px"
  chip:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text-dim}"
    rounded: "{rounded.pill}"
    padding: "5px 12px"
  segmented:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text-dim}"
    rounded: "{rounded.pill}"
    padding: "3px"
  panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.md}"
    padding: "{spacing.panel}"
  tooltip:
    backgroundColor: "{colors.tooltip-ink}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
---

# Design System: Project Eros

## Overview

**Creative North Star: "The Night Observatory"**

The 842 profiles are a field of stars in a dark sky, and the visitor is the one pink point looking for its place among them. The interface is the observatory's instrument: dark ink surfaces that let the data glow, mono-type annotations that read like readouts, and a few soft lights in the corners of the page. The map, the four group colours and the pink "you" carry the colour; everything else stays close to the night.

Density is moderate. Sections breathe with large vertical padding, while the results area packs controls, key figures, map and detail panel into a working instrument. Interactive parts are glowing and tactile: buttons lift and pick up a green glow on hover, selected chips fill with their accent, slider thumbs carry a soft halo. Motion is short and eased out; elements rise into view as you scroll, and all of it stops under reduced motion.

Typography pairs a geometric grotesque for speech with a mono face for data and annotations. Terminal hints (`~/project-eros`, `// how it works`) mark the author's developer voice, but they are captions, not the subject.

**Key Characteristics:**
- Near-black ink background with two faint corner glows (pink top left, blue top right) and no pattern
- Four group colours plus pink for you; colour means data or state
- Space Grotesk for text, JetBrains Mono for numbers, labels, kickers and controls
- See-through panels (2.5% white) with hairline borders; depth through light, not shadow
- Pills for choices, softly rounded rectangles for buttons and panels
- Glow, lift and accent fills as the response to touch

## Colors

A night palette: deep ink neutrals and five luminous pastels that each mean something.

### Primary
- **Aurora Green** (`aurora-green`): the default accent. Group 1, focus outlines, text selection, the hover glow of buttons, the primary button tint, selected chips and slider fills when no other accent is set.

### Secondary
- **Nebula Blue** (`nebula-blue`): group 2; the second corner glow of the page; partner of green in the primary button gradient.
- **Twilight Violet** (`twilight-violet`): group 3.
- **Lantern Amber** (`lantern-amber`): group 4.

### Tertiary
- **Heartbeat Pink** (`heartbeat-pink`): you. Your heart on the map, the logo heart, "just like you?" in the hero headline, the questionnaire progress start and the top-left page glow. Nothing else uses it.

### Neutral
- **Ink Black** (`ink-black`): the page background and the theme colour; also the fill of slider thumbs.
- **Panel / Panel Strong** (`panel`, `panel-strong`): see-through white fills for cards, chips and buttons; the strong one for hover and active states.
- **Tooltip Ink** (`tooltip-ink`): the nearly opaque chart tooltip with backdrop blur.
- **Paper White** (`paper-white`): primary text.
- **Dim** (`text-dim`): secondary text, leads, inactive controls, axis labels.
- **Faint** (`text-faint`): captions, axis names, uppercase control labels, inactive step numbers. It meets 4.5:1 on the background and on panels, and stays one clear step below Dim.
- **Line / Line Strong** (`line`, `line-strong`): hairline borders, dividers and grid lines; the strong one for hover borders and chart axes.

`--bg-1`, `--bg-2` and `--red` are defined in `main.css` but not used.

### Named Rules
**The One Heart Rule.** Heartbeat Pink belongs to the visitor. If something pink is not you or about you, it is wrong.

**The Group Colour Rule.** Group colours are fixed in order (green, blue, violet, amber for groups 1 to 4; groups are numbered left to right on the map). A component that shows a group takes that group's colour through `data-accent`; never reassign the colours for decoration.

## Typography

**Display Font:** Space Grotesk (with system-ui, -apple-system, sans-serif)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, SF Mono, Menlo, monospace)

**Character:** Space Grotesk is warm but engineered, with tight negative tracking at large sizes; JetBrains Mono gives every number and label the look of an instrument reading.

### Hierarchy
- **Display** (600, clamp(38px, 6.4vw, 72px), 1.02): the hero question only; the part about you in solid Heartbeat Pink.
- **Headline** (700, clamp(28px, 4.4vw, 46px), 1.08): section titles.
- **Title** (600, 20–26px): questionnaire step title, step cards, detail panel title, distribution heading.
- **Body** (400, 16px, 1.65): running text; leads in Dim at max 540–640px wide, the hero lead at 17px.
- **Label** (mono 500, 13px, 0.04em): kickers in the section accent, written as code comments (`// how it works`); nav links; buttons at 14px; chips and segmented controls at 12.5px.
- **Stat** (mono 600, clamp(28px, 4vw, 40px)): key figures in their accent colour.
- **Control label** (sans, 11.5px, uppercase, 0.06em, Faint): labels above controls such as MODE and THRESHOLD.

### Named Rules
**The Readout Rule.** Numbers, formulas, controls and annotations are mono; sentences are sans. A figure that the visitor reads as a measurement is set in JetBrains Mono.

## Layout

A centred container (max 1180px, 24px side gutter) holds every section. Sections are separated by hairline top borders and padded clamp(64px, 10vw, 112px) vertically. The fixed nav is 68px tall; anchor scrolling leaves 20px more.

- **Hero:** two columns (1.1fr / 0.9fr) with copy left and the map figure right; one column below 880px. Nothing sits above the headline; the course and year follow the buttons as a quiet mono line.
- **Questionnaire:** a 240px sticky step list beside the question panel.
- **Results:** a controls bar, a four-cell key-figure strip, then map and detail panel at 1.75fr / 1fr (one column below 960px); distributions in three columns, two below 960px, one below 640px.
- **Strips:** four cells divided by hairlines, two by two on small screens.
- **Gaps:** 16px between panels and grid cells; 8–12px between chips and buttons.

## Elevation & Depth

Depth comes from light, not shadow. Surfaces are flat, see-through panels on the ink background, separated by hairline borders. Depth appears as glow: soft radial lights behind the page and a coloured halo when a button is hovered. The only dark drop shadow belongs to the floating chart tooltip.

### Shadow Vocabulary
- **Hover glow** (`box-shadow: 0 8px 30px rgba(92, 240, 176, 0.12)`): buttons on hover, together with a 2px lift.
- **Thumb halo** (`box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent)`): range slider thumbs.
- **Tooltip float** (`box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5)` with `backdrop-filter: blur(6px)`): chart tooltips only.

### Named Rules
**The Starlight Rule.** Things glow; they do not cast shadows. Use a coloured glow for interaction and a dark shadow only for tooltips that float over the chart.

## Shapes

Softly rounded rectangles for containers and buttons (14px for panels, 10px for buttons, step items and tooltips, 8px for small inline formula tags). Full pills for every choice: chips, segmented controls and the slider track. Circles for dots, thumbs and the map's points. Borders are always 1px hairlines; accent strokes are 2px (the top edge of method cards, the questionnaire progress bar).

## Components

### Buttons
Glowing and tactile.
- **Shape:** gently rounded (10px).
- **Default:** see-through panel fill, Line Strong border, Paper White mono text at 14px, padding 12px 20px, 9px gap to a 16px icon.
- **Hover / Focus:** lifts 2px, border turns green (50% alpha) and picks up the hover glow; focus shows a 2px green outline with 2px offset.
- **Primary:** a faint green-to-blue tint (16% and 12% alpha) with a green border at 40%, white text.
- **Small:** padding 7px 13px, 12.5px text.
- **Disabled:** 40% opacity, no lift.

### Chips
- **Style:** pill, panel fill, hairline border, Dim mono text at 12.5px, padding 5px 12px.
- **Hover:** text to Paper White, border to Line Strong.
- **Selected (`aria-pressed`):** fill 14% and border 60% of the accent, white text.
- **Disabled:** 45% opacity.

### Segmented control
A pill track (3px inset, hairline border) of mono buttons; the pressed one fills with 18% of the accent and turns white. Used for the similar/opposites mode.

### Cards / Containers
- **Corner Style:** 14px.
- **Background:** Panel (2.5% white).
- **Shadow Strategy:** none at rest (see Elevation & Depth).
- **Border:** 1px Line.
- **Internal Padding:** clamp(18px, 2.4vw, 26px).
- **Content:** a 15px semibold title, a 13px Dim hint, then content.

### Inputs / Fields
- **Range slider:** 4px pill track filled with the accent up to the value and Line Strong after it; an 18px ink thumb with a 2px accent ring and the thumb halo.
- **Choice fields:** rows of chips.
- **Focus:** the global green outline.

### Navigation
Fixed, 68px, transparent at the top; after scrolling it gains 72% ink with a 14px backdrop blur and a hairline bottom border. The logo is a pink heart and `~/project-eros` at 14px; links are 13px mono in Dim, Paper White on hover. Below 560px only the first link and the GitHub icon remain.

### Key-figure strip
Four cells in one bordered, rounded block, divided by hairlines. Each cell has a mono or sans value in its accent colour and a 12.5–13.5px Dim label below. Cells that act as buttons brighten to Panel Strong on hover.

### Observatory map (signature)
The PCA scatter: every profile a dot in its group colour, profiles below the threshold dimmed, the visitor a pink heart drawn on top. Axes and grid in hairlines, mono axis labels at 11px, a dark blurred tooltip. In the hero the same map appears as a static SVG figure; the only motion is a ring pulsing out from your dot. A mono caption follows (`~/pca-map · 842 profiles · ● you`).

## Do's and Don'ts

### Do:
- **Do** let the data carry the colour: group colours on the map, in key figures and in kickers of group-related panels.
- **Do** keep Heartbeat Pink for the visitor alone (The One Heart Rule).
- **Do** set numbers, labels, controls and kickers in JetBrains Mono, sentences in Space Grotesk.
- **Do** answer touch with light: lift, green glow, accent fill, thumb halo, eased with `cubic-bezier(0.22, 1, 0.36, 1)` over 0.22s.
- **Do** build new containers as see-through panels with a 1px hairline border and 14px radius.
- **Do** stop all animation and reveal everything at once under `prefers-reduced-motion`.

### Don't:
- **Don't** add dark drop shadows to cards or buttons; only tooltips float (The Starlight Rule).
- **Don't** introduce new hues; red, the two unused background steps and any new accent need a reason tied to data or state.
- **Don't** go below 4.5:1 for any text; Faint (`text-faint`) is the lowest text colour, for captions and labels beside stronger text.
- **Don't** add gradient text, grid or dot patterns behind the page, or coloured stripes on the edge of callouts.
