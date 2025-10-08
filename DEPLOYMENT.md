# Fombina Tower - Deployment Guide

Complete deployment guide for the Fombina Tower pre-leasing platform.

## Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- MongoDB Atlas account or local MongoDB
- Cloudinary account
- Paystack account
- SMTP email service (Gmail, SendGrid, etc.)

## Environment Setup

### 1. MongoDB Setup

**Option A: MongoDB Atlas (Recommended for Production)**

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create database user with read/write permissions
4. Whitelist your IP address (or 0.0.0.0/0 for development)
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/fombina_tower`

**Option B: Local MongoDB**

1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Connection string: `mongodb://localhost:27017`

### 2. Paystack Setup

1. Create account at https://paystack.com
2. Go to Settings > API Keys & Webhooks
3. Copy your **Secret Key** and **Public Key**
4. For testing, use test keys (starts with `sk_test_` and `pk_test_`)
5. For production, use live keys (starts with `sk_live_` and `pk_live_`)

### 3. Cloudinary Setup

1. Create account at https://cloudinary.com
2. Go to Dashboard
3. Copy your **Cloud Name**, **API Key**, and **API Secret**
4. Enable unsigned uploads if needed

### 4. SMTP Email Setup

**Option A: Gmail**

1. Enable 2-factor authentication on your Google account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use settings:
   - Host: `smtp.gmail.com`
   - Port: `587`
   - User: your Gmail address
   - Password: generated app password

**Option B: SendGrid**

1. Create account at https://sendgrid.com
2. Create API key
3. Use settings:
   - Host: `smtp.sendgrid.net`
   - Port: `587`
   - User: `apikey`
   - Password: your API key

## Backend Deployment

### Local Development

1. Navigate to backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Create virtual environment:
\`\`\`bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
\`\`\`

3. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

4. Create `.env` file:
\`\`\`bash
cp .env.example .env
\`\`\`

5. Edit `.env` with your credentials:
\`\`\`env
MONGODB_URI=your_mongodb_connection_string
PAYSTACK_SECRET_KEY=your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=your_paystack_public_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
ADMIN_EMAIL=admin@fombinatower.com
JWT_SECRET=your-random-secret-key
FRONTEND_URL=http://localhost:3000
\`\`\`

6. Seed database with initial data:
\`\`\`bash
python seed_data.py
\`\`\`

7. Run the server:
\`\`\`bash
uvicorn main:app --reload
\`\`\`

Backend will be available at http://localhost:8000

### Production Deployment (Railway/Render/DigitalOcean)

**Railway:**

1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Add environment variables in Railway dashboard
5. Deploy: `railway up`

**Render:**

1. Create new Web Service
2. Connect GitHub repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables
6. Deploy

**DigitalOcean App Platform:**

1. Create new app from GitHub
2. Select Python environment
3. Set run command: `uvicorn main:app --host 0.0.0.0 --port 8080`
4. Add environment variables
5. Deploy

## Frontend Deployment

### Local Development

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create `.env.local`:
\`\`\`bash
NEXT_PUBLIC_API_URL=http://localhost:8000
\`\`\`

3. Run development server:
\`\`\`bash
npm run dev
\`\`\`

Frontend will be available at http://localhost:3000

### Production Deployment (Vercel - Recommended)

1. Install Vercel CLI:
\`\`\`bash
npm i -g vercel
\`\`\`

2. Login:
\`\`\`bash
vercel login
\`\`\`

3. Deploy:
\`\`\`bash
vercel
\`\`\`

4. Add environment variable in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL

5. Redeploy:
\`\`\`bash
vercel --prod
\`\`\`

**Alternative: Deploy via Vercel Dashboard**

1. Go to https://vercel.com
2. Import your GitHub repository
3. Add environment variables
4. Deploy

## Post-Deployment Checklist

### Backend

- [ ] MongoDB connection working
- [ ] Paystack payment flow tested
- [ ] Cloudinary uploads working
- [ ] Email notifications sending
- [ ] Admin login functional
- [ ] API endpoints responding
- [ ] CORS configured for frontend domain

### Frontend

- [ ] All pages loading correctly
- [ ] API calls working
- [ ] Booking flow complete
- [ ] Payment redirect working
- [ ] Images loading from Cloudinary
- [ ] Forms submitting successfully
- [ ] Admin dashboard accessible

### Security

- [ ] Change default admin password
- [ ] Use strong JWT secret
- [ ] Enable HTTPS
- [ ] Configure CORS for specific origins
- [ ] Secure environment variables
- [ ] Enable rate limiting
- [ ] Set up monitoring

## Testing

### Test Paystack Integration

1. Use test card: `4084084084084081`
2. CVV: `408`
3. Expiry: Any future date
4. PIN: `0000`
5. OTP: `123456`

### Test Email Notifications

1. Submit contact form
2. Complete a booking
3. Check inbox for confirmation emails

### Test Admin Dashboard

1. Login with credentials from seed script
2. View bookings and transactions
3. Upload media
4. Manage spaces

## Monitoring & Maintenance

### Logs

- Backend logs: Check your hosting platform's logs
- Frontend logs: Check Vercel deployment logs
- Database logs: Check MongoDB Atlas logs

### Backups

- Set up automated MongoDB backups
- Export Cloudinary media regularly
- Keep environment variables backed up securely

### Updates

- Regularly update dependencies
- Monitor security advisories
- Test updates in staging before production

## Troubleshooting

### Common Issues

**Backend not connecting to MongoDB:**
- Check connection string format
- Verify IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

**Paystack payments failing:**
- Verify API keys are correct
- Check if using test keys in development
- Ensure callback URL is correct

**Emails not sending:**
- Verify SMTP credentials
- Check if app password is used (for Gmail)
- Ensure port 587 is not blocked

**CORS errors:**
- Add frontend URL to CORS origins in backend
- Check if API URL is correct in frontend

## Support

For issues or questions:
- Email: support@fombinatower.com
- Documentation: Check README files in each directory

## License

Proprietary - Fombina Tower Development
