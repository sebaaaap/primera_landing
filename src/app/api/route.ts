import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  try {
    // 1. Guardar en Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_KEY as string),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Hoja1!A:C",
      valueInputOption: "RAW",
      requestBody: { values: [[name, email, message]] },
    });

    // 2. Enviar correo con Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Landing Mecánico" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: "Nuevo contacto",
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
