import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ErrorWithResponse {
  response?: { data?: unknown };
  code?: string | number;
}

export async function POST(req: Request) {
  const { name, email, phone, message } = (await req.json()) as ContactFormData;

  try {
    // 1. Guardar en Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_KEY as string),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "'Hoja 1'!A:D",
      valueInputOption: "RAW",
      requestBody: {
        values: [[name, email, phone, message]],
      },
    });

    // 2. Configuración para Gmail con OAuth2
    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    const accessToken = await new Promise<string>((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) return reject(err);
        if (!token) return reject(new Error("No access token returned"));
        resolve(token);
      });
    });

    // 3. Configurar transporte Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken,
      },
    });

    await transporter.sendMail({
      from: `"Landing Mecánico" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: "Nuevo contacto",
      text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nMensaje: ${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    let errorMessage = "Error interno del servidor";
    let errorData: unknown = null;
    let errorCode: string | number | undefined;
    let stackTrace: string | undefined;

    if (err instanceof Error) {
      errorMessage = err.message;
      stackTrace = err.stack;
    }

    // Verificar si err tiene las propiedades esperadas
    if (typeof err === "object" && err !== null) {
      const e = err as ErrorWithResponse;

      if (e.response?.data) {
        errorData = e.response.data;
      }

      if (e.code) {
        errorCode = e.code;
      }
    }

    console.error("Mensaje de error:", errorMessage);
    if (errorData) console.error("Respuesta del error:", errorData);
    if (errorCode) console.error("Código de error:", errorCode);
    if (stackTrace) console.error("Stack trace:", stackTrace);

    return NextResponse.json(
      {
        ok: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
