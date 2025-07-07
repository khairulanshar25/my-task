# My Task App

A task management application built with React, TypeScript, MUI, and Vite.

---

## 🚀 Setup Instructions

1. **Clone the repository**

   ```sh
   git clone https://github.com/khairulanshar25/my-task.git
   cd my-task
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Run the development server**

   ```sh
   npm run dev
   ```

4. **Run tests**

   ```sh
   npm run test
   ```

5. **Build for production**
   ```sh
   npm run build
   ```

---

## 🛠️ Design Decisions

- **React + TypeScript:** Ensures type safety and modern component-based architecture.
- **Vite:** Fast development server and optimized build.
- **MUI (Material UI):** Provides accessible, customizable UI components.
- **Vitest + Testing Library:** For fast, modern unit and integration testing.
- **Feature Structure:** Code is organized by feature (e.g., `pages/`, `components/`, `hooks/`), making it scalable and maintainable.
- **Custom Hooks:** Business logic and state management are encapsulated in custom hooks (e.g., `useController`, `useService`, `style`).
- **MockServer:** Used for local development and testing without a real backend.
- **Theming:** Supports light/dark themes and user preferences via MUI's theming system.

---

## ⚠️ Known Issues

- **CSS Imports in Tests:** Some MUI components import CSS files directly. If you see errors like `Unknown file extension ".css"`.
- **LocalStorage in Tests:** Some initial values (like theme or token) are read from `localStorage` at module load time. To test these, you must mock `localStorage` and dynamically import the module in your test.
- **Mocking with Vitest:** All variables used in `vi.mock` factories must be declared before the mock due to hoisting.
- **Date Handling:** Date fields (e.g., `startedAt`, `targetEndAt`) are handled as strings in forms and converted to `Date` objects on submit. Ensure consistent formats when integrating with APIs.
- **Testing Event Listeners:** When mocking global event listeners (e.g., `addEventListener`), ensure your mocks do not return values and are reset between tests.

---

## 📁 Project Structure

- `src/pages/` — Main app pages (e.g., Home, UserProfile, NewTask)
- `src/components/` — Reusable UI components
- `src/hooks/` — Custom hooks and models
- `src/theme/` — Theme configuration and customization
- `src/MockServer/` — Mock API server for development/testing

---

## 🐶 Husky Git Hooks

This project uses [Husky](https://typicode.github.io/husky/) to automate quality checks and formatting at various stages of the Git workflow:

- **pre-commit:**  
  Runs `prettier --write ./src` to automatically format your code before each commit.

- **post-commit:**  
  Runs `pretty-quick --staged` to quickly format only the files that were staged in the last commit.

- **pre-push:**  
  Runs both tests (`npm run test`) and linting (`npm run lint`) before allowing a push. This helps ensure that only passing and linted code is pushed to the repository.

### Setup

If you install dependencies with `npm install`, Husky will automatically set up the hooks.  
If you need to (re)install Husky hooks manually, run:

```sh
npx husky install
```

You can find and customize the hook scripts in the `.husky/` directory at the root of the project.

**Note:**  
These hooks help maintain code quality and consistency across all contributors. If a hook fails, the commit or push will be aborted until the issues are resolved.

---
