require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.CLIENT_URL,
  process.env.CLIENT_URL?.replace(/\/$/, ""), // Remove trailing slash
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.some(o => origin.startsWith(o))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Health check route
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio server is running' });
});

// Route to handle contact form submissions
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check that email credentials are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('EMAIL_USER or EMAIL_PASS not set in .env');
    return res.status(500).json({ error: 'Server email not configured. Please contact the admin.' });
  }

  try {
    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Update this if using another provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Sends the email to yourself
      replyTo: email,
      subject: `New Portfolio Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

// Export the app for Vercel
module.exports = app;

// Only start the server if not running on Vercel
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('⚠️  WARNING: EMAIL_USER or EMAIL_PASS not set. Contact form emails will fail.');
    }
  });
}
