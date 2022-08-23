"use strict";

const bookDisplay = document.querySelector(".display-cards");

document.addEventListener("DOMContentLoaded", () => {
  addBookToLibrary();
});

const myLibrary = [];

function Book(bookId, title, author, pages, status) {
  this.bookId = bookId;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function generateId() {
  return `${myLibrary.length + 1}`;
}

function addBookToLibrary() {
  const bookForm = document.querySelector("form");

  bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target).entries());
    const { title, author, pages, status } = formData;
    const newBook = new Book(generateId(), title, author, pages, status);

    myLibrary.push(newBook);
    displayBook(newBook);
  });
}

function displayBook(book) {
  const bookCard = document.createElement("div");

  bookCard.setAttribute("data-id", `${book.bookId}`);
  bookCard.classList.add("card");

  bookCard.innerHTML = `<div class="card-title"><p>${book.title}</p></div>
  <div class="card-author"><p>Author: ${book.author}</p></div>
  <div class="card-pages"><p>Pages: ${book.pages}</p></div>
  <div class="card-status"><p>Status: ${book.status}</p></div>`;

  bookDisplay.appendChild(bookCard);
}
