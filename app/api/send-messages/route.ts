// /app/api/send-messages/route.ts

import { NextRequest, NextResponse } from "next/server";
const nodemailer: any = require("nodemailer");

// Handle CORS Preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*", // Change to your domain in production
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json(); // Expecting { data: { name, email, message } }

    const {
      name = "No name",
      email = "No email",
      message = "No message",
      phone = "",
      category = "",
      short_message = "",
    } = data || {};

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Determine if this is a quote request or general message
    const isQuoteRequest = category || short_message;
    const subject = isQuoteRequest
      ? `New Quote Request from ${name}`
      : `New Contact Message from ${name}`;

    // Build email content based on type
    let emailContent = `
      <h2>${isQuoteRequest ? 'Quote Request' : 'Contact Message'}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      ${category ? `<p><strong>Category:</strong> ${category}</p>` : ''}
      ${short_message ? `<p><strong>Requirements:</strong> ${short_message}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.RECEIVER || process.env.GMAIL_USER, // Send to company email
      replyTo: email, // Allow replying to the customer
      subject: subject,
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Email sent successfully",
      }),
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Change to your domain in production
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("Error sending email:", error);

    return new NextResponse(
      JSON.stringify({
        error: { message: error.message || "Something went wrong" },
      }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*", // Change to your domain in production
          "Content-Type": "application/json",
        },
      }
    );
  }
}
