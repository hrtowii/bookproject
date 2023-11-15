import mongoose from 'mongoose';
const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    notes: { type: String, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    is_delete: { type: Boolean, default: false },
});

export const bookListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    books: [bookSchema]
});

export const book = mongoose.model('Book', bookSchema);
export const bookList = mongoose.model('BookList', bookListSchema);