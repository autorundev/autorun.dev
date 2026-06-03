# deploy :: 07_ai_ate_homework

**weight:** 4%
**tags:** claude, ai-review, meta
**duration:** ~13s

claude вмешался в ревью. приняли часть, остальное осознанно пропустили.
meta-отсылка к тому, что терминал построен на claude.

---

## script

| # | marker | text                                   | suffix      | anim    | dur    |
|---|--------|----------------------------------------|-------------|---------|--------|
| 1 | `[/]`  | running tests                          | —           | spinner | 700ms  |
| 2 | `[*]`  | running tests                          | `142/142`   | none    | 200ms  |
| 3 | `[/]`  | asking claude to review                | —           | spinner | 1500ms |
| 4 | `[?]`  | claude: "have you considered..."       | —           | typeout | 1600ms |
| 5 | `[*]`  | suggestions generated                  | `47`        | none    | 300ms  |
| 6 | `[*]`  | accepting 3                            | —           | none    | 300ms  |
| 7 | `[=]`  | ignoring 44                            | —           | none    | 300ms  |
| 8 | `[/]`  | applying changes                       | —           | spinner | 800ms  |
| 9 | `[*]`  | applying changes                       | `done`      | none    | 200ms  |
| 10| `[/]`  | deploying to production                | —           | spinner | 700ms  |
| 11| `[*]`  | deploying to production                | `done`      | none    | 300ms  |

**dramatic pause:** 900ms

**final:**
```
deployed in 4m 18s.
the ai had opinions. we had deadlines.
```

---

## notes

- `[?]` на строке 4 — канонический use-case: claude предлагает, решение
  за человеком
- `[=]` на строке 7 — осознанный skip (ignoring 44 suggestions). именно
  здесь `[=]` работает лучше всего
- typeout на строке 4 — прямая речь claude, italic
