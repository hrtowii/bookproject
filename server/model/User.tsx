// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import {bookListSchema} from './BookList.js';

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bookLists: [bookListSchema]
});

const User = mongoose.model('User', userSchema);

export default User
