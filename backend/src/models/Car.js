'use strict';

const { Schema, model } = require('mongoose');

const SpecsSchema = new Schema(
  {
    topSpeed: { type: Number, required: true },
    acceleration: { type: Number, required: true },
    power: { type: Number, required: true },
    seats: { type: Number, required: true },
    doors: { type: Number, required: true },
    transmission: { type: String, enum: ['automatic', 'manual'], required: true },
    fuelType: { type: String, enum: ['petrol', 'diesel', 'hybrid', 'electric'], required: true },
    engine: { type: String, required: true },
    year: { type: Number, required: true },
  },
  { _id: false }
);

const CarSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    brand: { type: String, required: true, index: true },
    model: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', index: true },
    categorySlug: { type: String, required: true, index: true },
    pricePerDay: { type: Number, required: true, min: 0, index: true },
    currency: { type: String, enum: ['USD', 'EUR', 'AZN'], default: 'USD' },
    images: { type: [String], default: [] },
    thumbnail: { type: String, required: true },
    specs: { type: SpecsSchema, required: true },
    features: { type: [String], default: [] },
    description: { type: String, default: '' },
    available: { type: Boolean, default: true, index: true },
    featured: { type: Boolean, default: false, index: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

CarSchema.index({ name: 'text', brand: 'text', model: 'text', description: 'text' });

module.exports = model('Car', CarSchema);
