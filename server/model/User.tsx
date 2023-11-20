// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import {BookListSchema} from './BookList.js';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    BookLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BookList' }]
});

const User = mongoose.model('User', UserSchema);

export default User
