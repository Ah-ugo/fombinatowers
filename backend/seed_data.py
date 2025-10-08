"""
Seed script to populate the database with initial data
Run with: python seed_data.py
"""

from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
client = MongoClient(MONGODB_URI)
db = client["fombina_tower"]

# Sample Spaces
spaces_data = [
    {
        "name": "Executive Office Suite A",
        "type": "office",
        "floor": 15,
        "size": 250,
        "price": 8500000,
        "features": [
            "Floor-to-ceiling windows",
            "Private bathroom",
            "Kitchenette",
            "Conference room access",
            "Premium finishes",
            "Smart climate control"
        ],
        "available": True,
        "imageUrl": "/luxury-office-interior-with-city-view.jpg",
        "description": "Luxurious executive office suite with panoramic city views, perfect for C-suite executives and senior management teams.",
        "createdAt": datetime.utcnow().isoformat()
    },
    {
        "name": "Premium Retail Space",
        "type": "mall",
        "floor": 2,
        "size": 180,
        "price": 6200000,
        "features": [
            "High foot traffic location",
            "Large display windows",
            "Storage area",
            "Loading dock access",
            "Modern lighting",
            "Security system"
        ],
        "available": True,
        "imageUrl": "/luxury-retail-mall-interior.jpg",
        "description": "Prime retail space in the main shopping corridor, ideal for flagship stores and premium brands.",
        "createdAt": datetime.utcnow().isoformat()
    },
    {
        "name": "Corporate Office Floor",
        "type": "office",
        "floor": 12,
        "size": 500,
        "price": 15000000,
        "features": [
            "Open plan layout",
            "Multiple meeting rooms",
            "Breakout areas",
            "Dedicated server room",
            "Pantry facilities",
            "Fiber optic connectivity"
        ],
        "available": True,
        "imageUrl": "/modern-office-space-with-city-view.jpg",
        "description": "Entire floor suitable for growing companies, with flexible layout options and modern amenities.",
        "createdAt": datetime.utcnow().isoformat()
    },
    {
        "name": "Luxury Event Hall",
        "type": "event-hall",
        "floor": 20,
        "size": 400,
        "price": 12000000,
        "features": [
            "Capacity for 300 guests",
            "State-of-the-art AV system",
            "Catering kitchen",
            "VIP lounge",
            "Rooftop terrace access",
            "Professional lighting"
        ],
        "available": True,
        "imageUrl": "/luxury-conference-room-modern-design.jpg",
        "description": "Stunning event space with breathtaking views, perfect for corporate events, weddings, and galas.",
        "createdAt": datetime.utcnow().isoformat()
    }
]

# Timeline Events
timeline_data = [
    {
        "title": "Project Conception & Design",
        "description": "Initial concept development, architectural design, and feasibility studies completed with international partners.",
        "date": "2023-01-15",
        "status": "completed",
        "imageUrl": "/modern-architectural-blueprint-and-building.jpg"
    },
    {
        "title": "Regulatory Approvals",
        "description": "All necessary permits, environmental clearances, and government approvals secured.",
        "date": "2023-07-20",
        "status": "completed",
        "imageUrl": None
    },
    {
        "title": "Site Preparation",
        "description": "Land clearing, soil testing, and site preparation completed ahead of schedule.",
        "date": "2023-10-10",
        "status": "completed",
        "imageUrl": None
    },
    {
        "title": "Foundation & Groundbreaking",
        "description": "Official groundbreaking ceremony and foundation work commenced with advanced engineering.",
        "date": "2024-01-05",
        "status": "completed",
        "imageUrl": "/construction-foundation.png"
    },
    {
        "title": "Structural Framework",
        "description": "Core structure and steel framework construction currently underway with 40% completion.",
        "date": "2024-06-01",
        "status": "in-progress",
        "imageUrl": None
    },
    {
        "title": "Facade & Exterior",
        "description": "Installation of premium glass facade and exterior finishing with sustainable materials.",
        "date": "2025-03-01",
        "status": "upcoming",
        "imageUrl": None
    },
    {
        "title": "Interior Build-Out",
        "description": "Interior construction, MEP systems, and luxury finishes installation.",
        "date": "2025-10-01",
        "status": "upcoming",
        "imageUrl": None
    },
    {
        "title": "Final Inspections & Handover",
        "description": "Final inspections, certifications, and handover to tenants.",
        "date": "2026-07-01",
        "status": "upcoming",
        "imageUrl": None
    },
    {
        "title": "Grand Opening",
        "description": "Official grand opening ceremony and commencement of operations.",
        "date": "2026-10-01",
        "status": "upcoming",
        "imageUrl": None
    }
]

# Admin User
admin_user = {
    "email": "admin@fombinatower.com",
    "password": "admin123",  # In production, use bcrypt hashing
    "role": "admin",
    "createdAt": datetime.utcnow().isoformat()
}

def seed_database():
    print("Seeding database...")
    
    # Clear existing data
    db.spaces.delete_many({})
    db.timeline.delete_many({})
    db.users.delete_many({})
    
    # Insert spaces
    result = db.spaces.insert_many(spaces_data)
    print(f"Inserted {len(result.inserted_ids)} spaces")
    
    # Insert timeline
    result = db.timeline.insert_many(timeline_data)
    print(f"Inserted {len(result.inserted_ids)} timeline events")
    
    # Insert admin user
    db.users.insert_one(admin_user)
    print("Inserted admin user")
    
    print("Database seeded successfully!")
    print("\nAdmin credentials:")
    print("Email: admin@fombinatower.com")
    print("Password: admin123")

if __name__ == "__main__":
    seed_database()
