'use strict';

const { Schema, model } = require('mongoose');

const FAQSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
    category: { type: String, default: 'general' },
  },
  { timestamps: true }
);

module.exports = model('FAQ', FAQSchema);
