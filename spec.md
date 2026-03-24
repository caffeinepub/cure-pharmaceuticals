# Cure Pharmaceuticals

## Current State
The Admin Panel has a product editor with fields: brand, name, dosage, price, packaging, count, strength, manufacturedBy, form, packSize, and 3 image URL slots. The backend has persistent Motoko syntax bugs (`.filter()` and `.sort()` called directly on arrays) causing silent compile failures, which is why "Loading products..." never resolves and Save Product never works.

## Requested Changes (Diff)

### Add
- New cleaner product editor UI with fields: Name, Strength, Packaging, Pack Size, Brand, Manufacturer, Form, plus 3 image URL slots with live preview

### Modify
- Fix backend Motoko syntax: replace all `arr.filter(...)` with `Array.filter(arr, ...)` and `arr.sort(...)` with `Array.sort(arr, ...)`, import `Array` from `mo:core/Array`
- Remove `filterImageUrls` helper that used invalid `.filter()` syntax
- Rebuild ProductsTab product editor panel with the new field set

### Remove
- Old product editor with confusing field layout

## Implementation Plan
1. Fix backend: add `Array` import, replace all invalid array method calls
2. Rebuild product editor UI in AdminPanel.tsx with fields: Name, Brand, Strength, Packaging, Pack Size, Manufacturer, Form, 3 image URL slots, Price (€) kept for cart functionality
