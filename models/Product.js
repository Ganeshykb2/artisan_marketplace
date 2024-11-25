import mongoose from 'mongoose';
import { v4 as uuidv4 } from "uuid";


// Product schema
const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true,
    required: true,
    default:uuidv4
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0, 
  },
  artist: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
