# Cure Pharmaceuticals

## Current State
The Admin Panel product editor manages products in local React component state only. Changes are never persisted to the backend. The main catalog (App.tsx) reads from a hardcoded static `brands` array and never fetches from the backend. The backend `PharmaceuticalProduct` type is missing fields for `strength`, `manufacturedBy`, `form`, `packSize`, and `images`.

## Requested Changes (Diff)

### Add
- Backend: Extended product model with fields: `strength`, `manufacturedBy`, `form`, `packSize`, `imageUrls` (array of up to 3 strings)
- Backend: `updateProduct` function for admins to update product details
- Backend: `deleteProduct` function for admins
- Backend: `getAllProducts` returns the extended product model
- Frontend App.tsx: Fetch all products from backend on load, group by brand, render dynamically
- Frontend AdminPanel: Save product adds/edits by calling backend `addProduct` / `updateProduct`; delete calls `deleteProduct`

### Modify
- Backend `addProduct`: Accept extended fields
- Frontend product card: Use `imageUrls[0]` as primary image when present

### Remove
- Hardcoded `brands` array from App.tsx (replaced by backend data)
- Hardcoded product list from AdminPanel (replaced by backend fetch)

## Implementation Plan
1. Regenerate Motoko backend with extended product model and update/delete functions
2. Update frontend:
   - App.tsx: `useEffect` to `getAllProducts()`, group by brand, render dynamically
   - AdminPanel: fetch products from backend, call `addProduct`/`updateProduct`/`deleteProduct` on save/delete
   - Product card: show `imageUrls[0]` if present, fallback to default image
