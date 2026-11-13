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
    fontFamily: "Space Grotesk, system-ui, -apple-system, sans-serif"
    fontSize: "14.5px"
    fontWeight: 500
  stat:
    fontFamily: "Space Grotesk, system-ui, -apple-system, sans-serif"
    fontFeature: "'tnum' 1"
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
  button-primary:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink-black}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
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

The 842 profiles are a field of stars in a dark sky, and the visitor is the one pink point looking for its place among them. The interface is the observatory's instrument: plain dark ink surfaces that let the data glow and stay out of its way. The map, the four group colours and the pink "you" carry all of the colour; everything else stays close to the night, in ink, white and grey.

Density is moderate. Sections breathe with large vertical padding, while the results area packs controls, key figures, map and detail panel into a working instrument. Interactive parts are tactile: buttons lift and pick up a soft white glow on hover, selected chips fill with white, slider thumbs carry a soft halo. Nothing animates on scroll; the only standing motion is the ring that pulses from your dot in the hero.

Typography is a single geometric grotesque for everything. Where something is measured, its figures switch to equal widths, so numbers line up and do not jump while they change.

**Key Characteristics:**
- Near-black ink background, no glows, no pattern
- Colour means data: four group colours, pink for you; the interface itself is ink, white and grey
- One typeface, Space Grotesk, for everything; tabular figures for numbers
- See-through panels (2.5% white) with hairline borders; depth through light, not shadow
- Pills for choices, softly rounded rectangles for buttons and panels
- One solid white primary button per view; lift and soft glow as the response to touch

## Colors

A night palette: deep ink neutrals, and five luminous pastels that each mean something in the data.

### Primary
- **Paper White** (`paper-white`): primary text, the solid primary button, selected chips and segments (as a 14–18% tint), slider fills, caret and accent colour.

### Secondary
- **Aurora Green** (`aurora-green`): group 1, and the 2px focus ring, the one interface state that must stand out on every surface.
- **Nebula Blue** (`nebula-blue`): group 2; your matches in the distribution charts.
- **Twilight Violet** (`twilight-violet`): group 3; an area selected with the brush on the map.
- **Lantern Amber** (`lantern-amber`): group 4.

### Tertiary
- **Heartbeat Pink** (`heartbeat-pink`): you. Your heart on the map and in the logo, "just like you?" in the hero headline, your answers in the charts, your match count, your mode and threshold controls, and the questionnaire progress bar.

### Neutral
- **Ink Black** (`ink-black`): the page background and the theme colour; the text on the primary button; the fill of slider thumbs.
- **Panel / Panel Strong** (`panel`, `panel-strong`): see-through white fills for cards, chips and buttons; the strong one for hover and active states.
- **Tooltip Ink** (`tooltip-ink`): the nearly opaque chart tooltip.
- **Dim** (`text-dim`): secondary text, leads, inactive controls, axis labels, formulas.
- **Faint** (`text-faint`): captions, axis names, uppercase control labels, step numbers. It meets 4.5:1 on the background and on panels, and stays one clear step below Dim.
- **Line / Line Strong** (`line`, `line-strong`): hairline borders, dividers and grid lines; the strong one for hover borders, chart axes and scrollbars.

`--bg-1`, `--bg-2` and `--red` are defined in `main.css` but not used.

### Named Rules
**The One Heart Rule.** Heartbeat Pink belongs to the visitor. If something pink is not you or about you, it is wrong.

**The Group Colour Rule.** Group colours are fixed in order (green, blue, violet, amber for groups 1 to 4; groups are numbered left to right on the map). A component that shows a group takes that group's colour through `data-accent`; never use them to decorate steps, sections or numbers that are not about a group.

**The Quiet Interface Rule.** Controls, sections and cards have no colour of their own. If an element is coloured, it must show a group, you, or keyboard focus.

## Typography

**Font:** Space Grotesk (with system-ui, -apple-system, sans-serif), the only typeface, also inside the charts

**Character:** Space Grotesk is warm but engineered, with tight tracking at large sizes and distinctive figures (the 1 and the 4) that give the key numbers their own voice.

### Hierarchy
- **Display** (600, clamp(38px, 6.4vw, 72px), 1.02): the hero question only; the part about you in solid Heartbeat Pink.
- **Headline** (700, clamp(28px, 4.4vw, 46px), 1.08): section titles. No label above them; the heading starts the section.
- **Title** (600, 20–26px): questionnaire step title, step cards, detail panel title, distribution heading.
- **Body** (400, 16px, 1.65): running text; leads in Dim at max 540–640px wide, the hero lead at 17px.
- **Label** (sans 500, 14.5px for buttons, 13–14px for chips, segments and nav links).
- **Meta** (sans 500, 13px, Dim or the group's colour): informational lines above a panel title, such as "Step 1 of 6" or "Group 3 · profile #29605".
- **Stat** (600, 22–30px, tabular figures): key figures; in the colour of their group or of you when they are about one, otherwise Paper White.
- **Control label** (sans, 11.5px, uppercase, 0.06em, Faint): labels above controls such as MODE and THRESHOLD.

### Named Rules
**The Readout Rule.** One typeface. Numbers that are measured, compared or change live (key figures, percentages, slider values, formulas, step numbers) use tabular figures (`font-variant-numeric: tabular-nums`, the `num` class); no monospace font anywhere, including `<code>`.

## Layout

A centred container (max 1180px, 24px side gutter) holds every section. Sections are separated by hairline top borders and padded clamp(64px, 10vw, 112px) vertically. The fixed nav is 68px tall; anchor scrolling leaves 20px more.

- **Hero:** two columns (1.1fr / 0.9fr) with copy left and the map figure right; one column below 880px. Nothing sits above the headline; the course and year follow the buttons as a quiet line. The questionnaire follows directly; there is no figure strip in between.
- **Questionnaire:** a 240px sticky step list beside the question panel; on phones the steps scroll sideways above it.
- **Results:** a controls bar, a four-cell key-figure strip, then map and detail panel at 1.75fr / 1fr (one column below 960px); distributions in three columns, two below 960px, one below 640px. Attributes with more than 12 values take a full row, and on phones their bars turn horizontal.
- **Gaps:** 16px between panels and grid cells; 8–12px between chips and buttons.

## Elevation & Depth

Depth comes from light, not shadow. Surfaces are flat, see-through panels on the ink background, separated by hairline borders. Light appears only as a response: a soft white halo when a button is hovered, a halo around slider thumbs. The only dark drop shadow belongs to the floating chart tooltip.

### Shadow Vocabulary
- **Hover glow** (`box-shadow: 0 8px 30px rgba(234, 234, 242, 0.08)`): buttons on hover, together with a 2px lift.
- **Thumb halo** (`box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent)`): range slider thumbs.
- **Tooltip float** (`box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5)`): chart tooltips only.

### Named Rules
**The Starlight Rule.** Things glow; they do not cast shadows. Use a soft glow for interaction and a dark shadow only for tooltips that float over the chart.

## Shapes

Softly rounded rectangles for containers and buttons (14px for panels, 10px for buttons, step items and tooltips, 8px for small inline formula tags). Full pills for every choice: chips, segmented controls and the slider track. Circles for dots, thumbs and the map's points. Borders are always 1px hairlines; the only 2px stroke is the pink questionnaire progress bar.

## Components

### Buttons
Tactile, with one clear primary.
- **Shape:** gently rounded (10px).
- **Primary:** solid Paper White with Ink Black text, weight 600; pure white on hover. One per view (start the questionnaire, Next, Show my results).
- **Default:** see-through panel fill, Line Strong border, Paper White text at 14.5px, padding 12px 20px, 9px gap to a 16px icon.
- **Hover / Focus:** lifts 2px, border brightens to 40% white and picks up the hover glow; focus shows a 2px green outline with 2px offset.
- **Small:** padding 7px 13px, 13px text.
- **Disabled:** 40% opacity, no lift.

### Chips
- **Style:** pill, panel fill, hairline border, Dim text at 13px, padding 5px 12px.
- **Hover:** text to Paper White, border to Line Strong.
- **Selected (`aria-pressed`):** fill 14% and border 60% of the accent (white unless the chip is about a group or you), white text.
- **Disabled:** 45% opacity.

### Segmented control
A pill track (3px inset, hairline border) of buttons; the pressed one fills with 18% of the accent and turns white. The similar/opposites mode uses pink, because it is your setting.

### Cards / Containers
- **Corner Style:** 14px.
- **Background:** Panel (2.5% white).
- **Shadow Strategy:** none at rest (see Elevation & Depth). Cards that are not interactive do not move on hover.
- **Border:** 1px Line.
- **Internal Padding:** clamp(18px, 2.4vw, 26px).
- **Content:** an optional Meta line, a 15–20px semibold title, a 13px Dim hint, then content.

### Inputs / Fields
- **Range slider:** 4px pill track filled with the accent (white by default, pink for your threshold) up to the value and Line Strong after it; an 18px ink thumb with a 2px accent ring and the thumb halo.
- **Choice fields:** rows of chips.
- **Focus:** the global green outline.

### Navigation
Fixed, 68px, transparent at the top; after scrolling it gains 72% ink with a 14px backdrop blur and a hairline bottom border. The logo is a pink heart and "Project Eros" at 15px, weight 600; links are 14px in Dim, Paper White on hover. Below 560px only the first link and the GitHub icon remain.

### Key-figure strip
Four cells in one bordered, rounded block, divided by hairlines. Each cell has a value with tabular figures and a 12.5px Dim label below. Your match count is pink, your group and your closest match take the colour of their group, the share of everyone stays Paper White. Cells that act as buttons brighten to Panel Strong on hover.

### Observatory map (signature)
The PCA scatter: every profile a dot in its group colour, profiles below the threshold dimmed, the visitor a pink heart drawn on top. Axes and grid in hairlines, axis labels at 11px, a dark, nearly opaque tooltip. In the hero the same map appears as a static SVG figure; the only motion is a ring pulsing out from your dot. A short caption follows ("842 profiles · ● you").

## Do's and Don'ts

### Do:
- **Do** let the data carry the colour: group colours for groups, pink for you, nothing else coloured except the focus ring (The Quiet Interface Rule).
- **Do** keep Heartbeat Pink for the visitor alone (The One Heart Rule).
- **Do** set everything in Space Grotesk and give measured numbers tabular figures (The Readout Rule).
- **Do** answer touch with light: lift, soft glow, white fill, thumb halo, eased with `cubic-bezier(0.22, 1, 0.36, 1)` over 0.22s.
- **Do** build new containers as see-through panels with a 1px hairline border and 14px radius.
- **Do** stop all animation under `prefers-reduced-motion`.
- **Do** draw icons as inline line SVGs (24px grid, 2px stroke, round caps) at 16px; no emoji or text glyphs as icons.
- **Do** theme browser surfaces from the palette: thin scrollbars in Line Strong, white caret and accent colour, green focus ring.

### Don't:
- **Don't** put a label or kicker above a section heading, and don't use code paths (`~/…`) or code comments (`// …`) as decoration.
- **Don't** add a row of big decorative numbers under the hero; key figures belong where they answer a question, as in the results.
- **Don't** fade or slide content in on scroll.
- **Don't** add dark drop shadows to cards or buttons; only tooltips float (The Starlight Rule).
- **Don't** introduce new hues; red, the two unused background steps and any new accent need a reason tied to data or state.
- **Don't** go below 4.5:1 for any text; Faint (`text-faint`) is the lowest text colour, for captions and labels beside stronger text.
- **Don't** add gradient text, glows, grid or dot patterns behind the page, or coloured stripes on the edge of callouts.
