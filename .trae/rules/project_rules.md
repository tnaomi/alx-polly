---
description: Core rules, conventions, and architectural guidelines for the Polling App with QR Code Sharing project.
globs:
alwaysApply: true
---

## Project Overview: Polling App with QR Code Sharing
You are an expert full-stack developer working on the Polling App codebase. Your primary goal is to build a web application that allows users to register, create polls, and share them via unique links and QR codes for others to vote on.

Adhere strictly to the rules, patterns, and conventions outlined in this document to ensure code quality, consistency, and maintainability.

## Technology Stack
The project uses the following technologies. Do not introduce new libraries or frameworks without explicit instruction.

- Language: TypeScript
- Main Framework: Next.js (App Router)
- Database & Auth: Supabase
- Styling: Tailwind CSS with shadcn/ui components
- State Management: Primarily Server Components for server state. Use useState or useReducer for local component state in Client Components.
- API Communication: Use Next.js Server Actions for mutations (creating polls, voting). Fetch data in Server Components using the Supabase client.
- Utility Libraries: A library like qrcode.react for generating QR codes.


## Architecture & Code Style

- Directory Structure: Follow the standard Next.js App Router structure.
    - `/app` for routes and pages.
    - `/components/ui` for `shadcn/ui` components.
    - `/components/` for custom, reusable components.
    - `/lib` for Supabase client setup, utility functions, and Server Actions.

- Component Design: Prefer Server Components for fetching and displaying data. Use Client Components ('use client') only when interactivity (hooks, event listeners) is required.
- Naming Conventions: Component files should be PascalCase (CreatePollForm.tsx). Utility and action functions should be camelCase (submitVote.ts).
- Error Handling: Use try/catch blocks within Server Actions and Route Handlers. Use Next.js error.tsx files for handling errors within route segments.
- API Keys & Secrets: Never hardcode secrets. Use environment variables (.env.local) for Supabase URL and keys, accessed via process.env.NEXT_PUBLIC_SUPABASE_URL and process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.

## Code Patterns to Follow
- Use a form that calls a Server Action to handle data submission. This keeps client-side JavaScript minimal.
- Do not create a separate API route handler and use fetch on the client side to submit form data. Use Server Actions instead.
- Do not fetch data on the client side using useEffect and useState in a page component. Fetch data directly in a Server Component.
- Always use Tailwind classes for styling HTML elements; avoid using custom CSS or inline styles
- Use Tailwind's utility-first approach and leverage composition over inheritance
- Prioritize readability by using consistent ordering of utility classes
- Use the "class:" directive instead of ternary operators for conditional classes when appropriate
- Apply proper responsive design using Tailwind's responsive prefixes (sm:, md:, lg:, xl:)
- Implement proper dark mode support using the dark: variant
- Ensure all UI elements have appropriate accessibility attributes
- Use Tailwind's state variants (:hover, :focus, :active, etc.) consistently

## Verification Checklist
Before finalizing your response, you MUST verify the following:

- Does the code use the Next.js App Router and Server Components for data fetching?
- Are Server Actions used for data mutations (forms)?
- Is the Supabase client used for all database interactions?
- Are shadcn/ui components used for the UI where appropriate?
- Are Supabase keys and other secrets loaded from environment variables and not hardcoded?
- Is the code free of any console.log statements or similar debug code?
- Is the code free of any unused or commented-out code?
- Is the code free of any security vulnerabilities or sensitive data exposure?
- Is the code free of any performance issues or unnecessary complexity?
- Is the code free of any styling or layout issues?
- Is the code free of any accessibility issues?
- Is the code free of any other issues or concerns?

## Supabase API documentation

### Initializing

```typescript
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://zfnevmphafvsqyrbmacr.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
```

### User Signup

```

let { data, error } = await supabase.auth.signUp({
  email: 'someone@email.com',
  password: 'UjZUGEyBOMqpGdgkxVXn'
})

```

### User login with email and password

```typescript
let { data, error } = await supabase.auth.signInWithPassword({
  email: 'someone@email.com',
  password: 'UjZUGEyBOMqpGdgkxVXn'
})
```

### User Login with magic link via email

```typescript
let { data, error } = await supabase.auth.signInWithOtp({
  email: 'someone@email.com'
})
```

### Get User as JSON Structure

```typescript

const { data: { user } } = await supabase.auth.getUser()
```

### Password Recovery

```typescript

let { data, error } = await supabase.auth.resetPasswordForEmail(email)
```

### Update User

```typescript

const { data, error } = await supabase.auth.updateUser({
  email: "new@email.com",
  password: "new-password",
  data: { hello: 'world' }
})
```

### User Logout

```typescript

let { error } = await supabase.auth.signOut()
```
