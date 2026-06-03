# deploy :: 10_demo_gods

**weight:** 3%
**tags:** demo, works-on-localhost, classic
**duration:** ~14s

локально работает, в проде — нет. Классика.

---

## script

| # | marker | text                                   | suffix       | anim    | dur    |
|---|--------|----------------------------------------|--------------|---------|--------|
| 1 | `[/]`  | running tests                          | —            | spinner | 700ms  |
| 2 | `[*]`  | running tests                          | `142/142`    | none    | 200ms  |
| 3 | `[/]`  | deploying to production                | —            | spinner | 800ms  |
| 4 | `[*]`  | deploying to production                | `done`       | none    | 200ms  |
| 5 | `[/]`  | opening demo in browser                | —            | spinner | 900ms  |
| 6 | `[!]`  | works on localhost. breaks in prod.    | —            | flash   | 1000ms |
| 7 | `[/]`  | opening devtools                       | —            | spinner | 700ms  |
| 8 | `[!]`  | cors error                             | —            | flash   | 700ms  |
| 9 | `[/]`  | adding access-control header           | —            | spinner | 1000ms |
| 10| `[*]`  | adding access-control header           | `done`       | none    | 200ms  |
| 11| `[/]`  | re-deploying                           | —            | spinner | 1000ms |
| 12| `[*]`  | re-deploying                           | `done`       | none    | 200ms  |
| 13| `[*]`  | demo                                   | `working`    | none    | 300ms  |

**dramatic pause:** 900ms

**final:**
```
deployed in 11m 03s.
the demo gods demanded a sacrifice. we gave them our evening.
```

---

## notes

- два `[!]` (строки 6, 8) — эскалация: сначала общая проблема, потом
  конкретный CORS
- pipeline не abort, чиним на ходу — поэтому `[*]`, не `[x]` на финале
