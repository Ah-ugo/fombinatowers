# Fombina Tower Backend Setup Guide

## Prerequisites

- Python 3.9 or higher
- MongoDB (local or Atlas)
- Cloudinary account
- Paystack account
- SMTP email service (Gmail, SendGrid, etc.)

## Installation Steps

### 1. Install Dependencies

\`\`\`bash
cd backend
pip install -r requirements.txt
\`\`\`

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

\`\`\`env
# MongoDB Configuration
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=fombina_tower

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Paystack Configuration
PAYSTACK_SECRET_KEY=sk_test_your_secret_key
PAYSTACK_CALLBACK_URL=http://localhost:3000/booking/success

# SMTP Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
FROM_EMAIL=your_email@gmail.com
FROM_NAME=Fombina Tower
ADMIN_EMAIL=admin@fombinatower.com

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Frontend URL
FRONTEND_URL=http://localhost:3000
\`\`\`

### 3. Initialize Database

Run the database initialization script to create indexes, admin user, and sample data:

\`\`\`bash
python scripts/init_database.py
\`\`\`

This will:
- Create database indexes for optimal performance
- Create an admin user (email: admin@fombinatower.com, password: Admin@123)
- Seed sample spaces
- Add construction timeline data

**Important:** Change the default admin password immediately after first login!

### 4. Start the Server

\`\`\`bash
# Development mode with auto-reload
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000

# Production mode
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --workers 4
\`\`\`

The API will be available at `http://localhost:8000`

### 5. API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Service Configuration

### MongoDB Atlas (Recommended for Production)

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Update `MONGODB_URL` in `.env`:
   \`\`\`
   MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/
   \`\`\`

### Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your credentials from the dashboard
3. Update the Cloudinary variables in `.env`

### Paystack Setup

1. Create an account at [Paystack](https://paystack.com/)
2. Get your test/live secret key
3. Update `PAYSTACK_SECRET_KEY` in `.env`
4. Configure webhook URL in Paystack dashboard (optional)

### Email Service Setup

For Gmail:
1. Enable 2-factor authentication
2. Generate an app password
3. Use the app password in `SMTP_PASSWORD`

For SendGrid or other services:
1. Get SMTP credentials
2. Update SMTP configuration in `.env`

## Testing

### Test API Endpoints

\`\`\`bash
# Health check
curl http://localhost:8000/

# Get spaces
curl http://localhost:8000/api/spaces

# Get timeline
curl http://localhost:8000/api/timeline
\`\`\`

### Admin Login

\`\`\`bash
curl -X POST http://localhost:8000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@fombinatower.com","password":"Admin@123"}'
\`\`\`

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod --version`
- Check connection string format
- Verify network access in MongoDB Atlas

### Email Not Sending
- Check SMTP credentials
- Verify firewall/port settings
- Test with a simple SMTP client

### Paystack Payment Issues
- Verify secret key is correct
- Check if using test/live mode correctly
- Review Paystack dashboard for errors

## Production Deployment

1. Use environment variables (never commit `.env`)
2. Enable HTTPS
3. Configure CORS for specific origins
4. Use production MongoDB cluster
5. Set up monitoring and logging
6. Configure backup strategy
7. Use production Paystack keys
8. Implement rate limiting
9. Set up proper error tracking

## Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT secret
- [ ] Enable HTTPS in production
- [ ] Configure CORS properly
- [ ] Use environment variables
- [ ] Implement rate limiting
- [ ] Set up monitoring
- [ ] Regular security updates
- [ ] Database backups configured
- [ ] API authentication on all admin routes
