import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  services?: string[]; // Opcional, si se usa el formulario con selección de servicios
}

// Plantillas HTML para los correos
// Plantillas HTML con diseño mejorado
const adminEmailTemplate = (data: ContactFormData) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f7fa;
            margin: 0;
            padding: 0;
        }
        .container { 
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .header { 
            background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
            padding: 25px;
            text-align: center;
            color: white;
        }
        .content { 
            padding: 25px;
        }
        .data-item {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e5e7eb;
        }
        .data-item:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: 600;
            color: #1e3a8a;
            display: block;
            margin-bottom: 5px;
        }
        ul { padding-left: 20px; }
        .footer { 
            background-color: #f9fafb;
            padding: 15px;
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #2563eb;
            color: white !important;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>📋 Nueva solicitud de cotización</h2>
        </div>
        <div class="content">
            <div class="data-item">
                <span class="label">Nombre</span>
                <span>${data.name}</span>
            </div>
            <div class="data-item">
                <span class="label">Email</span>
                <span>${data.email}</span>
            </div>
            <div class="data-item">
                <span class="label">Teléfono</span>
                <span>${data.phone}</span>
            </div>
            <div class="data-item">
                <span class="label">Servicios Solicitados</span>
                ${data.services?.length 
                    ? `<ul>${data.services.map(s => `<li>${s}</li>`).join("")}</ul>`
                    : "<p>No especificado</p>"}
            </div>
            <div class="data-item">
                <span class="label">Mensaje</span>
                <p>${data.message}</p>
            </div>
            
            <a href="mailto:${data.email}?subject=Respuesta a tu cotización" class="button">
                Responder al cliente
            </a>
        </div>
        <div class="footer">
            <p>Taller Mecánico ProAuto • ${new Date().getFullYear()}</p>
        </div>
    </div>
</body>
</html>
`;

const clientEmailTemplate = (data: ContactFormData) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f7fa;
            margin: 0;
            padding: 0;
        }
        .container { 
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .header { 
            background: linear-gradient(135deg, #059669 0%, #10b981 100%);
            padding: 25px;
            text-align: center;
            color: white;
        }
        .content { 
            padding: 25px;
        }
        .highlight {
            background-color: #ecfdf5;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #10b981;
        }
        .footer { 
            background-color: #f9fafb;
            padding: 15px;
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
        }
        .contact-info {
            margin-top: 25px;
            background-color: #f0fdf4;
            padding: 15px;
            border-radius: 6px;
        }
        ul { padding-left: 20px; }
        .whatsapp-btn {
            display: inline-block;
            margin-top: 15px;
            padding: 10px 20px;
            background-color: #25D366;
            color: white !important;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>¡Gracias por contactar a ProAuto!</h2>
        </div>
        <div class="content">
            <p>Hola <strong>${data.name}</strong>,</p>
            
            <div class="highlight">
                <p>Hemos recibido tu solicitud y nuestro equipo se pondrá en contacto contigo en las próximas <strong>24 horas</strong>.</p>
            </div>
            
            <h3 style="color: #059669;">Resumen de tu solicitud:</h3>
            
            <div class="contact-info">
                <p><strong style="color: #059669;">📧 Email:</strong> ${data.email}</p>
                <p><strong style="color: #059669;">📱 Teléfono:</strong> ${data.phone}</p>
                <p><strong style="color: #059669;">🔧 Servicios:</strong></p>
                ${data.services?.length 
                    ? `<ul>${data.services.map(s => `<li>${s}</li>`).join("")}</ul>`
                    : "<p>No especificado</p>"}
                <p><strong style="color: #059669;">✉️ Mensaje:</strong></p>
                <p>${data.message}</p>
            </div>
            
            <p>Si necesitas asistencia inmediata, contáctanos directamente:</p>
            
            <a href="https://wa.me/56912345678?text=Hola,%20vi%20su%20landing%20y%20quiero%20más%20información" class="whatsapp-btn">
                💬 WhatsApp
            </a>
        </div>
        <div class="footer">
            <p>ProAuto Mecánica Especializada • ${new Date().getFullYear()}</p>
            <p style="font-size: 11px; margin-top: 5px;">Av. Principal 1234, Santiago - Horario: L-V 9:00 a 18:00</p>
        </div>
    </div>
</body>
</html>
`;


export async function POST(req: Request) {
  const { name, email, phone, message, services = [] } = (await req.json()) as ContactFormData;

  try {
    // 1. Guardar en Google Sheets (tu código existente)
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_KEY as string),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "'Hoja 1'!A:E",
      valueInputOption: "RAW",
      requestBody: {
        values: [[name, email, phone, message, services.join(", ")]],
      },
    });


    // 2. Configurar transporte de correo (mejorado)
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

    // 3. Enviar correo al administrador
    await transporter.sendMail({
      from: `"Landing Mecánico" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // o tu email de administrador
      subject: `Nueva solicitud de cotización de ${name}`,
      html: adminEmailTemplate({ name, email, phone, message }),
      text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nMensaje: ${message}`,
    });

    // 4. Enviar correo de confirmación al cliente
    await transporter.sendMail({
      from: `"Taller Mecánico XYZ" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Hemos recibido tu solicitud",
      html: clientEmailTemplate({ name, email, phone, message }),
      text: `Hola ${name},\n\nHemos recibido tu solicitud y pronto nos pondremos en contacto contigo.\n\nDetalles:\nEmail: ${email}\nTeléfono: ${phone}\nMensaje: ${message}\n\nAtentamente,\nEl equipo de Taller Mecánico XYZ`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error en el servidor:", err);
    return NextResponse.json(
      { ok: false, error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}