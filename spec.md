# Cure Pharmaceuticals

## Current State
A pharmaceutical product catalog with 15 products across 5 brands, contact page, homepage reviews, a live activity ticker, and an Admin Panel (accessible via `/Alexx`, password `Alex@thomas2026`). The admin panel has tabs for managing products, reviews, and ticker notifications. No user accounts exist.

## Requested Changes (Diff)

### Add
- User registration: visitors can sign up with username/email and password
- User login: registered users can sign in
- User account page: shows basic profile info (username, member since)
- Navigation header button: "Sign In / Register" for guests, account name for logged-in users
- Authorization component integration for user management

### Modify
- Navigation bar: add account/login button
- Admin Panel: add a "Users" tab showing registered accounts

### Remove
- Nothing removed

## Implementation Plan
1. Integrate authorization Caffeine component for user identity and registration
2. Add Register/Login modal or page accessible from the nav bar
3. Show logged-in user's name in the nav with a dropdown (view profile, log out)
4. Add a simple account profile page at `/account`
5. Admin Panel: add Users tab listing registered users with their usernames and registration dates
