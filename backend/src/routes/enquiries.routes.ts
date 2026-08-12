import { Router, Request, Response } from 'express';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import prisma from '../lib/prisma';

const router = Router();

const enquirySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  organization: z.string().optional(),
  type: z.enum(['GENERAL', 'PRODUCT_RAKSHAK', 'PARTNERSHIP', 'INVESTMENT_SUPPORT', 'MEDIA']),
  subject: z.string().min(2).max(200).optional().default('New Enquiry'),
  message: z.string().min(10).max(2000),
});

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const data = enquirySchema.parse({
      ...req.body,
      type: req.body.type ? req.body.type.toUpperCase().replace(/\//g, '').replace(/\s+/g, '_') : 'GENERAL'
    });

    const enquiry = await prisma.enquiry.create({
      data: {
        name: data.name,
        email: data.email,
        organization: data.organization,
        type: data.type as any,
        subject: data.subject,
        message: data.message,
      },
    });

    // Send email notification if SMTP is configured
    if (process.env.SMTP_USER && process.env.SMTP_PASS && process.env.COMPANY_EMAIL) {
      const mailOptions = {
        from: `"${data.name}" <${process.env.SMTP_USER}>`,
        replyTo: data.email,
        to: process.env.COMPANY_EMAIL,
        subject: `New Enquiry [${data.type}]: ${data.subject}`,
        html: `
          <h3>New Enquiry Received</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Organization:</strong> ${data.organization || 'N/A'}</p>
          <p><strong>Type:</strong> ${data.type}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <h4>Message:</h4>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        `,
      };

      transporter.sendMail(mailOptions).catch(err => {
        console.error('Failed to send email notification:', err);
      });
    }

    res.status(201).json({ success: true, enquiryId: enquiry.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Enquiry submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
