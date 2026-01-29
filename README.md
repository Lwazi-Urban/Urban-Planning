# NeXT Plan - Town Planning Intelligence

A Google-inspired town planning and zoning intelligence platform for the South Coast Region, powered by Gemini AI.

## Features

- **Zoning Intelligence Search**: Instant access to municipal zoning controls.
- **Deep AI Analysis**: Upload scheme documents for AI-powered regulation breakdown.
- **Knowledge Base**: Admin-managed articles and legislative updates.
- **Consultation Booking**: Direct line to planning specialists.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS (via CDN for speed)
- Google Gemini API (`@google/genai`)

## Setup & Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd next-plan
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your Google Gemini API Key:
    ```env
    API_KEY=your_gemini_api_key_here
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

5.  **Build for Production**
    ```bash
    npm run build
    ```

## Project Structure

- `components/`: UI Components (Search, Dashboard, KnowledgeBase)
- `services/`: API integrations (Gemini Service)
- `types.ts`: TypeScript definitions
- `constants.tsx`: Static data (Zoning controls, etc.)

## License

Private / Proprietary
