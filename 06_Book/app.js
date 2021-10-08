// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() {

}

// Show alert message

UI.prototype.showAlert = function (message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classname to
    div.className = `alert ${className}`;
    // add message
    div.appendChild(document.createTextNode(message));
    // Get container
    const container = document.querySelector('.container');
    // form
    const form = document.querySelector('#book-form');
    // insertBefore
    container.insertBefore(div, form);

    setTimeout(function () {
        document.querySelector('.alert').remove()
    }, 2000);
}


// Add new book to list
UI.prototype.addBookToList = function (book) {
    const bookList = document.querySelector('#book-list');
    // create tr
    const row = document.createElement('tr');
    // innerhtml
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>
            <a href="javascript:;" class="delete">X</a>
        </td>    
    `;

    bookList.appendChild(row);
}

// Clear fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Add book to localStorage
UI.prototype.addToLocalStorage = function (book) {
    // instantiate UI
    const ui = new UI();
    // get book from localStorage
    const books = ui.getBooksFromLocalStorage();
    // push to books
    books.push(book);
    // update localStorage string - mybooks
    localStorage.setItem('my-books', JSON.stringify(books));

}


// Get Book from localStorage
UI.prototype.getBooksFromLocalStorage = function () {
    let books;

    if (localStorage.getItem('my-books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('my-books'));
    }

    return books;
}

// delete books from localStorage
UI.prototype.removeBooksFromLocalStorage = function (isbn) {
    // instantiate UI
    const ui = new UI();
    // get books from localStorage
    let books = ui.getBooksFromLocalStorage();
    // loop over books localStorage
    books.forEach(function (book, index) {
        if (book.isbn === isbn) {
            books.splice(index, 1);
        }
    })

    localStorage.setItem('my-books', JSON.stringify(books));
}

// display books from localStorage
UI.prototype.displayBooksFromLocalStorage = function () {
    // instantiate UI
    const ui = new UI();
    // get books from localStorage
    let books = ui.getBooksFromLocalStorage();
    // loop over books localStorage
    books.forEach(function (book, index) {
        ui.addBookToList(book);
    })
}




// Show books from localStorage after DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // instantiate UI
    const ui = new UI();
    // display books from localStorage
    ui.displayBooksFromLocalStorage();
});


document.querySelector('#book-form').addEventListener('submit', function (e) {

    // Get forms value
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Instansitate book
    const book = new Book(title, author, isbn);

    // Instansitate UI
    const ui = new UI();

    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please enter the information', 'error')
    } else {
        // add book
        ui.addBookToList(book);
        // add to localStorage after updating list
        ui.addToLocalStorage(book);
        // clear UI Fields
        ui.clearFields();
    }

    // prevent page refresh
    e.preventDefault();
});


// delete book
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

document.querySelector('#book-list').addEventListener('click', function (e) {
    // Instansitate UI
    const ui = new UI();
    // delete book from memory
    ui.deleteBook(e.target);
    // delete book from localStorage
    ui.removeBooksFromLocalStorage(e.target.parentElement.previousElementSibling.textContent);
    // Show message
    ui.showAlert('Book Removed', 'success');
    // prevent form submit - page refresh
    e.preventDefault();
    // console.log(e.target);
});