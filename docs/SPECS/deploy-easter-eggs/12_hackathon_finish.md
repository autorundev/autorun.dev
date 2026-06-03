# deploy :: 12_hackathon_finish

**weight:** 4%
**tags:** hackathon, deadline, panic
**duration:** ~14s

сабмит за 2 секунды до дедлайна. много `[=]` skipped ради скорости.

---

## script

| # | marker | text                             | suffix         | anim    | dur    |
|---|--------|----------------------------------|----------------|---------|--------|
| 1 | `[:]`  | submission deadline              | `00:00:47`     | none    | 600ms  |
| 2 | `[/]`  | running tests                    | —              | spinner | 800ms  |
| 3 | `[=]`  | running tests                    | `skipped`      | none    | 200ms  |
| 4 | `[:]`  | submission deadline              | `00:00:31`     | none    | 200ms  |
| 5 | `[/]`  | bundling                         | —              | spinner | 700ms  |
| 6 | `[!]`  | bundle is 2.4mb. ship it         | —              | flash   | 800ms  |
| 7 | `[/]`  | uploading                        | —              | spinner | 1500ms |
| 8 | `[:]`  | submission deadline              | `00:00:08`     | none    | 200ms  |
| 9 | `[*]`  | uploading                        | `done`         | none    | 200ms  |
| 10| `[/]`  | submitting to devpost            | —              | spinner | 1200ms |
| 11| `[*]`  | submitting to devpost            | `accepted`     | none    | 300ms  |
| 12| `[:]`  | submission deadline              | `00:00:02`     | none    | 200ms  |

**dramatic pause:** 1200ms

**final:**
```
shipped with 2 seconds to spare.
the demo will work. probably.
```

---

## notes

- `[:]` (presence) на строках 1, 4, 8, 12 — канонический listener-state
  для countdown-таймера. перерисовывается in-place, не добавляет
  строки
- `[=]` на строке 3 — осознанный skip тестов. могло быть `[x]`, но тут
  это не ломает pipeline (тесты пропустили ради скорости, демо будет
  работать, вероятно). тест-правило: «ломает ли pipeline?» — нет →
  `[=]`. если хочешь драмы, можно заменить на `[x]`, но тогда финал
  «shipped» становится несогласованным
- `[!]` на строке 6 — bundle большой, но не стопает (warning, не abort)
- `< 00:00:10` — цифры countdown меняют цвет на amber (пограничное
  состояние)
