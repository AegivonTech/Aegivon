import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import prisma from '../lib/prisma';

const router = Router();

// Setup multer for file uploads (use /tmp on Vercel, else local uploads folder)
const uploadDir = process.env.VERCEL ? '/tmp/uploads' : path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('resume'), async (req: Request, res: Response) => {
  try {
    const {
      roleId, name, email, phone, college, degree, graduationYear,
      skills, portfolioUrl, githubUrl, linkedinUrl, answers
    } = req.body;

    let resumeUrl = null;
    if (req.file) {
      // In production, this should upload to S3.
      // Now we just map it to a backend static route.
      resumeUrl = `/uploads/${req.file.filename}`;
    }

    let answersJson = null;
    if (answers) {
      try {
        answersJson = JSON.parse(answers);
      } catch (e) {
        answersJson = { "Why Aegivon": answers };
      }
    }

    const application = await prisma.application.create({
      data: {
        roleId,
        name,
        email,
        phone: phone || "N/A",
        college: college || "N/A",
        degree: degree || "N/A",
        graduationYear: graduationYear || "N/A",
        skills: skills || "N/A",
        portfolioUrl,
        githubUrl,
        linkedinUrl,
        resumeUrl,
        answers: answersJson,
      },
    });

    res.status(201).json({ success: true, applicationId: application.id });
  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
