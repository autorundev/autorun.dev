# deploy :: 03_last_minute_feature

**weight:** 8%
**tags:** scope, just-one-more-thing, product-engineering
**duration:** ~18s

деплой тормозится коммитами и правками в последний момент. продолжается,
но с паузами и доработками.

---

## script

| # | marker | text                                        | suffix      | anim    | dur    |
|---|--------|---------------------------------------------|-------------|---------|--------|
| 1 | `[/]`  | running tests                               | —           | spinner | 700ms  |
| 2 | `[*]`  | running tests                               | `142/142`   | none    | 200ms  |
| 3 | `[/]`  | bundling                                    | —           | spinner | 700ms  |
| 4 | `[*]`  | bundling                                    | `1.2mb`     | none    | 200ms  |
| 5 | `[/]`  | deploying to production                     | —           | spinner | 600ms  |
| 6 | `[!]`  | anton pushed a commit                       | —           | flash   | 800ms  |
| 7 | `[-]`  | deploy paused                               | `0s`        | none    | 400ms  |
| 8 | `[/]`  | pulling anton/quick-fix                     | —           | spinner | 1000ms |
| 9 | `[>]`  | "just one more thing, i promise"            | —           | typeout | 1400ms |
| 10| `[/]`  | re-running tests                            | —           | spinner | 900ms  |
| 11| `[*]`  | re-running tests                            | `143/143`   | none    | 200ms  |
| 12| `[/]`  | deploying to production                     | —           | spinner | 600ms  |
| 13| `[!]`  | designer has a note on button radius        | —           | flash   | 800ms  |
| 14| `[-]`  | deploy paused                               | `0s`        | none    | 400ms  |
| 15| `[/]`  | radius 8px → 6px                            | —           | spinner | 700ms  |
| 16| `[*]`  | radius 8px → 6px                            | `done`      | none    | 200ms  |
| 17| `[/]`  | deploying to production                     | —           | spinner | 700ms  |
| 18| `[*]`  | deploying to production                     | `done`      | none    | 300ms  |

**dramatic pause:** 900ms

**final:**
```
deployed in 14m 22s. one more thing almost killed us.
```

---

## notes

- строка 9 — прямая речь, `[>]` (user input в диалоге), typeout
- `[-] deploy paused` — hold, не abort: возвращаемся к деплою после фикса
- намеренно три попытки строки `deploying to production` (5, 12, 17) — это
  визуальный ритм сценария «почти задеплоили → нет → почти → нет → да»
