import express from "express";
import multer from "multer";
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Define the file path for books.json
const booksFilePath = path.join(__dirname, '../data/books.json');

// Ensure the data directory and books.json file exist
if (!fs.existsSync(path.dirname(booksFilePath))) {
  fs.mkdirSync(path.dirname(booksFilePath), { recursive: true });
}

if (!fs.existsSync(booksFilePath)) {
  fs.writeFileSync(booksFilePath, JSON.stringify([]));
}

// Define the storage for multer
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: Storage }).fields([
  { name: 'image', maxCount: 1 },
  { name: 'pdf', maxCount: 1 }
]);

const readBooksFile = () => {
  const booksData = fs.readFileSync(booksFilePath);
  return JSON.parse(booksData);
};

const writeBooksFile = (data) => {
  fs.writeFileSync(booksFilePath, JSON.stringify(data, null, 2));
};

// Route for new books
router.post("/", (request, response) => {
  upload(request, response, (err) => {
    if (err) {
      return response.status(400).json({ message: err.message });
    } else {
      const books = readBooksFile();
      const newBook = {
        id: books.length + 1,
        title: request.body.title,
        author: request.body.author,
        description: request.body.description,
        Publisher: request.body.Publisher,
        image: request.files.image ? request.files.image[0].filename : null,
        pdf: request.files.pdf ? request.files.pdf[0].filename : null
      };
      books.push(newBook);
      writeBooksFile(books);
      return response.status(201).json(newBook);
    }
  });
});

// Get all books from JSON file
router.get('/', (request, response) => {
  try {
    const books = readBooksFile();
    return response.status(200).json(books);
  } catch (error) {
    console.error('Error getting books:', error);
    response.status(500).send({ message: error.message });
  }
});

// Delete a book by ID
router.delete("/:id", (request, response) => {
  try {
    const books = readBooksFile();
    const id = parseInt(request.params.id);
    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex === -1) {
      return response.status(404).json({ message: "Book not found" });
    }

    const [deletedBook] = books.splice(bookIndex, 1);
    writeBooksFile(books);

    if (deletedBook.image) {
      fs.unlinkSync(path.join(__dirname, '../uploads', deletedBook.image));
    }
    if (deletedBook.pdf) {
      fs.unlinkSync(path.join(__dirname, '../uploads', deletedBook.pdf));
    }

    return response.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error('Error deleting book:', error);
    response.status(500).send({ message: error.message });
  }
});

router.delete("/title/:title", (request, response) => {
  try {
    const books = readBooksFile();
    const title = decodeURIComponent(request.params.title);
    const bookIndex = books.findIndex(book => book.title.toLowerCase() === title.toLowerCase());

    if (bookIndex === -1) {
      return response.status(404).json({ message: "Book not found" });
    }

    const [deletedBook] = books.splice(bookIndex, 1);
    writeBooksFile(books);

    if (deletedBook.image) {
      fs.unlinkSync(path.join(__dirname, '../uploads', deletedBook.image));
    }
    if (deletedBook.pdf) {
      fs.unlinkSync(path.join(__dirname, '../uploads', deletedBook.pdf));
    }

    return response.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error('Error deleting book:', error);
    response.status(500).send({ message: error.message });
  }
});


// Search for books by title or author
router.get('/search', (req, res) => {
  const { q } = req.query;
  try {
    const books = readBooksFile();
    const results = books.filter(book =>
      book.title.toLowerCase().includes(q.toLowerCase()) ||
      book.author.toLowerCase().includes(q.toLowerCase())
    );
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
