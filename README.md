# Loops Integrated - Digital Sales Chatbot

A lightweight, bilingual (English & Sinhala) chatbot widget for Loops Integrated's landing page. This chatbot acts as a digital sales representative, answering questions and offering to connect visitors with a human representative when needed.

## Features

- ✅ **Embeddable Widget**: Floating chat bubble with polished UI
- ✅ **Bilingual Support**: Auto-detects and responds in English or Sinhala
- ✅ **Manual Language Toggle**: Switch between Auto/EN/SI modes
- ✅ **Secure Backend**: OpenAI API key secured server-side
- ✅ **Conversation Context**: Retains last 10 messages
- ✅ **Off-topic Fallback**: Redirects off-topic queries to contact form
- ✅ **Brand Knowledge**: Pre-loaded with Loops Integrated information

## Tech Stack

- **Framework**: Next.js 16.0.3 (App Router)
- **Frontend**: React 19.2.0 with Tailwind CSS v4
- **AI**: OpenAI GPT-4o-mini
- **Language Detection**: Unicode range detection for Sinhala characters

## Setup Instructions

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd loops-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
loops-chatbot/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.js          # Chat API endpoint
│   │   └── contact/
│   │       └── route.js          # Contact form API endpoint
│   ├── layout.js                  # Root layout
│   ├── page.js                    # Home page
│   └── globals.css                # Global styles
├── lib/
│   ├── chat.js                    # Chat business logic & OpenAI integration
│   └── contact.js                 # Contact form handler
├── widget/
│   ├── ChatWidget.js              # Main chat widget component
│   └── language.js                # Language detection utility
└── public/                        # Static assets
```

## How to Embed the Widget

The ChatWidget is already integrated into the main page. To embed it on other pages:

```javascript
import ChatWidget from "@/widget/ChatWidget";

export default function YourPage() {
    return (
        <div>
            {/* Your page content */}
            <ChatWidget />
        </div>
    );
}
```

## API Endpoints

### POST /api/chat

Handles chat messages with bilingual support.

**Request Body:**
```json
{
  "messages": [
    { "role": "user", "content": "Your message" }
  ],
  "languageMode": "auto" | "en" | "si"
}
```

**Response:**
```json
{
  "reply": "AI response",
  "offTopic": false
}
```

### POST /api/contact

Handles contact form submissions.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message"
}
```

**Response:**
```json
{
  "success": true
}
```

## Configuration

### Brand Information

Update the system prompt in `lib/chat.js` to customize:
- Working hours
- Location
- Services offered
- Contact information

### Language Detection

Modify `widget/language.js` to adjust language detection logic:
```javascript
export function isSinhala(text) {
    return /[\u0D80-\u0DFF]/.test(text);
}
```

## Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variable: `OPENAI_API_KEY`
   - Click "Deploy"

### Deploy to Netlify

1. **Build settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Environment variables**
   - Add `OPENAI_API_KEY` in Netlify dashboard

## Features Demo

### 1. English Conversation
The chatbot responds to English queries about Loops Integrated's services.

### 2. Sinhala Support
Automatically detects Sinhala text and responds in Sinhala.

### 3. Language Toggle
Switch between Auto/EN/SI modes for forced language preference.

### 4. Off-topic Handling
When users ask unrelated questions, the bot collects contact information via a form.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Troubleshooting

### API Key Issues
- Ensure `.env.local` exists and contains valid `OPENAI_API_KEY`
- Restart dev server after adding environment variables

### 404 on API Routes
- Verify routes are in `app/api/` directory
- Check import paths use `@/lib/` prefix

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## License

This project is private and proprietary to Loops Integrated.

## Contact

For questions or support, contact: hello@loops.lk
