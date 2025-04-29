# Initial Tasks for OutFlo Internship Assignment

## Objective
Kickstart the project by setting up the foundation and implementing core backend and frontend functionality for the campaign management system.

## Tasks
1. **Project Setup**:
   - Create a public GitHub repository named `OutFlo-Assignment`.
   - Set up two folders: `backend` (Node.js, Express, TypeScript) and `frontend` (React, TypeScript).
   - Initialize npm projects with TypeScript, ESLint, and Prettier for both.
   - Add README.md with setup instructions.

2. **Backend Setup**:
   - Install dependencies: `express`, `typescript`, `mongoose`, `dotenv`, `cors`, `axios`, `@types/*`.
   - Configure MongoDB Atlas and connect via Mongoose.
   - Set up Express server with TypeScript and basic route (`/health`).

3. **Campaign Model & CRUD APIs**:
   - Define Mongoose schema for campaigns (name: string, description: string, status: 'active'|'inactive'|'deleted', leads: string[], accountIDs: string[]).
   - Implement RESTful APIs:
     - `GET /campaigns`: Fetch all campaigns (exclude deleted).
     - `GET /campaigns/:id`: Fetch single campaign by ID.
     - `POST /campaigns`: Create new campaign.
     - `PUT /campaigns/:id`: Update campaign (restrict status to active/inactive).
     - `DELETE /campaigns/:id`: Soft delete (set status to deleted).
   - Add input validation using `express-validator`.

4. **Frontend Setup**:
   - Create React app with TypeScript (`create-react-app` or `vite`).
   - Install Shadcn CLI and initialize with Tailwind CSS.
   - Install dependencies: `axios`, `@tanstack/react-query` for API calls.
   - Set up basic routing with `react-router-dom`.

5. **Campaign Dashboard**:
   - Create a dashboard component to list campaigns (fetch from `GET /campaigns`).
   - Add a form component for creating/editing campaigns (integrate with `POST /campaigns`, `PUT /campaigns/:id`).
   - Implement toggle buttons for active/inactive status and a delete button (integrate with `PUT` and `DELETE` APIs).

6. **Message Generation API**:
   - Research and select a free AI API (e.g., DeepSeek) for message generation.
   - Implement `POST /personalized-message` endpoint:
     - Accept payload: `{ name, job_title, company, location, summary }`.
     - Call AI API to generate outreach message.
     - Return response: `{ message: string }`.
   - Test with sample payload locally.

7. **Local Testing**:
   - Test backend APIs using Postman or curl.
   - Verify frontend dashboard functionality in the browser.
   - Ensure MongoDB connection and data persistence.

## Next Steps
- Start bonus LinkedIn scraping task.
<!-- - Deploy backend to Render and frontend to Vercel.
- Record Loom video for scraping demo. -->