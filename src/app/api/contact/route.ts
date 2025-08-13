import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json();

  try {
    // 1. Guardar en Google Sheets
    console.log("Iniciando proceso...");
    console.log("Obteniendo credenciales de Sheets...");
    
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_KEY as string),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    console.log("Autenticación con Sheets exitosa");
    
    const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "'Hoja 1'!A:D",
      valueInputOption: "RAW",
      requestBody: { 
        values: [[name, email, phone, message]]
      },
    });

    console.log("Datos guardados en Google Sheets correctamente");
    
    // 2. Configuración para Gmail
    console.log("\n=== INICIANDO CONFIGURACIÓN GMAIL ===");
    console.log("Client ID:", process.env.GMAIL_CLIENT_ID ? "Presente" : "FALTANTE");
    console.log("Client Secret:", process.env.GMAIL_CLIENT_SECRET ? "Presente" : "FALTANTE");
    console.log("Refresh Token:", process.env.GMAIL_REFRESH_TOKEN ? `Presente (${process.env.GMAIL_REFRESH_TOKEN.substring(0, 10)}...)` : "FALTANTE");
    console.log("Gmail User:", process.env.GMAIL_USER || "FALTANTE");

    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN
    });

    console.log("\nIntentando obtener access token...");
    const accessToken = await new Promise<string>((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.error("ERROR al obtener access token:", err.message);
          if (err.response) {
            console.error("Detalles del error:", err.response.data);
          }
          reject(err);
          return;
        }
        if (!token) {
          console.error("No se recibió token");
          reject(new Error("No access token returned"));
          return;
        }
        console.log("Access token obtenido con éxito");
        resolve(token);
      });
    });

    console.log("Access token generado:", accessToken.substring(0, 20) + "...");
    console.log("Longitud del token:", accessToken.length);
    console.log("Refresh token usado:", process.env.GMAIL_REFRESH_TOKEN?.substring(0, 10) + "...");

    // 3. Configurar transporte de Nodemailer
    console.log("\nConfigurando transporte de Nodemailer...");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken
      }
    });

    console.log("Enviando correo...");
    await transporter.sendMail({
      from: `"Landing Mecánico" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: "Nuevo contacto",
      text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nMensaje: ${message}`,
    });

    console.log("Correo enviado con éxito!");
    return NextResponse.json({ ok: true });
    
  } catch (err: unknown) { // Cambia any por unknown
  let errorMessage = "Error interno del servidor";
  let errorData: any = null;
  let errorCode: string | number | undefined;
  let stackTrace: string | undefined;

  if (err instanceof Error) {
    errorMessage = err.message;
    stackTrace = err.stack;
  }

  // Verificaciones adicionales para propiedades específicas
  if (typeof err === 'object' && err !== null) {
    if ('response' in err) {
      const response = (err as { response?: any }).response;
      if (response?.data) {
        errorData = response.data;
      }
    }

    if ('code' in err) {
      errorCode = (err as { code?: string | number }).code;
    }
  }

  console.error("\n!!! ERROR EN EL PROCESO !!!");
  console.error("Mensaje de error:", errorMessage);

  if (errorData) {
    console.error("Respuesta del error:", errorData);
  }

  if (errorCode) {
    console.error("Código de error:", errorCode);
  }

  if (stackTrace) {
    console.error("Stack trace:", stackTrace);
  }

  return NextResponse.json({
    ok: false,
    error: errorMessage
  }, { status: 500 });
}
}