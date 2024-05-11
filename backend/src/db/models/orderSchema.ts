import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    unique: true,
    min: 1,
    max: 100,
    required: false,
  },
  drinks: [
    {
      drink: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'drinks',
        required: true,
      },
      variant: {
        type: String,
        enum: ['hot', 'cold'],
        required: true,
      },
      size: {
        type: String,
        enum: ['regular', 'large'],
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ['created', 'processing', 'ready', 'delivered'],
    required: false,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default orderSchema;
