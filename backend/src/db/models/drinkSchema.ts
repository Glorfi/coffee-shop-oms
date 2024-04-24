import { required } from 'joi';
import mongoose from 'mongoose';

const drinkSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  nameAM: {
    type: String,
    required: true,
  },
  descriptionRU: {
    type: String,
    required: false,
  },
  descriptionEN: {
    type: String,
    required: false,
  },
  descriptionAM: {
    type: String,
    required: false,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  variant: [
    {
      type: String,
      enum: ['hot', 'cold'],
      required: true,
    },
  ],
  size: [
    {
      name: {
        type: String,
        enum: ['regular', 'large'],
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default drinkSchema;
