# deploy :: 13_drive_by_pr

**weight:** 4%
**tags:** open-source, github, surprise
**duration:** ~16s

stranger с гитхаба дропает PR в последний момент. `[?]` для решения
о мерже — канонический use-case.

---

## script

| # | marker | text                                  | suffix         | anim    | dur    |
|---|--------|---------------------------------------|----------------|---------|--------|
| 1 | `[/]`  | running tests                         | —              | spinner | 700ms  |
| 2 | `[*]`  | running tests                         | `142/142`      | none    | 200ms  |
| 3 | `[/]`  | bundling                              | —              | spinner | 600ms  |
| 4 | `[*]`  | bundling                              | `1.2mb`        | none    | 200ms  |
| 5 | `[/]`  | deploying to production               | —              | spinner | 800ms  |
| 6 | `[!]`  | pr from @stranger_dev                 | —              | flash   | 800ms  |
| 7 | `[-]`  | deploy paused                         | `0s`           | none    | 400ms  |
| 8 | `[:]`  | reviewing pr                          | `+847 −203`    | none    | 1200ms |
| 9 | `[>]`  | "fixed a typo and also rewrote auth"  | —              | typeout | 1800ms |
| 10| `[?]`  | merge?                                | —              | none    | 1200ms |
| 11| `[*]`  | merging                               | `yolo`         | none    | 300ms  |
| 12| `[/]`  | re-running tests                      | —              | spinner | 900ms  |
| 13| `[*]`  | re-running tests                      | `144/144`      | none    | 200ms  |
| 14| `[+]`  | @stranger_dev added to contributors   | —              | none    | 300ms  |
| 15| `[*]`  | deploying to production               | `done`         | none    | 300ms  |

**dramatic pause:** 900ms

**final:**
```
deployed in 16m 04s.
a stranger from the internet made our auth better. we let them.
```

---

## notes

- `[-]` на строке 7 — hold (ждём решения о PR), не abort
- `[:]` на строке 8 — presence, reviewing
- `[>]` на строке 9 — цитата из PR description, typeout, italic
- `[?]` на строке 10 — канонический use-case: нужно решение
- `[+]` на строке 14 — канонический use-case: контекст расширен
  (capability added, новый контрибьютор)
