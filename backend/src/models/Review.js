'use strict';

const { Schema, model } = require('mongoose');

const ReviewSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, default: '' },
    avatar: { type: String, default: '' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    featured: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

module.exports = model('Review', ReviewSchema);
