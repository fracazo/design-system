# Canastra

Recording studio for the X series. The on-screen product is a Minas Gerais
tasting guide: Serra da Canastra, Serro, Pampulha. No product brand lives
here. Nothing in this folder publishes.

The package on npm stays `@fracazo/design-system`. **Canastra** is the name
you say on X.

Named for queijo Canastra: it is only itself if it comes from that serra.
Same contract as the system. The roles never move.

Runners-up if you want a different Minas word later: **Serro**, **pedra-sabão**,
**Vila Rica**. Pão de queijo is too cute. Matrinxã is Mato Grosso.

## Run it

From the package root, after `pnpm install` and `pnpm build`:

```bash
pnpm studio
```

Open `http://localhost:5173`. Pick a scene, press `r` (or add `?record=1`)
to hide the chrome, then record. Arrows step between scenes. Escape brings
the chrome back.

## How to post on X

The clip is the post. The text is a caption. For You shows the first line
and autoplays the video muted, so the first second of motion has to read
without sound.

1. MP4, not GIF. 1080×1080 or 1080×1350. 8 to 12 seconds.
2. Start at rest, do the move, return to rest so it loops.
3. Show a large cursor. No browser chrome. Reduced motion off.
4. First line is the hook. Proper noun or a sharp claim. Not "starting a series".
5. One hashtag at the end, `#DesignEngineering`. People find the series by
   searching **Canastra**.
6. One clip per post. Do not stitch a montage. Do not pin a 16-post thread.

## Posts and moves

Every caption is under 280 characters. Attach the scene's clip.

### 01 · `#/intro`

Hover the OfferCard, then Order a wheel.

```
Canastra is a cheese you cannot fake.

It is only Canastra if it comes from one serra in Minas. I named a design system after that.

Watch the card. CSS transition. No JavaScript.

#DesignEngineering
```

### 02 · `#/queue`

Hover Continue. One signal, then rest.

```
Agents write most of my UI now.

The design review queue did not survive. Either every change waits, or the bar drops.

I put the bar in the tooling. One button. One signal.

#DesignEngineering
```

### 03 · `#/layers`

Hover Lint, then Components, then Skill.

```
An agentic design system is three things you can hover.

Lint that fails the build.
Components that say when not to use them.
A skill agents load before they touch any UI.

#DesignEngineering
```

### 04 · `#/brand`

Hover Canastra, then Pampulha.

```
Same card. I only changed the brand file.

Left is Canastra. Right is Pampulha.

No hex in the system. The hue lives in one file. The roles never move.

#DesignEngineering
```

### 05 · `#/nineteen`

Hover Default, then switch the tab.

```
19 components. Each file opens with Use for and Avoid when.

That block is the contract. The decision sits where the agent is already looking.

#DesignEngineering
```

### 06 · `#/buttons`

Hover each variant. Pause on Order a wheel.

```
Four buttons. That is the whole set.

Default lifts 2px. That is the one primary action.
Outline, ghost, destructive. Everything else is a mistake.

#DesignEngineering
```

### 07 · `#/form`

Click Email, type, then grow the notes field.

```
The boring components are the point.

Textarea grows. A single date uses the OS picker.

Agents reach for the fancy control. The file says not to.

#DesignEngineering
```

### 08 · `#/choice`

Open the select, pick Serro.

```
Select is for long filters. This one is micro-regions of Minas.

A short list of cheeses should be cards.

Shipping the component is easy. Shipping the refuse-when is the system.

#DesignEngineering
```

### 09 · `#/overlays`

Open Preview the wheel, close, then How to keep it.

```
Three overlays. Three jobs.

Dialog for the wheel.
Sheet for how to keep it.
Popover stays on the search.

If the agent opens a Dialog for all three, the surface shouts.

#DesignEngineering
```

### 10 · `#/disclosure`

Collapse Fresco, open Meia-cura, switch to Route.

```
Fresco, meia-cura, curado.

Accordion for ages. Tabs when the views weigh the same.

A public FAQ still uses details and summary. No JavaScript required.

#DesignEngineering
```

### 11 · `#/cards`

Hover OfferCard, then ArticleCard.

```
A card is a thing you pick up, not a border around a section.

Hover: 8px lift, media scale, arrow rotates. CSS. motion-safe.

No carousel. No badges. No glass.

#DesignEngineering
```

### 12 · `#/rank`

Drag Canastra curado to the top.

```
Drag the tasting order. Grip handle only.

Touch, mouse, keyboard.

If order does not matter, do not use this.

#DesignEngineering
```

### 13 · `#/skill`

Click the cream, then Tab through the three buttons.

```
Click nothing. Hit Tab.

The ring is focus-visible. A mouse click never paints it.

The skill names the mode. I still commit.

#DesignEngineering
```

### 14 · `#/tokens`

Click Dark, pause, click Light.

```
One class. Light and dark.

bg-card. The token owns both.

Eight lint rules catch the rest. The build fails before anyone posts a screenshot.

#DesignEngineering
```

### 15 · `#/emphasis`

Hover the middle wheel, then a neighbour.

```
Only the middle wheel is tinted.

One emphasis signal. A rule ships only when I have made the same correction twice.

#DesignEngineering
```

### 16 · `#/close`

Hover Start a product.

```
Canastra. Public MIT.

@fracazo/design-system

pnpm dlx --package @fracazo/design-system ds-init my-product

The next product starts already named.

#DesignEngineering
```
