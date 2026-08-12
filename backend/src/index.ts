import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import path from 'path';

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGIN || 'http://localhost:3000').split(',');

// Global middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Serve uploaded resumes statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Rate limiting for public routes
export const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

// Import routes
import authRoutes from './routes/auth.routes';
import enquiriesRoutes from './routes/enquiries.routes';
import applicationsRoutes from './routes/applications.routes';
import jobRolesRoutes from './routes/jobRoles.routes';
import adminEnquiriesRoutes from './routes/admin/enquiries.routes';
import adminApplicationsRoutes from './routes/admin/applications.routes';
import adminDashboardRoutes from './routes/admin/dashboard.routes';
import { requireAdmin } from './middleware/auth.middleware';

// API Routes
app.get('/', (req, res) => {
  res.json({ status: 'Aegivon Backend is running', version: '1.0' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/enquiries', publicLimiter, enquiriesRoutes);
app.use('/api/v1/applications', publicLimiter, applicationsRoutes);
app.use('/api/v1/job-roles', publicLimiter, jobRolesRoutes);

// Admin API Routes (Protected)
app.use('/api/v1/admin/enquiries', requireAdmin, adminEnquiriesRoutes);
app.use('/api/v1/admin/applications', requireAdmin, adminApplicationsRoutes);
app.use('/api/v1/admin/dashboard', requireAdmin, adminDashboardRoutes);

// Add missing admin endpoints here as needed (products, team, media)

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({ error: 'GLOBAL_ERROR', details: err?.message || String(err) });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}

export default app;
