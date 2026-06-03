# deploy :: 16_standup_interrupt

**weight:** 3%
**tags:** meetings, interrupt, product-engineering
**duration:** ~11s

deploy на hold из-за standup. возвращаемся после.

---

## script

| # | marker | text                                | suffix       | anim    | dur    |
|---|--------|-------------------------------------|--------------|---------|--------|
| 1 | `[/]`  | running tests                       | —            | spinner | 700ms  |
| 2 | `[*]`  | running tests                       | `142/142`    | none    | 200ms  |
| 3 | `[/]`  | deploying to production             | —            | spinner | 700ms  |
| 4 | `[!]`  | standup started 3 minutes ago       | —            | flash   | 900ms  |
| 5 | `[-]`  | deploy paused                       | `0s`         | none    | 400ms  |
| 6 | `[/]`  | joining standup                     | —            | spinner | 600ms  |
| 7 | `[>]`  | "sorry i'm late, was deploying"     | —            | typeout | 1400ms |
| 8 | `[>]`  | "what did you do yesterday?"        | —            | typeout | 1200ms |
| 9 | `[>]`  | "deployed to production"            | —            | typeout | 1000ms |
| 10| `[>]`  | "what will you do today?"           | —            | typeout | 1200ms |
| 11| `[>]`  | "deploy to production"              | —            | typeout | 1000ms |
| 12| `[*]`  | standup                             | `4 minutes`  | none    | 300ms  |
| 13| `[/]`  | resuming deploy                     | —            | spinner | 600ms  |
| 14| `[*]`  | deploying to production             | `done`       | none    | 300ms  |

**dramatic pause:** 900ms

**final:**
```
deployed in 6m 48s. standup took 4.
shortest one this year.
```

---

## notes

- `[-]` на строке 5 — hold (возвращаемся после standup)
- `[>]` × 5 (строки 7–11) — прямой диалог. все typeout, все в кавычках,
  italic. это нарушает правило «не дублируй маркер», но работает как
  визуальная передача диалога (как цитаты hi_mom в 14)
- `[*] standup — 4 minutes` (строка 12) — standup тоже завершился
  успешно
