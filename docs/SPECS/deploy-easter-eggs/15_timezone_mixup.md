# deploy :: 15_timezone_mixup

**weight:** 3%
**tags:** remote, timezone, distributed-team
**duration:** ~13s

все думали что дедлайн по их local. UTC win.

---

## script

| # | marker | text                                 | suffix          | anim    | dur    |
|---|--------|--------------------------------------|-----------------|---------|--------|
| 1 | `[/]`  | running tests                        | —               | spinner | 700ms  |
| 2 | `[*]`  | running tests                        | `142/142`       | none    | 200ms  |
| 3 | `[/]`  | checking team availability           | —               | spinner | 900ms  |
| 4 | `[*]`  | anton (belgrade)                     | `03:14 awake`   | none    | 200ms  |
| 5 | `[*]`  | designer (lisbon)                    | `02:14 asleep`  | none    | 200ms  |
| 6 | `[*]`  | backend (buenos aires)               | `22:14 online`  | none    | 200ms  |
| 7 | `[!]`  | everyone thought deadline was local  | —               | flash   | 1200ms |
| 8 | `[?]`  | whose local                          | —               | none    | 1800ms |
| 9 | `[/]`  | picking utc                          | —               | spinner | 600ms  |
| 10| `[*]`  | picking utc                          | `finally`       | none    | 250ms  |
| 11| `[/]`  | deploying to production              | —               | spinner | 800ms  |
| 12| `[*]`  | deploying to production              | `done`          | none    | 250ms  |
| 13| `[*]`  | posting in #general                  | `"it's shipped"`| none    | 300ms  |

**dramatic pause:** 900ms

**final:**
```
deployed in 7m 22s across 3 timezones.
utc won. it always does.
```

---

## notes

- строки 4–6 — таблица статусов команды. выровнены по колонкам.
  `asleep` окрашен `--fg-2` (ghost), `awake` / `online` — `--state-live`
  (green)
- `[?]` на строке 8 — канонический use-case: неопределённость, нужно
  решение (чьё «local» считать за истину)
- времена в 4–6 вычисляются на лету от текущего UTC игрока: belgrade
  = utc+1, lisbon = utc+0, buenos aires = utc−3. если у игрока сейчас
  utc+3 — подставляются актуальные локальные времена этих городов
