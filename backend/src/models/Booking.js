'use strict';

const { Schema, model } = require('mongoose');

const BookingSchema = new Schema(
  {
    carId: { type: Schema.Types.Mixed, required: true, index: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    pickupLocation: { type: String, required: true },
    returnLocation: { type: String, required: true },
    pickupAt: { type: Date, required: true },
    returnAt: { type: Date, required: true },
    message: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
      index: true,
    },
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = model('Booking', BookingSchema);
