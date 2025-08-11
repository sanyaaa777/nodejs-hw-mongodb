import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
import { logger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export function setupServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(logger);
  app.use(cors());
  app.use(cookieParser());

  app.use((req, _res, next) => {
    console.log('> ', req.method, req.originalUrl);
    next();
  });


  app.use('/auth', authRouter);

  app.get('/reset-password', (req, res) => {
    const { token = '' } = req.query;

    if (process.env.NODE_ENV !== 'production') {
      return res.json({
        status: 200,
        token,
      });
    }

    return res.status(405).json({
      status: 405,
      message: 'Method Not Allowed',
      data: {
        message: 'Use POST request to /auth/reset-pwd',
      },
    });
  });


  app.use('/contacts', contactsRouter);


  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = Number(env('PORT', 3000));
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
