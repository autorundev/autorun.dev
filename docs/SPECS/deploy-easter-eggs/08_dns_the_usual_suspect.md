# deploy :: 08_dns_the_usual_suspect

**weight:** 4%
**tags:** incident, dns, debugging
**duration:** ~13s

деплой прошёл, но сайт упал. DNS, как всегда.

---

## script

| # | marker | text                                 | suffix     | anim    | dur    |
|---|--------|--------------------------------------|------------|---------|--------|
| 1 | `[/]`  | running tests                        | —          | spinner | 700ms  |
| 2 | `[*]`  | running tests                        | `142/142`  | none    | 200ms  |
| 3 | `[/]`  | bundling                             | —          | spinner | 600ms  |
| 4 | `[*]`  | bundling                             | `1.2mb`    | none    | 200ms  |
| 5 | `[/]`  | deploying to production              | —          | spinner | 700ms  |
| 6 | `[*]`  | deploying to production              | `done`     | none    | 200ms  |
| 7 | `[!]`  | site is down                         | —          | flash   | 800ms  |
| 8 | `[/]`  | checking servers                     | —          | spinner | 900ms  |
| 9 | `[*]`  | checking servers                     | `healthy`  | none    | 200ms  |
| 10| `[/]`  | checking database                    | —          | spinner | 900ms  |
| 11| `[*]`  | checking database                    | `healthy`  | none    | 200ms  |
| 12| `[/]`  | checking dns                         | —          | spinner | 1200ms |
| 13| `[!]`  | it was dns. it's always dns.         | —          | flash   | 800ms  |
| 14| `[/]`  | flushing caches                      | —          | spinner | 700ms  |
| 15| `[*]`  | flushing caches                      | `ok`       | none    | 200ms  |
| 16| `[*]`  | site is back                         | —          | none    | 300ms  |

**dramatic pause:** 900ms

**final:**
```
deployed in 6m 55s.
three engineers swore. one learned a new word.
```

---

## notes

- два `[!]` (строки 7, 13) — warning что сайт упал, потом warning про DNS.
  между ними series `[/]` → `[*]` с healthy-результатом, они создают
  ложное чувство «всё нормально»
- это не `[x]`, потому что pipeline не остановился — мы не откатываемся,
  а чиним на ходу
