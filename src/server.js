import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import fs from 'node:fs';
import path from 'node:path';

import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
import { logger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export function setupServer() {
  const app = express();

  app.use((req, _res, next) => {
    if (req.originalUrl.startsWith('/contacts')) {
      console.log('> ', req.method, req.originalUrl);
      console.log('Content-Type:', req.headers['content-type']);
    }
    next();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(logger);
  app.use(cors());
  app.use(cookieParser());

  app.use((req, _res, next) => {
    console.log('> ', req.method, req.originalUrl);
    next();
  });

  const swaggerJsonPath = path.join(process.cwd(), 'docs', 'swagger.json');
  if (fs.existsSync(swaggerJsonPath)) {
    const swaggerDocument = JSON.parse(
      fs.readFileSync(swaggerJsonPath, 'utf8'),
    );
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log('Swagger UI is available at /api-docs');
  } else {
    console.warn(
      'docs/swagger.json not found. Run `npm run build-docs` to generate it.',
    );
  }

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
      data: { message: 'Use POST request to /auth/reset-pwd' },
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
