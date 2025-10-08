import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

# SMTP Configuration
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
FROM_EMAIL = os.getenv("FROM_EMAIL", SMTP_USER)
FROM_NAME = os.getenv("FROM_NAME", "Fombina Tower")


async def send_email(to_email: str, subject: str, html_content: str, text_content: str = None):
    """
    Send email via SMTP
    
    Args:
        to_email: Recipient email address
        subject: Email subject
        html_content: HTML email content
        text_content: Plain text fallback (optional)
    
    Returns:
        dict: Send result
    """
    try:
        # Create message
        message = MIMEMultipart("alternative")
        message["Subject"] = subject
        message["From"] = f"{FROM_NAME} <{FROM_EMAIL}>"
        message["To"] = to_email
        
        # Add text and HTML parts
        if text_content:
            part1 = MIMEText(text_content, "plain")
            message.attach(part1)
        
        part2 = MIMEText(html_content, "html")
        message.attach(part2)
        
        # Send email
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(message)
        
        return {"success": True, "message": "Email sent successfully"}
    except Exception as e:
        return {"success": False, "error": str(e)}


async def send_booking_confirmation(booking_data: dict):
    """Send booking confirmation email"""
    subject = f"Booking Confirmation - {booking_data['space_name']}"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: white; padding: 30px; text-align: center; }}
            .content {{ background: #f9f9f9; padding: 30px; }}
            .details {{ background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #d4a574; }}
            .footer {{ text-align: center; padding: 20px; color: #666; font-size: 12px; }}
            .button {{ display: inline-block; padding: 12px 30px; background: #d4a574; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Booking Confirmed!</h1>
                <p>Thank you for choosing Fombina Tower</p>
            </div>
            <div class="content">
                <p>Dear {booking_data['name']},</p>
                <p>Your booking has been confirmed. Here are your booking details:</p>
                
                <div class="details">
                    <h3>Booking Details</h3>
                    <p><strong>Space:</strong> {booking_data['space_name']}</p>
                    <p><strong>Booking ID:</strong> {booking_data['booking_id']}</p>
                    <p><strong>Amount:</strong> ₦{booking_data['amount']:,}</p>
                    <p><strong>Email:</strong> {booking_data['email']}</p>
                    <p><strong>Phone:</strong> {booking_data['phone']}</p>
                </div>
                
                <p>Our team will contact you within 24 hours to finalize the details.</p>
                
                <center>
                    <a href="https://fombinatower.com/booking/{booking_data['booking_id']}" class="button">View Booking</a>
                </center>
            </div>
            <div class="footer">
                <p>© 2025 Fombina Tower. All rights reserved.</p>
                <p>Central Business District, Abuja, Nigeria</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    return await send_email(booking_data['email'], subject, html_content)


async def send_contact_notification(contact_data: dict):
    """Send contact form notification to admin"""
    subject = f"New Contact Form Submission - {contact_data['name']}"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>New Contact Form Submission</h2>
            <div style="background: #f9f9f9; padding: 20px; margin: 20px 0;">
                <p><strong>Name:</strong> {contact_data['name']}</p>
                <p><strong>Email:</strong> {contact_data['email']}</p>
                <p><strong>Phone:</strong> {contact_data.get('phone', 'N/A')}</p>
                <p><strong>Subject:</strong> {contact_data.get('subject', 'N/A')}</p>
                <p><strong>Message:</strong></p>
                <p>{contact_data['message']}</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    admin_email = os.getenv("ADMIN_EMAIL", "admin@fombinatower.com")
    return await send_email(admin_email, subject, html_content)
