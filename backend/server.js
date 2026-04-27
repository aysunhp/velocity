'use strict';

require('dotenv').config();

const app = require('./src/app');
const { env } = require('./src/config/env');
const { connectDataSource } = require('./src/config/db');

async function bootstrap() {
  await connectDataSource();

  const server = app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(
      `\n  🚗 Velocity API ready on http://localhost:${env.PORT}` +
        `\n     env: ${env.NODE_ENV}` +
        `\n     data source: ${env.DATA_SOURCE}\n`
    );
  });

  const shutdown = (signal) => {
    // eslint-disable-next-line no-console
    console.log(`\n${signal} received, shutting down...`);
    server.close(() => process.exit(0));
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server:', err);
  process.exit(1);
});
