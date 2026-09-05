# Components

Load when: choosing or composing a component.
Canonical owner: the intent block at the top of each component's source in
the package (`src/ui/*.tsx`, or `dist/src/ui/*.js` in a consumer). Read it;
it is the contract (one line, Use for, Avoid when, Variants). `DESIGN.md`,
Components, has the one-paragraph digest.

## Choosing

| Job | Reach for | Not |
|---|---|---|
| The one primary action of a step | `Button` default | a styled anchor |
| Standard secondary (copy, save, dismiss) | `Button` outline | a second primary |
| Back, cancel, edit in place | `Button` ghost | outline |
| Irreversible act | `Button` destructive, proportional, with undo if honest | a red default |
| Enumerable answer in a questionnaire | the product's icon-card groups (rule/house-pattern-for-answers) | RadioGroup, Checkbox, Select |
| Long enumeration in utilitarian UI | `Select` | a scrolling card grid |
| A single date | native date input | `Calendar` |
| Focused task over dimmed content | `Dialog` | Sheet |
| Supplementary content on mobile | `Sheet` side bottom, aside on desktop (rule/sheet-on-mobile-aside-on-desktop) | Dialog |
| Transient UI attached to a control | `Popover`, anchored on the control | Dialog |
| Progressive disclosure in the app | `Accordion` | a custom toggle |
| Public FAQ | native details and summary | Accordion |
| Two or three peer views | `Tabs` | Accordion |
| Secondary detail under a heading | `Accordion` | Tabs |
| Ranking a small capped set | `SortableList` | drag on a plain list |
| Long free text | `Textarea` (auto-grows) | Input |

## Composing

- Never copy a component into a product to change it. Change it upstream,
  bump. A component that must import app code stays in the product (like
  `place-autocomplete`).
- `className` on a package component adds layout; it does not override its
  colour, radius or shadow. If the look is wrong, the variant or the
  component is wrong.
- `cn` from the package (products re-export it from `@/lib/utils`).
- Cards do not nest. A card is a unit the reader picks up, not a border
  around a section.
- Button wraps bare text children in a span so icon-leading and
  icon-trailing padding can differ; keep icons as direct children.
