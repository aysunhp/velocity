'use strict';

const mongoose = require('mongoose');
const { env } = require('./env');

async function connectDataSource() {
  if (env.DATA_SOURCE === 'mongo') {
    mongoose.set('strictQuery', true);
    await mongoose.connect(env.MONGO_URI);
    // eslint-disable-next-line no-console
    console.log('  ✅ MongoDB connected');
    return;
  }
  // mock: nothing to connect
  // eslint-disable-next-line no-console
  console.log('  ✅ Mock data source active');
}

async function disconnectDataSource() {
  if (env.DATA_SOURCE === 'mongo') {
    await mongoose.disconnect();
  }
}

module.exports = { connectDataSource, disconnectDataSource };
