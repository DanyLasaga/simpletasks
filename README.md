# SimpleTasks - Smart Todo App

SimpleTasks is a smart todo application built with Next.js and TypeScript. It allows you to create, edit, complete, and delete tasks, automatically identifying mentions, hashtags, emails, and links in your task text and converting them into interactive, clickable chips.

## Main Features

- Add, edit, delete, and complete tasks easily.
- Task text is parsed to detect mentions (`@user`), hashtags (`#topic`), emails, and links, displaying them as clickable chips.
- Each chip type can have a custom SVG icon (located in `public/icons`).
- Modern and responsive interface.
- Local persistence of tasks using `localStorage`.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- Local storage (`localStorage`)

## Installation & Running

1. Clone the repository:
   ```bash
   git clone <https://github.com/DanyLasaga/simpletasks.git>
   cd simpletasks
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Basic Usage

- Type your task in the input field and click the add button.
- If your text includes mentions, hashtags, emails, or links, they will appear as interactive chips.
- Click on chips to open links, send emails, or show contextual alerts.
- You can edit or delete existing tasks.

## Customizing Chip Icons

Chip icons are located in `public/icons` and can be replaced with your preferred SVGs. By default, icons like `mail.svg`, `link.svg`, etc. are used.

## Relevant Folder Structure

- `app/components/` - Main components (Task, Chip, AddTask, etc.)
- `app/utils/` - Utilities such as the text parser
- `public/icons/` - SVG icons for chips

> Developed as a technical test.
