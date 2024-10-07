const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    publishedYear: Number,
    genre: [
      {
        type: String,
        enum: [
          "Fiction",
          "Non-fiction",
          "Mystery",
          "Thriller",
          "Science Fiction",
          "Fantasy",
          "Business",
          "Romance",
          "Historical",
          "Biography",
          "Self-help",
          "Autobiography",
          "Other",
        ],
      },
    ],
    language: String,
    country: {
      type: String,
      default: "United States",
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    summary: String,
    coverImageUrl: String,
  },
  { timestamps: true }
);

const BookInfo = mongoose.model("BookInfo", BookSchema);

module.exports = BookInfo;
