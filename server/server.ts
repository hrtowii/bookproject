import express from "express";
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import {v4 as uuid} from 'uuid';
// import fs from 'fs';
// import multer from 'multer';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import { BookList, book } from './model/BookList.js';
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
          ErrorMessage: `Username ${req.body.username} already exists!`,
          status: false
        });
      }
    } else {
      res.status(400).json({
        ErrorMessage: 'Either password or username field missing',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      ErrorMessage: 'Something went wrong!' + " " + e,
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
            ErrorMessage: 'Username or password is incorrect!',
            status: false
          });
        }
      } else {
        res.status(400).json({
          ErrorMessage: 'Username doesn\'t exist',
          status: false
        });
      }
    } else {
      res.status(400).json({
        ErrorMessage: 'Either password or username field missing',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      ErrorMessage: 'Something went wrong! ' + e,
      status: false
    });
  }

});

function checkUserAndGenerateToken(data, req, res) {
  jwt.sign({ user: data.username, id: data._id }, 'shhhhh11111', { expiresIn: '1d' }, (err, token) => {
    if (err) {
      res.status(400).json({
        status: false,
        ErrorMessage: err,
      });
    } else {
      res.status(200).json({
        message: 'logged in successfully.',
        username: data.username,
        token: token,
        status: true
      });
    }
  });
}

/* Api to add booklists. Which are just lists of books */
app.post("/api/v1/add-booklist", async (req, res) => {
  if (req.body.books) {
    let NewBooklist = new BookList();
  }
})

/* Api to add book */
const BookFields = ["name", "description", "price", "notes", "author", "rating"];
app.post("/api/v1/add-book", async (req, res) => {
  try {
    if (req.body && BookFields.every(field => req.body[field])) {
      let NewBook = new book();
      BookFields.forEach((field) => {
        NewBook[field] = req.body[field];
      })
      try {
        await NewBook.save();
        res.status(200).json({
          status: true,
          title: 'book added.',
          book: NewBook
        });
      } catch (e) {
        res.status(400).json({
          ErrorMessage: 'Something went wrong!' + " " + e,
          status: false
        });
      }
    } else {
      res.status(400).json({
        ErrorMessage: 'Missing BookFields. Was given ' + req.body + ", but need " + BookFields,
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      ErrorMessage: 'Something went wrong!' + " " + e,
      status: false
    });
  }
});

/* Api to update book by id */
app.post("/api/v1/update-book", async (req, res) => {
  try {
    if (req.body && req.body.id) { // the fields are optional
      const UpdateBook = await book.findById(req.body.id)
      // const updateBook = await book.find()
      if (!UpdateBook) {
        res.status(400).json({
          ErrorMessage: 'No book found!',
          status: false
        });
      } else {
        BookFields.forEach((field) => {
          UpdateBook[field] = req.body[field] || UpdateBook[field];
        })
        try {
          await UpdateBook.save()
          res.status(200).json({
            status: true,
            title: 'book updated',
            book: UpdateBook
          });
        } catch (e) {
          res.status(400).json({
            ErrorMessage: "error!" + " " + e,
            status: false
          });
        };
      }

    } else {
      res.status(400).json({
        ErrorMessage: 'missing parameters. book id required.',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      ErrorMessage: 'Something went wrong!' + " " + e,
      status: false
    });
  }
});

/* Api to delete book by id or all a book's name */
app.post("/api/v1/delete-book", async (req, res) => {
  try {
    if (req.body && req.body.id || req.body && req.body.name) {
      try {
        await book.deleteOne({ id: req.body.id })
        await book.deleteOne({ name: req.body.name })
        res.status(200).json({
          status: true,
          title: 'book deleted.'
        });
      } catch (err) {
        res.status(400).json({
          ErrorMessage: err,
          status: false
        });
      }
    } else {
      res.status(400).json({
        ErrorMessage: 'missing parameters. book id required',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      ErrorMessage: 'Something went wrong!' + " " + e,
      status: false
    });
  }
});

/*Api to get and search book with id OR name.*/
app.get("/api/v1/get-book", async (req, res) => {
  try {
    if (
      (req.body && req.body.id) ||
      (req.body && req.body.name))
      {
      if (req.body.id) {
        try {
          const foundBook = await book.findById(req.body.id);
          res.status(200).json({
            status: true,
            book: foundBook
          });
        } catch (e) {
          res.status(400).json({
            ErrorMessage: 'Something went wrong!' + " " + e,
            status: false
          });
        }
      } else {
        try {
          const foundBook = await book.findOne({name: req.body.name})
          res.status(200).json({
            status: true,
            book: foundBook
          });
        } catch (e) {
          res.status(400).json({
            ErrorMessage: 'Something went wrong!' + " " + e,
            status: false
          });
        }
      }
    } else {
      res.status(400).json({
        ErrorMessage: 'missing parameters. book id OR every book field required',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      ErrorMessage: 'Something went wrong!' + " " + e,
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