# deploy :: 09_stealth_ship

**weight:** 4%
**tags:** stealth, feature-flag, quiet
**duration:** ~9s

тихий деплой под фича-флагом. маркетинговые шаги `[=]` skipped.
канонический пример использования `[=]`.

---

## script

| # | marker | text                                  | suffix          | anim    | dur    |
|---|--------|---------------------------------------|-----------------|---------|--------|
| 1 | `[/]`  | running tests                         | —               | spinner | 700ms  |
| 2 | `[*]`  | running tests                         | `142/142`       | none    | 200ms  |
| 3 | `[/]`  | bundling                              | —               | spinner | 600ms  |
| 4 | `[*]`  | bundling                              | `1.2mb`         | none    | 200ms  |
| 5 | `[/]`  | checking feature flag                 | —               | spinner | 800ms  |
| 6 | `[!]`  | project is still [redacted]           | —               | flash   | 700ms  |
| 7 | `[/]`  | deploying behind flag                 | —               | spinner | 800ms  |
| 8 | `[*]`  | deploying behind flag                 | `done`          | none    | 200ms  |
| 9 | `[*]`  | audience                              | `3 users`       | none    | 300ms  |
| 10| `[=]`  | telegram post                         | `skipped`       | none    | 300ms  |
| 11| `[=]`  | twitter thread                        | `skipped`       | none    | 300ms  |
| 12| `[=]`  | changelog entry                       | `skipped`       | none    | 300ms  |

**dramatic pause:** 900ms

**final:**
```
shipped silently. the best launches make no sound.
```

---

## notes

- три `[=]` подряд (10, 11, 12) — единственное разрешённое исключение
  из правила «не дублируй маркеры»: это тематический блок «что НЕ делаем
  при stealth-шипе». если дубль смущает — можно переформатировать:
  `[=] marketing — skipped (telegram, twitter, changelog)` одной строкой
- `[!]` на строке 6 — `[redacted]` это alert про чувствительность,
  оправдано
