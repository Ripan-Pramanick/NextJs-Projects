import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // 1. Extract all data received from the frontend (Added planType)
    const body = await req.json();
    const { fullName, email, company, companySize, inquiryType, planType, message } = body;

    // 2. Setup Nodemailer transporter for Gmail
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // FIXED: Must be the Google SMTP server, not an email address
      port: 465,
      secure: true, // true for port 465
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 3. Create the email structure (with HTML styling)
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'ripan_pramanick@hotmail.com', // Destination email address
      replyTo: email, // Replies will go directly to the sender
      subject: `Minervasutra Contact: ${inquiryType} from ${fullName}`, // Dynamic subject line including Inquiry Type
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #c026d3; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
            
            <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
            ${planType ? `<p><strong>Selected Plan:</strong> ${planType}</p>` : ''}
            <p><strong>Full Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company ? company : 'N/A'}</p>
            <p><strong>Company Size:</strong> ${companySize}</p>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-left: 4px solid #c026d3; border-radius: 4px;">
                <h3 style="margin-top: 0; color: #4b5563;">Message:</h3>
                <p style="white-space: pre-wrap; margin-bottom: 0;">${message}</p>
            </div>
            
            <p style="font-size: 12px; color: #9ca3af; margin-top: 30px; text-align: center;">
                This email was sent from the Minervasutra website contact form.
            </p>
        </div>
      `
    };

    // 4. Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
    
  } catch (error) {
    console.error("Email send error:", error);
    // Send the actual error message to the frontend for better debugging
    return NextResponse.json({ success: false, error: error.message || "Failed to send email." }, { status: 500 });
  }
}