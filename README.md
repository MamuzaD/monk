# Monk
### A Next.js Web App with Kanban-style Boards and Block-Based Notes
### Check it out [here](monk-board.com)

<img src="/public/images/board.webp" alt="Monk Board" width="600" />
<img src="/public/images/notes.webp" alt="Monk Notes" width="600" />

### Built With
#### Frontend
![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui Badge](https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff&style=for-the-badge)
#### Backend
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Prisma Badge](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=fff&style=for-the-badge)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
#### Tools
![Clerk Badge](https://img.shields.io/badge/Clerk-6C47FF?logo=clerk&logoColor=fff&style=for-the-badge)
![Stripe Badge](https://img.shields.io/badge/Stripe-008CDD?logo=stripe&logoColor=fff&style=for-the-badge)
![Supabase Badge](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=fff&style=for-the-badge)
![Vercel Badge](https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=fff&style=for-the-badge)

## Features
### Kanban Style Boards
- Organize your tasks into a simple format with cards, lists, and boards under an organization (using auth from [Clerk](clerk.com))
- Tweak card details to your specific needs

### Block Based Notes
- Create notes using a block-based editor for easy formatting and organization.
- Utilize different block types (text, image, checklist, etc.) to customize your notes.
- Drag and drop blocks to rearrange content as needed.

### User Authentication
- Sign up and log in using [Clerk](clerk.com) for secure user authentication and account management.
- Manage your boards and notes under your personal account.

### Payment Integration 
*(albeit free and mostly for educational purposes)*
- Subscription management with [Stripe](https://stripe.com/) for premium features (e.g. more notes and boards).

### Database Integration
- Allow real time CRUD operations with Prisma ORM and PostgreSQL database via [Supabase](https://supabase.com/)
