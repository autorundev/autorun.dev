# deploy :: 01_happy_path

**weight:** 32%
**tags:** success, canonical, base
**duration:** ~10s

канонический успешный деплой. база, на которую ссылаются все остальные
сценарии.

---

## script

| # | marker | text                       | suffix          | anim    | dur   |
|---|--------|----------------------------|-----------------|---------|-------|
| 1 | `[/]`  | running tests              | —               | spinner | 700ms |
| 2 | `[*]`  | running tests              | `142/142`       | none    | 200ms |
| 3 | `[/]`  | type check                 | —               | spinner | 600ms |
| 4 | `[*]`  | type check                 | `ok`            | none    | 200ms |
| 5 | `[/]`  | bundling                   | —               | spinner | 700ms |
| 6 | `[*]`  | bundling                   | `1.2mb gzipped` | none    | 200ms |
| 7 | `[/]`  | pushing to edge            | —               | spinner | 800ms |
| 8 | `[*]`  | pushing to edge            | `23 locations`  | none    | 200ms |
| 9 | `[/]`  | warming caches             | —               | spinner | 600ms |
| 10| `[*]`  | warming caches             | `ok`            | none    | 200ms |
| 11| `[/]`  | deploying to production    | —               | spinner | 700ms |
| 12| `[*]`  | deploying to production    | `done`          | none    | 300ms |

**dramatic pause:** 900ms

**final:**
```
deployed in 47s. users happy. founders caffeinated.
```

---

## notes

- каждый шаг — пара `[/]` → `[*]`, без warnings / skips
- это baseline для сравнения: все другие сценарии читаются через отклонение
  от этого
- на него мапится `deploy --force`
