import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
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
  drinkList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'drinks',
      required: false,
    },
  ],
});

export default categorySchema;
