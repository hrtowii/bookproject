import express from "express";
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {v4 as uuid} from 'uuid';
// import fs from 'fs';
// import multer from 'multer';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import { bookList, book } from './model/BookList.js';
import user from "./model/User.js";
// import path from "path";

// readup on: callback fns, asynchronous js (promises, async/await etc) because im bad at them
mongoose // start: mongod --dbpath ~/bookproject/bookdb/ --logpath ~/bookproject/bookdb/mongo.log --fork
  .connect("mongodb://localhost/bookdb") // create here https://www.prisma.io/dataguide/mongodb/setting-up-a-local-mongodb-database#setting-up-mongodb-on-macos
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

// var dir = './uploads';
// var upload = multer({
//   storage: multer.diskStorage({

//     destination: function (req, file, callback) {
//       if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir);
//       }
//       callback(null, './uploads');
//     },
//     filename: function (req, file, callback) { callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); }

//   }),

//   fileFilter: function (req, file, callback) {
//     var ext = path.extname(file.originalname)
//     if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
//       return callback(/*res.end('Only images are allowed')*/ null, false)
//     }
//     callback(null, true)
//   }
// });

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));

app.get("/api/v1/hello", (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json({ message: "Hello, world! this is a .json" });
  // res.send({ "message": "This is a .send" })
});


/* register api */
app.post("/api/v1/register", async (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {

      const data = await user.find({ username: req.body.username });

      const saltRounds = 10;

      if (data.length == 0) {

        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        let User = new user({
          id: uuid.v4(),
          username: req.body.username,
          password: hashedPassword
        });

        // console.log(User.username + " " + User.password)
        await User.save();
        res.status(200).json({
          message: 'Register Successfully.',
          status: true
        });
      } else {
        res.status(400).json({
          errorMessage: `Username ${req.body.username} already exists!`,
          status: false
        });
      }
    } else {
      res.status(400).json({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!' + e,
      status: false
    });
  }
});

/* login api */
app.post("/api/v1/login", async (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {
      const data = await user.find({ username: req.body.username });
      if (data.length > 0) {
        // console.log(data[0].password + " " + req.body.password) // hash the body password and compare to the already hashed password in the db. so hash the pw on registration
        if (bcrypt.compare(data[0].password, req.body.password)) {
          checkUserAndGenerateToken(data[0], req, res);
        } else {
          res.status(400).json({
            errorMessage: 'Username or password is incorrect!',
            status: false
          });
        }
      } else {
        res.status(400).json({
          errorMessage: 'Username doesn\'t exist',
          status: false
        });
      }
    } else {
      res.status(400).json({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong! ' + e,
      status: false
    });
  }

});

function checkUserAndGenerateToken(data, req, res) {
  jwt.sign({ user: data.username, id: data._id }, 'shhhhh11111', { expiresIn: '1d' }, (err, token) => {
    if (err) {
      res.status(400).json({
        status: false,
        errorMessage: err,
      });
    } else {
      res.status(200).json({
        message: 'logged in successfully.',
        token: token,
        status: true
      });
    }
  });
}

/* Api to add booklists. Which are just lists of books */
app.post("/api/v1/add-booklist", async (req, res) => {
  if (req.books) {
    let new_booklist = new bookList();
  }
})

/* Api to add book */
const bookfields = ["name", "description", "price", "notes", "author", "rating"];
app.post("/api/v1/add-book", async (req, res) => {
  try {
    if (req.body && bookfields.every(field => req.body[field])) {

      let new_book = new book();
      bookfields.forEach((field) => {
        new_book[field] = req.body[field];
      })
      // new_book.name = req.body.name;
      // new_book.author = req.body.author;
      // new_book.description = req.body.description;
      // new_book.price = req.body.price;
      // new_book.notes = req.body.notes;
      // new_book.rating = req.body.rating;
      try {
        await new_book.save();
        res.status(200).json({
          status: true,
          title: 'book added.',
          book: new_book
        });
      } catch (e) {
        res.status(400).json({
          errorMessage: 'Something went wrong!' + " " + e,
          status: false
        });
      }
    } else {
      res.status(400).json({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!' + " " + e,
      status: false
    });
  }
});

/* Api to update book */
app.post("/api/v1/update-book", async (req, res) => {
  try {
    if (req.body && bookfields.every(field => req.body[field])) {
      const updateBook = await book.findById(req.body.id)
      if (!updateBook) {
        res.status(400).json({
          errorMessage: 'No book found!',
          status: false
        });
      } else {
        bookfields.forEach((field) => {
          updateBook[field] = req.body[field] || updateBook[field];
        })
        // new_book.name = req.body.name || new_book.name;
        // new_book.author = req.body.author || new_book.author;
        // new_book.description = req.body.description || new_book.description;
        // new_book.price = req.body.price || new_book.price;
        // new_book.notes = req.body.notes || new_book.notes;
        // new_book.notes = req.body.rating || new_book.rating;

        try {
          await updateBook.save()
          res.status(200).json({
            status: true,
            title: 'book updated.'
          });
        } catch (e) {
          res.status(400).json({
            errorMessage: "error!" + " " + e,
            status: false
          });
        };
      }

    } else {
      res.status(400).json({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!' + " " + e,
      status: false
    });
  }
});

/* Api to delete book */
app.post("/api/v1/delete-book", (req, res) => {
  try {
    if (req.body && req.body.name) {
      book.deleteOne(req.body.name, (err, data) => {
        if (data.is_delete) {
          res.status(200).json({
            status: true,
            title: 'book deleted.'
          });
        } else {
          res.status(400).json({
            errorMessage: err,
            status: false
          });
        }
      });
    } else {
      res.status(400).json({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
});

/*Api to get and search book with pagination and search by name*/
app.get("/api/v1/get-book", (req, res) => {
  try {
    var query = {};
    query["$and"] = [];
    query["$and"].push({
      is_delete: false,
      user_id: req.user.id
    });
    if (req.query && req.query.search) {
      query["$and"].push({
        name: { $regex: req.query.search }
      });
    }
    var perPage = 5;
    var page = req.query.page || 1;
    book.find(query, { date: 1, name: 1, id: 1, desc: 1, price: 1, discount: 1, image: 1 })
      .skip((perPage * page) - perPage).limit(perPage)
      .then((data) => {
        book.find(query).count()
          .then((count) => {

            if (data && data.length > 0) {
              res.status(200).json({
                status: true,
                title: 'book retrieved.',
                books: data,
                current_page: page,
                total: count,
                pages: Math.ceil(count / perPage),
              });
            } else {
              res.status(400).json({
                errorMessage: 'There is no book!',
                status: false
              });
            }

          });

      }).catch(err => {
        res.status(400).json({
          errorMessage: err.message || err,
          status: false
        });
      });
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }

});

process.on('uncaughtException', function (err) {
  console.log(err);
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});