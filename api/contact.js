// Vercel serverless function to handle contact form submissions
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      nombre,
      email,
      telefono,
      empresa,
      sector,
      empleados,
      ventas,
      timing,
      descripcion
    } = req.body;

    // Validate required fields
    if (!nombre || !email || !telefono || !empresa || !sector || !empleados || !ventas || !timing) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Email content
    const emailContent = `
Nueva solicitud de contacto recibida desde Atlas Partners:

📋 INFORMACIÓN DEL CONTACTO:
• Nombre: ${nombre}
• Email: ${email}
• Teléfono: ${telefono}

🏢 INFORMACIÓN DE LA EMPRESA:
• Nombre de la empresa: ${empresa}
• Sector: ${sector}
• Número de empleados: ${empleados}
• Ventas anuales: ${ventas}
• Timing de venta: ${timing}

📝 DESCRIPCIÓN ADICIONAL:
${descripcion || 'No proporcionada'}

📅 Fecha de envío: ${new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })}
🌐 Enviado desde: ${req.headers.origin || 'Atlas Partners Website'}
    `;

    // Send email using SendGrid
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
      to: 'contacto@atlaspartners.cl',
      from: 'noreply@atlaspartners.cl', // You'll need to verify this domain in SendGrid
      subject: 'Nueva solicitud de contacto - Atlas Partners',
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>')
    };
    
    await sgMail.send(msg);
    
    res.status(200).json({ 
      success: true, 
      message: 'Formulario enviado exitosamente' 
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al procesar el formulario' 
    });
  }
} 