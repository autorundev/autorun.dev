# deploy :: 17_power_outage

**weight:** 2%
**tags:** rare, disaster, hardware
**duration:** ~10s

батарея садится посреди деплоя. blackout. при восстановлении выясняется,
что всё прошло.

---

## script

| # | marker | text                             | suffix      | anim         | dur    |
|---|--------|----------------------------------|-------------|--------------|--------|
| 1 | `[/]`  | running tests                    | —           | spinner      | 700ms  |
| 2 | `[*]`  | running tests                    | `142/142`   | none         | 200ms  |
| 3 | `[/]`  | bundling                         | —           | spinner      | 600ms  |
| 4 | `[*]`  | bundling                         | `1.2mb`     | none         | 200ms  |
| 5 | `[!]`  | battery low: 7%                  | —           | flash        | 600ms  |
| 6 | `[/]`  | deploying to production          | —           | spinner      | 800ms  |
| 7 | `[!]`  | battery low: 3%                  | —           | flash+shake  | 700ms  |
| 8 | `[/]`  | deploying faster                 | —           | spinner      | 600ms  |
| 9 | `[!]`  | battery: 1%                      | —           | flash+shake  | 500ms  |
| 10| `[/]`  | push it pu                       | —           | typeout      | 400ms  |
| 11| — (blackout, 2400ms)             | —           | none         | 2400ms |
| 12| `[:]`  | restoring session                | —           | spinner      | 1200ms |
| 13| `[*]`  | deploy completed before shutdown | —           | none         | 300ms  |

**dramatic pause:** 900ms

**final:**
```
deployed in 4m 19s, then lost power for 23 minutes.
the cloud doesn't care about your battery.
```

---

## notes

- `[!]` × 3 (строки 5, 7, 9) — эскалирующий warning, не abort
- `flash+shake` комбо на 7 и 9 — shake двигает **весь** терминал
  (±2px 4 раза за 300ms)
- строка 10 — typeout обрывается посреди слова, курсор остаётся
  мигающим
- строка 11 — **blackout**: terminal fades to 0% opacity за 200ms,
  держится 2000ms, возвращается за 200ms. content сохраняется, при
  возврате появляется строка 12 сверху
- `[:]` на строке 12 — listener, восстанавливающий сессию
- `[*]` на строке 13 — plot twist: всё прошло до shutdown. это не
  `[x]`, потому что pipeline завершился успешно (просто узнали об этом
  не сразу)
- mobile: blackout укорачивается до 1200ms
- этот сценарий триггерит achievement `survived the outage`
