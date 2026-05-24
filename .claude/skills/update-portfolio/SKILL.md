# Update Portfolio Skill

Use this skill whenever modifying holdings, weights, or betas of an existing preset portfolio.

## The core rule

**Every holdings change must bump the preset ID version number.**

Range tabs beyond the initial server-rendered 1Y (e.g. Max/All, 2Y, 5Y) are fetched client-side and cached by `presetId + range`. If the preset ID stays the same after a holdings change, stale cached range results will be served even after a hard refresh and full `.next` deletion.

## Checklist (run in order)

### 1. Make the holdings change
Edit `src/lib/presets/index.ts` — update the relevant `*Holdings` array.

### 2. Bump the preset ID
In the same file, increment the version suffix on the preset ID constant:
```
'us-alpha-stack-v2' → 'us-alpha-stack-v3'
'ca-alpha-stack-v6' → 'ca-alpha-stack-v7'
```
The constant is exported (e.g. `US_ALPHA_STACK_PRESET_ID`) and all callers import it, so no other files need touching for the ID change.

### 3. Update the registry entry comment
In `PRESET_DEFINITIONS`, update the `extraCacheKeyTags` string to describe the new holdings (e.g. `'spmo-mate-ialt-v3'`). This is documentation only — the preset ID is what drives cache correctness.

### 4. TypeScript check
```
npx tsc --noEmit
```

### 5. Done — no `.next` deletion needed
The preset ID bump alone is sufficient. Do NOT delete `.next` or manually clear caches — that causes extra disruption and doesn't fix the root issue (stale client-side range fetches).

## What NOT to do

- Do not only bump `extraCacheKeyTags` without bumping the preset ID — tags are not part of the cache key in the current `unstable_cache` implementation.
- Do not delete `.next` expecting it to clear client-cached range results — those are cached in the Next.js data cache keyed by preset ID, not by file system artifacts.
- Do not reuse a preset ID across different holdings — once an ID has been computed and cached for any range, changing its holdings without bumping the ID will leave stale data for ranges that were pre-warmed.
