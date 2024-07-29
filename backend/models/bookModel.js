import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  published: { type: Date, required: true },
  description: { type: String, required: true },
  image: {
    data: Buffer,
    contentType: String
   },
   
});

export const Book = mongoose.model('book', bookSchema);