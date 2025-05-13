# RecipeMe – Brand Guide (v0.1)

---

## 1 · Brand Essence

| Item                      | Definition                                                                                                                                                                                          |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Elevator Pitch**        | *"RecipeMe turns viral short‑form videos into kitchen‑ready recipes."*                                                                                                                              |
| **Vision**                | *Make cooking from internet videos effortless, joyful, and social.*                                                                                                                                 |
| **Mission**               | *Empower everyday cooks to transform inspiration into action with a tap.*                                                                                                                           |
| **Positioning Statement** | *For social‑savvy home cooks who collect viral recipe videos, RecipeMe is a mobile sous‑chef that converts clips into clear step‑by‑step guides, turning chaotic scrolling into confident cooking.* |
| **Tagline Options**       | 1. *From Clip → Kitchen*   2. *Cook the Trend*   3. *Scroll · Tap · Cook*                                                                                                                             |

---

## 2 · Brand Personality & Voice

| Attribute             | Description                                              | Copy Cue                                    |
| --------------------- | -------------------------------------------------------- | ------------------------------------------- |
| **Empowering Mentor** | Encourages without judging; speaks in the second person. | "You've got this—let's whisk it up."        |
| **Joyful Discoverer** | Celebrates new flavors; playful but not silly.           | "Ready to unlock taco‑tok greatness?"       |
| **Calm Organizer**    | Reduces kitchen chaos; concise, structured.              | Step labels, timers, ingredient checklists. |
| **Community Builder** | Food as social glue; prompts sharing.                    | "Show off your masterpiece to friends."     |

**Tone Checklist**

- 👉 Active verbs ("Tap", "Slice", "Share").
- ✨ Small wins copy ("Boom! Ingredients sorted.").
- ❌ Avoid chef snobbery & jargon.

---

## 3 · Emotional Pillars → UX Hooks

| Pillar           | Feeling                  | UX Expression                                                    |
| ---------------- | ------------------------ | ---------------------------------------------------------------- |
| Empowerment      | "I can cook that."       | One‑tap import, progress bar, success confetti.                  |
| Joyful Discovery | "That's magic!"          | Link morph animation; playful sound cue.                         |
| Calm Competence  | "Everything's in order." | Large typography, whitespace, step check‑boxes, hands‑free mode. |
| Belonging        | "Look what *we* cooked." | Social share cards, community gallery, yearly recap.             |

---

## 4 · Visual Identity

### 4.1 Colour Palette

| Swatch                                                   | Name                      | HEX       | Use               |
| -------------------------------------------------------- | ------------------------- | --------- | ----------------- |
| ![#FF6B4A](https://via.placeholder.com/20/FF6B4A/FFFFFF) | **Paprika** (Primary)     | `#FF6B4A` | CTAs, highlights  |
| ![#3DD6B6](https://via.placeholder.com/20/3DD6B6/FFFFFF) | **Mint Leaf** (Secondary) | `#3DD6B6` | Success, accents  |
| ![#FFF6E9](https://via.placeholder.com/20/FFF6E9/000000) | **Eggshell** (Surface)    | `#FFF6E9` | App background    |
| ![#2D2A26](https://via.placeholder.com/20/2D2A26/FFFFFF) | **Espresso** (Text)       | `#2D2A26` | Primary text      |
| ![#8B8680](https://via.placeholder.com/20/8B8680/FFFFFF) | **Mushroom** (UI Muted)   | `#8B8680` | Borders, captions |

> **Accessibility:** Keep contrast ≥ 4.5:1 for text on Eggshell.

### 4.2 Typography

| Role             | Font               | Weight  | Notes                            |
| ---------------- | ------------------ | ------- | -------------------------------- |
| Headings         | **Poppins**        | 600     | Friendly curves, good legibility |
| Body             | **Inter**          | 400/500 | System fallback‑friendly         |
| Monospace / Code | **JetBrains Mono** | 400     | For developer snippets or timers |

### 4.3 Logo—Concept Directions

1. **Play‑to‑Chef:** A triangular play button morphs into a chef's hat bookmark.
2. **Recipe Fold:** A folded recipe card forming the letter *R*.
3. **Spoon & Spark:** Stylised spoon with sparkle representing transformation.

*All concepts must work at 24 × 24 px for app icon and scale to signage.*

### 4.4 Iconography

- Outline style, 2 px stroke, 24 px base grid.
- Rounded joins to echo friendly tone.

### 4.5 Imagery & Illustration

- **Photography:** Top‑down dishes, bright natural light, minimal props, vibrant ingredients.
- **Illustrations:** Simple flat vectors in Paprika & Mint accents for empty states.
- **Motion:** 200–300 ms ease‑out; avoid bounce; subtle parallax on scroll.

---

## 5 · UI / UX Guidelines

1. **Layout:** 8 pt spacing grid; max 600 px text line length.
2. **Components:**
   - **RecipeCard:** Thumbnail, name, cuisine chip, ready badge.
   - **FAB (Paprika):** "+" import button, shadow 4 dp.
   - **StepList:** Checkbox → strikes through on tap, haptic feedback.
3. **Micro‑interactions:**
   - Confetti burst on first successful import.
   - Haptic & audio tick when advancing steps.
4. **Hands‑Free Mode:** Large buttons, voice narration, keep screen awake.

---

## 6 · Brand Assets & Templates

| Asset                   | Purpose                                 | File Hint                                       |
| ----------------------- | --------------------------------------- | ----------------------------------------------- |
| **App Icon**            | Store listing, home screen              | Abstract play‑hat icon in Paprika on Eggshell   |
| **Social Share Card**   | Autogenerated when user shares a recipe | 1200×628, includes dish photo + branded ribbon  |
| **Launch Email Header** | Marketing emails                        | Animated GIF of link → recipe transformation    |
| **App Store Screens**   | iOS & Google Play                       | Use Mint accent backgrounds, clear benefit text |

---

## 7 · Do & Don't

| Do                                    | Don't                            |
| ------------------------------------- | -------------------------------- |
| Use Paprika sparingly for CTAs        | Drench UI entirely in bright red |
| Keep copy concise, action‑oriented    | Use technical cooking jargon     |
| Maintain 8 pt spacing rhythm          | Random paddings per screen       |
| Offer dark mode (Eggshell → Espresso) | Ignore accessibility contrast    |

---

## 8 · Launch Checklist

- [ ] Final logo vector + app icons exported.
- [ ] Colour & typography tokens added to design system.
- [ ] Social teaser posts scheduled (curiosity → delight).
- [ ] Beta onboarding email crafted in brand voice.
- [ ] Accessibility audit passes (contrast, VoiceOver labels).