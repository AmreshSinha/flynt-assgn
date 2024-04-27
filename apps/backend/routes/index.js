var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");

var { PrismaClient } = require("@prisma/client");
// import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

/* GET books */
router.get("/books", async function (req, res, next) {
  await prisma.book
    .findMany()
    .then((books) => {
      res.json(books);
    })
    .catch((error) => {
      return res.status(500).json({ type: "db", errors: error });
    });
});

/* GET book by objectid */
router.get("/book/:id", async function (req, res, next) {
  // Validate id param using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ type: "validation", errors: errors.array()[0] });
  }

  await prisma.book
    .findUnique({
      where: {
        id: req.params.id,
      },
    })
    .then((book) => {
      res.json(book);
    })
    .catch((error) => {
      return res.status(500).json({ type: "db", errors: error });
    });
});

/* POST book (with validation) */
router.post(
  "/books",
  [
    body("title").isString().withMessage("Title must be a string"),
    body("author").isString().withMessage("Author must be a string"),
    body("isbn").isString().withMessage("ISBN must be a string").isISBN().withMessage("ISBN must be a valid ISBN"),
    body("price").isFloat().withMessage("Price must be a float"),
  ],
  async function (req, res, next) {
    // Basic data validation (type check aswell) of the book (title, author, isbn, price)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ type: "validation", errors: errors.array()[0] });
    }

    await prisma.book
      .create({
        data: {
          title: req.body.title,
          author: req.body.author,
          isbn: req.body.isbn,
          price: req.body.price,
        },
      })
      .then((book) => {
        res.json(book);
      })
      .catch((error) => {
        return res.status(500).json({ type: "db", errors: error });
      });
  }
);

/* PUT book by objectid */
router.put(
  "/books/:id",
  [
    body("title").isString().withMessage("Title must be a string"),
    body("author").isString().withMessage("Author must be a string"),
    body("isbn").isString().withMessage("ISBN must be a string").isISBN().withMessage("ISBN must be a valid ISBN"),
    body("price").isFloat().withMessage("Price must be a float"),
  ],
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ type: "validation", errors: errors.array()[0] });
    }

    await prisma.book
      .update({
        where: {
          id: req.params.id,
        },
        data: {
          title: req.body.title,
          author: req.body.author,
          isbn: req.body.isbn,
          price: req.body.price,
        },
      })
      .then((book) => {
        res.json(book);
      })
      .catch((error) => {
        return res.status(500).json({ type: "db", errors: error });
      });
  }
);

/* DELETE book by objectid */
router.delete("/books/:id", async function (req, res, next) {
  await prisma.book
    .delete({
      where: {
        id: req.params.id,
      },
    })
    .then((book) => {
      res.json(book);
    })
    .catch((error) => {
      return res.status(500).json({ type: "db", errors: error });
    });
});

module.exports = router;
