'use strict';

/**
 * Seed runner. With DATA_SOURCE=mongo, wipes and re-populates collections
 * from `./data.js`. With DATA_SOURCE=mock it's a no-op (mock auto-seeds at boot).
 *
 *   npm run seed:mongo
 */
require('dotenv').config();

const mongoose = require('mongoose');
const { env } = require('../config/env');
const data = require('./data');
const models = require('../models');

async function run() {
  if (env.DATA_SOURCE !== 'mongo') {
    // eslint-disable-next-line no-console
    console.log('DATA_SOURCE is not "mongo" — nothing to seed (mock auto-seeds).');
    process.exit(0);
  }

  await mongoose.connect(env.MONGO_URI);
  // eslint-disable-next-line no-console
  console.log('Connected to', env.MONGO_URI);

  const ops = [
    [models.Category, data.categories],
    [models.Car, data.cars],
    [models.Review, data.reviews],
    [models.Blog, data.blogs],
    [models.FAQ, data.faqs],
  ];

  const idMap = new Map();

  for (const [Model, items] of ops) {
    await Model.deleteMany({});
    if (items.length) {
      // Strip stable string _id values so Mongo can assign ObjectIds, but map references
      const cleaned = items.map(({ _id, ...rest }) => {
        const obj = { ...rest };
        if (obj.category && idMap.has(obj.category)) {
          obj.category = idMap.get(obj.category);
        }
        if (obj.car && idMap.has(obj.car)) {
          obj.car = idMap.get(obj.car);
        }
        return obj;
      });
      const inserted = await Model.insertMany(cleaned);
      
      items.forEach((item, idx) => {
        if (item._id) idMap.set(item._id, inserted[idx]._id);
      });
    }
    // eslint-disable-next-line no-console
    console.log(`  ✅ ${Model.modelName}: ${items.length}`);
  }

  await mongoose.disconnect();
  // eslint-disable-next-line no-console
  console.log('\nSeed complete.');
  process.exit(0);
}

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Seed failed:', err);
  process.exit(1);
});
