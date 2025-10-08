"""
Database initialization script
Run this to set up the MongoDB database with initial data
"""
import asyncio
import sys
import os

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.database import connect_to_mongo, close_mongo_connection, get_database
from datetime import datetime
import bcrypt


async def create_indexes():
    """Create database indexes for better performance"""
    db = get_database()
    
    # Spaces indexes
    await db.spaces.create_index("type")
    await db.spaces.create_index("available")
    await db.spaces.create_index([("name", 1)])
    
    # Bookings indexes
    await db.bookings.create_index("space_id")
    await db.bookings.create_index("email")
    await db.bookings.create_index("payment_reference")
    await db.bookings.create_index([("created_at", -1)])
    
    # Transactions indexes
    await db.transactions.create_index("booking_id")
    await db.transactions.create_index("reference")
    await db.transactions.create_index([("created_at", -1)])
    
    # Gallery indexes
    await db.gallery.create_index("category")
    await db.gallery.create_index([("created_at", -1)])
    
    # Timeline indexes
    await db.timeline.create_index([("date", 1)])
    
    # Messages indexes
    await db.messages.create_index("email")
    await db.messages.create_index([("created_at", -1)])
    
    print("✅ Database indexes created")


async def create_admin_user():
    """Create default admin user"""
    db = get_database()
    
    # Check if admin exists
    existing_admin = await db.admins.find_one({"email": "admin@fombinatower.com"})
    if existing_admin:
        print("⚠️  Admin user already exists")
        return
    
    # Create admin user
    password = "Admin@123"  # Change this in production!
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    admin_user = {
        "email": "admin@fombinatower.com",
        "password": hashed_password.decode('utf-8'),
        "name": "Admin User",
        "role": "admin",
        "created_at": datetime.utcnow(),
    }
    
    await db.admins.insert_one(admin_user)
    print(f"✅ Admin user created: admin@fombinatower.com / {password}")
    print("⚠️  IMPORTANT: Change the default password immediately!")


async def seed_sample_spaces():
    """Add sample spaces to the database"""
    db = get_database()
    
    # Check if spaces already exist
    existing_spaces = await db.spaces.count_documents({})
    if existing_spaces > 0:
        print(f"⚠️  {existing_spaces} spaces already exist")
        return
    
    sample_spaces = [
        {
            "name": "Executive Office Suite A",
            "description": "Premium corner office with panoramic city views, perfect for C-suite executives and senior management.",
            "type": "office",
            "floor": 25,
            "size": 150,
            "price": 2500000,
            "available": True,
            "features": ["Corner unit", "Private bathroom", "Meeting room", "Kitchenette"],
            "imageUrl": "/luxury-office-interior-with-city-view.jpg",
            "created_at": datetime.utcnow(),
        },
        {
            "name": "Open Plan Office B",
            "description": "Modern open-plan workspace ideal for tech startups and creative agencies.",
            "type": "office",
            "floor": 18,
            "size": 200,
            "price": 3000000,
            "available": True,
            "features": ["Open layout", "High ceilings", "Natural light", "Breakout areas"],
            "imageUrl": "/modern-office-space-with-city-view.jpg",
            "created_at": datetime.utcnow(),
        },
        {
            "name": "Luxury Retail Space",
            "description": "Prime ground floor retail space with high foot traffic and excellent visibility.",
            "type": "mall",
            "floor": 1,
            "size": 120,
            "price": 4000000,
            "available": True,
            "features": ["Ground floor", "Street access", "Display windows", "Storage area"],
            "imageUrl": "/luxury-retail-space-interior.jpg",
            "created_at": datetime.utcnow(),
        },
        {
            "name": "Grand Event Hall",
            "description": "Elegant event space perfect for corporate functions, weddings, and conferences.",
            "type": "event-hall",
            "floor": 30,
            "size": 500,
            "price": 5000000,
            "available": True,
            "features": ["Rooftop access", "AV equipment", "Catering kitchen", "Panoramic views"],
            "imageUrl": "/elegant-event-hall-interior.jpg",
            "created_at": datetime.utcnow(),
        },
    ]
    
    result = await db.spaces.insert_many(sample_spaces)
    print(f"✅ {len(result.inserted_ids)} sample spaces added")


async def seed_timeline():
    """Add construction timeline milestones"""
    db = get_database()
    
    # Check if timeline exists
    existing_timeline = await db.timeline.count_documents({})
    if existing_timeline > 0:
        print(f"⚠️  {existing_timeline} timeline entries already exist")
        return
    
    timeline_data = [
        {
            "title": "Project Announcement",
            "description": "Official announcement of Fombina Tower development project",
            "date": datetime(2024, 1, 15),
            "status": "completed",
            "imageUrl": "/project-announcement.jpg",
            "created_at": datetime.utcnow(),
        },
        {
            "title": "Foundation Work",
            "description": "Excavation and foundation construction completed",
            "date": datetime(2024, 6, 1),
            "status": "completed",
            "imageUrl": "/foundation-work.jpg",
            "created_at": datetime.utcnow(),
        },
        {
            "title": "Structural Framework",
            "description": "Main structural framework reaching 50% completion",
            "date": datetime(2025, 3, 1),
            "status": "in-progress",
            "imageUrl": "/structural-framework.jpg",
            "created_at": datetime.utcnow(),
        },
        {
            "title": "Interior Finishing",
            "description": "Interior finishing and MEP installations",
            "date": datetime(2025, 9, 1),
            "status": "upcoming",
            "imageUrl": "/interior-finishing.jpg",
            "created_at": datetime.utcnow(),
        },
        {
            "title": "Grand Opening",
            "description": "Official opening and handover to tenants",
            "date": datetime(2026, 3, 1),
            "status": "upcoming",
            "imageUrl": "/grand-opening.jpg",
            "created_at": datetime.utcnow(),
        },
    ]
    
    result = await db.timeline.insert_many(timeline_data)
    print(f"✅ {len(result.inserted_ids)} timeline entries added")


async def main():
    """Main initialization function"""
    print("🚀 Starting database initialization...")
    
    try:
        # Connect to database
        await connect_to_mongo()
        
        # Create indexes
        await create_indexes()
        
        # Create admin user
        await create_admin_user()
        
        # Seed sample data
        await seed_sample_spaces()
        await seed_timeline()
        
        print("\n✅ Database initialization completed successfully!")
        print("\n📝 Next steps:")
        print("1. Update the admin password")
        print("2. Configure environment variables")
        print("3. Start the backend server: uvicorn backend.main:app --reload")
        
    except Exception as e:
        print(f"\n❌ Error during initialization: {e}")
    finally:
        await close_mongo_connection()


if __name__ == "__main__":
    asyncio.run(main())
