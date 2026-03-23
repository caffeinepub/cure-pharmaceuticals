# Cure Pharmaceuticals

## Current State
The admin panel product save (add/update) is broken. The Motoko backend uses `product.imageUrls.filter(...)` and `arr.sort()` directly on arrays, which are not valid Motoko methods on `[T]` types. This causes a compile error, so the deployed canister runs an older version of the code with a different API, causing all product save calls to fail.

## Requested Changes (Diff)

### Add
- Nothing new

### Modify
- Fix `addProduct`: replace `product.imageUrls.filter(...)` with a proper Motoko array filter using iterators
- Fix `updateProduct`: same filter fix
- Fix `getAllProducts`: replace `arr.sort()` with a proper sort call

### Remove
- Nothing removed

## Implementation Plan
1. Fix Motoko backend: use `Array.filter` or iterator `.filter().toArray()` for imageUrls filtering
2. Fix `getAllProducts` sort to use valid Motoko API
3. Validate and deploy
