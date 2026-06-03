# deploy :: 14_hi_mom

**weight:** 3%
**tags:** embarrassing, console-log, classic
**duration:** ~12s

в проде засветился `console.log("hi mom")`. фиксим тихо.

---

## script

| # | marker | text                                  | suffix              | anim    | dur    |
|---|--------|---------------------------------------|---------------------|---------|--------|
| 1 | `[/]`  | running tests                         | —                   | spinner | 700ms  |
| 2 | `[*]`  | running tests                         | `142/142`           | none    | 200ms  |
| 3 | `[/]`  | bundling                              | —                   | spinner | 600ms  |
| 4 | `[*]`  | bundling                              | `1.2mb`             | none    | 200ms  |
| 5 | `[/]`  | deploying to production               | —                   | spinner | 800ms  |
| 6 | `[*]`  | deploying to production               | `done`              | none    | 200ms  |
| 7 | `[:]`  | checking logs                         | —                   | none    | 700ms  |
| 8 | `[!]`  | production log: "hi mom"              | —                   | flash   | 1200ms |
| 9 | `[!]`  | production log: "hi mom"              | —                   | none    | 300ms  |
| 10| `[!]`  | production log: "hi mom"              | —                   | none    | 300ms  |
| 11| `[/]`  | locating rogue console.log            | —                   | spinner | 900ms  |
| 12| `[*]`  | locating rogue console.log            | `src/auth.ts:42`    | none    | 200ms  |
| 13| `[/]`  | removing it                           | —                   | spinner | 500ms  |
| 14| `[*]`  | removing it                           | `done`              | none    | 200ms  |
| 15| `[*]`  | re-deploying                          | `done`              | none    | 300ms  |

**dramatic pause:** 900ms

**final:**
```
deployed in 9m 11s. mom saw it. she's proud anyway.
```

---

## notes

- `[:]` на строке 7 — канонический listener (мониторинг логов)
- строки 8–10 — три одинаковых `[!]`. это намеренное нарушение правила
  «не дублируй маркер», которое работает как **визуальная цитата
  флудящих логов**. первая с flash, следующие без (чтобы не утопить
  юзера в мигании)
- `src/auth.ts:42` — случайный выбор из пула:
  `src/auth.ts`, `src/payment.ts`, `src/user-profile.ts`, `src/index.ts`
