# Fombina Tower - Database Schema

MongoDB database schema documentation.

## Collections

### spaces

Stores available office, mall, and event hall spaces.

\`\`\`javascript
{
  _id: ObjectId,
  name: String,              // "Executive Office Suite A"
  type: String,              // "office" | "mall" | "event-hall"
  floor: Number,             // Floor number
  size: Number,              // Size in square meters
  price: Number,             // Monthly price in Naira
  features: [String],        // Array of features
  available: Boolean,        // Availability status
  imageUrl: String,          // Cloudinary image URL
  description: String,       // Detailed description
  createdAt: String          // ISO date string
}
\`\`\`

**Indexes:**
- `type` (for filtering by space type)
- `available` (for finding available spaces)

### bookings

Stores customer bookings.

\`\`\`javascript
{
  _id: ObjectId,
  userId: String,            // User email (used as ID)
  spaceId: String,           // Reference to spaces._id
  userName: String,          // Customer name
  userEmail: String,         // Customer email
  userPhone: String,         // Customer phone
  companyName: String,       // Optional company name
  bookingDate: String,       // ISO date string
  status: String,            // "pending" | "confirmed" | "cancelled"
  paymentStatus: String,     // "pending" | "completed" | "failed"
  paymentReference: String,  // Paystack reference
  amount: Number,            // Deposit amount paid
  createdAt: String,         // ISO date string
  updatedAt: String          // ISO date string
}
\`\`\`

**Indexes:**
- `userEmail` (for finding user bookings)
- `spaceId` (for finding space bookings)
- `status` (for filtering by status)
- `createdAt` (for sorting by date)

### transactions

Stores payment transactions.

\`\`\`javascript
{
  _id: ObjectId,
  bookingId: String,         // Reference to bookings._id
  reference: String,         // Paystack reference
  amount: Number,            // Amount in Naira
  status: String,            // "pending" | "success" | "failed"
  paystackResponse: Object,  // Full Paystack response
  createdAt: String,         // ISO date string
  updatedAt: String          // ISO date string
}
\`\`\`

**Indexes:**
- `reference` (unique, for payment verification)
- `bookingId` (for finding booking transactions)
- `status` (for filtering by status)

### contacts

Stores contact form submissions.

\`\`\`javascript
{
  _id: ObjectId,
  name: String,              // Contact name
  email: String,             // Contact email
  phone: String,             // Contact phone
  message: String,           // Message content
  status: String,            // "new" | "read" | "responded"
  createdAt: String          // ISO date string
}
\`\`\`

**Indexes:**
- `status` (for filtering by status)
- `createdAt` (for sorting by date)

### media

Stores gallery images and videos.

\`\`\`javascript
{
  _id: ObjectId,
  title: String,             // Media title
  type: String,              // "image" | "video"
  url: String,               // Cloudinary URL
  category: String,          // "render" | "interior" | "exterior" | "floor-plan" | "construction"
  uploadedAt: String         // ISO date string
}
\`\`\`

**Indexes:**
- `category` (for filtering by category)
- `type` (for filtering by media type)

### timeline

Stores construction timeline events.

\`\`\`javascript
{
  _id: ObjectId,
  title: String,             // Event title
  description: String,       // Event description
  date: String,              // Event date (YYYY-MM-DD)
  status: String,            // "completed" | "in-progress" | "upcoming"
  imageUrl: String           // Optional image URL
}
\`\`\`

**Indexes:**
- `date` (for sorting chronologically)
- `status` (for filtering by status)

### users

Stores admin users.

\`\`\`javascript
{
  _id: ObjectId,
  email: String,             // Admin email (unique)
  password: String,          // Hashed password (use bcrypt in production)
  role: String,              // "admin"
  createdAt: String          // ISO date string
}
\`\`\`

**Indexes:**
- `email` (unique, for login)

## Relationships

- `bookings.spaceId` → `spaces._id`
- `transactions.bookingId` → `bookings._id`

## Data Validation

### Email Format
All email fields should be validated using email regex or Pydantic EmailStr.

### Phone Format
Phone numbers should include country code (e.g., +234 for Nigeria).

### Price Format
All prices are stored as integers in Naira (no decimals).

### Date Format
All dates are stored as ISO 8601 strings (e.g., "2024-01-15T10:30:00.000Z").

## Seeding Data

Run the seed script to populate initial data:

\`\`\`bash
cd backend
python seed_data.py
\`\`\`

This will create:
- 4 sample spaces
- 9 timeline events
- 1 admin user (email: admin@fombinatower.com, password: admin123)

## Backup Strategy

### Automated Backups (MongoDB Atlas)

1. Go to Clusters → Backup
2. Enable Continuous Backup
3. Set retention period (7-30 days recommended)
4. Schedule regular snapshots

### Manual Backups

\`\`\`bash
# Export entire database
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/fombina_tower" --out=backup

# Export specific collection
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/fombina_tower" --collection=spaces --out=backup

# Restore database
mongorestore --uri="mongodb+srv://username:password@cluster.mongodb.net/fombina_tower" backup/fombina_tower
\`\`\`

## Performance Optimization

### Indexes

Create indexes for frequently queried fields:

\`\`\`javascript
// In MongoDB shell or Compass
db.spaces.createIndex({ type: 1, available: 1 })
db.bookings.createIndex({ userEmail: 1 })
db.bookings.createIndex({ createdAt: -1 })
db.transactions.createIndex({ reference: 1 }, { unique: true })
\`\`\`

### Query Optimization

- Use projection to limit returned fields
- Implement pagination for large result sets
- Cache frequently accessed data
- Use aggregation pipeline for complex queries

## Security

### Best Practices

1. **Never commit credentials** - Use environment variables
2. **Hash passwords** - Use bcrypt for admin passwords
3. **Validate input** - Use Pydantic models for validation
4. **Limit access** - Use MongoDB user roles
5. **Enable authentication** - Require username/password for MongoDB
6. **Use SSL/TLS** - Enable encrypted connections
7. **Regular backups** - Automate backup process
8. **Monitor access** - Review MongoDB logs regularly

### Connection String Security

- Use MongoDB Atlas for managed security
- Whitelist specific IP addresses
- Rotate credentials regularly
- Use read-only users for analytics

## Monitoring

### Key Metrics

- Database size and growth rate
- Query performance and slow queries
- Connection pool usage
- Error rates
- Backup success/failure

### Tools

- MongoDB Atlas Monitoring
- MongoDB Compass for visual exploration
- Custom logging in application code

## Migration Strategy

For schema changes:

1. Test migration in development
2. Backup production database
3. Run migration script
4. Verify data integrity
5. Update application code
6. Deploy changes

Example migration script:

\`\`\`python
# Add new field to existing documents
db.spaces.update_many(
    {},
    {"$set": {"featured": False}}
)
\`\`\`
\`\`\`

```json file="" isHidden
