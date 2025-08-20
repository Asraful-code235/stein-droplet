// app/api/send-messages/route.ts

import { NextRequest, NextResponse } from "next/server";
const nodemailer: any = require("nodemailer");

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json(); // <- Important: extract `data`

    const {
      name = "No name",
      email = "No email",
      phone = "No phone",
      short_message = "No short Message",
      message = "No message",
      category = "No Category",
    } = data || {};
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email, // or any recipient email
      subject: `New Contact Message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
                <p><strong>Email:</strong> ${phone}</p>
                  <p><strong>Email:</strong> ${category}</p>

                                <p><strong>Email:</strong> ${short_message}</p>


        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: { message: error.message || "Something went wrong" } },
      { status: 500 }
    );
  }
}
