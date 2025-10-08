# Fombina Tower Backend API

FastAPI backend for the Fombina Tower pre-leasing platform.

## Features

- RESTful API endpoints for spaces, bookings, and transactions
- Paystack payment integration
- MongoDB database integration
- Cloudinary media upload
- SMTP email notifications
- JWT authentication for admin routes
- CORS enabled for frontend communication

## Setup

1. Create virtual environment:
\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
\`\`\`

2. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

3. Configure environment variables:
\`\`\`bash
cp .env.example .env
# Edit .env with your configuration
\`\`\`

4. Run the server:
\`\`\`bash
uvicorn main:app --reload
\`\`\`

The API will be available at http://localhost:8000

## API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints

### Public Endpoints
- `GET /api/spaces` - Get all spaces
- `GET /api/spaces/{id}` - Get single space
- `POST /api/book-space` - Create booking and get payment URL
- `GET /api/verify-payment/{reference}` - Verify payment
- `GET /api/gallery` - Get gallery items
- `GET /api/timeline` - Get construction timeline
- `POST /api/contact` - Submit contact form

### Admin Endpoints (Requires JWT Token)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/bookings` - Get all bookings
- `GET /api/admin/transactions` - Get all transactions
- `POST /api/admin/upload-media` - Upload media to Cloudinary
- `GET /api/admin/contacts` - Get contact messages
- `POST /api/spaces` - Create new space

## Environment Variables

See `.env.example` for required environment variables.

## Database Collections

- `spaces` - Available spaces for booking
- `bookings` - Customer bookings
- `transactions` - Payment transactions
- `contacts` - Contact form submissions
- `media` - Gallery images and videos
- `timeline` - Construction timeline events
- `users` - Admin users

## Payment Flow

1. User submits booking form
2. Backend creates booking record with "pending" status
3. Backend generates Paystack payment URL
4. User completes payment on Paystack
5. Paystack redirects to success page with reference
6. Frontend calls verify-payment endpoint
7. Backend verifies payment with Paystack
8. Backend updates booking status to "confirmed"
9. Backend sends confirmation emails to user and admin

## Email Notifications

The system sends emails for:
- Booking confirmation (to user)
- New booking notification (to admin)
- Contact form submission (to admin)

## Security

- JWT tokens for admin authentication
- CORS configuration for frontend access
- Environment variables for sensitive data
- Password hashing recommended for production (use bcrypt)

## Deployment

For production deployment:
1. Set proper CORS origins
2. Use strong JWT secret
3. Enable HTTPS
4. Use production MongoDB instance
5. Configure proper email service
6. Set up monitoring and logging
