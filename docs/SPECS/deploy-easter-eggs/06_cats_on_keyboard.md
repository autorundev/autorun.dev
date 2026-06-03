# deploy :: 06_cats_on_keyboard

**weight:** 4%
**tags:** chaos, remote-work, humor
**duration:** ~9s

кот помешал. разрулили.

---

## script

| # | marker | text                                        | suffix      | anim    | dur    |
|---|--------|---------------------------------------------|-------------|---------|--------|
| 1 | `[/]`  | running tests                               | —           | spinner | 700ms  |
| 2 | `[*]`  | running tests                               | `142/142`   | none    | 200ms  |
| 3 | `[/]`  | deploying ajskdhfkjashdkfjhaskdjfh          | —           | spinner | 600ms  |
| 4 | `[!]`  | cat detected on keyboard                    | —           | flash   | 800ms  |
| 5 | `[-]`  | deploy paused                               | `0s`        | none    | 400ms  |
| 6 | `[/]`  | relocating cat                              | —           | spinner | 900ms  |
| 7 | `[*]`  | relocating cat                              | `done`      | none    | 200ms  |
| 8 | `[/]`  | giving treat                                | —           | spinner | 600ms  |
| 9 | `[*]`  | giving treat                                | `accepted`  | none    | 200ms  |
| 10| `[/]`  | resuming deploy                             | —           | spinner | 600ms  |
| 11| `[*]`  | deploying to production                     | `done`      | none    | 300ms  |

**dramatic pause:** 900ms

**final:**
```
deployed in 2m 10s. cat is now a co-author.
```

---

## notes

- строка 3 — шутка в самом имени шага. выглядит как spinner на фейковой
  команде. `[/]` ок, потому что сразу перебивается `[!]`
- `[-] deploy paused` — hold, не abort
- `accepted` suffix на строке 9 — отсылка к CI/CD («approved by cat»)
