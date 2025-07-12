# Contact Form Setup - Atlas Partners (Vercel)

## Overview
The contact form on the website is configured to send emails to `contacto@atlaspartners.cl` when visitors submit the form. This is implemented using Vercel serverless functions.

## How It Works

### 1. Form Configuration
- The form uses a React component with client-side validation
- Form data is sent to a Vercel serverless function (`/api/contact`)
- The serverless function processes the data and sends the email
- Form submission redirects to a success page

### 2. Email Delivery
When a form is submitted:
1. Form data is validated on the client side
2. Data is sent to the Vercel API endpoint (`/api/contact`)
3. Serverless function processes the data and sends email to `contacto@atlaspartners.cl`
4. User is redirected to `/success.html`

## Vercel Configuration Required

### 1. Email Service Integration
The current implementation includes a placeholder for email sending. You need to integrate with an email service:

**Option A: SendGrid (Recommended)**
1. Sign up for SendGrid (free tier available)
2. Install SendGrid: `npm install @sendgrid/mail`
3. Add your SendGrid API key to Vercel environment variables
4. Uncomment and configure the SendGrid code in `api/contact.js`

**Option B: Resend**
1. Sign up for Resend (free tier available)
2. Install Resend: `npm install resend`
3. Add your Resend API key to Vercel environment variables
4. Replace the email sending code in `api/contact.js`

**Option C: Nodemailer with Gmail**
1. Install nodemailer: `npm install nodemailer`
2. Configure Gmail app password
3. Add credentials to Vercel environment variables
4. Implement nodemailer in `api/contact.js`

### 2. Environment Variables Setup
In your Vercel dashboard:
1. Go to your project settings
2. Navigate to Environment Variables
3. Add the following variables:
   - `SENDGRID_API_KEY` (if using SendGrid)
   - `RESEND_API_KEY` (if using Resend)
   - `GMAIL_USER` and `GMAIL_PASS` (if using Gmail)

### 3. Email Template
The current email template includes:
```
Nueva solicitud de contacto recibida desde Atlas Partners:

📋 INFORMACIÓN DEL CONTACTO:
• Nombre: [nombre]
• Email: [email]
• Teléfono: [telefono]

🏢 INFORMACIÓN DE LA EMPRESA:
• Nombre de la empresa: [empresa]
• Sector: [sector]
• Número de empleados: [empleados]
• Ventas anuales: [ventas]
• Timing de venta: [timing]

📝 DESCRIPCIÓN ADICIONAL:
[descripcion]

📅 Fecha de envío: [timestamp]
🌐 Enviado desde: [website]
```

## Files Modified

1. **`src/pages/Index.tsx`**
   - Updated form submission handler to use Vercel API
   - Removed Netlify-specific attributes
   - Added error handling for API calls

2. **`api/contact.js`** (NEW)
   - Vercel serverless function to handle form submissions
   - Email content formatting
   - Placeholder for email service integration

3. **`public/success.html`**
   - Success page shown after form submission
   - Matches the site's design and branding

4. **`vercel.json`**
   - Already configured for Vercel deployment
   - Includes proper routing for SPA

## Testing

### Local Development
1. Run `npm run dev`
2. Fill out the contact form
3. Submit the form
4. Check the console for the email content (currently logged)
5. You should be redirected to the success page

### Production Testing
1. Deploy to Vercel
2. Configure email service (see above)
3. Submit a test form
4. Check that email is received at `contacto@atlaspartners.cl`

## Email Service Integration Examples

### SendGrid Integration
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'contacto@atlaspartners.cl',
  from: 'noreply@atlaspartners.cl', // Must be verified in SendGrid
  subject: 'Nueva solicitud de contacto - Atlas Partners',
  text: emailContent,
  html: emailContent.replace(/\n/g, '<br>')
};

await sgMail.send(msg);
```

### Resend Integration
```javascript
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'noreply@atlaspartners.cl',
  to: 'contacto@atlaspartners.cl',
  subject: 'Nueva solicitud de contacto - Atlas Partners',
  html: emailContent.replace(/\n/g, '<br>')
});
```

## Troubleshooting

### Form Not Sending Emails
1. Check Vercel function logs in the dashboard
2. Verify email service API key is set correctly
3. Check spam folder for test emails
4. Ensure the API endpoint is accessible

### API Function Not Working
1. Check Vercel deployment logs
2. Verify the function is in the correct location (`api/contact.js`)
3. Test the API endpoint directly with a tool like Postman

### Success Page Not Loading
1. Check that `public/success.html` exists
2. Verify the redirect is working correctly
3. Clear browser cache and try again

## Security Considerations

1. **Email Validation**: Client-side validation prevents invalid emails
2. **API Rate Limiting**: Vercel provides built-in rate limiting
3. **Environment Variables**: Sensitive data is stored securely
4. **Data Privacy**: Form data is only sent to the specified email address

## Customization

### Adding New Fields
1. Add field to the form in `src/pages/Index.tsx`
2. Update the API function in `api/contact.js`
3. Update validation logic if needed
4. Update email template in the API function

### Changing Email Address
1. Update the email address in `api/contact.js`
2. Update footer contact information if needed

### Customizing Success Page
Edit `public/success.html` to match your branding and messaging needs.

## Next Steps

1. **Choose an email service** (SendGrid, Resend, or Gmail)
2. **Set up the email service** and get API credentials
3. **Add environment variables** to Vercel
4. **Update the API function** with your chosen email service
5. **Test the form** in production 