# deploy :: 05_investor_call

**weight:** 4%
**tags:** meetings, pause, startup
**duration:** ~10s

деплой ставится на hold из-за инвестор-колла. возвращаемся после.

---

## script

| # | marker | text                              | suffix       | anim    | dur    |
|---|--------|-----------------------------------|--------------|---------|--------|
| 1 | `[/]`  | running tests                     | —            | spinner | 700ms  |
| 2 | `[*]`  | running tests                     | `142/142`    | none    | 200ms  |
| 3 | `[/]`  | bundling                          | —            | spinner | 600ms  |
| 4 | `[!]`  | investor call in 3 minutes        | —            | flash   | 800ms  |
| 5 | `[-]`  | deploy paused                     | `3m`         | none    | 400ms  |
| 6 | `[/]`  | closing terminal                  | —            | spinner | 600ms  |
| 7 | `[/]`  | opening zoom                      | —            | spinner | 800ms  |
| 8 | `[*]`  | opening zoom                      | `ok`         | none    | 200ms  |
| 9 | `[>]`  | "we're growing 40% mom"           | —            | typeout | 1400ms |
| 10| `[*]`  | call                              | `22 minutes` | none    | 300ms  |
| 11| `[/]`  | resuming deploy                   | —            | spinner | 700ms  |
| 12| `[*]`  | deploying to production           | `done`       | none    | 300ms  |

**dramatic pause:** 900ms

**final:**
```
deployed in 27m 14s. call went well.
shipping mood: cautiously optimistic.
```

---

## notes

- `[-]` на строке 5 — hold с намерением вернуться, не abort
- `[>]` на строке 9 — human line в диалоге, typeout
- `[*] call — 22 minutes` (строка 10) — коллу тоже дали завершиться
  успешно, это не баг
