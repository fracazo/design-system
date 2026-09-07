# Intake

Load when: running or judging a design intake, or deciding what to do with
a review comment that keeps coming back.
Canonical owner: this file for the procedure; `rules.md` and `exemplars/`
for what accepted candidates become.

Standards change as components, names and surfaces change. The intake loop
turns what actually happened (commits, review comments, snapshot deltas)
into candidates, and keeps three jobs apart so no single message becomes a
rule by itself.

## 1. Collect (mechanical)

`ds-intake --repo <product> [--repo <product>] --since <date|ref> --out
skills/product-design/intake/<date>.md` gathers every design-relevant
commit verbatim (subject, body, touched files) and writes a packet with
empty judge and review sections. It never scores or proposes. Run it at a
merge to a product's `main`, or weekly; the packet's last section names the
`--since` for the next run. Add review comments and screenshots by hand
under the commit they belong to, quoted, with a link.

## 2. Judge (agent, in the packet)

Read the whole packet before writing a candidate. Then:

- Group evidence that points at the same decision. One candidate per
  decision, not per commit.
- Separate verified facts (what the commit changed, what was measured) from
  inferences (why it was probably done) and open questions.
- Check each candidate against `rules.md`: already covered, a refinement, or
  new. A refinement names the rule ID it changes.
- Fill the candidate block: scope, decision, rationale, evidence hashes,
  exceptions, a bad and good example, and the narrowest destination:
  `rule` (a new record), `exemplar` (a decision worth repeating, from one
  shipped change), `lint` (code can check it without rendering and without
  many exceptions), `eval` (a before and after fixture), `coverage gap`, or
  `no change` (already recorded, or not a design decision).
- Leave every candidate `proposed`. Put process notes and non-design
  changes under Rejected topics with one line saying why.
- A single commit is enough for an exemplar. A rule needs the correction
  to have recurred, or a human to say it will.

## 3. Review (human)

Alex sets each candidate to `accepted` or `rejected`, may change the
destination, and may add the one thing the packet cannot: a decision that
has not shipped yet. Accepted candidates move in the same branch:

| Destination | Where it lands |
|---|---|
| rule | a new `### rule/<id>` in `rules.md`, and DESIGN.md if the narrative needs it |
| exemplar | `exemplars/<slug>.md` with Status, Product, Source, Rules, Decision, Why, Repeat, Avoid |
| lint | a rule in `guardrails/eslint.ts`, a fixture case, `rules.md` enforcement status, changelog |
| eval | a fixture under `evals/` (none yet) |
| coverage gap | a line in `coverage-gaps.md` |
| no change | nothing; the packet keeps the record |

The packet stays in `intake/` as the decision log. Never edit a rule from a
packet that has no accepted status on the candidate.

## Cadence and ownership

Alex owns the guidance. The agent runs the collector and drafts the judge
sections. Rules that stop helping are removed the same way they were
added: a candidate, a decision, a commit.
