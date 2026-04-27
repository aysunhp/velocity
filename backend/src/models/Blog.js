'use strict';

const { Schema, model } = require('mongoose');

const BlogSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    cover: { type: String, required: true },
    author: { type: String, default: 'Velocity Editorial' },
    tags: { type: [String], default: [] },
    publishedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

module.exports = model('Blog', BlogSchema);
