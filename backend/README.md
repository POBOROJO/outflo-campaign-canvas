# OutFlo Backend

Backend for the OutFlo internship assignment, built with Node.js, Express, TypeScript, and MongoDB.

## Setup
1. Install pnpm: `npm install -g pnpm`.
2. Install dependencies: `pnpm install`.
3. Create a `.env` file with:
   ```
   PORT=5000
   MONGO_URI=<your-mongodb-atlas-uri>
   GEMINI_API_KEY=<your-gemini-api-key>
   ```
4. Run in development: `pnpm dev`.
5. Build for production: `pnpm build`.
6. Start in production: `pnpm start`.

## APIs
- **GET /api/campaigns**: Fetch all campaigns (excludes deleted).
- **GET /api/campaigns/:id**: Fetch a campaign by ID.
- **POST /api/campaigns**: Create a campaign.
- **PUT /api/campaigns/:id**: Update a campaign.
- **DELETE /api/campaigns/:id**: Soft delete a campaign.
- **POST /api/personalizedmessage**: Generate a personalized outreach message using Google Gemini.