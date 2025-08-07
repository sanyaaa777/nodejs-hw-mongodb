import pinoHttp from 'pino-http';

const logger = pinoHttp(
  process.env.NODE_ENV === 'development'
    ? {
        transport: {
          target: 'pino-pretty',
        },
      }
    : {}    
);

export default logger;
