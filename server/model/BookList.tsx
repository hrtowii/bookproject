import mongoose from 'mongoose';
const BookSchema = new mongoose.Schema({
    // id: { type: String, required: false },
    name: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    notes: { type: String, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: false },
});

export const BookListSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

export const book = mongoose.model('Book', BookSchema);
export const BookList = mongoose.model('BookList', BookListSchema);