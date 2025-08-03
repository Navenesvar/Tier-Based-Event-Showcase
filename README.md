# 🎬 Tier-Based Event Showcase

A modern, tier-based movie showcase platform built with **Next.js 15**, **Clerk**, **Supabase** and **TailwindCSS**. Users can upgrade their subscription tier to access premium movie content and receive AI-based movie recommendations.

[🌐 Live Demo](https://tier-based-event-showcase-k3yh.vercel.app/)


## 🚀 Features

- 👤 **Authentication** via Clerk (sign-in/sign-up, session handling)
- 🔐 **Tiered Access Control** (Free, Silver, Gold, Platinum)
- 💳 **Upgrade System** with fake/dummy payments
- 📦 **Supabase**-backed movie data storage
- 🤖 **AI Movie Recommendation** using OpenAI
- 🌈 **Responsive, modern UI** with Tailwind CSS
- 🛡️ Secure route handling and dynamic tier-based content locking

---

## 🛠️ Tech Stack

| Tool        | Purpose                     |
|-------------|-----------------------------|
| **Next.js** | React framework             |
| **Clerk**   | User authentication         |
| **Supabase**| Backend-as-a-Service (DB)   |
| **OpenAI**  | AI movie recommendations    |
| **Tailwind**| Styling                     |
| **Vercel**  | Deployment platform         |

---

## 🧑‍💻 Local Setup

1. **Clone the repo**

```bash
git clone https://github.com/Navenesvar/Tier-Based-Event-Showcase.git
cd Tier-Based-Event-Showcase
```
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

Install dependencies

```bash

npm install
```
Create .env.local file
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

OPENAI_API_KEY=your_openai_key
```
Run the app

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔐 Demo User Credentials

Use the following credentials to log in and test different tier levels:

| **Tier**    | **Email**              | **Password**     |
|-------------|------------------------|------------------|
| Free        | free@demo.com          | Eefr123@         |
| Silver      | silver@demo.com        | Versil123@       |
| Gold        | gold@demo.com          | Ldgo123@         |
| Platinum    | platinum@demo.com      | Numplati123@     |

> 🔧 You can set or change a user’s tier in the Clerk Dashboard under **User > Metadata > publicMetadata** like:
```json
{
  "tier": "gold"
}
```
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
