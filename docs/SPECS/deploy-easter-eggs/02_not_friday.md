# deploy :: 02_not_friday

**weight:** 8%
**tags:** policy, abort, friday
**duration:** ~8s

friday deploy aborted by company policy. канонический use-case `[x]` —
abort по воле системы, не из-за поломки.

---

## script

| # | marker | text                                | suffix       | anim    | dur    |
|---|--------|-------------------------------------|--------------|---------|--------|
| 1 | `[/]`  | running tests                       | —            | spinner | 700ms  |
| 2 | `[*]`  | running tests                       | `142/142`    | none    | 200ms  |
| 3 | `[/]`  | type check                          | —            | spinner | 600ms  |
| 4 | `[*]`  | type check                          | `ok`         | none    | 200ms  |
| 5 | `[/]`  | checking calendar                   | —            | spinner | 700ms  |
| 6 | `[!]`  | it's friday 17:42                   | —            | flash   | 800ms  |
| 7 | `[x]`  | aborting deploy per company policy  | —            | flash   | 600ms  |
| 8 | `[=]`  | nothing good ships on friday evening| —            | none    | 300ms  |

**dramatic pause:** 900ms

**final:**
```
weekend saved. deploy rescheduled for monday 10:00.
```

---

## notes

- `[!]` на линии 6 — обнаружение факта (предупреждение)
- `[x]` на линии 7 — сам abort (фатальное решение остановить)
- `[=]` на линии 8 — комментарий о том, что шаг осознанно пропущен
  (деплой как активность)
- на этот сценарий мапится `deploy --friday`
- время в строке 6 (`17:42`) подставляется из реального времени,
  если игрок вызывает в пятницу вечером — иначе fixed `17:42`
