# deploy :: 11_scope_creep

**weight:** 3%
**tags:** scope, discipline, aborted-tangent
**duration:** ~12s

начали с typo-фикса, почти переписали пол-проекта, одумались. абортнули
tangent, вернулись к изначальной задаче.

---

## script

| # | marker | text                                      | suffix     | anim    | dur    |
|---|--------|-------------------------------------------|------------|---------|--------|
| 1 | `[/]`  | running tests                             | —          | spinner | 700ms  |
| 2 | `[*]`  | running tests                             | `142/142`  | none    | 200ms  |
| 3 | `[>]`  | "while we're at it, let's also..."        | —          | typeout | 1600ms |
| 4 | `[/]`  | refactoring auth layer                    | —          | spinner | 900ms  |
| 5 | `[/]`  | migrating database                        | —          | spinner | 900ms  |
| 6 | `[/]`  | rewriting in rust                         | —          | spinner | 1200ms |
| 7 | `[x]`  | aborting. this was a typo fix.            | —          | flash   | 800ms  |
| 8 | `[/]`  | reverting tangent                         | —          | spinner | 900ms  |
| 9 | `[*]`  | reverting tangent                         | `done`     | none    | 200ms  |
| 10| `[/]`  | fixing the typo                           | —          | spinner | 600ms  |
| 11| `[*]`  | fixing the typo                           | `1 char`   | none    | 200ms  |
| 12| `[/]`  | deploying to production                   | —          | spinner | 700ms  |
| 13| `[*]`  | deploying to production                   | `done`     | none    | 300ms  |

**dramatic pause:** 900ms

**final:**
```
deployed in 3m 40s. saved ourselves from ourselves.
```

---

## notes

- `[>]` на строке 3 — human quote, trigger для tangent
- строки 4, 5, 6 — стэк spinner-ов **без** трансформации в `[*]`. это
  формально нарушает правило «spinner никогда не финальный», но здесь
  спасает `[x]` на строке 7, который их все «гасит» одним abort-ом.
  поведение: при появлении строки 7 все active spinners на экране
  останавливаются (last frame) и цвет становится red
- `[x]` здесь — abort не всего pipeline, а tangent-ветки. после `[x]`
  pipeline перезапускается с чистого листа (reverting + typo fix + deploy)
