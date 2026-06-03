# deploy :: 04_rollback

**weight:** 6%
**tags:** incident, rollback, abort
**duration:** ~12s

деплой прошёл, но prod зажёгся. откатываемся. канонический use-case
комбо `[!]` (anomaly) → `[x]` (abort) → `[*]` (recovery).

---

## script

| # | marker | text                                 | suffix        | anim    | dur    |
|---|--------|--------------------------------------|---------------|---------|--------|
| 1 | `[/]`  | running tests                        | —             | spinner | 700ms  |
| 2 | `[*]`  | running tests                        | `142/142`     | none    | 200ms  |
| 3 | `[/]`  | deploying to production              | —             | spinner | 800ms  |
| 4 | `[*]`  | deploying to production              | `done`        | none    | 200ms  |
| 5 | `[:]`  | monitoring                           | —             | none    | 1000ms |
| 6 | `[!]`  | error rate: 0.1% → 4.7%              | —             | flash   | 700ms  |
| 7 | `[!]`  | latency p99: 80ms → 2.4s             | —             | flash   | 700ms  |
| 8 | `[x]`  | initiating rollback                  | —             | flash   | 600ms  |
| 9 | `[/]`  | reverting to previous                | —             | spinner | 1200ms |
| 10| `[*]`  | reverting to previous                | `done`        | none    | 200ms  |
| 11| `[:]`  | monitoring                           | —             | none    | 800ms  |
| 12| `[*]`  | error rate                           | `0.1%`        | none    | 200ms  |
| 13| `[*]`  | latency p99                          | `78ms`        | none    | 300ms  |

**dramatic pause:** 900ms

**final:**
```
rolled back in 38s. incident postmortem: scheduled.
the test you didn't write is the bug you'll ship.
```

---

## notes

- `[:]` на строках 5, 11 — presence/listening, идёт мониторинг
- `[!]` × 2 (строки 6–7) — нарастание аномалии
- `[x]` на строке 8 — abort деплоя, смена направления
- `[*]` на строках 10, 12, 13 — успех отката + подтверждение что метрики
  вернулись
- финал явно про rollback, не «deployed in Xs»
