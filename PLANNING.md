# Project Planning for OutFlo Internship Assignment

## Overview

The goal is to build a campaign management system with a backend for CRUD operations and AI-powered LinkedIn message generation, a frontend for managing campaigns and generating messages, and a bonus LinkedIn scraping feature. The project will be developed using Node.js, Express, TypeScript, MongoDB, React, Shadcn, and Playwright, and deployed on free platforms (Vercel/Render).

## Project Structure

OutFlo-Assignment/
└── backend/
├── src/
│ ├── config/
│ │ └── db.ts # MongoDB connection setup
│ ├── controllers/
│ │ ├── campaignController.ts # Campaign CRUD logic
│ │ └── messageController.ts # Message generation logic
│ ├── models/
│ │ └── campaignModel.ts # Campaign schema
│ ├── routes/
│ │ ├── campaignRoutes.ts # Campaign API routes
│ │ └── messageRoutes.ts # Message API routes
│ ├── services/
│ │ └── aiService.ts # DeepSeek AI integration
│ ├── types/
│ │ └── index.ts # TypeScript interfaces
│ ├── utils/
│ │ └── validation.ts # Input validation
│ └── app.ts # Express app setup
├── .env # Environment variables
├── .gitignore # Git ignore file
├── package.json # Dependencies and scripts
├── tsconfig.json # TypeScript configuration
└── README.md # Backend instructions

└── frontend/
├── public/ # Static assets (favicon, images, etc.)
├── src/
│ ├── components/ # Reusable UI components
│ │ ├── campaigns/ # Campaign-related components (List, Form, etc.)
│ │ ├── layout/ # Layout components (Header, Footer, Sidebar,etc.)
│ │ ├── leads/ # Lead-related components (List, Form, etc.)
│ │ ├── message-generator/ # Message generation form
│ │ └── ui/ # Shadcn UI primitives and wrappers
│ ├── hooks/ # Custom React hooks
│ ├── lib/ # Utility functions, API clients, helpers
│ ├── pages/ # Top-level pages (Dashboard, Leads, Landing,etc.)
│ ├── styles/ # Tailwind and global CSS files
│ ├── types/ # TypeScript type definitions and interfaces
│ ├── App.tsx # Main app component
│ ├── main.tsx # React entry point
│ └── index.css # Tailwind base styles
├── .env # Environment variables (API URLs, etc.)
├── .gitignore # Git ignore file
├── package.json # Dependencies and scripts
├── tailwind.config.js # Tailwind CSS configuration
├── postcss.config.js # PostCSS configuration
├── tsconfig.json # TypeScript configuration
└── README.md # Frontend instructions

## Scope

- **Backend**:
  - RESTful APIs for campaign management (Create, Read, Update, Delete) with MongoDB.
  - Soft delete functionality (mark campaigns as DELETED, keep in database).
  - Status restricted to ACTIVE/INACTIVE for non-deleted campaigns.
  - Personalized message API using a free AI API (e.g., DeepSeek) to generate outreach messages based on LinkedIn profile data.
- **Frontend**:
  - React dashboard to list, create, edit, and delete campaigns with ACTIVE/INACTIVE toggle.
  - Form to input LinkedIn profile data (name, job title, company, location, summary) and display AI-generated messages.
  - Responsive UI using Shadcn and Tailwind CSS.
- **Bonus Task**:
  - Local LinkedIn scraping using Playwright to extract 20+ profiles from a provided search URL.
  - Store scraped data (name, job title, company, location, profile URL) in MongoDB.
  - UI integration to search and display scraped profiles.
- **Deployment**:
  - Backend on Render, frontend on Vercel, MongoDB on Atlas.
  - Fully functional deployed app without requiring local setup.

## Tech Stack

- **Backend**: Node.js, Express, TypeScript, MongoDB (Mongoose), Axios.
- **Frontend**: React, TypeScript, Shadcn, Tailwind CSS, Axios.
- **Scraping**: Playwright (local execution).
- **AI**: DeepSeek or Gemini (free tier).
- **Deployment**: Vercel (frontend), Render (backend), MongoDB Atlas.

## Development Strategy

1. **Backend**:
   - Set up Express with TypeScript and MongoDB connection.
   - Define Mongoose schema for campaigns (name, description, status, leads, accountIDs).
   - Implement CRUD APIs with proper status handling and soft deletes.
   - Create message generation API with AI integration.
2. **Frontend**:
   - Bootstrap React app with Shadcn and Tailwind CSS.
   - Build campaign dashboard with list, forms, and toggle buttons.
   - Create message generator form with sample input data.
3. **Bonus Task**:
   - Implement local LinkedIn scraping with Playwright, respecting rate limits.
   - Store scraped data in MongoDB and integrate with frontend for search/display.
4. **Testing & Deployment**:
   - Test APIs with Postman and UI locally.
   - Deploy backend to Render, frontend to Vercel, and configure MongoDB Atlas.
   - Record Loom video for scraping demo (bonus task).

## Key Considerations

- **Type Safety**: Use TypeScript interfaces for API payloads and MongoDB schemas.
- **Modularity**: Separate backend routes and frontend components for maintainability.
- **Scraping**: Run locally, use delays to mimic human behavior, and avoid LinkedIn bans.
- **Deployment**: Ensure zero-configuration access for evaluators.
- **Evaluation**: Focus on clean code, RESTful API design, UI responsiveness, and TypeScript usage.

## Timeline

- Day 1-2: Project setup, backend CRUD APIs, MongoDB integration.
- Day 3: Message generation API with AI integration.
- Day 4: Frontend campaign dashboard and message generator UI.
- Day 5: Bonus scraping task and UI integration.
- Day 6: Testing, deployment, and Loom video recording.
- Day 7: Final submission via Google Form and Internshala.

## Risks & Mitigations

- **AI API Limits**: Use free-tier DeepSeek; fallback to Gemini if issues arise.
- **Scraping Detection**: Implement delays and human-like behavior in Playwright.
- **Deployment Issues**: Test early on Vercel/Render to resolve environment issues.
- **Time Constraints**: Prioritize core features (CRUD, message generation, UI) over bonus task if needed.
