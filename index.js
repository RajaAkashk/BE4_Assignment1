const { initializeDatabase } = require("./db/db.connect");
const Books = require("./models/books.models");

const express = require("express");
const app = express();
app.use(express.json());

initializeDatabase();

const cors = require("cors");
app.use(cors());

// Add new book to dabase.
async function addBookData(newBook) {
  try {
    const newBookToAdd = new Books(newBook);
    const saveBook = await newBookToAdd.save();
    return saveBook;
  } catch (error) {
    console.log("Cannot connect to database.");
  }
}

app.post("/books", async (req, res) => {
  try {
    const savedBook = await addBookData(req.body);
    if (savedBook) {
      res
        .status(200)
        .json({ message: "New book added successfully.", NewBook: savedBook });
    } else {
      res.status(404).json({ error: "Error to add new book.", error });
    }
  } catch {
    res.status(500).json({ error: "Error to connect to server." });
  }
});

// Read All Books in databse.
async function readAllBooks() {
  try {
    const allBooks = await Books.find();
    return allBooks;
  } catch (error) {
    console.log("Error in reading all books.", error);
  }
}

app.get("/", async (req, res) => {
  try {
    const books = await readAllBooks();
    if (books != 0) {
      res.status(200).json({
        message: "Getting all the books successfully.",
        AllBooks: books,
      });
    } else {
      res.status(404).json({ error: "Error in getting books." });
    }
  } catch {
    res.status(500).json({ error: "Error to connect to server." });
  }
});

//Read books by title
async function booksByTitle(bookTitle) {
  try {
    const book = await Books.findOne({ title: bookTitle });
    return book;
  } catch (error) {
    console.log("Error in reading all books.", error);
  }
}

app.get("/books/:title", async (req, res) => {
  try {
    const filterdBook = await booksByTitle(req.params.title);
    if (filterdBook != 0) {
      res
        .status(200)
        .json({ message: "Successfully found book.", Book: filterdBook });
    } else {
      res.status(404).json({ error: "Error in fnding book." });
    }
  } catch {
    res.status(500).json({ error: "Error in connecting to databse." });
  }
});

//Read books by author
async function bookByAuthor(bookAuthor) {
  try {
    const book = await Books.findOne({ author: bookAuthor });
    return book;
  } catch (error) {
    console.log("Error in reading books.", error);
  }
}

app.get("/books/author/:authorName", async (req, res) => {
  try {
    const filterdBook = await bookByAuthor(req.params.authorName);
    if (filterdBook != 0) {
      res
        .status(200)
        .json({ message: "Successfully found book.", Book: filterdBook });
    } else {
      res.status(404).json({ error: "Error in finding book in database." });
    }
  } catch {
    res.status(500).json({ error: "Error in connecting to database." });
  }
});

// Books by genre
async function booksByGenre(bookGenre) {
  try {
    const book = await Books.findOne({ genre: bookGenre });
    return book;
  } catch {
    console.log("Error in reading books.", error);
  }
}

app.get("/books/genre/:bookGenre", async (req, res) => {
  try {
    const filteredBook = await booksByGenre(req.params.bookGenre);
    if (filteredBook != 0) {
      res
        .status(200)
        .json({ message: "Successfully found book.", Book: filteredBook });
    } else {
      res.status(500).json({ error: "Error in finding book in database." });
    }
  } catch {
    res.status(500).json({ error: "Error in connecting to database." });
  }
});

// Books by Release year
async function booksByReleaseYear(bookReleaseYear) {
  try {
    const book = await Books.findOne({ publishedYear: bookReleaseYear });
    return book;
  } catch (error) {
    console.log("Error in reading books.", error);
  }
}

app.get("/books/releaseYear/:bookReleaseYear", async (req, res) => {
  try {
    const filteredBook = await booksByReleaseYear(req.params.bookReleaseYear);
    if (filteredBook != 0) {
      res
        .status(200)
        .json({ message: "Successfully found book.", Book: filteredBook });
    } else {
      res.status(500).json({ error: "Error in finding book in database." });
    }
  } catch {
    res.status(500).json({ error: "Error in connecting to database." });
  }
});

// Read by book id and  update the rating
async function booksByRating(bookId, bookRating) {
  try {
    const updatedBook = await Books.findByIdAndUpdate(bookId, {
      rating: bookRating,
    });
    return updatedBook;
  } catch (error) {
    console.log("Error in reading books.", error);
  }
}
app.post("/books/:bookId", async (req, res) => {
  try {
    const updatedBook = await booksByRating(req.params.bookId, req.body);
    if (updatedBook) {
      res
        .status(200)
        .json({ message: "Successfully found book.", Book: updatedBook });
    } else {
      res.status(404).json({ error: "Error in finding book in database." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in connecting to database." });
  }
});

// Read book and update rating by title
async function booksByRating(bookTitle, bookRating) {
  try {
    const updatedBook = await Books.findOneAndUpdate({
      title: bookTitle,
      rating: bookRating.rating,
    });
    return updatedBook;
  } catch (error) {
    console.log("Error in reading book by title.", error);
  }
}

app.post("/books/title/:bookTitle", async (req, res) => {
  try {
    const updatedBook = await booksByRating(
      req.params.bookTitle,
      req.body.rating
    );
    if (updatedBook) {
      res
        .status(200)
        .json({ message: "Successfully found book.", Book: updatedBook });
    } else {
      res.status(404).json({ error: "Error in finding book in database." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in connecting to database." });
  }
});

// Delete Books by Id
async function booksByReleaseYear(bookId) {
  try {
    const deleteBook = await Books.findByIdAndDelete(bookId);
    return deleteBook;
  } catch (error) {
    console.log("Error in reading books.", error);
  }
}

app.delete("/books/:bookId", async (req, res) => {
  try {
    const deletedBook = await booksByReleaseYear(req.params.bookId);
    res.status(200).json({ message: "Book deleted successfully." });
  } catch {
    res.status(500).json({ error: "Error in connecting to database." });
  }
});

//PORT connection
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on port:-", PORT);
});
