import express from 'express';
import contactsRouter from './routers/contacts.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use('/contacts', contactsRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
};
