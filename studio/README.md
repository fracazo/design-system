# The System Proposes

A recording studio for the X series. Each scene is a real package component
on an illustrative cream / espresso / rose skin. Nothing here publishes.

## Run it

From the package root, after `pnpm install` and `pnpm build`:

```bash
pnpm studio
```

Open `http://localhost:5173`. Pick a scene, press `r` (or add `?record=1`)
to hide the chrome, then record. Arrows step between scenes. Escape brings
the chrome back.

## How to record

Prefer MP4 over GIF. X recompresses GIFs and they look soft.

1. Viewport 1080×1080 (1:1) or 1080×1350 (4:5). CleanShot, Kap or QuickTime.
2. 8 to 12 seconds. Start at rest, do the move, return to rest so the clip loops.
3. Show the cursor. Enlarge it in the OS if you can.
4. 60fps if the tool offers it. No browser chrome in the frame.
5. Turn off reduced motion on the machine, or the cards will not lift.
6. One clip per post. Do not stitch a montage.

## Posts and moves

Hashtag: `#DesignEngineering`. Every post stays under 280 characters.

### 01 · `#/intro`

Hover the OfferCard, then the primary button.

```
Starting a series: The System Proposes.

Watch the card lift. That hover is a CSS transition on a real component, not a mock.

19 components. A brand contract. Eight lint rules. An agent skill.

The bar lives in the tooling. The system proposes. I commit.

#DesignEngineering
```

### 02 · `#/queue`

Hover Continue. One signal, then rest.

```
When a team ships faster, the design review queue is the first thing that breaks.

Either every change waits on a designer, or the bar drops quietly.

I moved the bar into the tooling. One primary action. One emphasis signal.

#DesignEngineering
```

### 03 · `#/layers`

Hover Lint, then Components, then Skill.

```
An agentic design system is not a Figma file plus a prompt.

Mine lives in three places:

1. Lint: eight rules that catch what a reviewer would
2. Components: each one ships use-for and avoid-when in the source
3. An agent skill: rules load before any UI gets written

#DesignEngineering
```

### 04 · `#/brand`

Hover the rose card, then the periwinkle card.

```
Nothing brand-specific lives in the system. No hex in roles.css.

Each product keeps one brand file. Same roles, hue rotated: rose, then periwinkle.

Change the brand file, the whole product re-skins. The roles never move.

#DesignEngineering
```

### 05 · `#/nineteen`

Hover Default, then switch the tab.

```
The package ships 19 components. 17 sit on shadcn. Two are house primitives.

Each file opens with an intent block: one line, then Use for, Avoid when, Variants.

That block is the contract. The decision sits where it gets made.

#DesignEngineering
```

### 06 · `#/buttons`

Hover each variant top to bottom. Pause on Default so the lift reads.

```
Button is the tappable action primitive. Four variants, not a kitchen sink.

Default: the one primary action of a step. It lifts 2px on hover.
Outline: copy, save, dismiss.
Ghost: back, cancel, edit in place.
Destructive: irreversible acts only.

#DesignEngineering
```

### 07 · `#/form`

Click Email, type a short address, then type in Notes so the field grows.

```
Input, Textarea, Label, Form. The boring ones, on purpose.

Textarea auto-grows. A field outside react-hook-form uses Label plus Input.

A single date uses the native OS picker. Agents reach for the fancy control. The intent block says not to.

#DesignEngineering
```

### 08 · `#/choice`

Open the select, pick Birth centre.

```
Checkbox, RadioGroup, Select are for dense or utilitarian UI.

They are the wrong answer for a questionnaire. Birth-plan answers use icon cards with 44px targets.

Shipping a component is easy. Shipping when not to use it is the design system.

#DesignEngineering
```

### 09 · `#/overlays`

Open Preview the plan, wait for the zoom, close, then open Did you know.

```
Three overlays, three jobs.

Dialog: a focused task over dimmed content. Preview, confirm.
Sheet: mobile bottom sheet. On desktop the same content is an aside.
Popover: transient UI anchored to a control. Focus never moves.

#DesignEngineering
```

### 10 · `#/disclosure`

Collapse Labour, open Birth, switch to Notes.

```
Accordion: progressive disclosure inside the app.
Tabs: two or three peer views of equal weight. Inactive panels unmount.
Public FAQ: native details and summary, so answers exist without JavaScript.

Same family of UI. Three different contracts.

#DesignEngineering
```

### 11 · `#/cards`

Hover OfferCard, then ArticleCard. Watch lift, media scale, arrow rotate.

```
A card is a unit the reader picks up, not a border around a section. Cards do not nest.

OfferCard: a grid of peer offers, whole card one link, one emphasis signal.
ArticleCard: cover, tags as text (not badges), excerpt, byline. Never a carousel.

Hover is a CSS transition, gated to motion-safe.

#DesignEngineering
```

### 12 · `#/rank`

Drag Immediate skin to skin to the top by the grip handle.

```
SortableList ranks a small capped set. Two zones: a ranked list and a tap-to-add pool.

Touch, mouse, keyboard. Drag is scoped to the grip handle.

If order does not matter, do not use it. The avoid-when line is the point.

#DesignEngineering
```

### 13 · `#/skill`

Click the cream, then Tab through the three buttons.

```
How the agent half works:

A product's CLAUDE.md points at the skill. The skill names the mode, routes to the reference, and cites rules by stable ID.

Watch the ring. It is focus-visible, so a mouse click never paints it.

The system proposes. A human still commits.

#DesignEngineering
```

### 14 · `#/tokens`

Click Dark, pause two seconds, click Light.

```
Eight ESLint rules catch what a reviewer used to.

Colour literals. Dark pairs. Radius literals. Stock palette. Arbitrary clamps. focus: rings. Text on always-dark surfaces. Em dashes.

Write bg-card once. The token owns both themes. The build fails before anyone posts a screenshot.

#DesignEngineering
```

### 15 · `#/emphasis`

Hover the middle card, then a neighbour. Only one card is tinted.

```
A rule is added only when the same correction has recurred.

ds-intake collects the commits. The agent proposes. I accept.

Once is a review comment. Twice can become a token, a lint rule, or a contract entry.

One emphasis signal per surface. The middle card is the only one that tints.

#DesignEngineering
```

### 16 · `#/close`

Hover Start a product.

```
The System Proposes, last post.

@fracazo/design-system is public MIT. Lint, 19 components with intent docs, an agent skill, one brand file per product.

pnpm dlx --package @fracazo/design-system ds-init my-product

The next product starts with the bar already in the tooling.

#DesignEngineering
```
