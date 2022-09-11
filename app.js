"use strict";

const bookDisplay = document.querySelector(".display-cards");
const cardModal = document.querySelector(".modal");

document.addEventListener("DOMContentLoaded", () => {
  addBookToLibrary();
  displayBooks();
  deleteBook();
  changeCardStatus();
  handleBookEdit();
});

const myLibrary = [
  {
    bookId: 1,
    title: "The Witcher: Blood of Elves",
    author: "Andrzej Sapkowski",
    pages: 398,
    status: "Read",
  },
  {
    bookId: 2,
    title: "The Witcher: The Time of Contempt",
    author: "Andrzej Sapkowski",
    pages: 331,
    status: "Not Read",
  },
  {
    bookId: 3,
    title: "The Witcher: Baptism of Fire",
    author: "Andrzej Sapkowski",
    pages: 349,
    status: "Read",
  },
];

function Book(bookId, title, author, pages, status) {
  this.bookId = bookId;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function generateId() {
  return myLibrary.length === 0
    ? 1
    : myLibrary[myLibrary.length - 1].bookId + 1;
}

function addBookToLibrary() {
  const bookForm = document.querySelector("form");

  bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target).entries());
    const { title, author, pages, status } = formData;
    const newBook = new Book(generateId(), title, author, pages, status);

    myLibrary.push(newBook);
    createBookCard(newBook);
  });
}

function createBookCard(book) {
  const bookCard = document.createElement("div");

  bookCard.setAttribute("data-id", `${book.bookId}`);
  bookCard.classList.add("card");

  bookCard.innerHTML = `<div class="card-title"><p>${book.title}</p></div>
    <div class="card-author"><p>Author: ${book.author}</p></div>
    <div class="card-pages"><p>Pages: ${book.pages}</p></div>
    <div class="card-status"><p>Status: <span>${book.status}</span></p></div>
    <div class="control-btns">
    <div>
    <button type="button" class="status-btn">Change Status</button>
    </div>
    <div>
    <button type="button" class="edit-btn">Edit</button>
    </div>
    <div>
    <button type="button" class="delete-btn">Delete</button>
    </div>
    </div>`;

  bookDisplay.appendChild(bookCard);
}

function displayBooks() {
  for (const book of myLibrary) {
    createBookCard(book);
  }
}

function deleteBook() {
  bookDisplay.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const card = e.target.parentNode.parentNode.parentNode;
      const dataId = card.getAttribute("data-id");

      card.remove();
      deleteBookFromArray(dataId);
    }
  });
}

function deleteBookFromArray(bookId) {
  const bookIndex = myLibrary.findIndex((book) => book.bookId == bookId);
  myLibrary.splice(bookIndex, 1);
}

function changeCardStatus() {
  bookDisplay.addEventListener("click", (e) => {
    if (e.target.classList.contains("status-btn")) {
      const card = e.target.parentNode.parentNode.parentNode;
      const cardStatus = card.querySelector(".card-status span");
      const dataId = card.getAttribute("data-id");

      if (cardStatus.textContent === "Read") {
        cardStatus.textContent = "Not Read";
      } else {
        cardStatus.textContent = "Read";
      }
      changeBookStatus(dataId, cardStatus.textContent);
    }
  });
}

function changeBookStatus(bookId, newStatus) {
  const bookIndex = myLibrary.findIndex((book) => book.bookId == bookId);
  myLibrary[bookIndex].status = newStatus;
}

function handleBookEdit() {
  bookDisplay.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
      const card = e.target.parentNode.parentNode.parentNode;
      const dataId = card.getAttribute("data-id");
      const bookIndex = myLibrary.findIndex((book) => book.bookId == dataId);
      const book = myLibrary[bookIndex];

      cardModal.showModal();
      showModalInputs(book);
      exitModal();
      editBookInLibrary(book);
    }
  });
}

function showModalInputs(book) {
  const modalTitle = document.querySelector("#modal-book-title");
  const modalAuthor = document.querySelector("#modal-book-author");
  const modalPages = document.querySelector("#modal-book-pages");
  const modalStatus = document.querySelector(
    `#modal-book-status option[value="${book.status}"]`
  );

  modalTitle.setAttribute("value", book.title);
  modalAuthor.setAttribute("value", book.author);
  modalPages.setAttribute("value", book.pages);
  modalStatus.setAttribute("selected", "");
}

function editBookInLibrary(book) {
  const editForm = document.querySelector(".modal form");

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target).entries());
    const { title, author, pages, status } = formData;

    book.title = title;
    book.author = author;
    book.pages = pages;
    book.status = status;

    renderEditedValues(book);
    cardModal.close();
    editForm.reset();
  });
}

function renderEditedValues(book) {
  const bookCard = document.querySelector(`.card[data-id="${book.bookId}"]`);
  const bookCardTitle = bookCard.querySelector(".card-title p");
  const bookCardAuthor = bookCard.querySelector(".card-author p");
  const bookCardPages = bookCard.querySelector(".card-pages p");
  const bookCardStatus = bookCard.querySelector(".card-status p span");

  bookCardTitle.textContent = book.title;
  bookCardAuthor.textContent = book.author;
  bookCardPages.textContent = book.pages;
  bookCardStatus.textContent = book.status;
}

function exitModal() {
  const modalExitBtn = document.querySelector(".modal-exit");
  modalExitBtn.addEventListener("click", () => {
    cardModal.close();
  });
}
