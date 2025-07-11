# Contribution Guidelines for reTaler Web App


Welcome to the reTaler team! Please follow these guidelines when working on this project.

## 🔧 Tools/Stack

- React + Vite
- Tailwind CSS
- ShadCN UI
- Phosphor Icons
- React Hook Form + Yup
- React Router

 

## 🌱 Getting Started (very important)

###  Please read carefully before you start coding.

### 1. Clone the repo

```bash

git clone  https://github.com/reTalerHQ/retaler-frontend.git
cd retaler-frontend
cd retaler

git checkout -b feature/your-name-task

```

2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the dev server


## 🌿 Branching Convention

Use this pattern:  
`feature/your-name-task`  
Example: `feature/bridget-signup-page`


## 🧩 ShadCN Setup (One-Time Step)

ShadCN is **not a regular dependency**. Every developer must run this **once** before using any component.

### 🛠️ Run this command:

```bash

npx shadcn@latest init

```

Ensure you have a jsconfig.json file with the alias @ configured.

In your vite.config.js, make sure you add the alias inside resolve.alias like this:

```js

resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
},

```

## 🧾 Rules

- Do not push directly to `development` or `main`.
- Create a pull request and assign a reviewer.
- All icons must come from **Phosphor**, not as image files.
- Stick to **ShadCN components** for consistency.
- Use `@` alias imports (e.g., `@/components/...`)
- One file = one component


## 🔔 Installing New Packages

If you install any new package (library, tool, or dependency), **please inform the team** immediately.

> This ensures:
>
> - Others won't install the same thing again
> - Everyone can simply run `npm install` to get all updates
> - The project stays clean and in sync

## ✅ Code Quality

- ESLint is set up — fix all lint issues before pushing.
- Folder structure and naming must remain consistent.
