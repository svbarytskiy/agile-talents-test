import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import profilesRoutes from '@/routes/profiles.routes';

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/api/profiles', profilesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
