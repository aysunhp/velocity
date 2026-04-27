'use strict';

/**
 * Repository factory. Reads DATA_SOURCE once at boot and returns the
 * configured repository for each domain. Controllers import from here only.
 */
const { env } = require('../config/env');
const { MockRepository } = require('./MockRepository');
const { MongoRepository } = require('./MongoRepository');

const seedData = require('../seeders/data');
const models = require('../models');

const repos = (() => {
  if (env.DATA_SOURCE === 'mongo') {
    return {
      cars: new MongoRepository(models.Car),
      categories: new MongoRepository(models.Category),
      bookings: new MongoRepository(models.Booking),
      reviews: new MongoRepository(models.Review),
      blogs: new MongoRepository(models.Blog),
      faqs: new MongoRepository(models.FAQ),
    };
  }
  return {
    cars: new MockRepository('cars', seedData.cars),
    categories: new MockRepository('categories', seedData.categories),
    bookings: new MockRepository('bookings', seedData.bookings),
    reviews: new MockRepository('reviews', seedData.reviews),
    blogs: new MockRepository('blogs', seedData.blogs),
    faqs: new MockRepository('faqs', seedData.faqs),
  };
})();

module.exports = repos;
