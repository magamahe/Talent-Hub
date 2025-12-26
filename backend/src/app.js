import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

export default app;
