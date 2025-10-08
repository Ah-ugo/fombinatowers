# Fombina Tower - Pre-Leasing Platform

A complete, production-ready web application for pre-leasing office and mall spaces in Fombina Tower, Abuja's next landmark skyscraper.

## Tech Stack

### Frontend
- **Next.js 14** (App Router, TypeScript)
- **TailwindCSS** for styling
- **Shadcn/ui** for UI components

### Backend
- **FastAPI** (Python)
- **MongoDB** (via pymongo)
- **Cloudinary** for media storage
- **Paystack** for payment processing
- **SMTP** for email notifications

## Features

### Public Pages
- **Home**: Video hero section, about preview, features
- **About**: Company story, vision, sustainability
- **Spaces**: Browse and book available spaces
- **Gallery**: Image and video carousels
- **Timeline**: Construction milestones
- **Contact**: Contact form with email notifications

### Admin Dashboard
- Manage spaces (CRUD operations)
- View bookings and transactions
- Upload media to Cloudinary
- View contact submissions

### Payment Integration
- Paystack payment URL generation
- Payment verification webhook
- Transaction tracking
- Email notifications on successful payment

## Getting Started

### Frontend Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Set up environment variables:
\`\`\`bash
cp .env.local.example .env.local
# Edit .env.local with your configuration
\`\`\`

3. Run development server:
\`\`\`bash
npm run dev
\`\`\`

### Backend Setup

1. Navigate to backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Create virtual environment:
\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
\`\`\`

3. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

4. Set up environment variables:
\`\`\`bash
cp .env.example .env
# Edit .env with your configuration
\`\`\`

5. Run FastAPI server:
\`\`\`bash
uvicorn main:app --reload
\`\`\`

## Environment Variables

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL`: Backend API URL

### Backend (.env)
- `MONGODB_URI`: MongoDB connection string
- `PAYSTACK_SECRET_KEY`: Paystack secret key
- `PAYSTACK_PUBLIC_KEY`: Paystack public key
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `SMTP_HOST`: SMTP server host
- `SMTP_PORT`: SMTP server port
- `SMTP_USER`: SMTP username
- `SMTP_PASSWORD`: SMTP password
- `ADMIN_EMAIL`: Admin email for notifications
- `JWT_SECRET`: Secret key for JWT tokens

## Deployment

### Frontend (Vercel)
\`\`\`bash
vercel deploy
\`\`\`

### Backend (Railway/Render/DigitalOcean)
Follow platform-specific deployment guides.

## License

Proprietary - Fombina Tower Development
